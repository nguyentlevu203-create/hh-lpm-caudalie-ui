# HH × LPM — Full Data Visibility Report (Phase 4)

Ngày: 2026-07-15 · Branch: `hh-lpm-demo-data` · Trạng thái: hoàn tất, **chưa commit / chưa push / chưa deploy**.

Phase 4 đưa toàn bộ dữ liệu còn lại từ Phase 3 (147 sản phẩm hãng, 105 trang nội dung, 11 trang thương hiệu còn lại, 159 card/CTA, 1.161 media record) lên giao diện thật, đúng nhóm, không nhồi chung một trang. Baseline/gap-analysis đầy đủ nằm ở `docs/production/HH_LPM_DATA_TO_UI_COVERAGE_AUDIT.md` (viết trước khi sửa UI, theo đúng yêu cầu Part 1).

## Bảng tổng kết: imported / rendered / internal-only / unresolved

| Dataset | Imported | Rendered | Internal-only | Unresolved | Route/Component |
|---|---|---|---|---|---|
| Sản phẩm Hoàng Hà | 89 | 83 | 6 (thiếu SKU, quà tặng/bundle — quyết định giữ nguyên từ Phase 3) | 0 | `/san-pham`, `/san-pham/[slug]` |
| Sản phẩm hãng (LPM Pháp, referenceOnly) | 147 | **147** | 0 | 0 | `/thu-vien-san-pham-hang`, `/thu-vien-san-pham-hang/[slug]` |
| Nguyên liệu | 19 | 19 | 0 | 0 | `/nguyen-lieu`, `/nguyen-lieu/[slug]` |
| Bài viết | 71 | 71 | 0 | 0 | `/bai-viet`, `/bai-viet/[slug]` |
| Nội dung thương hiệu (06_Brand_content, 14 dòng) | 14 | **14** (3 route đặt tên cũ + 11 route mới) | 0 | 0 | `/thuong-hieu`, `/cam-ket`, `/cong-thuc-minh-bach`, `/noi-dung-thuong-hieu/[slug]` |
| Trang nội dung độc nhất (05_Trang_noi_dung, `ingredient_index_page`) | 1 | **1** | 0 | 0 | `/noi-dung-thuong-hieu/thanh-phan-cua-chung-toi-chiet-xuat-vung-provence-chiet-xuat-huu-co` |
| Trang nội dung trùng lặp (05_Trang_noi_dung, 3 pageType duplicate) | 104 | 0 trang riêng (đúng thiết kế — dedupe) | **104** (giữ metadata canonical/duplicate, link "xem bản chính") | 0 | Danh sách tại `/noi-dung-thuong-hieu` |
| Card/CTA | 159 | **159** (147 gắn vào trang đích cụ thể qua carousel + 12 hiển thị tại thư viện) | 0 | 0 | `/thu-vien-noi-dung` + `ContentCardCarousel` trên trang liên quan |
| Media library | 1.161 | **1.161** metadata (474 có ảnh local thật, 687 chỉ metadata) | 0 | 0 | `/thu-vien-hinh-anh` |

**100% của 4.382 dòng gốc (tính cả Phase 3) giờ đã có nơi hiển thị hoặc lý do internal-only tường minh — không còn dữ liệu "nằm im" trong JSON mà không có route nào trỏ tới.**

## Chi tiết theo Part

### Part 2 — Thư viện sản phẩm hãng
- `scripts/download-brand-library-images.mjs`: 147/147 ảnh chính có local file (34 tái sử dụng từ ảnh HH product đã tải, 113 tải mới, 0 lỗi).
- `/thu-vien-san-pham-hang`: search + filter theo `categoryRaw` (4 nhóm) + pagination (24/trang, 7 trang) — verify qua browser: 147 kết quả hiển thị đúng, phân trang hoạt động.
- `/thu-vien-san-pham-hang/[slug]`: disclaimer "Danh mục tham khảo..." luôn hiển thị, **không có nút mua/thêm giỏ hàng ở bất kỳ đâu** (verify bằng đọc code `BrandLibraryCard`/detail page — không import `useSiteUI`/`addToCart`).

