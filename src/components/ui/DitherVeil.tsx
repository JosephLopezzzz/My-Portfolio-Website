import { useEffect, useRef, useState } from 'react';
import { Mesh, Program, RenderTarget, Renderer, Texture, Triangle } from 'ogl';
import './DitherVeil.css';

interface DitherVeilProps {
  baseSrc: string;
  src: string;
  alt: string;
  className?: string;
  pixelSize?: number;
  revealRadius?: number;
  softness?: number;
  linger?: number;
}

const MASK_SCALE = 0.5;

const vertexShader = `#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const maskFragmentShader = `#version 300 es
precision highp float;

uniform sampler2D tPrev;
uniform vec2 uSize;
uniform vec2 uFrom;
uniform vec2 uTo;
uniform float uRadius;
uniform float uSoftness;
uniform float uStrength;
uniform float uFade;

in vec2 vUv;
out vec4 fragColor;

float strokeDistance(vec2 p, vec2 a, vec2 b) {
  vec2 ab = b - a;
  float h = clamp(dot(p - a, ab) / max(dot(ab, ab), 0.0001), 0.0, 1.0);
  return length(p - a - ab * h);
}

void main() {
  vec2 p = vec2(vUv.x, 1.0 - vUv.y) * uSize;
  float trail = max(texture(tPrev, vUv).r - uFade, 0.0);
  float band = max(uRadius * uSoftness, 1.0);
  float distanceToStroke = strokeDistance(p, uFrom, uTo);
  float reveal = clamp((uRadius - distanceToStroke) / band, 0.0, 1.0) * uStrength;
  fragColor = vec4(max(trail, reveal), 0.0, 0.0, 1.0);
}
`;

const viewFragmentShader = `#version 300 es
precision highp float;

uniform sampler2D tImage;
uniform sampler2D tMask;
uniform vec2 uResolution;
uniform vec2 uCover;
uniform float uCell;

in vec2 vUv;
out vec4 fragColor;

float bayer(vec2 cell) {
  ivec2 p = ivec2(mod(cell, 8.0));
  int v = p.x ^ p.y;
  int m = ((v & 1) << 5) | ((p.y & 1) << 4) | ((v & 2) << 2) | ((p.y & 2) << 1) | ((v & 4) >> 1) | ((p.y & 4) >> 2);
  return (float(m) + 0.5) / 64.0;
}

