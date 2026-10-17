import { whyMeditation } from "../data/sections";

/**
 * Why Meditation: heading top-left, big photo panel, text + button on the right and a small
 * "Watch video" card docked into the panel's corner (layout of the reference).
 */
export default function WhyMeditation() {
  const { image, imageAlt, titleTop, titleAccent, questions, copy, benefits, cta, card } =
    whyMeditation;

  return (
    <section id="meditation" className="bg-white py-16 sm:py-24 lg:py-28" aria-labelledby="why-meditation-heading">
      <div className="w-full px-[10px]">
        <h2
          id="why-meditation-heading"
          className="text-[clamp(3rem,10vw,8.5rem)] font-black leading-[0.9] tracking-[-0.055em]"
        >
          {titleTop}
          <br />
          <span className="text-amber-500">{titleAccent}</span>
        </h2>

        <div className="mt-8 grid gap-x-8 lg:mt-12 lg:grid-cols-12">
          {/* Photo panel */}
          <div className="relative aspect-[1600/1439] overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#2b63c7] to-[#3b82e6] sm:aspect-[4/3] lg:col-span-8 lg:rounded-[2.25rem]">
            <img
              src={`/assets/${image}`}
              alt={imageAlt}
              width="1600"
              height="1439"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-[50%_18%]"
            />
          </div>

          {/* Text + button */}
          <div className="flex flex-col justify-center py-8 lg:col-span-4 lg:py-0">
            <p className="text-lg leading-8 text-neutral-800 sm:text-xl">{copy}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Benefits of meditation">
              {benefits.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-neutral-100 px-3.5 py-1.5 text-sm font-bold text-neutral-800"
                >
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={cta.href}
              className="mt-7 inline-flex min-h-12 w-fit items-center rounded-full bg-neutral-950 px-7 py-3 text-sm font-black text-white transition hover:bg-amber-400 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
            >
              {cta.label}
            </a>
          </div>

          {/* The questions, where the reference lists "Featured in" */}
          <ul
            className="order-last mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:order-none lg:col-span-8 lg:mt-0 lg:self-center"
            aria-label="Questions about meditation"
          >
            {questions.map((question) => (
              <li
                key={question}
                className="border-t border-neutral-200 pt-3 text-lg font-black leading-snug tracking-[-0.02em] text-neutral-500 sm:text-xl"
              >
                {question}
              </li>
            ))}
          </ul>

          {/* Docked video card */}
          <a
            href={card.href}
            className="group relative z-10 mt-6 block w-full overflow-hidden rounded-[1.75rem] border-[10px] border-white bg-neutral-900 shadow-xl shadow-black/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 min-[560px]:ml-auto min-[560px]:w-[60%] lg:col-span-4 lg:-mt-24 lg:ml-0 lg:w-auto lg:-translate-x-6 lg:self-start lg:rounded-[2rem]"
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
    </section>
  );
}
