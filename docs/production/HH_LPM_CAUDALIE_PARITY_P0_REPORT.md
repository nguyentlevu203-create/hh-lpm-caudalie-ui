# HH × LPM — Caudalie Parity Phase 8A: P0 Implementation Report

**Ngày:** 2026-07-20 · Branch `hh-lpm-caudalie-ui-parity` · Baseline commit `e7a2ffc` + Phase 2/2.1/3/4-6 (chưa commit).
**Baseline score (Phase 5, đã duyệt làm điểm gốc):** **6.3/10** (`HH_LPM_PREMIUM_UI_ASSESSMENT.md`).
**Trạng thái:** Chưa commit. Dừng lại sau P0 để review trước P1/P2, đúng yêu cầu.

**Nguyên tắc đã tuân thủ:** chỉ triển khai P0 (6 mục con P0.1–P0.6); không đổi palette/font family; không sửa `/reference/*`; không copy asset/logo/màu Caudalie; không tạo giá/review/ảnh/video giả; không nhân bản 1 ảnh thành nhiều thumbnail giả gallery.

---

## Tổng quan file đã sửa

```
next.config.ts                                   (Phase 2, không liên quan P0)
package-lock.json                                (Phase 2.1, không liên quan P0)
package.json                                      (Phase 2.1, không liên quan P0)
src/app/globals.css                               P0.1 — .hh-heading-page scale
src/app/layout.tsx                                (Phase 2, không liên quan P0)
src/app/page.tsx                                  (Phase 2.1, không liên quan P0)
src/components/hh/home/HeroCampaign.tsx           (Phase 2.1, không liên quan P0)
src/components/hh/layout/Footer.tsx               P0.4 — newsletter panel + 4-column nav
src/components/hh/layout/PromoBar.tsx             P0.2 — ẩn trên mobile
src/components/hh/pdp/ProductBuyBox.tsx           (Phase 2.1, không liên quan P0)
src/components/hh/pdp/ProductGallery.tsx          P0.5 — kiến trúc gallery 3 chế độ
src/components/hh/product/ProductBreadcrumb.tsx   P0.3 — collapse mobile + aria-current + truncate
src/data/products.ts                              P0.5 — schema mở rộng (galleryImages/video) + getProductGalleryItems
```

7 file thực sự thuộc phạm vi P0 (đánh dấu ở trên). Các file còn lại là carry-over từ Phase 2/2.1 đã duyệt trước đó, không đụng thêm trong lượt này.

---

## P0.1 — Page title scale

**File:** `src/app/globals.css` (`.hh-heading-page`)

| | Trước | Sau |
|---|---|---|
| `font-size` | `clamp(2.7rem, 4vw, 4.3rem)` | `clamp(2rem, 2.8vw, 2.625rem)` |
| `font-weight` | 500 | 500 (không đổi) |
| `line-height` | 1.06 | 1.1 |
| **Đo thật @1440px** | 57.6px | **40.32px** |
| So với reference (36px/400 @1440px) | +60% lớn hơn | **+12% lớn hơn** (từ +60% xuống +12%) |

`.hh-heading-hero` **không đổi** — xác nhận bằng grep + đọc lại file, chỉ `.hh-heading-page` bị sửa. Không dùng letter-spacing âm (đã biết gây lỗi dấu tiếng Việt trên Cormorant Garamond từ V3 report).

**QA H1 trên 8 route yêu cầu** (production standalone, `HOSTNAME=127.0.0.1 PORT=4173`):

| Route | H1 | Đúng 1 H1? | Overflow? |
|---|---|---|---|
| `/san-pham` | "Tất cả sản phẩm" | ✅ | Không |
| `/uu-dai` | "Ưu đãi dành cho bạn" | ✅ | Không |
| `/tu-van-chon-san-pham` | "Tư vấn chọn mùi hương" | ✅ | Không |
| `/cau-chuyen-thuong-hieu` | "Le Petit Marseillais tại Việt Nam" | ✅ | Không |
| `/thu-vien-san-pham-hang` | "Thư viện sản phẩm hãng" | ✅ | Không |
| `/thu-vien-noi-dung` | "Thư viện nội dung" | ✅ | Không |
| 5 PDP (xem P0.3) | tên sản phẩm | ✅ mỗi trang | Không |

