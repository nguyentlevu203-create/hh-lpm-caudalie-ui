# HH × LPM — Full Website Audit Report

Ngày: 2026-07-16 · Branch: `hh-lpm-demo-data` · Commit nền: `970944a` (+ các fix chưa commit của phiên audit này). Không merge `master`, không deploy production, `/reference/*` không bị đụng tới.

## 1. Phạm vi kiểm tra

- Đọc toàn bộ AGENTS.md, package.json, cấu trúc `src/app/`, `src/components/hh/`, `src/data/`, và 5 báo cáo bắt buộc trong `docs/production/` (UI Alignment Pass 2, Offers/Advisor Visual QA, PDP/Category Visual QA, Full Data Visibility, Demo Release Candidate) trước khi sửa bất kỳ dòng code nào.
- Crawl tự động toàn bộ 360 route (357 SSG/static + 3 server-rendered) bằng script tự viết: HTTP status, link nội bộ hỏng, ảnh local thiếu, ảnh load lỗi, slug trùng, metadata thiếu, title trùng, redirect.
- QA trình duyệt trực tiếp trên toàn bộ nhóm route đại diện theo yêu cầu (trang chính, thư viện, nội dung thương hiệu, search).
- Breakpoint QA tại 1440 / 1100 / 1024 / 834 / 500px, xác nhận bằng `window.innerWidth` thực tế (không dùng số yêu cầu resize).
- Đánh giá UI/UX 8 nhóm tiêu chí (visual hierarchy, typography, spacing, color, images, components, brand experience, conversion UX).
- Interaction QA: header/mega menu, search, category filter, PDP, cart, content.
- Accessibility audit — trọng tâm re-verify 4 lỗi đã biết từ báo cáo cũ.
- Technical audit: console, dead code, href="#", robots/SEO, lint/typecheck/build.
- Performance: đánh giá qua code (không có Lighthouse trong môi trường này — ghi rõ, không bịa điểm).
- 2 file cũ trong `docs/reports/` (untracked) không bị động tới.

Hai file thay đổi từ phiên làm việc trước (fix bug tư vấn chọn mùi, `src/app/san-pham/page.tsx` + `src/data/products.ts`) đã có sẵn trong working tree khi audit bắt đầu — được giữ nguyên, không revert, tính là một phần baseline của phiên audit này.

## 2. Route đã kiểm tra

**Crawl tự động:** toàn bộ 360 route.

**QA trình duyệt trực tiếp:**
- Trang chính: `/`, `/san-pham`, 5 PDP (`sua-tam-huu-co-...-qua-dao-xuan-dao`, `gel-tam-phap-...-hoa-tiare` + bản `-2` trùng tên, `sua-tam-huu-co-...-hoa-hong-dai`, `son-duong-moi-3-trong-1-...`), `/uu-dai`, `/tu-van-chon-san-pham`, `/cau-chuyen-thuong-hieu`.
- Thư viện: `/thu-vien-san-pham-hang` + 1 trang chi tiết, `/thu-vien-noi-dung`, `/thu-vien-hinh-anh`.
- Nội dung thương hiệu: `/noi-dung-thuong-hieu` + 2 trang chi tiết, 2 trang nguyên liệu, 2 bài viết.
- Search: query phổ biến ("hoa" — 35 kết quả/7 nhóm), query không kết quả, query dài/tự nhiên (phát hiện hạn chế thuật toán — xem §5), click-through kết quả.

## 3. Breakpoint đã test

Xác nhận qua `window.innerWidth` thực tế trên tab riêng (tool `resize_window` không map 1:1 pixel trong môi trường này, đã ghi nhận từ các báo cáo trước — lần này retry bằng tab mới cho tới khi khớp đúng số yêu cầu):

| Mục tiêu | `innerWidth` xác nhận | Route đã test |
|---|---|---|
| 1440 | 1440 chính xác | Home, San phẩm, PDP, Thư viện hình ảnh |
| 1100 | 1100 chính xác | Home |
| 1024 | 1024 chính xác | Home |
| 834 | 834 chính xác | Home |
| 500 | 500 chính xác | Home, Sản phẩm (grid 2 cột + filter drawer), PDP, Thư viện hình ảnh |

Không tràn ngang (`scrollWidth == clientWidth`) ở bất kỳ route/breakpoint nào đã test. Không wrap nav thành 2 dòng. Sticky CTA mobile không che footer/trust-band. Filter drawer/mega menu không vượt viewport.

## 4. Lỗi phát hiện

### SEV-1 (crash / route hỏng / mất dữ liệu)
Không phát hiện.

### SEV-2 (overflow / accessibility blocker / interaction sai / link-ảnh hỏng)

