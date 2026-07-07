# Offers Hub ("Exclusive online offers") Specification

## Overview
- **Source page:** `https://en.caudalie.com/gift-offers/all-offers` — reached from the "Gifts & offers" nav entry. Page title: "Offers & Exclusive Savings | CAUDALIE®".
- **Target route:** `src/app/reference/offers/page.tsx`
- **Target components:** `src/components/reference/offers/{OffersView,OffersIntro,OfferGrid,OfferCard,GiftDiscoveryTiles,data}.{tsx,ts}`
- **Reused shared chrome:** `Header`/`Footer` (unchanged) and `PermanentBenefits` (already reused by `/reference/diagnosis`) — the live page renders the identical "Your permanent benefits" bar between the offers content and the footer.
- **New downloaded assets:** 9 campaign/tile images added to `scripts/download-reference-assets.mjs` under a new `offers/` section (additive only — no existing entries touched) and fetched into `public/images/reference/offers/`.

## Live site structure, verified via Chrome DevTools + computed styles
```
h1  "Exclusive online offers"                (centered)
p   "Discover our exclusive online offers and benefits"

<6 campaign cards, 2-column grid, each:>
  image (left ~40-50%, real packshot/lifestyle photo)
  text panel (right): heading → body copy → optional "Code: XXXX" line → CTA button
  optional "Terms & conditions" accordion row directly below the card (own column width, not full-bleed)

h2  "Looking for the perfect gift?" + intro paragraph
<3 image+caption tiles: eGift Card / Best-sellers / Limited Editions>

section "Your permanent benefits" — shared PermanentBenefits
Footer
```
- A "Let's be email friends" newsletter modal appears on load — generic, unrelated to this page, dismissed and not cloned (same as observed on the diagnosis hub).

## Card-by-card content, captured live (in on-page order)
| # | Heading | Code | Terms & conditions | Notes |
|---|---|---|---|---|
| 1 | Double your points | — | ✅ (3-point fine print) | points-doubling promo, no product photo swap |
| 2 | Summer freshness | `SUMMER` | ✅ | free-gift-with-purchase |
| 3 | Long-lasting Tan | `SUN49` | ✅ | **only card** with a small white gift-box icon overlaid top-right on the image (`hasGiftBadge`) — verified by zooming the live image; the other 5 cards have no such overlay, so this is modeled as a per-card flag, not a systemic treatment |
| 4 | Limited edition gift sets | — | ❌ (no accordion row on the live page) | |
| 5 | Take advantage of the MYCAUDALIE loyalty programme | — | ❌ | body is a 4-line feature list (`Register your purchases` / `Earn points` / `Choose your gifts!` / `100 points = 1 FREE full-size product`), not prose |
| 6 | Welcome offer | — | ✅ | CTA reads "Sign up" (not "Shop now") |

- All 6 cards share the **same** neutral card background — confirmed via `getComputedStyle` on every "Shop now"/"Sign up" ancestor: `rgb(244, 243, 241)` (`#F4F3F1`). Unlike the diagnosis hub's rainbow of card colors, this page is deliberately monochrome; the campaigns differentiate through photography and copy only.
- CTA button: solid `bg-primary` (`#2D1946`) / white text on every card — also confirmed via computed style, matching this repo's existing `bg-primary`/`text-primary-foreground` tokens exactly, so no new color constants were needed.
- All fine-print "Terms & conditions" copy was transcribed verbatim from the expanded live accordion (not paraphrased) into `data.ts`.
- The `ChevronDown` rotate-on-expand accordion pattern mirrors the one already used in `CartDrawer.tsx`'s "Order summary" toggle, kept for visual/interaction consistency across the reference app.

## "Looking for the perfect gift?" discovery row
Three simple image+caption tiles (no text panel, no CTA button — the whole tile is the link): **eGift Card**, **Best-sellers**, **Limited Editions**. Captured as a separate `GiftDiscoveryTiles` component/section since it's visually and structurally distinct from the campaign-card grid above it (no background color, no body copy, no accordion).

## Scope decisions (per task instruction to avoid redundant cloning)
- The live page also has a generic **"You may also like"** cross-sell product carousel below the offer grid (fragrance bottles, lip balm, grape water — each with a `New`/`Limited edition` pill badge, heart/wishlist icon, price, and "Add to bag"). This was **not** cloned:
  1. It's a shared cross-sell pattern, not specific to the offers hub's identity — the same card shape (badge pill + heart + price + "Add to bag") already exists as `ProductGridCard` in `src/components/reference/category/`.
  2. The live carousel's actual product images resolve through a signed/cookie-bearing CDN path that the inspection tooling explicitly declined to reveal (`[BLOCKED: Cookie/query string data]`) — cloning it would have meant either fabricating image URLs or mismatching real product names against unrelated stand-in packshots already in this repo, neither of which meets this project's "real content" standard.
  - The "offer badges" requirement from the task is instead satisfied by the observed **gift-box badge** on the "Long-lasting Tan" campaign card (`hasGiftBadge`), which is a genuine offers-hub-specific pattern rather than a generic product-badge pattern already covered elsewhere.

## Layout
- Intro block: centered, `max-w-2xl` heading + paragraph — same convention as `DiagnosisIntro`.
- Grid: `grid-cols-1 md:grid-cols-2` with `gap-x-6 gap-y-8` — single column on mobile/tablet, two columns from `md:` up.
- Each `OfferCard`: `flex` row, image at `w-1/2` (`sm:w-2/5`, `aspect-square` matching the real 1140×1140/1080×1080 source crops), text panel centered in the remaining width; the optional terms accordion sits as a full-width block directly beneath that card's row (its own `<button>` toggling local `useState`, `"use client"`).
- Discovery tiles: `grid-cols-1 sm:grid-cols-3`, each tile a `next/image` `aspect-video` photo with a centered caption underneath, no card chrome.
- Whole page wrapped at `max-w-[1280px]`, matching `/reference/diagnosis` and `/reference/search`'s container convention.

## Requirements checklist
1. Did not modify `src/app/page.tsx` or any other previously completed `/reference/*` route.
2. New route at `src/app/reference/offers/page.tsx`; new components under `src/components/reference/offers/`.
3. Cloned patterns: offer hub header, 6 promo/campaign cards (image + heading + body + optional code + CTA + optional terms accordion), the observed gift-icon offer badge, the "Looking for the perfect gift?" tile grid, and the shared "Your permanent benefits" CTA band.
4. Representative-only cloning of the repeating card shape (6 real cards captured in full; no invented 7th+ variant) and the generic cross-sell carousel intentionally left out per the scope-decision above.
5. `scripts/download-reference-assets.mjs` was extended additively (new `offers/` section appended; no prior entries changed).
6. `npm run check` (lint + typecheck + build) passes.
