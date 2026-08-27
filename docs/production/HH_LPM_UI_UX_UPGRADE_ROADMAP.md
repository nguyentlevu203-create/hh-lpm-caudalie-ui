# HH × LPM — UI/UX Upgrade Roadmap

Ngày: 2026-07-16 · Dựa trên `HH_LPM_FULL_WEBSITE_AUDIT_REPORT.md` + các phiên đánh giá UI trước đó trong cùng dự án. Mỗi đề xuất đi kèm route/component cụ thể, tác động, độ ưu tiên, độ khó, thời gian tương đối, rủi ro — không có khuyến nghị chung chung.

## 1. Đánh giá UI hiện tại

**Điểm mạnh:**
- Hệ token màu (`--hh-*`, 9 token) nhất quán xuyên suốt, không lệch giữa các trang.
- Chiều sâu chức năng hiếm thấy ở bản demo: search 7 nhóm, filter đa chiều, cart math đúng (đã verify), mega menu, breadcrumb, accordion — tất cả hoạt động thật, không phải mock tĩnh.
- Kỷ luật QA cao qua nhiều lượt: 0 link hỏng, 0 ảnh vỡ, 0 lỗi console trên 360 route.
- Accessibility vừa được nâng cấp đồng bộ (Escape, scroll-lock, focus-trap, focus-visible) — hiếm khi một bản demo nội bộ đạt mức này.

**Điểm yếu:**
- **Ảnh sản phẩm**: 43/83 sản phẩm Hoàng Hà (52%) không có ảnh thật, kể cả khối "Sản phẩm bán chạy" trên trang chủ (4/4 placeholder). Đây là lỗ hổng thị giác lớn nhất, nhưng là vấn đề dữ liệu/nguồn ảnh, không phải UI code.
- **Giá**: 69/83 sản phẩm (83%) không có giá thật, hiện "Giá sẽ được xác nhận" — không có tín hiệu phân biệt ở trang danh sách.
- Không có hệ thống thiết kế chính thức (chưa có typography scale/spacing scale dạng token, chỉ dùng trực tiếp class Tailwind mặc định).
- Không có tracking (GA4/Meta Pixel/GTM) — xác nhận bằng grep, 0 kết quả.
- PDP chỉ 1 ảnh, không gallery/zoom.
- Search chỉ so khớp chuỗi đơn, không tách từ.

## 2. Must fix (đã hoàn tất trong đợt audit này)

| Việc | Route/Component | Trạng thái |
|---|---|---|
| Escape đóng overlay + khóa scroll nền + focus trap | `SiteUIContext.tsx`, `use-focus-trap.ts`, 5 overlay component | ✅ Đã sửa, đã retest |
| 8 input `outline-none` không có focus-visible | Auth forms, Footer, Search, filter bars, Checkout | ✅ Đã sửa |
| Title trùng 7 cặp PDP/thư viện sản phẩm hãng | `san-pham/[slug]`, `thu-vien-san-pham-hang/[slug]` | ✅ Đã sửa |

## 3. Quick wins — nên làm trước khi CEO/Marketing review (tác động cao, công sức thấp)

### 3.1 Badge "Liên hệ báo giá" ở trang danh sách sản phẩm
**Tác động:** Cao — 83% sản phẩm không có giá thật đang trộn lẫn với sản phẩm mua-ngay-được mà không có tín hiệu báo trước, gây hụt hẫng khi khách bấm vào PDP mới biết.
**Component:** `src/components/hh/product/ProductCard.tsx` (thêm badge dựa trên `priceMode === "inquiry"`, đã có sẵn field trong data).
**Độ khó:** Nhỏ (đọc field có sẵn, thêm 1 badge, không đổi layout).
**Thời gian:** Nhỏ (~30 phút).
**Rủi ro:** Thấp.

### 3.2 Đổi màu badge "Tham khảo" (thư viện sản phẩm hãng)
**Tác động:** Trung bình — hiện cùng tông xanh với badge "Hữu cơ" của sản phẩm bán được, dễ nhầm khi lướt nhanh.
**Component:** `src/components/hh/brand-library/BrandLibraryCard.tsx`.
**Độ khó:** Nhỏ (đổi 1 class màu).
**Thời gian:** Nhỏ.
**Rủi ro:** Thấp.

### 3.3 Ảnh thật cho khối "Sản phẩm bán chạy" trên trang chủ
**Tác động:** Rất cao — đây là vị trí bán hàng quan trọng nhất trang chủ, hiện 4/4 sản phẩm là placeholder.
**Component:** dữ liệu (`hh-products-derived.json`, field `image`), không phải code.
**Độ khó:** Phụ thuộc nguồn ảnh thật từ Hoàng Hà — không phải việc kỹ thuật.
**Thời gian:** Vừa/Lớn (chờ nguồn ảnh).
**Rủi ro:** Thấp về kỹ thuật, cao về phụ thuộc bên ngoài.

