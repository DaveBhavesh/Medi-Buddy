import { useEffect, useState } from "react";

const navItems = [
  "Meditation",
  "Patriji",
  "PMC",
  "Videos",
  "Articles",
  "Explore",
  "Contact",
];

const exploreCards = [
  { title: "About the PSSM", image: "img-000.jpg" },
  { title: "Frequently Asked Questions", image: "img-001.jpg" },
  { title: "Anapanasati Meditation", image: "img-003.jpg" },
  { title: "About Patriji", image: "img-007.jpg" },
  { title: "Pyramid Energy", image: "img-008.jpg" },
  { title: "Patriji's Concepts", image: "img-012.jpg" },
];

const books = [
  { name: "Yogananda", image: "img-026.jpg" },
  { name: "Lobsang Rampa", image: "img-040.jpg" },
  { name: "Brian Weiss", image: "img-035.jpg" },
  { name: "Louise Hay", image: "img-038.jpg" },
];

const testimonials = [
  ["Health", "img-016.jpg", "Meditation supports a calmer mind and a healthier, more balanced life."],
  ["Students", "img-015.jpg", "Meditation offers profound benefits for memory, focus, confidence, and much more."],
  ["Inner peace", "img-011.jpg", "Wisdom from senior masters for living with greater awareness and joy."],
];

const pillars = [
  "Anapanasati meditation",
  "Benefits of meditation",
  "18 guiding principles",
  "Science of meditation",
  "Mind & meditation",
  "Health & meditation",
  "Events & workshops",
  "Patriji quotes",
];

