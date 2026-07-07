# Brand Story ("Our story") Specification

## Overview
- **Source page:** `https://en.caudalie.com/about-caudalie/our-story` — reached from the "About Caudalie" nav entry. Page title: "CAUDALIE | Discover the brand story - Caudalie".
- **Target route:** `src/app/reference/brand-story/page.tsx`
- **Target components:** `src/components/reference/brand-story/{BrandStoryView,BrandStoryHero,BrandStoryIntro,BrandStoryTimeline,TimelineEntry,KodaliBlock,QuoteBlock,BrandStoryFootnotes,data}.{tsx,ts}`
- **Reused shared chrome:** `Header`/`Footer` (unchanged) and `PermanentBenefits` (already reused by `/reference/diagnosis` and `/reference/offers`) — the live page renders the identical "Your permanent benefits" bar right before the footer.
- **New downloaded assets:** 9 images (hero + 7 timeline photos + Mathilde's signature) added to `scripts/download-reference-assets.mjs` under a new `brand-story/` section (additive only) and fetched into `public/images/reference/brand-story/`.

## Live site structure, verified via Chrome DevTools + computed styles
```
<full-bleed hero photo, no text overlay>                (Mathilde & Bertrand Thomas in the vines)

h1  "Our story"                                          (centered, 38px)
p   intro paragraph + "Let us tell you the story."

<~18 timeline entries, each:>
  full-bleed photo (real aspect ratio 2578×1200)
  translucent white card (rgba(255,255,255,0.7)) anchored bottom-left or bottom-right,
    containing: large year label (38px) → title (28px) → body copy → optional
    outlined "Find out more" CTA
  (cards alternate sides, but not on a strict every-other-entry basis — verified
   live that some adjacent entries repeat the same side)

  ...interspersed with 2 one-off full-width editorial blocks on a neutral #F4F3F1 background:
    - "[KODALI]" brand-name etymology callout (80px display type + definition text)
    - Mathilde Thomas pull-quote (italic quote + real cursive signature image + "Co-founder of Caudalie")

<small-print footnote block>                             (5 numbered citation lines, centered, muted)

section "Your permanent benefits" — shared PermanentBenefits
Footer
```
- A "Let's be email friends" newsletter modal appears on load — generic, unrelated, dismissed and not cloned (same as every other reference page inspected so far).
- Confirmed via `getComputedStyle`: the timeline card background is exactly `color(srgb 1 1 1 / 0.7)` (white at 70% opacity, no backdrop blur) — reproduced as `bg-white/70`.
- Confirmed the `[KODALI]` block and the quote block share the same `rgb(244, 243, 241)` (`#F4F3F1`) neutral background already used for the offers-hub cards, so no new color constant was needed.
- Confirmed the "Find out more" CTA is an **outlined** button (`border: 2px solid #2D1946`, transparent fill, `#2D1946` text, `border-radius: 6px`) — visually distinct from the solid `bg-primary` CTAs used on the diagnosis/offers hubs, and reproduced with a `hover:bg-primary hover:text-primary-foreground` fill-in-on-hover treatment.
- Mathilde's signature under the quote is a real downloaded raster (`signature_tdv_mathilde.png`), not a font — captured via `img.currentSrc` after finding the image inside the quote block's container (the initial DOM read was blocked by the tool's cookie/query-string redaction, so the image was located directly instead).

## Scope decision: representative subset, not all ~18 entries
Per the task's explicit instruction to avoid cloning excessive long-form text, `TIMELINE_BLOCKS` in `data.ts` includes **8 of the ~18** real timeline entries (1993, 1995, 1997, 2005, 2006, 2013-2023, 2025) plus both one-off blocks — chosen to cover every distinct block variant actually observed on the live page:
- Black & white archival photography (1993, 1995) vs. modern color product/lifestyle photography (1997 onward)
- Card on the left vs. right
- Entries with a "Find out more" CTA (1997, 2025) vs. without (the rest)
- The two special full-width callouts ([KODALI] definition, Mathilde quote)
All copy for the included entries was transcribed verbatim (not paraphrased/shortened) from the live page — only the *number of entries* was trimmed, not the fidelity of the ones included.

## Layout
- Hero: `aspect-[2734/880]` full-bleed `next/image` (`priority`, matching the real crop dimensions), no heading overlay — the "Our story" heading and intro sit in a separate centered text block directly below it, exactly as on the live page.
- Each `TimelineEntry`: `relative aspect-[2578/1200]` full-bleed image, with an `absolute bottom-0` text card sized `w-[85%]` on mobile (full-width-ish stack) narrowing to `sm:w-[45%]` on larger viewports, positioned `left-0` or `right-0` per the entry's `align` field.
- `KodaliBlock` / `QuoteBlock`: simple centered full-width sections on `#F4F3F1`, no image.
- `BrandStoryFootnotes`: centered, `text-xs text-muted-foreground`, matching the live page's small-print citation block.
- Responsive: the translucent card's `w-[85%] sm:w-[45%]` sizing keeps it comfortably readable on mobile (nearly full width, image still visible as a backdrop strip) while matching the live site's roughly-half-width card at desktop widths.

## Requirements checklist
1. Did not modify `src/app/page.tsx` or any other previously completed `/reference/*` route.
2. New route at `src/app/reference/brand-story/page.tsx`; new components under `src/components/reference/brand-story/`.
3. Cloned patterns: full-bleed hero, long-form editorial layout, full-bleed image sections, image/text split (overlaid-card) blocks, the timeline/storytelling structure with alternating alignment, the two value/commitment callout blocks ([KODALI] + founder quote), "Find out more" CTA buttons, and a responsive single-column-first layout.
4. Representative-only cloning of the repeating timeline-entry shape (8 real entries + both special blocks, not all ~18) per the task's explicit instruction to avoid excessive long-form text duplication.
5. `scripts/download-reference-assets.mjs` was extended additively (new `brand-story/` section appended; no prior entries changed).
6. `npm run check` (lint + typecheck + build) passes.
