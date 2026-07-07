# Search Results Page Specification

## Overview
- **Source pages:**
  - `https://en.caudalie.com/search?q=serum` — 10 matches, representative of a normal query.
  - `https://en.caudalie.com/search?q=zzzznonexistentproductxyz` — no-match fallback ("No results" + "Bestsellers" rail).
- **Target route:** `src/app/reference/search/page.tsx`
- **Target components:** `src/components/reference/search/{SearchResultsView,SearchResultsSummary,SearchCategoryPills,SearchProductGrid,SearchProductCard}.tsx`, data in `src/components/reference/search/data.ts`
- **New shared type:** `SearchProduct` added to `src/types/content.ts` (deliberately separate from `Product` — search cards have no rating/badge/wishlist/add-to-bag, so reusing `Product` would require faking unused fields).
- **Reused shared chrome:** `Header` (already contains the exact search input row — magnifying glass icon, `Search for a product, a treatment..` placeholder, mic icon — used as-is, no changes) and `Footer`.
- **Interaction model:** the live page has no client-side search UI of its own (the header search input isn't wired to results, and there's no visible sort/filter control on `/search`). To demonstrate both real states captured from the live site without a fake backend, `SearchResultsView` is a small client component with two toggle buttons — `Try query "serum"` / `Try query "zzzznonexistentproductxyz"` — that swap between the two real datasets captured below. This is a reference-only affordance (not present on the live page) and is called out here so it isn't mistaken for observed behavior.

## Layout, top to bottom (both states)
1. **Toggle row** (reference-only, not on live site) — centered on mobile, left-aligned on `lg`, pill buttons.
2. **Sidebar column** (`div`, first child of a `lg:grid lg:grid-cols-3 lg:gap-4` wrapper — full-width block on mobile/tablet, 1 of 3 columns on `lg`):
   - Result summary — `(10 results)` or `No results`, `text-center lg:text-left`, `mb-4`.
   - `Categories` label (`text-base font-medium`) + pill list — only rendered when categories exist. On the no-results run the live page renders this block completely empty (no "Categories" heading, no pills), so `SearchCategoryPills` returns `null` for an empty array.
3. **Product grid column** (`lg:col-span-2`): optional heading (`Bestsellers`, only shown on the no-results fallback — the normal results grid has no heading) + `ul.grid.grid-cols-2.gap-4.md:grid-cols-3` of cards.

