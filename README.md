# Vaishnavi Kumbhar: Developer Portfolio

Premium animated portfolio built with **React + Vite + Tailwind CSS v4 + Framer Motion + Lucide**.
Single-page, fully responsive, respects `prefers-reduced-motion`.

## Quick start

Requires Node.js 18+ (20 or 22 recommended).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build locally
```

## Setup items before going live

| # | Item | What to do |
|---|------|-----------|
| 1 | **Resume PDF** | Copy your resume to `public/Vaishnavi-Kumbhar-Resume.pdf`. The *Download Resume* buttons appear automatically on the next build. Until the file exists, the production site hides the button (in `npm run dev` you see a dashed "setup" button instead). |
| 2 | **Contact form delivery** | Works out of the box by opening the visitor's email app (nothing is sent by the site itself, and it says so). For direct delivery, create a free [Formspree](https://formspree.io) form and set `VITE_FORM_ENDPOINT` (see `.env.example`). The success message only shows when the server confirms receipt. |
| 3 | **Live Demo buttons** | None are shown, because no deployed URL could be verified. Once you confirm a project's live URL, set `live: "https://..."` for it in `src/data/projects.js` and the button appears. |
| 4 | **Site URL** | Set `VITE_SITE_URL` (e.g. `https://yourdomain.com`) so social-share previews (Open Graph) use absolute URLs. |
| 5 | **Private projects** | *M.A. Safety Website* and *Samarth Organic Admin Panel* have no public repository or screenshot, so they are shown as clearly labelled private projects using only the details you provided. Add `repo` / `image` in `src/data/projects.js` if you publish them. |

## Where to edit things

| What | File |
|------|------|
| Name, email, phone, social links, WhatsApp | `src/data/site.js` |
| Projects (descriptions, tags, links, screenshots) | `src/data/projects.js` |
| Skills | `src/data/skills.js` |
| Services | `src/data/services.js` |
| Experience, education, certifications | `src/data/experience.js` |
| Colours and fonts | `src/index.css` (`@theme` block) |
| SEO title / description / Open Graph | `index.html` |

Project screenshots live in `public/projects/` (1200×750 WebP). They were captured from the actual
builds of each repository.

## Project structure

```
src/
  components/   Navbar, Hero, About, Skills, Services, Projects,
                Experience, Education, Contact, Footer (+ Reveal, SectionHeading, ScrollProgress, ResumeButton)
  data/         site.js, projects.js, skills.js, services.js, experience.js
  hooks/        useActiveSection.js
  pages/        Home.jsx
  App.jsx  main.jsx  index.css
public/         favicon, og-image, projects/*.webp, .htaccess, robots.txt
```

## Deployment

### Option A: GitHub Pages (free)

1. Create a GitHub repository and push this project to the `main` branch.
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and publishes on every push to `main`.
4. **Base path:** if the site lives at `https://username.github.io/repo-name/`, add a repository variable
   (**Settings → Secrets and variables → Actions → Variables**) named `VITE_BASE` with the value
   `/repo-name/`. If you name the repo `username.github.io` or use a custom domain, leave it empty.
5. Optional variables: `VITE_SITE_URL`, `VITE_FORM_ENDPOINT`.
6. Custom domain: **Settings → Pages → Custom domain**, then add the DNS records GitHub shows you at your registrar.

### Option B: GoDaddy hosting (cPanel)

1. Add your resume PDF, then run `npm run build` on your computer (leave `VITE_BASE` unset for a domain root).
2. Open GoDaddy **cPanel → File Manager → `public_html`** (or the folder of your domain).
3. Upload the **contents** of the `dist/` folder (not the folder itself): `index.html`, `assets/`, `projects/`,
   `favicon.svg`, `og-image.png`, `robots.txt` and the hidden `.htaccess`.
4. Enable the free SSL certificate in cPanel, then uncomment the HTTPS redirect lines in `.htaccess`.
5. If you host in a sub-folder (e.g. `yourdomain.com/portfolio/`), build with `VITE_BASE=/portfolio/ npm run build`.

## Accessibility and performance notes

- Semantic landmarks, one `h1`, skip link, keyboard-accessible menu (Esc closes it), visible focus states.
- `prefers-reduced-motion` disables transform animations and the CSS background motion.
- Project images are lazy-loaded with explicit dimensions; animations use transforms and opacity only.
- All external links open in a new tab with `rel="noopener noreferrer"`.

## UI features (2026/27 web platform)

- **Dark / light theme** with a circular reveal (View Transitions API), saved per visitor, no flash on load.
- **OKLCH colour tokens** and `color-mix()` so every surface adapts to both themes.
- **Animated gradients** through registered `@property` values: hero aurora and conic-gradient card borders.
- **Scroll-driven animation** (`animation-timeline: view()`) for hero parallax, with a safe fallback.
- **Native `<dialog>`** for project details and the **Ctrl/Cmd + K command palette**, animated with `@starting-style`.
- **Container queries**, `:has()`, `field-sizing: content` (auto-growing message box), `text-wrap: balance`.
- Pointer **spotlight** and 3D **tilt** on cards (disabled on touch devices and for reduced motion).