### 3.4 robots.txt tĩnh
**Tác động:** Thấp (đã có noindex meta toàn site, đây chỉ là phòng vệ kép).
**Component:** `public/robots.txt` (file mới, `Disallow: /`).
**Độ khó:** Rất nhỏ.
**Thời gian:** 5 phút.
**Rủi ro:** Không có.

## 4. Medium upgrades — trước production

### 4.1 PDP gallery đa ảnh + zoom
**Tác động:** Cao — chuẩn tối thiểu của một PDP thương mại điện tử thật.
**Component:** `src/components/hh/pdp/ProductGallery.tsx`.
**Độ khó:** Vừa (cần dữ liệu nhiều ảnh/sản phẩm — hiện chỉ có 1 ảnh/sản phẩm trong data, nên phụ thuộc nguồn ảnh trước khi làm UI).
**Thời gian:** Vừa.
**Rủi ro:** Thấp (thêm tính năng, không đổi cấu trúc hiện có).

### 4.2 Search — so khớp theo từ thay vì chuỗi đơn
**Tác động:** Trung bình-Cao — query tự nhiên dài (thêm từ đệm) hiện dễ ra 0 kết quả dù chứa đúng tên sản phẩm.
**Component:** `src/lib/search.ts` (`includesQuery`).
**Độ khó:** Vừa (đổi thuật toán khớp, cần test lại toàn bộ 7 nhóm để không phá vỡ hành vi hiện có).
**Thời gian:** Vừa.
**Rủi ro:** Trung bình — thay đổi ranking có thể ảnh hưởng tới kết quả hiện đang đúng; cần QA kỹ trước khi merge.

### 4.3 Control sắp xếp trên `/san-pham`
**Tác động:** Trung bình — chuẩn UX thiếu của trang danh mục (giá tăng/giảm, bán chạy, mới nhất).
**Component:** `src/app/san-pham/page.tsx` + `ProductGrid.tsx`.
**Độ khó:** Vừa.
**Thời gian:** Vừa.
**Rủi ro:** Thấp.

### 4.4 Mega menu — thêm ảnh thumbnail cho category tile
**Tác động:** Trung bình — cảm giác cao cấp hơn (nhiều site FMCG Pháp dùng ảnh nhỏ trong mega menu).
**Component:** `src/components/hh/layout/MegaMenu.tsx`.
**Độ khó:** Vừa (cần ảnh đại diện/category — có thể dùng ảnh sản phẩm đầu tiên của mỗi category).
**Thời gian:** Vừa.
**Rủi ro:** Thấp.

### 4.5 Sticky mobile CTA theo ngữ cảnh trang
**Tác động:** Trung bình — hiện luôn là "Mua ngay/Tư vấn chọn mùi" y hệt trên mọi trang kể cả bài viết/nguyên liệu; trên PDP nên gắn thẳng vào sản phẩm đang xem.
**Component:** `src/components/hh/layout/StickyMobileCta.tsx`.
**Độ khó:** Vừa (cần biết route hiện tại + product context).
**Thời gian:** Vừa.
**Rủi ro:** Thấp.

### 4.6 "Thêm vào giỏ" hover-reveal ở desktop
**Tác động:** Thấp-Trung bình — hiện luôn hiện cố định trên card, chiếm không gian lưới desktop.
**Component:** `src/components/hh/product/ProductCard.tsx`.
**Độ khó:** Nhỏ-Vừa.
**Thời gian:** Nhỏ.
**Rủi ro:** Thấp, nhưng cần giữ nguyên hành vi luôn-hiện ở mobile (không có hover thật).

### 4.7 Focus restore sau khi đóng overlay
**Tác động:** Thấp — polish accessibility, không phải blocker (focus trap + Escape đã hoạt động).
**Component:** `use-focus-trap.ts` hoặc từng overlay.
**Độ khó:** Nhỏ-Vừa (cần lưu ref phần tử trigger trước khi mở).
**Thời gian:** Nhỏ.
**Rủi ro:** Thấp.

### 4.8 19 bài viết trùng nội dung/title
**Tác động:** Trung bình — SEO/trải nghiệm đọc (dù site đang noindex nên không ảnh hưởng index thật ngay bây giờ).
**Việc cần làm:** Quyết định biên tập (gộp thành 1 bài "Chăm sóc tóc theo từng loại" duy nhất, hoặc giữ nguyên nhưng viết lại 19 bài cho khác biệt thật) — **đây là quyết định nội dung, không phải việc kỹ thuật**.
**Độ khó:** Vừa-Lớn (phụ thuộc khối lượng biên tập).
**Thời gian:** Lớn.
**Rủi ro:** Thấp về kỹ thuật.

