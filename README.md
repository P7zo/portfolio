# Awadh Fahad Almutairi — Portfolio · عوض فهد المطيري

Bilingual (Arabic / English) personal portfolio for **Awadh Fahad Almutairi**,
a media project manager and visual producer based in Riyadh, Saudi Arabia.
Built with **React 18 + Vite**. Domain: [awadhalmutairi.info](https://awadhalmutairi.info)

## Features

- Bilingual Arabic / English with a floating language toggle (default: Arabic)
- Automatic RTL ⇄ LTR layout switching
- Muted grayscale aesthetic with light + dark modes (persisted)
- Black-and-white hero portrait (transparent PNG)
- Sections: Hero, About (with education), Experience + Projects, Skills, Contact
- Project cards open a modal with details, "what we did", and a photo gallery
- Card/modal colors are auto-extracted (muted) from each project's own images
- Per-project deep links for CVs — e.g. `awadhalmutairi.info/#project-cst`
- Floating back-to-top button; soft, clean scroll-reveal animations
- Fully responsive

## Getting Started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview
```

## Editing content

- All text (both languages) and project data: `src/data/content.js`
  - `projects[]` — set `hidden: true` to remove a project from the site while
    keeping it in code (the Royal Reserve project is hidden until its images arrive)
- Contact details: the `contactInfo` object in the same file
- Images: see `public/images/README.md` for the exact filenames

## Project deep links

Each visible project has its own URL that opens it directly, for linking from a CV:

- `https://awadhalmutairi.info/#project-cst`
- `https://awadhalmutairi.info/#project-irathna`

## Structure

```
src/
├── App.jsx
├── index.css                     # palette, themes, RTL, all component styles
├── data/content.js               # bilingual content + projects + contact
├── context/LanguageContext.jsx   # language state, dir, persistence
├── hooks/
│   ├── useTheme.js               # light/dark, persisted
│   ├── useReveal.js              # scroll-reveal
│   └── useImageColor.js          # muted color extraction from images
└── components/
    ├── TopControls.jsx  ScrollTop.jsx
    ├── Hero.jsx  About.jsx  Skills.jsx  Contact.jsx  Footer.jsx
    ├── Experience.jsx  ProjectCard.jsx  ProjectModal.jsx
    └── Reveal.jsx
```
