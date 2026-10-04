import { pmcWorld } from "../data/content";

/**
 * "PMC World" channel block.
 *  - Full-width photo (shown at its own ratio, never cropped); it is mirrored so Patriji sits on the left.
 *  - lg+: the white content card sits on the right and overlaps the photo, hanging slightly past its edges.
 *  - phones/tablets: the card follows the photo and overlaps its bottom edge.
 */
export default function PmcWorld() {
  const { image, imageAlt, eyebrow, title, subtitle, paragraphs, cta } = pmcWorld;

  return (
    <section id="pmc" className="px-[10px] py-12 sm:py-16 lg:py-24">
      <div className="relative">
        <img
          src={`/assets/${image}`}
          alt={imageAlt}
          width="1372"
          height="772"
          loading="lazy"
          decoding="async"
          className="block h-auto w-full -scale-x-100 rounded-[1.25rem] sm:rounded-[1.75rem] lg:rounded-[2.25rem]"
        />

        <div className="relative z-10 -mt-12 rounded-[1.25rem] bg-white p-5 shadow-2xl shadow-black/15 ring-1 ring-black/5 sm:-mt-20 sm:rounded-[1.75rem] sm:p-8 lg:absolute lg:right-[2%] lg:top-1/2 lg:mt-0 lg:w-[46%] lg:max-w-[680px] lg:-translate-y-1/2 lg:p-10 xl:p-12">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-amber-500 sm:text-sm sm:tracking-[0.28em]">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-5xl font-black tracking-[-0.05em] sm:text-6xl">{title}</h2>
          <h3 className="mt-5 text-lg font-semibold italic sm:text-2xl lg:mt-6">{subtitle}</h3>
          {paragraphs.map((text) => (
            <p key={text} className="mt-4 text-sm leading-7 text-neutral-600 sm:text-base">
              {text}
            </p>
          ))}
          <a
            href={cta.href}
            className="mt-6 inline-flex min-h-11 items-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-black text-white transition hover:bg-amber-500 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
          >
            {cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