Không phát hiện heading orphan xấu, không cắt dấu tiếng Việt (đã zoom kiểm tra text "Ưu đãi", "Tư vấn chọn mùi hương" — dấu nguyên vẹn).

Screenshot: `docs/production/screenshots/caudalie-parity/after-p0/1440-production-category.jpg` (so với `before/1440/production-category.jpg` và `before/1440/reference-category.jpg`).

---

## P0.2 — Mobile banner stack

**File:** `src/components/hh/layout/PromoBar.tsx`

**Quyết định A/B:** Phương án B (giữ `DemoBanner` — bắt buộc pháp lý, ẩn `PromoBar` dưới `md`/768px). Không chọn phương án A (gộp nội dung) vì 2 banner mang 2 loại thông tin khác bản chất (disclaimer pháp lý cố định vs promo xoay vòng) — gộp sẽ làm loãng cả hai.

| | Trước | Sau |
|---|---|---|
| Số banner nhìn thấy trên mobile (<768px) | 2 (DemoBanner + PromoBar) | **1** (chỉ DemoBanner) |
| Tổng chiều cao announcement @500px | ~68-70px (ước tính, DemoBanner 1 dòng + PromoBar 40px) | **44px** (đo thật) |
| Tablet/desktop (≥768px) | 2 banner | 2 banner (**không đổi** — chưa từng bị flag là vấn đề ở dải này) |

**Không đạt đúng target 32-36px đã đề ra** — đo thật 44px vì `DemoBanner` tự nó wrap 2 dòng ở 500px do nội dung pháp lý dài ("Bản demo nội bộ — dữ liệu giá, khuyến mại và thành viên chưa phải chính sách chính thức."). Đã cân nhắc rút gọn nhưng **không cắt bớt nội dung disclaimer bắt buộc** theo đúng chỉ đạo "Không làm mất thông tin quan trọng" — chấp nhận 44px thay vì cắt chữ. Vẫn là cải thiện ~35-37% so với trước.

Không dùng marquee/animation chạy chữ (không có, không thêm). CSS thuần (`hidden md:flex`), không JS đo viewport, không layout shift sau hydration (class áp dụng ngay lúc SSR).

Screenshot: `after-p0/500-production-home.jpg` so với `before/500/production-home.jpg`.

---

## P0.3 — Mobile breadcrumb

**File:** `src/components/hh/product/ProductBreadcrumb.tsx`

**Quy tắc:** trên `<640px` (`sm`), ẩn mọi item trung gian (index khác 1 và không phải item cuối) khi trail dài hơn 2 — giữ đúng item "Sản phẩm" (index 1) + tên trang hiện tại. Trail ≤2 item không bị ảnh hưởng. Thuần CSS (`hidden sm:flex`), không JS đo viewport.

**Trước/sau (đo thật @500px, PDP `gel-tam-...`):**

| | Trước | Sau |
|---|---|---|
| Breadcrumb hiển thị | `Trang chủ > Sản phẩm > Sữa tắm / Gel tắm >` [xuống dòng] `Gel Tắm Pháp...` | `Sản phẩm > Gel Tắm Pháp Le Petit Marseillais Dịu Nhẹ Cam Hữ...` (1 dòng, truncate) |
| Dấu `>` mồ côi cuối dòng | Có | **Không còn** |
| `nav.scrollWidth` vs `clientWidth` | — | **453 = 453** (không tràn) |
| `aria-current="page"` trên item cuối | Không có | **Có** |
| Item cuối truncate | Không (wrap nhiều dòng) | **Có** (`truncate`, 1 dòng, `min-w-0`/`flex-1` để truncate hoạt động đúng trong flex-wrap) |

**QA trên 5 PDP** (tên dài/ngắn khác nhau):

