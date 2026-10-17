import { beAMeditator } from "../data/sections";

/** Poster-style graphic from the reference: orange panel, grayscale photo, Patriji overlapping. */
function MeditatorGraphic({ photo, photoAlt, figure, figureAlt }) {
  return (
    <div className="relative mx-auto aspect-[10/11] w-full max-w-[860px] [container-type:inline-size] md:aspect-[16/10] lg:max-w-none">
      {/* Card */}
      <div className="absolute bottom-[8%] right-0 top-0 left-[42%] overflow-hidden rounded-tl-[6cqw] rounded-tr-[6cqw] rounded-br-[5cqw] rounded-bl-[1.5cqw] bg-neutral-900 md:left-[42%]">
        <img
          src={`/assets/${photo}`}
          alt={photoAlt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[50%_70%] grayscale"
        />
        <div className="absolute inset-0 bg-black/20" />
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-0 h-[66%] w-full"
          aria-hidden="true"
        >
          <path d="M0 0H100V62C78 70 40 74 0 100Z" fill="#050505" />
          <path d="M0 0H100V54C78 62 40 66 0 92Z" fill="#f5922f" />
        </svg>
        <div className="absolute left-[7%] right-[5%] top-[6%] text-right">
          <p className="font-display text-[5.4cqw] font-medium italic leading-none text-[#2a1a08]">
            Quick 15 mins
          </p>
          <p className="mt-[1cqw] font-display text-[7cqw] font-medium uppercase leading-[0.95] text-white">
            Guided Meditation
          </p>
          <p className="flex items-center justify-end gap-[1.5cqw] whitespace-nowrap font-display text-[7cqw] font-medium uppercase leading-[0.95] text-white">
            music
            <span className="block text-left font-sans text-[2.2cqw] font-semibold normal-case leading-tight text-white [text-shadow:0_1px_6px_rgba(0,0,0,.9)]">
              with Patriji&rsquo;s
              <br />
              Melodious Flute &amp;Voice
            </span>
          </p>
        </div>
        <div className="absolute bottom-[6%] right-[5%] text-right text-white">
          <a
            href="#videos"
            className="mb-[1.5cqw] inline-flex items-center gap-1.5 rounded-full bg-[#f5922f] px-3 py-1 text-[2.8cqw] font-semibold text-[#2a1a08] min-[640px]:text-sm"
          >
            watch
            <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor" aria-hidden="true">
              <path d="M6 4v16l14-8z" />
            </svg>
          </a>
          <p className="text-[3.4cqw] font-medium leading-none">Guided</p>
          <p className="font-display text-[7.2cqw] font-medium uppercase leading-[0.95]">Meditation</p>
          <p className="font-serif text-[3cqw] italic leading-tight">by Brahmarshi Patriji</p>
        </div>
      </div>

      <img
        src={`/assets/${figure}`}
        alt={figureAlt}
        width="865"
        height="1041"
        loading="lazy"
        decoding="async"
        className="absolute bottom-0 left-0 z-10 h-[66%] w-auto drop-shadow-[0_16px_28px_rgba(0,0,0,0.5)] md:h-[84%]"
      />
    </div>
  );
}

export default function BeAMeditator() {
  const { title, subtitle, copy, figure, figureAlt, photo, photoAlt, cta } = beAMeditator;

  return (
    <section id="be-a-meditator" className="bg-gradient-to-b from-night-2 to-night py-16 text-white sm:py-24">
      <div className="grid w-full items-center gap-10 px-[10px] lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 xl:gap-20">
        <div className="order-2 lg:order-1">
          <MeditatorGraphic photo={photo} photoAlt={photoAlt} figure={figure} figureAlt={figureAlt} />
        </div>

        <div className="order-1 text-center lg:order-2 lg:text-left">
          <h2 className="text-[clamp(2.1rem,9vw,5.5rem)] font-black leading-none tracking-[-0.045em] lg:text-[clamp(3rem,5.2vw,6rem)]">
            <span className="text-white">{title[0]}</span>{" "}
            <span className="text-yellow-300">{title[1]}</span>{" "}
            <span className="text-saffron">{title[2]}</span>
          </h2>
          <p className="mt-5 text-2xl font-bold italic sm:text-4xl lg:text-5xl">{subtitle}</p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-base sm:leading-7 lg:mx-0 lg:max-w-xl lg:text-lg lg:leading-8">
            {copy}
          </p>
          <a
            href={cta.href}
            className="mt-8 inline-flex min-h-12 items-center rounded-full bg-saffron px-8 py-3 text-sm font-black text-black transition hover:bg-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
          >
            {cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