## 5. Long-term ideas (D)

### 5.1 Tracking / Analytics
**Hiện trạng:** Xác nhận bằng grep — **0 tracking nào tồn tại** (không GA4, không Meta Pixel, không GTM).
**Đề xuất:** Gắn GA4 + Meta Pixel qua Next.js `<Script>` trong root layout, track các sự kiện: add-to-cart, view-item, purchase (khi có checkout thật), search.
**Độ khó:** Vừa. **Thời gian:** Vừa. **Rủi ro:** Thấp, nhưng cần quyết định về consent/cookie banner đi kèm (GDPR-style) nếu công khai ra ngoài Việt Nam.

### 5.2 Design system chính thức
**Hiện trạng:** Chỉ có 9 color token (`--hh-*`), không có typography scale hay spacing scale dạng token — mọi nơi dùng trực tiếp class Tailwind (`text-2xl`, `text-base`...) không qua lớp trừu tượng.
**Đề xuất:** Viết `docs/design-system.md` + có thể thêm token `--hh-text-*`/`--hh-space-*` nếu team mở rộng nhanh, để tránh trôi dạt phong cách khi có nhiều người cùng sửa.
**Độ khó:** Vừa. **Thời gian:** Vừa. **Rủi ro:** Thấp (tài liệu hoá, không đổi UI hiện có).

### 5.3 Checkout/thanh toán thật
**Hiện trạng:** `/thanh-toan` là form demo, nút "Đặt hàng" không gọi backend thật, có disclaimer rõ ràng "đơn hàng demo nội bộ".
**Đề xuất:** Tích hợp cổng thanh toán thật (VNPay/Momo/ZaloPay phổ biến ở VN) khi chuyển sang production thật.
**Độ khó:** Lớn. **Thời gian:** Lớn. **Rủi ro:** Cao (liên quan tiền thật, cần review bảo mật riêng).

### 5.4 WordPress/WooCommerce migration readiness
**Hiện trạng:** Toàn bộ dữ liệu là JSON tĩnh import trực tiếp vào code (`src/data/catalog/*.json`), không qua CMS/API nào.
**Đánh giá:** Nếu mục tiêu cuối là chuyển sang WordPress/WooCommerce, cấu trúc dữ liệu hiện tại (phẳng, có `sku`/`slug`/`category`/`price` rõ ràng) khá thuận lợi để export sang WooCommerce CSV import format — nhưng cần viết script chuyển đổi riêng (không có sẵn). Các trường đặc thù demo (`priceMode: "inquiry"`, `referenceOnly`, `matchConfidence`) sẽ cần ánh xạ thủ công sang custom field hoặc bỏ qua khi lên production thật.
**Độ khó:** Lớn (không phải việc UI). **Thời gian:** Lớn. **Rủi ro:** Trung bình — phụ thuộc nhiều vào quyết định kiến trúc cuối cùng (Next.js headless + WP làm CMS, hay chuyển hẳn sang WP theme).

### 5.5 Review/rating thật
**Hiện trạng:** Toàn bộ sao/lượt đánh giá là số liệu demo bịa, không có cảnh báo riêng (khác với giá đã có disclaimer "Giá minh hoạ cho bản demo").
**Đề xuất:** Khi có review thật, thay thế trực tiếp (component `ProductReviews.tsx` đã có sẵn cấu trúc, chỉ cần đổi nguồn dữ liệu).
**Độ khó:** Nhỏ về code, phụ thuộc có review thật hay không.

## 6. Thứ tự triển khai đề xuất

1. **Đã xong:** Accessibility (Escape/scroll-lock/focus-trap/focus-visible), title trùng.
2. **Trước CEO review:** §3.1–3.4 (badge liên hệ báo giá, đổi màu badge tham khảo, robots.txt — đều nhỏ, làm trong 1 buổi).
3. **Song song, không chặn CEO review:** thu thập ảnh sản phẩm thật (§3.3) — việc dài hơi, bắt đầu càng sớm càng tốt.
4. **Trước production:** §4.1–4.8 theo độ ưu tiên tác động/công sức — gợi ý làm 4.2 (search) và 4.3 (sort) trước vì tác động conversion cao, 4.4/4.5/4.6 sau vì là polish.
5. **Dài hạn:** §5, quyết định theo roadmap kinh doanh thật (có build production thật hay dừng ở bản demo).
