import Header from "../components/Header";
import HeroVideoCard from "../components/HeroVideoCard";
import { heroVideo } from "../data/content";

export default function Hero() {
  return (
    <section className="relative bg-[#1c2120] pb-32 text-white md:pb-16 lg:pb-0">
      <Header />

      <div className="relative z-10 mx-auto max-w-4xl px-5 pb-12 pt-28 text-center sm:pb-16 sm:pt-36">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-amber-300 sm:text-xs sm:tracking-[0.28em]">
          Awaken. Meditate. Transform.
        </p>
        <h1 className="text-4xl font-black leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
          Awaken your
          <br />
          inner master
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
          Join the Global PSSM movement and transform your life through Pyramid Meditation with
          guidance from meditation masters and spiritual scientists.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href="#meditation"
            className="rounded-full bg-white px-6 py-3 text-sm font-extrabold text-black"
          >
            Join the Movement
          </a>
          <a
            href="#explore"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-extrabold text-white"
          >
            Learn Meditation
          </a>
        </div>
      </div>

      {/*
        Full-bleed hero image. The 7/4 ratio matches the artwork, so nothing is cropped
        on normal screens; max-h + object-cover only kicks in on very tall/wide windows.
        Below `lg` the video card hangs over the bottom edge so it never covers the poster text.
      */}
      <div className="relative w-full">
        <div className="relative aspect-[7/4] max-h-[92svh] w-full overflow-hidden bg-[#2a1f3d]">
          <img
            src="/assets/img-004.jpg"
            alt="Free 21-day meditation challenge with Patriji"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[30%_center]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        <div className="absolute -bottom-28 right-3 z-10 w-[clamp(96px,8.8vw,170px)] sm:right-6 md:-bottom-14 lg:bottom-6">
          <HeroVideoCard videoId={heroVideo.id} title={heroVideo.title} />
        </div>
      </div>
    </section>
  );
}
