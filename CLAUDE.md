# CLAUDE.md — Salonix: Next.js Landing Site

## Project Overview

This is the public-facing marketing and landing site for **Salonix** (salon management & POS software). It is a Next.js 16 application living in `src/`. The landing pages were converted from a React Router SPA (`landing/`) to Next.js App Router in June 2026. Its sole purpose is to convert visitors into customers and rank highly in search engines. All data is static — no browser-side API calls.

## Completed Conversion (React Router → Next.js App Router)

The `landing/` folder contains the **original React Router source** (kept for reference). All pages have been converted to `src/app/`:

| Original (`landing/pages/`) | Next.js (`src/app/`) | Notes |
|---|---|---|
| `home.tsx` | `page.tsx` | `"use client"` — heavy interactivity |
| `pricing.tsx` | `pricing/page.tsx` | `"use client"` — billing model toggle |
| `about.tsx` | `about/page.tsx` | Server component |
| `our-system.tsx` | `our-system/page.tsx` | Server component |
| `blog.tsx` | `blog/page.tsx` | `"use client"` — search filter; static data replaces React Query |
| `blog_.$slug.tsx` | `blog/[slug]/page.tsx` | Server component with `generateStaticParams` |
| `request-demo.tsx` | `request-demo/page.tsx` | `"use client"` — multi-step form |
| `privacy.tsx` | `privacy/page.tsx` | Server component |
| `terms.tsx` | `terms/page.tsx` | Server component |
| `refund.tsx` | `refund/page.tsx` | Server component |
| `login.tsx` | `login/page.tsx` | `"use client"` — form |
| `MarketingNav.tsx` | `components/layout/Navbar.tsx` | `"use client"` — theme toggle |
| — | `components/layout/Footer.tsx` | Server component |

### Key Conversion Decisions

- **Blog data**: Replaced React Query + API fetch with a static `POSTS` array. Add real CMS integration via server-side `fetch` when ready.
- **Theme**: `next-themes` (`ThemeProvider` in `src/lib/theme-context.tsx`) replaces custom `useTheme` context.
- **Pricing data**: Extracted to `src/lib/pricing-data.ts` as static TypeScript (was `@/lib/pricing-models`).
- **Images**: `@/assets/` imports replaced with `placehold.co` or Unsplash URLs. Replace with `next/image` + real assets when available.
- **Navigation**: All `Link to="..."` → `Link href="..."` from `next/link`.

---

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 16.2.7 (App Router) | RSC, file-based routing, built-in image/font optimization |
| Language | TypeScript (strict) | Type safety across the codebase |
| Styling | Tailwind CSS v4 | Utility-first, zero runtime CSS |
| Fonts | `next/font` (Google Fonts) | Self-hosted, no external font requests at runtime |
| Images | `next/image` | Automatic WebP/AVIF, lazy loading, priority hints |
| Icons | `lucide-react` | Tree-shakeable SVG icons |
| Animation | Framer Motion (lazy imported) | Only loaded when section enters viewport |
| SEO | Native Next.js metadata API | No third-party SEO packages needed |
| Deployment | Vercel (or static export) | Edge network, ISR, automatic compression |

---

## Absolute Rules

1. **No `use client` at the page level.** Every page (`page.tsx`) must be a React Server Component.
2. **No API calls from the browser.** No `fetch`, no `axios`, no `useEffect` data fetching. All content is static props, MDX, or hardcoded data files in `/data`.
3. **No runtime environment variables exposed to the client.** Only `NEXT_PUBLIC_` prefixed vars allowed on the client, and only for analytics/tracking (e.g., GA4 measurement ID).
4. **No `useEffect` for data.** `useEffect` is permitted only for DOM interactions (scroll listeners, intersection observers, etc.).
5. **All pages must have a `generateMetadata` export** or a static `metadata` export. No page ships without title, description, canonical, and OG tags.
6. **All images must use `<Image>` from `next/image`.** No raw `<img>` tags.
7. **No heavy client bundles.** Every Client Component must be justified. Animate with CSS where possible; reach for Framer Motion only when CSS is insufficient.

---

## Folder Structure

