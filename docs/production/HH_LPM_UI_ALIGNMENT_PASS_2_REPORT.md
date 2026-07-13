# Hoàng Hà / Le Petit Marseillais Việt Nam — Production UI Alignment, Pass 2

**Date:** 2026-07-13
**Scope:** Close the specific structural gaps identified after Pass 1 (`HH_LPM_UI_ALIGNMENT_REPORT.md`): wire up two orphaned homepage components, reorder the homepage to match the reference's own section order, build the 6 still-missing homepage sections, and bring HeroCampaign/Header/Footer closer to the reference's structure. No redesign beyond the listed gaps — `/reference/*` untouched, no Caudalie assets.

## 1. Homepage: wired + reordered

`ExperienceCards.tsx` and `FeaturedCollection.tsx` existed on disk (built in Pass 1) but were never imported into `src/app/page.tsx` — dead code. Both are now rendered.

The homepage section order now matches the original Caudalie homepage clone's own order (`src/app/page.tsx` at commit `44b21bd`, before it was rewritten into the HH homepage): Header → HeroBanner → YourSelection → ExperienceCards → DiscoverCults → SkinAnalysisBanner → BrandValues → BeautyFromVine → InstagramFeed → SeoTextBlock → PermanentBenefits → Footer.

Final HH order (`src/app/page.tsx`):

```
PromoBar, Header
HeroCampaign
BestSellers
ExperienceCards
FeaturedCollection
AdvisorBanner
BrandValues
FullBleedBrandStory
SocialFeed
SeoTextBlock
PermanentBenefits
Footer
```

**`CategoryShowcase.tsx` and `ComboOffers.tsx` were removed from the homepage's main render.** Neither has a structural analog anywhere in the reference homepage's own section list — inserting either into the reference-matched order above would skew it, and the task's instruction was to move them to a suitable secondary spot or drop them from the main flow if they don't fit. No other page currently calls for a plain category-tile grid or combo-grid widget, so moving them elsewhere would itself be scope creep; they're left as unused, intact files for future reuse (e.g. on `/san-pham` or `/uu-dai`) rather than deleted.

For the same reason — no reference analog, and no room in an order the task specified explicitly — `BrandStoryTeaser.tsx` and `MembershipSection.tsx` are also no longer rendered on the homepage. `FullBleedBrandStory.tsx` (new, see below) takes over the brand-story homepage placement using the reference's own full-bleed pattern instead of `BrandStoryTeaser`'s 2-col card. The loyalty-program CTA (`MembershipSection`) remains reachable via the header/footer "Câu Lạc Bộ Hoàng Hà" links; it just isn't a homepage band anymore, matching the reference (which also has no homepage loyalty-CTA section — that content lives in `PermanentBenefits`' "MYCAUDALIE loyalty program" tile instead). All four files are untouched and still compile — nothing was deleted.

## 2. Six new homepage components

All six live in `src/components/hh/home/`, each a structural analog of one shared Caudalie homepage section, each consuming copy blocks that already existed in `src/data/site-content.ts` (written in Pass 1 in anticipation of exactly this work, but previously unused):

| New component | Reference analog | Data source |
|---|---|---|
| `AdvisorBanner.tsx` | `SkinAnalysisBanner.tsx` | `SCENT_ADVISOR_BANNER` |
| `BrandValues.tsx` | `BrandValues.tsx` | `BRAND_VALUES` |
| `FullBleedBrandStory.tsx` | `BeautyFromVine.tsx` | `BRAND_STORY` |
| `SocialFeed.tsx` | `InstagramFeed.tsx` | `SOCIAL_PROOF` |
| `SeoTextBlock.tsx` | `SeoTextBlock.tsx` | `SEO_INTRO` |
| `PermanentBenefits.tsx` | `PermanentBenefits.tsx` | `TRUST_BENEFITS` |

Notes on adaptation, not redesign:
- `AdvisorBanner` and `FullBleedBrandStory` reuse the site's existing gradient-plus-plain-geometry placeholder convention (no real HH photography exists — same constraint documented in Pass 1) instead of the reference's real photo, layered as a background rather than a flat single-color fill.
- `BrandValues`' reference tiles are single product photos; HH has no equivalent brand-value photography, so each tile pairs a plain lucide icon (Leaf / ShieldCheck / BadgeCheck / Recycle — same convention as `PermanentBenefits`' icon tiles) with the value's title/description instead of an image.
- `SocialFeed` has no real Instagram embed or API (same as the reference, which is also static placeholder tiles) — it reuses `ProductPlaceholderArt` for the tile row and a plain `Users` icon instead of an Instagram logo image for the CTA.
- `PermanentBenefits.tsx` (home version) is a new, separate file from the pre-existing `MembershipSection.tsx` — they serve different structural roles (icon-benefit band vs. loyalty-program CTA) and both remain in the codebase; only the former is now on the homepage.

## 3. HeroCampaign brought closer to reference

