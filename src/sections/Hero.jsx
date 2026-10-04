import Header from "../components/Header";
import HeroVideoCard from "../components/HeroVideoCard";
import { heroVideo } from "../data/content";

export default function Hero() {
  return (
    <section className="relative bg-[#1c2120] text-white">
      <Header />

      <div className="relative z-10 mx-auto max-w-4xl px-[10px] pb-12 pt-28 text-center sm:pb-16 sm:pt-36">
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
        Full-bleed hero image shown at its own aspect ratio (no height cap, no cropping).
        The square video card always sits inside the empty bottom-right corner of the poster
        (it scales with the screen) so it never covers the poster text.
      */}
      <div className="relative w-full">
        <img
          src="/assets/img-004.jpg"
          alt="Free 21-day meditation challenge with Patriji"
          width="1400"
          height="798"
          fetchPriority="high"
          decoding="async"
          className="block h-auto w-full"
        />

        <div className="absolute bottom-[3%] right-[10px] z-10 w-[clamp(60px,15vw,260px)]">
          <HeroVideoCard videoId={heroVideo.id} title={heroVideo.title} />
        </div>
      </div>
    </section>
  );
}
