# HH × LPM — Data-to-UI Coverage Audit (Phase 4, Part 1)

Ngày: 2026-07-15 · Branch: `hh-lpm-demo-data` · Trạng thái: audit trước khi sửa UI (không có thay đổi code nào trong tài liệu này).

Mục đích: liệt kê chính xác, theo từng sheet nguồn / dataset đã nhập ở Phase 3, số dòng đã nhập, số dòng đang thực sự render trên giao diện, route/component đang dùng, số dòng chưa render và lý do, và route mới cần tạo ở Phase 4. Số liệu lấy trực tiếp từ `src/data/**/*.json` và grep thực tế trên `src/app`/`src/components`, không dựa vào báo cáo Phase 3 cũ.

## Bảng tổng hợp

| # | Sheet nguồn | Dataset (`src/data`) | Đã nhập | Đang render | Route/Component hiện tại | Chưa render | Nguyên nhân | Route mới (Phase 4) |
|---|---|---|---|---|---|---|---|---|
| 1 | `hh_web_company.xlsx` (sheet sản phẩm) | `catalog/products.json` → `catalog/hh-products-derived.json` | 89 | 83 | `/san-pham`, `/san-pham/[slug]` (`ProductGrid`/`ProductCard`) | 6 | Không có SKU (quà tặng/bundle không có mã, hoặc trùng sản phẩm đã có SKU) — không đủ khoá để tạo slug/PDP đáng tin cậy; đã ghi nhận từ Phase 3, ngoài phạm vi Phase 4 (không fabricate SKU) | Không tạo — giữ nguyên, ghi rõ lý do internal-only ở đây |
| 2 | `00_Tổng quan CMO` (raw grid) | `products.json._meta["00_Tổng quan CMO_rawGrid"]` | toàn bộ (metadata) | 0 | — | toàn bộ | Đây là bảng tổng quan/phương pháp luận nội bộ, không phải nội dung sản phẩm — không có gì để "render" cho khách | Không áp dụng (N/A — internal-only by design) |
| 3 | `05_Từ điển chuẩn hoá` | `products.json._meta["05_Từ điển chuẩn hoá"]` | toàn bộ (metadata) | 0 | — | toàn bộ | Từ điển chuẩn hoá thuật ngữ dùng nội bộ cho pipeline import, không phải nội dung hiển thị | Không áp dụng (N/A — internal-only by design) |
| 4 | `lpm_brand_web.xlsx` → `01_San_pham` | `catalog/brand-products.json` | 147 | **0** | — | 147 | Chỉ dùng ngầm làm dữ liệu tham chiếu để match ảnh cho sản phẩm Hoàng Hà; chưa có trang danh sách/chi tiết nào cho khách xem | `/thu-vien-san-pham-hang`, `/thu-vien-san-pham-hang/[slug]` |
| 5 | `02_Anh_san_pham` | `content/media-library.json` (354/1161 dòng, `sourceSheet="02_Anh_san_pham"`) | 354 | **0** (là URL nguồn, chưa host local, chưa có trang liệt kê) | — | 354 | Ảnh phụ trợ sản phẩm hãng, chưa từng được tải/host cục bộ hay hiển thị dưới bất kỳ hình thức nào | `/thu-vien-hinh-anh` (metadata + ảnh local khi trùng URL đã tải) |
| 6 | `03_Nguyen_lieu` | `content/ingredients.json` → `content/ingredients-derived.json` | 19 | 19 | `/nguyen-lieu`, `/nguyen-lieu/[slug]` | 0 | — | — |
| 7 | `04_Bai_viet_MKT` | `content/articles.json` → `content/articles-derived.json` | 71 | 71 (66 có ảnh, 5 không có ảnh nguồn → placeholder) | `/bai-viet`, `/bai-viet/[slug]` | 0 | — | — |
| 8 | `05_Trang_noi_dung` | `content/brand-pages.json` (pageType ≠ `brand_content`) | 105 | **0** | — | 105 | 100% là bản scrape trùng lặp (đã verify bằng `sourceUrl` khớp chính xác 1-1): 19 trùng nguyên liệu, 71 trùng bài viết, 14 trùng brand_content, 1 trang mục lục nguyên liệu duy nhất không trùng ai | `/noi-dung-thuong-hieu` (liệt kê + link "xem bản chính" cho 104 bản trùng) + `/noi-dung-thuong-hieu/[slug]` (trang riêng cho 1 bản ghi duy nhất) |
| 9 | `06_Brand_content` | `content/brand-pages.json` (pageType = `brand_content`) → `content/brand-pages-derived.json` | 14 | 3 | `/thuong-hieu`, `/cam-ket`, `/cong-thuc-minh-bach` | 11 | Chỉ 3/14 dòng được gán route riêng thủ công ở Phase 3; 11 dòng còn lại đã có đủ dữ liệu + ảnh trong `brand-pages-derived.json` nhưng không có route nào trỏ tới | `/noi-dung-thuong-hieu/[slug]` (11 trang còn lại); 3 route hiện tại giữ nguyên |
| 10 | `07_Cards_CTA` | `content/cards.json` | 159 | **0** | — | 159 | Chưa từng được đọc bởi bất kỳ route/component nào (`grep -rl "cards.json\|cards\.json" src/app src/components` → rỗng) | `/thu-vien-noi-dung` (toàn bộ 159, phân nhóm) + carousel gắn vào trang đích cho card khớp được URL nguồn |
| 11 | `08_Thu_vien_anh` | `content/media-library.json` (807/1161 dòng, `sourceSheet="08_Thu_vien_anh"`) | 807 | **0** | — | 807 | Thư viện ảnh thô của hãng, thuần metadata, chưa từng tải/host hay liệt kê | `/thu-vien-hinh-anh` |
| 12 | (không có sheet legal/policy trong 2 workbook) | `content/legal-pages.json` | 0 | 0 | — | 0 | Đúng như thiết kế Phase 3 — không có sheet chính sách/pháp lý trong nguồn, không có gì để nhập hay hiển thị | Không áp dụng |

