/** A menu entry: a real link when the destination exists, otherwise a muted "Soon" placeholder. */
export default function NavLeaf({ item, onNavigate, className = "" }) {
  if (!item.href) {
    return (
      <span
        aria-disabled="true"
        title="This page is not available yet"
        className={`flex items-center justify-between gap-3 px-4 py-2.5 text-white/55 ${className}`}
      >
        {item.label}
        <span className="rounded-full border border-white/15 px-2 py-px text-[10px] font-bold uppercase tracking-wide">
          Soon
        </span>
      </span>
    );
  }
  return (
    <a
      href={item.href}
      onClick={onNavigate}
      className={`block px-4 py-2.5 transition-colors hover:bg-white/10 hover:text-amber-300 focus-visible:bg-white/10 focus-visible:text-amber-300 ${className}`}
    >
      {item.label}
    </a>
  );
}
