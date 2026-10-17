import { getPersonPhoto, initials } from "../lib/people";

const palettes = [
  "from-[#5b3a9e] to-[#e0558f]",
  "from-[#0e4a80] to-[#2b8be8]",
  "from-[#b45309] to-[#fbbf24]",
  "from-[#0f766e] to-[#34d399]",
  "from-[#7c2d12] to-[#f97316]",
  "from-[#334155] to-[#94a3b8]",
];

/**
 * A person's photo. Uses the drop-in file / project asset when there is one; otherwise a tidy
 * monogram tile (never a made-up picture).
 */
export default function Portrait({
  slug,
  asset,
  name,
  position = "object-[50%_30%]",
  tone = 0,
  small = false,
  top = false,
  alt,
  className = "",
  lazy = true,
}) {
  const src = getPersonPhoto(slug, asset);
  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? name}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
        draggable="false"
        className={`h-full w-full object-cover ${position} ${className}`}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={alt === "" ? undefined : `${name} (photo coming soon)`}
      aria-hidden={alt === "" ? "true" : undefined}
      className={`grid h-full w-full ${top ? "place-items-start justify-items-center pt-[16%]" : "place-items-center"} bg-gradient-to-br ${palettes[tone % palettes.length]} ${className}`}
    >
      <span
        className={`select-none font-black tracking-tight text-white/85 ${
          small ? "text-sm" : "text-5xl sm:text-6xl"
        }`}
      >
        {initials(name)}
      </span>
    </div>
  );
}
