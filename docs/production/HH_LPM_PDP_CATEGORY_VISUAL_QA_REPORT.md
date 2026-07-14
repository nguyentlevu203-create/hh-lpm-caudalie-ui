# Hoàng Hà / Le Petit Marseillais Việt Nam — PDP & Category Visual QA

**Date:** 2026-07-14
**Scope:** Deep browser click-through QA of the areas aligned in Pass 1 (`HH_LPM_UI_ALIGNMENT_REPORT.md`) but only verified via `npm run check` at the time, never in a live browser: the category listing (`/san-pham` + filters) and the PDP. No redesign, no asset swap, `/reference/*` untouched. Only confirmed UI/responsive/accessibility/interaction bugs were fixed.

## 1. Routes and slugs tested

**Category:**
- `/san-pham`
- `/san-pham?category=sua-tam`
- `/san-pham?category=xa-phong-banh`
- `/san-pham?scent=Oải%20hương`
- `/san-pham?category=xa-phong-banh&scent=Hạnh%20nhân` (deliberately empty-result combination, for empty-state QA)

**PDP** (slugs taken directly from `src/data/products.ts`, not guessed):
- `sua-tam-hoa-oai-huong-bo-hat-mo` — Sữa Tắm Hoa Oải Hương & Bơ Hạt Mỡ (sữa tắm, has badge + compare-at price)
- `dau-goi-phuc-hoi-bo-hat-mo` — Dầu Gội Phục Hồi Bơ Hạt Mỡ (chăm sóc tóc, no badge, no compare-at price)
- `combo-qua-tang-hoa-hong` — Combo Quà Tặng Hoa Hồng (combo/quà tặng, `comboIncludes` section, badge + compare-at price)

## 2. Breakpoints — target vs. confirmed `innerWidth`

Same environment limitation Pass 2 and the offers/advisor QA pass both documented: `resize_window` does not map 1:1 to CSS pixels, and in this session its actual effect also drifted depending on how many browser tabs/windows were open concurrently at the time of the call (more open tabs → smaller tiled result, sometimes overriding an earlier successful size on a tab that had not been touched). Every width below is what `window.innerWidth` actually reported at the moment each screenshot was taken, not the requested value:

| Target | Confirmed `innerWidth` | Tailwind bucket | Used for |
|---|---|---|---|
| Desktop 1440 | **1069px**, later **1440px exact** (single-tab session) | `lg` and up (≥1024) | Category grid (4-col), PDP 2-col gallery/buybox, mega menu, breadcrumb |
| Tablet 834 | **834px exact** | `md`–`lg` (768–1023) | Category grid (3-col), PDP 1-col stack, header still mobile-style (gate is `lg`, not `md`) |
| Mobile 390 | **500px** | base (<640) | Category grid (2-col), PDP 1-col stack, mobile drawer/search/sticky CTA |

No claim is made of testing at exactly 1440/834/390 — the buckets above are what the site's own CSS actually branches on (`sm`/`md`/`lg`), and every bucket used by this UI was covered at least once with a confirmed real width inside it.

## 3. Category (`/san-pham`) checklist

| Item | Result |
|---|---|
| Breadcrumb | ✅ `Trang chủ / Sản phẩm / <Category or "Mùi hương X">`, last crumb not a link |
| Heading + product count context | ✅ Heading switches correctly between "Tất cả sản phẩm" / category name / "Mùi hương X" |
| ProductFilterDrawer open/close | ✅ Trigger, backdrop click, X button all close/open correctly |
| Overlay/backdrop | ✅ `bg-black/30`, click-outside closes |
| Category filter | ✅ `?category=sua-tam`, `?category=xa-phong-banh` both filter correctly and update breadcrumb/heading |
| Scent filter | ✅ `?scent=Oải hương` filters correctly (3 matching products) |
| Clear/reset filter | ✅ via drawer's "Tất cả" pill (navigates to bare `/san-pham`, clearing both dimensions — there is no separate single-dimension clear affordance, by design) |
| URL query updates | ✅ every filter click updates the URL (server component re-renders from `searchParams`) |
| Reload keeps filter | ✅ hard-reloaded `?category=sua-tam` — same filtered result |
| ProductGrid responsive | ✅ `grid-cols-2` → `md:grid-cols-3` → `lg:grid-cols-4`, confirmed at all 3 buckets |
| ProductCard (badge, rating, price/compare-at, add-to-cart) | ✅ all fields render correctly across multiple products |
| No horizontal overflow | ✅ `scrollWidth ≤ innerWidth` confirmed at all 3 breakpoints (819/834, 485/500, and desktop) |
| No column misalignment | ✅ visually confirmed at all 3 breakpoints, including a 2-item result (xà phòng bánh) that doesn't fill the last row |
| Empty state | ✅ `?category=xa-phong-banh&scent=Hạnh nhân` → "Không tìm thấy sản phẩm phù hợp" message, no broken layout |
| Keyboard/focus, close button | ✅ X button closes via click; see §5 for Escape/focus-trap findings |

