import { useEffect, useRef, useState } from "react";
import Portrait from "../components/Portrait";
import useDragScroll from "../lib/useDragScroll";
import { quotes } from "../data/quotes";

const INTERVAL = 4000; // ms each person stays on screen

/**
 * Celebrity quotes carousel.
 *  - each slide: photo on the left third (name + role over it), big quote on the right two thirds
 *  - all slides sit in the same grid cell and crossfade, so the height never jumps
 *  - moves on every 4 s; hovering the slide pauses it so the quote can be read
 *  - round thumbnails overlap the slide's bottom edge; clicking one shows that person at once
 *    and the 4 s timer starts again from there
 *  - phones: photo above the quote; the thumbnail row scrolls sideways
 */
export default function Quotes() {
  const count = quotes.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const thumbsRef = useRef(null);
  const thumbsDrag = useDragScroll(thumbsRef); // click-and-drag the thumbnail row when it overflows

  // One timeout per slide: re-created whenever the slide changes (auto or click), cleared on cleanup.
  useEffect(() => {
    if (paused || count < 2) return undefined;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => window.clearTimeout(id);
  }, [index, paused, count]);

  // Keep the active thumbnail in view when the row scrolls (phones), without moving the page.
  useEffect(() => {
    const row = thumbsRef.current;
    const thumb = row?.children[index];
    if (!row || !thumb || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({
      left: thumb.offsetLeft - row.clientWidth / 2 + thumb.offsetWidth / 2,
      behavior: "smooth",
    });
  }, [index]);

  const onThumbKeyDown = (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = (index + (event.key === "ArrowRight" ? 1 : -1) + count) % count;
    setIndex(next);
    thumbsRef.current?.children[next]?.focus();
  };

  return (
    <section id="quotes" className="bg-cream pb-10 pt-10 sm:pb-16 sm:pt-16" aria-label="Inspirational quotes">
      <div className="w-full px-5">
        <div
          className="relative grid overflow-hidden rounded-[1.5rem] bg-night-2 text-white sm:rounded-[2.25rem]"
          role="group"
          aria-roledescription="carousel"
          aria-label="Inspirational quotes"
          onPointerEnter={(event) => event.pointerType === "mouse" && setPaused(true)}
          onPointerLeave={(event) => event.pointerType === "mouse" && setPaused(false)}
        >
          {quotes.map((item, i) => {
            const active = i === index;
            return (
              <figure
                key={item.slug}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}: ${item.name}`}
                aria-hidden={!active}
                inert={!active}
                className={`m-0 grid transition-opacity duration-700 ease-out [grid-area:1/1] md:min-h-[clamp(26rem,36vw,38rem)] md:grid-cols-3 ${
                  active ? "z-10 opacity-100" : "opacity-0"
                }`}
              >
                {/* Photo: left third, full height. Every photo is turned black-and-white and tinted
                    with the slide colour, so different original backgrounds all read as one colour,
                    then faded into the slide so photo and quote form one piece. */}
                <div className="relative aspect-[4/3] overflow-hidden [container-type:inline-size] sm:aspect-[16/9] md:aspect-auto">
                  <div className="quote-photo absolute inset-0">
                    <div
                      className={`h-full w-full transition-transform duration-[2000ms] ease-out ${
                        active ? "scale-100" : "scale-[1.06]"
                      }`}
                    >
                      <Portrait
                        slug={item.slug}
                        name={item.name}
                        tone={i}
                        lazy={i > 0}
                        alt={item.name}
                        position="object-[50%_20%]"
                        className="contrast-[1.08] grayscale"
                      />
                    </div>
                    <div className="absolute inset-0 bg-night-2 opacity-60 mix-blend-color" aria-hidden="true" />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 px-5 pb-5 sm:px-7 sm:pb-7">
                    <p className="text-xl font-black leading-tight sm:text-2xl">{item.name}</p>
                    <p className="mt-1 text-sm text-white/80 sm:text-base">{item.role}</p>
                    {item.credit && (
                      <a
                        href={item.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-[10px] text-white/45 underline-offset-2 hover:text-white/80 hover:underline"
                      >
                        Photo: {item.credit}
                      </a>
                    )}
                  </figcaption>
                </div>

                {/* Quote: right two thirds, on the same slide colour. Extra bottom padding leaves room for the thumbnails. */}
                <div className="relative flex items-center overflow-hidden px-6 pb-16 pt-6 sm:px-10 sm:pb-20 md:col-span-2 md:px-[7%] md:pb-24 md:pt-16">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-6 left-3 select-none font-serif text-[9rem] leading-none text-amber-400/15 sm:text-[13rem] md:left-[4%]"
                  >
                    &ldquo;
                  </span>
                  <blockquote
                    className={`relative m-0 transition duration-700 ease-out ${
                      active ? "translate-y-0 opacity-100 delay-200" : "translate-y-4 opacity-0"
                    }`}
                  >
                    <p className="text-[clamp(1.4rem,3.1vw,3.25rem)] font-black leading-[1.1] tracking-[-0.035em]">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </blockquote>
                </div>
              </figure>
            );
          })}
        </div>

        {/* Thumbnails: overlap the slide's bottom edge, centred under the quote on desktop. */}
        <div className="relative z-20 -mt-9 sm:-mt-10 md:ml-[33.333%] lg:-mt-12">
          <div
            ref={thumbsRef}
            role="tablist"
            aria-label="Choose a quote"
            className="drag-scroll no-scrollbar flex gap-2 overflow-x-auto px-3 py-2 sm:gap-4 md:justify-center"
            {...thumbsDrag}
          >
            {quotes.map((item, i) => {
              const active = i === index;
              return (
                <button
                  key={item.slug}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`View ${item.name} testimonial`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setIndex(i)}
                  onKeyDown={onThumbKeyDown}
                  className="group flex w-[4.75rem] shrink-0 cursor-pointer flex-col items-center gap-2 rounded-xl focus-visible:outline-2 focus-visible:outline-amber-500 sm:w-24 lg:w-28"
                >
                  <span
                    className={`block h-14 w-14 overflow-hidden rounded-full ring-4 ring-cream transition duration-300 [container-type:inline-size] sm:h-16 sm:w-16 lg:h-20 lg:w-20 ${
                      active
                        ? "scale-110 outline-2 outline-offset-2 outline-amber-500"
                        : "opacity-60 grayscale group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                    }`}
                  >
                    <Portrait slug={item.slug} name={item.name} tone={i} alt="" small position="object-[50%_20%]" />
                  </span>
                  <span
                    className={`text-center text-[11px] font-bold leading-tight transition-colors sm:text-xs ${
                      active ? "text-night" : "text-neutral-500 group-hover:text-night"
                    }`}
                  >
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
