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
src/main.jsx      entry
src/App.jsx       all sections (Header, Hero, Explore, ..., Footer)
src/index.css     Tailwind + global styles
public/assets/    all images
```
