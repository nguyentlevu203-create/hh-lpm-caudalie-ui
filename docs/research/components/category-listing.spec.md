# Category / Listing Page Specification

## Overview
- **Source page:** `https://en.caudalie.com/c/all-products/face/serums.html` (representative of all `/c/all-products/{face,body,needs,collections}/*.html` sub-categories).
- **Target route:** `src/app/reference/category/page.tsx`
- **Target components:** `src/components/reference/category/{CategoryBreadcrumb,CategoryHeading,ProductFilterDrawer,ProductGrid,ProductGridCard}.tsx`
- **Reused shared chrome:** `Header` and `Footer` (identical across the live site's category pages, no changes made to those files).
- **Interaction model:** "Filter" button opens a right-side slide-in drawer (overlay + backdrop) containing 8 collapsed accordion filter groups; each group toggles open/closed on click. No live filtering logic — this is a UI reference, so the drawer is presentational/interactive shell only.

## Layout, top to bottom
1. **Breadcrumb** — `Home > All products > Face > Serums`, `text-sm text-muted-foreground`, `>` (ChevronRight) separators, last crumb bold/primary-colored and not a link.
2. **Heading block** — centered `h1` title ("Serums"), `text-3xl md:text-4xl font-normal text-primary`, followed by a short paragraph (`max-w-2xl`, centered, muted) explaining the category's use-case.
3. **Toolbar row** — right-aligned "Filter" pill button (outlined, rounded-full, `SlidersHorizontal` icon from `lucide-react`).
4. **Product grid** — responsive grid: 2 columns (mobile) → 3 (`md`) → 4 (`lg`), `gap-x-4 gap-y-10`. Each cell renders `ProductGridCard`.

## ProductFilterDrawer
- Trigger: pill button, `border border-primary/30 rounded-full px-5 py-2.5`.
- Drawer: `fixed inset-y-0 right-0`, slides in from the right (`translate-x-full` → `translate-x-0`), `w-[88%] max-w-sm`, white background, backdrop `bg-black/30` closes on click.
- Header row: "Filters" title (`text-2xl`) + close `X` button.
- Filter groups (in this order, all collapsed by default): Price, Ingredients, Collection, Formulas, Product type, Formats, Skin concern, Skin type. Each is a button row with a label + `ChevronDown` that rotates 180° when expanded; expanding reveals a placeholder line (no real filter inputs — out of scope for this static reference).
- No "confirm"/"apply" CTA was observed at the bottom of the live drawer — omitted here too.

## ProductGridCard (grid variant of the shared `ProductCard`)
Visually identical to `src/components/ProductCard.tsx` (badge, wishlist heart, image, title/subtitle, 5-star rating row, price + optional compare-at price, "Add to bag" button) but **not** fixed to a 265px width — it fills its CSS grid cell instead, since the listing page uses a wrapping grid rather than the homepage's horizontal-scroll row. Built as a separate component (rather than modifying the shared `ProductCard`) to avoid any risk of regressing the homepage's "Your Selection" rail.

## Sample data — real content from the live category page (12 products)
| # | Badge | Title / Subtitle | Rating (est.) | Reviews | Price | Image |
|---|---|---|---|---|---|---|
| 1 | Limited edition | Vinoperfect — Dark Spot Brightening Serum & SPF50+ Cream Duo | 4.7 | 1,562 | €53.00 | `vinoperfect-duo.jpg` |
| 2 | Special offer | Vinoperfect — Dark Spot Brightening Serum Vitamin C Alternative - Jumbo | 4.8 | 5,257 | €74.00 | `vinoperfect-jumbo.jpg` |
| 3 | Bestseller | Vinoperfect — Dark Spot Brightening Serum Vitamin C Alternative - 30ml | 4.8 | 5,257 | €53.00 | `vinoperfect-30ml.jpg` |
| 4 | Bestseller | Vinoperfect — Radiance and Anti-dark spot Routine | 4.7 | 786 | €137.00 | `vinoperfect-routine.jpg` |
| 5 | New | Vinopure — Blemish Control Salicylic Serum | 4.6 | 1,759 | €34.00 | `vinopure-serum.jpg` |
| 6 | Bestseller | Resveratrol-Lift — Instant Firming Retinol Alternative Serum | 4.7 | 2,188 | €54.00 | `resveratrol-lift-serum.jpg` |
| 7 | New | Resveratrol-Lift — Instant Firming Serum - Refill | 4.7 | 1,260 | €46.00 | `resveratrol-lift-refill.jpg` |
| 8 | New | Premier Cru — The Serum | 4.8 | 566 | €92.00 | `premier-cru-serum.jpg` |
| 9 | Bestseller | VinoHydra — Hyaluronic Serum | 4.7 | 638 | €31.00 | `vinohydra-serum.jpg` |
| 10 | Limited edition | Vinopure — Global Anti-blemish Routine | 4.7 | 2,220 | €78.00 | `vinopure-routine.jpg` |
| 11 | New | Resveratrol-Lift — Instant Firming Serum & Refill Duo | 4.8 | 1,207 | €100.00 | `resveratrol-lift-duo.jpg` |
| 12 | New | Premier Cru — Global Anti-Ageing Routine | 4.8 | 2,371 | €233.00 | `premier-cru-routine.jpg` |

Star ratings were not exposed as raw numbers on the live page (only filled/empty star icons + review counts were visible), so values above are visual estimates rounded to one decimal — treat as approximate, not authoritative.

Images downloaded via `scripts/download-reference-assets.mjs` into `public/images/reference/category/`.

## Requirements checklist
1. Do not modify `src/app/page.tsx` or any homepage-only section component.
2. New route lives at `src/app/reference/category/page.tsx`; new components under `src/components/reference/category/`.
3. Reuse `Product` type from `src/types/content.ts`; reuse `Header`/`Footer` from `src/components/`.
4. All product `href`s are `"#"` placeholders (matches existing homepage convention) until the PDP reference route exists.
5. Tailwind utility classes only, using existing brand tokens from `src/app/globals.css` (`text-primary`, `bg-brand-cream`, etc.) — no new colors introduced.
6. `npm run check` (lint + typecheck + build) must pass.
