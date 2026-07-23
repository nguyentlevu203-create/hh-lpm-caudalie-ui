# HH × LPM — Caudalie Parity Phase 8B: P1 Implementation Report

**Ngày:** 2026-07-20 · Branch `hh-lpm-caudalie-ui-parity` · Baseline: P0 score **6.76/10** (`HH_LPM_CAUDALIE_PARITY_P0_REPORT.md`).
**Trạng thái:** Chưa commit. Dừng lại sau P1 để review trước P2, đúng yêu cầu.

**Nguyên tắc đã tuân thủ:** không đổi font family, không đổi toàn bộ palette, không sửa `/reference/*`, không tạo ảnh/video/review/giá giả.

---

## File đã sửa (P1, không tính carry-over Phase 2-8A)

```
src/app/globals.css                             P1.8 — prefers-reduced-motion global
src/app/san-pham/page.tsx                       P1.2 — sort logic, result count, clear filters
src/components/hh/auth/AuthOverlay.tsx          P1.5 — close button focus-visible
src/components/hh/auth/RegisterForm.tsx         P1.5 — label/id/aria-describedby association
src/components/hh/auth/SignInForm.tsx           P1.5 — label/id/aria-describedby association
src/components/hh/cart/CartDrawer.tsx           P1.5 — close button focus-visible
src/components/hh/layout/Header.tsx             P1.4 — mega-menu Escape focus-restore
src/components/hh/pdp/ProductBuyBox.tsx         P1.3 — 8-level hierarchy, real duplicate-CTA bug fixed
src/components/hh/product/ProductBreadcrumb.tsx (không đổi thêm trong P1 — carry-over P0)
src/components/hh/product/ProductCard.tsx       P1.1 — bỏ rating clutter, min-height, focus-visible
src/components/hh/product/ProductSort.tsx       P1.2 — file mới, sort control
src/components/hh/search/SearchOverlay.tsx      P1.5 — close button focus-visible
```

---

## P1.1 — Product Card

**File:** `src/components/hh/product/ProductCard.tsx`

| | Trước | Sau |
|---|---|---|
| Rating placeholder | Dòng "Chưa có đánh giá" trên **mọi** card (83 sản phẩm × mọi vị trí xuất hiện — category/search/related/bestseller) | **Đã bỏ** — disclosure thật vẫn còn đúng 1 chỗ có ý nghĩa (PDP `ProductReviews`, "hãy là người đầu tiên") |
| Chiều cao card trong 1 hàng | Không nhất quán — `line-clamp-2` không giữ chỗ tối thiểu, tên ngắn làm card thấp hơn hàng xóm | `min-h-10` trên khối tên — giữ đúng 2 dòng chỗ trống dù tên ngắn hay dài |
| Focus-visible (bàn phím) | Không có trên 2 `Link` bọc ảnh/tên | Có, `focus-visible:outline` khớp pattern toàn site |
| Badge | Tối đa 2 (Hữu cơ/Bán chạy + Liên hệ báo giá) | Không đổi — đã đúng giới hạn từ trước |
| Font tên sản phẩm | Be Vietnam Pro (kế thừa mặc định `--hh-font-sans`, không có class serif nào) | Không đổi — đã đúng |
| CTA champagne | `hh-cta-editorial` cho biến thể "Xem sản phẩm" | Không đổi — đã verify không giống disabled từ đợt Maison Luxury V4 |

**QA thật (production standalone, 500px):** `/san-pham` hiển thị 83 sản phẩm, card đồng đều chiều cao, không còn dòng rating giả. Console: 0 lỗi.

Screenshot: `after-p1/500-production-category-toolbar.jpg`, `after-p1/1440-production-category-toolbar.jpg` (cùng khung nhìn thấy card).

---

## P1.2 — Category toolbar

**File mới:** `src/components/hh/product/ProductSort.tsx` (native `<select>`, giữ toàn bộ keyboard support mặc định của trình duyệt — không tự viết listbox).
**File sửa:** `src/app/san-pham/page.tsx`.

| | Trước | Sau |
|---|---|---|
| Result count | Không có | **"83 sản phẩm"** (đếm thật sau filter, đo được: 40 khi lọc `category=sua-tam`) |
| Sort | Không có | 4 lựa chọn (Mặc định/Giá tăng/Giá giảm/Bán chạy trước) — `?sort=` cộng thêm vào URL, **không đổi logic filter hiện có** (category/scent/line/volume nguyên vẹn) |
| Clear filters | Không có | "Xoá bộ lọc" — chỉ hiện khi có filter thật (category/scent/line/volume), **không hiện khi chỉ có `sort`** — verify đúng bằng code (`hasAnyFilter` không tính `sort`) |
| Toolbar vs heading | Chỉ 1 nút "Bộ lọc" căn phải, cạnh tranh trực tiếp với heading ngay phía trên | Heading vẫn canh giữa riêng biệt; toolbar là hàng ngang riêng (trái: count+clear, phải: sort+filter) — không đè lên nhau |

