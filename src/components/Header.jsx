import { useCallback, useEffect, useRef, useState } from "react";
import { navMenu } from "../data/nav";
import NavLeaf from "./NavLeaf";

const Chevron = ({ open }) => (
  <svg
    viewBox="0 0 12 12"
    width="10"
    height="10"
    aria-hidden="true"
    className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
  >
    <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Items that have their own children (Explore -> Downloads -> Magazines). Expands inline, so
 *  it can never fly off-screen or be lost by a slightly wandering mouse. */
function NestedGroup({ group, onNavigate, hoverable }) {
  const [open, setOpen] = useState(false);
  const id = `grp-${group.label.replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <li {...(hoverable ? { onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false) } : {})}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left font-bold transition-colors hover:bg-white/10 hover:text-amber-300 focus-visible:bg-white/10"
      >
        {group.label}
        <Chevron open={open} />
      </button>
      <ul
        id={id}
        hidden={!open}
        className="border-l border-white/15 py-1 pl-2 ml-4 text-white/85"
      >
        {group.children.map((leaf) => (
          <li key={leaf.label}>
            <NavLeaf item={leaf} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
    </li>
  );
}

function MenuList({ items, onNavigate, hoverable = false }) {
  return (
    <ul className="py-2 text-sm font-semibold">
      {items.map((item) =>
        item.children ? (
          <NestedGroup key={item.label} group={item} onNavigate={onNavigate} hoverable={hoverable} />
        ) : (
          <li key={item.label}>
            <NavLeaf item={item} onNavigate={onNavigate} />
          </li>
        )
      )}
    </ul>
  );
}

function DesktopNav() {
  const [openIndex, setOpenIndex] = useState(null);
  const [pinned, setPinned] = useState(false); // opened by click/keyboard: stays until closed
  const closeTimer = useRef(null);
  const navRef = useRef(null);

  const cancelClose = () => window.clearTimeout(closeTimer.current);
  const openMenu = (i) => {
    cancelClose();
    setOpenIndex((cur) => {
      if (cur !== i) setPinned(false);
      return i;
    });
  };
  // Short delay so a diagonal mouse move from the label to the panel doesn't close it.
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenIndex((cur) => (pinnedRef.current ? cur : null)), 160);
  };
  const close = useCallback(() => {
    setOpenIndex(null);
    setPinned(false);
  }, []);
  const pinnedRef = useRef(false);
  pinnedRef.current = pinned;

  useEffect(() => {
    const onDoc = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) close();
    };
    document.addEventListener("pointerdown", onDoc);
    return () => document.removeEventListener("pointerdown", onDoc);
  }, [close]);

  return (
    <nav
      ref={navRef}
      className="hidden flex-1 items-center justify-evenly px-4 text-sm font-semibold xl:px-12 xl:text-base lg:flex"
      aria-label="Primary"
      onKeyDown={(e) => {
        if (e.key === "Escape" && openIndex !== null) {
          const btn = navRef.current.querySelector(`[data-top="${openIndex}"]`);
          close();
          btn?.focus();
        }
      }}
      onBlur={(e) => {
        // Close when keyboard focus leaves the whole nav.
        if (!navRef.current.contains(e.relatedTarget)) close();
      }}
    >
      <ul className="contents">
        {navMenu.map((menu, i) => {
          const open = openIndex === i;
          const panelId = `menu-${i}`;
          return (
            <li
              key={menu.label}
              className="relative"
              onMouseEnter={() => openMenu(i)}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                data-top={i}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => {
                  if (open && pinned) close();
                  else {
                    openMenu(i);
                    setPinned(true);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    openMenu(i);
                    setPinned(true);
                    requestAnimationFrame(() =>
                      document.querySelector(`#${panelId} a, #${panelId} button`)?.focus()
                    );
                  }
                }}
                className={`flex items-center gap-1.5 rounded-md py-2 transition-colors hover:text-amber-300 focus-visible:text-amber-300 ${
                  open ? "text-amber-300" : ""
                }`}
              >
                {menu.label}
                <Chevron open={open} />
              </button>
              <div
                id={panelId}
                className={`absolute left-1/2 top-full z-50 w-[min(18rem,calc(100vw-20px))] -translate-x-1/2 pt-2 transition duration-150 ${
                  open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                }`}
              >
                <div className="max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain rounded-xl border border-white/10 bg-neutral-950/97 text-white shadow-2xl shadow-black/40 backdrop-blur-md">
                  <MenuList items={menu.children} onNavigate={close} hoverable />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function MobileNav({ onNavigate }) {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <nav
      id="mobile-menu"
      aria-label="Mobile"
      className="mx-[10px] max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain rounded-2xl bg-neutral-950/97 p-3 shadow-2xl lg:hidden"
    >
      <ul>
        {navMenu.map((menu, i) => {
          const open = openIndex === i;
          const panelId = `m-menu-${i}`;
          return (
            <li key={menu.label} className="border-b border-white/10 last:border-0">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex min-h-12 w-full items-center justify-between gap-3 px-3 text-left text-base font-bold"
              >
                {menu.label}
                <Chevron open={open} />
              </button>
              <div id={panelId} hidden={!open} className="pb-2 text-sm font-semibold text-white/90">
                <MenuList items={menu.children} onNavigate={onNavigate} />
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-3 flex gap-3 px-1 pb-1">
        <button className="min-h-11 flex-1 rounded-full border border-white/25 bg-white/10 px-4 text-xs font-bold">
          Join the Movement
        </button>
        <button className="min-h-11 flex-1 rounded-full bg-amber-400 px-4 text-xs font-extrabold text-black">
          Donate
        </button>
      </div>
    </nav>
  );
}

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
      <div className="flex w-full items-center justify-between px-[10px] py-2 sm:py-3 lg:px-8 lg:py-4">
        <a href="#top" className="flex items-center" aria-label="PMC World home">
          <img
            src="/assets/pmc-world-logo.png"
            alt="PMC World"
            width="64"
            height="64"
            className="h-14 w-14 object-contain sm:h-16 sm:w-16"
          />
        </a>
        <DesktopNav />
        <div className="hidden items-center gap-4 lg:flex">
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
      {open && <MobileNav onNavigate={() => setOpen(false)} />}
    </header>
  );
}
