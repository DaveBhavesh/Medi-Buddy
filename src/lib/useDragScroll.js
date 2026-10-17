import { useCallback, useRef } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Mouse click-and-drag scrolling for an overflow-x container (touch already scrolls natively).
 * A drag that ends on a link/button does not count as a click.
 * `snap: true` glides to the nearest child when the drag ends (for scroll-snap sliders).
 */
export default function useDragScroll(trackRef, { snap = false, onDragChange } = {}) {
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const snapToNearest = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    let target = 0;
    let best = Infinity;
    Array.from(el.children).forEach((child) => {
      const distance = Math.abs(child.offsetLeft - el.scrollLeft);
      if (distance < best) {
        best = distance;
        target = child.offsetLeft;
      }
    });
    el.scrollTo({ left: target, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, [trackRef]);

  const onPointerDown = (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const el = trackRef.current;
    drag.current = { active: true, startX: event.clientX, startScroll: el.scrollLeft, moved: false };
  };

  const onPointerMove = (event) => {
    const state = drag.current;
    if (!state.active) return;
    const el = trackRef.current;
    const dx = event.clientX - state.startX;
    if (!state.moved && Math.abs(dx) > 4) {
      state.moved = true;
      el.dataset.dragging = "true";
      el.setPointerCapture(event.pointerId);
      onDragChange?.(true);
    }
    if (state.moved) el.scrollLeft = state.startScroll - dx;
  };

  const end = (event) => {
    const state = drag.current;
    if (!state.active) return;
    state.active = false;
    if (state.moved) {
      const el = trackRef.current;
      if (el.hasPointerCapture?.(event.pointerId)) el.releasePointerCapture(event.pointerId);
      delete el.dataset.dragging;
      onDragChange?.(false);
      if (snap) snapToNearest();
    }
  };

  const onClickCapture = (event) => {
    if (drag.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      drag.current.moved = false;
    }
  };

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp: end,
    onPointerCancel: end,
    onClickCapture,
    onDragStart: (event) => event.preventDefault(),
  };
}
