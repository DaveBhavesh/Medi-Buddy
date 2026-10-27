import { Children } from "react";
import useDragScroll from "../lib/useDragScroll";
import useSnapSlider from "../lib/useSnapSlider";

function Chevron({ direction }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
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
 * Full-width image slider (scroll-snap, no dependencies).
 *  - swipe on touch, click-drag with a mouse, arrows, dots, ArrowLeft/ArrowRight keys
 *  - auto-rotates every `interval` ms; pauses on hover, keyboard focus, touch and when the tab is hidden
 *  - `overlay` is drawn on top of every slide (used for the video card)
 */
export default function HeroSlider({ label, slides, overlay, interval = 6000, className = "" }) {
  const count = slides.length;
  const { trackRef, index, goTo, onKeyDown, wrapperProps } = useSnapSlider({ count, interval });
  const drag = useDragScroll(trackRef, { snap: true });

  const arrow =
    "absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-black/70 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-amber-300 sm:grid lg:h-12 lg:w-12 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/slider:opacity-100";

  return (
    <div
      className={`group/slider relative ${className}`}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      {...wrapperProps}
    >
      <div
        ref={trackRef}
        data-hero-track
        className="carousel-track drag-scroll no-scrollbar flex snap-x snap-mandatory gap-[10px] overflow-x-auto overscroll-x-contain rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400 sm:rounded-3xl"
        tabIndex={0}
        onKeyDown={onKeyDown}
        {...drag}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.image}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            className="relative aspect-[7/4] w-full shrink-0 snap-center overflow-hidden bg-[#2a1f3d]"
          >
            <img
              src={`/assets/${slide.image}`}
              alt={slide.alt}
              width={slide.width}
              height={slide.height}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : undefined}
              decoding="async"
              draggable="false"
              className={`absolute inset-0 h-full w-full object-cover ${slide.position ?? ""}`}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent" />
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label={`Previous ${label} slide`}
        onClick={() => goTo(index - 1)}
        className={`${arrow} left-3 lg:left-5`}
      >
        <Chevron direction="prev" />
      </button>
      <button
        type="button"
        aria-label={`Next ${label} slide`}
        onClick={() => goTo(index + 1)}
        className={`${arrow} right-3 lg:right-5`}
      >
        <Chevron direction="next" />
      </button>

      <div className="absolute inset-x-0 bottom-2 z-10 flex justify-center gap-2 sm:bottom-4">
        {slides.map((slide, i) => (
          <button
            key={slide.image}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full bg-white transition-all duration-300 focus-visible:outline-2 focus-visible:outline-amber-300 sm:h-2.5 ${
              i === index ? "w-6 opacity-100 sm:w-8" : "w-2 opacity-55 hover:opacity-90 sm:w-2.5"
            }`}
          />
        ))}
      </div>

      {Children.toArray(overlay)}
    </div>
  );
}
