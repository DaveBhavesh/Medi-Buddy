// Footer content, in one place. Edit this file to add, remove or reorder footer links.
//
// Rows 1-3 are rendered from `footerRows`. Each row is a list of items; an item is one of:
//   { label, href?, children? }        a link (no href => muted "Soon" text; children nest)
//   { type: "language", label, options }  the English / Marathi selector (functional component)
//   { type: "join", label }             the Join Us email form (functional component)
// Row 4 (contact) is `footerContact`; Row 5 (the original copyright bar) lives in Footer.jsx
// as `LegacyBottomBar` and is intentionally kept separate and untouched.

export const footerRows = [
  {
    id: "row-1",
    label: "Main links",
    items: [
      { label: "Upcoming Free Workshop" },
      { label: "Live TV", href: "#videos" },
      { label: "Patriji", href: "#patriji" },
      { label: "PSSM", href: "#pssm" },
      { label: "Vegetarianism" },
      { label: "Pyramid Power", href: "#explore" },
      // >>> FUTURE: add more first-row references here (they wrap automatically).
    ],
  },
  {
    id: "row-2",
    label: "Community links",
    items: [
      { label: "Become a Volunteer", href: "#volunteer" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Audios", href: "#podcast" },
      { label: "Must Read Books", href: "#authors" },
      { label: "Events" },
      // >>> FUTURE: add more second-row references here.
    ],
  },
  {
    id: "row-3",
    label: "Language, sessions and sign-up",
    items: [
      { type: "language", label: "Choose Your Language", options: [
        { code: "en", label: "English" },
        { code: "mr", label: "Marathi" },
      ] },
      { label: "Online Zoom Sessions" },
      { label: "Offline Sessions" },
      { type: "join", label: "Join Us" },
      { label: "Q&A" },
      // >>> FUTURE: add more third-row references (or nested `children`) here.
    ],
  },
];

// Row 4. The address is the one that was already in the site's footer — do not change it.
export const footerContact = {
  address: "Hyderabad, Telangana, India",
  phones: [
    { label: "7823812199", tel: "+917823812199" },
    { label: "9823806970", tel: "+919823806970" },
  ],
  // "Support.pmc.org" was supplied, but it is a domain, not an email address, and no working
  // mailbox could be verified, so the fallback address supplied alongside it is used.
  email: "pyrmaidmeditation9@gmail.com",
};

// Shown subtly at the very end of the footer, after the existing bottom bar.
export const footerNote = "Add any required additional footer references here in the future.";
