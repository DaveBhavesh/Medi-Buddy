import { useCallback, useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "./useDragScroll";

/**
 * Logic shared by the full-width sliders (hero images, quotes).
 * The track is a scroll-snap container whose children are the slides.
 *  - `index` follows whatever slide is showing (swipe, drag, buttons, autoplay)
 *  - autoplay every `interval` ms; pauses on hover, keyboard focus, touch and while the tab is hidden
 */
export default function useSnapSlider({ count, interval = 6000 }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const pausedRef = useRef(false);
  const resumeTimer = useRef(0);

  const goTo = useCallback(
    (next) => {
      const el = trackRef.current;
      if (!el) return;
      const child = el.children[((next % count) + count) % count];
      el.scrollTo({ left: child.offsetLeft, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    },
    [count],
  );

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;
    let frame = 0;
    const update = () => {
      const stride = el.children[1]
        ? el.children[1].offsetLeft - el.children[0].offsetLeft
        : el.clientWidth;
      const next = Math.min(count - 1, Math.max(0, Math.round(el.scrollLeft / stride)));
      if (next !== indexRef.current) {
        indexRef.current = next;
        setIndex(next);
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
    };
  }, [count]);

  useEffect(() => {
    if (prefersReducedMotion() || count < 2 || !interval) return undefined;
    const timer = setInterval(() => {
      if (pausedRef.current || document.hidden) return;
      goTo(indexRef.current + 1);
    }, interval);
    return () => clearInterval(timer);
  }, [goTo, interval, count]);

  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  const pause = useCallback(() => {
    pausedRef.current = true;
    clearTimeout(resumeTimer.current);
  }, []);
  const resume = useCallback((delay = 0) => {
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      pausedRef.current = false;
    }, delay);
  }, []);

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      pause();
      goTo(indexRef.current + 1);
      resume(8000);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      pause();
      goTo(indexRef.current - 1);
      resume(8000);
    }
  };

  // Spread these on the slider wrapper.
  const wrapperProps = {
    onPointerEnter: (event) => event.pointerType === "mouse" && pause(),
    onPointerLeave: (event) => event.pointerType === "mouse" && resume(0),
    onFocus: pause,
    onBlur: () => resume(0),
    onTouchStart: pause,
    onTouchEnd: () => resume(8000),
  };

  return { trackRef, index, goTo, onKeyDown, wrapperProps };
}
