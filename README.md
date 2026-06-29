# Awadh Fahad Almutairi — Portfolio · عوض فهد المطيري

A bilingual (Arabic / English) personal portfolio for **Awadh Fahad Almutairi**,
a media project manager and visual producer based in Riyadh, Saudi Arabia.
Built with **React 18 + Vite**, featuring a dark elegant theme with a gold accent,
full RTL/LTR support, and smooth scroll-reveal animations.

موقع شخصي ثنائي اللغة (عربي / إنجليزي) لـ **عوض فهد المطيري**، مدير مشاريع
إعلامية ومنتج مرئي في الرياض.

## Features

- 🌐 **Bilingual** Arabic / English with a navbar language toggle
- ↔️ Automatic **RTL ⇄ LTR** layout switching (default language: Arabic)
- 🎨 Dark elegant theme (charcoal navy + gold accent)
- ✨ Smooth scroll-reveal animations on section entry
- 📱 Fully responsive with a mobile hamburger menu
- 🗂️ Sections: Hero, About, Key Projects, Skills, Contact
- 💾 Remembers your language choice in `localStorage`

## Tech Stack

- React 18
- Vite 5
- Plain CSS with CSS variables (single global stylesheet)

## Getting Started

```bash
npm install
npm run dev       # dev server (http://localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Customizing

All text lives in **`src/data/content.js`** — both `ar` and `en` objects hold the
nav labels, hero, about, projects, skills, and contact strings. Contact details
(email, phone, LinkedIn) are in the exported `contactInfo` object in the same file.

## Project Structure

```
portfolio/
├── index.html
├── vite.config.js
├── public/favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css                  # global styles, theme tokens, RTL rules
    ├── data/content.js            # bilingual content + contact info
    ├── context/LanguageContext.jsx# language state, dir, persistence
    ├── hooks/useReveal.js         # IntersectionObserver scroll reveal
    └── components/
        ├── Navbar.jsx   Hero.jsx    About.jsx
        ├── Projects.jsx Skills.jsx  Contact.jsx
        ├── Footer.jsx   Reveal.jsx
```
