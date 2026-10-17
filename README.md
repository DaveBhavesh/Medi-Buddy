# PMC World (React + JavaScript)

React 19 + Vite + Tailwind CSS v4, plain JavaScript (no TypeScript).
Responsive for phones (Android / iPhone), tablets and desktop.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
npm run preview
```

Requires Node 20.19+ (22 recommended).

## Deploy to Vercel

1. Push this folder to a GitHub repo (replace the old repo contents).
2. Import the repo in Vercel. Framework preset: **Vite** (auto-detected).
   Build command `npm run build`, output directory `dist`.

## Images / Git LFS

All images live in `public/assets/` and are committed as normal git files
(`.gitattributes` has no LFS rules), so Vercel serves the real image files.
Reference them in code as `/assets/<file>`.

> If your old repo still has an LFS-tracked file, remove its LFS rule and re-add
> it as a normal file, otherwise Vercel will keep serving pointer text.

## Structure

```
index.html
vercel.json
src/main.jsx                 entry
src/App.jsx                  page assembly + sections not yet split out
src/index.css                Tailwind + global styles + carousel CSS
src/data/content.js          all copy, image names, YouTube video id
src/components/Header.jsx
src/components/Carousel.jsx       reusable slider (scroll-snap, 10px gap, arrows, drag, touch)
src/components/HeroVideoCard.jsx  YouTube Short: hover = play, leave = pause, tap on touch
src/sections/Hero.jsx
src/sections/Explore.jsx          "hunger" heading + image slider
src/sections/PmcChallenge.jsx
src/sections/WhyMeditation.jsx
src/sections/Testimonials.jsx
public/assets/               all images
```

## Common edits

- Change the hero video: `heroVideo.id` in `src/data/content.js`.
- Change the name/text in "Why Meditation": `whyMeditation` in `src/data/content.js`.
- Challenge copy, chips and button: `challenge` in `src/data/content.js`.
- Add a testimonial or explore card: add an item to `testimonials` / `exploreCards`.

## Header & footer

- **Header menus** live in `src/data/nav.js`. A leaf with no `href` has no page yet and renders as a
  muted "Soon" entry (not a fake link). Add the `href` once the page/section exists.
- **Footer** is rendered from `src/data/footer.js` (rows 1-3 and the contact row). To add a footer
  reference, add `{ label: "New link", href: "#section" }` to a row's `items` (look for the
  `>>> FUTURE` comments); `children: [...]` nests. Rows wrap automatically. The original
  copyright bar (row 5) is `LegacyBottomBar` in `src/components/footer/Footer.jsx`.

### Join Us email notification (serverless, Vercel)

`api/subscribe.js` emails the administrator via [Resend](https://resend.com). Set in
Vercel -> Project -> Settings -> Environment Variables (then redeploy):

| Variable         | Required | Meaning |
|------------------|----------|---------|
| `RESEND_API_KEY` | yes      | Resend API key |
| `ADMIN_EMAIL`    | yes      | Address that receives each sign-up notification |
| `MAIL_FROM`      | no       | Verified sender, e.g. `PMC World <no-reply@yourdomain.org>`. Default is Resend's test sender, which can only deliver to the Resend account owner's email until you verify a domain. |

Until both required variables are set the form shows an error (it never fakes success).
`npm run dev` has no `/api`; use `npx vercel dev` to try the form locally.
