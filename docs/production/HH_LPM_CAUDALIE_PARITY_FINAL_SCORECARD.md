# HH × LPM — Caudalie Parity Final Scorecard

**Ngày:** 2026-07-23 · Branch `hh-lpm-caudalie-ui-parity` · Baseline commit `e7a2ffc`.

Kế thừa điểm từ `HH_LPM_CAUDALIE_PARITY_P2_REPORT.md` (187.8/250 ≈ 7.5/10), điều chỉnh lại **Cart** và **Checkout** sau khi Final Release Candidate Review phát hiện 1 bug thật (xem `HH_LPM_FINAL_RELEASE_CANDIDATE_REPORT.md` §4). Không nâng điểm Brand Story/Hero/Offers vì không có thay đổi nào vào 3 mục này trong đợt review này.

**Cập nhật 2026-07-23 (sau lần chấm điểm ban đầu):** bug Cart/Checkout đã được sửa và verify (xem `HH_LPM_CART_PERSISTENCE_FIX_REPORT.md`). Điểm Cart và Checkout trong bảng dưới đã được nâng lại để phản ánh trạng thái đã sửa — không phải điểm tại thời điểm phát hiện bug.

## Điểm theo hạng mục

| # | Hạng mục | Điểm | Ghi chú |
|---|---|---|---|
| 1 | Header | 7.5 | Không đổi từ P2. |
| 2 | Navigation | 7.5 | Không đổi. Nav 1024px không vỡ dòng — tốt hơn reference. |
| 3 | Homepage | 8 | Không đổi. Rhythm sáng/tối xen kẽ, 0 CTA trùng đích. |
| 4 | Hero | 7 | Không đổi — không redesign theo đúng chỉ đạo. Vẫn giới hạn bởi ảnh không chuyên biệt. |
| 5 | Product Card | 8 | Không đổi. |
| 6 | Category | 8 | Không đổi. Sort + filter + refresh query param xác nhận hoạt động đúng trong review này. |
| 7 | PDP | 7.5 | Không đổi. Lightbox xác nhận hoạt động (Escape đóng đúng, scroll khôi phục). |
| 8 | Gallery architecture | 6 | Kiến trúc 3 chế độ (single/multi/video) đúng và trung thực, nhưng **0/83 sản phẩm** có dữ liệu multi-image/video thật — bị chặn bởi dữ liệu ảnh, không phải bởi code (đã ghi từ P0.5). |
| 9 | Search | 8.5 | Không đổi. Xác nhận trực tiếp trong review: 5 truy vấn (sữa tắm/hoa/dừa/tóc/chuỗi không kết quả) đều đúng, dynamic import xác nhận qua network diff, mở lần 2 tức thời, Escape đóng đúng. |
| 10 | **Cart** | **8.5** (đã sửa — trước đó 9→5 khi phát hiện bug, nay khôi phục gần mức gốc) | UI thao tác (thêm/tăng/giảm/xoá/subtotal) chính xác 100%. **Giỏ hàng nay đã persist qua điều hướng trang** (localStorage, cùng pattern `AccountContext`) — verify lại bằng đúng kịch bản tái hiện cũ + full-page reload + luồng đặt hàng, cả 3 đều đúng. Trừ 0.5 vì đây là hạng mục vừa phát hiện+sửa trong cùng phiên, chưa qua thời gian dùng thực tế để xác nhận không còn edge case khác. |
| 11 | Auth | 7 | Chưa từng chấm riêng trước đây. Đăng nhập/Đăng ký chuyển đổi đúng, dynamic import xác nhận, Escape/focus đúng. Không có backend thật (đúng phạm vi demo). |
| 12 | **Checkout** | **7.5** (đã sửa — trước đó 4 khi phát hiện bug) | Form/validation/order-summary/inquiry-price-honesty đúng khi cô lập. Nhận trạng thái giỏ hàng nay đã đúng (#10) — luồng "thêm sản phẩm → thanh toán" verify lại giữ đủ sản phẩm, kể cả sau full-page reload. Đặt hàng thành công → giỏ hàng về rỗng và ở lại rỗng (không tự seed lại). |
| 13 | Offers | 7.5 | Không đổi. |
| 14 | Advisor | 8 | Không đổi. Xác nhận trực tiếp: đủ 6 nhóm hương, click "Xem sản phẩm" khớp đúng danh mục lọc theo `scent`. |
| 15 | Brand Story | 6 | Không đổi — không redesign theo đúng chỉ đạo. Vẫn là blocker rõ nhất (cần ảnh hero/milestone thật hoặc 1 đợt thiết kế riêng). |
| 16 | Editorial | 7.5 | Không đổi. 3 loại card đúng cấu trúc, chưa có ngôn ngữ thị giác phân biệt sâu hơn. |
| 17 | Footer | 8 | Không đổi. Xác nhận trực tiếp mobile: 4 cột, accordion 3 nhóm mở/đóng đúng. |
| 18 | Mobile UX | 8 | Không đổi. Xác nhận: drawer mở/đóng đúng, breadcrumb PDP truncate sạch (không mồ côi chevron), body scroll khôi phục đúng sau khi đóng drawer. |
| 19 | Accessibility | 9 | Không đổi. Xác nhận trực tiếp: Escape + focus + body-scroll-lock/restore đúng trên Search, Cart, Auth, Mobile drawer, PDP lightbox — 5/5 overlay kiểm tra đều đạt. |
| 20 | Performance readiness | 7.5 | Không đổi. Xác nhận bằng network capture thật: SearchOverlay tải thêm 4 chunk JS chỉ khi mở lần đầu, không tải trước. |
| 21 | SEO readiness | 8.5 | Không đổi. Xác nhận bằng dual-build thật (staging + production + fail-safe khi thiếu `NEXT_PUBLIC_SITE_URL`) — xem §6 báo cáo final. |
| 22 | Premium perception | 7.1 (đã sửa — trước đó 7.3→6.8 khi phát hiện bug, nay gần khôi phục) | Bug giỏ hàng đã sửa và verify, nhưng giữ nhẹ dưới mức gốc 7.3 vì fix vừa xong trong cùng phiên, chưa có thời gian dùng thực tế/QA độc lập xác nhận không còn edge case (ví dụ: 2 tab cùng lúc, localStorage đầy, chế độ ẩn danh). |
| 23 | Reference layout parity | 7 | Không đổi — không có thay đổi parity mới trong đợt review này. |

**Trung bình số học 23 mục: ≈7.6/10** (đã cập nhật sau khi sửa bug Cart/Checkout — trước khi sửa là ≈7.3/10).

**Ghi chú:** con số 7.6/10 vẫn chưa chạm mốc 7.8/10 của toàn dự án — khoảng cách còn lại nằm ở các blocker dữ liệu đã biết từ trước (Brand Story, Gallery architecture, Editorial), không phải do bug mới. Bug Cart/Checkout — lỗi **chức năng lõi** duy nhất phát hiện trong đợt review này — đã được xử lý và verify bằng browser thật (không chỉ đọc code), nhưng khuyến nghị vẫn giữ điểm Cart/Auth/Checkout dưới mức tối đa cho tới khi qua ít nhất 1 đợt QA độc lập khác xác nhận không còn edge case (ẩn danh, đa tab, localStorage đầy).

## Phân loại blocker

**A. Code blocker:**
- ~~Giỏ hàng không persist qua điều hướng trang~~ — **ĐÃ SỬA.** `cartLines` trong `SiteUIContext` nay có localStorage rehydration cùng pattern với `AccountContext` (xem `HH_LPM_CART_PERSISTENCE_FIX_REPORT.md`). Verify lại bằng đúng kịch bản tái hiện gốc + full-page reload + luồng đặt hàng hoàn chỉnh — cả 3 đều đúng, `npm run check` sạch. Không còn code blocker nào chặn PR tại thời điểm cập nhật này.

**B. Data blocker (đã biết từ trước, không phải regression mới):**
- Gallery architecture: 0/83 sản phẩm có multi-image/video thật.
- Duplicate-content slugs (`-2`, `-2-3`, …) trong `bai-viet` và `san-pham` — đã có sẵn trong `content-duplicates-derived.json`, xác nhận qua `git log` là dữ liệu tồn tại từ trước, không phải do diff Phase 2→P2 gây ra.
- Brand Story / Hero / Offers vẫn giới hạn bởi thiếu ảnh/nội dung chuyên biệt.

**C. Asset blocker:** Không phát hiện — toàn bộ 448 ảnh local, 38 JS chunk, 18 font/preload ref đều trả về 200 (crawl toàn bộ 357 route).

**D. Backend/business blocker (đã biết, đúng phạm vi demo):**
- Checkout không có cổng thanh toán thật (COD/chuyển khoản đều mô phỏng).
- Auth không có backend xác thực thật.

**E. Legal/launch blocker (đã biết từ trước):**
- Footer: "Chính sách bảo mật" và "Điều khoản dịch vụ" còn ghi "(Đang cập nhật)".
- `NEXT_PUBLIC_SITE_URL` chưa được set ở môi trường thật — bắt buộc phải set trước khi build production, nếu không sitemap sẽ rỗng (đây là fail-safe đúng thiết kế, không phải bug).

## Kết luận

| Câu hỏi | Trả lời |
|---|---|
| CEO demo | **Có** — luồng "thêm sản phẩm → thanh toán" nay hoạt động đúng qua điều hướng trang. |
| Internal staging | **Có** — bug chức năng lõi duy nhất phát hiện đã được xử lý và verify. |
| Public production | **Có, về mặt code** — vẫn cần set `NEXT_PUBLIC_SITE_ENV=production` + `NEXT_PUBLIC_SITE_URL` thật (mục E) và xử lý các blocker dữ liệu/pháp lý đã biết (Brand Story, footer legal "Đang cập nhật") trước khi launch thật. |
| Sẵn sàng mở PR vào `hh-lpm-demo-data` | **Có** — code blocker duy nhất đã xử lý. Khuyến nghị: loại `docs/production/screenshots/` khỏi commit (mục G), và ghi rõ trong PR description rằng fix Cart vừa qua 1 vòng verify, nên có thêm 1 lượt review độc lập trước khi merge nếu có thể. |

Không nâng điểm Brand Story, Hero, hoặc Offers — không có thay đổi nào vào 3 mục này trong đợt review.
