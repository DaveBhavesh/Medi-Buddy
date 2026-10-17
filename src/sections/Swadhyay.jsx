import { swadhyay } from "../data/sections";

/** Swadhyay Yog banner (layout of the reference): yellow frame, dark photo panel + white title swoosh, quote strip. */
export default function Swadhyay() {
  const { title, by, photo, photoAlt, quote, quoteBy, watch } = swadhyay;

  return (
    <section id="swadhyay" className="bg-white py-10 sm:py-16">
      <div className="w-full px-[10px]">
        <div className="overflow-hidden rounded-[1.5rem] bg-[#fdbb24] sm:rounded-[2.25rem]">
          {/* Top: photo panel + title */}
          <div className="grid gap-3 p-3 sm:p-6 md:grid-cols-[1.15fr_1fr] md:gap-0 md:p-8 lg:p-10">
            <div className="relative overflow-hidden rounded-[1.5rem] bg-[#514840] sm:rounded-[2.5rem] md:rounded-r-[3rem] md:rounded-l-[2.5rem] md:pr-0">
              <img
                src={`/assets/${photo}`}
                alt={photoAlt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover object-[50%_25%] md:aspect-[4/3.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#514840]/50 to-transparent" />
              <a
                href={watch.href}
                className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[#fdbb24] px-3.5 py-1.5 text-sm font-semibold text-[#3b332c] shadow-md sm:left-6 sm:top-6"
              >
                {watch.label}
                <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden="true">
                  <path d="M6 4v16l14-8z" />
                </svg>
              </a>
            </div>

            <div className="flex flex-col justify-center rounded-[1.5rem] bg-white px-6 py-8 sm:rounded-[2.5rem] md:-ml-14 md:rounded-l-[4.5rem] md:rounded-r-[2.5rem] md:pl-20 md:pr-8">
              <h2 className="font-display text-[clamp(2.6rem,7vw,5.5rem)] font-medium uppercase leading-[0.92] tracking-tight text-[#514840]">
                {title[0]}
                <br />
                {title[1]}
              </h2>
              <p className="mt-3 font-serif text-xl italic leading-tight text-[#514840] sm:text-3xl">
                {by}
              </p>
            </div>
          </div>

          {/* Quote strip */}
          <figure className="flex items-center justify-between gap-4 bg-[#514840] px-5 py-6 text-white sm:px-10 sm:py-8 lg:px-16">
            <blockquote>
              <p className="max-w-xl text-xl font-bold leading-snug sm:text-3xl">{quote}</p>
              <figcaption className="mt-2 font-serif text-base italic text-white/85 sm:text-xl">
                - {quoteBy}
              </figcaption>
            </blockquote>
          </figure>
        </div>
      </div>
    </section>
  );
}
