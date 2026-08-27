# HH × LPM — Premium Typography Pass

Branch: `hh-lpm-premium-typography`. Scope: font system only — no layout redesign, no brand color changes, no content changes, no `/reference/*` edits, no functional/route/data changes.

## 1. Final font pairing + rationale

| Role | Font | Weights loaded | Where |
|---|---|---|---|
| Display / editorial | **Cormorant Garamond** | 400, 500 (+ 400 italic) | Hero, page H1s, section H2s, quotes, editorial callouts |
| UI / body | **Be Vietnam Pro** (unchanged) | 400, 500, 600, 700 | Nav, buttons, forms, prices, badges, body copy |

Cormorant Garamond was the task's preferred pick, contingent on a live Vietnamese-diacritics check (Section 7). That check passed cleanly (see §4) — heavy stacked diacritics (`ắ`, `ệ`, `ữ`, `ẫ`, `ượt`) render correctly in both upright and italic, with no clipping, no missing glyphs, and no per-character fallback. Lora (the pre-approved fallback) was **not needed**.

Both fonts are loaded via `next/font/google` in `src/lib/hh-fonts.ts`, scoped to the HH subtree only via `.variable` classNames on `HHShell` (never on `<html>`/`<body>`), so `/reference/*` is completely unaffected — confirmed via `npm run check` (build succeeds, includes both `/reference/*` and HH routes) and via network inspection (Caudalie font files still load unchanged for the reference layout).

## 2. Weights loaded (and why each is needed)

- **Be Vietnam Pro**: 400/500/600/700 — unchanged from before this pass. Verified all four are genuinely referenced in the HH component tree (`font-normal`/`font-medium`/`font-semibold`/`font-bold` all have real call sites) before deciding to keep them all.
- **Cormorant Garamond**: 400 (upright) + 500 (upright) + 400 italic — three font files total.
  - The italic face is a **separate `next/font` instance** (`cormorantGaramondItalic`, weight 400 only), not a `style: ["normal", "italic"]` array on the main instance. That would have loaded a cross product of 4 files (400/500 × normal/italic) including an unused 500-italic; splitting it out keeps the total at exactly the 3 faces actually used.
  - Fixed a real defect found during the pass: `.hh-quote` originally applied `font-style: italic` to the upright-only Cormorant Garamond face, which Chrome renders as a synthetic/faux-slanted oblique rather than the font's real italic letterforms. Loading the genuine italic face noticeably improved quality on the brand-story quote block (compare the calligraphic connecting strokes in the real italic vs. a mechanical slant).
  - No 600 weight loaded for either font — nothing in the display scale needed a semibold serif treatment.

## 3. Typography tokens (`src/app/globals.css`)

Real cascading CSS variables, declared on `.font-hh` (not `:root` — see the in-file comment for why):

```
--hh-font-sans
--hh-font-display
--hh-font-display-italic
```

Utility classes (`@layer components`):

```
.hh-display        (font-family only, for decorative one-offs)
.hh-heading-hero    clamp(2.4rem, 6vw, 4.5rem),   weight 500, line-height 1.08
.hh-heading-page    clamp(2.1rem, 3.5vw, 3rem),   weight 500, line-height 1.1
.hh-heading-section clamp(1.75rem, 3vw, 2.5rem),  weight 500, line-height 1.15
.hh-heading-card    clamp(1.25rem, 2vw, 1.5rem),  weight 500, line-height 1.25
.hh-quote           clamp(1.6rem, 3.5vw, 2.75rem), weight 400, italic, line-height 1.25
.hh-body-lg / .hh-body / .hh-caption / .hh-label   (sans, sizes 17/15/13/12px)
```

### A real bug found and fixed along the way

