# BrandValues Specification

## Overview
- **Target file:** `src/components/BrandValues.tsx`
- **Interaction model:** static content grid, no interactivity.

## Layout
- Header row: heading "Brand values" (left, `text-2xl font-normal text-black`) + "Discover" button (right-aligned, outlined style: `border border-black/30`, `rounded-md`, `padding: 12px 24px`, `bg-white`, `text-[#2d1946]`).
- Below: 4-column grid at desktop (`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`), each column is a stat tile with alternating background (`bg-white` / `bg-[#f4f3f1]` alternating), generous padding (`p-8` to `p-12`), centered content, min-height tall (`min-h-[400px]`) — each shows an image centered:
  1. Image `/images/caudalie/brand-value-natural-origin.jpg` — represents ">95% NATURAL-ORIGIN INGREDIENTS" (circular badge motif in the source image)
  2. Image `/images/caudalie/brand-value-zero-percent.jpg` — represents "0% Parabens, phenoxyethanol, mineral oils, PEG, silicones, sodium laureth sulfate, animal ingredients."
  3. Image `/images/caudalie/brand-value-1-percent-planet.jpg` — represents "1% FOR THE PLANET MEMBER"
  4. Image `/images/caudalie/brand-value-ocean-plastic.jpg` — represents "100% OCEAN PLASTIC COLLECT"
- Each image already contains its own text/badge design baked in (these are pre-designed graphic tiles from the source site, not something to re-type as separate text) — render each as a `next/image` filling its column, `object-contain`, roughly square aspect ratio (source images are 623x623).

## Requirements
1. Plain function component (server component fine).
2. Use `next/image` for the 4 images listed (already downloaded to `public/images/caudalie/`).
3. Tailwind utility classes only, alternating tile backgrounds using brand cream token `bg-secondary`/`bg-muted` where appropriate.
4. Export default `BrandValues`, no required props.
5. Do NOT edit `src/app/page.tsx` or other section files.
6. Verify with `npx tsc --noEmit` before finishing.

Report back concisely: what you built and typecheck status.
