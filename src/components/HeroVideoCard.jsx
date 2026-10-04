import { useCallback, useEffect, useRef, useState } from "react";

/**
 * YouTube Short card for the hero, shown as a square (the 9:16 video is centre-cropped to fill it).
 *
 * Why the IFrame Player API: a Shorts URL can't go in a <video> tag and a plain
 * <iframe> can't be paused/played from outside. The API gives us play/pause/mute.
 *
 * Performance: nothing from YouTube is loaded on page load except one small
 * poster image. The player script and iframe are only requested the first time
 * the user hovers (desktop) or taps (touch) the card.
 *
 * Behaviour
 *  - mouse: hover -> play (muted), leave -> pause
 *  - touch / pen / keyboard: tap or Enter/Space toggles play/pause
 *  - small mute button lets the viewer turn sound on
 */

const YT_PLAYING = 1;
const YT_PAUSED = 2;

let apiPromise = null;

function loadYouTubeApi() {
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (!apiPromise) {
    apiPromise = new Promise((resolve, reject) => {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof previous === "function") previous();
        resolve(window.YT);
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => {
        apiPromise = null;
        reject(new Error("Could not load the YouTube player"));
      };
      document.head.appendChild(script);
    });
  }
  return apiPromise;
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
    </svg>
  );
}

function SoundIcon({ muted }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" />
      {muted ? (
        <path d="m16 9 5 6m0-6-5 6" />
      ) : (
        <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
      )}
    </svg>
  );
}

export default function HeroVideoCard({ videoId, title, className = "" }) {
  const mountRef = useRef(null);
  const playerRef = useRef(null);
  const startingRef = useRef(false);
  const wantPlayRef = useRef(false); // what the user currently wants, even if the player isn't ready yet
  const lastPointerTypeRef = useRef("mouse");
  const [status, setStatus] = useState("idle"); // idle | loading | playing | paused | error
  const [muted, setMuted] = useState(true);

  const playerReady = () => playerRef.current && typeof playerRef.current.playVideo === "function";

  const createPlayer = useCallback(() => {
    if (playerRef.current || startingRef.current) return;
    startingRef.current = true;
    setStatus("loading");

    loadYouTubeApi()
      .then((YT) => {
        if (!mountRef.current) return; // unmounted while loading
        // The API replaces its target element, so give it a throwaway div that React doesn't own.
        const target = document.createElement("div");
        mountRef.current.appendChild(target);
        playerRef.current = new YT.Player(target, {
          host: "https://www.youtube-nocookie.com",
          videoId,
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            iv_load_policy: 3,
            loop: 1,
            playlist: videoId,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            origin: window.location.origin,
          },
          events: {
            onReady: (event) => {
              event.target.mute();
              const frame = event.target.getIframe && event.target.getIframe();
              if (frame) frame.setAttribute("title", title);
              if (wantPlayRef.current) event.target.playVideo();
              else setStatus("paused");
            },
            onStateChange: (event) => {
              if (event.data === YT_PLAYING) setStatus("playing");
              else if (event.data === YT_PAUSED) setStatus("paused");
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

  const play = useCallback(() => {
    wantPlayRef.current = true;
    if (playerReady()) playerRef.current.playVideo();
    else createPlayer();
  }, [createPlayer]);

  const pause = useCallback(() => {
    wantPlayRef.current = false;
    if (playerReady()) playerRef.current.pauseVideo();
  }, []);

  useEffect(
    () => () => {
      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        playerRef.current.destroy();
      }
      playerRef.current = null;
      startingRef.current = false;
    },
    [],
  );

  const onPointerEnter = (event) => {
    lastPointerTypeRef.current = event.pointerType;
    if (event.pointerType === "mouse") play();
  };
  const onPointerLeave = (event) => {
    if (event.pointerType === "mouse") pause();
  };
  const onPointerDown = (event) => {
    lastPointerTypeRef.current = event.pointerType;
  };

  const onClick = (event) => {
    // Mouse users already get hover-to-play, so a click must not fight it.
    // Touch, pen and keyboard (detail === 0) toggle instead.
    const fromMouse = lastPointerTypeRef.current === "mouse" && event.detail > 0;
    if (fromMouse) return;
    if (wantPlayRef.current) pause();
    else play();
  };

  const toggleMute = (event) => {
    event.stopPropagation();
    if (!playerReady()) return;
    if (muted) {
      playerRef.current.unMute();
      playerRef.current.setVolume(80);
    } else {
      playerRef.current.mute();
    }
    setMuted(!muted);
  };

  const showPlayHint = status !== "playing";

  return (
    <div
      className={`group relative aspect-square w-full overflow-hidden rounded-2xl bg-neutral-900 shadow-2xl shadow-black/50 ring-1 ring-white/25 ${className}`}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
    >
      {/* Poster: the only thing fetched on page load. */}
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* YouTube iframe is injected here after the first interaction. */}
      <div
        ref={mountRef}
        className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-300 [&>iframe]:absolute [&>iframe]:left-0 [&>iframe]:top-1/2 [&>iframe]:h-[177.78%] [&>iframe]:w-full [&>iframe]:-translate-y-1/2 ${
          status === "playing" ? "opacity-100" : "opacity-0"
        }`}
      />

      {showPlayHint && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-black/25">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-white/90 pl-0.5 text-black shadow-lg sm:h-12 sm:w-12">
            <PlayIcon />
          </span>
        </div>
      )}

      {/* Full-card control: handles tap / click / keyboard. */}
      <button
        type="button"
        onClick={onClick}
        aria-label={status === "playing" ? `Pause video: ${title}` : `Play video: ${title}`}
        aria-pressed={status === "playing"}
        className="absolute inset-0 z-10 cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-amber-300"
      />

      <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 to-transparent px-2 pb-2 pt-6 text-center text-[10px] font-bold uppercase tracking-wider text-white sm:text-[11px]">
        <span className="hidden [@media(hover:hover)]:inline">Hover to play</span>
        <span className="[@media(hover:hover)]:hidden">Tap to play</span>
      </span>

      {status !== "idle" && status !== "error" && (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
          aria-pressed={!muted}
          className="absolute right-2 top-2 z-20 grid h-10 w-10 place-items-center [@media(hover:hover)]:h-8 [@media(hover:hover)]:w-8 rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-amber-300"
        >
          <SoundIcon muted={muted} />
        </button>
      )}

      {status === "error" && (
        <a
          href={`https://www.youtube.com/shorts/${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-x-2 bottom-8 z-20 rounded-full bg-white px-3 py-2 text-center text-[11px] font-black text-black"
        >
          Watch on YouTube
        </a>
      )}
    </div>
  );
}
