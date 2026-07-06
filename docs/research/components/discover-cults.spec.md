# DiscoverCults Specification

## Overview
- **Target file:** `src/components/DiscoverCults.tsx`
- **Interaction model:** static, horizontally-scrollable image row.

## Layout
- Two-column layout at desktop (`md:flex-row`, stacks on mobile): left column is a text panel (roughly 50% width), right side is a horizontally-scrolling row of product photos.
- Left column: small heading "Discover our cults" with a thin underline/border beneath it (`border-b border-black`, heading `font-size: 16px` visually reads as a label/eyebrow, keep it modest — `text-base` with the underline as the primary visual signal), then below it a large pull-quote: `"Powered by the grape. Patented, highly effective, natural formulas."` — large serif-free display text, `font-size` large (~text-3xl/text-4xl), `font-weight: 400`, black, then a "Shop now" button below (outlined style matching other sections: `border border-black/30`, `rounded-md`, `padding: 12px 15px`, white background, `color: #2d1946`).
- Right side: horizontally-scrolling row (`flex gap-4 overflow-x-auto`) of product photos, portrait aspect, each `flex-shrink-0 w-[300px]` roughly:
  1. `/images/caudalie/cult-product-vinoperfect.png`
  2. `/images/caudalie/cult-product-vinopure.jpg`
  3. `/images/caudalie/cult-product-premier-cru.png`
  4. `/images/caudalie/cult-product-resveratrol-lift.png`
  5. `/images/caudalie/cult-product-beaute.png`

## Requirements
1. Plain function component (no interactivity needed) — can be a server component.
2. Use `next/image` for all 5 images (already downloaded to `public/images/caudalie/`).
3. Tailwind utility classes only.
4. Export default `DiscoverCults`, no required props.
5. Do NOT edit `src/app/page.tsx` or other section files.
6. Verify with `npx tsc --noEmit` before finishing.

Report back concisely: what you built and typecheck status.
