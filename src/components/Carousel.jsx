import { Children, useCallback, useEffect, useRef, useState } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Chevron({ direction }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={direction === "prev" ? "rotate-180" : ""}
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

/**
 * Horizontal slider built on native scroll-snap (no dependencies).
 *  - 10px gap between slides
 *  - touch / trackpad swipe works natively
 *  - mouse users can drag, or use the arrow buttons / ArrowLeft + ArrowRight keys
 *  - arrows are hidden automatically when everything already fits
 *
 * `itemClassName` sets the width of every slide (e.g. "w-[78%] lg:w-[23%]").
 */
export default function Carousel({
  label,
  children,
  itemClassName = "w-[80%]",
  theme = "light",
  className = "",
}) {
  const trackRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const [edges, setEdges] = useState({ scrollable: false, canPrev: false, canNext: false });

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const next = {
      scrollable: max > 2,
      canPrev: el.scrollLeft > 2,
      canNext: el.scrollLeft < max - 2,
    };
    setEdges((prev) =>
      prev.scrollable === next.scrollable &&
      prev.canPrev === next.canPrev &&
      prev.canNext === next.canNext
        ? prev
        : next,
    );
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateEdges);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    const observer = new ResizeObserver(updateEdges);
    observer.observe(el);
    updateEdges();
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [updateEdges]);

  const scrollByPage = useCallback((direction) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * el.clientWidth * 0.9,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

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
  }, []);

  // --- mouse drag (touch uses native scrolling) ---
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
    }
    if (state.moved) el.scrollLeft = state.startScroll - dx;
  };

  const endDrag = (event) => {
    const state = drag.current;
    if (!state.active) return;
    state.active = false;
    if (state.moved) {
      const el = trackRef.current;
      if (el.hasPointerCapture?.(event.pointerId)) el.releasePointerCapture(event.pointerId);
      delete el.dataset.dragging;
      snapToNearest();
    }
  };

  // A drag that ends on a link must not also count as a click.
  const onClickCapture = (event) => {
    if (drag.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      drag.current.moved = false;
    }
  };

  const onKeyDown = (event) => {
    if (!edges.scrollable) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByPage(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByPage(-1);
    }
  };

  const items = Children.toArray(children);
  const buttonTheme =
    theme === "dark"
      ? "border-white/30 text-white hover:bg-white hover:text-black focus-visible:outline-amber-300"
      : "border-neutral-900/25 text-neutral-900 hover:bg-neutral-900 hover:text-white focus-visible:outline-amber-500";

  return (
    <div
      className={`min-w-0 max-w-full ${className}`}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div
        ref={trackRef}
        className="carousel-track no-scrollbar relative flex snap-x snap-mandatory gap-[10px] overflow-x-auto overscroll-x-contain rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
        tabIndex={edges.scrollable ? 0 : -1}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onDragStart={(event) => event.preventDefault()}
      >
        {items.map((item, index) => (
          <div
            key={item.key ?? index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${items.length}`}
            className={`shrink-0 snap-start ${itemClassName}`}
          >
            {item}
          </div>
        ))}
      </div>

      {edges.scrollable && (
        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            disabled={!edges.canPrev}
            aria-label={`Previous ${label}`}
            className={`grid h-11 w-11 place-items-center rounded-full border transition focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent ${buttonTheme}`}
          >
            <Chevron direction="prev" />
          </button>
          <button
            type="button"
            onClick={() => scrollByPage(1)}
            disabled={!edges.canNext}
            aria-label={`Next ${label}`}
            className={`grid h-11 w-11 place-items-center rounded-full border transition focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent ${buttonTheme}`}
          >
            <Chevron direction="next" />
          </button>
        </div>
      )}
    </div>
  );
}
