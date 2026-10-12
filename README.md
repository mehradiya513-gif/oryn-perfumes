# ORYN — Accessible Indian Luxury Perfumes

A production-ready, mobile-first e-commerce landing site for ORYN: premium fragrances
under ₹800. Quiet-luxury design, single-page structure, working cart + checkout,
and full SEO/schema markup.

Built with **Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion**.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

Other useful routes that ship with the site: `/about`, `/contact`,
`/shipping`, `/refund`, `/privacy`, `/terms`, and an `/admin` order board
(seller login: `seller` / `outfit123`).

## Page structure (single page, in order)

1. Announcement bar — free shipping / COD
2. Sticky header — transparent over hero, solid charcoal on scroll, search + cart + hamburger
3. Hero — full-screen cinematic image, "Luxury You Can Actually Wear" (₹800 sub-line), 2 CTAs, scroll cue
4. Trust strip — Long-lasting · Premium Ingredients · COD · Easy Returns
5. Shop by Category — For Him / For Her / Unisex / Gift Sets tiles
6. Bestsellers — swipe carousel (mobile) / 4-column grid (desktop), MRP strike + discount badges + hover image swap
7. Scent Finder — 3-question quiz that recommends a product
8. Brand Story — split image/copy
9. Scent Notes Explainer — top / heart / base with icons
10. Social Proof — review cards + UGC grid (#WearORYN)
11. Offer Banner — "Buy 2, Get 10% off" with live countdown (resets daily at 00:00 IST)
12. FAQ — accessible accordion (aria-expanded, keyboard operable)
13. Newsletter — email + WhatsApp capture → `/api/leads`
14. Footer — links, payment marks (UPI/VISA/MC/RuPay/COD), policies

Extras: floating WhatsApp order button, mobile sticky add-to-cart bar,
mini cart drawer + checkout modal (shared with the whole site), product JSON-LD,
Open Graph/Twitter meta.

## Editing products

All catalog data lives in **`src/lib/products.ts`** — names, prices, MRP,
categories, notes, bestseller flags, and image paths.
Images live in `public/images/` (replace the placeholders with real
photography; keep the same file names and everything updates automatically).

Rule of the brand: every product stays **under ₹800**.

## Key files

```
src/lib/products.ts           ← product catalog (edit me)
src/app/page.tsx              ← assembles all sections + JSON-LD
src/app/layout.tsx            ← fonts (Playfair Display + Inter), SEO/OG metadata
src/components/landing/       ← all 14 section components (one concern each)
src/components/CartDrawer.tsx ← slide-in mini cart
src/components/CheckoutModal.tsx ← COD / UPI checkout
src/context/CartContext.tsx   ← cart state (localStorage-persisted)
src/app/globals.css           ← palette hooks, grain texture, motion tokens
```

## Design tokens

| Token | Value | Use |
|---|---|---|
| `charcoal` | `#0E0E0E` | header, footer, hero scrim |
| `ivory` | `#F7F2EA` | page ground |
| `gold` | `#C8A45D` | accents, dividers, badges |
| `blush` | `#EFDCD4` | highlight sections |

Headings: Playfair Display (serif) · Body: Inter (sans).

## Accessibility & performance

- WCAG AA contrast targets; focus-visible outlines everywhere
- Keyboard operable: FAQ accordion, quiz, menus, cart drawer
- `prefers-reduced-motion` respected in all Framer Motion primitives
- `next/image` everywhere, lazy-loading below the fold, priority only on hero/first cards
- Horizontal overflow verified at 390px; carousel uses CSS scroll-snap

## Visual audit

`node scripts/oryn-audit.js` drives headless Chrome at 390px and 1440px and
checks: console errors, section presence, horizontal overflow, hero CTAs,
FAQ toggle, quiz click-through, carousel behavior, and header state.
Full-page screenshots land in `scripts/screenshots/`.

## Deployment

Vercel (recommended): import the repo, build `npm run build`, output `.next`.

## Notes

- The WhatsApp number placeholder (`919000000000`) appears in
  `src/components/landing/WhatsAppFloat.tsx` and `Newsletter.tsx` — replace
  with the store's real number.
- Orders persist via the existing `/api/orders` MongoDB route; leads via `/api/leads`.
- Replace placeholder product photography in `public/images/` before launch.
