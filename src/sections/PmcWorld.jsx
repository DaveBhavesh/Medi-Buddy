import { pmcWorld } from "../data/content";

/**
 * Poster-style graphic from the reference: photo card, wave with "what is PMC world?", Patriji overlapping.
 * Phones/tablets: a 4:5 card. Desktop: exactly as tall as the text beside it (but never taller than
 * 4:5), so the image covers the slide without making the section longer than its text.
 */
function PmcGraphic() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[560px] [container-type:inline-size] lg:absolute lg:inset-x-0 lg:top-1/2 lg:aspect-auto lg:h-[min(100cqh,125cqw)] lg:max-w-none lg:-translate-y-1/2">
      <div className="absolute inset-y-0 left-0 w-[78%] overflow-hidden rounded-tl-[2rem] rounded-tr-[4.5rem] rounded-bl-[4.5rem] rounded-br-[2rem] bg-neutral-800">
        <img
          src="/assets/img-023.jpg"
          alt="A crowd of meditators with raised hands listening to Patriji"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[35%_30%] grayscale"
        />
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-[48%] w-full"
          aria-hidden="true"
        >
          <path d="M0 14C28 30 60 26 100 8V100H0Z" fill="#fff" />
          <path d="M0 24C28 40 60 36 100 18V100H0Z" fill="#7a3fb0" />
        </svg>
        <div className="absolute bottom-[7%] left-[9%] text-white">
          <p className="text-[6.5cqw] font-medium leading-none tracking-wide">what is</p>
          <p className="font-display text-[16cqw] font-medium uppercase leading-[0.95]">PMC</p>
          <p className="font-serif text-[7.5cqw] italic leading-none">world?</p>
        </div>
      </div>

      <a
        href="#explore"
        className="absolute left-[6%] top-[4%] z-20 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[3.2cqw] font-semibold text-orchid-deep shadow-md min-[560px]:text-sm"
      >
        watch
        <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor" aria-hidden="true">
          <path d="M6 4v16l14-8z" />
        </svg>
      </a>

      <img
        src="/assets/patriji-red-cutout.webp"
        alt="Patriji seated in a red kurta"
        width="863"
        height="1400"
        loading="lazy"
        decoding="async"
        className="absolute bottom-0 right-0 z-10 h-[72%] w-auto drop-shadow-[0_18px_28px_rgba(0,0,0,0.28)]"
      />
    </div>
  );
}

export default function PmcWorld() {
  const { eyebrow, title, subtitle, paragraphs, cta, secondaryCta, pillars, stats } = pmcWorld;

  return (
    <section id="pmc" className="panel panel-light py-16 sm:py-24">
      <div className="panel-inner w-full">
        {/* Desktop: text gets 60% of the width, the graphic fills the remaining 40%. */}
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-0">
          <div className="lg:pr-12 xl:pr-16">
            <p className="inline-flex items-center gap-2 rounded-full bg-orchid/10 px-4 py-1.5 text-sm font-bold italic text-orchid-deep sm:text-base">
              <span className="h-2 w-2 rounded-full bg-orchid" aria-hidden="true" />
              {eyebrow}
            </p>
            <h2 className="mt-5 text-5xl font-black leading-none tracking-[-0.045em] text-night sm:text-7xl lg:text-8xl">
              {title}
            </h2>
            <h3 className="mt-5 text-2xl font-bold italic leading-tight sm:text-3xl lg:text-4xl">{subtitle}</h3>
            {paragraphs.map((text) => (
              <p key={text} className="mt-5 max-w-4xl text-base leading-7 text-neutral-700 sm:text-lg sm:leading-8">
                {text}
              </p>
            ))}

            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {pillars.map((pillar, i) => (
                <li
                  key={pillar.title}
                  className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 transition hover:-translate-y-0.5 hover:border-orchid/50 hover:shadow-md"
                >
                  <span className="font-display text-sm font-semibold text-orchid">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="mt-1 text-lg font-black leading-snug">{pillar.title}</h4>
                  <p className="mt-1.5 text-sm leading-6 text-neutral-600">{pillar.text}</p>
                </li>
              ))}
            </ul>

            <dl className="mt-8 grid grid-cols-3 divide-x divide-neutral-200 rounded-2xl bg-night py-5 text-white">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse items-center px-2 text-center">
                  <dt className="mt-1 text-xs text-white/70 sm:text-sm">{stat.label}</dt>
                  <dd className="font-display text-3xl font-semibold text-gold sm:text-4xl">{stat.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={cta.href}
                className="inline-flex min-h-12 items-center rounded-full bg-night px-7 py-3 text-sm font-black text-white transition hover:bg-orchid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid"
              >
                {cta.label}
              </a>
              <a
                href={secondaryCta.href}
                className="inline-flex min-h-12 items-center rounded-full border border-night/25 px-7 py-3 text-sm font-black text-night transition hover:border-orchid hover:text-orchid-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid"
              >
                {secondaryCta.label}
              </a>
            </div>
          </div>

          {/* Desktop: this cell stretches to the text column's height and the graphic fills it
              (absolutely positioned, so the graphic itself never adds height to the section). */}
          <div className="relative lg:self-stretch lg:[container-type:size]">
            <PmcGraphic />
          </div>
        </div>
      </div>
    </section>
  );
}
