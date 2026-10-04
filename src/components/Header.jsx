import { useEffect, useState } from "react";
import { navItems } from "../data/content";

export default function Header() {
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