### Part 3 — Toàn bộ nội dung thương hiệu
- Dedupe bằng so khớp `sourceUrl` chính xác tuyệt đối — verify: 19/19 (nguyên liệu), 71/71 (bài viết), 14/14 (brand_content) khớp 100%, không cần fuzzy match.
- `/noi-dung-thuong-hieu`: 15 trang gốc (14 canonical + 1 trang mục lục độc nhất) dạng lưới ảnh thật, cộng danh sách đầy đủ 104 bản trùng lặp có link "xem bản chính" theo 3 nhóm.
- `/noi-dung-thuong-hieu/[slug]`: 12 trang mới (11 canonical chưa có route + 1 trang độc nhất); 3 slug đã có route cũ (`thuong-hieu-le-petit-marseillais`, `le-petit-marseillais-cam-ket-...`, `cong-thuc-cua-chung-toi-...`) redirect 307 về route cũ thay vì tạo trang trùng — verify qua `fetch` trực tiếp, đúng 307.
- `/thuong-hieu`, `/cam-ket`, `/cong-thuc-minh-bach`: không sửa nội dung, chỉ thêm `ContentCardCarousel` cuối trang.

### Part 4 — 159 Card/CTA
- `scripts/build-cards-library.mjs`: phân loại 2 lớp (path-bucket + exact URL match). Kết quả: nguyên liệu 21, nội dung thương hiệu 16, sản phẩm 65, bài viết 55, campaign 1, chưa phân loại 1, CTA chung 0 (không có card nào thực sự thuộc nhóm này trong dữ liệu — không ép buộc gán).
- 147/159 card khớp được trang đích cụ thể (`matchedRoute`); 156/159 tải được ảnh (3 URL lỗi → hiển thị placeholder gradient, không phải ảnh vỡ).
- Component dùng lại: `ContentCard`, `ContentCardGrid`, `ContentCardCarousel` — verify: card không có `matchedRoute` luôn hiện nhãn "Chưa phân loại — dữ liệu demo nội bộ" và không phải là link.
- `/thu-vien-noi-dung`: đủ 159 card, nhóm theo 7 danh mục, không bỏ sót dòng nào.
- Carousel "Nội dung liên quan" gắn vào: `/nguyen-lieu/[slug]`, `/bai-viet/[slug]`, `/thuong-hieu`, `/cam-ket`, `/cong-thuc-minh-bach`, `/noi-dung-thuong-hieu/[slug]`, `/thu-vien-san-pham-hang/[slug]`.

### Part 5 — Media library
- `scripts/build-media-library-index.mjs`: đối chiếu URL với mọi ảnh đã tải hợp lệ trong toàn dự án (sản phẩm, sản phẩm hãng, nguyên liệu, bài viết, nội dung thương hiệu, card) — 474/1.161 khớp, có ảnh local thật; 687 còn lại chỉ hiển thị metadata + "Chưa tải", **không hotlink** URL gốc.
- `/thu-vien-hinh-anh`: pagination server-side 60/trang (20 trang), filter theo `sourceSheet`/`imageType`/`downloadStatus` qua query param — verify qua browser tại cả desktop và mobile (390px), không tràn ngang.
- Verify không có ảnh vỡ: các dòng `downloadStatus="not_downloaded"` render icon `ImageOff` + text, không có thẻ `<Image>`/`<img>` nào trỏ tới URL remote.

### Part 6 — Homepage
- `HeroCampaign`: slide 1 dùng ảnh trang thương hiệu (`thuong-hieu-le-petit-marseillais`), slide 2 dùng ảnh nguyên liệu "Hoa cam".
- `FeaturedCollection`: 7 tile theo 7 danh mục, mỗi tile dùng ảnh sản phẩm thật đầu tiên có ảnh trong danh mục đó (fallback gradient nếu danh mục không có ảnh).
- `AdvisorBanner`: ảnh nguyên liệu "Oải hương" (lavande) — khớp chủ đề tư vấn mùi hương.
- `FullBleedBrandStory`: ảnh trang "Cam kết bảo vệ môi trường tại Provence".
- `SocialFeed`: 6 ảnh bài viết thật đầu tiên có ảnh.
- Tất cả 5 component đã chuyển "use client" (nếu chưa) và có `onError` fallback về `ProductPlaceholderArt` gốc — verify bằng browser screenshot desktop, cả 5 vị trí hiển thị ảnh thật, không còn gradient thuần ở nơi đã có ảnh phù hợp. Không dùng asset Caudalie, không dùng ảnh không liên quan.