## 4. PDP checklist (all 3 products)

| Item | Result |
|---|---|
| Breadcrumb | ❌ **found missing** — see §6.1 (fixed) |
| ProductGallery | ✅ 3 thumbnails, badge, wishlist heart, prev/next chevrons |
| Thumbnail active state | ✅ border highlights the active thumbnail |
| Main image changes on thumbnail click | ✅ confirmed (transform swaps; see Pass-1 note on synthetic views, unchanged) |
| ProductBuyBox | ✅ title, volume/scent line, rating+review-count link to `#danh-gia` |
| Price + compare-at price | ✅ correct on the sữa tắm and combo products (both have `compareAtPrice`); correctly *absent* on the hair-care product (no `compareAtPrice` field) |
| Quantity stepper | ✅ `+`/`−` work; confirmed does **not** go below 1 |
| Add to cart | ✅ "Mua ngay" and "Thêm vào giỏ" both call `addToCart` with the selected quantity |
| Cart drawer receives correct product + quantity | ✅ added qty 3 of the seed product (which already had qty 1 in the seed cart) → cart line correctly showed 4, subtotal 516.000₫, free-shipping banner correctly flipped to "miễn phí" |
| ProductDescription | ✅ `dl` fact list, "Sản phẩm này là gì?" paragraph |
| "Xem thêm" / "Thu gọn" toggle | ✅ reveals remaining highlights; combo product also shows its "*Combo gồm N sản phẩm…" footnote only when expanded |
| ProductAccordions open/close | ✅ |
| Multiple accordions open at once | ✅ confirmed by design (`expanded` is an array, not a single value) — opened "Thành phần" and "Hướng dẫn sử dụng" simultaneously, both stayed open |
| ProductReviews (rating distribution + review cards) | ✅ 5-row percentage bars, 3 sample review cards, "Viết đánh giá" / "Xem thêm đánh giá" buttons present |
| TrustBadges | ✅ 4-icon row, `grid-cols-2` → `sm:grid-cols-4` |
| RelatedProducts | ✅ correctly filtered by same category or same scent, no self-inclusion, horizontal row fits without scroll at desktop width |
| CTA/related links | ✅ all `ProductCard` links inside related row point to their own PDP |
| StickyMobileCta | ✅ visible `lg:hidden`, doesn't cover footer or last section (root `pb-20 lg:pb-0` compensates for its height) |
| Long product name / layout break | ⚠️ not fully verified — see §7 (no catalog entry is long enough to stress-test wrapping) |
| Combo-specific section (`comboIncludes`) | ✅ "Combo gồm:" box with bullet list, only rendered when `product.isCombo && product.comboIncludes` |

## 5. Shared components (Header, mega menu, drawers, overlays) — both routes

| Item | Result |
|---|---|
| Header desktop (nav, location/account/cart icons) | ✅ |
| Header mobile (hamburger, search bar, mic icon) | ✅ |
| Mega menu (hover on "Sản phẩm") | ✅ opens on hover, 6 category tiles + "Xem tất cả sản phẩm" CTA, no overflow |
| MobileDrawer | ✅ opens/closes, "Sản phẩm" submenu expands inline, account/loyalty footer links present |
| SearchOverlay | ✅ opens/closes, suggested-category chips, live filtering over the catalog |
| CartDrawer | ✅ opens/closes, correct item/qty/price math (see §4) |
| Footer mobile accordion | ✅ (already fixed in the prior offers/advisor QA pass; re-confirmed here still holds on category/PDP) |
| Hydration errors from app code | ✅ none — the recurring "1 Issue" Next.js dev-overlay badge on every screenshot is the same browser-extension-injected `bis_register`/`__processed_*` attribute mismatch already identified and confirmed non-app-caused in the offers/advisor QA pass; not re-litigated here beyond confirming it's the identical signature |

## 6. Bugs found and fixed

### 6.1 PDP had no breadcrumb
**File:** `src/app/san-pham/[slug]/page.tsx`
**Severity:** Medium (navigation/UX gap, not a visual break)
**Cause:** `ProductBreadcrumb` was built and wired into `/san-pham` during Pass 1, but the PDP route (`/san-pham/[slug]/page.tsx`) never imported or rendered it — the exact same "component built but never wired up" pattern already seen twice before in this codebase's history (the Pass 2 alignment report's orphaned `ExperienceCards`/`FeaturedCollection`, and this session's earlier `SCENT_ADVISOR_QUESTIONS` unused `cardBg`/`headingColor` fields). Confirmed missing by inspecting all three tested PDP pages in the browser before fixing.
**Fix:** Added `ProductBreadcrumb` to the PDP shell: `Trang chủ / Sản phẩm / <category name, linking to ?category=…> / <product name (not a link)>`, matching the exact pattern already used on `/san-pham`. Verified on all 3 test products — clicking the category crumb correctly lands on the matching filtered `/san-pham?category=…` page.

