# Diagnosis Hub ("1 issue, 1 solution") Specification

## Overview
- **Source page:** `https://en.caudalie.com/find-your-regimen/find-your-regimen` — reached from the "Needs" nav entry. This is the "1 issue, 1 solution" concern-matching hub, a static landing grid — **not** the "Scan Your Skin" AI diagnosis app (`/customer/account/...`), which requires login and was explicitly out of scope.
- **Target route:** `src/app/reference/diagnosis/page.tsx`
- **Target components:** `src/components/reference/diagnosis/{DiagnosisView,DiagnosisIntro,ConcernGrid,ConcernCard,data}.{tsx,ts}`
- **Reused shared chrome:** `Header`/`Footer` (unchanged), and `PermanentBenefits` (`src/components/PermanentBenefits.tsx`, previously only used on `/`) — the live page renders the identical "Your permanent benefits" icon bar between the concern grid and the footer, so it was reused rather than duplicated.
- **New downloaded assets:** 10 product images added to `scripts/download-reference-assets.mjs` under a new `diagnosis/` section and fetched into `public/images/reference/diagnosis/`.

## Live site structure, verified via Chrome DevTools + computed styles
```
h1  "1 issue, 1 solution"                (38px, weight 400, centered, black)
p   "Offer your skin targeted solutions for each of your themes..."  (16px, centered)

<10 concern cards, 2-column layout>
  each card: colored background, split into
    - product image (left ~40-50%, real packshot photography)
    - text panel (right): italic eyebrow (collection name) → bold heading →
      body copy → "Shop now" button

section "Your permanent benefits" (dark purple, 4-up icon row) — shared PermanentBenefits
Footer
```
- Confirmed via `getComputedStyle` that every one of the 10 "Shop now" buttons sits inside a card with its own solid background color, and every card has a real product photo — the pale cards (Resveratrol-Lift, Eaux Fraîches, Vinopure) still have an image, it's just low-contrast against the light background in a screenshot.
- A "Let's be email friends" newsletter modal appears on load; it's a generic popup unrelated to this page's content and was dismissed, not cloned.

## Card content, colors, and the "muted" state — captured via `getComputedStyle`
All ten cards, in on-page order, with hex colors read directly from the live DOM (`backgroundColor` walked up from each "Shop now" button to its card ancestor, plus each heading/button `color`):

| # | Eyebrow | Card bg | Heading color | Button bg | Notes |
|---|---|---|---|---|---|
| 1 | Premier Cru | `#2D1946` | `#FFFFFF` | `#FFFFFF` (dark text) | dark card, white text |
| 2 | Resveratrol-Lift | `#F9F0F1` | `#0040A8` | `#0040A8` | |
| 3 | Vinoperfect | `#E2E7F7` | `#3B3E3D` | `#1D358C` | heading ≠ button color on the live site (verified, not a copy error) |
| 4 | VinoHydra | `#FAD2DB` | `#F5A2B5` | `#F5A2B5` | **muted**: heading + button both desaturated to the same washed-out tone, unlike every other card |
| 5 | Vinoclean | `#D5ECE0` | `#005056` | `#005056` | |
| 6 | Vinopure | `#F6F8F7` | `#A5BDB1` | `#A5BDB1` | **muted**, same pattern as VinoHydra |
| 7 | Vinosculpt | `#4A3650` | `#FFFFFF` | `#F2F2F2` (dark text) | dark card, white text |
| 8 | Suncare | `#FAE25F` | `#1D358C` | `#1D358C` | |
| 9 | Beauty Elixir | `#EDCBDC` | `#3B3E3D` | `#3B3E3D` | |
| 10 | Eaux Fraîches | `#F4F3F1` | `#5E1D48` | `#5E1D48` | |

- Body copy color on every light card is a consistent dark charcoal `#3B3E3D`; on the two dark cards (Premier Cru, Vinosculpt) it's white — reproduced via the `onDark` flag in `data.ts`.
- The muted VinoHydra/Vinopure treatment reads as a soft-disabled/lower-priority state (their body copy stays full-strength dark; only the heading + CTA are washed out) and is reproduced with a `muted` flag purely for the color values already listed above (no separate disabled interaction — the buttons are still real links, matching the live page, which never disables the `<a>` itself either).
- Eyebrow color is assumed to match `headingColor` (confirmed only for Premier Cru, where both were sampled as white) — not independently re-verified for every light card, since the italic eyebrow and heading read as the same color family in every screenshot.
- Button: `border-radius: 6px`, `padding: 0 20px`, `font-size: 16px` (all read via computed style off a live "Shop now" link).
- All 10 product photos were captured at their real `assets.caudalie.com` CDN URLs (via `img.currentSrc`) and downloaded locally rather than hot-linked.

## Layout
- Intro block: centered, `max-w-2xl` heading + paragraph, matching the live page's centered `text-align: center` on both `h1` and the intro paragraph.
- Grid: `grid-cols-1 md:grid-cols-2` with a `gap-6` — single column on mobile/tablet (each card's internal image|text split stays side-by-side, matching the live site's own behavior of never stacking image above text even on narrow viewports), two columns from `md:` up, matching the live desktop layout exactly.
- Each `ConcernCard`: `flex` row, image at `w-1/2` (`sm:w-2/5`) using `next/image` `fill` with `aspect-[722/806]` (the real packshot aspect ratio), text panel at the remaining width, centered content, generous vertical padding.
- Whole page wrapped at `max-w-[1280px]`, matching `/reference/search`'s container convention.

## Requirements checklist
1. Did not modify `src/app/page.tsx` or any other previously completed `/reference/*` route.
2. New route at `src/app/reference/diagnosis/page.tsx`; new components under `src/components/reference/diagnosis/`.
3. Cloned patterns: heading/intro, 10 colored concern cards (image + eyebrow + heading + body + CTA), the shared "Your permanent benefits" CTA band, and responsive single-column-to-two-column grid behavior.
4. No "Scan Your Skin" AI diagnosis flow cloned — that lives behind customer login and was explicitly out of scope per this task.
5. `npm run check` (lint + typecheck + build) passes.