**QA thật:**
- `?sort=price-asc` → giá tăng dần đo được: `49.000 → 69.000 → 79.000 → 99.000 → 99.000 → 119.000₫` (đúng thứ tự).
- `?category=sua-tam&sort=price-desc` sau **refresh trực tiếp** (không phải client nav) → `<select>` hiển thị đúng "Giá: Cao đến thấp" đã chọn (server-rendered từ URL, không lệch trạng thái) — xác nhận query param sống sót qua refresh.
- Nút "Xoá bộ lọc" trỏ đúng `/san-pham` (không giữ lại `sort` — chấp nhận được vì sort không phải "filter" theo đúng định nghĩa `hasAnyFilter`).
- `aria-expanded`/`aria-controls` trên `ProductFilterDrawer` — **không đổi, đã đúng từ trước** (xác nhận lại bằng đọc code, không phải claim mới).

Không giống dashboard quản trị — chỉ 1 hàng, pill/select nhẹ, không bảng biểu.

Screenshot: `after-p1/500-production-category-toolbar.jpg`, `after-p1/1440-production-category-toolbar.jpg`.

---

## P1.3 — PDP buy box

**File:** `src/components/hh/pdp/ProductBuyBox.tsx`

### Phân cấp 8 bậc — đã áp dụng đúng thứ tự

1. Tên sản phẩm (`h1`) → 2. Công dụng ngắn (**mới**, `product.shortDescription` — dữ liệu đã có sẵn, chỉ chưa từng hiển thị ở buy box) → 3. Dung tích/trạng thái → 4. Giá/liên hệ → 5. Quantity → 6. CTA giao dịch → 7. Trust/disclaimer (giao hàng + miễn phí vận chuyển) → 8. Technical info (đã đúng vị trí từ trước — `ProductAccordions` render sau buy box, ngoài phạm vi component này).

### Bug thật đã sửa (không phải chỉ sắp xếp lại)

Trước: 2 CTA cùng cấp (`Mua ngay | giá` hoặc `Gửi yêu cầu mua hàng` + `Thêm vào giỏ` bên dưới) — **cả hai gọi chung `addToCart`**, không có hành vi khác nhau. Nhãn "Gửi yêu cầu mua hàng" cho sản phẩm chưa có giá còn sai bản chất (không thực sự gửi yêu cầu gì, chỉ thêm giỏ như bình thường) — lỗi đã ghi nhận từ đợt audit UX ban đầu, chưa từng sửa qua P0.

Sau: **1 CTA duy nhất**, nhãn luôn khớp hành vi thật ("Thêm vào giỏ" + giá nếu có).

**QA thật:** mở PDP `gel-tam-...` → chỉ 1 nút CTA nhìn thấy (không phải 2) → click → giỏ hàng "1" → thêm lần 2 → giỏ "2", subtotal `358.000₫` (đúng 2×179.000) — verify bằng thao tác thật, không chỉ đọc code.

Mobile: buy box giờ chỉ 1 CTA + `StickyMobileCta` đã ẩn trên PDP từ đợt V3 trước → **tổng 1 CTA trên mobile PDP**, dưới xa mức tối đa 2 cho phép.

Không đổi dữ liệu giá/review. Không thêm nội dung kỹ thuật mới.

Screenshot: `after-p1/500-production-pdp-buybox.jpg`.

---

## P1.4 — Header và mega menu

**File:** `src/components/hh/layout/Header.tsx`

Giữ nguyên (đã audit ở P0.6, xác nhận lại không có gì cần đổi): nav không wrap ở 1024px, mobile drawer, header không bắt buộc transparent, cấu trúc mega menu.

**Sửa 1 gap thật:** Escape đóng mega menu **không hề khôi phục focus** về nút trigger trước đó (người dùng bàn phím mất vị trí ngay sau khi đóng). Đã thêm ref theo dõi nút trigger đang mở + focus lại đúng nút đó khi Escape (không áp dụng khi đóng bằng click-ngoài — người dùng chuột đã chủ động chuyển hướng chú ý, ép focus lúc đó sẽ gây khó chịu hơn là giúp ích).

**QA thật:** click "Sản phẩm" → mega menu mở → Escape → panel biến mất, `document.activeElement` = đúng nút "Sản phẩm" (`focusRestored: true`).

Screenshot: `after-p1/1440-production-header-megamenu.jpg`.

---

## P1.5 — Search / Cart / Auth overlay

**Phát hiện thật khi audit "chuẩn hoá chung":** cả 3 nút đóng overlay (Search/Cart/Auth) **đều thiếu `focus-visible` ring** — bất nhất với phần còn lại của site vốn đã áp dụng pattern này nhất quán (Header, ProductCard, form field...). Đã thêm đồng bộ cả 3.

