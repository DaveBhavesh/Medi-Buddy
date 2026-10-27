import { useEffect, useRef } from "react";

/** Simple accessible lightbox that plays a YouTube video (privacy-friendly youtube-nocookie embed). */
export default function VideoModal({ videoId, title, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const previous = document.activeElement;
    closeRef.current?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[60] grid place-items-center bg-black/85 p-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
        <div className="mb-2 flex items-center justify-between text-white">
          <p className="truncate pr-4 text-sm font-bold sm:text-base">{title}</p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/15 text-2xl leading-none hover:bg-white/30"
          >
            ×
          </button>
        </div>
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
