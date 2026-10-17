import { useRef } from "react";
import Portrait from "../components/Portrait";
import useDragScroll from "../lib/useDragScroll";
import useSnapSlider from "../lib/useSnapSlider";
import { quotes } from "../data/quotes";

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

export default function Quotes() {
  const count = quotes.length;
  const { trackRef, index, goTo, onKeyDown, wrapperProps } = useSnapSlider({ count, interval: 8000 });
  const drag = useDragScroll(trackRef, { snap: true });
  const thumbsRef = useRef(null);

  const arrow =
    "grid h-11 w-11 place-items-center rounded-full border border-white/40 text-white transition hover:bg-white hover:text-[#0f4c9a] focus-visible:outline-2 focus-visible:outline-amber-300";

  return (
    <section id="quotes" className="bg-white py-10 sm:py-16" aria-label="Inspirational quotes">
      <div className="w-full px-[10px]">
        <div
          className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#0f4c9a] via-[#1769c9] to-[#2b8be8] text-white sm:rounded-[2.25rem]"
          role="group"
          aria-roledescription="carousel"
          aria-label="Inspirational quotes"
          {...wrapperProps}
        >
          <div
            ref={trackRef}
            className="carousel-track no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-amber-300"
            tabIndex={0}
            onKeyDown={onKeyDown}
            {...drag}
          >
            {quotes.map((item, i) => (
              <figure
                key={item.slug}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}: ${item.name}`}
                className="grid w-full shrink-0 snap-center items-center gap-6 p-5 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-12"
              >
                <div className="mx-auto aspect-[4/5] w-[62%] max-w-[360px] overflow-hidden rounded-[1.5rem] bg-white/10 shadow-2xl shadow-black/30 ring-1 ring-white/25 [container-type:inline-size] sm:w-[46%] lg:col-span-5 lg:w-full lg:max-w-[460px] lg:justify-self-center">
                  <Portrait slug={item.slug} name={item.name} tone={i} lazy={i > 0} position="object-[50%_20%]" />
                </div>
                <div className="lg:col-span-7">
                  <blockquote>
                    <p className="text-[clamp(1.35rem,2.9vw,3rem)] font-black leading-[1.12] tracking-[-0.03em]">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </blockquote>
                  <figcaption className="mt-6">
                    <p className="text-lg font-black sm:text-2xl">{item.name}</p>
                    <p className="mt-1 text-sm text-white/80 sm:text-base">{item.role}</p>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-white/20 px-3 py-4 sm:px-6">
            <button type="button" className={arrow} aria-label="Previous quote" onClick={() => goTo(index - 1)}>
              <Chevron direction="prev" />
            </button>

            {/* Thumbnails double as pagination, like the reference */}
            <div
              ref={thumbsRef}
              className="no-scrollbar flex min-w-0 flex-1 items-center gap-2 overflow-x-auto px-1 sm:justify-center sm:gap-4"
              role="tablist"
              aria-label="Choose a quote"
            >
              {quotes.map((item, i) => (
                <button
                  key={item.slug}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={item.name}
                  onClick={() => goTo(i)}
                  className={`shrink-0 rounded-full p-[3px] transition focus-visible:outline-2 focus-visible:outline-amber-300 ${
                    i === index ? "bg-amber-300 opacity-100" : "bg-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <span className="block h-10 w-10 overflow-hidden rounded-full [container-type:inline-size] sm:h-12 sm:w-12">
                    <Portrait slug={item.slug} name={item.name} tone={i} alt="" small position="object-[50%_20%]" />
                  </span>
                </button>
              ))}
            </div>

            <button type="button" className={arrow} aria-label="Next quote" onClick={() => goTo(index + 1)}>
              <Chevron direction="next" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
