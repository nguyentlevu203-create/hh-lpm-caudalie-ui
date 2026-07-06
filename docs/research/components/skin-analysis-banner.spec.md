# SkinAnalysisBanner Specification

## Overview
- **Target file:** `src/components/SkinAnalysisBanner.tsx`
- **Interaction model:** same responsive carousel pattern as HeroBanner — this is actually part of the same rotating-banner mechanism on the live site (2 dot indicators observed), but for this clone build it as a **static single full-bleed banner** (no need to duplicate the dual-slide carousel machinery — one slide is enough content-wise; add the 2 dots as a purely decorative/static indicator row if you want visual parity, but they don't need to be functional).

## Layout
- Full-bleed background image: `/images/caudalie/skin-analysis-banner.jpg` (desktop) — use `next/image` with `fill` + `object-cover`, container `relative min-h-[500px] md:min-h-[600px] w-full`.
- Text card overlaid bottom-left on top of the image: white background box, `padding: 24px 32px` roughly, positioned `absolute bottom-8 left-8` (or similar), max-width ~400px.
  - Heading: "Skin Analysis" — `font-size: 24px`, `font-weight: 400`, `color: #000`.
  - Description: "Get a 30-second skin analysis, comparing your selfie to our skin health database of 70,000+ clinically graded images." — `font-size: 16px`, `font-weight: 400`, `color: #000`.
  - CTA button: "Scan my skin" — outlined style matching other sections (`border border-black/30`, `rounded-md`, `padding: 12px 15px`, `bg-white`, `text-[#2d1946]`).
- Below the banner (outside the image, on white background): 2 small decorative dots centered, `gap-2`, filled dark dot + hollow light-grey dot (purely decorative, no click behavior required).

## Requirements
1. Plain function component (server component fine, no real interactivity required).
2. Use `next/image` for `/images/caudalie/skin-analysis-banner.jpg`.
3. Tailwind utility classes only.
4. Export default `SkinAnalysisBanner`, no required props.
5. Do NOT edit `src/app/page.tsx` or other section files.
6. Verify with `npx tsc --noEmit` before finishing.

Report back concisely: what you built and typecheck status.
