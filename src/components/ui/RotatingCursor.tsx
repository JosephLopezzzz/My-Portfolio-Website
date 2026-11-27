import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const restAngle = 45;
const clickable = [
  "a[href]", "button", "summary", "select", "label[for]",
  "input:is([type=button], [type=submit], [type=reset], [type=image], [type=checkbox], [type=radio])",
  "[role=button]", "[role=link]", "[role=tab]", "[role=switch]", "[role=checkbox]",
  "[role=radio]", "[role=option]", "[role=menuitem]", "[role=menuitemcheckbox]", "[role=menuitemradio]",
  '[data-cursor="pointer"]',
].join(", ");
const nativeControl = 'textarea, iframe, [contenteditable]:not([contenteditable="false"])';

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
      if (!mouse.matches || pointerType !== "mouse" || !(target instanceof Element)) {
        hide();
        return;
      }

      let action = target.closest(clickable);
      if (target === root && root.hasAttribute("data-theme-reveal")) {
        // The browser can report the page root as the target during the reveal.
        const toggle = document.getElementById("theme-toggle-button");
        const bounds = toggle?.getBoundingClientRect();
        if (bounds && x >= bounds.left && x < bounds.right && y >= bounds.top && y < bounds.bottom) {
          action = toggle;
        }
      }
      const isClickable = action !== null && !action.matches(":disabled") && !action.closest('[aria-disabled="true"]');
      const nativeArea = target.closest('[data-cursor="native"]');
      const isNativeArea = nativeArea && (!isClickable || action === nativeArea || !nativeArea.contains(action));
      if (target.closest(nativeControl) || (target.closest("input") && !action?.matches("input")) || isNativeArea) {
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
      position.toggleAttribute("data-hand-pointer", isClickable);
      position.hidden = false;
      root.dataset.rotatingCursor = "";
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => turnTo(restAngle), 230);
    };

    const leaveWindow = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", move, { passive: true });
    window.addEventListener("pointerout", leaveWindow);
    window.addEventListener("pointercancel", hide);
    window.addEventListener("blur", hide);
    mouse.addEventListener("change", hide);

    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", move);
      window.removeEventListener("pointerout", leaveWindow);
      window.removeEventListener("pointercancel", hide);
      window.removeEventListener("blur", hide);
      mouse.removeEventListener("change", hide);
    };
  }, []);

  return createPortal(
    <div aria-hidden="true" className="portfolio-cursor-layer pointer-events-none fixed inset-0 z-[100000]">
      <div ref={positionRef} hidden className="group absolute left-0 top-0">
        <svg
          ref={arrowRef}
          width="26"
          height="22"
          viewBox="-2 -11 26 22"
          className="absolute -left-[2px] -top-[11px] origin-[2px_11px] fill-background stroke-foreground drop-shadow-sm transition-transform duration-100 ease-out group-data-[hand-pointer]:hidden"
          style={{ transform: `rotate(${restAngle}deg)` }}
        >
          <path d="M0 0 20-8l-4 8 4 8Z" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="absolute -left-2 -top-0.5 hidden fill-background stroke-foreground drop-shadow-sm group-data-[hand-pointer]:block"
        >
          <path
            d="M6 13V4a2 2 0 0 1 4 0v6a2 2 0 0 1 4 0v1a2 2 0 0 1 4 0v1a2 2 0 0 1 4 0v2a8 8 0 0 1-8 8h-2c-2.2 0-3.9-.8-5.4-2.3l-4-4a2 2 0 0 1 2.8-2.8L8 15.5Z"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>,
    document.body,
  );
}
