// Copy and image names for the home page sections. Edit text here, not in the components.

// 1. Hero slider (images live in public/assets)
export const heroSlides = [
  {
    image: "img-004.jpg",
    alt: "Free 21-day meditation challenge with Patriji, live on Zoom and YouTube",
    width: 1400,
    height: 798,
  },
  {
    image: "img-019.jpg",
    alt: "Patriji speaking to a gathering of meditators",
    width: 1372,
    height: 772,
    position: "object-[50%_40%]",
  },
  {
    image: "img-043.jpg",
    alt: "Patriji meditating on stage beside a devotee",
    width: 1395,
    height: 930,
    position: "object-[50%_55%]",
  },
  {
    image: "img-023.jpg",
    alt: "A large crowd of people raising their hands at a PSSM gathering",
    width: 2000,
    height: 1319,
    position: "object-[50%_45%]",
  },
  {
    image: "img-001.jpg",
    alt: "Patriji addressing a vast audience from the stage",
    width: 984,
    height: 656,
    position: "object-[50%_45%]",
  },
  {
    image: "img-007.jpg",
    alt: "Patriji speaking to a hall full of meditators",
    width: 791,
    height: 527,
    position: "object-[50%_45%]",
  },
];

// 3. About Patriji (wording supplied by the client, kept as written)
export const aboutPatriji = {
  // Background video: "What is ANAPANASATI? | Patriji" (PMC English, youtube.com/watch?v=6Er_tAyLt9k)
  video: { id: "6Er_tAyLt9k", title: "Background video: Brahmarshi Pitamaha Patriji speaking" },
  title: "About Patri Ji",
  intro:
    "Patriji was born in the year 1947 at Bodhan, Andhra Pradesh. A Family man with ag. M.sc degree.He became enlightened in the year 1979, since then his journey to awaken and enlighten every individual on the Spiritual path began. As a result of his work, PSSM now has presence in more than 40 countries with crores and crores on people imbibing meditation.",
  more: "He was conferred with titles of “Brahmarshi” and “Pitamaha”. Patriji was a great flutist and singer, wonderful cook and avid reader who read over 1 Lakh books in this lifetime. Patriji established The Kurnool Spiritual Society in the year 1990 in Kurnool, since then till his last breath Patriji worked relentlessly for the, sole mission to provide physical, mental, intellectual and spiritual health to one and all at free of cost. As a result of his work PSSM now has its presence in more than 40 countries, with lakhs and lakhs of people transformed into Meditator and Vegetarian..",
};

// 5. Why Meditation (wording supplied by the client)
export const whyMeditation = {
  image: "patriji-meditating.jpg",
  imageAlt:
    "Brahmarshi Pitamaha Patriji seated in meditation in front of snow-capped mountains",
  titleTop: "WHY",
  titleAccent: "Meditation?",
  questions: [
    "Why should one do Meditation?",
    "How should one do Meditation?",
    "What is Meditation?",
    "What is right age for Meditation?",
  ],
  copy: "Meditation is silencing the incessant chatter of the restless mind for that.. one needs to be with the BREATH. Meditation has numerous benefits.. to name a few all diseases healed, stress-free life, career excellence, increased mind power, qualitative relationships and self-realisation.",
  benefits: [
    "All diseases healed",
    "Stress-free life",
    "Career excellence",
    "Increased mind power",
    "Qualitative relationships",
    "Self-realisation",
  ],
  cta: { label: "Learn to meditate", href: "#be-a-meditator" },
  // Autoplaying video docked into the photo's corner:
  // "10 Minutes Beginner's Guide to Meditation by Brahmarshi Patriji" (PMC Hindi, youtube.com/watch?v=MsWhoEXtnVk)
  card: {
    videoId: "MsWhoEXtnVk",
    videoTitle: "Brahmarshi Patriji: beginner's guide to meditation",
    label: "Watch video",
    href: "#explore",
  },
};

// 6. Testimonials by category.
// `videoId`: the YouTube video id of the testimonial (the part after v= in the URL). While it is
// empty the card shows "Video coming soon"; once filled in, the card opens the video.
// `poster`: image in public/assets used as the thumbnail until a YouTube thumbnail is available.
export const testimonialsIntro =
  "Explore real experiences and discover how meditation can support different aspects of life through our testimonials.";

export const testimonialCategories = [
  {
    id: "health",
    title: "Health",
    description: "Head ache to Cancer anything can be cured through Meditation. Click to know..",
    poster: "img-016.jpg",
    videoId: "",
  },
  {
    id: "students",
    title: "Students",
    description:
      "Unlock powerful benefits like sharpened memory, greater self-confidence, increased focus etc.. Watch",
    poster: "img-015.jpg",
    videoId: "",
  },
  {
    id: "career",
    title: "Career",
    description: "Career Excellence, sharper decision-making and strong leadership skills. Know more..",
    poster: "Career.jpg",
    videoId: "",
  },
  {
    id: "relationships",
    title: "Relationships",
    description:
      "Nurture meaningful, fruitful relationships and experience harmony in every aspect of life. Click..",
    poster: "Relationships.jpg",
    videoId: "",
  },
  {
    id: "stress-free",
    title: "Stress Free",
    description: "Enjoy a stress-free and relaxed life every moment. Know more..",
    poster: "img-014.jpg",
    videoId: "",
  },
  {
    id: "third-eye",
    title: "Third Eye Experiences",
    description: "Gaining ability to see The Past, Future and Other Higher Realms. Know more...",
    poster: "img-040.jpg",
    videoId: "",
  },
  {
    id: "astral-travel",
    title: "Astral Travel Experiences",
    description:
      "Expanding consciousness through out-of-body experiences and travelling into higher-worlds. Click to know..",
    poster: "Astral Travel Experiences.jpg",
    videoId: "",
  },
];

// 7. Be a Meditator
export const beAMeditator = {
  title: ["BE", "A", "MEDITATOR"],
  subtitle: "Let’s Meditate Now",
  copy: "Curious to experience meditation first-hand? Let’s dive in right now! Join us for a quick 15-minute guided session and feel the difference for yourself.",
  figure: "patriji-cutout.webp",
  figureAlt: "Patriji seated in meditation, wearing an orange vest",
  photo: "img-043.jpg",
  photoAlt: "Patriji meditating on stage beside a devotee",
  cta: { label: "Watch guided meditation", href: "#explore" },
};

// 8. Swadhyay Yog
export const swadhyay = {
  title: ["SWADHYAY", "YOG"],
  by: "by Brahmarshi Patriji",
  // Photo of Patriji reading, shown inside the brown panel and faded into it at the edges.
  // (File name is case-sensitive on Vercel.)
  photo: "Patriji-reading.jpg",
  photoAlt: "Brahmarshi Patriji reading a book, with spiritual books behind him",
  // Photo of the quote's author, shown faded on the right of the quote strip (public/assets).
  quoteBySlug: "linda-goodman",
  quoteByAsset: "Linda-Goodman.jpg",
  quote: "“Books are undeniably a swift shortcut to Enlightenment”",
  quoteBy: "Linda Goodman",
  watch: { label: "watch", href: "#explore" },
};
