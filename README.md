# Fuad Al Maimun — Portfolio

A production-ready developer portfolio built with **Next.js (App Router)**, **React 19** and **Tailwind CSS v4**. Designed for tech recruiters: fast, fully responsive, accessible, and easy to maintain.

## Features

- **Hero** — animated typewriter introduction, prominent **Download Resume / CV** CTA with shimmer hover, and an inline CV preview modal.
- **Sticky header** — scroll-spy navigation, desktop resume button, and a mobile menu with its own resume CTA.
- **Skills** — interactive, filterable skill grid with **animated proficiency progress bars** (staggered, scroll-triggered) plus a tech toolbox strip.
- **Projects** — alternating project cards opening a full **case study modal** with six tabs:
  - Overview & Features
  - Tech Stack
  - State Management
  - Backend Architecture
  - Challenges Solved
  - Future Plans
- **Contact** — validated contact form with live field errors, loading/success/error states, spam honeypot, and server-side **EmailJS** delivery (graceful mailto fallback when unconfigured).
- **Accessibility** — keyboard-navigable modals (Esc to close), ARIA roles on tabs/progress bars, visible focus rings, and `prefers-reduced-motion` support.
- **Responsive** — mobile-first layout verified from 320px through 4K.

## Tech stack

| Layer | Technologies |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Styling | Tailwind CSS v4, custom CSS animations |
| Icons | lucide-react, react-icons |
| Email | EmailJS via a Next.js Route Handler (`app/api/contact`) |
| Language | JavaScript (JSX), TypeScript tooling |

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run start    # serve the production build
npm run lint     # lint
```

The site runs without any configuration. To activate real email delivery, add your EmailJS keys (see below).

## Contact form / EmailJS setup

The contact form posts to **`POST /api/contact`**, a server-side Route Handler that validates the payload and forwards it to EmailJS. Keys stay on the server — nothing third-party ships to the browser.

1. Create a free account at [dashboard.emailjs.com](https://dashboard.emailjs.com).
2. Add an **Email Service** (Gmail, Outlook, …) → copy the **Service ID**.
3. Create a **Template** containing these variables and copy the **Template ID**:
   ```
   {{from_name}}  {{from_email}}  {{reply_to}}  {{subject}}  {{message}}
   ```
4. Copy your **Public Key** from *Account → API Keys*.
5. Create `.env.local` (see [`.env.example`](.env.example)) — locally — and add the same variables in your Vercel project settings for production:

   ```bash
   EMAILJS_SERVICE_ID=your_service_id
   EMAILJS_TEMPLATE_ID=your_template_id
   EMAILJS_PUBLIC_KEY=your_public_key
   ```

**Until the keys are set**, the form still works: it degrades gracefully by opening the visitor's mail app with the message pre-filled.

Server-side safeguards include field validation, a honeypot spam trap, and per-IP rate limiting (5 requests/minute).

## Project structure

```
app/
  page.jsx               # page composition (sections in order)
  layout.jsx             # fonts, metadata, global styles
  api/contact/route.js   # EmailJS contact endpoint
src/
  components/            # one component per section/feature
  data/                  # projects, skills, education, site-wide constants
  styles/globals.css     # design tokens, base styles, animations
public/                  # images and resume PDF
```

Personal links and the resume path live in a single source of truth: [`src/data/site.js`](src/data/site.js).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run frames` | Optimize the hero scroll-sequence frames |
