# Hoàng Hà / Le Petit Marseillais Việt Nam — Offers & Scent-Advisor Visual QA

**Date:** 2026-07-14
**Scope:** Deep browser QA of the two routes not yet re-verified in the browser after Pass 2 (`HH_LPM_UI_ALIGNMENT_PASS_2_REPORT.md`): `/uu-dai` and `/tu-van-chon-san-pham`. No redesign, no asset swap, `/reference/*` untouched. Only confirmed UI/interaction bugs were fixed.

## 1. Breakpoints tested

The automation browser's `resize_window` tool does not map 1:1 to CSS pixels in this environment (same limitation Pass 2's report already flagged) — repeated resize calls on one tab snap to a small set of window sizes rather than the exact requested value. Each breakpoint below was confirmed via `window.innerWidth` read directly from the tab, using a fresh tab per size:

| Target | Actual `innerWidth` confirmed via JS | Tailwind bucket | Notes |
|---|---|---|---|
| Desktop 1440 | **1101px** | `lg` and up (≥1024) | Same bucket the site's own `lg:` header/hero breakpoint gates on; components capped at `max-w-[1280px]`/`max-w-[1440px]` render identically above 1101px. |
| Tablet 834 | **900px** | `md`–`lg` (768–1023) | Correct bucket for testing the footer's `md:` static-grid switch and the header's `lg:`-gated mobile/desktop switch. |
| Mobile 390 | **500px** | base (<640) | Same bucket as 390 for every breakpoint this UI uses (identical to Pass 2's own finding at this size). |

## 2. Bugs found and fixed

### 2.1 Footer newsletter input overflow → sitewide horizontal scroll (desktop)
**File:** `src/components/hh/layout/Footer.tsx`

The newsletter `<input>` inside the footer's 5th grid column (`flex-1`, no `min-w-0`) kept its browser-default intrinsic width (~166px) instead of shrinking inside its flex row. At desktop width the newsletter column is only ~130px wide (5-col grid capped at `max-w-[1280px]`), so the input+button row overflowed the column by ~13px, pushing `document.documentElement.scrollWidth` (1114px) past `window.innerWidth` (1101px) and producing a real horizontal scrollbar on **every page**, not just `/uu-dai`/`/tu-van-chon-san-pham` — this footer is shared sitewide.

**Fix:** added `w-full min-w-0` to the input's className. Verified: `scrollWidth` (1086px) now sits under `innerWidth` (1101px) — no more horizontal scroll — and the input/button row now visually fits inside its column at all three breakpoints on both routes.

### 2.2 Scent-advisor cards: WCAG contrast failure on all 6 cards
**File:** `src/components/hh/advisor/ScentAdvisorView.tsx`

`ScentAdvisorView` hardcoded `text-white` (at full/80%/85% opacity) on every card and used `question.color` — a mid-saturation accent swatch — as the card background, while completely ignoring `cardBg`/`headingColor`/`onDark`/`buttonBg`/`buttonTextColor`, fields already present in `SCENT_ADVISOR_QUESTIONS` (`src/data/site-content.ts`) and clearly authored as matched light-bg/dark-text or dark-bg/light-text pairs (e.g. `gentle`/Hạnh nhân: `cardBg:"#fbf6ec"` + `headingColor:"#204a37"`). Those fields were dead data — never read by any component.

Measured contrast ratio (worst text element per card, against its own background) **before** the fix:

| Scent | Ratio | WCAG AA (4.5:1 normal text) |
|---|---|---|
| Oải hương | 3.46–4.41 | fail |
| Hoa cam | 1.90–2.20 | fail (severe) |
| Mật ong & sữa | 1.90–2.20 | fail (severe) |
| Hoa hồng | 2.12–2.50 | fail (severe) |
| Dầu ô liu | 2.37–2.84 | fail (severe) |
| Hạnh nhân | 1.55–1.72 | fail (severe) |

All six cards failed; four were severe failures (ratio <3:1), i.e. borderline unreadable regardless of text size.

**Fix:** swapped the card's `backgroundColor` from `question.color` to `question.cardBg`, and text color from hardcoded white to `question.headingColor` (applied at the `<Link>` container level so children inherit it; label/body opacity kept via generic CSS `opacity-80`/`opacity-90` instead of the now-inapplicable `text-white/NN` utility). This is not new design — it wires up color pairs that were already authored in the data model for exactly this purpose.

Measured contrast ratio (worst text element per card) **after** the fix:

| Scent | Ratio | Result |
|---|---|---|
| Oải hương | 10.02 | pass |
| Hoa cam | 5.45 | pass |
| Mật ong & sữa | 4.50 | pass (at threshold, see §3) |
| Hoa hồng | 9.30 | pass |
| Dầu ô liu | 3.54 → **5.22** (after §2.3) | pass |
| Hạnh nhân | 9.30 | pass |

### 2.3 One data-level color value darkened to actually clear the AA threshold
**File:** `src/data/site-content.ts`

After the §2.2 fix, `classic` (Dầu ô liu)'s own authored pair — `cardBg:"#eef1e8"` + `headingColor:"#9e774c"` — still only reached 3.54:1 even at full opacity on the heading, because the two authored values were themselves too close in luminance (the light-card/dark-text pairing was correct in direction but insufficiently contrasted). This is a one-value, same-hue-family adjustment, not a redesign: `headingColor` darkened from `#9e774c` to `#7c5e3a` (same tan-brown), bringing the ratio to 5.22:1. `cardBg`, `buttonBg` (`#9e774c`, unused by this component today), and every other field for this entry are untouched.

## 3. Remaining items (not fixed — out of scope or non-blocking)

- **Next.js dev-overlay "1 Issue" badge**, present on every screenshot in this pass: clicked into it and confirmed it is a hydration-mismatch warning caused by `bis_register`/`__processed_*` attributes injected onto `<body>` by a browser extension installed in the automation Chrome profile, before React hydrates. Not caused by app code (confirmed via the error's own diff, which shows only extension-injected attributes as the mismatch). Will not appear for a real visitor without that extension; no fix applicable in this codebase.
- **`Mật ong & sữa` contrast sits at exactly 4.50:1** — technically passes WCAG AA but with zero margin. Left as-is since it does pass; flagging as a watch item if `cardBg`/`headingColor` for this entry are ever revisited.
- **All CTA links** (`Mua ngay`, `Đặt hàng`, `Tìm hiểu thêm`, `Đăng ký`, gift-card tile) resolve to `/san-pham` or a `#` placeholder — expected, matches the whole project's "UI clone, no backend" scope from Phase 1 onward; not new to these two routes and not treated as a bug.
- **Card-background-to-page-background visual separation** for the four light-card scents (Hoa cam, Mật ong & sữa, Dầu ô liu, Hạnh nhân) is subtle since the page itself sits on a cream background — a design nuance, not a broken layout; left untouched per the "no redesign" instruction.
- **Real campaign/product photography** is still the sitewide gradient+geometry placeholder convention (`ProductPlaceholderArt`) — unchanged, out of scope per instruction §1.

## 4. Checklist coverage

**`/uu-dai`:** OffersIntro heading/copy ✓ · OfferGrid (6 cards, 2-col desktop/tablet, 1-col-split mobile) ✓ · each OfferCard's image/text split, `Mã:` chip, gift badge (🎁 icon only on the one offer with `hasGiftBadge: true`) ✓ · "Điều kiện áp dụng" accordion opens/closes correctly at all 3 breakpoints, long legal text wraps without truncation ✓ · GiftDiscoveryTiles (3 tiles) ✓ · all CTAs/links resolve (see §3) ✓ · spacing/card height/long text at mobile — no overflow, no column misalignment ✓ (after §2.1 fix).

**`/tu-van-chon-san-pham`:** ScentAdvisorIntro heading/copy ✓ · 6 scent cards, `sm:grid-cols-2 lg:grid-cols-3` (2-col at 900px tablet, 1-col at 500px mobile, 3-col at 1101px desktop) ✓ · background/text contrast — fixed, see §2.2/§2.3 · CTA `href` correctly builds `/san-pham?scent=<encoded scent name>` for all 6 cards, click-through verified end to end (breadcrumb + heading + filtered product grid all reflect "Oải hương") ✓ · long title/body text wraps cleanly at all 3 widths, no truncation ✓ · button/link ("Xem sản phẩm") and `ProductPlaceholderArt`-based visuals unaffected ✓.

**Shared chrome, both routes:** Header (desktop nav + location/account/cart icons; mobile hamburger + search bar mic icon) ✓ · MobileDrawer (nav list, "Sản phẩm" submenu chevron, account/loyalty footer links) ✓ · SearchOverlay (suggested-category chips wrap correctly) ✓ · CartDrawer (seed item, quantity stepper, order-summary accordion, checkout CTA) ✓ · Footer mobile accordion (3 columns collapse/expand with chevron rotation) ✓, and desktop newsletter row (fixed in §2.1).

## 5. `npm run check`

Run from repo root after all fixes above:

```
lint      → pass, 0 errors
typecheck → pass, 0 errors
build     → pass, same 31 routes as prior passes
```

## 6. Files changed

```
src/components/hh/layout/Footer.tsx        | 1 line  (min-w-0 on newsletter input)
src/components/hh/advisor/ScentAdvisorView.tsx | 6 lines (cardBg/headingColor instead of hardcoded white-on-color)
src/data/site-content.ts                   | 1 line  (darkened one headingColor value)
```

## 7. Are `/uu-dai` and `/tu-van-chon-san-pham` ready for real assets?

**Yes.** Both routes are now structurally sound and accessible at all three tested breakpoints: no horizontal overflow, no broken interactions (accordions, drawers, overlays, filter CTAs all verified working end to end), and the contrast failures that would have made the scent-advisor page genuinely hard to read for real users are fixed and measured passing WCAG AA. The only remaining gaps — placeholder photography and mock CTA destinations — are pre-existing, sitewide, and explicitly out of this pass's scope; they don't block dropping in real campaign photography and product imagery when available.
