import { getPersonPhoto } from "../lib/people";
import { swadhyay } from "../data/sections";

/**
 * Swadhyay Yog banner (client design): yellow band; brown rounded panel with a photo of Patriji
 * reading; white title panel whose S-curved left edge flows over the brown panel;
 * dark quote strip below with the author's photo fading in on the right.
 * Phones: the brown panel and the white title panel stack.
 */
export default function Swadhyay() {
  const { title, by, photo, photoAlt, quote, quoteBy, quoteBySlug, quoteByAsset, watch } = swadhyay;
  const authorPhoto = getPersonPhoto(quoteBySlug, quoteByAsset);

  return (
    <section id="swadhyay" className="bg-cream py-10 sm:py-16">
      <div className="w-full px-5">
        <div className="overflow-hidden rounded-[2rem] bg-gold sm:rounded-[2.5rem]">
          <div className="px-4 py-6 sm:px-8 sm:py-10 lg:px-[6%] lg:py-14">
            <div className="relative md:h-[clamp(17rem,30vw,30rem)]">
              {/* Brown photo panel */}
              <div className="relative h-[17rem] overflow-hidden rounded-[2rem] bg-night-2 sm:h-[20rem] md:absolute md:inset-y-0 md:left-0 md:h-auto md:w-[80%] md:rounded-[clamp(2rem,4vw,3.5rem)]">
                {/* Photo cropped to Patriji and the books (the bottom of the file is empty), faded into the panel. */}
                <div className="swadhyay-photo absolute inset-y-0 left-1/2 aspect-[270/320] -translate-x-1/2 md:left-[14%] md:translate-x-0">
                  <img
                    src={`/assets/${photo}`}
                    alt={photoAlt}
                    width="270"
                    height="480"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <a
                  href={watch.href}
                  className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-1.5 text-sm font-semibold text-night shadow-md sm:left-6 sm:top-6 lg:left-8 lg:top-8 lg:text-base"
                >
                  {watch.label}
                  <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden="true">
                    <path d="M6 4v16l14-8z" />
                  </svg>
                </a>
              </div>

              {/* Yellow copy of the swoosh, nudged left: draws the gap along the curve. */}
              <div
                aria-hidden="true"
                className="swadhyay-swoosh absolute inset-y-0 left-[calc(55%-0.9rem)] right-0 hidden rounded-[clamp(2rem,4vw,3.5rem)] bg-gold md:block"
              />

              {/* White title panel */}
              <div className="swadhyay-swoosh relative mt-3 flex flex-col items-end justify-center rounded-[2rem] bg-white px-6 py-8 text-right md:absolute md:inset-y-0 md:left-[55%] md:right-0 md:mt-0 md:rounded-[clamp(2rem,4vw,3.5rem)] md:py-0 md:pr-[7%]">
                <h2 className="font-display text-6xl font-medium uppercase leading-[0.92] tracking-tight text-night-2 md:text-[clamp(2.75rem,6.2vw,7rem)]">
                  {title[0]}
                  <br />
                  {title[1]}
                </h2>
                <p className="mt-2 max-w-[8em] font-serif text-2xl italic leading-tight text-night-2 md:text-[clamp(1.4rem,2.7vw,2.9rem)]">
                  {by}
                </p>
              </div>
            </div>
          </div>

          {/* Quote strip */}
          <figure className="relative isolate m-0 flex min-h-[9rem] items-center overflow-hidden bg-night-2 px-6 py-8 text-white sm:min-h-[11rem] sm:px-10 md:px-[14%] lg:min-h-[13rem]">
            {authorPhoto && (
              <img
                src={authorPhoto}
                alt={quoteBy}
                loading="lazy"
                decoding="async"
                className="swadhyay-quote-photo absolute inset-y-0 right-0 -z-10 h-full w-[55%] object-cover object-top opacity-60 grayscale sm:right-[6%] sm:w-[min(40%,26rem)] sm:opacity-90"
              />
            )}
            <blockquote className="m-0">
              <p className="max-w-[22em] text-xl font-bold leading-snug sm:text-[clamp(1.5rem,2.6vw,2.4rem)]">
                {quote}
              </p>
              <figcaption className="mt-1 text-base italic text-white/90 sm:text-[clamp(1.1rem,1.8vw,1.6rem)]">
                - {quoteBy}
              </figcaption>
            </blockquote>
          </figure>
        </div>
      </div>
    </section>
  );
}
