import { Children, useEffect, useRef } from "react";
import useDragScroll, { prefersReducedMotion } from "../lib/useDragScroll";

/**
 * Slider that scrolls by itself, smoothly and endlessly (no jumps, no blank end).
 *  - the items are rendered twice; when the first copy has scrolled out the position wraps invisibly
 *  - hover, touch, mouse-drag, keyboard focus and wheel pause it; it resumes shortly after
 *  - swipe / trackpad / click-drag still scroll it by hand
 *  - with "reduce motion" on it does not move by itself (manual scrolling only)
 * `speed` is in pixels per second. `itemClassName` sets each card's width (use cqw units: 100cqw = the slider's own width).
 */
export default function AutoScrollRow({
  label,
  children,
  itemClassName = "w-[70cqw]",
  speed = 45,
  className = "",
}) {
  const trackRef = useRef(null);
  const state = useRef({ pos: 0, paused: false, resumeAt: 0, hover: false, focus: false, dragging: false });
  const drag = useDragScroll(trackRef, {
    onDragChange: (active) => {
      state.current.dragging = active;
      if (!active) state.current.resumeAt = performance.now() + 1500;
    },
  });
  const items = Children.toArray(children);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || prefersReducedMotion()) return undefined;
    const s = state.current;
    let frame = 0;
    let last = performance.now();
    let visible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(el);

    const half = () => el.scrollWidth / 2;

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const idle = !s.hover && !s.focus && !s.dragging && now >= s.resumeAt;
      if (visible && idle && !document.hidden) {
        // Re-sync with the real position (the user may have scrolled), then advance.
        if (Math.abs(el.scrollLeft - s.pos) > 2) s.pos = el.scrollLeft;
        s.pos += speed * dt;
        const loop = half();
        if (loop > 0 && s.pos >= loop) s.pos -= loop;
        el.scrollLeft = s.pos;
      } else {
        s.pos = el.scrollLeft;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    // Manual scrolling past the end of the first copy wraps too, so it never runs out.
    const onScroll = () => {
      const loop = half();
      if (loop <= 0) return;
      if (el.scrollLeft >= loop) {
        el.scrollLeft -= loop;
        s.pos = el.scrollLeft;
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      el.removeEventListener("scroll", onScroll);
    };
  }, [speed]);

  const touchPause = () => {
    state.current.resumeAt = performance.now() + 4000;
  };

  const onKeyDown = (event) => {
    const el = trackRef.current;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const dir = event.key === "ArrowRight" ? 1 : -1;
      state.current.resumeAt = performance.now() + 4000;
      el.scrollBy({ left: dir * el.clientWidth * 0.6, behavior: "smooth" });
    }
  };

  return (
    <div
      className={`min-w-0 max-w-full [container-type:inline-size] ${className}`}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") state.current.hover = true;
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        state.current.hover = false;
        state.current.resumeAt = performance.now() + 600;
      }}
      onFocus={() => (state.current.focus = true)}
      onBlur={() => {
        state.current.focus = false;
        state.current.resumeAt = performance.now() + 600;
      }}
      onTouchStart={() => {
        state.current.hover = true;
      }}
      onTouchEnd={() => {
        state.current.hover = false;
        touchPause();
      }}
      onWheel={touchPause}
    >
      <div
        ref={trackRef}
        data-auto-track
        className="drag-scroll no-scrollbar flex overflow-x-auto overscroll-x-contain rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
        tabIndex={0}
        onKeyDown={onKeyDown}
        {...drag}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 gap-[10px] pr-[10px]"
            aria-hidden={copy === 1 ? "true" : undefined}
          >
            {items.map((item, i) => (
              <div
                key={`${copy}-${item.key ?? i}`}
                role={copy === 0 ? "group" : undefined}
                aria-roledescription={copy === 0 ? "slide" : undefined}
                aria-label={copy === 0 ? `${i + 1} of ${items.length}` : undefined}
                className={`shrink-0 ${itemClassName}`}
              >
                {copy === 1 ? <div inert>{item}</div> : item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