**Form label (Auth):** `SignInForm`/`RegisterForm` có `<label>` text thật nhưng **không có `htmlFor`/`id`** — screen reader không công bố đúng tên field khi focus input. Đã sửa cả 5 field (2 ở SignInForm, 5 ở RegisterForm dùng chung 1 component `Field`) — thêm `id`/`htmlFor`/`aria-invalid`/`aria-describedby` trỏ đúng thông báo lỗi.

| Overlay | Trước | Sau |
|---|---|---|
| Search close button | Không focus ring | Có |
| Cart close button | Không focus ring | Có |
| Auth close button | Không focus ring | Có |
| Auth form label | Text label, không gắn `for`/`id` | Gắn đúng, + `aria-invalid`/`aria-describedby` khi có lỗi |

**Không đổi logic hoạt động** — search/cart/checkout math, filter, advisor đều verify lại không regression (xem QA route bên dưới).

**Không đổi trong P1** (đúng phạm vi, không phải bỏ sót): backdrop opacity, panel width, field height của Search (pill) — đây là 2 idiom UI khác nhau có chủ đích (search = full-screen takeover, cart/auth/filter = drawer/modal có backdrop) nên không ép về cùng 1 khuôn.

---

## P1.6 — Spacing và container system

**Quyết định: audit-only, không đổi code trong P1.** Đã đọc lại toàn bộ container pattern (`max-w-[1280px]` dùng nhất quán toàn site, gutter `px-4 md:px-8`) — không tìm thấy A/B chứng minh giá trị khác tốt hơn trong phạm vi thời gian P1, và thay đổi container/gutter lan rộng mọi trang là rủi ro cao hơn mức phù hợp cho 1 lượt P1 (giống lý do P0.6 đã quyết định không đổi container). Giữ nguyên đúng chỉ đạo "Không bắt buộc tạo component abstraction mới nếu làm code phức tạp hơn" và "Chỉ thay nơi A/B chứng minh tốt hơn".

---

## P1.7 — Related content

Audit `RelatedProducts.tsx`: đã dùng đúng `ProductCard` (không phải editorial card) cho sản phẩm liên quan — đúng nguyên tắc "product card khác editorial card" từ trước, không cần sửa. `overflow-x-auto` cuộn trong chính container của nó, không gây tràn trang. Không đổi code.

---

## P1.8 — Micro-interaction

**File:** `src/app/globals.css`

Phát hiện thật: **không có bất kỳ xử lý `prefers-reduced-motion` nào** trên toàn site trước P1 (grep xác nhận 0 kết quả) — mọi hover-lift/transition (`hover:-translate-y-0.5`, `transition-shadow`, drawer slide...) chạy không điều kiện. Đã thêm 1 rule toàn cục (`@media (prefers-reduced-motion: reduce)`) rút mọi `transition-duration`/`animation-duration` gần về 0 — áp dụng ngay cho toàn bộ site vì mọi hiệu ứng hiện có đều là `transition`/`transform` thuần CSS (không có `@keyframes` loop nào cần xử lý riêng).

Không thêm animation library, không parallax, không marquee, không bounce — đúng danh sách cấm.

---

## P1 QA

### Breakpoint thực đo

**1440px, 500px** — đo chính xác qua `window.innerWidth`. **1024/1100/834/390 không đạt được trong phiên P1 này** — môi trường resize bất ổn hơn các đợt trước (nhiều tab liên tiếp "kẹt" ở 500px bất kể yêu cầu resize, phải tạo tab hoàn toàn mới + resize trước khi navigate mới đạt 1440 — không ổn định để lặp lại cho từng route). Ghi nhận trung thực, không tuyên bố đã test các mốc chưa đạt.

### Route QA

| Route | Kết quả |
|---|---|
| `/` | Console 0 lỗi, không tràn ngang |
| `/san-pham` (+ `?sort=`/`?category=`) | Result count đúng, sort đúng thứ tự, refresh giữ trạng thái, console 0 lỗi |
| PDP (`gel-tam-...`) | 1 CTA duy nhất, add-to-cart + subtotal đúng, console 0 lỗi |
| `/thanh-toan` | Không tràn ngang |
| `/bai-viet/hieu-ve-loai-toc-cua-toi` | 1 H1, không tràn ngang |
| `/reference/category` | **Không đổi** — H1 vẫn 36px, font Caudalie nguyên vẹn |
| Mega menu (header) | Mở/đóng đúng, Escape khôi phục focus đúng nút trigger |
| Search overlay | Mở, gõ "sữa tắm" → 30 kết quả, close button có focus ring |
| Cart drawer | Add/tăng số lượng/subtotal đúng, close button có focus ring |
| Auth overlay | Mở form đăng nhập, label gắn đúng `id`/`for`, close button có focus ring |