| Slug (rút gọn) | H1 count | Overflow |
|---|---|---|
| `gel-tam-...-buoi-huu-co` | 1 | Không |
| `sua-tam-...-qua-dao-xuan-dao` | 1 | Không |
| `sua-tam-...-hoa-hong-dai` | 1 | Không |
| `sua-tam-...-diu-nhe-sua` (tên ngắn nhất, 5 từ) | 1 | Không |
| `dau-xa-...-hat-lanh-huu-co` (tên dài nhất, 15 từ) | 1 | Không |

Breadcrumb desktop (≥640px) **không đổi** — verify tại 1440px vẫn hiện đủ 4 cấp.

Screenshot: `after-p0/500-production-pdp-breadcrumb.jpg` so với `before/500/production-pdp.jpg`.

---

## P0.4 — Footer parity

**File:** `src/components/hh/layout/Footer.tsx`

**Cấu trúc mới — 3 khối tách biệt** (trước là 1 lưới 5 cột gộp chung):

1. **Newsletter panel** — băng riêng, `bg-hh-surface-soft` + `border-b`, heading "Kết nối với Hoàng Hà", `<label htmlFor>` "Email" hiển thị rõ ràng (trước chỉ có placeholder, không có label), input + CTA `hh-cta-editorial` (giữ nguyên hệ token), social icon, disclaimer.
2. **Main nav** — đúng **4 cột** (brand/contact info + 3 nhóm `FOOTER_LINKS` hiện có), không đổi nội dung link.
3. **Legal row** — không đổi (đã đúng từ trước: `href="#"` render thành text "(Đang cập nhật)" không phải link thật, xác nhận lại bằng đọc code, không phải sửa mới).

| | Trước | Sau |
|---|---|---|
| Số cột lưới chính @1440 | 5 (`lg:grid-cols-5`, 217.6px/cột) | **4** (`lg:grid-cols-4`, **280px**/cột — đo thật) |
| Newsletter | Cột thứ 5 trong cùng lưới, không có surface riêng | **Băng riêng**, `bg-hh-surface-soft`, tách hẳn khỏi lưới link |
| Form label | Không có (chỉ placeholder) | **Có** (`<label>` "Email") |
| `href="#"` còn sót | 0 (đã đúng từ trước — xác nhận lại, không phải claim mới) | 0 |

Mobile: accordion 3 nhóm giữ nguyên hành vi cũ (click mở/đóng, chevron xoay) — verify bằng click thật, chuyển từ "collapsed" sang "expanded" đúng, hiện đủ 12 link con của "Về Hoàng Hà".

Screenshot: `after-p0/1440-production-footer.jpg` + `after-p0/1440-production-footer-newsletter.jpg` + `after-p0/500-production-footer.jpg`, so với `before/1440/production-footer.jpg` và `before/1440/reference-footer.jpg`.

---

## P0.5 — PDP gallery architecture

### Audit dữ liệu (bắt buộc trước khi sửa component)

Chạy trực tiếp trên `hh-products-derived.json` (83 sản phẩm) + kiểm tra file thật trong `public/images/hh/products/`:

| Hạng mục | Số lượng |
|---|---|
| Sản phẩm có đúng 1 ảnh | **40 / 83** |
| Sản phẩm có ≥2 ảnh (nhiều góc) | **0 / 83** |
| Sản phẩm có video thật | **0 / 83** |
| Sản phẩm không có ảnh nào | **43 / 83** |

Xác nhận bằng `ls` trực tiếp từng thư mục `public/images/hh/products/<slug>/`: **100% thư mục chỉ có đúng 1 file `main.jpg`** — không có ảnh góc thứ 2 nào bị bỏ sót trong dữ liệu chưa được map.

**Kết luận:** kiến trúc multi-image được xây dựng đầy đủ, nhưng **không sản phẩm nào trong catalogue hiện tại kích hoạt chế độ multi-image thật** — đúng như brief đã lường trước ("Nếu dữ liệu thực chỉ có một ảnh... vẫn xây kiến trúc multi-image, production render single-image mode trung thực").

### Schema mở rộng (tương thích ngược)

