# Personal Portfolio

A modern, responsive single-page portfolio built with **React 18 + Vite**.
It features smooth-scroll navigation, a dark/light theme toggle (persisted in
`localStorage`), and a clean, professional design that adapts to mobile,
tablet, and desktop.

## Features

- Single-page app with smooth-scroll navigation
- Sticky, responsive navbar with a mobile hamburger menu
- Dark / light theme toggle (remembers your choice)
- Sections: Hero, About, Skills, Projects, Contact, Footer
- Contact form with client-side validation
- Fully responsive layout using CSS variables for theming
- Hover animations and smooth transitions

## Tech Stack

- React 18
- Vite 5
- Plain CSS with CSS variables (one stylesheet per component)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Install

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

Then open the URL printed in the terminal (usually http://localhost:5173).

### Build for production

```bash
npm run build
```

The optimized output is generated in the `dist/` folder.

### Preview the production build

```bash
npm run preview
```

## Customizing

Most placeholder content lives in **`src/data/content.js`**:

- `SKILLS` — the skill chips
- `PROJECTS` — project cards (title, description, tech tags, links)
- `SOCIALS` — your GitHub / LinkedIn / email
- `NAV_LINKS` — navbar entries

Replace `"Your Name"` and the tagline in `src/components/Hero.jsx`, the bio in
`src/components/About.jsx`, and the title/meta in `index.html`.

Theme colors are defined as CSS variables at the top of `src/index.css`
(`:root` for light, `:root[data-theme="dark"]` for dark).

## Project Structure

```
portfolio/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css            # global styles + theme tokens
    ├── data/
    │   └── content.js       # placeholder content
    ├── hooks/
    │   └── useTheme.js      # theme state + localStorage persistence
    └── components/
        ├── Navbar.jsx / .css
        ├── ThemeToggle.jsx / .css
        ├── Hero.jsx / .css
        ├── About.jsx / .css
        ├── Skills.jsx / .css
        ├── Projects.jsx / .css
        ├── Contact.jsx / .css
        └── Footer.jsx / .css
```
