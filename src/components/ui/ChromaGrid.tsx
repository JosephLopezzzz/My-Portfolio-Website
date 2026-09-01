import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ChromaGrid.css';

interface ChromaGridProps {
  children: React.ReactNode;
  className?: string;
  radius?: number;
  columns?: number;
  rows?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
}

export const ChromaGrid = ({
  children,
  className = '',
  radius = 300,
  columns = 3,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}: ChromaGridProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<any>(null);
  const setY = useRef<any>(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current?.(pos.current.x);
    setY.current?.(pos.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!rootRef.current) return;
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    });
  };

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={{
        '--r': `${radius}px`,
        '--cols': columns,
        '--rows': rows
      } as React.CSSProperties}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
      
      {/* The grid overlay effects that react to mouse position */}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  );
};

export const ChromaCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div className={`chroma-card ${className}`} onMouseMove={handleCardMove}>
      {children}
    </div>
  );
};