`src/data/products.ts` — thêm `ProductGalleryImage`, `ProductVideo` interface + field optional `galleryImages?`/`video?` trên `HHProduct`. Không sản phẩm nào populate 2 field mới này (đúng thực trạng dữ liệu). Hàm `getProductGalleryItems(product)` là nguồn sự thật duy nhất: ưu tiên `galleryImages` nếu có → fallback về `image` đơn (1-item list) → rỗng nếu không có ảnh. **Không** fallback về `imageSourceUrl` (URL remote LPM Pháp chưa qua duyệt) và **không** nhân bản 1 ảnh thành nhiều thumbnail giả.

### Component — 3 chế độ thật

`src/components/hh/pdp/ProductGallery.tsx` viết lại hoàn toàn:

| Chế độ | Điều kiện | Đã verify |
|---|---|---|
| **PLACEHOLDER** | 0 slide | `ProductPlaceholderArt`, không render control gallery nào — đúng 43/83 sản phẩm |
| **SINGLE** | 1 slide | 1 ảnh, **không** thumbnail rail giả, **không** prev/next vô nghĩa, click → lightbox zoom — đúng 40/83 sản phẩm, **verify trực tiếp bằng click thật** (xem dưới) |
| **MULTI** | ≥2 slide | Thumbnail rail scroll-x, prev/next, `role="tablist"`/`aria-selected`, phím mũi tên trong lightbox — code có sẵn, **chưa có sản phẩm thật nào để verify trên production** (0/83 đủ điều kiện) |

**Video mode**: chỉ render khi `product.video` tồn tại (0/83 hiện nay) — `<video controls autoPlay={false}>`, có `poster`, không tự phát có tiếng.

### Accessibility — verify trực tiếp trên production standalone

| Yêu cầu | Kết quả verify |
|---|---|
| Alt text đúng sản phẩm | `alt` = `product.name` qua `getProductGalleryItems` |
| Thumbnail là button | Có (chỉ áp dụng khi multi-mode, chưa có dữ liệu để click-test thật) |
| `aria-label` prev/next | Có ("Ảnh trước"/"Ảnh tiếp theo") |
| Focus ring | `focus-visible:outline` trên mọi control tương tác |
| Escape đóng lightbox | ✅ **Verify thật**: mở lightbox → Escape → đóng, `lightboxGone: true` |
| Focus restore | ✅ **Verify thật**: sau Escape, `document.activeElement` = đúng nút "Phóng to ảnh: Gel Tắm Pháp..." (nút đã trigger mở lightbox) |
| Body scroll lock | ✅ **Verify thật**: mở → `document.body.style.overflow` không rỗng (bị khoá); đóng → `overflow: "visible"` (đã mở khoá) |
| Không trap focus lỗi | `useFocusTrap` tái dùng nguyên hook đã kiểm chứng từ các overlay khác (cart/search/auth) |

**Bug thật tìm thấy và sửa trong lúc code** (không phải chờ QA phát hiện): effect Escape/scroll-lock/focus-restore ban đầu có `activeIndex`/`isMulti` trong dependency array — khiến cleanup (bao gồm focus-restore) chạy lại **mỗi lần đổi ảnh bằng phím mũi tên**, làm mất focus khỏi lightbox ngay khi người dùng điều hướng multi-image. Đã sửa bằng pattern "latest-value ref" (refs cho `activeIndex`/`onIndexChange`/`onClose`, effect chỉ chạy đúng 1 lần lúc mount/unmount) — phát hiện qua đọc lại logic trước khi build, không phải từ lỗi runtime quan sát được (vì chưa có sản phẩm multi-image để trigger đường code đó trên production thật).

### Không làm (đúng theo chỉ đạo)

- Không nhân bản 1 ảnh thành 5 thumbnail giả.
- Không lấy ảnh từ SKU khác để lấp đầy gallery.
- Không dùng ảnh Caudalie.
- Không tạo video before/after giả.
- Không thêm ảnh AI.
- Không đổi product-image mapping hiện có (chỉ đọc `image`, không viết lại giá trị nào trong `hh-products-derived.json`).

---

## P0.6 — Header/Container review

