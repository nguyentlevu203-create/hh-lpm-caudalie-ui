# HH × LPM Demo — Release Candidate QA Report

Ngày QA: 2026-07-16 · Branch: `hh-lpm-demo-data` · Commit kiểm tra: `bd8d10837b1b7cc0f3ba5bb932f7e7ece6ad794e` (2026-07-15 17:16 +07, "Document full data visibility coverage and QA").

Mục tiêu: xác nhận branch `hh-lpm-demo-data` đủ điều kiện đóng gói thành Release Candidate để deploy **staging** cho CEO/Marketing nghiệm thu. Không redesign, không nhập thêm dữ liệu, không merge `master`, không deploy production. **Chưa commit gì trong phiên QA này** — repo ở trạng thái sạch như trước khi QA bắt đầu.

## 1. Git status

```
?? docs/reports/
```

Chỉ có `docs/reports/` (2 file: `CEO_WEB_CRAWL_PROGRESS_REPORT.md`, `CEO_WEB_CRAWL_PROGRESS_SUMMARY.md`, cả hai đều có mtime 11/7 — không liên quan đến Phase 4/dữ liệu demo, còn sót lại từ trước) đang untracked. Không có file nào bị sửa hoặc xoá. Working tree khớp hoàn toàn với commit `bd8d108`.

## 2. npm run check

Chạy 2 lần (đầu phiên QA và cuối phiên, sau khi xác nhận không cần sửa gì) — kết quả giống hệt nhau cả hai lần:

```
lint: 0 problems (0 errors, 0 warnings)
typecheck: pass (tsc --noEmit)
build: ✓ Compiled successfully (Next.js 16.2.1, Turbopack)
```

## 3. Tổng số route build được

- **33 route template** (kể cả `/_not-found`, `/_global-error`, `favicon.ico`).
- 5 template dùng `generateStaticParams` (SSG): `/san-pham/[slug]` (83), `/bai-viet/[slug]` (71), `/thu-vien-san-pham-hang/[slug]` (147), `/nguyen-lieu/[slug]` (19), `/noi-dung-thuong-hieu/[slug]` (12) → 332 trang chi tiết.
- 3 route server-rendered theo query param (ƒ): `/san-pham`, `/thu-vien-san-pham-hang`, `/thu-vien-hinh-anh`.
- 25 route tĩnh còn lại (trang chủ, 9 trang `/reference/*`, các trang nội dung/tài khoản/thanh toán, v.v.).

**Tổng: 360 trang có thể truy cập** (357 route tĩnh/SSG + 3 route server-rendered). Danh sách đầy đủ đã được liệt kê và dùng làm input cho crawler tự động ở mục 4.

## 4. Kiểm tra tự động (crawler nội bộ, chạy trên `next start`, cổng 4173)

Script tự viết cho phiên QA này: fetch cả 360 route, parse HTML, theo mọi `<a href>` nội bộ và `<img src>`, đối chiếu file ảnh cục bộ trên đĩa, kiểm tra `<title>`/meta description, và đối chiếu slug trùng lặp trong từng dataset nguồn.

| Hạng mục | Kết quả |
|---|---|
| Route trả lỗi (4xx/5xx) ngoài dự kiến | **0** (`/_not-found`→404 và `/_global-error`→500 là hành vi mặc định của Next.js khi gọi trực tiếp 2 route nội bộ này, không phải lỗi ứng dụng) |
| Internal link hỏng | **0** trên tổng số link nội bộ thu thập được trên cả 360 trang |
| Ảnh local bị thiếu file | **0** |
| Ảnh trả lỗi (remote/optimize request fail) | **0** |
| Hotlink ảnh ngoài chưa duyệt | **0** |
| Slug trùng trong dataset | **0** (kiểm tra riêng 5 bộ: sản phẩm HH 83, sản phẩm hãng 147, nguyên liệu 19, bài viết 71, nội dung thương hiệu 14 — tất cả unique) |
| Metadata title/description thiếu | **0** trên 357 trang thực (chỉ `favicon.ico` — không phải trang HTML — bị crawler đếm nhầm là "thiếu title", đã loại trừ) |
| "Error boundary" text trong response 200 | 357/357 trang khớp regex ban đầu — **đã xác minh là false positive**: chuỗi khớp là RSC flight payload chứa định nghĩa component `not-found` mà Next.js App Router nhúng sẵn vào mọi trang (`"404: This page could not be found."` nằm trong JSON serialize, không render ra UI). Xác nhận bằng `curl` trực tiếp + kiểm tra bằng mắt qua browser: không trang nào hiển thị lỗi thật. |
| Redirect slug cũ → route chính | **3/3 đúng**: `/noi-dung-thuong-hieu/le-petit-marseillais-cam-ket-bao-ve-moi-truong-tai-provence` → 307 → `/cam-ket`; `/noi-dung-thuong-hieu/cong-thuc-cua-chung-toi-duoc-trinh-bay-mot-cach-hoan-toan-minh-bach` → 307 → `/cong-thuc-minh-bach`; `/noi-dung-thuong-hieu/thuong-hieu-le-petit-marseillais` → 307 → `/thuong-hieu` |

