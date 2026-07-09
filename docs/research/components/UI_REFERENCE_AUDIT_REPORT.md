# UI Reference Audit Report

**Date:** 2026-07-09
**Scope:** Audit-only pass over all 9 existing `/reference/*` routes. No new pages cloned, no UI changed (per task constraints — UI is only touched if `npm run check` fails, which it does not).
**Method:** (1) read every route's `page.tsx` + its component tree, (2) read every matching spec in `docs/research/components/`, (3) ran `npm run check`, (4) live-rendered all 9 routes in-browser (desktop width, ~896px effective — see viewport note below) and visually inspected each, cross-checking against its spec's claims.

## 0. `npm run check` result

```
npm run lint      → pass, 0 errors
npm run typecheck  → pass, 0 errors
npm run build      → pass, 13/13 static pages generated (10 /reference/* + / + /_not-found)
```
No code changes were made to reach this state — the repo was already green.

## 1. Route audit table

| Route (local) | File page chính | Component chính | Spec file | Trạng thái | Ghi chú mock/unverified | Dùng asset Caudalie? | Tái sử dụng cho HH/LPM? |
|---|---|---|---|---|---|---|---|
| `/reference/brand-story` | `src/app/reference/brand-story/page.tsx` | `BrandStoryView` | `brand-story.spec.md` | **needs visual QA** (real defect found) | Confirmed live: the intro paragraph's last line ("Let us tell you the story.") visually overlaps the first timeline entry's "1993 / The encounter" heading at ~896px width — `TimelineEntry`'s `absolute bottom-0` text card overflows above its own `aspect-[2578/1200]` image container when card content is tall relative to a narrow-width image height, with no clearance from `BrandStoryIntro` above it. Also: only 8 of ~18 real timeline entries included (documented, intentional scope reduction, not a defect). | Yes — 9 real downloaded photos + Mathilde's real signature raster; full Caudalie founding story/copy | Pattern only — editorial timeline/storytelling shape is reusable once the overlap bug is fixed; all content (founders, dates, Bordeaux vineyard story, KODALI etymology) is 100% Caudalie-specific |
| `/reference/cart` | `src/app/reference/cart/page.tsx` | `CartDrawer` | `cart-drawer.spec.md` | **has mock/unverified behavior** | Spec self-documents: "Choose my free mini" / "Add gift box" rows are non-functional placeholders; decrement-to-0-removes-line is an assumed default, not re-verified live; shipping always shows "Free" with no paid-shipping/threshold logic modeled. Visually renders correctly (confirmed live). | Yes — reuses `vinoperfect-30ml.jpg` from category; "MYCAUDALIE points" loyalty copy baked in | Pattern strongly reusable (right-side drawer, qty stepper, collapsible order summary) — copy/loyalty-program name must be replaced |
| `/reference/category` | `src/app/reference/category/page.tsx` | `ProductGrid` + `ProductGridCard` | `category-listing.spec.md`, `product-card-your-selection.spec.md` | **complete** | Star ratings are visual estimates rounded to one decimal (live page never exposed raw numbers) — flagged in spec as approximate, not authoritative. Filter drawer is presentational only (no real filter logic), documented as in-scope-as-shell. Visually confirmed live, no defects found. | Yes — 12 real product photos/prices/titles | Pattern strongly reusable (breadcrumb, heading, filter-drawer shell, responsive grid) — product data is 100% Caudalie catalog |
| `/reference/diagnosis` | `src/app/reference/diagnosis/page.tsx` | `DiagnosisView` / `ConcernGrid` | `diagnosis.spec.md` | **needs visual QA** (real defect found) | Confirmed live: `data.ts:36` has a typo — "There's **n** longer any need to choose" (should be "no longer"), visible on the rendered Premier Cru card. Also spec flags eyebrow-text color as assumed (not independently re-verified for every card, only Premier Cru). | Yes — 10 real product photos, 10 hand-sampled hex colors tied to named Caudalie product collections (Premier Cru, Vinoperfect, VinoHydra, etc.) | Pattern reusable (2-col colored concern card + image/text split), but the concern→collection→color mapping is entirely Caudalie's own taxonomy and needs a fresh HH/LPM equivalent |
| `/reference/login` | `src/app/reference/login/page.tsx` | `LoginView` / `SignInForm` / `ForgotPasswordForm` | `login.spec.md` | **complete** | No mock auth is intentional/by design (explicitly documented, not a gap) — both validation states (`This field is required`, `Invalid email address`) were verified live before implementation. Visually confirmed live, no defects. | Yes — shared chrome only (font/logo/color); no product imagery | Highly reusable as-is — one of the least Caudalie-coupled routes structurally |
| `/reference/offers` | `src/app/reference/offers/page.tsx` | `OffersView` / `OfferGrid` | `offers.spec.md` | **complete** | Spec documents one intentional scope cut: the live page's "You may also like" cross-sell carousel was not cloned (blocked CDN asset + judged redundant with `ProductGridCard`). Visually confirmed live, no defects. | Yes — 9 real campaign images; promo codes (`SUMMER`, `SUN49`) and "MYCAUDALIE" loyalty copy baked in | Pattern reusable (2-col promo card grid + gift-discovery tiles) — codes/copy/loyalty-program name must be replaced |
| `/reference/pdp` | `src/app/reference/pdp/page.tsx` | `ProductGallery` / `ProductBuyBox` / … | `product-detail-page.spec.md` | **partial** | The most content-incomplete route by the spec's own admission: `ProductAccordions` are placeholder lines (no real ingredient/FAQ copy); `ProductReviews` cards use originally-written placeholder copy, not real reviews (correct choice — real reviews are UGC/out of scope — but still not "real content"); gallery's "video" thumbnail is a static-image approximation (no real video); buy-box CTA bar isn't actually sticky; description/"clinically proven" copy is paraphrased, not verbatim; "Reviews with Images" gallery omitted entirely. Layout renders correctly (confirmed live: gallery, accordions, trust badges, rating bars all display as specified). | Yes — 5 new + reused category/homepage images; real price/loyalty-point math | Layout pattern strongly reusable (gallery/buy-box/accordion/reviews/related shape) but needs a full content pass regardless of rebrand — this isn't rebrand-blocked work, it's unfinished work |
| `/reference/register` | `src/app/reference/register/page.tsx` | `RegisterForm` | `register.spec.md` | **complete** | No real account creation is intentional/by design. All 6 validation error strings were verified live by actually submitting the real form. Phone-number field is a deliberately simplified static approximation of a 3rd-party widget (documented, avoids hotlinking `flagcdn.com`). Country list is a real but short 15-country list, not full ISO — documented as intentional. Visually confirmed live, no defects. | Yes — shared chrome only; no product imagery | Highly reusable as-is — country/phone list would need to be rescoped to HH/LPM's actual markets, but the form shape is generic |
| `/reference/search` | `src/app/reference/search/page.tsx` | `SearchResultsView` | `search-results.spec.md` | **has mock/unverified behavior** | Spec explicitly flags: the "Try query" toggle buttons are a **reference-only affordance** not present on the live site (live page has no client-side search toggle); category-pill duplication is a kept-as-observed live-site quirk, not a bug; true sub-955px phone rendering was never screenshotted live (only inferred from the live page's own Tailwind classes at 955px+). Visually re-confirmed live in this session (both states, 3 breakpoints), no new defects found. | Yes — 4 new + reused category images | Pattern reusable (sidebar summary + category pills + product grid) — toggle UI itself should be dropped/replaced with real search wiring in production |

**Missing spec:** none — all 9 routes have at least one matching spec file. (Two routes are covered by two specs each: category by `category-listing.spec.md` + `product-card-your-selection.spec.md`; the shared `Header`/`Footer`/`PermanentBenefits` chrome used by all 9 routes has its own separate specs: `header.spec.md`, `footer.spec.md`.)

## 2. Cross-cutting viewport-verification gap

Every spec that discusses responsive behavior (`login`, `search`, `brand-story` implicitly) notes the same limitation: this environment's browser automation has a platform-enforced minimum window width (observed at ~896–1223px across sessions, never a true <768px phone width). **None of the 9 routes have ever been visually verified at true phone width in this project.** Mobile-first Tailwind classes were written by inference from the live site's own markup, not confirmed by screenshot. This is a systemic gap, not specific to any one route — flagged once here rather than repeated 9 times in the table above.

## 3. Shared chrome (used by all 9 routes)

`Header`, `Footer`, and `PermanentBenefits` (reused by brand-story/diagnosis/offers) are unmodified across every route audited — confirmed via `git show --stat` on the commit that introduced them: no route's spec touched another route's files except one documented, intentional case (`register`'s creation wired a real `Link` from `login`'s "Register today" button, noted in `register.spec.md`). `src/app/page.tsx` (homepage) has never been touched by any `/reference/*` work.

The shared chrome is itself fully Caudalie-branded: `LogoIcon` renders the literal "CAUDALIE" wordmark, the entire site loads 5 custom `Caudalie-*.woff2` font files as the `--font-sans`/`--font-light`/`--font-bold` tokens, and `--primary: #2d1946` is Caudalie's exact brand purple hard-mapped to the generic-sounding `primary` design token used everywhere.

## 4. Conclusions

### 4.1 Đã đủ UI reference để bắt đầu rebrand Hoàng Hà/LPM chưa?

**Có, đủ để bắt đầu — nhưng chưa "plug-and-play".** Bộ 9 route hiện tại phủ đủ một luồng e-commerce lõi (trang chủ + category + PDP + cart + search + login/register + 2 landing hub + brand story), đủ rộng để bắt đầu giai đoạn thiết kế token/rebrand song song với việc dọn nốt phần dở. Trước khi dùng làm nền production cho HH/LPM, cần xử lý 3 việc không phụ thuộc rebrand:
1. Sửa 2 lỗi thật vừa phát hiện (overlap ở `brand-story`, lỗi chính tả ở `diagnosis`).
2. Hoàn thiện phần nội dung còn placeholder ở `pdp` (accordions/FAQ/reviews) — đây là việc còn dang dở, không phải việc do rebrand sinh ra.
3. Làm một lượt visual QA thật ở mobile width (khoảng cách hiện tại của toàn bộ 9 route, xem mục 2).

### 4.2 Component nào nên giữ pattern

- **Cart drawer** (`CartDrawer`) — cấu trúc slide-in bên phải, qty stepper, order-summary thu gọn: tổng quát, không gắn chặt Caudalie.
- **Auth forms** (`LoginView`/`SignInForm`/`ForgotPasswordForm`/`RegisterForm`) — form shape, validation UX (inline error, show/hide password, in-place view swap) rất generic, ít phụ thuộc thương hiệu nhất trong toàn bộ 9 route.
- **Category grid shell** (`CategoryBreadcrumb`, `ProductFilterDrawer`, `ProductGrid`) — breadcrumb, responsive grid, filter-drawer shell tái dùng tốt cho bất kỳ catalog nào.
- **PDP layout shape** (gallery + buy-box + accordion + reviews + related) — cấu trúc tổng thể tốt, chỉ cần lấp nội dung thật.
- **2-cột "colored card" pattern** (`diagnosis`/`offers`) — image/text split card, dùng được cho bất kỳ landing/campaign hub nào, chỉ cần bảng màu và taxonomy riêng của HH/LPM.
- **Search results shell** (sidebar summary + category pills + product grid) — tái dùng tốt, chỉ cần bỏ toggle UI (vốn không phải hành vi thật) và nối search thật.

### 4.3 Phần nào phải thay toàn bộ (gắn chặt Caudalie asset/copy/font/logo)

- **Font:** 5 file `Caudalie-*.woff2` (`src/app/fonts/`) + các biến `--font-caudalie*` trong `globals.css`/`layout.tsx`.
- **Logo:** `LogoIcon` (wordmark "CAUDALIE") trong `Header`.
- **Màu thương hiệu:** `--primary: #2d1946` — đúng màu tím Caudalie, đang gắn cứng vào token `primary` dùng toàn hệ thống.
- **Copy chương trình khách hàng thân thiết:** chuỗi "MYCAUDALIE" xuất hiện rải rác trong `Footer`, `CartDrawer`, `OffersView`, `pdp` (loyalty points) — cần quyết định tên chương trình của HH/LPM rồi thay toàn bộ.
- **Toàn bộ ảnh + dữ liệu sản phẩm thật** (~50 ảnh đã tải: category 12, diagnosis 10, offers 9, brand-story 9, pdp 5, search 4) — 100% catalog Caudalie, không tái sử dụng được, phải thay bằng ảnh/giá/tên sản phẩm thật của HH/LPM.
- **Nội dung `brand-story`** — toàn bộ là lịch sử thương hiệu Caudalie (nhà sáng lập, mốc thời gian, nguồn gốc tên "KODALI", vườn nho Bordeaux) — không chuyển đổi được, phải viết lại hoàn toàn theo câu chuyện của HH/LPM (giữ được khung timeline/editorial-block).
- **Bảng màu × collection của `diagnosis`** — 10 màu được lấy mẫu trực tiếp gắn với tên dòng sản phẩm Caudalie (Premier Cru, Vinoperfect, VinoHydra...) — cần một taxonomy vấn đề-da/dòng-sản-phẩm riêng của HH/LPM.
- **Mã khuyến mãi của `offers`** (`SUMMER`, `SUN49`) và toàn bộ copy campaign — đặc thù chiến dịch Caudalie.

### 4.4 Đề xuất lộ trình chuyển sang HH/LPM production UI

1. **Phase 0 — Dọn nợ kỹ thuật trên chính reference:** sửa lỗi overlap ở `brand-story`, lỗi chính tả ở `diagnosis`, và tìm cách QA thật ở mobile width thật (< 768px) — công cụ browser automation hiện tại bị giới hạn ~896px, cần thiết bị/thiết lập khác để xác nhận.
2. **Phase 1 — Design tokens:** thay font (`layout.tsx` + `fonts/`), logo (`LogoIcon`), bảng màu (`globals.css`) — đây là các điểm thay đổi tập trung, đã được cô lập tốt theo convention Tailwind/shadcn hiện tại của repo.
3. **Phase 2 — Copy & chương trình khách hàng thân thiết:** thay toàn bộ chuỗi "MYCAUDALIE"/"Caudalie", đặt tên chương trình loyalty của HH/LPM, viết lại nội dung `brand-story` theo câu chuyện thật.
4. **Phase 3 — Dữ liệu thật:** thay toàn bộ ảnh/giá/danh mục sản phẩm mẫu (category, PDP, search, cart, offers) bằng catalog thật của HH/LPM; xây taxonomy vấn đề-da mới cho `diagnosis`.
5. **Phase 4 — Hoàn thiện nội dung còn dang dở:** lấp `ProductAccordions`/FAQ/ingredient thật ở PDP, chính sách đổi trả/review thật, danh sách quốc gia/mã điện thoại thật ở `register` (hiện chỉ có 15 nước mẫu).
6. **Phase 5 — Nối chức năng thật:** hiện toàn bộ 9 route là UI tĩnh với state giả (không có auth thật, cart không persist, filter/sort không hoạt động, search không có backend) — cần nối API/thanh toán/thành viên thật trước khi lên production.
7. **Phase 6 — QA responsive đầy đủ trên thiết bị thật** trước khi launch, bù lại khoảng trống ở mục 2.

---
*Report được tạo tự động qua audit code + spec + live browser check, không sửa bất kỳ file UI nào (đúng yêu cầu). Chờ duyệt trước khi tiến hành sửa lỗi hoặc bước tiếp theo.*
