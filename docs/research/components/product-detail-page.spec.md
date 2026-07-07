# Product Detail Page (PDP) Specification

## Overview
- **Source page:** `https://en.caudalie.com/p/432C/vinoperfect-radiance-serum-complexion-correcting-432c.html` (Vinoperfect Dark Spot Brightening Serum, 30ml).
- **Target route:** `src/app/reference/pdp/page.tsx`
- **Target components:** `src/components/reference/pdp/{ProductGallery,ProductBuyBox,ProductDescription,ProductAccordions,TrustBadges,ProductReviews,RelatedProducts}.tsx`
- **Reused:** `Header`, `Footer` (shared chrome), `CategoryBreadcrumb` (from the category template, generic enough to reuse as-is), `ProductCard` (homepage's shared card, used unmodified for the "You may also like" row).

## Layout, top to bottom
1. **Breadcrumb** — `Home > All products > Face > Serums > <product name>`, last crumb is the full product title (not a link).
2. **Gallery + Buy box** — two-column grid on `lg:` (`grid-cols-2`), stacked on mobile.
3. **Description block** — attribute list + "What is it?" copy + expandable claims.
4. **Accordions** — Our ingredients / Application tips / Frequently asked questions.
5. **Trust badges** — two circular brand-value badges, centered.
6. **Reviews** — rating summary + distribution bars + "Write a review" box (left column) and review cards (right column), anchor id `reviews` (linked from the "Leave a review" text under the title).
7. **Related products** — "You may also like", horizontal-scroll row of the existing `ProductCard`.

## ProductGallery (client — needs active-thumbnail state)
- Left thumbnail rail (desktop, hidden below `sm`) + main square image, `aspect-square`.
- Badge ("Bestseller") top-left on the main image; wishlist heart top-right; prev/next chevron buttons overlaid on the main image.
- 5 thumbnails: bottle packshot, a "clinical results" image styled with a `Play` icon overlay (stand-in for the live site's video thumbnail — no real video asset was downloaded, this is a static-image approximation), dark-spot-types image, before/after image, ingredients close-up.
- Clicking any thumbnail swaps the main image (including the video-styled one — it just becomes the active still image, no playback).

## ProductBuyBox (client — variant + purchase-type state)
- Title "Vinoperfect" + subtitle that updates its size suffix ("30ml"/"50ml") based on the selected variant pill.
- "Leave a review" anchor link scrolls to `#reviews`.
- Price, loyalty-points pill ("+40 x 2 = 80 loyalty points").
- Size pills: 30mL (€53.00) / 50mL (€74.00) — selecting one updates price everywhere in the box.
- Purchase-type radios: "One-time purchase" vs "Auto-replenishment every 3 months" (10% off, computed from the selected variant's price) — matches the live page's copy "Save 10% + free shipping".
- Sticky-style "Add to bag | €price" button (full width, not actually `position: sticky` in this reference — the live site's bar becomes sticky only once you scroll past it, which wasn't required for this static reference).
- "Estimated delivery: 10/7 - 13/7" bar and a gift-with-purchase banner ("Two free must-haves when you spend €69, code: SUMMER") with a `Gift` icon.

## ProductDescription (client — "See more" toggle)
- Attribute definition list: Skin type / Need / Texture / Key ingredients / Use.
- "What is it?" paragraph — **paraphrased**, not copied verbatim from the live site's marketing copy.
- Expandable "Clinically proven results" section (bullet list + disclaimer footnote) — copy also paraphrased/approximated, since the live site's exact bullet list below the fold wasn't fully captured.

## ProductAccordions (client — multi-open accordion)
- Three collapsed-by-default sections with a `+` icon (rotates 45° to form an `×` when open), matching the live site's grey-background accordion rows. Content is a placeholder line per section (no real ingredient list/FAQ copy was extracted for this pass).

## TrustBadges
- Reuses two existing homepage assets (`brand-value-natural-origin.jpg`, `brand-value-ocean-plastic.jpg`) since the PDP shows the same "98% natural-origin" / "100% ocean plastic collect" badges as the homepage's Brand Values section.

## ProductReviews
- Rating summary: `4.8` big number, 5-star row, `(5,257)` count, 5→1 star distribution bars with the live page's real percentages (84/13/2/1/1%).
- "Write a review" box: empty 5-star input (decorative only), "1 review = +5 loyalty points" note, CTA button.
- **Review cards use original placeholder copy written for this reference, not the live site's actual customer reviews** — those are third-party user-generated content and out of scope to reproduce. Structure (avatar initial circle, name, star rating, relative date, title, body) matches the live layout.
- "See more reviews" button (no pagination logic — static reference).
- **Omitted from this pass:** the live page's "Reviews with Images" masonry gallery — lower priority for a UI reference and would require downloading many more customer-submitted photos; can be added later if needed.

## RelatedProducts
- Reuses the shared `ProductCard` component and 4 of the homepage's existing sample products (Eau des Vignes, Caudalie Essentials, Ange des Vignes, Grape Water) plus one new one (Rose de Vigne fragrance, image newly downloaded) to match the live page's 5-item "You may also like" row.

## Assets
Downloaded via `scripts/download-reference-assets.mjs` (extended) into `public/images/reference/pdp/`: `vinoperfect-clinical.jpg`, `vinoperfect-dark-spots.jpg`, `vinoperfect-before-after.jpg`, `vinoperfect-ingredients.jpg`, `rose-de-vigne-packshot.jpg`. The gallery's main packshot reuses `public/images/reference/category/vinoperfect-30ml.jpg` (already downloaded for the category template) rather than re-fetching a duplicate.

## Requirements checklist
1. Do not modify `src/app/page.tsx` or any homepage-only section component.
2. New route at `src/app/reference/pdp/page.tsx`; new components under `src/components/reference/pdp/`.
3. Reused `CategoryBreadcrumb` and `ProductCard` are consumed as-is (no edits to those files).
4. Tailwind utility classes only, existing brand tokens — no new colors.
5. All "You may also like" `href`s are `"#"` placeholders (same convention as the category template) until a real PDP-to-PDP link target exists.
6. `npm run check` (lint + typecheck + build) must pass.
