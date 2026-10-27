import BackToTop from "./components/BackToTop";
import Footer from "./components/footer/Footer";
import AboutPatriji from "./sections/AboutPatriji";
import Authors from "./sections/Authors";
import BeAMeditator from "./sections/BeAMeditator";
import Explore from "./sections/Explore";
import Hero from "./sections/Hero";
import OurJourney from "./sections/OurJourney";
import PmcWorld from "./sections/PmcWorld";
import Quotes from "./sections/Quotes";
import Swadhyay from "./sections/Swadhyay";
import Testimonials from "./sections/Testimonials";
import WhyMeditation from "./sections/WhyMeditation";

function App() {
  return (
    <main id="top" className="overflow-hidden bg-cream text-[#17191a]">
      <Hero />
      <Explore />
      <AboutPatriji />
      <PmcWorld />
      <WhyMeditation />
      <Testimonials />
      <BeAMeditator />
      <Swadhyay />
      <Authors />
      <Quotes />

      {/* Podcast */}
      <section id="podcast" className="py-16 sm:py-28">
        <div className="w-full px-5">
          <div className="grid items-center gap-12 md:grid-cols-[0.75fr_1.25fr]">
            <div className="relative mx-auto">
              <div className="absolute inset-4 rounded-[3rem] bg-night-deep" />
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
      <section id="magazine" className="panel panel-light py-16 sm:py-24">
        <div className="panel-inner grid w-full items-center gap-12 md:grid-cols-2">
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

      {/* Volunteer */}
      <section id="volunteer" className="panel panel-dark py-16 sm:py-20">
        <div className="panel-inner grid w-full items-center gap-10 md:grid-cols-2">
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

      <OurJourney />

      <Footer />

      {/* Site-wide extras: reading progress line (CSS only) and back-to-top button. */}
      <div className="scroll-progress" aria-hidden="true" />
      <BackToTop />
    </main>
  );
}

export default App;