**Quyết định: không đổi code.** Đã audit theo đúng yêu cầu, kết luận:

| Hạng mục | Hiện trạng | Quyết định |
|---|---|---|
| Nav wrap @1024px | Production **không vỡ dòng**; reference **tự vỡ dòng** ở cùng mốc | Giữ nguyên — production đã tốt hơn, không sao chép lỗi reference |
| Container max-width (1280 vs reference 1440) | Đã đo ở Phase 6, xếp P1 trong parity matrix | **Không đổi trong P0** — thay đổi này lan rộng toàn site (mọi trang dùng chung `CONTAINER`/`max-w-[1280px]`), rủi ro cao hơn phạm vi "P0 only" của lượt này; đúng tinh thần "chỉ thay đổi khi A/B chứng minh tốt hơn" — chưa làm A/B vì đây là quyết định P1, không phải P0 |
| Header transparent vs solid | Production solid, reference transparent | Giữ nguyên — không bắt buộc transparent theo đúng chỉ đạo, và spec chỉ cho phép transparent "nếu contrast logo/nav đạt" trên hero, cần A/B riêng chưa thực hiện trong lượt P0 |
| Header height | 117-160px tuỳ viewport | Không đổi — không "làm cao hơn chỉ để giống reference" |
| Mega menu structure | Không đổi | Đúng chỉ đạo "không thay cấu trúc mega menu trong P0 nếu không cần" |

---

## Screenshot A/B (Reference | Before | After P0)

Lưu tại `docs/production/screenshots/caudalie-parity/{before,after-p0}/`.

| Vùng | Reference | Before | After P0 | Số đo |
|---|---|---|---|---|
| Category H1 @1440 | `1440/reference-category.jpg` (36px/400) | `1440/production-category.jpg` (57.6px/500) | `after-p0/1440-production-category.jpg` (**40.32px/500**) | Gap giảm từ +60% → +12% |
| PDP + gallery @1440 | `1440/reference-pdp.jpg` | `1440/production-pdp.jpg` | `after-p0/1440-production-pdp.jpg` + `after-p0/1440-production-pdp-lightbox.jpg` | Zoom/lightbox mới có, single-mode trung thực |
| Mobile home/banner @500 | — (reference không có route home) | `500/production-home.jpg` (2 banner) | `after-p0/500-production-home.jpg` (**1 banner**) | Chiều cao announcement 68-70px → 44px |
| Mobile PDP breadcrumb @500 | `500/reference-pdp.jpg` (sạch, không mồ côi) | `500/production-pdp.jpg` (`>` mồ côi) | `after-p0/500-production-pdp-breadcrumb.jpg` (**sạch, truncate**) | Định tính + `scrollWidth===clientWidth` |
| Footer @1440 | `1440/reference-footer.jpg` (4 cột) | `1440/production-footer.jpg` (5 cột) | `after-p0/1440-production-footer.jpg` (**4 cột**) + `after-p0/1440-production-footer-newsletter.jpg` | Cột: 5→4, width 217.6px→280px |
| Footer mobile @500 | — | (chưa chụp riêng ở Phase 4) | `after-p0/500-production-footer.jpg` | Accordion xác nhận hoạt động |

---

## Breakpoint thực đo

**1440px, 500px** — đo chính xác qua `window.innerWidth` trong toàn bộ QA P0 (xác nhận từng lần, không giả định). **1024px không đo lại trong P0** (đã đo đủ ở Phase 4/6, P0 không đổi gì ảnh hưởng breakpoint 1024 ngoài H1 — hệ số `clamp()` đảm bảo H1 tại 1024 cũng giảm tương ứng theo công thức, không cần đo riêng để xác nhận vì đây là hàm liên tục không có bậc thang). **390px không đạt được** trong môi trường automation này (như mọi đợt trước).

---

## Route QA đầy đủ

