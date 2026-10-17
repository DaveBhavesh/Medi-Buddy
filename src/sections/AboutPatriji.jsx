import { useId, useState } from "react";
import { aboutPatriji } from "../data/sections";

/**
 * About Patri Ji: dark, centered, typographic (as in the reference). "More" expands the rest of the
 * biography smoothly; "Show Less" collapses it again.
 */
export default function AboutPatriji() {
  const { image, imageAlt, title, intro, more } = aboutPatriji;
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <section id="patriji" className="bg-black py-16 text-white sm:py-24 lg:py-28">
      <div className="w-full px-[10px]">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <img
            src={`/assets/${image}`}
            alt={imageAlt}
            width="676"
            height="676"
            loading="lazy"
            decoding="async"
            className="h-24 w-24 rounded-full object-cover object-[50%_20%] ring-2 ring-amber-400 ring-offset-4 ring-offset-black sm:h-28 sm:w-28"
          />
          <h2 className="mt-8 text-4xl font-black leading-none tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            {title}
          </h2>

          <p className="mt-7 text-base leading-7 text-white/85 sm:text-lg sm:leading-8">{intro}</p>

          <div
            id={panelId}
            className={`grid w-full transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none ${
              open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
            aria-hidden={!open}
          >
            <div className="overflow-hidden" inert={!open}>
              <p className="pt-5 text-base leading-7 text-white/85 sm:text-lg sm:leading-8">{more}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={panelId}
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-black text-black transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
          >
            {open ? "Show Less" : "More"}
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
