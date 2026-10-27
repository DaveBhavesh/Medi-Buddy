import { journey } from "../data/content";

/**
 * "Our journey in numbers" (client design): rows that alternate photo | number card and
 * number card | photo. Each photo melts into its card's colour where they meet, a short
 * bridge with rounded notches joins the two, and each row tucks slightly under the one above.
 * Phones: photo on top, number card overlapping its lower edge.
 */

// Long numbers get a smaller size so they always fit the card (cqw = % of the card's width).
const numberSize = (value) => `${Math.min(38, 90 / (value.length * 0.5))}cqw`;

function WatchPill({ color, className }) {
  return (
    <a
      href="#explore"
      style={{ backgroundColor: color }}
      className={`absolute top-3 z-10 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-sm font-semibold text-white shadow-md sm:top-4 ${className}`}
    >
      watch
      <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor" aria-hidden="true">
        <path d="M6 4v16l14-8z" />
      </svg>
    </a>
  );
}

function JourneyRow({ item, index }) {
  const flip = index % 2 === 1; // odd rows: number card on the left, photo on the right
  return (
    <li
      className={`relative sm:aspect-[100/36.75] ${index > 0 ? "mt-6 sm:-mt-[4.9%]" : ""}`}
    >
      {/* Photo (49% wide) */}
      <div
        className={`relative aspect-[4/3] overflow-hidden rounded-2xl sm:absolute sm:top-0 sm:aspect-auto sm:h-full sm:w-[49%] ${
          flip ? "sm:right-0" : "sm:left-0"
        }`}
      >
        <img
          src={`/assets/${item.image}`}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        {/* The photo takes on the card's colour on the side where they meet. */}
        <div
          className="absolute inset-0 hidden sm:block"
          style={{
            background: `linear-gradient(${flip ? "to left" : "to right"}, transparent 45%, ${item.color}e6 100%)`,
          }}
          aria-hidden="true"
        />
        <WatchPill color={item.color} className={flip ? "right-3 sm:right-4" : "left-3 sm:left-4"} />
      </div>

      {/* Bridge between photo and card, with rounded notches cut at both ends. */}
      <div
        aria-hidden="true"
        className={`absolute hidden w-[4.5%] sm:block ${flip ? "left-[47%] top-[31%] h-[59%]" : "left-[48.5%] top-[10%] h-[59%]"}`}
        style={{ backgroundColor: item.color }}
      >
        <span className="absolute left-1/2 top-0 aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
        <span className="absolute bottom-0 left-1/2 aspect-square w-[78%] -translate-x-1/2 translate-y-1/2 rounded-full bg-white" />
      </div>

      {/* Number card (38.5% wide): top-aligned on even rows, bottom-aligned on odd rows. */}
      <div
        style={{ backgroundColor: item.color }}
        className={`relative z-[1] -mt-12 flex w-[86%] flex-col items-end justify-center rounded-2xl px-[9%] py-8 text-right [container-type:inline-size] sm:absolute sm:mt-0 sm:h-[78.5%] sm:w-[38.5%] sm:py-0 ${
          flip ? "sm:bottom-0 sm:left-[9%]" : "ml-auto sm:left-[52.5%] sm:top-0"
        }`}
      >
        <p
          className="font-display font-semibold leading-[0.9] tracking-tight text-white"
          style={{ fontSize: numberSize(item.value) }}
        >
          {item.value}
        </p>
        <p className="mt-[3cqw] font-display text-[13cqw] font-medium leading-[0.95] tracking-tight">
          {item.lines.map((line) => (
            <span key={line.text} className="block" style={{ color: line.soft ? item.tint : "#fff" }}>
              {line.text}
            </span>
          ))}
        </p>
      </div>
    </li>
  );
}

export default function OurJourney() {
  return (
    <section id="journey" className="panel panel-light py-16 sm:py-24" aria-labelledby="journey-heading">
      <div className="panel-inner w-full">
        <h2
          id="journey-heading"
          className="text-center text-3xl tracking-[-0.02em] text-black sm:text-5xl lg:text-6xl"
        >
          <span className="font-black">OUR JOURNEY</span> <span className="font-normal">IN NUMBERS</span>
        </h2>
        <ol className="mx-auto mt-10 max-w-6xl list-none p-0 sm:mt-14">
          {journey.map((item, i) => (
            <JourneyRow key={item.value} item={item} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
