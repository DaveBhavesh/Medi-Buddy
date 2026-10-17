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
  image: "img-000.jpg",
  imageAlt: "Brahmarshi Pitamaha Patriji",
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
  card: {
    image: "img-001.jpg",
    imageAlt: "Patriji addressing a vast audience from the stage",
    label: "Watch video",
    href: "#videos",
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
    poster: "",
    videoId: "",
  },
  {
    id: "relationships",
    title: "Relationships",
    description:
      "Nurture meaningful, fruitful relationships and experience harmony in every aspect of life. Click..",
    poster: "",
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
    poster: "",
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
  cta: { label: "Watch guided meditation", href: "#videos" },
};

// 8. Swadhyay Yog
export const swadhyay = {
  title: ["SWADHYAY", "YOG"],
  by: "by Brahmarshi Patriji",
  photo: "img-012.jpg",
  photoAlt: "Patriji seated with a microphone and a book on his lap",
  quote: "“Books are undeniably a swift shortcut to Enlightenment”",
  quoteBy: "Linda Goodman",
  watch: { label: "watch", href: "#videos" },
};