void main() {
  vec2 pixels = vec2(gl_FragCoord.x, uResolution.y - gl_FragCoord.y);
  vec2 cell = floor(pixels / uCell);
  vec2 center = (cell + 0.5) * uCell;
  vec2 maskUv = vec2(center.x / uResolution.x, 1.0 - center.y / uResolution.y);
  float reveal = texture(tMask, maskUv).r;
  if (reveal < bayer(cell)) {
    fragColor = vec4(0.0);
    return;
  }

  vec2 sampleUv = (vUv - 0.5) * uCover + 0.5;
  // Explicit gradients keep mipmap selection stable inside the dither mask.
  vec2 uvStep = uCover / uResolution;
  vec3 color = textureGrad(tImage, sampleUv, vec2(uvStep.x, 0.0), vec2(0.0, uvStep.y)).rgb;
  fragColor = vec4(color, 1.0);
}
`;

const fitCover = (width: number, height: number, imageWidth: number, imageHeight: number) => {
  const ratio = width / height / (imageWidth / imageHeight);
  return ratio > 1 ? [1, 1 / ratio] : [ratio, 1];
};

export default function DitherVeil({
  baseSrc,
  src,
  alt,
  className = '',
  pixelSize = 4,
  revealRadius = 84,
  softness = 0.65,
  linger = 0.7,
}: DitherVeilProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvasHost = canvasHostRef.current;
    if (!container || !canvasHost) return undefined;

    setReady(false);

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio || 1, 2),
        alpha: true,
        antialias: false,
        webgl: 2,
      });
    } catch {
      return undefined;
    }

    const gl = renderer.gl;
    if (!renderer.isWebgl2) {
      const loseContext = gl.getExtension('WEBGL_lose_context') as WEBGL_lose_context | null;
      loseContext?.loseContext();
      return undefined;
    }

    const canvas = gl.canvas;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvasHost.appendChild(canvas);
    gl.clearColor(0, 0, 0, 0);

    const geometry = new Triangle(gl);
    const imageTexture = new Texture(gl, {
      minFilter: gl.LINEAR_MIPMAP_LINEAR,
      magFilter: gl.LINEAR,
      generateMipmaps: true,
    });

    const createMask = (width: number, height: number) =>
      new RenderTarget(gl, {
        width,
        height,
        depth: false,
        type: gl.UNSIGNED_BYTE,
        minFilter: gl.LINEAR,
        magFilter: gl.LINEAR,
      });
    const destroyMask = (target: RenderTarget) => {
      gl.deleteFramebuffer(target.buffer);
      gl.deleteTexture(target.texture.texture);
    };

    let masks: [RenderTarget, RenderTarget] = [createMask(2, 2), createMask(2, 2)];
    const maskUniforms = {
      tPrev: { value: masks[0].texture },
      uSize: { value: [1, 1] },
      uFrom: { value: [0, 0] },
      uTo: { value: [0, 0] },
      uRadius: { value: revealRadius },
      uSoftness: { value: softness },
      uStrength: { value: 0 },
      uFade: { value: 1 },
    };
    const viewUniforms = {
      tImage: { value: imageTexture },
      tMask: { value: masks[0].texture },
      uResolution: { value: [1, 1] },
      uCover: { value: [1, 1] },
      uCell: { value: pixelSize },
    };

    const maskProgram = new Program(gl, {
      vertex: vertexShader,
      fragment: maskFragmentShader,
      uniforms: maskUniforms,
      depthTest: false,
      depthWrite: false,
    });
    const viewProgram = new Program(gl, {
      vertex: vertexShader,
      fragment: viewFragmentShader,
      uniforms: viewUniforms,
      depthTest: false,
      depthWrite: false,
      transparent: true,
    });
    const maskMesh = new Mesh(gl, { geometry, program: maskProgram });
    const viewMesh = new Mesh(gl, { geometry, program: viewProgram });

    let width = 1;
    let height = 1;
    let image: HTMLImageElement | null = null;
    let raf = 0;
    let last = performance.now();
    let presence = 0;
    let trailUntil = 0;
    let visible = true;
    let resizePending = true;
    let pinned = false;
    let pointerOver = false;
    const pointer = { x: 0, y: 0, inside: false, fresh: true, placed: false };
    const brush = { x: 0, y: 0, px: 0, py: 0 };

    const clearMasks = () => {
      maskUniforms.uFade.value = 1;
      maskUniforms.uStrength.value = 0;
      maskUniforms.tPrev.value = masks[1].texture;
      renderer.render({ scene: maskMesh, target: masks[0], clear: true });
      maskUniforms.tPrev.value = masks[0].texture;
      renderer.render({ scene: maskMesh, target: masks[1], clear: true });
    };

    const applyLayout = () => {
      width = Math.max(1, container.clientWidth);
      height = Math.max(1, container.clientHeight);
      renderer.setSize(width, height);
      viewUniforms.uResolution.value = [canvas.width, canvas.height];
      viewUniforms.uCell.value = Math.max(1, Math.round(pixelSize * renderer.dpr));
      maskUniforms.uSize.value = [width, height];
      maskUniforms.uRadius.value = revealRadius;
      maskUniforms.uSoftness.value = softness;

      if (image) {
        viewUniforms.uCover.value = fitCover(width, height, image.naturalWidth, image.naturalHeight);
      }

      const maskWidth = Math.max(2, Math.round(width * MASK_SCALE));
      const maskHeight = Math.max(2, Math.round(height * MASK_SCALE));
      if (maskWidth !== masks[0].width || maskHeight !== masks[0].height) {
        const previousMasks = masks;
        masks = [createMask(maskWidth, maskHeight), createMask(maskWidth, maskHeight)];
        destroyMask(previousMasks[0]);
        destroyMask(previousMasks[1]);
      }

      clearMasks();
      maskUniforms.tPrev.value = masks[0].texture;
      viewUniforms.tMask.value = masks[0].texture;
    };

    const wake = () => {
      if (raf || !visible) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const frame = (now: number) => {
      raf = 0;
      if (resizePending) {
        resizePending = false;
        applyLayout();
      }

      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;
      const targetPresence = pointer.inside ? 1 : 0;
      presence += (targetPresence - presence) * (1 - Math.exp(-dt / 0.16));

      if (pointer.fresh) {
        brush.x = brush.px = pointer.x;
        brush.y = brush.py = pointer.y;
        pointer.fresh = false;
      } else {
        const follow = 1 - Math.exp(-dt / 0.035);
        brush.x += (pointer.x - brush.x) * follow;
        brush.y += (pointer.y - brush.y) * follow;
      }

      maskUniforms.tPrev.value = masks[0].texture;
      maskUniforms.uFrom.value = [brush.px, brush.py];
      maskUniforms.uTo.value = [brush.x, brush.y];
      maskUniforms.uStrength.value = presence;
      maskUniforms.uFade.value = pointer.inside ? 0 : linger > 0 ? dt / linger : 1;
      renderer.render({ scene: maskMesh, target: masks[1], clear: true });
      masks = [masks[1], masks[0]];
      maskUniforms.tPrev.value = masks[0].texture;
      viewUniforms.tMask.value = masks[0].texture;
      renderer.render({ scene: viewMesh, clear: true });
      brush.px = brush.x;
      brush.py = brush.y;

      if (presence > 0.002 && !pointer.inside) {
        trailUntil = Math.max(trailUntil, now + linger * 1000 + 100);
      }

      const stillChanging = Math.abs(targetPresence - presence) > 0.002;
      if (stillChanging || (!pointer.inside && now < trailUntil)) {
        raf = requestAnimationFrame(frame);
      }
    };

    const locate = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.placed = true;
    };
    const refreshTrail = () => {
      trailUntil = performance.now() + linger * 1000 + 100;
    };
    const onMove = (event: PointerEvent) => {
      locate(event);
      pointerOver = true;
      if (!pointer.inside) {
        pointer.inside = true;
        pointer.fresh = true;
      }
      refreshTrail();
      wake();
    };
    const onLeave = () => {
      pointerOver = false;
      pointer.inside = pinned;
      refreshTrail();
      wake();
    };
    const onClick = () => {
      pinned = !pinned;
      if (!pointer.placed) {
        pointer.x = width / 2;
        pointer.y = height / 2;
        pointer.placed = true;
        pointer.fresh = true;
      }
      pointer.inside = pointerOver || pinned;
      refreshTrail();
      wake();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      pointer.x = width / 2;
      pointer.y = height / 2;
      pointer.placed = true;
      pointer.fresh = true;
      onClick();
    };
    const onResize = () => {
      resizePending = true;
      wake();
    };
    const onVisibility = ([entry]: IntersectionObserverEntry[]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
    };

    container.addEventListener('pointermove', onMove, { passive: true });
    container.addEventListener('pointerenter', onMove, { passive: true });
    container.addEventListener('pointerdown', onMove, { passive: true });
    container.addEventListener('pointerleave', onLeave, { passive: true });
    container.addEventListener('pointercancel', onLeave, { passive: true });
    container.addEventListener('click', onClick);
    container.addEventListener('keydown', onKeyDown);

    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onResize) : null;
    resizeObserver?.observe(container);
    if (!resizeObserver) window.addEventListener('resize', onResize);

    const intersectionObserver =
      typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(onVisibility) : null;
    intersectionObserver?.observe(container);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.decoding = 'async';
    img.onload = () => {
      image = img;
      imageTexture.image = img;
      imageTexture.needsUpdate = true;
      resizePending = true;
      setReady(true);
      wake();
    };
    img.src = src;

    applyLayout();
    resizePending = false;
    wake();

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      if (!resizeObserver) window.removeEventListener('resize', onResize);
      container.removeEventListener('pointermove', onMove);
      container.removeEventListener('pointerenter', onMove);
      container.removeEventListener('pointerdown', onMove);
      container.removeEventListener('pointerleave', onLeave);
      container.removeEventListener('pointercancel', onLeave);
      container.removeEventListener('click', onClick);
      container.removeEventListener('keydown', onKeyDown);
      img.onload = null;
      destroyMask(masks[0]);
      destroyMask(masks[1]);
      maskProgram.remove();
      viewProgram.remove();
      geometry.remove();
      const loseContext = gl.getExtension('WEBGL_lose_context') as WEBGL_lose_context | null;
      loseContext?.loseContext();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [linger, pixelSize, revealRadius, softness, src]);

  return (
    <div
      ref={containerRef}
      className={`dither-veil ${className}`.trim()}
      role="button"
      aria-label="Toggle profile portrait"
      tabIndex={0}
    >
      <img className="dither-veil__base" src={baseSrc} alt={alt} draggable={false} />
      <div
        ref={canvasHostRef}
        className={`dither-veil__canvas${ready ? ' dither-veil__canvas--ready' : ''}`}
        aria-hidden="true"
      />
    </div>
  );
}