```
/src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, global meta, structured data
│   ├── page.tsx                # Homepage (/)
│   ├── pricing/
│   │   └── page.tsx
│   ├── features/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── blog/
│   │   ├── page.tsx            # Blog index
│   │   └── [slug]/
│   │       └── page.tsx        # Individual post (MDX)
│   ├── contact/
│   │   └── page.tsx
│   └── sitemap.ts              # Auto-generated sitemap
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Server component shell, client toggle for mobile menu
│   │   └── Footer.tsx
│   ├── sections/               # Page sections (all Server Components unless noted)
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Pricing.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   └── CTA.tsx
│   └── ui/                     # Primitive UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Badge.tsx
├── content/
│   └── blog/                   # MDX files for blog posts
├── data/                       # Static data files (TypeScript, no fetch)
│   ├── features.ts
│   ├── pricing.ts
│   ├── testimonials.ts
│   └── faq.ts
├── lib/
│   ├── metadata.ts             # Shared metadata helpers
│   └── structured-data.ts      # JSON-LD schema builders
├── public/
│   ├── images/
│   └── fonts/                  # Only if self-hosting non-Google fonts
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## SEO Requirements (Non-Negotiable)

### Every Page Must Have

```tsx
export const metadata: Metadata = {
  title: "Page Title | Salon Suite Pro",
  description: "150 characters max. Unique per page. Keyword-rich but natural.",
  alternates: { canonical: "https://salonsuites.pro/page-path" },
  openGraph: {
    title: "...",
    description: "...",
    url: "https://salonsuites.pro/page-path",
    images: [{ url: "/og/page-path.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "...",
    description: "...",
    images: ["/og/page-path.png"],
  },
};
```

### Root Layout Must Include

- `<html lang="en">`
- Favicon set (ico, png, apple-touch-icon, manifest.json)
- Organization JSON-LD schema
- WebSite JSON-LD with SearchAction
- Google Analytics / GTM via `next/script` with `strategy="afterInteractive"`

### Sitemap (`app/sitemap.ts`)

Auto-generate using Next.js `MetadataRoute.Sitemap`. Include all static pages and all blog post slugs. Set `changeFrequency` and `priority` appropriately.

### Robots (`app/robots.ts`)

```ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://salonsuites.pro/sitemap.xml",
  };
}
```

---

## Performance Budget

| Metric | Target |
|---|---|
| LCP | < 1.5s |
| CLS | < 0.05 |
| FID / INP | < 100ms |
| Total JS (client) | < 80 KB gzipped |
| Core Web Vitals | All green in PageSpeed |

### How to Hit the Budget

- Hero image: use `priority` prop on `<Image>`, preload via `<link rel="preload">` in layout
- Fonts: `display: "swap"` on all `next/font` declarations
- Third-party scripts: always `strategy="lazyOnload"` or `"afterInteractive"`, never `"beforeInteractive"` unless absolutely required
- Framer Motion: dynamic import with `ssr: false` only for animation wrappers; never import the full library at the page level
- No global CSS animations that cause layout shifts

---

## Design System

Use the same Tailwind design tokens as the POS app so both products feel visually unified.

### Brand Colors (add to `tailwind.config.ts`)

```ts
colors: {
  brand: {
    50:  "#fdf4ff",
    100: "#fae8ff",
    500: "#a855f7",   // primary purple
    600: "#9333ea",
    700: "#7e22ce",
    900: "#581c87",
  },
  surface: {
    DEFAULT: "#ffffff",
    muted:   "#f9fafb",
    dark:    "#0f0f0f",
  },
}
```

### Typography Scale

- Headings: `font-display` (self-hosted variable font)
- Body: `font-sans` (system stack fallback while font loads)
- Minimum body font size: 16px
- Line height body: 1.6

---

## Pages & Content Outline

### `/` — Homepage

1. **Hero** — headline, sub-headline, primary CTA ("Start Free Trial"), secondary CTA ("Watch Demo"), hero image/video
2. **Social Proof Bar** — logos of known salon brands or media mentions
3. **Features Grid** — 6 key features with icons
4. **How It Works** — 3-step process with illustrations
5. **Pricing Teaser** — "Plans from $X/month" → link to /pricing
6. **Testimonials** — carousel (CSS-only or minimal JS)
7. **FAQ** — accordion (CSS-only `<details>` preferred)
8. **Final CTA** — full-width banner

### `/features`

Full feature breakdown with screenshots. Each feature section uses an alternating layout (image left/right). Include anchor links for direct deep-links.

### `/pricing`

Pricing table with monthly/annual toggle (client component, but purely presentational — no fetch). Include FAQ below the table. Add `PriceSpecification` JSON-LD.

### `/blog`

Static blog. Posts are MDX files in `/content/blog/`. Use `generateStaticParams` for all slugs. Add `Article` JSON-LD per post.

### `/about`

Team section, company story, mission statement.

### `/contact`

Static contact info (email, phone, address). Contact form is a `<form>` that POSTs to a Next.js Route Handler (`/api/contact`) — the **only** allowed server action. Do not call external APIs from the client.

---

## Content Guidelines

- All marketing copy must include target keywords naturally (do not stuff)
- Every section heading should use an H-tag (H1 only once per page)
- Alt text required on every image — descriptive, keyword-aware but not stuffed
- Internal linking: every page must link to at least 2 other pages
- External links: add `rel="noopener noreferrer"` and consider `rel="nofollow"` for paid links

---

## Accessibility

- WCAG 2.1 AA minimum
- All interactive elements must be keyboard-navigable
- Focus rings must be visible (don't `outline: none` without a replacement)
- Color contrast ratio ≥ 4.5:1 for body text, ≥ 3:1 for large text
- All form inputs must have associated `<label>` elements
- Skip-to-content link at top of layout

---

## Development Commands

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # Production build
npm run start        # Serve production build locally
npm run lint         # ESLint
```

---

## What NOT to Do

- Do not install `react-helmet` or any third-party SEO package — use Next.js metadata API
- Do not use `getServerSideProps` — this is App Router only
- Do not call any backend API from a page component
- Do not use CSS-in-JS (styled-components, emotion) — Tailwind only
- Do not commit `.next/` or `node_modules/`
- Do not add `"use client"` to files that don't need interactivity
- Do not use `dangerouslySetInnerHTML` except in the structured-data script tag (JSON-LD)