**Không phát hiện link/ảnh lỗi nào cần sửa.**

## 5. QA browser thủ công (desktop 1440px, Chrome MCP, console theo dõi trực tiếp)

Đã kiểm tra trực quan + console log cho các route đại diện theo đúng yêu cầu:

- `/` — 5 section ảnh thật render đúng, không lỗi console.
- `/san-pham` — danh sách + placeholder gradient cho sản phẩm chưa có ảnh, không lỗi.
- 5 PDP: `sua-tam-huu-co-phap-le-petit-marseillais-huong-qua-dao-xuan-dao`, `gel-tam-huu-co-phap-le-petit-marseillais-co-roi-ngua-chanh`, `sua-tam-huu-co-phap-le-petit-marseillais-huong-hoa-hong-dai`, `sua-duong-the-phap-le-petit-marseillais-duong-am-jojoba`, `son-duong-moi-3-trong-1-le-petit-marseillais-voi-bo-hat-mo-va-dau-bo-49g` — breadcrumb, giá, "Giá minh hoạ cho bản demo..." disclaimer, nút giỏ hàng đều đúng, không lỗi console.
- `/thu-vien-san-pham-hang` + trang chi tiết (`sua-tam-goi-diu-nhe-cho-be-voi-hanh-nhan-ngot`) — disclaimer luôn hiển thị, không có nút mua ở cả list lẫn detail.
- `/noi-dung-thuong-hieu` — 15 trang gốc + danh sách 104 bản trùng có link "xem bản chính".
- `/nguyen-lieu/amande`, `/bai-viet/cach-de-co-mai-toc-dai-va-dep`, `/noi-dung-thuong-hieu/tuyen-ngon-thuong-hieu-cua-chung-toi` — ảnh thật, breadcrumb đúng, carousel "Nội dung liên quan" hiển thị.
- `/thu-vien-noi-dung` — 159 card nhóm theo danh mục.
- `/thu-vien-hinh-anh` — 1.161 kết quả, ảnh local hiển thị đúng, phần chưa tải hiện icon "Chưa tải" (không có thẻ `<img>` trỏ URL remote).

**Console:** không ghi nhận lỗi/exception nào (`read_console_messages` với `onlyErrors: true`) trên bất kỳ route nào trong danh sách trên. Không phát hiện dấu hiệu hydration mismatch.

## 6. Search — 7 nhóm kết quả

Query thử: `"hoa"` → **35 kết quả**, đủ 7 nhóm đúng thứ tự: Sản phẩm Hoàng Hà, Sản phẩm hãng (tham khảo — badge "Tham khảo", không có nút giỏ), Nguyên liệu, Bài viết, Nội dung thương hiệu, Card/CTA, Hình ảnh. Khớp với báo cáo Phase 4 (`HH_LPM_FULL_DATA_VISIBILITY_REPORT.md`).

## 7. Filter, pagination, related content, redirect

- **Filter thư viện sản phẩm hãng**: chọn "Chăm sóc em bé" → 4/4 kết quả đúng nhóm, tab active đúng.
- **Pagination thư viện sản phẩm hãng**: `?page=7` → trang cuối (7/7), nút "Sau" disabled đúng, sản phẩm không lặp lại trang 1.
- **Filter thư viện hình ảnh**: `?status=downloaded` → 474/474 kết quả (1/8 trang), toàn bộ ảnh local thật, không còn "Chưa tải".
  - *Lưu ý QA*: lần thử đầu dùng sai tên param (`downloadStatus` thay vì `status`) khiến filter trông như không hoạt động — xác minh lại bằng cách đọc `<select>` trong DOM, đây là lỗi thao tác QA, không phải lỗi ứng dụng. Filter hoạt động đúng với param tên chuẩn.
- **Related content carousel**: xác nhận hiển thị trên `/nguyen-lieu/amande` ("Nội dung liên quan" → card "Hạnh nhân").
- **Redirect slug cũ**: xem mục 4 — 3/3 đúng 307.

## 8. Responsive — desktop / tablet / mobile

| Viewport | Route đã kiểm | Kết quả |
|---|---|---|
| Desktop 1440×900 | Toàn bộ route ở mục 5 | Không tràn ngang, layout đúng |
| Tablet 834×1112 | `/`, PDP mẫu | `scrollWidth === clientWidth` (819px cả hai), không tràn ngang |
| Mobile ~390×844 | `/`, `/san-pham`, PDP mẫu, `/thu-vien-san-pham-hang`, `/thu-vien-hinh-anh` | `scrollWidth === clientWidth` (485px cả hai) trên mọi trang kiểm tra; carousel ngang là cuộn có chủ đích (có scrollbar riêng), không phải lỗi overflow |

