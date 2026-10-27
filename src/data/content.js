// Site content kept separate from presentation so copy/images can be edited in one place.

// YouTube Short shown over the hero image.
export const heroVideo = {
  id: "gS9EKeWFni0",
  title: "Short video: PMC World meditation with Patriji",
};

// "Hunger" row: each card plays a YouTube Short of Patriji (official PMC / Pyramid channels).
// `videoId` is the part after youtube.com/shorts/.
export const exploreCards = [
  { title: "About the PSSM", videoId: "7AVeecIRLVM" }, // MEDITATION is EASY! (PMC Hindi)
  { title: "Frequently Asked Questions", videoId: "PAvn21X_xQg" }, // How Do I Speak Perfect Statements? (PMC English)
  { title: "Anapanasati Meditation", videoId: "74arSG6eKmA" }, // 7 Types of Meditation Experiences (PMC Hindi)
  { title: "About Patriji", videoId: "5MXAGegP4qc" }, // Brahmarshi Patriji Speaks (PMC Hindi)
  { title: "Pyramid Energy", videoId: "ZE3qK3sK1H8" }, // How do Pyramids help in Spiritual Farming? (PMC English)
  { title: "Patriji's Concepts", videoId: "x9K1sBIYnFk" }, // Advantages of Doing 3 hours of Meditation (Pyramid Meditation)
];

// Facts below come from the challenge poster (img-004): free, 21 days, live on Zoom & YouTube.
export const challenge = {
  titleTop: "PMC Meditation",
  titleAccent: "Challenge",
  panel: {
    figure: "patriji-cutout.webp",
    figureAlt: "Patriji in an orange vest, seated in meditation",
    number: "21",
    numberLabel: "Days",
    tags: ["Free", "Live"],
  },
  copy: "A free 21-day guided meditation challenge with Patriji, live on Zoom and YouTube. Your one-stop solution for any problem, one calm day at a time.",
  cta: { label: "Join the challenge", href: "#be-a-meditator" },
  liveOnLabel: "Live on:",
  liveOn: ["Zoom", "YouTube"],
  card: {
    image: "img-043.jpg",
    imageAlt: "Patriji meditating on stage beside a devotee",
    label: "Watch video",
    href: "#explore",
  },
};

export const pmcWorld = {
  image: "img-019.jpg",
  imageAlt: "Patriji speaking to a gathering of meditators",
  eyebrow: "Pyramid Meditation Channel",
  title: "PMC World",
  subtitle: "Transforming Lives Through Meditation",
  paragraphs: [
    "PMC is the media wing of the Pyramid Spiritual Societies Movement (PSSM), founded by Brahmarshi Pitamaha Patriji — a global, non-profit and non-religious spiritual organization dedicated to transforming humanity through Anapanasati Meditation, Pyramid Power, and Vegetarianism, all free of cost.",
    "PMC World channel was inaugurated on November 11, 2024, on the birth anniversary of our beloved master, friend, Guru Brahmarshi Pitamaha Patriji.",
  ],
  cta: { label: "Discover PMC", href: "#explore" },
  secondaryCta: { label: "Listen to the podcast", href: "#podcast" },
  // The three practices named in the paragraph above.
  pillars: [
    { title: "Anapanasati Meditation", text: "Simply observing your natural breath to quieten the mind." },
    { title: "Pyramid Power", text: "Meditating in pyramids to deepen every experience." },
    { title: "Vegetarianism", text: "Compassion for all living beings, starting with our food." },
  ],
  // Facts from elsewhere on the site (About Patri Ji and the paragraph above).
  stats: [
    { value: "40+", label: "Countries with PSSM" },
    { value: "1979", label: "The mission began" },
    { value: "Free", label: "For everyone, always" },
  ],
};

// "Our journey in numbers" (client design). Photos were taken from the design PDF.
// Card colours follow the site palette (indigo -> orchid -> plum -> saffron) instead of the PDF's green.
// `lines`: text under the number; `soft: true` lines use the card's lighter tint.
export const journey = [
  {
    value: "30+",
    lines: [{ text: "years", soft: true }, { text: "of continuous", soft: true }, { text: "spiritual service" }],
    image: "journey-service.jpg",
    alt: "Patriji addressing a hall full of meditators",
    color: "#4b2a7f",
    tint: "#bda6e3",
  },
  {
    value: "10,000+",
    lines: [{ text: "worldwide", soft: true }, { text: "Meditation centers" }],
    image: "journey-centers.jpg",
    alt: "Entrance gate of Pyramid Valley International, Maitreya-Buddha Vishwalayam",
    color: "#7a3fb0",
    tint: "#dcc2f2",
  },
  {
    value: "20,000+",
    lines: [{ text: "built", soft: true }, { text: "Meditation Pyramids" }],
    image: "journey-pyramids.jpg",
    alt: "Patriji seated in a garden in front of a large meditation pyramid",
    color: "#b0359b",
    tint: "#eaa8de",
  },
  {
    // The design reads "1,44,4000+"; shown here as 1,44,000+ (one lakh forty-four thousand).
    value: "1,44,000+",
    lines: [{ text: "pyramid meditation", soft: true }, { text: "masters" }],
    image: "journey-masters.jpg",
    alt: "A group of pyramid meditation masters holding books",
    color: "#e07a26",
    tint: "#fbd0a6",
  },
];


export const books = [
  { name: "Yogananda", image: "img-026.jpg" },
  { name: "Lobsang Rampa", image: "img-040.jpg" },
  { name: "Brian Weiss", image: "img-035.jpg" },
  { name: "Louise Hay", image: "img-038.jpg" },
];
