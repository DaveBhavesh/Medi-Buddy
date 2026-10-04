import ArrowIcon from "../components/ArrowIcon";
import Carousel from "../components/Carousel";
import { exploreCards } from "../data/content";

export default function Explore() {
  return (
    <section id="explore" className="py-16 sm:py-24">
      <div className="w-full px-[10px]">
        {/* One line from tablet up (font scales with the viewport); wraps naturally on phones. */}
        <h2 className="text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl md:whitespace-nowrap md:text-[clamp(1.4rem,3.1vw,3.25rem)]">
          Do you have a hunger to increase the quality of your life?
        </h2>

        <Carousel
          label="explore topics"
          className="mt-10"
          itemClassName="w-[78%] min-[560px]:w-[46%] lg:w-[31%] xl:w-[23.5%]"
        >
          {exploreCards.map((card) => (
            <a
              key={card.title}
              href="#pmc"
              className="group relative block aspect-[3/2] overflow-hidden rounded-lg bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
            >
              <img
                src={`/assets/${card.image}`}
                alt=""
                loading="lazy"
                decoding="async"
                draggable="false"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent" />
              <span className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 text-sm font-black uppercase leading-tight text-white sm:bottom-4 sm:left-4 sm:right-4 sm:text-lg lg:text-xl xl:text-2xl xl:leading-none">
                <span>{card.title}</span> <ArrowIcon />
              </span>
            </a>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