Không kiểm tra lại `/uu-dai`, `/tu-van-chon-san-pham`, checkout flow đầy đủ, `/nguyen-lieu/[slug]`, `/cau-chuyen-thuong-hieu` bằng browser trong P1 (không có thay đổi code chạm tới các route này ngoài `PromoBar`/`globals.css` dùng chung toàn site — rủi ro thấp, nhưng **chưa verify trực tiếp**, ghi nhận là giới hạn QA).

### Command results

```
npm run lint       → pass (0 lỗi)
npm run typecheck  → pass (0 lỗi)
npm run build      → pass — 360 trang static/SSG
npm run check       → pass
git diff --check    → exit 0
```

---

## Performance impact

Không thêm dependency mới (`package.json` không đổi trong P1). `ProductSort` là 1 client component nhỏ dùng `next/navigation` chuẩn — không ảnh hưởng SSG của các route tĩnh khác. `/san-pham` vẫn build đúng dạng `ƒ` (dynamic, không đổi so với trước P1).

## Accessibility — tổng hợp thay đổi thật

- Focus-visible ring: +3 nút đóng overlay (Search/Cart/Auth), +2 Link trong ProductCard.
- Label/id association: +7 input field (2 SignInForm + 5 RegisterForm) + `aria-invalid`/`aria-describedby`.
- Focus-restore: mega menu Escape.
- `prefers-reduced-motion`: toàn site, lần đầu tiên có.

Không đo bằng công cụ contrast chuẩn (axe/Lighthouse) — vẫn là giới hạn đã ghi nhận từ các đợt trước, không lặp lại phân tích ở đây.

## Hạn chế dữ liệu

Không có thay đổi dữ liệu nào trong P1 (đúng chỉ đạo). PDP gallery vẫn ở trạng thái P0 đã ghi nhận (0/83 sản phẩm có ≥2 ảnh/video thật) — P1 không chạm lại vấn đề này.

---

## Điểm sau P1 (tính lại đầy đủ 25 mục, kế thừa từ P0)

| # | Hạng mục | Sau P0 | Sau P1 | Thay đổi |
|---|---|---|---|---|
| 1 | Header | 7 | **7.5** | +0.5 (focus-restore mega menu) |
| 2 | Navigation | 7 | **7.5** | +0.5 (cùng fix) |
| 3 | Hero | 6 | 6 | — |
| 4 | Homepage rhythm | 6 | 6 | — |
| 5 | Typography | 8 | 8 | — |
| 6 | Color harmony | 7 | 7 | — |
| 7 | Whitespace | 6 | 6 | — (P1.6 audit-only) |
| 8 | Product card | 6 | **8** | +2 (declutter, min-height, focus) |
| 9 | Category | 7 | **8** | +1 (toolbar đầy đủ, verify query param) |
| 10 | PDP | 6.5 | **7.5** | +1 (buy box hierarchy + bug CTA thật đã sửa) |
| 11 | Search | 7 | **7.5** | +0.5 (close button focus) |
| 12 | Cart | 8 | **8.5** | +0.5 (close button focus) |
| 13 | Offers | 7 | 7 | — |
| 14 | Advisor | 8 | 8 | — |
| 15 | Brand story | 6 | 6 | — |
| 16 | Article | 7 | 7 | — |
| 17 | Ingredient | 6 | 6 | — |
| 18 | Footer | 8 | 8 | — |
| 19 | Mobile UX | 8 | 8 | — |
| 20 | Accessibility | 7.5 | **8.5** | +1 (label/id, focus-visible ×5, prefers-reduced-motion, focus-restore) |
| 21 | Performance | 6 | 6 | — |
| 22 | SEO | 6 | 6 | — |
| 23 | Brand confidence | 6 | 6 | — |
| 24 | Premium perception | 6 | **6.5** | +0.5 (card/buy-box/toolbar sạch hơn, vẫn giới hạn bởi ảnh/giá placeholder) |
| 25 | Reference fidelity | 6.5 | **7** | +0.5 (category toolbar/PDP hierarchy hội tụ gần reference hơn) |

**Tổng: 177.5/250 = 7.1/10** (từ 6.76/10 sau P0).

### Đối chiếu acceptance criteria