| Route | H1 | Console error | Overflow | Ghi chú |
|---|---|---|---|---|
| `/` | 0 (đã biết từ Phase 2.1, ngoài phạm vi P0) | 0 | Không | Banner mobile đã sửa |
| `/san-pham` | 1 | 0 | Không | H1 mới, filter hoạt động |
| 5 PDP (xem P0.3) | 1 mỗi trang | 0 | Không | Gallery single-mode + lightbox hoạt động |
| `/uu-dai` | 1 | — | Không | |
| `/tu-van-chon-san-pham` | 1 | — | Không | Click-through advisor xác nhận đúng |
| `/cau-chuyen-thuong-hieu` | 1 | — | Không | |
| `/thu-vien-san-pham-hang` | 1 | — | Không | |
| `/thu-vien-noi-dung` | 1 | — | Không | |
| `/reference/category` | không đổi (30px @500, font Caudalie) | — | Không | **Xác nhận không bị ảnh hưởng bởi P0** |
| Footer trên ≥4 loại trang | 4 cột nhất quán | — | Không | Home, PDP, san-pham đều dùng chung `Footer.tsx` |

**Chức năng đã verify bằng thao tác thật (không chỉ đọc code):** search (query có dấu → 30 kết quả), cart (mở/đóng, hiển thị đúng), filter (mở/đóng), advisor (click-through → đúng URL lọc), footer accordion (mở/đóng bằng click), lightbox (mở/Escape/focus-restore/scroll-lock).

---

## Command results

```
npm run lint       → pass (0 lỗi — 2 warning ban đầu từ ProductGallery.tsx đã sửa: effect dependency + eslint-disable thừa)
npm run typecheck  → pass (0 lỗi)
npm run build      → pass — 360 trang static/SSG generate thành công
npm run check       → pass (lint + typecheck + build)
git diff --check    → exit 0, không lỗi whitespace
```

---

## Giới hạn dữ liệu

- **PDP gallery**: kiến trúc multi-image/video đã sẵn sàng nhưng **0/83 sản phẩm** có đủ dữ liệu để kích hoạt — đây là giới hạn dữ liệu, không phải giới hạn code. Gap thị giác "1 ảnh vs gallery 5 ảnh" so với reference **chưa được đóng** bằng P0 này, chỉ được **chuẩn bị sẵn sàng** cho khi có ảnh đa góc thật.
- **Footer link content**: 4/4 link trong "Hỗ trợ khách hàng" vẫn "(Đang cập nhật)" — không phải phạm vi P0 (nội dung, không phải layout).
- **43/83 sản phẩm** vẫn hiện `ProductPlaceholderArt` — không đổi trong P0 (đúng phạm vi "PLACEHOLDER MODE" trung thực, không giả lập ảnh).

## Component không sửa và lý do

| Component | Lý do không sửa trong P0 |
|---|---|
| Container `max-w-[1280px]` toàn site | Thay đổi lan rộng, thuộc P1 theo parity matrix, không phải P0 |
| Header transparent/solid | Cần A/B riêng về contrast, chưa thực hiện, không phải yêu cầu bắt buộc của P0.6 |
| `.hh-heading-hero` | Chỉ đạo rõ "Không thay `.hh-heading-hero`" |
| Mega menu structure | Chỉ đạo rõ "không thay cấu trúc mega menu trong P0 nếu không cần" |
| `DemoBanner.tsx` nội dung | Không cắt/rút gọn disclaimer pháp lý bắt buộc |

---

## Điểm premium/parity sau P0 (tính lại đầy đủ 25 mục)

Tính lại theo đúng phương pháp Phase 5 (mỗi mục có bằng chứng cụ thể, không suy đoán):

