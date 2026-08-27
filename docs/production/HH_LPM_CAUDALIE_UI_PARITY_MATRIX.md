# HH × LPM — Caudalie UI Parity Matrix (Phase 6)

**Ngày:** 2026-07-20 · Branch `hh-lpm-caudalie-ui-parity` · Production standalone preview (`HOSTNAME=127.0.0.1 PORT=4173 npm run start`, không dùng dev server).

**Phạm vi đo được:** 1440px, 1024px, 500px (`window.innerWidth` xác nhận chính xác từng giá trị — xem cột "Viewport đo"). 1100/834/390px không đạt được trong phiên này. Toàn bộ số đo lấy bằng `getComputedStyle`/`getBoundingClientRect` qua `javascript_tool`, không phải ước lượng bằng mắt. Screenshot gốc: `docs/production/screenshots/caudalie-parity/before/{1440,1024,500}/`.

**Định nghĩa "1:1" áp dụng đúng theo phạm vi đã duyệt:** chỉ so sánh skeleton/layout/spacing/ratio/hierarchy/interaction. **Không** so sánh/sao chép màu, font, logo, ảnh, copy — các mục đó không nằm trong ma trận này.

---

## HEADER

| Thuộc tính | Reference | Production | Sai lệch | Viewport đo | Mức ưu tiên |
|---|---|---|---|---|---|
| Chiều cao | 208px | 160px | −48px (23% thấp hơn) | 1440 | P2 |
| Số tầng | 3 (promo bar + logo/icon row + nav+search row) | 3 (banner đôi + logo/icon row + nav+search row) | Cấu trúc tương tự, nhưng production có **2 banner** (DemoBanner+PromoBar) thay vì reference's 1 promo bar | 1440/500 | P1 (mobile — đẩy nội dung xuống, xem Mobile) |
| Background | Transparent (`rgba(0,0,0,0)`) | Solid `rgb(255,254,252)` | Khác biệt có chủ đích (chưa xác nhận có đúng scroll-behavior đổi màu ở reference hay không — chưa test scroll) | 1440 | P2 |
| Nav wrap tại 1024px | **Vỡ dòng xấu** ("Best-sellers", "Gifts & offers" xuống dòng) | Giữ nguyên 1 dòng, không vỡ | Production **tốt hơn** reference ở điểm này | 1024 | Không cần sửa |
| Sticky behavior | Chưa test (không cuộn để verify trong Phase 4) | Chưa test | — | — | Cần bổ sung ở đợt sau |
| Icon size | Chưa đo pixel cụ thể | Chưa đo pixel cụ thể | — | — | Cần bổ sung |

## HERO

| Thuộc tính | Reference | Production | Sai lệch | Viewport đo | Mức ưu tiên |
|---|---|---|---|---|---|
| Cấu trúc | Không có route home riêng trong `/reference/*` (chỉ có category/pdp/offers/diagnosis/search/cart/login/register/brand-story — không có homepage) | 2-slide side-by-side desktop / carousel mobile | **Không có cặp 1:1 để so sánh trực tiếp** — `HeroCampaign` được ghi nhận từ trước là "cloned from shared Caudalie homepage hero" (comment trong code), không phải từ 1 route `/reference/*` hiện có | — | — |
| Heading size (nếu so với H1 category làm proxy) | 36px/400 | 57.6px (desktop, hiện là H2 sau fix Phase 2.1)/500 | +60% lớn hơn, +1 bậc weight | 1440 | P1 |

## SECTION (đo qua trang category — proxy gần nhất cho "page section")

| Thuộc tính | Reference | Production | Sai lệch | Viewport đo | Mức ưu tiên |
|---|---|---|---|---|---|
| Container max-width | 1440px | 1280px | −160px (11%) | 1440 | P1 |
| H1 trang | 36px, weight 400, Caudalie serif | 57.6px, weight 500, Cormorant Garamond | +60% size, +1 weight bậc | 1440 | P1 |
| H1 trang (994-1024px, đo phụ) | Chưa đo tại đúng mốc này cho reference | 43.2px/500 | — | 994 | — |
| Đoạn mô tả dưới H1 | Có, canh giữa | Có, canh giữa | Khớp | 1440 | — |
| Padding-y container | Chưa đo pixel cụ thể 2 bên | Chưa đo pixel cụ thể 2 bên | — | — | Cần bổ sung |