| # | Mô tả | Route/phạm vi | Nguyên nhân | Trạng thái |
|---|---|---|---|---|
| 1 | Không overlay nào (cart, search, mobile menu, filter drawer, auth) đóng bằng phím Escape | Toàn site | `SiteUIContext` và `ProductFilterDrawer` không có `keydown` handler | **Đã sửa** |
| 2 | Không khóa scroll nền khi overlay mở — nội dung phía sau vẫn cuộn được | Toàn site | Không có logic set `document.body.style.overflow` | **Đã sửa** |
| 3 | Không có focus trap — Tab có thể thoát khỏi overlay ra nội dung phía sau; không tự focus vào overlay khi mở | Toàn site | Không có quản lý focus trong bất kỳ component overlay nào | **Đã sửa** |
| 4 | 8 vị trí input dùng `outline-none`/`focus:outline-none` không có thay thế focus-visible (rớt ra ngoài chuẩn WCAG focus-visible) | SignInForm, RegisterForm, Footer newsletter, SearchOverlay, BrandLibraryFilterBar, MediaLibraryFilterBar, CheckoutContent (3 field + textarea) | Style gốc chỉ ẩn outline mặc định, không thêm gì thay thế | **Đã sửa** |

### SEV-3 (spacing/typography/consistency/UX chưa tối ưu)

| # | Mô tả | Route | Trạng thái |
|---|---|---|---|
| 5 | 6 cặp PDP sản phẩm HH + 1 cặp thư viện sản phẩm hãng có `<title>` trùng byte-for-byte (cùng tên, khác dung tích/SKU thật — vd Gel Tắm Hoa Tiaré 250ml vs 650ml) | `/san-pham/[slug]`, `/thu-vien-san-pham-hang/[slug]` | **Đã sửa** — thêm dung tích vào `<title>` khi trùng tên |
| 6 | 19 trang bài viết (11 "chăm sóc tóc" + 8 "chăm sóc cơ thể") có `<title>` trùng nhau — cùng là trang hub nguồn của LPM Pháp bị scrape nhiều lần theo từng query filter khác nhau (`?type_de_cheveux=...`), nội dung mainContent gần giống nhau (diễn giải lại, không phải trống) | `/bai-viet/*` | **Không tự sửa** — đây là vấn đề chất lượng dữ liệu nguồn (cần gộp/biên tập lại nội dung), không phải lỗi code; đưa vào roadmap |
| 7 | Search chỉ so khớp bằng một chuỗi `.includes()` duy nhất trên toàn bộ query — không tách từ, nên câu tìm kiếm tự nhiên dài (có thêm từ đệm) dễ ra 0 kết quả dù chứa đúng tên sản phẩm | Search overlay toàn site | Không tự sửa (thay đổi thuật toán xếp hạng, rủi ro cao hơn "SEV-3 nhỏ") — đưa vào roadmap |
| 8 | PDP "Có thể bạn sẽ thích" (related products) chỉ hiển thị 1 sản phẩm cho một số PDP (danh mục nhỏ, ví dụ "Son dưỡng môi") | Một số PDP | Không sửa — hành vi đúng theo logic (lọc theo cùng category/scent), chỉ là danh mục đó ít sản phẩm; không phải bug |
| 9 | Không có control sắp xếp (giá, bán chạy, mới nhất) trên `/san-pham`, chỉ có filter | `/san-pham` | Không sửa (thêm tính năng mới, ngoài phạm vi "SEV-3 nhỏ") — đưa vào roadmap |
| 10 | robots.txt trả 404 (không có file tĩnh) | sitewide | Không sửa — rủi ro thấp vì đã có `<meta name="robots" content="noindex,...">` toàn site trong root layout, xác nhận hoạt động đúng | Ghi nhận, roadmap D |

### SEV-4 (đề xuất thẩm mỹ / nice-to-have)
Xem `HH_LPM_UI_UX_UPGRADE_ROADMAP.md`.

## 5. Chi tiết kỹ thuật các lỗi đã sửa

### 5.1 Accessibility — Escape / scroll-lock / focus-trap
**File:** `src/components/hh/SiteUIContext.tsx`, `src/lib/use-focus-trap.ts` (mới), `src/components/hh/cart/CartDrawer.tsx`, `src/components/hh/search/SearchOverlay.tsx`, `src/components/hh/layout/MobileDrawer.tsx`, `src/components/hh/auth/AuthOverlay.tsx`, `src/components/hh/product/ProductFilterDrawer.tsx`

**Cách tái hiện (trước khi sửa):** mở overlay bất kỳ → nhấn Escape → overlay không đóng. Mở overlay → `getComputedStyle(document.body).overflow` = `"visible"` → nền vẫn cuộn được.

**Nguyên nhân:** `SiteUIContext` (điều khiển cart/search/auth/menu qua state `active` chung) không có bất kỳ `keydown` listener hay body-overflow logic nào. `ProductFilterDrawer` quản lý state `open` riêng, cũng không có.

**Cách sửa:** Thêm 1 `useEffect` tập trung trong `SiteUIProvider`, khoá theo `active` — set `document.body.style.overflow = "hidden"` và lắng nghe Escape để đóng; sửa 1 lần cho cả 4 overlay dùng chung state. Thêm effect tương tự riêng cho `ProductFilterDrawer`. Thêm hook dùng chung `useFocusTrap(ref, isOpen)` — tự focus phần tử đầu tiên khi mở, khoá Tab/Shift+Tab trong phạm vi overlay — áp dụng cho cả 5 overlay.