Không phát hiện tràn ngang document-level ở bất kỳ breakpoint nào.

## 9. Lỗi đã sửa trong phiên QA này

**Không có.** Toàn bộ 12 bước QA không phát hiện lỗi thật nào cần sửa — không có commit code nào được tạo. `git status` cuối phiên giống hệt đầu phiên.

## 10. Hạn chế còn lại (theo đúng phạm vi Phase 4, không phải phát sinh mới)

- 687/1.161 media record trong thư viện hình ảnh chỉ có metadata, chưa tải ảnh (đúng thiết kế "không hotlink ảnh chưa dùng ở đâu trong site").
- 3/159 card trong `/thu-vien-noi-dung` có URL ảnh nguồn lỗi từ hãng → hiển thị placeholder gradient thay vì ảnh vỡ (đã xác nhận fallback hoạt động đúng, không sửa theo yêu cầu #11).
- 6 dòng sản phẩm Hoàng Hà thiếu SKU (quà tặng/bundle/trùng) vẫn ở trạng thái internal-only, không có PDP.
- 104 bản nội dung trùng lặp (05_Trang_noi_dung) không có trang riêng, chỉ liệt kê với link "xem bản chính" — đúng thiết kế dedupe.

## 11. Dữ liệu internal-only / không dành cho khách xem trực tiếp

- 147 sản phẩm hãng LPM Pháp tại `/thu-vien-san-pham-hang*`: gắn nhãn "Tham khảo", disclaimer "không phải sản phẩm Hoàng Hà đang phân phối", không có nút mua/giỏ hàng ở bất kỳ đâu (list, detail, search).
- 6 sản phẩm Hoàng Hà thiếu SKU (mục 10).
- 104 bản nội dung trùng lặp (mục 10) — chỉ xuất hiện dạng liệt kê tham chiếu, không có route riêng.
- 687 media record chưa tải ảnh — chỉ hiển thị metadata + trạng thái "Chưa tải", không hotlink.
- Giá bán trên toàn site: banner "Bản demo nội bộ — dữ liệu giá, khuyến mại và thành viên chưa phải chính sách chính thức" hiển thị cố định ở đầu mọi trang.

## 12. Kết luận — đủ điều kiện deploy staging?

**Đủ điều kiện.** Không có lỗi build/lint/typecheck, không có link/ảnh hỏng, không có route 404 ngoài dự kiến, không có console error/hydration issue trên các route đã kiểm, search/filter/pagination/related-content/redirect đều hoạt động đúng, responsive sạch ở cả 3 breakpoint. Toàn bộ hạn chế còn lại là quyết định thiết kế có chủ đích từ Phase 4, đã được ghi nhận minh bạch, không phải lỗi kỹ thuật.

Khuyến nghị: deploy nguyên trạng commit `bd8d108` lên staging cho CEO/Marketing nghiệm thu.

## 13. Checklist nghiệm thu cho CEO / Marketing

Dùng khi xem bản staging — mỗi mục nên xác nhận **đạt / không đạt**:

- [ ] Banner "Bản demo nội bộ" hiển thị rõ ở đầu mọi trang (giá/khuyến mại/thành viên chưa chính thức).
- [ ] Trang chủ hiển thị đúng hình ảnh, thông điệp thương hiệu Hoàng Hà × Le Petit Marseillais.
- [ ] Danh mục `/san-pham` và tối thiểu 5 trang chi tiết sản phẩm hiển thị đúng giá, mô tả, ảnh (hoặc placeholder có chủ đích).
- [ ] `/thu-vien-san-pham-hang` (147 sản phẩm hãng): rõ ràng đây là dữ liệu **tham khảo**, không có nút mua ở bất kỳ đâu — xác nhận không gây nhầm lẫn với sản phẩm đang bán.
- [ ] `/noi-dung-thuong-hieu`, trang nguyên liệu, bài viết, nội dung thương hiệu: nội dung đọc được, ảnh hiển thị đúng, không lỗi chính tả nghiêm trọng.
- [ ] `/thu-vien-noi-dung` (159 card) và `/thu-vien-hinh-anh` (1.161 ảnh, phần chưa tải hiện "Chưa tải" thay vì ảnh vỡ) — chấp nhận được để demo nội bộ.
- [ ] Tìm kiếm trả kết quả hợp lý cho vài từ khoá thật (tên sản phẩm, hương thơm, nguyên liệu).
- [ ] Xem trên điện thoại thật (không chỉ trình duyệt) — không tràn màn hình, đọc được, bấm được.
- [ ] Xác nhận phạm vi: đây là **bản demo nội bộ trên staging**, chưa phải production, giá/khuyến mại/CLB thành viên chưa phải chính sách chính thức.
- [ ] Go/No-Go cho việc deploy staging chính thức và chia sẻ link cho các bên liên quan tiếp theo.