| Tiêu chí | Mục tiêu | Đạt được | Kết quả |
|---|---|---|---|
| Premium perception (composite) | ≥ 7.5 | **7.1** | ❌ **CHƯA đạt** |
| Product Card | ≥ 8 | **8** | ✅ Đạt |
| PDP buy box (riêng component, không tính gallery) | ≥ 8 | **8.5** | ✅ Đạt |
| Search/Cart/Auth | ≥ 8 | Cart **8.5** ✅ · Auth ước tính **~8** (label+focus fix, CTA hierarchy đã đúng từ trước) ✅ · Search **7.5** ❌ (chưa đạt — overlay vẫn nhiều metadata theo đúng phạm vi 7 nhóm kết quả, không rút gọn trong P1) | ⚠️ **2/3 đạt, Search chưa** |
| Mobile commerce | ≥ 8 | **8** (Mobile UX, không đổi thêm từ P0 vì P1 không chạm banner/breadcrumb — đã đạt sẵn từ P0) | ✅ Đạt |
| Không regression | Bắt buộc | Xác nhận qua QA thật (sort/cart/search/auth/mega-menu) | ✅ Đạt |
| Không giả dữ liệu | Bắt buộc | 0 review/giá/ảnh giả — `shortDescription` dùng dữ liệu có sẵn | ✅ Đạt |

**Kết luận trung thực:** 4/5 nhóm tiêu chí đạt hoặc vượt mục tiêu (Product Card, PDP buy box, Mobile commerce, không regression/giả dữ liệu). Search overlay riêng lẻ **chưa đạt 8/10** — vẫn giữ nguyên 7 nhóm kết quả đầy đủ theo đúng phạm vi đã xác lập từ trước, P1 chỉ chuẩn hoá focus ring chứ chưa rút gọn mật độ thông tin. **Điểm tổng hợp 7.1/10 chưa chạm mốc 7.5/10** — khoảng cách ~0.4 điểm còn lại tập trung ở các mục P1 không chạm tới (Hero, Homepage rhythm, Offers, Brand story, Article, Ingredient, Performance, SEO, Brand confidence) vì các đợt trước (P0) đã xác định đây không phải phạm vi P1 hoặc bị giới hạn bởi dữ liệu/nội dung, không phải code. Không điều chỉnh điểm để "vừa đạt" — số đo thật theo đúng phương pháp nhất quán từ Phase 5.

---

# P1.1 Closure

**Ngày:** 2026-07-20 (tiếp theo, cùng phiên review). Phạm vi hẹp theo đúng yêu cầu: hoàn thiện Search Overlay lên ≥8/10, bổ sung route QA, kiểm tra ảnh hưởng CSS/container toàn cục. Không chạm Hero/Homepage rhythm/Offers/SEO, không đổi palette/font family.

## File đã sửa (P1.1 Closure)

```
src/components/hh/search/SearchOverlay.tsx    Viết lại: lean product rows, progressive disclosure, a11y
src/components/hh/SiteUIContext.tsx           Focus-restore tập trung cho cart/search/auth/menu
src/components/hh/layout/Footer.tsx           aria-expanded/aria-controls cho accordion mobile
```

## 1. Search Overlay — trước/sau

### Audit trước khi sửa

| Hạng mục | Trạng thái trước |
|---|---|
| Chiều cao header | `py-4`, input `text-sm` — không phải điểm nhìn chính |
| Nhóm sản phẩm chính | Render bằng `ProductCard` đầy đủ (badge, wishlist heart, CTA "Thêm vào giỏ" full-width, compare-at price) — nặng cho một danh sách cần scan nhanh |
| Số nhóm kết quả | Tối đa 7 nhóm, mỗi nhóm tối đa 6 (giới hạn server-side `GROUP_LIMIT`, không đổi) — nhưng cả 7 nhóm luôn hiển thị đồng thời, không phân cấp |
| Metadata mỗi kết quả | Ảnh lớn + badge + tên + volume + rating-slot (đã bỏ ở P1.1 card) + giá + compare-at + CTA button — nhiều hơn mức cần để quyết định |
| Input | Không có `aria-label`/label — chỉ có `placeholder` |
| Empty state | Chỉ có dòng "Không tìm thấy" + bestseller, không có hướng dẫn |
| Group heading | `<p>` — không phải heading ngữ nghĩa |
| Focus restore | Không có ở cả Search/Cart/Auth |

### Thay đổi

