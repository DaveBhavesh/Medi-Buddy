import { useState } from "react";
import Carousel from "../components/Carousel";
import VideoModal from "../components/VideoModal";
import { testimonialCategories, testimonialsIntro } from "../data/sections";

const icons = {
  career: (
    <path d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1m-9 0h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm-2 6h18" />
  ),
  relationships: (
    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
  ),
  "astral-travel": (
    <>
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
      <path d="M17 4v3M15.5 5.5h3" />
    </>
  ),
};

const gradients = {
  career: "from-night-2 to-orchid",
  relationships: "from-orchid to-plum",
  "astral-travel": "from-night to-[#4b2a7f]",
};

function PlayBadge() {
  return (
    <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 pl-1 text-black shadow-lg transition group-hover:scale-110 sm:h-16 sm:w-16">
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
      </svg>
    </span>
  );
}

function Thumbnail({ item }) {
  const src = item.videoId
    ? `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`
    : item.poster
      ? `/assets/${item.poster}`
      : null;

  return (
    <div className="relative h-full overflow-hidden bg-neutral-800">
      {src ? (
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          draggable="false"
          className="h-full w-full object-cover object-[50%_30%] transition duration-500 group-hover:scale-105"
        />
      ) : (
        <div className={`grid h-full w-full place-items-center bg-gradient-to-br ${gradients[item.id] ?? gradients.career}`}>
          <svg
            viewBox="0 0 24 24"
            width="56"
            height="56"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/40"
            aria-hidden="true"
          >
            {icons[item.id]}
          </svg>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
      <div className="absolute inset-0 grid place-items-center">
        <PlayBadge />
      </div>
      {!item.videoId && (
        <span className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
          Video coming soon
        </span>
      )}
    </div>
  );
}

export default function Testimonials() {
  const [playing, setPlaying] = useState(null);

  return (
    <section id="testimonials" className="panel panel-dark py-16 sm:py-24">
      <div className="panel-inner w-full">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-400">Real stories</p>
        <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
          Testimonials by Category
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
          {testimonialsIntro}
        </p>

        <Carousel
          label="testimonials"
          theme="dark"
          className="mt-10"
          // Same widths and 3:4 shape as the author cards.
          itemClassName="w-[80%] min-[520px]:w-[calc((100%-10px)/2)] md:w-[calc((100%-20px)/3)] lg:w-[calc((100%-30px)/4)] xl:w-[calc((100%-40px)/5)]"
        >
          {testimonialCategories.map((item) => (
            <article key={item.id} className="group flex aspect-[3/4] w-full flex-col overflow-hidden rounded-2xl bg-white text-black">
              <button
                type="button"
                onClick={() => item.videoId && setPlaying(item)}
                aria-disabled={!item.videoId}
                aria-label={
                  item.videoId ? `Play ${item.title} testimonial video` : `${item.title} testimonial video (coming soon)`
                }
                className={`block min-h-0 w-full flex-1 text-left focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-amber-500 ${
                  item.videoId ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <Thumbnail item={item} />
              </button>
              <div className="p-4 sm:p-5">
                <h3 className="text-xl font-black leading-tight tracking-[-0.02em] sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-neutral-600" title={item.description}>
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </Carousel>
      </div>

      {playing && (
        <VideoModal
          videoId={playing.videoId}
          title={`${playing.title} testimonial`}
          onClose={() => setPlaying(null)}
        />
      )}
    </section>
  );
}
