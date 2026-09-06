import React, { useRef, useState } from 'react';
import './SpotlightCard.css';

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

const SpotlightCard = ({ children, className = '', spotlightColor, ...props }: SpotlightCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isTouchActive, setIsTouchActive] = useState(false);
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updatePosition = (clientX: number, clientY: number) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
    if (spotlightColor) {
      divRef.current.style.setProperty('--spotlight-color', spotlightColor);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updatePosition(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    if (e.touches.length > 0) {
      updatePosition(e.touches[0].clientX, e.touches[0].clientY);
      setIsTouchActive(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      updatePosition(e.touches[0].clientX, e.touches[0].clientY);
      setIsTouchActive(true);
    }
  };

  const handleTouchEnd = () => {
    touchTimeoutRef.current = setTimeout(() => {
      setIsTouchActive(false);
    }, 1200);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className={`card-spotlight ${isTouchActive ? 'is-touch-active' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