## Ghi chú phương pháp dedupe (mục 8)

`05_Trang_noi_dung` được xác định là bản scrape HTML thô của toàn bộ trang web hãng, trong khi `03_Nguyen_lieu`/`04_Bai_viet_MKT`/`06_Brand_content` là các sheet đã được cấu trúc hoá thủ công từ cùng nguồn. Việc match được thực hiện bằng so khớp **chính xác tuyệt đối** trường `sourceUrl` (URL gốc trên `lepetitmarseillais.com`) giữa hai phía — không dùng fuzzy/text-similarity, không có rủi ro match sai:

| pageType (05_Trang_noi_dung) | Số dòng | Khớp `sourceUrl` với | Tỷ lệ khớp |
|---|---|---|---|
| `generic_scrape_duplicate_of_ingredient` | 19 | `content/ingredients.json` (19) | 19/19 (100%) |
| `generic_scrape_duplicate_of_article` | 71 | `content/articles.json` (71) | 71/71 (100%) |
| `generic_scrape_duplicate_of_brand_content` | 14 | `content/brand-pages.json` pageType=`brand_content` (14) | 14/14 (100%) |
| `ingredient_index_page` | 1 | Không trùng ai — là trang mục lục "Thành phần của chúng tôi", nội dung độc nhất | 0/1 (nội dung riêng, cần trang của chính nó) |

→ 104/105 dòng là bản sao 1-1 hoàn toàn xác định của nội dung đã render ở nơi khác; sẽ được giữ đầy đủ metadata (`canonical/duplicate`) và link "xem bản chính" thay vì tạo 104 trang trùng lặp nội dung. 1 dòng còn lại là nội dung độc nhất, sẽ có trang riêng.

## Ghi chú match card→trang đích (mục 10, chi tiết hoá trước khi code)

So khớp `targetUrl` của 159 card với `sourceUrl`/`productUrl` của 4 dataset canonical:

| Khớp với | Số card |
|---|---|
| Nguyên liệu (`ingredients.json`) | 19 |
| Bài viết (`articles.json`) | 52 |
| Nội dung thương hiệu (`brand_content`) | 16 |
| Sản phẩm hãng (`brand-products.json`) | 60 |
| Không khớp (`targetUrl` không trỏ tới bản ghi canonical nào) | 12 |
| **Tổng** | **159** |

12 card không khớp sẽ hiển thị tại `/thu-vien-noi-dung` với nhãn "Chưa phân loại — dữ liệu demo nội bộ" theo đúng yêu cầu Phase 4 Part 4.

## Kết luận

- 100% dữ liệu (4.382 dòng gốc, tính cả 2 dòng `_meta` nội bộ) đã **nhập** vào JSON từ Phase 3 — không có dòng nào bị bỏ sót hay cần nhập lại.
- Trước Phase 4: chỉ **83 sản phẩm + 19 nguyên liệu + 71 bài viết + 3 trang thương hiệu** thực sự hiển thị được cho khách — phần còn lại (147 sản phẩm hãng, 105 trang nội dung, 11 trang thương hiệu, 159 card, 1.161 media) nằm im trong JSON.
- Phase 4 sẽ tạo 5 route mới (`/thu-vien-san-pham-hang[+ /[slug]]`, `/noi-dung-thuong-hieu[+ /[slug]]`, `/thu-vien-noi-dung`, `/thu-vien-hinh-anh`) để đưa toàn bộ phần còn lại lên giao diện đúng nhóm, không nhồi chung một trang, không tạo nội dung trùng lặp không cần thiết.
- 6 dòng sản phẩm Hoàng Hà thiếu SKU và 2 khối `_meta` nội bộ (mục 1–3) được xác nhận là internal-only hợp lệ, không cần route.

Bắt đầu triển khai UI từ Part 2 sau tài liệu này.