## PRODUCT CARD / GRID (`/reference/category` ↔ `/san-pham`)

| Thuộc tính | Reference | Production | Sai lệch | Viewport đo | Mức ưu tiên |
|---|---|---|---|---|---|
| Grid class | `grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4` | **Byte-identical** | **0 — khớp tuyệt đối** | 1440/1024/500 | ✅ Đã đạt |
| Grid gap | 40px (dọc) / 16px (ngang) | 40px / 16px | **0** | 1440/1024/500 | ✅ Đã đạt |
| Cột width @1440 | 328.25px | 292px | −36px (do container 1280 vs 1440, hệ quả trực tiếp của gap container, không phải lỗi grid riêng) | 1440 | P1 (theo container) |
| Badge vị trí | Top-left (`Limited edition`/`Special offer`/`Bestseller`) | Top-left (`Hữu cơ`/`Bán chạy`/`Liên hệ báo giá`) | Cấu trúc khớp, nội dung badge khác vai trò (đúng — sản phẩm HH có badge khác Caudalie) | 1440/1024/500 | ✅ Cấu trúc đạt |
| Heart icon | Top-right, tròn, nền trắng | Top-right, tròn, nền trắng | Khớp | 1440/1024/500 | ✅ Đã đạt |
| Ảnh sản phẩm | Ảnh thật (đã thấy trong screenshot reference — dù đang hiện gradient placeholder be trong bản chụp Phase 4 vì reference cũng chưa load ảnh thật ở môi trường demo này) | Toàn bộ placeholder gradient be | Không so sánh công bằng được trong phiên này — cả 2 bên đều dùng placeholder ở đúng lúc chụp | 1440/1024/500 | Ghi nhận, không kết luận sai lệch |
| Filter control | "Filter" pill, icon `sliders` | "Bộ lọc" pill, icon tương tự | Khớp cấu trúc | 1440/1024/500 | ✅ Đã đạt |

## CATEGORY

| Thuộc tính | Reference | Production | Sai lệch | Viewport đo | Mức ưu tiên |
|---|---|---|---|---|---|
| Breadcrumb | `Home > All products > Face > Serums` | `Trang chủ > Sản phẩm` | Reference có 4 cấp, production 2 cấp — cấu trúc breadcrumb nông hơn (do HH không có phân cấp danh mục sâu tương đương) | 1440 | P2 (phụ thuộc kiến trúc danh mục dữ liệu, không phải lỗi component) |
| Số cột grid | 2/3/4 (md/lg) | 2/3/4 (md/lg) | **0** | 1440/1024/500 | ✅ Đã đạt |
| Sort control | Không quan sát thấy trong viewport đã chụp (có thể ẩn trong "Filter") | Không có | Chưa xác định rõ reference có sort riêng hay không | — | Cần xác minh thêm |
| Pagination | Chưa cuộn xuống đủ để quan sát trong Phase 4 | Chưa cuộn xuống đủ để quan sát trong Phase 4 | — | — | Cần bổ sung |

## PDP

