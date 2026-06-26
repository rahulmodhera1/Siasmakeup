# Sia's Makeup

Marketing website for **Sia's Makeup** — a Toronto-based freelance professional
makeup artist (bridal · fashion · photography · events).

Industrial-atelier-meets-earthy-editorial. Built with Next.js (App Router),
TypeScript, Tailwind CSS, and Framer Motion. Fully static — deploys to Vercel
with zero config.

---

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

To check the production build:

```bash
npm run build
npm run start
```

---

## Editing content

Almost everything lives in two typed files — no component edits needed.

### Gallery / portfolio — `lib/gallery.ts`

To feature a new photo:

1. Drop the image into the matching folder:
   `public/images/portfolio/<bridal|fashion|photography|events>/`
2. Add **one line** to the `gallery` array:

   ```ts
   { src: "/images/portfolio/bridal/bridal-07.jpg", category: "bridal", alt: "..." },
   ```

Filtering pills and the lightbox pick it up automatically. If an image file is
missing, the site shows a tidy on-brand placeholder instead of breaking.

### Brand details, services, pricing, testimonials — `lib/content.ts`

- **`brand`** — name, email, Instagram, location.
- **`services`** — the four specialty cards.
- **`pricing`** — packages grouped by specialty. All figures are placeholders
  marked `// TODO: Sia to confirm` — edit the `price`, `unit` and `inclusions`.
- **`testimonials`** — replace the placeholder quotes with real ones.

---

## Images

```
public/images/
  hero/        hero.jpg            ← full-viewport hero (also the OG image)
  about/       portrait.jpg        ← About section portrait
  brand/       logo.svg, favicon.svg
  portfolio/
    bridal/      bridal-01.jpg …
    fashion/     fashion-01.jpg …
    photography/ photography-01.jpg …
    events/      events-01.jpg …
```

The repo ships with **generated placeholder images** in the brand palette so the
site looks intentional immediately. Replace them with real photography at the
same paths. Recommended: hero ~1920×1280, portrait ~1000×1250, portfolio
~900×1100 (portrait orientation reads best in the masonry grid). All photos use
`next/image` for responsive, optimized delivery.

To regenerate the placeholders: `node scripts/gen-placeholders.mjs`
(requires `npm install sharp` first; the script is dev-only and not needed to
build or deploy).

---

## Contact form

Enquiries are delivered to an inbox via [Formspree](https://formspree.io).
**One-time setup:**

1. Create a free form at [formspree.io](https://formspree.io) (use
   `Siasmakeup@hotmail.com` as the destination).
2. Provide the endpoint it gives you (e.g. `https://formspree.io/f/abcdwxyz`)
   in **either** place:
   - paste it into `FORMSPREE_ENDPOINT` at the top of `components/Contact.tsx`, or
   - set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` in your Vercel project settings.

Until an endpoint is set, the form gracefully falls back to opening the
visitor's email client pre-filled to `Siasmakeup@hotmail.com`, so the site is
always functional and still deploys to Vercel with zero config.

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Framework preset auto-detects **Next.js** — accept the defaults and deploy.

No environment variables or extra configuration are required.

---

## Tech

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) — palette & fonts in `tailwind.config.ts`
- [Framer Motion](https://www.framer.com/motion/) — scroll reveals, parallax, lightbox
- [lucide-react](https://lucide.dev) — thin line icons
- Fonts via `next/font/google` — Cormorant Garamond (display) + Inter (body)
