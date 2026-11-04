import { useState } from "react";
import ArrowIcon from "../components/ArrowIcon";
import AutoScrollRow from "../components/AutoScrollRow";
import YouTubeLoop from "../components/YouTubeLoop";
import { exploreCards } from "../data/content";

// Mouse/trackpad devices show a card's video on hover (the poster covers it otherwise).
// Touch screens can't hover, so there the videos are shown while they're on screen.
const canHover =
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function ExploreCard({ card }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#pmc"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="group relative block aspect-[2/3] overflow-hidden rounded-2xl bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
    >
      <YouTubeLoop
        videoId={card.videoId}
        title={`Video: ${card.title}`}
        active={canHover ? hovered : undefined}
        className="transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/10 to-transparent" />
      <span className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 text-base font-black uppercase leading-tight text-white sm:bottom-5 sm:left-5 sm:right-5 sm:text-lg lg:text-xl">
        <span>{card.title}</span> <ArrowIcon />
      </span>
    </a>
  );
}

export default function Explore() {
  return (
    <section id="explore" className="bg-cream py-16 sm:py-24">
      <div className="w-full px-5">
        {/* Centered and always on one line: the size follows the screen width (the line is about
            31 characters' width per font-size), capped at 3.25rem on large screens. */}
        <h2 className="whitespace-nowrap text-center text-[min(3.25rem,calc((100vw-40px)/31))] font-black leading-tight tracking-[-0.02em]">
          Do you have a hunger to increase the quality of your life?
        </h2>

        <AutoScrollRow
          label="explore topics"
          className="mt-10"
          speed={45}
          // Tall portrait tiles: 300px wide at 2:3 (450px tall), or 80% of the row on narrow phones.
          itemClassName="w-[min(300px,80cqw)]"
        >
          {exploreCards.map((card) => (
            <ExploreCard key={card.title} card={card} />
          ))}
        </AutoScrollRow>
      </div>
    </section>
  );
}
