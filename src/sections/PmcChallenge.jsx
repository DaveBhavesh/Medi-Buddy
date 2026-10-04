import { challenge } from "../data/content";

/**
 * PMC Meditation Challenge, laid out like the reference:
 *   headline top-left
 *   big rounded colour panel (cutout figure + giant "21 days")  |  text + pill button
 *   "Live on" row                                               |  small rounded card docked at the corner
 * The card has a thick white border and overlaps the panel's corner, which creates the notched look.
 */
export default function PmcChallenge() {
  const { titleTop, titleAccent, panel, copy, cta, liveOnLabel, liveOn, card } = challenge;

  return (
    <section id="challenge" className="bg-white py-16 sm:py-24 lg:py-28">
      <div className="w-full px-[10px]">
        <div className="w-full">
          <h2 className="whitespace-nowrap text-[clamp(1.4rem,6.6vw,4.5rem)] font-black leading-none tracking-[-0.05em]">
            {titleTop} <span className="text-amber-400">{titleAccent}</span>
          </h2>

          <div className="mt-8 grid gap-x-8 lg:mt-10 lg:grid-cols-12">
            {/* Big colour panel */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#5b3a9e] via-[#8a4aa6] to-[#e0558f] min-[520px]:aspect-[16/11] lg:col-span-8 lg:rounded-[2.25rem]">
              <img
                src={`/assets/${panel.figure}`}
                alt={panel.figureAlt}
                loading="lazy"
                decoding="async"
                className="absolute bottom-0 left-[3%] h-[78%] w-auto max-w-[62%] object-contain object-bottom min-[520px]:h-[94%] min-[520px]:max-w-[58%]"
              />
              <div
                className="absolute right-[6%] top-[8%] flex flex-col items-end text-right text-[#f8de5c] min-[520px]:top-1/2 min-[520px]:-translate-y-1/2"
                aria-hidden="true"
              >
                <span className="text-[clamp(6rem,19vw,8rem)] font-black leading-[0.8] tracking-[-0.06em] min-[520px]:text-[clamp(7rem,15vw,16rem)] lg:text-[clamp(8rem,13vw,15rem)]">
                  {panel.number}
                </span>
                <span className="mt-2 text-lg font-black uppercase tracking-[0.35em] sm:text-2xl lg:text-3xl">
                  {panel.numberLabel}
                </span>
              </div>
              <ul className="absolute left-4 top-4 flex gap-2 sm:left-6 sm:top-6" aria-label="Challenge highlights">
                {panel.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-black/35 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-white backdrop-blur"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            {/* Text + pill button */}
            <div className="flex flex-col justify-center py-8 lg:col-span-4 lg:py-0 lg:pl-2">
              <p className="text-lg leading-8 text-neutral-800 sm:text-xl">{copy}</p>
              <a
                href={cta.href}
                className="mt-7 inline-flex w-fit rounded-full bg-neutral-100 px-7 py-4 text-sm font-black text-neutral-950 transition hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
              >
                {cta.label}
              </a>
            </div>

            {/* Live-on row */}
            <div className="order-last flex flex-wrap items-center gap-x-8 gap-y-2 lg:order-none lg:col-span-8 lg:self-center">
              <span className="text-lg font-semibold text-neutral-700">{liveOnLabel}</span>
              {liveOn.map((name) => (
                <span
                  key={name}
                  className="text-3xl font-black tracking-[-0.04em] text-neutral-300 sm:text-4xl lg:text-5xl"
                >
                  {name}
                </span>
              ))}
            </div>

            {/* Docked card: overlaps the panel's corner, white border makes the notch */}
            <a
              href={card.href}
              className="group relative z-10 mt-6 block w-full overflow-hidden rounded-[1.75rem] border-[10px] border-white bg-neutral-900 shadow-xl shadow-black/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 lg:col-span-4 lg:-mt-24 lg:ml-0 lg:w-auto lg:-translate-x-6 lg:self-start lg:rounded-[2rem]"
            >
              <img
                src={`/assets/${card.image}`}
                alt={card.imageAlt}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 grid place-items-center bg-black/15">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2.5 text-sm font-black text-neutral-950 backdrop-blur">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
                  </svg>
                  {card.label}
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
