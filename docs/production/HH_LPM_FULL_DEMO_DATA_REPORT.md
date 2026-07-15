# Phase 3 — Full Demo Data & Function Integration

**Date:** 2026-07-15
**Branch:** `hh-lpm-demo-data`
**Scope:** Import every row of both source workbooks (not just the 14 Phase-2 products), classify sellable vs. reference-only, enrich missing fields from the web where genuinely missing, rebuild pricing around a real/demo/inquiry model, download and locally host every image actually used, add content routes for ingredients/articles/brand pages, and complete the demo commerce loop (search, filters, cart, checkout, membership, wishlist, order history). No commit made — per instruction, stopped short of committing.

---

## 1. Row counts — every sheet, every row, accounted for

**`hh_web_company.xlsx`**

| Sheet | Rows imported | Destination |
|---|---|---|
| `00_Tổng quan CMO` | 23 (raw grid, all non-empty rows) | `products.json` → `_meta.00_Tổng quan CMO_rawGrid` |
| `01_Catalogue chuẩn` | 89 | `products.json` → `products[]` (1 record per row, anchor sheet) |
| `02_Content MKT` | 89 | merged into each product's fields, cross-referenced |
| `03_Thành phần & Claims` | 89 | merged into each product's fields, cross-referenced |
| `04_QA thiếu dữ liệu` | 117 (multi-issue rows) | folded into each product's `dataWarnings` |
| `05_Từ điển chuẩn hoá` | 8 | `products.json` → `_meta.05_Từ điển chuẩn hoá` |
| `06_Raw nguồn` | 89 | merged into each product's fields (`rawOriginalName`/`rawShortDescription`/`rawFullDescription`), flagged do-not-use-directly per its own note |

Cross-sheet orphan check (SKU in 02/03/04/06 but absent from 01): **0 found**.

**`lpm_brand_web.xlsx`**

| Sheet | Rows imported | Destination |
|---|---|---|
| `00_Tong_quan` | 15 | `content/brand-pages.json` → `_meta.00_Tong_quan` |
| `01_San_pham` | 147 | `catalog/brand-products.json` |
| `02_Anh_san_pham` | 2,527 | 2,173 linked into matching `01_San_pham` galleryRefs; 354 unlinked → `media-library.json` |
| `03_Nguyen_lieu` | 19 | `content/ingredients.json` |
| `04_Bai_viet_MKT` | 71 | `content/articles.json` |
| `05_Trang_noi_dung` | 105 | `content/brand-pages.json` (full import, tagged as likely duplicate of 03/04/06 where a title match exists — 19/19 ingredient-page duplicates matched, 1/71 article duplicates matched by exact title; low match rate reflects the two sheets being independently re-translated, not an import gap) |
| `06_Brand_content` | 14 | `content/brand-pages.json` (canonical pages, used for `/thuong-hieu` `/cam-ket` `/cong-thuc-minh-bach`) |
| `07_Cards_CTA` | 159 | `content/cards.json` |
| `08_Thu_vien_anh` | 807 | `content/media-library.json` |
| `09_Glossary_chuan_hoa` | 14 | `content/brand-pages.json` → `_meta.09_Glossary_chuan_hoa` |

**Grand total: 4,382 rows read, 4,382 rows landed in one of the 9 output files or a documented `_meta` block. Zero rows silently dropped.**

`legal-pages.json` intentionally contains **0 records** — neither workbook has a legal/policy sheet (checked all 17 sheet headers directly); fabricating terms/privacy/return-policy copy was refused rather than invented. Existing placeholder `#` links in `site-content.ts` are unchanged.

---

## 2. Sellable vs. reference-only

