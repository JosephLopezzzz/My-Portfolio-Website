import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const restAngle = 45;
const nativeCursor = 'input:not([type="button"]):not([type="submit"]), textarea, select, [contenteditable]:not([contenteditable="false"]), [data-cursor="native"], iframe';

export default function RotatingCursor() {
  const positionRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const position = positionRef.current;
    const arrow = arrowRef.current;
    if (!position || !arrow) return;

    const mouse = window.matchMedia("(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)");
    const root = document.documentElement;
    let previous: { x: number; y: number } | null = null;
    let angle = restAngle;
    let settleTimer: number;

    const turnTo = (heading: number) => {
      const shortestTurn = ((heading - angle) % 360 + 540) % 360 - 180;
      angle += shortestTurn;
      arrow.style.transform = `rotate(${angle}deg)`;
    };

    const hide = () => {
      window.clearTimeout(settleTimer);
      position.hidden = true;
      delete root.dataset.rotatingCursor;
      previous = null;
      turnTo(restAngle);
    };

    const move = (event: PointerEvent) => {
      const { clientX: x, clientY: y, pointerType, target } = event;
      if (!mouse.matches || pointerType !== "mouse" || !(target instanceof Element) || target.closest(nativeCursor)) {
        hide();
        return;
      }

      if (previous) {
        const dx = x - previous.x;
        const dy = y - previous.y;
        if (Math.hypot(dx, dy) >= 2) {
          turnTo(Math.atan2(dy, dx) * 180 / Math.PI + 180);
          previous = { x, y };
        }
      } else {
        previous = { x, y };
      }

      position.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      position.hidden = false;
      root.dataset.rotatingCursor = "";
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => turnTo(restAngle), 230);
    };

    const leaveOrEnterNative = (event: PointerEvent) => {
      const next = event.relatedTarget;
      if (!(next instanceof Element) || next.closest(nativeCursor)) hide();
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerout", leaveOrEnterNative);
    window.addEventListener("pointercancel", hide);
    window.addEventListener("blur", hide);
    mouse.addEventListener("change", hide);

    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", leaveOrEnterNative);
      window.removeEventListener("pointercancel", hide);
      window.removeEventListener("blur", hide);
      mouse.removeEventListener("change", hide);
    };
  }, []);

  return createPortal(
    <div ref={positionRef} hidden aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[100000]">
      <svg
        ref={arrowRef}
        width="26"
        height="22"
        viewBox="-2 -11 26 22"
        className="absolute -left-[2px] -top-[11px] origin-[2px_11px] fill-background stroke-foreground drop-shadow-sm transition-transform duration-100 ease-out"
        style={{ transform: `rotate(${restAngle}deg)` }}
      >
        <path d="M0 0 20-8l-4 8 4 8Z" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    </div>,
    document.body,
  );
}
