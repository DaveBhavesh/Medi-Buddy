import Header from "../components/Header";
import HeroSlider from "../components/HeroSlider";
import HeroVideoCard from "../components/HeroVideoCard";
import { heroVideo } from "../data/content";
import { heroSlides } from "../data/sections";

export default function Hero() {
  return (
    <section className="relative bg-[#1c2120] pb-[10px] text-white">
      <Header />

      <div className="relative z-10 mx-auto w-full px-[10px] pb-10 pt-28 text-center sm:pb-14 sm:pt-36 lg:pb-16 lg:pt-40">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-amber-300 sm:text-sm sm:tracking-[0.32em]">
          Awaken. Meditate. Transform.
        </p>
        <h1 className="text-[2.6rem] font-black leading-[0.95] tracking-[-0.055em] min-[400px]:text-5xl sm:text-7xl lg:text-[clamp(4rem,7.6vw,9rem)] lg:leading-none">
          Awaken your <span className="max-lg:block">inner master</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/80 sm:mt-6 sm:text-base lg:mt-8 lg:max-w-3xl lg:text-xl lg:leading-8">
          Join the global PSSM movement and transform your life through Pyramid Meditation, guided
          by meditation masters and spiritual scientists.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3 lg:mt-10 lg:gap-4">
          <a
            href="#meditation"
            className="inline-flex min-h-11 items-center rounded-full bg-white px-6 py-3 text-sm font-extrabold text-black transition hover:bg-amber-300 lg:min-h-14 lg:px-9 lg:text-base"
          >
            Join the Movement
          </a>
          <a
            href="#explore"
            className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-white/10 lg:min-h-14 lg:px-9 lg:text-base"
          >
            Learn Meditation
          </a>
        </div>
      </div>

      {/* Slider: fills the space between the 10px gutters; the video card floats over every slide. */}
      <div className="px-[10px]">
        <HeroSlider
          label="Featured images"
          slides={heroSlides}
          overlay={
            <div className="absolute bottom-[9%] right-[2.5%] z-10 w-[clamp(52px,13vw,230px)] sm:bottom-[10%]">
              <HeroVideoCard videoId={heroVideo.id} title={heroVideo.title} />
            </div>
          }
        />
      </div>
    </section>
  );
}
