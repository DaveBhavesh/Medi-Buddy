import YouTubeLoop from "./YouTubeLoop";

/**
 * YouTube Short card for the hero: a 16:9 landscape card that the 9:16 video fills completely
 * (centre-cropped top and bottom). Autoplays muted and loops, with no visible controls.
 */
export default function HeroVideoCard({ videoId, title, className = "" }) {
  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-900 shadow-2xl shadow-black/50 ring-1 ring-white/25 sm:rounded-2xl ${className}`}
    >
      <YouTubeLoop videoId={videoId} title={title} />
    </div>
  );
}
