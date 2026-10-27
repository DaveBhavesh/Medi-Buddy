import { useId, useState } from "react";
import YouTubeLoop from "../components/YouTubeLoop";
import { aboutPatriji } from "../data/sections";

/**
 * About Patri Ji: full-width video of Patriji playing silently in the background, with only the
 * title and a "Read more" button over it. Read more expands the biography over the video
 * (the video keeps running); "Show less" collapses it again.
 */
export default function AboutPatriji() {
  const { video, title, intro, more } = aboutPatriji;
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <section
      id="patriji"
      className="panel relative isolate flex min-h-[75svh] items-center overflow-hidden bg-night py-20 text-white sm:min-h-[85svh] sm:py-28"
    >
      {/* Background layers. A <figure>, not a <div>, so the section fade-in in index.css doesn't move them. */}
      <figure className="absolute inset-0 -z-10 m-0" aria-hidden="true">
        <YouTubeLoop videoId={video.id} title={video.title} ratio={16 / 9} />
        {/* Darkens the video for legible text; darker while the biography is open. */}
        <div
          className={`absolute inset-0 bg-night transition-opacity duration-500 ${
            open ? "opacity-75" : "opacity-45"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/60" />
      </figure>

      <div className="panel-inner w-full">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="text-5xl font-black leading-none tracking-[-0.045em] [text-shadow:0_2px_24px_rgb(0_0_0/0.5)] sm:text-7xl lg:text-8xl">
            {title}
          </h2>

          <div
            id={panelId}
            className={`grid w-full transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none ${
              open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
            aria-hidden={!open}
          >
            <div className="overflow-hidden" inert={!open}>
              <div className="space-y-5 pt-8 text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
                <p>{intro}</p>
                <p>{more}</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={panelId}
            className="mt-10 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-black text-black transition hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
          >
            {open ? "Show less" : "Read more"}
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