### 6.2 `ProductFilterDrawer` missing `aria-hidden` when closed
**File:** `src/components/hh/product/ProductFilterDrawer.tsx`
**Severity:** Low (accessibility consistency, not a visible bug)
**Cause:** `CartDrawer`, `SearchOverlay`, and `MobileDrawer` all set `aria-hidden={!isOpen}` on their sliding panel so assistive tech skips the off-screen content while closed. `ProductFilterDrawer` — built later, in Pass 1's category-listing worktree — used the same visual `translate-x-full` slide pattern but never got the matching `aria-hidden` toggle, making it the one inconsistent overlay on the site.
**Fix:** Added `aria-hidden={!open}` to the drawer panel, matching the other three overlays exactly. Verified via `getAttribute('aria-hidden')` reading `"true"` while closed.

## 7. Accessibility findings (documented, not fixed — see rationale)

These are pre-existing, sitewide gaps that predate this QA pass and Pass 1's PDP/category work specifically — none are regressions introduced by category/PDP alignment. Consistent with how the prior offers/advisor QA report treated the same category of issue (documented, not silently fixed), they are listed here rather than patched, because fixing them properly is a cross-cutting change to the shared overlay architecture (`SiteUIContext` + up to 5 separate components), not a targeted category/PDP bug fix:

- **No Escape-to-close on any overlay** (cart, search, mobile menu, filter drawer). Directly tested: opened the filter drawer, pressed `Escape`, drawer remained open. `SiteUIContext` and `ProductFilterDrawer` both have zero `keydown` handling — this was confirmed by reading the source before testing, then confirmed again live in the browser.
- **No body-scroll lock when any overlay is open.** Directly tested: with the filter drawer open, `getComputedStyle(document.body).overflow` read `"visible"` — the page behind the drawer can still be scrolled.
- **No explicit focus trap.** Not deeply fuzz-tested (would require simulating many Tab presses through a fully populated drawer), but by inspection there is no focus-management code (no ref-based first/last-focusable-element trap) anywhere in `SiteUIContext` or any of the four overlay components, so a focus trap is very unlikely to exist even though it wasn't independently proven absent via exhaustive Tab-cycling.
- **5 text inputs across the site use `outline-none`/`focus:outline-none` without a replacement focus-visible style**: the two `AuthOverlay` forms (`RegisterForm.tsx`, `SignInForm.tsx` ×2 fields), the footer newsletter input (`Footer.tsx`), and the `SearchOverlay` search input. Every other interactive element checked (nav links, buttons, mega-menu links) kept the browser's default `outline: auto` — confirmed live via `document.activeElement` after tabbing, landing on a mega-menu link with `outline-style: auto`. Only these 5 inputs strip it without adding a visible alternative (e.g., a border/ring color change on focus).

None of these were introduced or touched by the category/PDP work reviewed in this pass; recommending a dedicated follow-up pass across `SiteUIContext` + the 5 overlay/form components rather than a partial fix bundled into this report.

## 8. `npm run check`

Run from repo root after both fixes in §6:

```
lint      → pass, 0 errors
typecheck → pass, 0 errors
build     → pass, same 31 routes as all prior passes
```

## 9. Files changed

```
src/app/san-pham/[slug]/page.tsx                 | breadcrumb added (import + render)
src/components/hh/product/ProductFilterDrawer.tsx | 1 line (aria-hidden consistency)
```

## 10. Limitations / not fully verified

- **Long product-name wrapping**: every product in `src/data/products.ts` has a short-to-medium name (longest is "Combo Quà Tặng Hoa Hồng" / "Sữa Tắm Hoa Oải Hương & Bơ Hạt Mỡ", both well under one line at any tested width). No catalog entry is long enough to genuinely stress-test the PDP title (`text-2xl font-semibold`, no `line-clamp`) or the `ProductCard` title (`line-clamp-2`) for real overflow/break behavior. Visually nothing broke on the products tested, but this isn't the same as proving the layout survives an unusually long name.
- **Focus trap** was assessed by code inspection only (no focus-management code exists to trap into), not by exhaustively Tab-cycling through a fully open drawer to observe focus actually leaving into background content.
- **Cart/checkout beyond the drawer** (`/checkout`, payment) is out of scope — the "Đến trang thanh toán" link is `href="#"`, matching the whole project's known "UI shell, no backend" scope from Phase 1 onward.
- Only 3 of 14 catalog products were click-through tested end-to-end; the remaining 11 share the exact same `ProductDetailPage`/`ProductBuyBox`/etc. components with only data differences, so this is a reasonable but not exhaustive sample.

## 11. Conclusion — ready for real assets?

**Yes**, with the same caveat as the offers/advisor QA pass. Category listing and PDP are both structurally sound and interactively correct at all three tested breakpoints: filtering, cart math, accordions, thumbnails, and breadcrumb navigation (now present on PDP) all work end to end with no horizontal overflow or broken layout found on any of the 3 products or 5 category-route variants tested. The accessibility gaps in §7 are real and worth a dedicated follow-up, but they are pre-existing and sitewide rather than specific to the category/PDP surfaces — they don't block dropping in real product photography and copy when available.