**Kết quả retest (browser trực tiếp):**
- SearchOverlay: mở → `document.activeElement` = ô tìm kiếm (tự focus), `body.overflow` = `"hidden"`. Escape → đóng, `body.overflow` = `"visible"`.
- CartDrawer: mở → focus vào nút đóng, scroll khoá. Escape → đóng đúng, `aria-hidden` = `"true"`.
- ProductFilterDrawer (`/san-pham`): mở → focus vào "Đóng bộ lọc", scroll khoá. Escape → đóng đúng.
- AuthOverlay: mở → scroll khoá, focus vào trong panel.

### 5.2 Accessibility — input `outline-none` không có focus-visible
**File:** 8 vị trí liệt kê ở bảng SEV-2 mục 4.
**Cách sửa:** Thêm `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hh-primary` — đúng pattern đã dùng ổn định trong `Header.tsx` từ lần rebuild nav trước. Không đổi layout/màu sắc khi không focus.

### 5.3 SEO — title trùng
**File:** `src/app/san-pham/[slug]/page.tsx`, `src/app/thu-vien-san-pham-hang/[slug]/page.tsx`
**Cách sửa:** Tính tập tên sản phẩm bị trùng ở module scope (so đếm trong `HH_PRODUCTS`/`HH_BRAND_LIBRARY`), nếu `product.name` nằm trong tập trùng và có `volume` thì nối thêm ` — {volume}` vào `<title>`. Verify: `Gel Tắm Pháp Le Petit Marseillais Dịu Nhẹ Hoa Tiaré — 250ml` vs `— 650ml`.

## 6. Accessibility — tổng kết

4/4 lỗi đã biết từ báo cáo cũ đều **còn tồn tại** tại thời điểm audit, đã xác minh lại bằng cả đọc code lẫn test trực tiếp trên browser trước khi sửa, và cả 4 đều đã được sửa + retest thành công. Ngoài 5 input `outline-none` gốc, phát hiện thêm 3 vị trí mới phát sinh từ các trang xây dựng sau báo cáo cũ (checkout, brand-library filter, media-library filter) — đã sửa đồng bộ.

Hạn chế còn lại: focus trap chỉ trap trong phạm vi overlay đang mở (đúng yêu cầu), chưa implement khôi phục focus về phần tử đã trigger mở overlay sau khi đóng (nice-to-have, không phải blocker).

## 7. Performance

Không có Lighthouse hoặc công cụ tương đương trong môi trường này — **không chạy, không bịa điểm**. Đánh giá qua code:
- Toàn bộ ảnh sản phẩm/nội dung dùng `next/image` → tự động responsive `srcset`, lazy-load mặc định, tối ưu định dạng qua Next Image Optimizer.
- Ảnh hero dùng `priority` — đúng cho LCP.
- 687/1.161 record thư viện ảnh chỉ metadata, không hotlink — không tốn băng thông thật.
- Search chạy client-side trên toàn bộ dữ liệu tĩnh đã import — không có network request mỗi lần gõ phím, nhưng toàn bộ catalog (~4.400 dòng) nằm trong JS bundle. Chưa đo bundle size thực tế (không có bundle-analyzer chạy) — ghi nhận là điểm cần theo dõi khi catalog lớn hơn.

## 8. SEO

- Sitewide `noindex, nofollow, nocache` (root layout) — xác nhận có mặt trong HTML mọi route đã test. Đúng cho bản demo nội bộ.
- robots.txt / sitemap.xml: cả hai 404 (không có file tĩnh) — chấp nhận được vì noindex đã chặn index ở cấp trang, nhưng nên có robots.txt thật (`Disallow: /`) để phòng vệ kép — roadmap D.
- Title trùng: đã sửa 7/7 cặp sản phẩm (§5.3); 19 trang bài viết trùng title vẫn còn — vấn đề dữ liệu nguồn, roadmap B.
- Metadata title/description: 0 thiếu trên 357 trang thực (crawl xác nhận).
- Canonical: không có thẻ `<link rel="canonical">` nào trên site — không phát sinh vấn đề vì site đã noindex toàn bộ; không cần thiết cho bản demo.

## 9. Hạn chế của đợt audit này

- Không test được `/reference/*` theo đúng yêu cầu (không được sửa — chỉ xác nhận các route đó không bị ảnh hưởng bởi thay đổi).
- Không chạy Lighthouse/Core Web Vitals thật.
- 19 bài viết trùng title chưa xử lý (cần quyết định biên tập, không phải quyết định kỹ thuật).
- Chỉ test chức năng search với 1 query dài — chưa thử tất cả các biến thể query có thể gây 0 kết quả sai.
- Chưa test kỹ Tab-cycling thủ công từng phím một qua devtools thật (tool automation không phản ánh đúng real keyboard focus cho việc kiểm tra `document.activeElement` theo từng bước Tab) — đã verify qua code + hành vi tổng thể (auto-focus khi mở, trap hoạt động theo test JS trực tiếp).