`--hh-font-display` was initially declared inside the existing `@theme inline { ... }` block, matching the file's established pattern for other tokens. That silently broke it: Tailwind v4 inlines `@theme inline` values directly into generated utility classes at build time rather than emitting them as real runtime CSS custom properties, so a hand-written rule doing `var(--hh-font-display)` resolved to nothing and fell back to sans everywhere. Moving the declaration to `:root` didn't fix it either — CSS custom-property inheritance resolves `var()` references at the element where a property is *declared*, not at each inheriting descendant, and `var(--font-hh-cormorant)` (next/font's own variable) only exists on `.font-hh`, never on `:root`/`<html>`. The fix was declaring `--hh-font-display`/`--hh-font-sans`/`--hh-font-display-italic` directly on `.font-hh`, in the same cascade as next/font's real variables, so the reference resolves and the *already-substituted* value is what then inherits down. Verified via `getComputedStyle` in-browser before and after.

## 4. Vietnamese QA results

Tested the exact strings from the task spec, live in-browser, at real component classes/sizes (`.hh-heading-hero`, `.hh-heading-page`, `.hh-heading-section`, `.hh-heading-card`, `.hh-quote`, `.hh-body-lg`) inside the actual `HHShell` scope:

- "Sữa tắm dịu nhẹ chiết xuất Hoa Cam Hữu Cơ"
- "Chăm sóc mái tóc mềm mại và óng mượt"
- "Câu chuyện thương hiệu Le Petit Marseillais"
- "Thành phần có nguồn gốc thiên nhiên"
- "Ưu đãi dành riêng cho thành viên"
- "Dưỡng ẩm, mềm mại và dễ chịu mỗi ngày"

Result: **pass**, no issues found.
- Diacritics not clipped or misaligned, including stacked marks (circumflex+acute `ắ ế`, horn+tilde `ữ`, horn+dot-below `ượt`, dot-below `ệ ị`).
- No missing characters, no per-character fallback rendering.
- Line-height doesn't clip ascending marks even at the largest hero size.
- Genuine italic (post-fix, §2) renders real calligraphic Vietnamese glyphs cleanly, not a distorted slant.

## 5. Breakpoints QA'd

Verified at **500px** (mobile) and **~1100px** / **~1664px** (tablet/desktop, via the browser tool's window-resize) across homepage, `/cau-chuyen-thuong-hieu`, `/uu-dai`, `/bai-viet`, and a PDP. Because every display-font size uses CSS `clamp()` (mathematically continuous — no discrete breakpoint jumps), this range gives confidence for the untested intermediate widths (834/1024/1440) as well; the one place a fixed Tailwind breakpoint pair is used instead of `clamp()` (`HeroCampaign`'s split-panel heading) was checked directly at both the mobile and desktop extremes.

Checked and clean at all tested widths:
- No horizontal overflow (`document.documentElement.scrollWidth` ≤ viewport width).
- No ugly heading line-breaks or orphans — hero, page H1, section H2, and the brand-story quote all wrap into clean 1–4 line blocks.
- Vietnamese diacritics not clipped at any tested size.
- Nav/mega menu, product cards, and CTAs unaffected (out of typography's scope, but confirmed no regression).

## 6. Components changed

**Display font applied** (`.hh-heading-*` / `.hh-quote` / `.hh-display`):
Page H1s (16 pages, unified from a byte-identical duplicated class string to `.hh-heading-page`): `cam-ket`, `thu-vien-hinh-anh`, `thu-vien-noi-dung`, `nguyen-lieu` (+ `[slug]`), `san-pham`, `thu-vien-san-pham-hang` (+ `[slug]`), `thuong-hieu`, `bai-viet` (+ `[slug]`), `cong-thuc-minh-bach`, `noi-dung-thuong-hieu` (+ `[slug]`), `CheckoutContent`, `TaiKhoanContent` — plus 3 more page-H1 outliers unified to the same token: `OffersIntro`, `BrandStoryIntro`, `ScentAdvisorView`.
Homepage: `HeroCampaign` (locally-sized — see note below), `BestSellers`, `BrandValues`, `ExperienceCards`, `FeaturedCollection`, `AdvisorBanner`, `FullBleedBrandStory`, `SeoTextBlock`, `SocialFeed`, `MembershipSection`.
Brand story: `BrandStoryQuoteBlock` (`.hh-quote`), `BrandStoryTermBlock` (`.hh-display`, font-family only, size/color untouched), `TimelineEntry` (year → `.hh-display`, heading → `.hh-heading-card`).
Secondary sections: `GiftDiscoveryTiles`, `ProductReviews` (both `.hh-heading-card` — moderate emphasis, not overpowering their otherwise-functional pages).

**`HeroCampaign` note**: the literal Section 5 hero clamp (`3.25–4.5rem` desktop) assumes a full-width hero. `HeroCampaign` is a 448px-wide split-panel column, so it keeps its existing Tailwind responsive scale (`text-3xl`/`sm:text-4xl`) with just the font-family/weight swapped to display (`.hh-display`, `font-medium`) — verified in-browser that the real hero copy wraps cleanly into 2–3 lines without overflowing the panel.

**Bug fixes bundled in** (weight-300 requested but never loaded, silently rendering as regular weight — same root class string in two places): `ProductCard.tsx` and `BrandLibraryCard.tsx`, `font-light` → `font-normal`.

## 7. Components deliberately kept sans (and why)

Per Section 4's rule (serif for editorial only; never for prices, buttons, inputs, filters, technical product info, or content under 16px):
- Header, MegaMenu, BrandMegaMenu, MobileDrawer, nav/search — functional chrome.
- `ProductCard`/`BrandLibraryCard` names and `ContentCard` titles — both `text-sm`/`text-base` in dense catalog grids, below or at the 16px serif floor.
- `ProductBuyBox` product name and price — explicitly commercial/technical info.
- `ProductFilterDrawer` ("Bộ lọc"), checkout, forms, breadcrumbs, footer — all functional/transactional, matches the SANS-stays list verbatim.
- `PermanentBenefits` H2 — a short trust-badge band label, closer in spirit to the SANS-stays "badges" bucket than to an editorial headline.
- 3 confirmed-orphaned components (`ScentAdvisorIntro`, `BrandStoryTeaser`, `CategoryShowcase`) were left untouched — not imported by any live route, so changing them has zero visible effect.

## 8. Performance impact

- `npm run check` (lint + typecheck + build): **clean, exit 0**.
- Font files: 3 Cormorant Garamond faces (400, 500, 400-italic) + unchanged 4 Be Vietnam Pro weights, all `display: swap`, all served 200 OK with no 404s (verified via network inspection).
- No duplicate imports; each font loaded exactly once via `next/font/google`, scoped by `.variable` className.
- `next/font` correctly generates per-instance CSS variables (`--font-hh-cormorant`, `--font-hh-cormorant-italic`, `--font-hh-vietnam-pro`) — confirmed via `getComputedStyle` in-browser.
- Be Vietnam Pro remains the default body font throughout `HHShell` (`font-hh` on the root div) — display font is applied only via the explicit `.hh-*` opt-in classes, never globally.
- Weight 700 (Be Vietnam Pro) loads lazily/on-demand (confirmed "unloaded" via `document.fonts` on a page that doesn't use `font-bold`) rather than eagerly on every page — no wasted upfront requests.
- No layout-shift concerns beyond the standard `display: swap` FOUT window, unchanged from before this pass.

## 9. Before / after

Before: headings across ~20 different components used ad-hoc, mutually inconsistent Tailwind size/weight combinations (`text-2xl font-normal`, `text-2xl font-semibold`, `text-3xl font-semibold`, `text-4xl font-light`, etc.) all in the same Be Vietnam Pro sans face as the body copy — no visual hierarchy between a hero headline and a filter-drawer title beyond raw pixel size.

After: a single shared token system (`.hh-heading-hero/page/section/card`, `.hh-quote`) put every editorial heading and the brand-story pull-quote in Cormorant Garamond, fluidly sized via `clamp()`, while every functional/commercial surface stays on Be Vietnam Pro. The brand-story quote block in particular went from an 18–20px inline italic aside to a genuine 26–44px editorial pull-quote in real italic serif — the clearest single before/after of the pass. Net effect: a visibly more premium, editorial feel on hero/story/quote surfaces, with zero change to layout, color, content, or any `/reference/*` page.

## Verification

- `npm run check`: pass (lint + typecheck + build, exit 0).
- Re-QA'd changed routes in-browser after all edits (homepage, `/cau-chuyen-thuong-hieu`, `/uu-dai`, `/bai-viet`, a PDP) at 500px/1100px/1664px.
- No commit made — working tree left as-is per instructions (see `git diff --stat` / `git status --short` below; several files also carry uncommitted changes from the prior CEO Review Polish pass, not part of this task).