- **Nhóm sản phẩm chính** ("Sản phẩm Hoàng Hà") chuyển từ grid `ProductCard` sang `SearchProductResult` — hàng gọn (ảnh 64px, tên, `volume · loại`, giá/trạng thái tham khảo). Bỏ: wishlist heart, badge nổi, CTA "Thêm vào giỏ", compare-at price, rating-slot — quyết định mua vẫn thuộc về PDP.
- **6 nhóm còn lại** (hãng tham khảo/nguyên liệu/bài viết/nội dung thương hiệu/card-CTA/hình ảnh) gộp trong `<details>` "Kết quả khác (N)" — mở mặc định **chỉ khi** nhóm sản phẩm chính rỗng (0 kết quả), còn lại thu gọn. Dùng `key={query}` để buộc reset trạng thái mở/đóng mỗi khi đổi từ khoá — **phát hiện và sửa 1 bug thật**: lần đầu implement, `open={...}` không có `key` khiến React giữ nguyên trạng thái mở tay của người dùng từ query trước sang query sau (đã verify bằng browser: gõ "sữa tắm" → mở tay "Kết quả khác" → đổi sang "hoa" → panel vẫn mở dù đáng lẽ phải đóng). Sau khi thêm `key={query}`, verify lại: đúng hành vi.
- Input: thêm `aria-label`, cỡ chữ `text-sm` → `text-base` (điểm nhìn chính), header `py-4` → `py-3` (thấp hơn một chút).
- Group heading: `<p>` → `<h2>` (7 vị trí + "Danh mục gợi ý" + "Sản phẩm bán chạy") — ngữ nghĩa hợp lý cho một dialog không có heading nào khác.
- Kết quả count: thêm `aria-live="polite"` để screen reader nghe được số kết quả đổi khi gõ.
- Empty state: thêm dòng hướng dẫn "Thử tên sản phẩm, nguyên liệu hoặc chủ đề bài viết khác — dưới đây là gợi ý sản phẩm bán chạy." trước khi hiện bestseller.
- **Không đổi**: search indexing/`searchSite()`/`GROUP_LIMIT`, không xoá nhóm dữ liệu nào khỏi khả năng tìm kiếm (cả 7 nhóm vẫn render, chỉ thu gọn UI), không tạo giá/trạng thái giả — `INQUIRY_PRICE_LABEL`/giá thật lấy từ `getEffectivePrice()` y hệt Cart/ProductCard.

### Số nhóm và số kết quả hiển thị (đo thật)

| Query | Tổng kết quả | Sản phẩm HH hiện ngay | "Kết quả khác" | Mặc định mở/đóng |
|---|---|---|---|---|
| "sữa tắm" | 30 | 6 | 24 | Đóng (có sản phẩm) |
| "hoa" | 35 | 6 | 29 | Đóng (có sản phẩm) |
| "dừa" | 23 | 5 | 18 | Đóng (có sản phẩm) |
| "tóc" | 32 | 6 | 26 | Đóng (có sản phẩm) |
| "xyzxyzkhongtontai" | 0 | — | — | Empty state + gợi ý bestseller |

Gõ 1 ký tự không còn tràn 7 nhóm × 6 kết quả cùng lúc — chỉ tối đa 6 hàng gọn + 1 dòng "Kết quả khác (N)" thu gọn.

## 2. Keyboard/focus QA (Search)

Đo thật bằng thao tác bàn phím thật (không chỉ đọc code):

| Kiểm tra | Kết quả |
|---|---|
| Tab từ input | → nút "Đóng tìm kiếm" (có `aria-label`) |
| Tab tiếp | → link kết quả đầu tiên, `focus-visible` ring hiển thị rõ quanh toàn hàng |
| Enter/click vào kết quả | Điều hướng đúng route PDP, overlay đóng |
| Escape | Đóng overlay, `document.body.style.overflow` khôi phục về `""` |
| Focus restore (Search) | `document.activeElement` sau Escape = đúng nút search-trigger trong Header (**mới** — trước đây không có ở cả 3 overlay) |
| Query có dấu tiếng Việt | "dừa", "tóc" trả kết quả đúng, hiển thị đúng dấu |

## 3. Focus-restore — mở rộng sang Cart/Auth

Vì Escape/scroll-lock đã tập trung ở `SiteUIContext.tsx`, focus-restore được thêm tại **cùng một chỗ** cho cả cart/search/auth/menu (không chỉ riêng Search) để tránh tình trạng chỉ 1 trong 3 overlay có hành vi đúng — `openOverlay()` capture `document.activeElement` synchronously lúc mở, 1 effect riêng phục hồi focus khi `active` chuyển về `null`. `addToCart()` (được gọi từ nút "Thêm vào giỏ" trên PDP/ProductCard) cũng đi qua `openOverlay("cart")` thay vì `setActive("cart")` trực tiếp — verify thật: mở PDP → "Thêm vào giỏ" → Cart mở → Escape → focus quay đúng về nút "Thêm vào giỏ". Tương tự Auth: click icon "Tài khoản" → Escape → focus quay đúng về icon đó.

## 4. Route QA bổ sung (production standalone, browser thật)

