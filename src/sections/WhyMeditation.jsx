import { whyMeditation } from "../data/content";

/**
 * Large "Why Meditation?" heading on top, then Patriji's photo and the text below it.
 *  - lg+: photo on the left (fading out to the right) next to the text column
 *  - phones/tablets: heading, then photo (fading out at the bottom), then the text
 */
export default function WhyMeditation() {
  const { image, imageAlt, eyebrow, honorific, name, role, lead, copy, benefits, cta } =
    whyMeditation;

  return (
    <section
      id="meditation"
      className="relative isolate overflow-hidden bg-gradient-to-br from-[#0a3a66] via-[#0e4a80] to-[#135a96] text-white"
      aria-labelledby="why-meditation-heading"
    >
      <div className="mx-auto max-w-[1760px] px-4 pt-14 sm:pt-20 lg:pt-24">
        <h2
          id="why-meditation-heading"
          className="text-5xl font-black leading-none tracking-[-0.045em] sm:text-6xl lg:text-7xl xl:text-8xl"
        >
          Why <span className="text-amber-300">Meditation?</span>
        </h2>
      </div>

      <div className="mt-6 lg:mt-8 lg:grid lg:grid-cols-[58%_42%]">
        <div className="relative lg:min-h-[640px]">
          <img
            src={`/assets/${image}`}
            alt={imageAlt}
            loading="lazy"
            decoding="async"
            className="why-photo block aspect-[1.1] w-full object-cover object-top sm:aspect-[1.45] lg:absolute lg:inset-0 lg:aspect-auto lg:h-full lg:object-[50%_30%]"
          />
        </div>

        <div className="px-4 pb-14 pt-6 sm:pb-16 lg:py-16 lg:pl-0 lg:pr-[4vw]">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/75">
            {honorific}
          </p>
          <h3 className="mt-1 text-4xl font-black leading-[0.95] tracking-[-0.05em] sm:text-5xl lg:text-[clamp(2.75rem,4.4vw,4.5rem)]">
            {name}
          </h3>
          <p className="mt-3 text-sm font-semibold text-white/80">{role}</p>

          <p className="mt-7 text-xl font-bold leading-snug sm:text-2xl">{lead}</p>
          <p className="mt-4 leading-7 text-white/80">{copy}</p>

          <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {benefits.map((item) => (
              <li key={item.title} className="border-t border-white/20 pt-4">
                <h4 className="text-base font-black text-amber-300">{item.title}</h4>
                <p className="mt-1.5 text-sm leading-6 text-white/80">{item.text}</p>
              </li>
            ))}
          </ul>

          <a
            href={cta.href}
            className="mt-9 inline-flex rounded-full bg-amber-400 px-6 py-3 text-sm font-black text-black transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
          >
            {cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