Verified via live DOM inspection (devtools computed styles + class dump), not just screenshots:
```
div.lg:grid.lg:grid-cols-3.lg:gap-4
  div                                          <- sidebar, col 1
    p.mb-4.font-bold.text-center.lg:text-left  "(10 results)"
    div.mb-6
      p.mb-4.text-base.font-bold  "Categories"
      ul.flex.flex-wrap.gap-2 > li > a.px-2.text-white.rounded.bg-th-primary
  ul.grid.grid-cols-2.gap-4.lg:col-span-2.md:grid-cols-3   <- grid, cols 2-3
    li > a.flex.flex-col.items-center
      img.w-[160px].max-w-full
      p.mt-2.min-h-[4.5rem].text-center            (title)
      p.w-full.p-2.mt-2.text-center.bg-gray-100
        span.font-bold  "€53.00"
```
Outer container: `div.max-w-[1280px].m-auto > div.p-4.pb-8` (mapped to `mx-auto w-full max-w-[1280px] px-4 py-6 md:px-8` in our page, matching the rest of this repo's `/reference/*` container convention rather than the live `p-4 pb-8` exactly).

## SearchProductCard
- No rating stars, no wishlist heart, no badge overlay, no "Add to bag" button — visually much simpler than the category page's `ProductGridCard`. Confirmed by DOM inspection of the live card (see tree above), not assumption.
- Structure: fixed `160×160` image (all source packshots are pre-cropped to a square canvas by Caudalie's imgix params, so no aspect-ratio distortion), title `p` with `min-h-[4.5rem]` so cards with 1–3 line titles stay aligned, then a full-width `bg-gray-100` price band.
- **Eyebrow variant**: the "Bestsellers" fallback cards have an extra brand/collection line (`Vinoperfect`, `Premier Cru`, etc.) above the title — absent on normal query-match cards, where only the product name shows. Modeled as an optional `eyebrow` field on `SearchProduct` / prop on `SearchProductCard` rather than a second component, since the two are otherwise pixel-identical.

## Categories pills
- Real content from the live `q=serum` page: `Serums, Serums, Resveratrol-Lift, Resveratrol-Lift, Face, All products, All products, Face, Gift Ideas, Gift Ideas`. Kept exactly as observed (including the repeats) rather than de-duplicated — this looks like a live-site quirk (each matching product contributes its own category tags without de-duping), but the brief calls for real content, not a corrected version of it.
- Style: `rounded` (not pill-shaped) `bg-primary text-white` tag, `ul.flex.flex-wrap.gap-2`.

## Empty / no-results state
- Captured from `?q=zzzznonexistentproductxyz`: heading becomes `No results`, the categories sidebar block is empty, and a `Bestsellers` grid of 6 real products renders instead of "your query" matches.
- Bestseller sample data (brand eyebrow + product + price, real content from the live fallback):

| Brand | Product | Price |
|---|---|---|
| Vinoperfect | Dark Spot Brightening Serum Vitamin C Alternative - 30ml | €53.00 |
| Resveratrol-Lift | Firming Cashmere Cream | €51.00 |
| Vinopure | Blemish Control Salicylic Serum | €34.00 |
| Premier Cru | The Eye Cream | €49.00 |
| Premier Cru | The Cream | €92.00 |
| Resveratrol-Lift | Instant Firming Retinol Alternative Serum | €54.00 |

## Query-match sample data (10 results for `q=serum`, real content)
| # | Title | Price | Image |
|---|---|---|---|
| 1 | Dark Spot Brightening Serum & SPF50+ Cream Duo | €53.00 | `vinoperfect-duo.jpg` (reused from category) |
| 2 | The Serum | €92.00 | `premier-cru-serum.jpg` (reused) |
| 3 | Hyaluronic Serum | €31.00 | `vinohydra-serum.jpg` (reused) |
| 4 | Instant Firming Serum & Refill Duo | €100.00 | `resveratrol-lift-duo.jpg` (reused) |
| 5 | Instant Firming Serum - Refill | €46.00 | `resveratrol-lift-refill.jpg` (reused) |
| 6 | Blemish Control Salicylic Serum | €34.00 | `vinopure-serum.jpg` (reused) |
| 7 | Dark Spot Brightening Serum Vitamin C Alternative - Jumbo | €74.00 | `vinoperfect-jumbo.jpg` (reused) |
| 8 | Dark Spot Brightening Serum Vitamin C Alternative - 30ml | €53.00 | `vinoperfect-30ml.jpg` (reused) |
| 9 | Instant Firming Retinol Alternative Serum | €54.00 | `resveratrol-lift-serum.jpg` (reused) |
| 10 | Pore Minimising Instant Detox Mask | €27.00 | `search/pore-minimising-detox-mask.jpg` (new) |

9 of 10 products already existed as downloaded assets from the category page (same catalog items, confirmed by matching price). Only the mask (not a serum-category item, but a genuine `q=serum` text match) needed a new image. The 4 new images needed across both states (`pore-minimising-detox-mask`, `resveratrol-lift-cashmere-cream`, `premier-cru-eye-cream`, `premier-cru-the-cream`) were added to `scripts/download-reference-assets.mjs` under a new "Search results" section and downloaded into `public/images/reference/search/`.

## Responsive behavior
- Mobile/tablet (`< lg`): sidebar block and grid both render full-width and stacked (result summary centered, categories/grid below); grid is `grid-cols-2` under `md`, `md:grid-cols-3` at `md` and up.
- Desktop (`≥ lg`, Tailwind's `1024px`): `lg:grid lg:grid-cols-3` puts the sidebar in column 1 and the product grid (`lg:col-span-2`) alongside it — confirmed via computed styles on the live page.
- Note: browser automation in this environment couldn't be resized below ~955px CSS width (window has a platform-enforced minimum), so the `< md` (real phone-width) layout was not visually screenshotted live. The mobile grid classes (`grid-cols-2`) are taken directly from the live page's own Tailwind markup (inspected via computed styles at 955px, which is itself sub-`lg`), not guessed — only the very narrow phone rendering is unverified by screenshot.

## Requirements checklist
1. Did not modify `src/app/page.tsx`, `/reference/category`, `/reference/pdp`, or `/reference/cart`.
2. New route at `src/app/reference/search/page.tsx`; new components under `src/components/reference/search/`.
3. Added a new `SearchProduct` interface to `src/types/content.ts` (additive only — existing `Product` and other interfaces untouched).
4. All product `href`s are `"#"` placeholders, matching the existing `/reference/*` convention.
5. Tailwind utility classes only, using existing brand tokens (`text-primary`, `bg-primary`, `bg-gray-100`, etc.) — no new colors introduced.
6. `npm run check` (lint + typecheck + build) passes.