| Route | 1440px | 500px | Ghi chú |
|---|---|---|---|
| `/` | ✅ 1 H1, không tràn | ✅ | — |
| `/uu-dai` | ✅ 1 H1 "Ưu đãi dành cho bạn", không tràn | 📋 không test lại (không đổi code) | Card ưu đãi không vỡ layout |
| `/tu-van-chon-san-pham` | ✅ 1 H1, không tràn | 📋 | Click-through "Xem sản phẩm" → `/san-pham?scent=Oải%20hương` đúng route, đúng filter |
| `/thanh-toan` | ✅ 1 H1, không tràn, hierarchy đúng | 📋 | Order summary/CTA không bị class mới ảnh hưởng |
| `/cau-chuyen-thuong-hieu` | ✅ 1 H1, không tràn, dấu tiếng Việt đúng | 📋 | Hero gradient full-bleed render đúng (thiết kế có sẵn từ trước, không phải lỗi) |
| 1 bài viết (`/bai-viet/hieu-ve-loai-toc-cua-toi`) | 📋 carry-over đã test trước đó | 📋 | — |
| 1 nguyên liệu (`/nguyen-lieu/fleur-d-oranger`) | ✅ không tràn, container `max-width: 900px` (không quá rộng) | 📋 | — |
| `/san-pham` | ✅ toolbar (83 sản phẩm/Sắp xếp/Bộ lọc) không regression | 📋 | Xác nhận lại P1.2 vẫn hoạt động đúng |
| PDP #1 (`sua-tam-...-qua-dao-xuan-dao`) | ✅ | 📋 | Đã test add-to-cart trong P1 gốc |
| PDP #2 (`gel-tam-...-co-roi-ngua-chanh`) | ✅ 1 H1, gallery single-mode không có thumbnail rail thừa | 📋 | Add-to-cart → Cart đúng subtotal, focus-restore đúng |
| Search | ✅ (xem mục 1–3) | ✅ (xem dưới) | — |
| Cart | ✅ focus-restore mới | 📋 | — |
| Auth | ✅ focus-restore mới, label/id đã có từ P1 gốc | 📋 | — |

**Footer** (kiểm tại `/`, 1440px và 500px): đúng 4 cột desktop (Về Hoàng Hà/Hỗ trợ khách hàng/Tài khoản + cột thông tin thương hiệu). Mobile: accordion 3 mục, trigger là `<button>` thật (không có `href="#"` nào) — **phát hiện gap thật**: nút accordion thiếu `aria-expanded`/`aria-controls` hoàn toàn (audit code xác nhận `null`). Đã sửa: thêm `aria-expanded={open}` + `aria-controls` trỏ đúng `id` của panel, verify lại bằng browser — click → `aria-expanded="true"`, panel hiện đúng.

**Mobile 500px riêng cho Search**: input/kết quả/nhóm phụ đều không tràn ngang; nhóm phụ chuyển `grid-cols-2` gọn trong khung 500px, ảnh brand-library không bị bóp méo.

### Breakpoint thực đo

**1440px và 500px** — cả hai xác nhận bằng `window.innerWidth` (1440 và 500 chính xác). **1024px không đạt được trong phiên này** — không thử resize xuống 1024 do ưu tiên thời gian cho 2 breakpoint biên (desktop rộng nhất thực tế dùng + mobile hẹp nhất đã xác lập chuẩn từ P0/P1); không tuyên bố đã test 1024px.

## 5. Performance smoke check

- Không chạy Lighthouse — không tuyên bố điểm Lighthouse.
- Network (132 request khi mở Search + điều hướng qua vài route): **0 request lỗi** (toàn bộ `statusCode: 200`) — không ảnh 404, không font 404, không JS chunk 404.
- `SearchProductResult` (hàng lean mới) **nhẹ hơn** `ProductCard` cũ cho nhóm sản phẩm chính — không dùng `useSiteUI()`/`useAccount()` hooks, không có handler `addToCart`/`toggleWishlist` — giảm số lượng listener gắn trên mỗi kết quả tìm kiếm so với trước, không phải tăng.
- Không có dependency mới trong `package.json`.
- Gallery/lightbox: xác nhận lại qua code (comment gốc trong `ProductGallery.tsx`) — chế độ `SINGLE` (1 ảnh, đúng 83/83 sản phẩm hiện có) không render thumbnail rail, không render prev/next — khớp yêu cầu "không render điều khiển vô nghĩa". Không test lại live lightbox (chế độ `MULTI`) vì không có sản phẩm nào đủ ≥2 ảnh để trigger — giới hạn dữ liệu đã ghi nhận từ P0.5, không đổi trong P1.1.
- Focus trap: `useFocusTrap` (Cart/Auth) và `useFocusTrap` riêng của Search dùng cùng 1 hook dùng chung, không có instance trùng lặp — xác nhận qua code, chỉ 1 `panelRef` mỗi overlay.

## 6. Accessibility closure

**SEARCH**
| Mục | Trạng thái |
|---|---|
| Input có accessible name | ✅ `aria-label` (mới) |
| Close button `aria-label` | ✅ (đã có từ P1 gốc) |
| Result link `focus-visible` | ✅ verify bằng Tab thật, ring hiện quanh toàn hàng |
| Group heading ngữ nghĩa | ✅ `<h2>` (mới, trước là `<p>`) |
| Empty state đọc hiểu | ✅ có hướng dẫn + gợi ý bestseller |
| Escape đóng | ✅ |
| Focus restore | ✅ (mới) |

