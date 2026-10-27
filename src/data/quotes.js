// Inspirational quotes slider. Quotes, names and roles are exactly as supplied.
// Portraits live in src/assets/people/<slug>.jpg and are picked up automatically.
// They come from Wikimedia Commons under free licences that require credit, so keep `credit`
// (author, licence) and `source` (the file's Commons page) with each photo.
const commons = (file) => `https://commons.wikimedia.org/wiki/File:${file}`;

export const quotes = [
  {
    slug: "virat-kohli",
    name: "Virat Kohli",
    role: "Indian cricketer",
    quote:
      "Turning into Vegetarian feels amazing, and it is the best decision I have taken... it made me feel why I didn’t do it before.",
    credit: "Prime Minister's Office, GODL-India",
    source: commons("Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg"),
  },
  {
    slug: "novak-djokovic",
    name: "Novak Djokovic",
    role: "Professional tennis player",
    quote:
      "Regular meditation helps in mental clarity, focus and emotional balance. Meditation not only helps on the court but also off it.",
    credit: "Andymiah, CC BY-SA 4.0",
    source: commons("Novak_Djokovic_Paris_2024_Olympic_Games_(cropped).jpg"),
  },
  {
    slug: "narendra-modi",
    name: "Narendra Modi",
    role: "Prime Minister of India",
    quote:
      "Meditation is not just about personal well-being; it is about creating a more compassionate and peaceful world.",
    credit: "Prime Minister's Office, GODL-India",
    source: commons("Narendra_Modi_Portrait_2026.jpg"),
  },
  {
    slug: "apj-abdul-kalam",
    name: "Dr. A. P. J. Abdul Kalam",
    role: "Scientist and former President of India",
    quote: "To succeed in your mission, you must have single-minded devotion to your goal.",
    credit: "Government of India, GODL-India",
    source: commons("A._P._J._Abdul_Kalam.jpg"),
  },
  {
    slug: "dalai-lama",
    name: "Dalai Lama",
    role: "Spiritual leader",
    quote:
      "Mindfulness is a technique for keeping your mind continuously on the object of your meditation. It is the antidote to forgetfulness.",
    credit: "Niccolò Caranti, CC BY-SA 3.0",
    source: commons("Tenzin_Gyatso_-_Trento_2013_01.JPG"),
  },
  {
    slug: "rabindranath-tagore",
    name: "Rabindranath Tagore",
    role: "Poet, writer, and philosopher",
    quote:
      "Everything comes to us that belongs to us if we create the capacity to receive it.",
    credit: "Georges Chevalier, CC BY 4.0",
    source: commons("1926_Rabindrath_Tagore.jpg"),
  },
  {
    slug: "malala-yousafzai",
    name: "Malala Yousafzai",
    role: "Education activist and Nobel Peace Prize laureate",
    quote: "We realize the importance of our voices only when we are silenced.",
    credit: "flowcomm, CC BY 2.0",
    source: commons("Malala_Yousafzai_2023_portrait_2x3.jpg"),
  },
];