- **Sellable (Hoàng Hà's own catalogue, `hh_web_company.xlsx`):** 89 raw rows → **83 sellable UI products** (`hh-products-derived.json`). The other 6 are gift/bundle/duplicate rows with no SKU (STT61 gift item, STT62/63 combo bundles, STT78/85/86 duplicate rows of already-included SKUs NR50491/SD39787/SD72373) — not distinct sellable listings, `confidence: "not_applicable"`.
- **Reference-only (LPM France global catalogue, `lpm_brand_web.xlsx`):** all 147 rows, `sellable: false`, `referenceOnly: true` — used only as an image/content reference, never presented as Hoàng Hà's own sellable inventory.

---

## 3. Product matching (89 HH × 147 LPM)

| Tier | Count | Meaning |
|---|---|---|
| exact | 40 | Confirmed match — 14 hand-verified side-by-side in the Phase 2 audit, 26 more verified in Phase 1's §6.1 table and resolved to their specific LPM row via IDF-weighted token overlap (generic cosmetic vocabulary like "hữu cơ"/"chiết xuất" down-weighted so distinctive scent/ingredient words decide the match) |
| medium | 28 | Real but less certain match (Phase 1 §6.2 "approximate" territory); candidate attached but `reviewStatus: needs_manual_review`, never shown as confirmed |
| low | 3 | Borderline (ST00526, ST00557, ST01295 — dual-flagged in Phase 1 as plausible-but-risky) |
| unmatched | 12 | No defensible candidate — no image assigned, gradient placeholder shown instead |
| not_applicable | 6 | Gift/bundle/duplicate rows, not distinct sellable products |

Methodology detail, full per-SKU evidence, and known caveats (e.g. SD39787's accepted match is genuinely a hand-cream photo standing in for a lip-balm SKU, flagged verbatim from Phase 1) are in `src/data/catalog/product-matches.json`. No candidate below the "low" threshold was ever forced into a tier.

---

## 4. Web enrichment

WebFetch to `lepetitmarseillais.com` is **blocked site-wide (HTTP 403)** — confirmed on the homepage and on individual product pages. WebSearch (indexed snippets, not live page fetch) was used instead, satisfying "chỉ lưu tiêu đề/mô tả/URL nguồn, không copy nguyên bài."

- **8 of the 12 unmatched products** got a real, sourced `webEnrichment` field (official product URL + title + fetch timestamp + `reviewStatus: needs_manual_confirmation_before_use`): ST01601, ST01496, DG90435, DG90442, ST53386, ST53379, NR50675, NR73601.
- **4 remain unattempted in this pass** (ST68867, ST55031, ST55055, ST00991) — no fabricated data added for these; still `unmatched`.
- **Missing volume (28/29) and missing description (3/3) on HH's own sheet** were backfilled from the *already-imported* matched LPM row (not a new web fetch — the LPM workbook is itself sourced from the official site and is more complete than a search snippet), clearly labeled `volumeReference`/`descriptionReference` with `reviewStatus: reference_only_not_confirmed_for_hh_import` — never silently merged into the "confirmed HH" fields.
- **Brand ownership finding:** Kenvue's own official "our brands" page does **not** list Le Petit Marseillais; WWD/Wikipedia point to Johnson & Johnson directly (Groupe Vendôme SA, acquired 2006). The Phase 3 brief's assumption that Kenvue is priority source #2 doesn't hold up — flagged here rather than asserted either way without more digging.
- **No medical/legal claims were added from any web source** for any SKU.

---

## 5. Pricing model

`officialPrice: null` for all 89 products — no real Hoàng Hà price exists in either source or any web source found. `demoPrice` (illustrative, user-approved in the Phase 2 turn) is set only for the 14 originally-selected products; the other 69 default to `priceMode: "inquiry"` rather than inventing 69 more numbers. Inquiry products display **"Giá sẽ được nhân viên Hoàng Hà xác nhận"**, remain fully addable to cart and checkout, and are excluded from every computed subtotal (cart, checkout, and order total all sum only real/demo prices — verified in browser QA that a mixed cart shows the correct partial subtotal plus an explicit "N sản phẩm chưa có giá" note, never a silently-wrong total).

---

## 6. Images

| Source | Downloaded | Failed | Notes |
|---|---|---|---|
| Product packshots (exact-tier matches) | 40 | 0 | `public/images/hh/products/<slug>/main.<ext>` |
| Ingredient hero images | 19 | 0 | `public/images/hh/ingredients/<slug>/` |
| Article hero images | 66 | 5 | `public/images/hh/articles/<slug>/` — 5 articles have no `heroImageUrl` at all in the source sheet, not a fetch failure |
| Brand content hero images | 14 | 0 | `public/images/hh/brand/<slug>/` |

All downloads deduped by SHA-256 content hash (several HH SKU variants share the identical LPM source image — stored once, referenced by multiple products). **8.2 MB total, 118 files, zero hotlinked URLs in any production component** (`grep` swept `src/components` and `src/app` for `ctfassets.net`/`lepetitmarseillais.com` — no matches). `banners/` directory created but empty — neither workbook has a "banner" sheet, so nothing was fabricated to fill it.

`media-library.json` (1,161 records: 807 from `08_Thu_vien_anh` + 354 unlinked from `02_Anh_san_pham`) catalogues every other known image URL with metadata (`localPath: null`, `downloadStatus: "not_downloaded"`) — not downloaded since they're not rendered anywhere, per "ảnh chưa được dùng vẫn phải lưu metadata."

---

## 7. Claims

35/83 sellable products carry a `claimFlag` (source: `03_Thành phần & Claims` sheet's own "Claim cần kiểm tra?" column) — stored as **data only**, never rendered to shoppers, surfaced for internal QA/RA review before any real launch. Highest-risk flag: KT18485 ("phục hồi/tái tạo, chống lão hóa" — anti-aging is the most legally sensitive claim in the catalogue). No claim was invented or upgraded from any web source.

---

## 8. Missing fields (honest gaps, not filled)

- `legal-pages.json`: 0 records, reason documented in §1.
- 12 unmatched products: no product image (gradient placeholder shown).
- 4 of those 12: no web-search attempt made in this pass either.
- 69 sellable products: no real price (`priceMode: "inquiry"`).
- 5 articles: no hero image in source data.
- Barcode/EAN: absent from both workbooks entirely (confirmed in Phase 1 audit) — still absent, not fabricated here either.

---

## 9. Routes built

`/nguyen-lieu`, `/nguyen-lieu/[slug]` (19 pages), `/bai-viet`, `/bai-viet/[slug]` (71 pages), `/thuong-hieu`, `/cam-ket`, `/cong-thuc-minh-bach` — all driven by the imported JSON via `src/data/{ingredients,articles,brand-pages}.ts`, no hardcoded content. Two supporting routes were also required to complete Phase G's commerce loop: `/thanh-toan` (checkout) and `/tai-khoan` (membership dashboard). All linked from the footer ("Về Hoàng Hà" section).

---

## 10. Demo commerce functionality

- **Search**: extended to cover both products and articles in one query (`SearchOverlay.tsx`), verified with "tóc" → 17 products + 6 articles.
- **Filters**: category, dòng sản phẩm (product line), dung tích (volume), and mùi hương (scent) — all four dimensions, combinable via URL params, verified in browser.
- **Cart**: add/remove/adjust quantity; inquiry-priced items addable and correctly excluded from the computed subtotal with an explicit note.
- **Checkout** (`/thanh-toan`): name/phone/address/note form with validation, COD or bank-transfer (both simulated) selection, order summary with live subtotal.
- **Order confirmation**: real generated order ID, phone-confirmation copy, "xem lịch sử đơn hàng" / "tiếp tục mua sắm" CTAs.
- **Order persistence**: `AccountContext` (`localStorage`, key `hh-demo-account-v1`) — orders survive independent of login state and appear in `/tai-khoan` once signed in.
- **Membership**: register/sign-in (demo-only, no real backend) grants 100 điểm + "Thành viên Bạc" tier + 2 welcome vouchers (HHMOI10, HHSHIP0); points accrue ~1/10,000₫ on each order.
- **Wishlist**: heart toggle on `ProductCard` and PDP gallery, backed by the same `AccountContext`, verified end-to-end (toggle on listing → appears on `/tai-khoan`).
- **Demo banner**: `DemoBanner` component renders site-wide, above every page, inside `HHShell`.

---

## 11. Bugs found and fixed during QA

1. **Broken image on category grid** (`next/image fill` needs its *immediate* parent positioned, not just an ancestor) — fixed by adding `relative` to the wrapping `<Link>` in `ProductCard.tsx`.
2. **Two matching regressions during Phase B token-scorer iteration** — accent-stripping caused Vietnamese tone-mark homograph collisions (`ngừa`/`ngựa`, `tầm`/`tắm` became identical strings), and raw Jaccard overlap let generic words ("hữu cơ", "chiết xuất") drown out distinctive ones. Fixed by keeping full diacritics and switching to IDF-weighted scoring; caught via cross-validation against the 14 Phase-2 gold-standard matches before trusting the algorithm on the other 75.
3. **`/thanh-toan` and `/tai-khoan` showed the stale Caudalie browser-tab title** — both pages were single "use client" components that also rendered `<HHShell>`, so `export const metadata` (server-only) was invalid and Next.js fell back to the root layout's original Caudalie default. Fixed by splitting each into a server `page.tsx` (owns `metadata`) + a separate client content component.
4. **Build crash on `/thanh-toan`**: `useSiteUI()`/`useAccount()` were called in the same component that rendered `<HHShell>`, before its provider exists in the render tree. Fixed by moving all hook usage into a child component rendered *inside* `<HHShell>`.

All four confirmed fixed via `npm run build` succeeding afterward and re-verified live in the browser.

---

## 12. QA coverage (manual, live browser)

Catalog (83 products, `/san-pham`) ✅ · all 7 categories + line/volume/scent filters ✅ · search across products+articles ✅ · 10+ PDPs across categories including one gradient-placeholder (unmatched-tier) and one real-photo (exact-tier) product ✅ · `/nguyen-lieu` list + detail ✅ · `/bai-viet` list + detail ✅ · brand pages (data wiring confirmed via `getBrandPageBySlug`, not manually re-clicked this pass) · cart (add, inquiry-item subtotal exclusion) ✅ · checkout (fill, submit, confirmation, order ID) ✅ · account sign-in gate ✅ · registration (points/tier/vouchers granted correctly) ✅ · order history (anonymous order correctly attached post-login) ✅ · wishlist toggle + display ✅ · broken-image fallback (gradient placeholder renders for every unmatched/no-image product, confirmed on grid and PDP) ✅ · mobile (390×844) homepage + category grid ✅.

Not re-verified live this pass (data-path already confirmed via typecheck/build + code review): `/thuong-hieu`, `/cam-ket`, `/cong-thuc-minh-bach` individually; tablet breakpoint.

---

## 13. `npm run check`

```
✔ eslint — 0 errors
✔ tsc --noEmit — 0 errors
✔ next build — 197/197 pages generated successfully
```

---

## 14. Not done / explicitly deferred

- Full manual side-by-side review of all 28 "medium" and 3 "low" tier image matches (algorithmic candidates only — flagged `needs_manual_review`, not treated as confirmed anywhere in the UI).
- Live re-fetch/search for the 4 still-unmatched products (ST68867, ST55031, ST55055, ST00991).
- Tablet-breakpoint QA pass.
- No commit made, per instruction.