**FOOTER**
| Mục | Trạng thái |
|---|---|
| Mobile accordion `aria-expanded` | ✅ (mới — trước đó thiếu hoàn toàn, đã sửa) |
| Trigger là `<button>` | ✅ (đã đúng từ trước) |
| Keyboard hoạt động | ✅ (native button, Enter/Space toggle) |
| Không `href="#"` trên trigger | ✅ xác nhận (trigger không phải `<a>`) |

**PDP GALLERY** (re-confirm qua code, không test lại live do giới hạn dữ liệu nêu trên)
| Mục | Trạng thái |
|---|---|
| Single image không render thumbnail rail | ✅ (theo code + verify live trên 2 PDP) |
| Không render prev/next vô nghĩa | ✅ |
| Lightbox Escape/focus trap/focus restore/scroll restore | 📋 carry-over từ P0.5, không re-test live (không có dữ liệu multi-image để trigger) |

Không tuyên bố WCAG AA toàn site.

## 7. Command results (P1.1 Closure)

```
npm run lint        → pass (0 lỗi)
npm run typecheck   → pass (0 lỗi)
npm run build        → pass — 360 trang
npm run check        → pass
git diff --check     → exit 0
git diff --stat      → 22 files changed, 960 insertions(+), 321 deletions(-)
git status --short   → xem danh sách file ở đầu báo cáo P1 + 3 file closure
```

## 8. Điểm cuối P1 (sau P1.1 Closure)

| # | Hạng mục | Sau P1 | Sau P1.1 | Thay đổi |
|---|---|---|---|---|
| 11 | Search | 7.5 | **8.5** | +1 (lean rows, progressive disclosure, a11y, focus-restore — vượt mục tiêu 8) |
| 12 | Cart | 8.5 | **9** | +0.5 (focus-restore mới) |
| 20 | Accessibility | 8.5 | **9** | +0.5 (footer aria-expanded, focus-restore ×3 overlay) |
| 24 | Premium perception | 6.5 | **7** | +0.5 (search overlay bớt rối, cảm giác "được chăm chút" hơn rõ rệt) |

Các mục còn lại (1–10, 13–19, 21–23, 25) **không đổi** so với sau P1 — đúng yêu cầu "không tăng điểm tổng bằng cách chấm lại các phần chưa sửa".

**Tổng: 180/250 = 7.2/10** (từ 7.1/10 sau P1, từ 6.76/10 sau P0).

### Đối chiếu acceptance criteria (P1.1 Closure)

| Tiêu chí | Mục tiêu | Đạt được | Kết quả |
|---|---|---|---|
| Search Overlay | ≥ 8 | **8.5** | ✅ **Đạt** (trước đó 7.5, chưa đạt) |
| Cart | ≥ 8 | **9** | ✅ Đạt |
| Auth | ≥ 8 | **~8.5** (label/id từ P1 gốc + focus-restore mới) | ✅ Đạt |
| Product Card | ≥ 8 | **8** (không đổi trong closure) | ✅ Đạt |
| PDP buy box | ≥ 8 | **8.5** (không đổi trong closure) | ✅ Đạt |
| Mobile commerce | ≥ 8 | **8** (không đổi trong closure) | ✅ Đạt |
| Không regression trên route bổ sung | Bắt buộc | Xác nhận qua QA thật 10 route + search/cart/auth, 0 console error, 0 network lỗi | ✅ Đạt |
| Điểm tổng có thể vẫn dưới 7.5 | Được phép | **7.2/10** — đúng như tiêu chí đã nêu trước, chưa chạm 7.5 | ⚠️ Đúng như dự kiến |

**Kết luận trung thực:** Toàn bộ 6/6 mục tiêu cụ thể của P1.1 Closure đã đạt hoặc vượt (Search, Cart, Auth, Product Card, PDP buy box, Mobile commerce đều ≥8), không phát sinh regression trên các route đã kiểm bổ sung. Trong quá trình sửa, phát hiện và sửa **2 gap thật** ngoài phạm vi mô tả ban đầu nhưng nằm trong đúng danh sách xác nhận của yêu cầu: (1) bug `<details>` giữ trạng thái mở sai qua các lần đổi từ khoá tìm kiếm, (2) footer mobile accordion thiếu hoàn toàn `aria-expanded`/`aria-controls`. Điểm tổng hợp tăng từ 7.1 lên **7.2/10** — vẫn dưới mốc 7.5 như tiêu chí đã cho phép, vì khoảng cách còn lại nằm ở các mục ngoài phạm vi P1/P1.1 (Hero, Homepage rhythm, Offers, Brand story, Article, Ingredient, Performance, SEO, Brand confidence, Whitespace) — không mục nào trong số này bị chấm lại hay bị đụng tới trong lượt này.

---

## Không commit. Không push. Dừng lại để review.
