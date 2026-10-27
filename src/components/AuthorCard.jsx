import { useCallback, useEffect, useId, useRef, useState } from "react";
import Portrait from "./Portrait";
import { loadYouTubeApi } from "../lib/youtube";

// Only one author video plays at a time.
let currentlyPlaying = null;

function PlayIcon({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
    </svg>
  );
}

/**
 * Optional hover/tap video for an author card. Nothing is requested until the first hover or tap,
 * it is always muted, and it hands over to no other card (one video at a time).
 */
function useCardVideo(videoId, title) {
  const mountRef = useRef(null);
  const playerRef = useRef(null);
  const startingRef = useRef(false);
  const wantRef = useRef(false);
  const handleRef = useRef({ pause: () => {} });
  const [status, setStatus] = useState("idle"); // idle | loading | playing | paused | error

  const ready = () => playerRef.current && typeof playerRef.current.playVideo === "function";

  const create = useCallback(() => {
    if (playerRef.current || startingRef.current || !videoId) return;
    startingRef.current = true;
    setStatus("loading");
    loadYouTubeApi()
      .then((YT) => {
        if (!mountRef.current) return;
        const target = document.createElement("div");
        mountRef.current.appendChild(target);
        playerRef.current = new YT.Player(target, {
          host: "https://www.youtube-nocookie.com",
          videoId,
          width: "100%",
          height: "100%",
          playerVars: { autoplay: 0, controls: 0, disablekb: 1, fs: 0, modestbranding: 1, playsinline: 1, rel: 0, origin: window.location.origin },
          events: {
            onReady: (event) => {
              event.target.mute();
              const frame = event.target.getIframe?.();
              if (frame) frame.setAttribute("title", title);
              if (wantRef.current) event.target.playVideo();
              else setStatus("paused");
            },
            onStateChange: (event) => {
              if (event.data === 1) setStatus("playing");
              else if (event.data === 2) setStatus("paused");
            },
            onError: () => setStatus("error"),
          },
        });
      })
      .catch(() => {
        startingRef.current = false;
        setStatus("error");
      });
  }, [videoId, title]);

  const pause = useCallback(() => {
    wantRef.current = false;
    if (ready()) playerRef.current.pauseVideo();
    if (currentlyPlaying === handleRef.current) currentlyPlaying = null;
  }, []);
  handleRef.current.pause = pause;

  const play = useCallback(() => {
    if (!videoId) return;
    if (currentlyPlaying && currentlyPlaying !== handleRef.current) currentlyPlaying.pause();
    currentlyPlaying = handleRef.current;
    wantRef.current = true;
    if (ready()) playerRef.current.playVideo();
    else create();
  }, [create, videoId]);

  useEffect(
    () => () => {
      if (currentlyPlaying === handleRef.current) currentlyPlaying = null;
      if (playerRef.current?.destroy) playerRef.current.destroy();
      playerRef.current = null;
    },
    [],
  );

  return { mountRef, status, play, pause, wantRef };
}

export default function AuthorCard({ author, tone }) {
  const { slug, name, bio, asset, videoId } = author;
  const [open, setOpen] = useState(false);
  const bioId = useId();
  const video = useCardVideo(videoId, `${name} video`);
  const pointerType = useRef("mouse");
  const readMoreRef = useRef(null);
  const showLessRef = useRef(null);

  // Move keyboard focus into the text when it opens, and back to "Read more" when it closes.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (open) showLessRef.current?.focus({ preventScroll: true });
    else if (wasOpen.current) readMoreRef.current?.focus({ preventScroll: true });
    wasOpen.current = open;
  }, [open]);
  const close = () => setOpen(false);

  const onEnter = (event) => {
    pointerType.current = event.pointerType;
    if (videoId && event.pointerType === "mouse") video.play();
  };
  const onLeave = (event) => {
    if (videoId && event.pointerType === "mouse") video.pause();
  };

  return (
    <article
      className="group relative isolate aspect-[3/4] w-full overflow-hidden rounded-2xl bg-neutral-900 text-white shadow-lg shadow-black/10 transition-shadow duration-300 hover:shadow-2xl [container-type:inline-size]"
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      {/* Photo */}
      <div className="absolute inset-0 -z-10 transition-transform duration-700 group-hover:scale-105">
        <Portrait slug={slug} asset={asset} name={name} tone={tone} top position="object-[50%_25%]" />
      </div>

      {/* Optional video layer */}
      {videoId && (
        <div
          ref={video.mountRef}
          className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden transition-opacity duration-300 [&>iframe]:absolute [&>iframe]:left-1/2 [&>iframe]:top-1/2 [&>iframe]:h-[177.78%] [&>iframe]:w-full [&>iframe]:-translate-x-1/2 [&>iframe]:-translate-y-1/2 ${
            video.status === "playing" ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

      {videoId && (
        <button
          type="button"
          onClick={() => (video.wantRef.current ? video.pause() : video.play())}
          aria-label={video.status === "playing" ? `Pause ${name} video` : `Play ${name} video`}
          className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/90 pl-0.5 text-black shadow-lg"
        >
          {video.status === "playing" ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
            </svg>
          ) : (
            <PlayIcon />
          )}
        </button>
      )}

      {/* Closed: only the name and "Read more" over the photo */}
      <div
        className={`absolute inset-x-0 bottom-0 p-4 transition-opacity duration-300 sm:p-5 ${
          open ? "opacity-0" : "opacity-100"
        }`}
        inert={open}
      >
        <h3 className="text-xl font-black leading-tight tracking-[-0.02em] [text-shadow:0_1px_12px_rgb(0_0_0/0.5)] sm:text-2xl">
          {name}
        </h3>
        <button
          ref={readMoreRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls={bioId}
          className="mt-3 inline-flex min-h-10 items-center rounded-full bg-white px-4 py-2 text-xs font-black text-black hover:bg-amber-300"
        >
          Read more<span className="sr-only">&nbsp;about {name}</span>
        </button>
      </div>

      {/* Open: the full text fades in over the same photo (darkened and softly blurred behind it). */}
      <div
        id={bioId}
        role="region"
        aria-label={`About ${name}`}
        inert={!open}
        onKeyDown={(event) => event.key === "Escape" && close()}
        className={`absolute inset-0 z-20 flex flex-col bg-black/65 p-4 backdrop-blur-[3px] transition duration-300 ease-out sm:p-5 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <h3 className="pr-12 text-xl font-black leading-tight sm:text-2xl">{name}</h3>
        <div
          className={`no-scrollbar mt-3 flex-1 overflow-y-auto overscroll-contain pr-1 text-sm leading-6 text-white/90 transition duration-300 ease-out ${
            open ? "translate-y-0 delay-75" : "translate-y-2"
          }`}
        >
          {bio}
        </div>
        <button
          ref={showLessRef}
          type="button"
          onClick={close}
          className="mt-3 inline-flex min-h-10 w-fit items-center rounded-full bg-white px-4 py-2 text-xs font-black text-black hover:bg-amber-300"
        >
          Show less
        </button>
      </div>
    </article>
  );
}
