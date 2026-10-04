import { useEffect, useState } from "react";
import { navItems } from "../data/content";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the mobile menu with Escape, and when the viewport grows to desktop size.
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (event) => {
      if (event.matches) setOpen(false);
    };
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] text-white transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled || open
          ? "bg-neutral-950/85 shadow-lg shadow-black/20 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="flex w-full items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] px-[10px] py-2 sm:py-3 lg:px-8 lg:py-4">
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
          className="hidden items-center gap-9 text-sm font-semibold xl:gap-14 lg:flex"
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
        <div className="hidden items-center gap-4 lg:flex lg:justify-self-end">
          <button className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-bold backdrop-blur">
            Join the Movement
          </button>
          <button className="rounded-full bg-amber-400 px-6 py-2.5 text-xs font-extrabold text-black">
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
          className="mx-[10px] max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-2xl bg-neutral-950/95 p-5 shadow-2xl lg:hidden"
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