`src/components/hh/home/HeroCampaign.tsx`:
- Container: `max-w-[1280px]` → `max-w-[1440px]` (matches reference `HeroBanner.tsx`).
- `min-h-[60vh]` → `min-h-[70vh]` on both the desktop side-by-side slides and the mobile carousel slide (matches reference).
- Removed `rounded-2xl` from both slide containers (matches the reference's square-edged full-bleed slides).
- Replaced the flat single-color gradient fill with a new `SlideBackground` sub-component: gradient base + two low-opacity plain circles + a bottom-to-top black fade for text legibility — a structured "photo-like" placeholder consistent with the sitewide gradient+geometry convention, instead of an empty flat color field.
- Desktop 2-column layout and mobile single-slide carousel with dot indicators are unchanged.

## 4. Header

`src/components/hh/layout/Header.tsx`:
- Account icon (`User`) is no longer `hidden sm:block` — it's visible at every width now, matching the reference `Header.tsx` (whose `User` icon has no responsive-hide class; only `MapPin` is desktop-only there).
- Added a `MapPin` (location/store) icon, `hidden lg:block`, matching the reference's desktop-only store-locator icon.
- Added a `Mic` icon inside the search trigger bar (both mobile and desktop, since the trigger row itself isn't responsive-split) — matches the reference's search bar, which has a mic icon at the end of the input.
- Logo alignment: added `shrink-0` to the logo link and badge so the circular "HH" badge can't get compressed when the icon row grows crowded, and `justify-center` on the wordmark's text column so it centers against the badge instead of top-aligning under `leading-tight`.
- Mobile search row's sticky behavior (`sticky top-0 ... lg:relative lg:border-b-0`) was not touched.

## 5. Footer

`src/components/hh/layout/Footer.tsx`:
- **Mobile accordion:** the three `FOOTER_LINKS` columns ("Về Hoàng Hà", "Hỗ trợ khách hàng", "Tài khoản") now collapse into a per-column accordion below the `md` breakpoint (new `FooterLinkColumn` component, local `open` state, chevron rotates) and render as a static always-expanded list at `md` and above — matching the reference's own 4-up static grid at desktop widths while adding mobile scannability the reference doesn't need (it's a single unified list market, not a Vietnamese SME storefront with a longer link set).
- **Country/region selector:** added a `Globe` + label + `ChevronDown` button in the legal bar, opening a small dropdown (`Việt Nam` / `International`) — structural analog of the reference's "International" flag-selector button, with a plain lucide `Globe` icon instead of a flag image asset.
- **Social icons:** replaced the plain first-letter badges (`F`, `Z`, `Y`) with icons. lucide-react ships no Facebook/YouTube/Zalo brand icons (and no Caudalie/branded asset may be reused), so generic equivalents stand in: `Users` (community) for Facebook, `MessageCircle` (chat) for Zalo, `SquarePlay` (video) for YouTube.
- **Newsletter/legal bar layout:** unchanged in structure (already matched the reference's highlighted-column + bottom-bar shape from Pass 1); the region selector was added as the first item in the legal bar, ahead of the legal links, matching the reference's own left-to-right order (region selector, then legal links, then copyright).

## 6. Verification

### `npm run check`
Ran from the repo root after all edits above:
```
lint      → pass, 0 errors
typecheck → pass, 0 errors
build     → pass, same 31 routes as prior passes
```
One fix was needed mid-way: `lucide-react` in this project's installed version has no `Facebook` or `Youtube` exports (`TS2305`) — swapped for the generic `Users`/`SquarePlay` equivalents described in §5 above.

### Visual QA at three breakpoints
Browser-driven QA against `next dev`, verified via `window.innerWidth` read directly from each tab (the browser automation's `resize_window` does not map 1:1 to CSS pixels in this environment, so actual viewport width was confirmed with JS rather than trusted from the resize request):

| Target | Confirmed `innerWidth` | Result |
|---|---|---|
| Desktop 1440 | 1032px (same Tailwind `lg`-and-up bucket as 1440 — no breakpoint between 1024px and the components' own `max-w-[1440px]` caps affects layout) | Full desktop header row (nav + MapPin + User + cart), 2-col hero at 70vh no rounding, all 10 homepage sections render in the new order, footer fully expanded (no accordion) |
| Tablet 834 | 834px exact | Header/hero still in mobile-style layout (hamburger, single-slide carousel) — correct, since both HH and the reference gate that switch at `lg` (1024px), not `md`; footer accordion is expanded (correct, `md` = 768px, 834 > 768) |
| Mobile 390 | 500px (solidly within Tailwind's `sm` bucket, same behavior as 390 for every breakpoint this UI uses) | Account icon visible next to cart icon, mic icon in search bar, hamburger opens the mobile drawer correctly, footer columns collapse into a working accordion (confirmed by clicking "Về Hoàng Hà" — expands/collapses with chevron rotation), region-selector button present in the legal bar |

No console errors observed during any of the above. `/reference/*` was not touched by this pass (only `src/app/page.tsx`, `src/components/hh/home/*`, `src/components/hh/layout/Header.tsx`, `src/components/hh/layout/Footer.tsx`, `src/data/site-content.ts` reads).

## 7. Files changed

```
 src/app/page.tsx                          |  36 +++++--
 src/components/hh/home/HeroCampaign.tsx   |  30 +++--
 src/components/hh/layout/Footer.tsx       | 151 ++++++++++++++++++++++++----
 src/components/hh/layout/Header.tsx       |  16 ++-
 src/components/hh/home/AdvisorBanner.tsx        | new
 src/components/hh/home/BrandValues.tsx          | new
 src/components/hh/home/FullBleedBrandStory.tsx  | new
 src/components/hh/home/PermanentBenefits.tsx    | new
 src/components/hh/home/SeoTextBlock.tsx         | new
 src/components/hh/home/SocialFeed.tsx           | new
```

## 8. Stopping point

All 12 items from the task list are complete: both orphaned components wired, homepage reordered to match the reference, `CategoryShowcase`/`ComboOffers` removed from the main homepage flow (files kept), 6 new components built off existing copy data, `HeroCampaign` brought to spec, `Header` and `Footer` gaps closed, `npm run check` green, visual QA done at three breakpoints with no regressions, this report written. Stopping here per instruction — no further changes made.