| Thuộc tính | Reference | Production | Sai lệch | Viewport đo | Mức ưu tiên |
|---|---|---|---|---|---|
| Gallery/buy-box grid | `grid-cols-1 gap-10 lg:grid-cols-2` | **Byte-identical class string** | **0** | 1440 | ✅ Đã đạt |
| Tỷ lệ cột @1440 | 660.5px / 660.5px (50/50) | 588px / 588px (50/50) | Cùng tỷ lệ 50/50, khác absolute width (do container 1440 vs 1280) | 1440 | P1 (theo container) |
| **Ảnh sản phẩm** | **Gallery 5 thumbnail** (gồm 1 video "63%" before/after) + nút prev/next trên ảnh chính | **1 ảnh tĩnh duy nhất**, không thumbnail, không zoom, không prev/next | **Gap lớn nhất đo được trong toàn bộ ma trận** | 1440 | **P0** |
| H1 (tên sản phẩm) | 24px, weight 400, serif | 24px, weight 600, sans | Size khớp tuyệt đối; family/weight khác (quyết định thiết kế có chủ đích — PDP luôn sans theo spec HH, đã ghi trong `HH_LPM_PREMIUM_TYPOGRAPHY_REPORT.md` §7) | 1440 | Không cần sửa (chủ đích) |
| Giá | `€53.00`, ngay dưới tên | `179.000₫`, có breadcrumb rating link ở giữa | Cấu trúc thứ tự thông tin gần giống, production có thêm dòng "Chưa có đánh giá — hãy là người đầu tiên" mà reference không có tương đương ở đúng vị trí này | 1440 | P2 |
| CTA chính | `Add to bag | €53.00` | `Mua ngay | 179.000₫` | Cấu trúc pattern "label \| giá" khớp | 1440 | ✅ Đã đạt |
| Lựa chọn dung tích | Pill `30mL`/`50mL` | Không có (SKU/dung tích cố định per sản phẩm) | Khác biệt kiến trúc dữ liệu (HH: mỗi dung tích = 1 SKU riêng, không phải variant chọn được) | 1440 | Không áp dụng — khác mô hình dữ liệu |
| Auto-replenishment option | Có (`€47.70 Auto-replenishment every 3 months`) | Không có | Tính năng reference có, production chưa có | 1440 | P2 — ngoài phạm vi demo hiện tại |
| Breadcrumb mobile | Xuống dòng sạch, không mồ côi chevron | **Chevron mồ côi cuối dòng** khi wrap (xem `500/production-pdp.jpg`) | Lỗi nhỏ đã biết từ V2, chưa từng sửa | 500 | P1 (nhỏ, độc lập, dễ sửa) |
| Trust/delivery info | Chưa cuộn đủ để so sánh trong Phase 4 | "Giao hàng dự kiến: 2-5 ngày làm việc" + banner miễn phí ship | — | 1440 | Cần bổ sung |
| Accordion (Thành phần/Hướng dẫn) | Chưa quan sát trong Phase 4 (chưa cuộn) | Đã biết có từ trước (`ProductAccordions.tsx`) | — | — | Cần bổ sung |
| Reviews | "Leave a review" link | "Chưa có đánh giá — hãy là người đầu tiên" link | Cấu trúc tương tự (cả 2 đều link tới review section) | 1440 | ✅ Cấu trúc đạt |

## FOOTER