### Part 7 — Search toàn bộ
- `src/lib/search.ts`: hàm `searchSite()` dùng chung, trả kết quả nhóm theo 7 loại (giới hạn 6 kết quả/nhóm để không tràn panel).
- `SearchOverlay` hiển thị từng nhóm có heading riêng: Sản phẩm Hoàng Hà, Sản phẩm hãng (tham khảo), Nguyên liệu, Bài viết, Nội dung thương hiệu, Card/CTA, Hình ảnh.
- Verify bằng browser với query "hoa": 35 kết quả, đủ nhóm sản phẩm Hoàng Hà / sản phẩm hãng / nội dung thương hiệu / card hiển thị đúng, card sản phẩm hãng luôn dùng `BrandLibraryCard` (không có nút thêm giỏ).
- Media chỉ tìm theo `altTextVi` (228/1.161 record có alt text) — media record không có route riêng nên không phải là link, chỉ hiển thị thumbnail + caption.

### Part 8 — Navigation
- Thêm 4 mục vào cột footer "Về Hoàng Hà": Thư viện sản phẩm hãng, Nội dung thương hiệu, Thư viện nội dung, Thư viện hình ảnh.
- Mega menu / nav chính giữ nguyên, không thêm mục nào (đúng yêu cầu "không làm menu chính quá dài").

## QA thực hiện

- **`npm run check`**: `lint` 0 lỗi / 0 cảnh báo, `typecheck` sạch, `build` thành công — 428 route được tạo (360 static + dynamic), không route nào lỗi.
- **Browser QA trực tiếp** (desktop 1440px + mobile 390px, Chrome MCP):
  - Trang chủ: 5 section đã thay placeholder hiển thị ảnh thật, không ảnh vỡ.
  - `/thu-vien-san-pham-hang` (+ detail): filter, search, pagination, disclaimer, không có nút mua — đều hoạt động đúng ở cả 2 kích thước màn hình, không tràn ngang.
  - `/noi-dung-thuong-hieu` (+ index/detail): 15 trang chính hiển thị ảnh thật, 104 bản trùng lặp liệt kê đủ với link "xem bản chính"; redirect 307 cho 3 slug cũ hoạt động đúng.
  - `/thu-vien-noi-dung`: 159 card nhóm theo 7 danh mục.
  - `/thu-vien-hinh-anh` (+ filter): ảnh local hiển thị đúng, phần chưa tải hiện "Chưa tải" không có ảnh vỡ, filter server-side qua query param hoạt động.
  - Search overlay: nhóm kết quả rõ ràng cho query "hoa" (35 kết quả), sản phẩm hãng luôn không có nút giỏ hàng.
- **Route-level verify**: `fetch` tới toàn bộ route mới + các route hiện có (`/`, `/nguyen-lieu/[slug]`, `/bai-viet/[slug]`, `/thuong-hieu`, `/cam-ket`, `/cong-thuc-minh-bach`) — tất cả trả 200, riêng slug trùng route cũ trả 307 đúng thiết kế.
- **referenceOnly không thể mua**: xác nhận bằng đọc code — `BrandLibraryCard`, trang chi tiết `/thu-vien-san-pham-hang/[slug]`, và kết quả search "Sản phẩm hãng" đều không import `addToCart`/`useSiteUI`.

## npm run check — kết quả cuối cùng

```
lint: 0 problems (0 errors, 0 warnings)
typecheck: pass
build: ✓ Compiled successfully — 428 routes generated, 0 build errors
```

## Việc chưa làm (nằm ngoài phạm vi Phase 4, ghi nhận minh bạch)

- 687/1.161 media record vẫn chỉ có metadata (đúng thiết kế "không hotlink ảnh chưa dùng" — không phải thiếu sót).
- 3/159 card ảnh tải lỗi (URL nguồn không phản hồi) — hiển thị placeholder gradient, không chặn hiển thị card.
- 6 dòng sản phẩm Hoàng Hà thiếu SKU (quà tặng/bundle/trùng) vẫn giữ nguyên trạng thái internal-only từ Phase 3 — không tạo PDP giả vì sẽ phải tự đặt định danh (không có trong nguồn).

## Trạng thái Git

Không commit. Không push. Không deploy. Không merge. Không tạo tag — đúng yêu cầu.