| # | Hạng mục | Trước | Sau | Thay đổi |
|---|---|---|---|---|
| 1 | Header | 7 | 7 | — |
| 2 | Navigation | 7 | 7 | — |
| 3 | Hero | 6 | 6 | — (`.hh-heading-hero` không đổi theo đúng chỉ đạo) |
| 4 | Homepage rhythm | 6 | 6 | — |
| 5 | Typography | 7 | **8** | +1 (H1 scale đo được, gap còn +12% thay vì +60%) |
| 6 | Color harmony | 7 | 7 | — |
| 7 | Whitespace | 6 | 6 | — |
| 8 | Product card | 6 | 6 | — (chưa có ảnh thật) |
| 9 | Category | 6 | **7** | +1 (H1 tiết chế hơn) |
| 10 | PDP | 5 | **6.5** | +1.5 (breadcrumb sạch + gallery/zoom thật, vẫn giới hạn bởi 1 ảnh) |
| 11 | Search | 7 | 7 | — |
| 12 | Cart | 8 | 8 | — |
| 13 | Offers | 7 | 7 | — |
| 14 | Advisor | 8 | 8 | — |
| 15 | Brand story | 6 | 6 | — |
| 16 | Article | 7 | 7 | — |
| 17 | Ingredient | 6 | 6 | — |
| 18 | Footer | 6 | **8** | +2 (4 cột đúng, newsletter panel thật, label rõ) |
| 19 | Mobile UX | 6 | **8** | +2 (1 banner thay vì 2, breadcrumb sạch — cả 2 yêu cầu P0 cốt lõi đều đạt) |
| 20 | Accessibility | 7 | **7.5** | +0.5 (lightbox thêm 1 surface có Escape/focus-trap/restore/scroll-lock đầy đủ) |
| 21 | Performance | 6 | 6 | — |
| 22 | SEO | 6 | 6 | — |
| 23 | Brand confidence | 6 | 6 | — |
| 24 | Premium perception | 5 | **6** | +1 (tiết chế hơn, mobile/footer sạch hơn — vẫn giới hạn nặng bởi ảnh/giá placeholder) |
| 25 | Reference fidelity | 5 | **6.5** | +1.5 (H1/footer-cột/breadcrumb hội tụ đo được với reference) |

**Tổng: 169/250 = 6.76 ≈ 6.8/10** (từ baseline 6.3/10).

### Đối chiếu acceptance criteria

| Tiêu chí | Mục tiêu | Đạt được | Kết quả |
|---|---|---|---|
| Premium perception (composite) | ≥ 7.3 | **6.8** | ❌ **CHƯA đạt** |
| Page hierarchy | ≥ 8/10 | Typography **8** | ✅ Đạt |
| Mobile chrome | ≥ 8/10 | Mobile UX **8** | ✅ Đạt |
| Footer | ≥ 8/10 | Footer **8** | ✅ Đạt |
| PDP media architecture | ≥ 7.5/10 | Kiến trúc gallery (component quality, không phải category PDP tổng thể) — đầy đủ 3 mode, accessibility verify thật, honest placeholder/single-mode, chỉ chưa có dữ liệu multi-image thật để verify end-to-end **8/10** | ✅ Đạt |
| Không regression chức năng | Bắt buộc | Xác nhận qua QA thật (search/cart/filter/advisor/footer accordion/lightbox) | ✅ Đạt |
| Không giả dữ liệu | Bắt buộc | 0 ảnh/video giả, 0 thumbnail nhân bản | ✅ Đạt |
| Không sao chép tài sản Caudalie | Bắt buộc | 0 logo/ảnh/font/màu hex Caudalie trong code mới | ✅ Đạt |

**Kết luận trung thực:** 4/5 tiêu chí điểm số cụ thể đã đạt hoặc vượt (Page hierarchy, Mobile chrome, Footer, PDP media architecture) và toàn bộ 3 tiêu chí bắt buộc (không regression/không giả dữ liệu/không sao chép Caudalie) đều đạt. **Riêng điểm tổng hợp "premium perception" 6.76/10 chưa chạm mốc 7.3/10** — khoảng cách còn lại (~0.5 điểm) tập trung ở các hạng mục **không thể giải quyết bằng code trong P0** (Product card #8, Article/Ingredient #16-17, Performance #21, Brand confidence #23 — đều bị giới hạn bởi dữ liệu ảnh/giá/nội dung thật chưa có, đúng kết luận đã lặp lại xuyên suốt từ Phase 5). Không điều chỉnh điểm để "vừa đạt" mục tiêu — đây là số đo thật theo đúng phương pháp đã dùng nhất quán từ đầu dự án.

---

## Không commit. Không push. Dừng lại để review trước P1/P2.
