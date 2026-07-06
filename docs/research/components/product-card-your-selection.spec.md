# ProductCard + YourSelection Specification

## Overview
- **Target files:** `src/components/ProductCard.tsx` (reusable card) + `src/components/YourSelection.tsx` (section using it)
- **Interaction model:** click-driven filter pills (Best Sellers / Recently Viewed / New) switch the visible product set; horizontally scrollable card row (native overflow-x, not a JS carousel library).

## YourSelection section
- Heading "Your Selection" — `font-size: 16px` (note: visually reads larger due to page context but computed value is 16px — likely styled via a heading class elsewhere; render at a clearly larger visual size, e.g. `text-2xl md:text-3xl font-normal`, using best judgment for a section heading since the raw computed value here reads too small to trust literally for a section title — prioritize matching the screenshot proportions: heading is noticeably larger than body text, roughly 24-28px).
- Filter pills row below heading: "Best Sellers", "Recently Viewed", "New". Pill style: `border: 1px solid #000`, `border-radius: 16px` (fully rounded / `rounded-2xl`), `padding: 3px 10px`, `font-size: 16px`, transparent background. Active pill: filled black background with white text (inverted) — exact active-state not captured pixel-for-pixel but this is the standard toggle-pill pattern; implement active = `bg-black text-white`, inactive = `bg-transparent text-black border-black`.
- Below pills: horizontally scrollable row of `ProductCard` components (native `overflow-x-auto` flex row, ~5 cards visible at desktop 1440px width, partial card peeking at the edge to indicate scrollability — use `flex gap-4 overflow-x-auto` with each card `flex-shrink-0 w-[265px]` roughly).
- Clicking a pill swaps the product array shown (maintain 3 arrays: bestSellers, recentlyViewed, newProducts — can reuse the same sample product data across all three for a demo, that's fine).

## ProductCard component
- Card width ~265px (matches "Add to bag" button's measured width of 265.594px).
- Top: badge (optional) — small pill top-left, e.g. "New" (dark purple/black bg, white text) or "Limited edition". `font-size` small (~12-14px), `padding: ~4px 10px`, `border-radius: 4px` or pill-shaped.
- Wishlist heart icon — top-right of the image, outline style (unfilled), circular, white/transparent background over the product image, ~32px tap target. Use `Heart` from `src/components/icons.tsx`.
- Product image — square-ish aspect, `next/image`.
- Title: product category/collection name, e.g. "Fresh Fragrances & Perfumes" — `font-size: 16px`, `font-weight: 300` (light — use `font-light` if the Caudalie-Light font variable is wired, else `font-weight: 300`), `color: #2d1946`.
- Subtitle: specific product name, e.g. "Fresh Fragrance Eau des Vignes" — same size, regular weight, `color: #2d1946`.
- Rating row: `StarIcon` (from `src/components/icons.tsx`, fill `#2d1946`, ~16px) repeated to show a star rating (use a simple filled-star-count out of 5, no half-star rendering needed) + review count in parentheses, e.g. "(52)" — small grey text.
- Price row: current price `font-size: 16px`, `color: #2d1946`, e.g. "€30.00". If there's a `compareAtPrice` (sale item), show it struck-through in muted grey to the right of the current price (seen on one card: "€17.00 €21.00").
- "Add to bag" button: full-width within the card, `padding: 12px 15px`, `border: 1px solid rgba(0,0,0,0.3)`, `border-radius: 6px`, `background-color: #fff`, `color: #2d1946`, `font-size: 16px`.

## Sample data (use as the default product list — real content from the live site)
1. Badge "New" — Fresh Fragrances & Perfumes / Fresh Fragrance Eau des Vignes — 4.5★ (52) — €30.00 — image `/images/caudalie/product-eau-des-vignes-packshot.jpg`
2. Badge "Limited edition" — Caudalie Essentials x Maria de la Orden — 4.5★ (798) — €16.00 — image `/images/caudalie/product-caudalie-essentials-set.jpg`
3. Badge "New" — Fresh Fragrances & Perfumes / Ange des Vignes Light Fragrance — 4.5★ (34) — €30.00 — image `/images/caudalie/product-ange-des-vignes-packshot.jpg`
4. Vinotherapist™ / Tinted Lip Balm — 4.5★ (86) — €10.00 — image `/images/caudalie/product-tinted-lip-balm.jpg`
5. Vinoclean / Grape Water - 300ml — 5★ (260) — €17.00, compareAtPrice €21.00 — image `/images/caudalie/product-grape-water.jpg`

## Requirements
1. Build `src/components/ProductCard.tsx` accepting a `Product` prop (type already defined in `src/types/content.ts`).
2. Build `src/components/YourSelection.tsx` as a `"use client"` component (needs pill-switching state) that renders the heading, pills, and a horizontally-scrolling row of `ProductCard`s using the sample data above (duplicate/reuse the same 5 products across all 3 tabs for the demo — acceptable).
3. Use `next/image` for product images (already downloaded to `public/images/caudalie/`).
4. Tailwind utility classes only, consistent with project conventions (brand tokens in `src/app/globals.css`).
5. Do NOT edit `src/app/page.tsx` or any other section's files.
6. Verify with `npx tsc --noEmit` (zero errors related to your new files) before finishing.

Report back concisely: what you built and typecheck status.
