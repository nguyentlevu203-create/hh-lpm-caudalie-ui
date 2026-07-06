# BeautyFromVine Specification

## Overview
- **Target file:** `src/components/BeautyFromVine.tsx`
- **Interaction model:** static full-bleed image/text banner, no interactivity.

## Layout
- Full-bleed background image: `/images/caudalie/beauty-from-the-vine.jpg` (grapes on the vine, slightly blurred/darkened for text legibility) — use `next/image` `fill` + `object-cover`, container `relative min-h-[400px] md:min-h-[500px] w-full flex items-center justify-center`. Add a subtle dark overlay (`bg-black/20` absolute inset-0) between the image and text for contrast if needed.
- Centered content (text-align center, white text, max-width ~600px):
  - Heading: "Beauty from the vine" — `font-size: 36px`, `font-weight: 300` (light — use `font-light`), `color: #fff`.
  - Paragraph: "It all began in Bordeaux, in the heart of the vines at Château Smith Haut Lafitte. Since 1995, Caudalie has concentrated all the exceptional powers of the vine and grapes in patented formulas, for highly effective, natural and more sustainable skincare products." — `font-size: 16px`, `color: #fff`, centered.
  - CTA button: "Discover our story" — white/light button on the dark photo: `bg-white`, `text-[#2d1946]`, `rounded-md`, `padding: 12px 24px`, no border needed (or a subtle one).

## Requirements
1. Plain function component (server component fine).
2. Use `next/image` for `/images/caudalie/beauty-from-the-vine.jpg`.
3. Tailwind utility classes only.
4. Export default `BeautyFromVine`, no required props.
5. Do NOT edit `src/app/page.tsx` or other section files.
6. Verify with `npx tsc --noEmit` before finishing.

Report back concisely: what you built and typecheck status.