| Thuộc tính | Reference | Production | Sai lệch | Viewport đo | Mức ưu tiên |
|---|---|---|---|---|---|
| Số cột | 4 (`md:grid-cols-4`) | 5 (`sm:grid-cols-2 lg:grid-cols-5`) | +1 cột | 1440 | P1 |
| Cột width @1440 | 316.25px | 217.6px | −98.65px (31% hẹp hơn, do chia 5 thay vì 4) | 1440 | P1 (hệ quả của #cột) |
| Chiều cao tổng | 739.4px | 574px | −165px (22% thấp hơn) | 1440 | P2 |
| Newsletter treatment | Card riêng, nền xám nhạt, bo góc, tiêu đề "Let's be grape friends" — **tách biệt rõ** khỏi các cột link | Cột thứ 5 trong cùng lưới, không có nền/border riêng biệt | Production newsletter **kém nổi bật hơn hẳn** | 1440 | **P1** |
| Legal/country row cuối | `International ▾ · Personal data & Cookies · T&C · Legal Note · Loyalty Program · MYCAUDALIE terms · © Caudalie Copyright` | `Việt Nam ▾ · Chính sách bảo mật (Đang cập nhật) · Điều khoản dịch vụ (Đang cập nhật) · Chính sách thành viên · © 2026 Hoàng Hà` | Cấu trúc khớp (dropdown quốc gia + link pháp lý + copyright), nội dung 2/3 link production chưa có trang thật ("Đang cập nhật") | 1440 | P2 (nội dung, không phải layout) |

## MOBILE (500px)

| Thuộc tính | Reference | Production | Sai lệch | Viewport đo | Mức ưu tiên |
|---|---|---|---|---|---|
| Số banner trên cùng | 1 (`We're doubling your loyalty points!`) | **2** (Bản demo nội bộ + Miễn phí vận chuyển) | +1 banner, đẩy nội dung xuống thêm | 500 | P1 |
| Hamburger menu | Có (icon `≡`), đã verify hoạt động | Có, đã verify hoạt động (Phase 3A/3B — cả automation lẫn thiết bị thật) | Khớp | 500 | ✅ Đã đạt |
| Grid sản phẩm | 2 cột | 2 cột | **0** | 500 | ✅ Đã đạt |
| Breadcrumb PDP | Xuống dòng sạch | Chevron mồ côi (xem PDP ở trên) | Đã ghi ở mục PDP | 500 | P1 |
| Sticky CTA bar | Chưa quan sát trong reference (route `/reference/*` không có PDP mobile sticky bar tương đương rõ ràng trong ảnh đã chụp) | Có, đã verify hoạt động đúng qua Phase 3A/3B (2 nút, ẩn đúng trên PDP theo `HHShell.tsx`) | — | 500 | Không so sánh được trực tiếp |
| Carousel ngang (horizontal scroll) | Không quan sát trong ảnh đã chụp | Có ở trang chủ (ExperienceCards) — không nằm trong 2 route đã chụp Phase 4, ghi nhận từ QA trước | — | — | Cần bổ sung ở đợt sau |

---

## Tổng hợp mức ưu tiên (để dùng cho Phase 8)

**P0 — cấu trúc chính, tác động cao nhất:**
1. PDP thiếu gallery đa ảnh (phụ thuộc nguồn ảnh, không chỉ là việc code — xem `HH_LPM_PREMIUM_UI_ASSESSMENT.md` #10).

**P1 — nên làm nếu vào Phase 8:**
2. Container width 1280 → có thể cân nhắc 1440 (ảnh hưởng cột grid/PDP split tỷ lệ, cần QA lại toàn site nếu đổi — rủi ro lan rộng, không phải 1 token đơn lẻ).
3. H1 category/page giảm kích thước/weight gần dải reference hơn (`.hh-heading-page` trong `globals.css`).
4. Footer: đổi 5 cột → 4 cột, tách newsletter thành card riêng có nền/border.
5. Mobile: gộp/rút gọn 2 banner xếp chồng (cần quyết định nội dung/pháp lý trước — đã ghi từ V1).
6. PDP breadcrumb mobile: ẩn separator cuối, tránh chevron mồ côi (`ProductBreadcrumb.tsx`) — fix nhỏ, độc lập, rủi ro thấp.

**P2 — polish, không cấp bách:**
7. Header height/background treatment.
8. Breadcrumb depth (phụ thuộc kiến trúc dữ liệu danh mục).
9. Auto-replenishment option trên PDP (tính năng mới, ngoài phạm vi parity thuần).
10. Footer legal link "Đang cập nhật" (nội dung, không phải layout).

**Không cần sửa (production đã tốt hơn hoặc khác biệt có chủ đích):**
- Nav 1024px không vỡ dòng (production tốt hơn reference).
- PDP H1 sans/weight 600 (quyết định thiết kế đã có tài liệu).
- Dung tích sản phẩm không có variant picker (khác mô hình dữ liệu, không phải thiếu sót).

---

## Hạn chế của Phase 6

- Chỉ đo được 3/6 breakpoint yêu cầu (1440/1024/500) trong môi trường automation này — không tuyên bố đã đo 1100/834/390.
- Không đo được: sticky header behavior khi cuộn, pagination, accordion PDP, trust badges, sort control (reference) — do giới hạn thời gian/số lượt cuộn trong 1 phiên Phase 4, không phải do route không tồn tại.
- Ảnh sản phẩm ở cả 2 bên (reference lẫn production) đều hiện placeholder tại thời điểm chụp — không thể kết luận về "ảnh thật" parity trong đợt này.
- Chưa đo: box-shadow, border-radius, transition duration bằng computed style — chỉ so sánh qua quan sát ảnh chụp.
- `/reference/*` không có route "home" tương đương 1:1 với `HeroCampaign` — mục Hero trong ma trận này dùng H1 category làm proxy gần nhất, không phải so sánh hero-với-hero thật.
