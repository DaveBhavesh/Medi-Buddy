// Drop-in photos for people who do not have an image in the project yet.
// Put a file named after the person's slug in  src/assets/people/  (jpg, jpeg, png or webp),
// e.g.  src/assets/people/virat-kohli.jpg  and it is picked up automatically on the next build.
const dropIns = import.meta.glob("/src/assets/people/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  query: "?url",
  import: "default",
});

const bySlug = {};
Object.entries(dropIns).forEach(([path, url]) => {
  const slug = path.split("/").pop().replace(/\.[^.]+$/, "").toLowerCase();
  bySlug[slug] = url;
});

/** Returns a URL for the person's photo: a drop-in file first, then the project asset (if any). */
export function getPersonPhoto(slug, publicAsset) {
  if (bySlug[slug]) return bySlug[slug];
  return publicAsset ? `/assets/${publicAsset}` : null;
}

export function initials(name) {
  return name
    .replace(/\b(Dr|Mr|Mrs|Madam|Don)\.?\s/gi, "")
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}
