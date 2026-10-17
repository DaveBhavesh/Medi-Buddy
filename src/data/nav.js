// Header navigation, in one place. Edit this file to add / remove / reorder menu items.
//
// Shape:  { label, href?, children?: [ ...same shape ] }
//   - `href`  is an in-page anchor of a section that EXISTS on the site (e.g. "#patriji").
//   - No `href` on a leaf  => the page/section does not exist yet. It renders as a muted,
//     non-clickable "Soon" entry instead of a fake link. Add the href when the page is built.
//   - `children` nests (Explore uses two levels).

export const navMenu = [
  {
    label: "Meditation",
    children: [
      { label: "Anapanasati Meditation", href: "#explore" },
      { label: "Science Behind Meditation", href: "#pssm" },
      { label: "Benefits of Meditation", href: "#meditation" },
      { label: "Pyramid Meditation", href: "#videos" },
      { label: "Full Moon Meditation", href: "#videos" },
      { label: "Music Meditation", href: "#be-a-meditator" },
      { label: "Mind and Meditation", href: "#pssm" },
    ],
  },
  {
    label: "PSSM",
    children: [
      { label: "18-Guiding Principles", href: "#pssm" },
      { label: "13-Personal Principles" },
      { label: "Pyramid Energy", href: "#explore" },
      { label: "Pyramids Everywhere" },
      { label: "Emblem" },
      { label: "Vegetarianism" },
      { label: "Spiritual Science" },
    ],
  },
  {
    label: "Patriji",
    children: [
      { label: "About Patriji", href: "#patriji" },
      { label: "Handwritten Messages by Patriji" },
      { label: "Patriji Concepts", href: "#explore" },
      { label: "Patriji Quotes", href: "#quotes" },
      { label: "Books Written by Patriji" },
      { label: "Books Suggested by Patriji", href: "#authors" },
      { label: "Q&A" },
    ],
  },
  {
    label: "Events",
    children: [{ label: "Offline Events" }, { label: "Online Events" }],
  },
  {
    label: "Explore",
    children: [
      {
        label: "Downloads",
        children: [{ label: "Magazines", href: "#magazine" }, { label: "Free Pamphlets" }],
      },
      {
        label: "Gallery",
        children: [{ label: "Photos" }, { label: "Videos", href: "#videos" }, { label: "Audio", href: "#podcast" }],
      },
      {
        label: "Additional links",
        children: [
          { label: "Other PMC Channels" },
          { label: "Other PSSM Websites" },
          { label: "Store" },
          { label: "Recommended Movies" },
        ],
      },
    ],
  },
  {
    label: "Contact",
    children: [{ label: "Seva Yog", href: "#volunteer" }, { label: "Meditation Centres" }],
  },
];
