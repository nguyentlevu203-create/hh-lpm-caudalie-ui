# ExperienceCards Specification ("The Caudalie Experience")

## Overview
- **Target file:** `src/components/ExperienceCards.tsx`
- **Interaction model:** static content, horizontally-scrollable card row (native overflow-x, no JS carousel library, no auto-play).

## Layout
- Section heading: "The Caudalie Experience" — visually large section heading (`text-2xl md:text-3xl font-normal text-black`), left-aligned, same treatment as "Your Selection" heading.
- Below heading: horizontally-scrolling row of 5 cards (`flex gap-4 overflow-x-auto`), each card `flex-shrink-0`, roughly `w-[280px]` to `w-[320px]`, portrait image on top (aspect ~4:5), then below the image: title (`font-size: 16px`, `font-weight: 300`, black), description (`font-size: 16px`, `font-weight: 300`, black, 1-2 lines), then an outlined button (border `1px solid rgba(0,0,0,0.3)`, `border-radius: 6px`, `padding: 12px 15px`, background white, `color: #2d1946`, same visual style as ProductCard's "Add to bag" button but sized to content width, not full-width).

## Card content (real copy from the site)
1. Image `/images/caudalie/experience-powered-by-grape.png` — Title "Powered by the Grape" — Description "Born in Bordeaux at the heart of the vines, patented and natural formulas" — CTA "Shop now"
2. Image `/images/caudalie/experience-skin-diagnosis.png` — Title "Skin diagnosis" — Description "Discover your personalized skincare routine." — CTA "Scan my skin"
3. Image `/images/caudalie/experience-earn-loyalty-points.jpg` — Title "Earn loyalty points" — Description "Earn points with every purchase and enjoy free products!" — CTA "Shop now"
4. Image `/images/caudalie/experience-welcome-offer.png` — Title "Welcome offer" — Description "Welcome offer: 15% off sitewide. Code: WELCOME15" — CTA "Shop now"
5. Image `/images/caudalie/experience-find-a-store.png` — Title "Where our boutiques are" (title was cropped in capture, use this as best-guess — reasonable for a "find a store" card) — Description "See where our boutiques are near you" — CTA "Shop now"

## Requirements
1. Plain function component (no interactivity needed) — can be a server component.
2. Use `next/image` for the 5 images listed (already downloaded to `public/images/caudalie/`).
3. Tailwind utility classes only, consistent with project conventions.
4. Export default `ExperienceCards`, no required props.
5. Do NOT edit `src/app/page.tsx` or other section files.
6. Verify with `npx tsc --noEmit` before finishing (zero errors related to your new file).

Report back concisely: what you built and typecheck status.
