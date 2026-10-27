import { useEffect, useRef, useState } from "react";
import { loadYouTubeApi } from "../lib/youtube";

/**
 * A YouTube Short that fills its parent like object-fit: cover and loops silently, with no
 * visible controls. The parent must be positioned and sized; this fills it (absolute inset-0).
 *
 * Why the IFrame Player API: a Shorts URL can't go in a <video> tag and a plain
 * <iframe> can't be paused/played from outside. The API gives us play/pause.
 *
 * Behaviour
 *  - plays muted and loops while the box is on screen, pauses when it's out of view
 *    (browsers only allow autoplay when muted)
 *  - `active` left out: the video is shown whenever it's playing
 *  - `active` true/false: the video is only shown while `active` is true (e.g. the parent card
 *    is hovered); otherwise the poster covers it
 *  - with "reduce motion" on, the poster stays and nothing plays
 *
 * Why hover reveals instead of play/pause: YouTube ignores `controls: 0` for a few seconds
 * every time a video goes from paused to playing and flashes its own prev / pause / next
 * overlay inside the iframe, which the page can't style. So playback never changes on hover;
 * the video keeps running underneath and hover just uncovers it.
 */

const YT_PLAYING = 1;
const YT_PAUSED = 2;

// For a Short, the vertical thumbnail crops the same way as the video. Not every video has it,
// so fall back to the landscape ones.
const VERTICAL_POSTERS = ["oar2", "maxresdefault", "hqdefault"];
const LANDSCAPE_POSTERS = ["maxresdefault", "hqdefault"];

// Size the video's box so it covers the container whatever the container's shape
// (cq units are relative to the container, see `[container-type:size]` below).
// `ratio` is the video's width / height: 9/16 for a Short, 16/9 for a normal video.
const coverStyle = (ratio) => ({
  width: `max(100cqw, calc(100cqh * ${ratio}))`,
  height: `max(100cqh, calc(100cqw / ${ratio}))`,
});

export default function YouTubeLoop({ videoId, title, active, ratio = 9 / 16, className = "" }) {
  const POSTERS = ratio < 1 ? VERTICAL_POSTERS : LANDSCAPE_POSTERS;
  const boxRef = useRef(null);
  const mountRef = useRef(null);
  const playerRef = useRef(null);
  const visibleRef = useRef(false);
  const [status, setStatus] = useState("idle"); // idle | loading | playing | paused | error
  const [posterIndex, setPosterIndex] = useState(0);

  // Play while on screen, pause otherwise.
  const sync = () => {
    const player = playerRef.current;
    if (!player || typeof player.playVideo !== "function") return;
    if (visibleRef.current) player.playVideo();
    else player.pauseVideo();
  };

  const showVideo = status === "playing" && active !== false;

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let cancelled = false;
    let started = false;

    const createPlayer = () => {
      setStatus("loading");
      loadYouTubeApi()
        .then((YT) => {
          if (cancelled || !mountRef.current) return;
          // The API replaces its target element, so give it a throwaway div that React doesn't own.
          const target = document.createElement("div");
          mountRef.current.appendChild(target);
          playerRef.current = new YT.Player(target, {
            host: "https://www.youtube-nocookie.com",
            videoId,
            width: "100%",
            height: "100%",
            playerVars: {
              mute: 1,
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
                if (frame) {
                  frame.setAttribute("title", title);
                  frame.setAttribute("tabindex", "-1");
                }
                setStatus("paused");
                sync();
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
          if (!cancelled) setStatus("error");
        });
    };

    // Create on first approach; afterwards just play/pause as it comes and goes.
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !started) {
          started = true;
          createPlayer();
        } else {
          sync();
        }
      },
      { rootMargin: "100px" },
    );
    observer.observe(box);

    return () => {
      cancelled = true;
      observer.disconnect();
      const player = playerRef.current;
      if (player && typeof player.destroy === "function") player.destroy();
      playerRef.current = null;
    };
  }, [videoId, title]);

  return (
    <div
      ref={boxRef}
      className={`absolute inset-0 overflow-hidden bg-neutral-900 [container-type:size] ${className}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/${POSTERS[posterIndex]}.jpg`}
        alt=""
        loading="lazy"
        decoding="async"
        draggable="false"
        onError={() => setPosterIndex((i) => Math.min(i + 1, POSTERS.length - 1))}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Hidden unless playing (and active), so YouTube's own loading / pause UI never shows. */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
          showVideo ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          ref={mountRef}
          style={coverStyle(ratio)}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [&>iframe]:h-full [&>iframe]:w-full"
        />
      </div>
    </div>
  );
}