function ArrowIcon() {
  return (
    <span aria-hidden="true" className="shrink-0">
      ↗
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu with Escape, and when the viewport grows to desktop size.
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (event) => {
      if (event.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <header className="absolute inset-x-0 top-0 z-20 pt-[env(safe-area-inset-top)] text-white">
      <div className="mx-auto flex max-w-[1760px] items-center justify-between px-3 py-4 sm:px-4 sm:py-5">
        <a href="#top" className="flex items-center" aria-label="PMC World home">
          <img
            src="/assets/pmc-world-logo.png"
            alt="PMC World"
            width="64"
            height="64"
            className="h-14 w-14 object-contain sm:h-16 sm:w-16"
          />
        </a>
        <nav
          className="hidden items-center gap-7 text-[13px] font-semibold lg:flex"
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <a
              key={item}
              className="transition hover:text-amber-300"
              href={`#${item.toLowerCase()}`}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <button className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold backdrop-blur">
            Join the Movement
          </button>
          <button className="rounded-full bg-amber-400 px-4 py-2 text-xs font-extrabold text-black">
            Donate
          </button>
        </div>
        <button
          className="grid h-11 w-11 place-items-center rounded-full border border-white/25 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="text-xl leading-none">{open ? "×" : "☰"}</span>
        </button>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="mx-3 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-2xl bg-neutral-950/95 p-5 shadow-2xl sm:mx-4 lg:hidden"
        >
          {navItems.map((item) => (
            <a
              key={item}
              className="block border-b border-white/10 py-3 text-sm font-semibold"
              href={`#${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
          <div className="mt-4 flex gap-3">
            <button className="flex-1 rounded-full border border-white/25 bg-white/10 px-4 py-3 text-xs font-bold">
              Join the Movement
            </button>
            <button className="flex-1 rounded-full bg-amber-400 px-4 py-3 text-xs font-extrabold text-black">
              Donate
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-[#0d0f10] py-16 text-white/70">
      <div className="mx-auto grid max-w-[1760px] gap-12 px-3 sm:grid-cols-2 sm:px-4 lg:grid-cols-4">
        <div>
          <h2 className="text-2xl font-black text-white">PMC World</h2>
          <p className="mt-4 text-sm leading-6">
            Meditate. Transform. Awaken your inner master.
          </p>
        </div>
        <div>
          <h3 className="font-black text-white">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#meditation">Meditation</a></li>
            <li><a href="#pmc">About PMC</a></li>
            <li><a href="#videos">Master Videos</a></li>
            <li><a href="#explore">PSSM</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-black text-white">Contact Us</h3>
          <p className="mt-4 text-sm leading-6">
            Hyderabad, Telangana, India
            <br />
            +91 80080 12345
            <br />
            contact@pmcworld.org
          </p>
        </div>
        <div>
          <h3 className="font-black text-white">Subscribe</h3>
          <p className="mt-4 text-sm">Join millions of seekers around the world.</p>
          <button className="mt-5 rounded-full border border-white/30 px-5 py-2 text-sm font-black text-white">
            Subscribe now
          </button>
        </div>
      </div>
      <div className="mx-auto mt-14 max-w-[1760px] border-t border-white/10 px-3 pb-[env(safe-area-inset-bottom)] pt-8 text-xs sm:px-4">
        © 2026 PMC World. All rights reserved.
      </div>
    </footer>
  );
}

function App() {
  return (
    <main id="top" className="overflow-hidden bg-white text-[#17191a]">
      {/* Hero */}
      <section className="relative bg-[#1c2120] pb-16 pt-28 text-center text-white sm:pb-24 sm:pt-36">
        <Header />
        <div className="relative z-10 mx-auto max-w-4xl px-5">
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
        <div className="mx-auto mt-12 max-w-5xl px-4">
          <img
            src="/assets/img-004.jpg"
            alt="Free 21-day meditation challenge with Patriji"
            fetchPriority="high"
            decoding="async"
            className="w-full rounded-2xl shadow-2xl shadow-black/40"
          />
        </div>
      </section>

      {/* Explore */}
      <section id="explore" className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1760px] px-3 sm:px-4">
          <h2 className="max-w-xl text-3xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
            Do you have a hunger to increase the quality of your life?
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-3">
            {exploreCards.map((card) => (
              <a
                href="#pmc"
                key={card.title}
                className="group relative aspect-[1.18] overflow-hidden rounded-lg bg-neutral-900"
              >
                <img
                  src={`/assets/${card.image}`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent" />
                <span className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 text-xs font-black uppercase leading-tight text-white min-[420px]:text-sm sm:bottom-4 sm:left-4 sm:right-4 sm:text-lg lg:text-2xl lg:leading-none">
                  <span>{card.title}</span> <ArrowIcon />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Why meditation */}
      <section id="meditation" className="bg-[#111314] py-16 text-white sm:py-28">
        <div className="mx-auto max-w-[1760px] px-3 sm:px-4">
          <h2 className="text-3xl font-black tracking-tight sm:text-5xl">Why Meditation?</h2>
          <div className="mt-10 grid items-center gap-10 md:grid-cols-[1.35fr_1fr]">
            <img
              src="/assets/img-014.jpg"
              alt="A person meditating inside a glowing pyramid"
              loading="lazy"
              decoding="async"
              className="aspect-[1.25] h-full w-full rounded-2xl object-cover"
            />
            <div>
              <p className="text-sm leading-6 text-white/60">
                Experience clarity, joy, and spiritual evolution through daily meditation.
              </p>
              <h3 className="mt-4 text-4xl font-black leading-none tracking-[-0.04em]">
                Why
                <br />
                Meditation?
              </h3>
              <p className="mt-5 max-w-md leading-7 text-white/70">
                Awaken the mind, heal the body, and connect with your true self. Meditation is a
                simple, natural path to balance and inner mastery.
              </p>
              <a
                href="#be-a-meditator"
                className="mt-7 inline-flex rounded-full bg-amber-400 px-5 py-3 text-sm font-black text-black"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PMC */}
      <section id="pmc" className="py-16 sm:py-28">
        <div className="mx-auto grid max-w-[1760px] items-center gap-12 px-3 sm:px-4 md:grid-cols-2">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-amber-500 sm:text-sm sm:tracking-[0.28em]">
              Pyramid Meditation Channel
            </p>
            <h2 className="mt-3 text-5xl font-black tracking-[-0.05em] sm:text-6xl">PMC World</h2>
            <h3 className="mt-8 text-xl font-semibold italic sm:text-2xl">
              Transforming Lives Through Meditation
            </h3>
            <p className="mt-5 leading-7 text-neutral-600">
              PMC is the media wing of the Pyramid Spiritual Societies Movement (PSSM), founded by
              Brahmarshi Pitamaha Patriji — a global, non-profit and non-religious spiritual
              organization dedicated to transforming humanity through Anapanasati Meditation,
              Pyramid Power, and Vegetarianism, all free of cost.
            </p>
            <p className="mt-4 leading-7 text-neutral-600">
              PMC World channel was inaugurated on November 11, 2024, on the birth anniversary of
              our beloved master, friend, Guru Brahmarshi Pitamaha Patriji.
            </p>
            <button className="mt-7 rounded-full bg-neutral-950 px-6 py-3 text-sm font-black text-white">
              Discover PMC
            </button>
          </div>
          <div className="relative mx-auto w-full max-w-lg">
            <img
              src="/assets/img-020.jpg"
              alt="Patriji in red robes"
              loading="lazy"
              decoding="async"
              className="relative z-10 mx-auto max-h-[460px] object-contain sm:max-h-[620px]"
            />
            <img
              src="/assets/img-019.jpg"
              alt="Patriji speaking to a gathering"
              loading="lazy"
              decoding="async"
              className="absolute bottom-6 right-0 z-20 w-[46%] rounded-[1.25rem] border-4 border-white object-cover shadow-2xl sm:bottom-10 sm:w-1/2 sm:rounded-[1.75rem] sm:border-8"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#111314] py-16 text-white sm:py-28">
        <div className="mx-auto max-w-[1760px] px-3 sm:px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-400">
                Real stories
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight sm:text-5xl">
                Transformative Testimonials from Senior Masters
              </h2>
            </div>
            <button
              aria-label="Next testimonials"
              className="h-12 w-12 rounded-full border border-white/25 text-2xl"
            >
              →
            </button>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map(([title, image, copy]) => (
              <article key={title} className="overflow-hidden rounded-2xl bg-white text-black">
                <img
                  src={`/assets/${image}`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-5 sm:p-6">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-600">
                    {title}
                  </p>
                  <p className="mt-3 text-lg font-bold leading-snug lg:text-xl">{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="relative isolate overflow-hidden py-16 text-white sm:py-28">
        <img
          src="/assets/img-023.jpg"
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-black/70" />
        <div className="mx-auto grid max-w-[1760px] gap-10 px-3 sm:px-4 md:grid-cols-2 md:gap-12">
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

      {/* Quote */}
      <section className="bg-[#fdbb24] py-12 sm:py-20">
        <div className="mx-auto grid max-w-[1760px] items-center gap-8 px-3 sm:px-4 md:grid-cols-2">
          <img
            src="/assets/img-026.jpg"
            alt="Paramahansa Yogananda"
            loading="lazy"
            decoding="async"
            className="max-h-[320px] w-full object-contain object-left sm:max-h-[390px]"
          />
          <blockquote className="text-2xl font-black leading-tight sm:text-4xl lg:text-5xl">
            “Live quietly in the moment and see the beauty of all before you. The future will take
            care of itself.”
            <footer className="mt-6 text-base font-semibold italic">
              — Paramahansa Yogananda
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Be a meditator */}
      <section id="be-a-meditator" className="py-16 sm:py-28">
        <div className="mx-auto max-w-[1760px] px-3 text-center sm:px-4">
          <h2 className="text-4xl font-black tracking-[-0.05em] min-[400px]:text-5xl sm:text-7xl">
            BE A <span className="text-amber-400">MEDITATOR</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
            PMC is a spiritual and meditation-focused media channel established in 2018 by
            Brahmarshi Subhash Patriji, the founder of the Pyramid Spiritual Societies Movement.
          </p>
          <div className="mt-12 grid items-center gap-8 rounded-[1.5rem] bg-neutral-100 p-5 text-left sm:rounded-[2rem] sm:p-6 md:grid-cols-2 md:p-12">
            <img
              src="/assets/img-044.jpg"
              alt="Patriji meditating"
              loading="lazy"
              decoding="async"
              className="max-h-[420px] w-full object-contain md:max-h-[520px]"
            />
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-amber-600">
                Quick 15 minutes
              </p>
              <h3 className="mt-3 text-3xl font-black leading-none sm:text-5xl">
                Guided Meditation with Patriji
              </h3>
              <p className="mt-5 text-base text-neutral-600 sm:text-lg">
                Transform your day through breath, stillness, and awareness.
              </p>
              <button className="mt-7 rounded-full bg-black px-6 py-3 text-sm font-black text-white">
                Watch guided meditation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer */}
      <section className="bg-[#111314] py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-[1760px] items-center gap-10 px-3 sm:px-4 md:grid-cols-2">
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

      {/* Swadhyay Yog */}
      <section className="bg-amber-400 py-14 sm:py-16">
        <div className="mx-auto max-w-[1760px] px-3 sm:px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl font-black tracking-[-0.05em] min-[400px]:text-5xl sm:text-7xl">
                SWADHYAY YOG
              </h2>
              <p className="mt-3 text-base font-bold italic sm:text-xl">
                “Books are undeniably a swift shortcut to Enlightenment” — Linda Goodman
              </p>
            </div>
            <span className="text-xs font-black uppercase tracking-[0.2em] sm:text-sm">
              Recommended by Patriji
            </span>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {books.map((book) => (
              <article key={book.name} className="relative overflow-hidden rounded-xl bg-black">
                <img
                  src={`/assets/${book.image}`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="aspect-[1.35] h-full w-full object-cover opacity-80"
                />
                <h3 className="absolute bottom-3 left-3 right-3 text-lg font-black leading-tight text-white sm:bottom-4 sm:left-4 sm:text-2xl">
                  {book.name}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Podcast */}
      <section className="py-16 sm:py-28">
        <div className="mx-auto max-w-[1760px] px-3 sm:px-4">
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
      <section className="border-y border-neutral-200 py-16 sm:py-28">
        <div className="mx-auto grid max-w-[1760px] items-center gap-12 px-3 sm:px-4 md:grid-cols-2">
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
        <div className="mx-auto max-w-[1760px] px-3 sm:px-4">
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
                  <button className="mt-3 rounded-full bg-white px-5 py-2 text-xs font-black text-black sm:mt-5">
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
