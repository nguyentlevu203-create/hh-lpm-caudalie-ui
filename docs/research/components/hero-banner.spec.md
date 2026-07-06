# HeroBanner Specification

## Overview
- **Target file:** `src/components/HeroBanner.tsx`
- **Interaction model:** responsive layout change — desktop shows 2 promo banners side-by-side in a flex row (no carousel controls); below ~1024px it becomes a single-slide swipeable carousel with 2 dot indicators (click dot to switch slide; swipe/drag not required, just make dots clickable).
- Container: `min-h-[70vh]`, `display: flex`, `padding-bottom: 32px` (`pb-8`), full content-width container (matches page's max-width layout container).

## Content — 2 banner slides
### Slide 1
- Background: light blue gradient/photo background with product bottles image (`public/images/caudalie/hero-offer.png` — downloaded asset, use as `next/image` background or absolutely-positioned image within the slide).
- Eyebrow text: "Until 07/07" — small, `font-size: 16px`, regular weight, black.
- Heading: "Double your loyalty points with every order" — `font-size: 38px`, `font-weight: 400`, `line-height: 48px`, `color: #000`, uses the site's base font family.
- CTA button: "Shop now" — `padding: 12px 30px`, `background-color: rgba(255,255,255,0.7)`, `color: #000`, `border-radius: 6px`, `border: 1px solid rgba(255,255,255,0.7)` (semi-transparent white pill/rounded button over the photo).

### Slide 2
- "Summer freshness" heading, body copy: "A free Grape Water and a Cleansing Oil when you spend €69."
- Same visual treatment as slide 1 (photo background, eyebrow-less or similar, CTA button same style). Use `public/images/caudalie/product-grape-water.jpg` and `public/images/caudalie/product-eau-de-raisin.jpg` as supporting product imagery if a layered composition is wanted, or a simple background color gradient (`from-blue-50 to-blue-100`) if exact photo composition can't be replicated — prioritize layout/typography fidelity over exact photo compositing here.

## Layout
- **Desktop (≥1024px `lg`):** both slides render side by side in a flex row, each taking ~50% width, each with `min-h-[70vh]`, no dot indicators, no carousel behavior — just two static banner halves separated by a thin gap/divider.
- **Below 1024px:** only one slide visible at a time (full width), with 2 small dot indicators centered below the banner (filled dot = active slide, hollow/light dot = inactive). Clicking a dot switches the visible slide instantly (no animation was observed, simple show/hide is fine — or a basic `transition-opacity` if you want a small polish touch, but do not invent a slide-drag animation).

## Requirements
1. Build `src/components/HeroBanner.tsx` as a `"use client"` component (needs state for the mobile dot-carousel).
2. Use `next/image` for `public/images/caudalie/hero-offer.png`, `public/images/caudalie/product-grape-water.jpg`, `public/images/caudalie/product-eau-de-raisin.jpg` (all already downloaded to that path — reference them as `/images/caudalie/<filename>`).
3. Use Tailwind utility classes only, consistent with the rest of this project (see `src/app/globals.css` for brand color tokens: `--color-brand-purple`, etc. — this section mostly uses black/white text over photos, not brand purple).
4. Export a default `HeroBanner` component, no required props.
5. After building, temporarily render `<HeroBanner />` in `src/app/page.tsx` (add below any existing content, don't remove other sections other agents may be adding — just append) so it's visible, then run `npx tsc --noEmit` and `npm run build`, fixing any errors before finishing.

Report back concisely: what you built, build/typecheck status, and any deviations from spec.
