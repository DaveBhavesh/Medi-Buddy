import YouTubeLoop from "../components/YouTubeLoop";
import { whyMeditation } from "../data/sections";

// Desktop corner pieces. The photo and the video card meet at one corner and are joined by
// two concave curves, so they read as one shape. The curves are drawn by painting the section
// colour (cream) over the edges: `fill` = cream inside a quarter circle, `round` = cream outside it.
const cream = "var(--color-cream)";
const fill = (at) => ({
  background: `radial-gradient(circle at ${at}, ${cream} calc(var(--r) - 0.5px), transparent var(--r))`,
});
const round = (at) => ({
  background: `radial-gradient(circle at ${at}, transparent calc(var(--r) - 0.5px), ${cream} var(--r))`,
});

/**
 * Why Meditation: one-line centred heading; a big photo panel with the text beside it, and an
 * autoplaying video card that merges into the photo's bottom-right corner (desktop).
 * On phones and tablets everything simply stacks.
 */
export default function WhyMeditation() {
  const { image, imageAlt, titleTop, titleAccent, questions, copy, benefits, cta, card } =
    whyMeditation;

  return (
    <section id="meditation" className="bg-cream py-16 sm:py-24 lg:py-28" aria-labelledby="why-meditation-heading">
      <div className="w-full px-5 [--r:1.75rem] xl:[--r:2.25rem]">
        <h2
          id="why-meditation-heading"
          className="whitespace-nowrap text-center text-[clamp(2.25rem,9vw,8.5rem)] font-black leading-[0.95] tracking-[-0.055em]"
        >
          {titleTop} <span className="text-amber-500">{titleAccent}</span>
        </h2>

        <div className="mt-8 grid lg:mt-12 lg:grid-cols-12">
          {/* Photo panel. Desktop: stretches to its row and runs --r past it, so its bottom edge
              always lines up with the card's top and can curve into it. */}
          <div className="relative aspect-[1600/1439] overflow-hidden rounded-[var(--r)] bg-gradient-to-br from-night-2 to-[#7a3fb0] sm:aspect-[4/3] lg:col-span-8 lg:col-start-1 lg:row-start-1 lg:-mb-[var(--r)] lg:aspect-auto lg:min-h-[clamp(28rem,40vw,44rem)] lg:rounded-b-none">
            <img
              src={`/assets/${image}`}
              alt={imageAlt}
              width="1600"
              height="1439"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-[50%_18%]"
            />
            <div aria-hidden="true" className="hidden lg:block">
              <span className="absolute bottom-0 left-0 right-[var(--r)] h-[var(--r)]" style={{ background: cream }} />
              <span className="absolute bottom-0 right-0 size-[var(--r)]" style={fill("bottom left")} />
              <span className="absolute bottom-[var(--r)] left-0 size-[var(--r)]" style={round("top right")} />
            </div>
          </div>

          {/* Text + button */}
          <div className="flex flex-col justify-center py-8 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:py-10 lg:pb-[calc(var(--r)+2.5rem)] lg:pl-10 xl:pl-14">
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
              className="mt-7 inline-flex min-h-12 w-fit items-center rounded-full bg-night px-7 py-3 text-sm font-black text-white transition hover:bg-amber-400 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
            >
              {cta.label}
            </a>
          </div>

          {/* Video card. Desktop: starts --r above its row and joins the photo at the corner. */}
          <a
            href={card.href}
            className="group relative block overflow-hidden rounded-[var(--r)] bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:-mt-[var(--r)] lg:rounded-t-none lg:pt-[var(--r)]"
          >
            {/* Sizes the visible part of the card to 16:9 (plus the hidden --r strip on desktop). */}
            <span className="block aspect-video" aria-hidden="true" />
            <YouTubeLoop videoId={card.videoId} title={card.videoTitle} ratio={16 / 9} />
            <div aria-hidden="true" className="hidden lg:block">
              <span className="absolute left-[var(--r)] right-0 top-0 z-10 h-[var(--r)]" style={{ background: cream }} />
              <span className="absolute left-0 top-0 z-10 size-[var(--r)]" style={fill("top right")} />
              <span className="absolute right-0 top-[var(--r)] z-10 size-[var(--r)]" style={round("bottom left")} />
            </div>
            <span className="absolute inset-0 z-10 grid place-items-center lg:top-[var(--r)]">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2.5 text-sm font-black text-neutral-950 backdrop-blur transition group-hover:bg-white">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
                </svg>
                {card.label}
              </span>
            </span>
          </a>

          {/* The questions, beside the video card (where the reference lists "Featured in"). */}
          <ul
            className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:col-span-8 lg:col-start-1 lg:row-start-2 lg:mt-0 lg:self-center lg:pr-10 lg:pt-[calc(var(--r)+1.5rem)]"
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
        </div>
      </div>
    </section>
  );
}
