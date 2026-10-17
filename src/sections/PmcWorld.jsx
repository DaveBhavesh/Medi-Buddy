import { pmcWorld } from "../data/content";

/** Poster-style graphic from the reference: photo card, green wave with "what is PMC world?", Patriji overlapping. */
function PmcGraphic() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[560px] [container-type:inline-size]">
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
          <path d="M0 24C28 40 60 36 100 18V100H0Z" fill="#22b04b" />
        </svg>
        <div className="absolute bottom-[7%] left-[9%] text-white">
          <p className="text-[6.5cqw] font-medium leading-none tracking-wide">what is</p>
          <p className="font-display text-[16cqw] font-medium uppercase leading-[0.95]">PMC</p>
          <p className="font-serif text-[7.5cqw] italic leading-none">world?</p>
        </div>
      </div>

      <a
        href="#videos"
        className="absolute left-[6%] top-[4%] z-20 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[3.2cqw] font-semibold text-[#22b04b] shadow-md min-[560px]:text-sm"
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
  const { eyebrow, title, subtitle, paragraphs, cta } = pmcWorld;

  return (
    <section id="pmc" className="py-16 sm:py-24">
      <div className="w-full px-[10px]">
        <header className="text-center">
          <h2 className="text-4xl font-black tracking-[-0.045em] text-[#201c1c] sm:text-6xl lg:text-7xl">
            {title}
          </h2>
          <p className="mt-2 text-xl font-bold italic text-[#22b04b] sm:text-3xl lg:text-4xl">
            {eyebrow}
          </p>
        </header>

        <div className="mx-auto mt-10 grid max-w-6xl items-center gap-10 sm:mt-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="text-2xl font-bold italic leading-tight sm:text-3xl">{subtitle}</h3>
            {paragraphs.map((text) => (
              <p key={text} className="mt-5 text-base leading-7 text-neutral-700 sm:text-lg sm:leading-8">
                {text}
              </p>
            ))}
            <a
              href={cta.href}
              className="mt-7 inline-flex min-h-12 items-center rounded-full bg-neutral-950 px-7 py-3 text-sm font-black text-white transition hover:bg-[#22b04b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22b04b]"
            >
              {cta.label}
            </a>
          </div>

          <PmcGraphic />
        </div>
      </div>
    </section>
  );
}
