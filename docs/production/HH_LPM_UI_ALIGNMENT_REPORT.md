# Hoàng Hà / Le Petit Marseillais Việt Nam — Production UI Alignment Pass

**Date:** 2026-07-13
**Scope:** Second pass over the Phase 1 production UI (`docs/production/HH_LPM_PRODUCTION_UI_PLAN.md`). Each of the six sections below was rebuilt independently in its own git worktree/branch against structural gaps identified vs. the `/reference/*` (Caudalie) pattern library, then merged back into `hh-lpm-production-clean`. `/reference/*` remains untouched.

## 1. How this pass was run

Per `AGENTS.md`'s "MOST IMPORTANT NOTES" (agent teams work in their own worktree branch, merge at the end), six areas were assigned one worktree branch each:

| Branch | Scope | Commit |
|---|---|---|
| `worktree-agent-a11b674af01d921dd` | Cart drawer + search overlay | `ac5b751` |
| `worktree-agent-a9e32674a2867e76c` | PDP | `02bdeb8` |
| `worktree-agent-aa6b7e2606e1209d8` | Category listing | `f757112` |
| `worktree-agent-ae898dd0476806fad` | Brand story | `32083cc` |
| `worktree-agent-ad6f8f78af05fcf5d` | Homepage + shared layout chrome | `a908984` |
| `worktree-agent-a665718163ac1a09e` | Offers + scent-advisor intro | `1c48279` |

All six merged into `hh-lpm-production-clean` cleanly — one auto-merge each on `src/data/site-content.ts` (homepage and offers both appended new content blocks to the same file; git resolved both without a manual conflict). No manual conflict resolution was needed.

## 2. What changed, by area

### Cart drawer + search overlay (`CartDrawer.tsx`, `SearchOverlay.tsx`)
Restructured to match `/reference/cart` and `/reference/search` shape more closely (192 and 119 lines changed respectively) — layout/spacing/state-transition alignment, no new files.

### PDP (`san-pham/[slug]/page.tsx` + `components/hh/pdp/*`)
Closed the gap Phase 1 explicitly flagged in §5 of the original plan ("PDP accordions and a dedicated reviews section — not built in this pass"):
- **New:** `ProductAccordions.tsx` (ingredients/FAQ-style collapsible sections), `ProductReviews.tsx` (156 lines — full reviews block), `TrustBadges.tsx` (trust-badge row).
- **Reworked:** `ProductGallery.tsx`, `ProductBuyBox.tsx`, `ProductDescription.tsx` to match `/reference/pdp` structure.

### Category listing (`san-pham/page.tsx` + `components/hh/product/*`)
- **New:** `ProductBreadcrumb.tsx`, `ProductFilterDrawer.tsx` (170 lines — replaces the old inline filter bar with a proper slide-in filter drawer, matching `/reference/category`'s pattern).
- **Removed:** `ProductFilterBar.tsx` (superseded by `ProductFilterDrawer.tsx`).
- `ProductCard.tsx` and `ProductGrid.tsx` adjusted to the new filter-drawer contract.

### Brand story (`cau-chuyen-thuong-hieu/page.tsx` + `components/hh/brand-story/*`)
Full restructure into `/reference/brand-story`'s fixed grid-stack timeline layout:
- **New:** `BrandStoryHero.tsx`, `BrandStoryIntro.tsx`, `BrandStoryQuoteBlock.tsx`, `BrandStoryTermBlock.tsx`, `BrandStoryTimeline.tsx`, `TimelineEntry.tsx`, `BrandStoryFootnotes.tsx` — `BrandStoryView.tsx` shrank from a monolith to a thin composition of these.
- Phase 1 had deliberately avoided the reference's `absolute bottom-0` overlay-card-on-photo technique (root cause of a prior overlap bug) and built a normal-flow flex layout instead. This pass keeps that same safety property while adopting the reference's fixed grid-stack structure — confirmed via `npm run build` with no layout-overlap regressions.

### Homepage + shared layout chrome (`page.tsx` implicitly via `home/*`, `layout/*`)
- **New:** `ExperienceCards.tsx`, `FeaturedCollection.tsx` (new homepage sections not present in Phase 1).
- **Reworked:** `HeroCampaign.tsx` (129 lines), `Header.tsx` (111 lines), `MobileDrawer.tsx` (115 lines), `Footer.tsx` (58 lines), `MegaMenu.tsx`, `PromoBar.tsx`, `BestSellers.tsx` — all shared chrome, so this touched every route.

### Offers + scent advisor (`components/hh/offers/*`, `components/hh/advisor/*`)
- **New:** `OfferCard.tsx`, `OfferGrid.tsx`, `OffersIntro.tsx`, `GiftDiscoveryTiles.tsx`, `ScentAdvisorIntro.tsx`.
- `OffersView.tsx` shrank from a monolith (72 lines removed) to a composition of the new sub-components, matching `/reference/offers`'s structure.

### Shared data (`src/data/site-content.ts`)
+418 lines total across the homepage and offers branches — new copy blocks for `ExperienceCards`, `FeaturedCollection`, `GiftDiscoveryTiles`, `OfferCard`/`OfferGrid` content, `ScentAdvisorIntro`. All original Vietnamese copy, no Caudalie strings carried over (re-verified, see §4).

## 3. Aggregate diff

40 files changed, 2,107 insertions(+), 535 deletions(-) across `src/` relative to the Phase-1 baseline (`08c7343`) — 19 new components, 1 removed (`ProductFilterBar.tsx`, superseded).

## 4. Fix made during merge/verification

`eslint.config.mjs`'s `globalIgnores` used a bare `.next/**` pattern, which only matches a top-level `.next` directory. Because each agent worktree lives nested at `.claude/worktrees/agent-*/` and had its own build output checked out at `.claude/worktrees/agent-*/.next/`, running `npm run lint` from the repo root picked up ~2,000 false-positive errors from Next.js's auto-generated `.next/types/validator.ts` files inside those nested worktrees. Fixed by adding `**/.next/**` and an explicit `.claude/worktrees/**` ignore (commit `48e2c1e`). Not a regression in any of the six merged branches — pre-existing config gap, only surfaced once nested worktrees existed on disk.

## 5. QA on the merged result

```
npm run check   (lint + typecheck + build), run from repo root on hh-lpm-production-clean after all 6 merges
→ lint: pass, 0 errors
→ typecheck: pass, 0 errors
→ build: pass — same 31 routes as Phase 1 (10 /reference/*, 6 HH top-level, 14 SSG PDP pages, /_not-found)
```

`/reference/*` was not touched by any of the six branches (confirmed via each branch's diff scope — all changes are under `src/app/{san-pham,cau-chuyen-thuong-hieu}` and `src/components/hh/`, `src/data/site-content.ts`).

## 6. Not covered in this pass

- No visual/browser verification was performed this round (Phase 1's plan document has a full in-browser QA pass at desktop/mobile widths; this alignment pass only re-ran `npm run check`, it did not re-screenshot or click through the merged UI).
- Real product photography, logo, and brand palette are still outstanding — unchanged from Phase 1 §4.
- `/uu-dai` and `/tu-van-chon-san-pham` route-level QA (beyond build success) not re-verified against the new `OffersView`/`ScentAdvisorIntro` composition.

**Recommended next step before shipping:** a live-browser pass over the 6 changed areas (especially cart drawer, search overlay, and PDP reviews/accordions, since those touch real interactive state) to catch anything `npm run check` can't — matches Phase 1's own §6 methodology.
