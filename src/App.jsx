import ArrowIcon from "./components/ArrowIcon";
import Footer from "./components/footer/Footer";
import AboutPatriji from "./sections/AboutPatriji";
import Authors from "./sections/Authors";
import BeAMeditator from "./sections/BeAMeditator";
import Explore from "./sections/Explore";
import Hero from "./sections/Hero";
import PmcWorld from "./sections/PmcWorld";
import QuoteBanner from "./sections/QuoteBanner";
import Quotes from "./sections/Quotes";
import Swadhyay from "./sections/Swadhyay";
import Testimonials from "./sections/Testimonials";
import WhyMeditation from "./sections/WhyMeditation";
import { pillars } from "./data/content";

function App() {
  return (
    <main id="top" className="overflow-hidden bg-white text-[#17191a]">
      <Hero />
      <Explore />
      <AboutPatriji />
      <PmcWorld />
      <WhyMeditation />
      <Testimonials />
      <BeAMeditator />
      <QuoteBanner />
      <Swadhyay />
      <Authors />
      <Quotes />

      {/* Pillars */}
      <section id="pssm" className="relative isolate overflow-hidden py-16 text-white sm:py-28">
        <img
          src="/assets/img-023.jpg"
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-black/70" />
        <div className="grid w-full gap-10 px-[10px] md:grid-cols-2 md:gap-12">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
            <img
              src="/assets/img-011.jpg"
              alt="Patriji"
              loading="lazy"
              decoding="async"
              className="h-40 w-32 shrink-0 rounded-2xl object-cover sm:h-48 sm:w-40"
            />
            <h2 className="text-4xl font-black sm:text-5xl">Pillars for PSSM</h2>
          </div>
          <ul className="divide-y divide-white/20 text-base font-bold sm:text-xl">
            {pillars.map((item) => (
              <li key={item} className="flex justify-between gap-4 py-3">
                <span>{item}</span> <ArrowIcon />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Volunteer */}
      <section id="volunteer" className="bg-[#111314] py-16 text-white sm:py-20">
        <div className="grid w-full items-center gap-10 px-[10px] md:grid-cols-2">
          <div>
            <h2 className="text-4xl font-black text-amber-400 sm:text-6xl">Be a volunteer</h2>
            <img
              src="/assets/img-032.jpg"
              alt="Young people meditating"
              loading="lazy"
              decoding="async"
              className="mt-8 w-full rounded-2xl"
            />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-400 sm:text-sm sm:tracking-[0.28em]">
              Upgrade your mind. Elevate your life.
            </p>
            <h3 className="mt-4 text-3xl font-black sm:text-4xl">Become 1% Better Every Day</h3>
            <p className="mt-6 leading-7 text-white/65">
              PMC World opens up meaningful ways to serve and become a valued member of a thriving
              community. Volunteer your knowledge, creativity, and time to help share meditation
              with the world.
            </p>
            <form
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              onSubmit={(event) => event.preventDefault()}
            >
              <label className="sr-only" htmlFor="volunteer-email">
                Email address
              </label>
              <input
                id="volunteer-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Enter your email address"
                /* text-base (16px) stops iPhone Safari from zooming in on focus */
                className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-base outline-none focus:border-amber-400"
              />
              <button className="rounded-full bg-amber-400 px-7 py-3 font-black text-black">
                Volunteer
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Podcast */}
      <section id="podcast" className="py-16 sm:py-28">
        <div className="w-full px-[10px]">
          <div className="grid items-center gap-12 md:grid-cols-[0.75fr_1.25fr]">
            <div className="relative mx-auto">
              <div className="absolute inset-4 rounded-[3rem] bg-neutral-950" />
              <img
                src="/assets/img-049.jpg"
                alt="Podcast playing on a smartphone"
                loading="lazy"
                decoding="async"
                className="relative max-h-[420px] max-w-full rounded-[2.5rem] shadow-2xl sm:max-h-[510px] sm:rounded-[3rem]"
              />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-amber-500">
                Listen. Learn. Awaken.
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight min-[400px]:text-4xl sm:text-6xl">
                The Pyramid Spiritual Societies Podcast
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
                The Pyramid Spiritual Societies Podcast brings you transformative wisdom from
                Brahmarshi Patriji — guiding seekers across the world into the power of meditation,
                music, and spiritual science.
              </p>
              <img
                src="/assets/img-057.jpg"
                alt="Listen on Apple Podcasts, Spotify, Amazon Music, and YouTube"
                loading="lazy"
                decoding="async"
                className="mt-7 w-full max-w-xl"
              />
            </div>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {[1, 2].map((column) => (
              <div key={column} className="rounded-2xl bg-neutral-50 p-4 shadow-sm sm:p-5">
                {[1, 2, 3].map((episode) => (
                  <button
                    key={episode}
                    className="flex w-full items-center gap-3 border-b border-neutral-200 py-4 text-left last:border-0 sm:gap-4"
                  >
                    <img
                      src="/assets/img-050.jpg"
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-12 w-16 shrink-0 rounded-lg object-cover sm:h-14 sm:w-20"
                    />
                    <span className="min-w-0 flex-1">
                      <small className="block text-[10px] uppercase tracking-wider text-neutral-500">
                        Reflections with Patriji
                      </small>
                      <strong>Topic Name</strong>
                    </span>
                    <span className="shrink-0 text-xs font-black">▶ Listen</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Magazine */}
      <section id="magazine" className="border-y border-neutral-200 py-16 sm:py-28">
        <div className="grid w-full items-center gap-12 px-[10px] md:grid-cols-2">
          <img
            src="/assets/img-061.jpg"
            alt="Pyramid Dhyan Jagat magazine cover"
            loading="lazy"
            decoding="async"
            className="mx-auto w-full max-w-[280px] shadow-2xl sm:max-w-sm"
          />
          <div>
            <p className="inline-block bg-amber-400 px-3 py-1 text-xs font-black sm:text-sm">
              1,50,000+ COPIES SOLD, 5+ LANGUAGES
            </p>
            <h2 className="mt-6 text-4xl font-black leading-none tracking-[-0.05em] sm:text-5xl">
              <span className="text-amber-500">PYRAMID</span> DHYAN JAGAT
            </h2>
            <h3 className="mt-3 text-xl font-semibold italic sm:text-2xl">Magazine</h3>
            <p className="mt-7 text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
              Your spiritual insight delivered every two months. A bi-monthly Hindi magazine
              dedicated to the science of meditation, pyramid energy research, vegetarian wisdom,
              and teachings of Indian gurus.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="rounded-full border border-black px-6 py-3 font-black">
                Join the Movement
              </button>
              <button className="rounded-full bg-black px-6 py-3 font-black text-white">
                Get Your Copy Today
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Videos */}
      <section id="videos" className="bg-[#111314] py-16 text-white sm:py-20">
        <div className="w-full px-[10px]">
          <h2 className="max-w-4xl text-3xl font-black tracking-[-0.04em] text-pink-500 min-[400px]:text-4xl sm:text-6xl">
            Masters videos about meditation
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {["pyramid meditation", "full moon meditation"].map((title, index) => (
              <article
                key={title}
                className="group relative aspect-video overflow-hidden rounded-2xl"
              >
                <img
                  src="/assets/img-064.jpg"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 sm:text-sm">
                    Master video {index + 1}
                  </p>
                  <h3 className="mt-1 text-2xl font-black sm:mt-2 sm:text-3xl">{title}</h3>
                  <button className="mt-3 min-h-10 rounded-full bg-white px-5 py-2 text-xs font-black text-black sm:mt-5">
                    Learn more
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default App;
