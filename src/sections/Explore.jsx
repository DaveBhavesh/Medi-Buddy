import ArrowIcon from "../components/ArrowIcon";
import AutoScrollRow from "../components/AutoScrollRow";
import { exploreCards } from "../data/content";

export default function Explore() {
  return (
    <section id="explore" className="bg-cream py-16 sm:py-24">
      <div className="w-full px-[10px]">
        {/* Centered; one line from tablet up (font scales with the viewport), wraps neatly on phones. */}
        <h2 className="mx-auto max-w-5xl text-center text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl md:text-[clamp(1.4rem,3.1vw,3.25rem)] md:whitespace-nowrap">
          Do you have a hunger to increase the quality of your life?
        </h2>

        <AutoScrollRow
          label="explore topics"
          className="mt-10"
          speed={45}
          itemClassName="w-[82cqw] min-[560px]:w-[calc((100cqw-10px)/2)] lg:w-[calc((100cqw-20px)/3)] xl:w-[calc((100cqw-35px)/3.5)]"
        >
          {exploreCards.map((card) => (
            <a
              key={card.title}
              href="#pmc"
              className="group relative block aspect-[4/5] overflow-hidden rounded-xl bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
            >
              <img
                src={`/assets/${card.image}`}
                alt=""
                loading="lazy"
                decoding="async"
                draggable="false"
                className="h-full w-full object-cover object-[50%_30%] transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/10 to-transparent" />
              <span className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 text-base font-black uppercase leading-tight text-white sm:bottom-5 sm:left-5 sm:right-5 sm:text-xl lg:text-2xl">
                <span>{card.title}</span> <ArrowIcon />
              </span>
            </a>
          ))}
        </AutoScrollRow>
      </div>
    </section>
  );
}
