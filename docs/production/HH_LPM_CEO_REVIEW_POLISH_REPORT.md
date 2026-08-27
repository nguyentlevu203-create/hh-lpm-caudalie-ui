# HH × LPM — CEO Review Polish Report

Ngày: 2026-07-16 · Branch: `hh-lpm-ceo-review-polish` (tạo từ `hh-lpm-demo-data` @ `e0dcd2f`). Không redesign toàn site, không sửa `/reference/*`, không nhập dữ liệu mới, không đổi route/chức năng đã QA, **chưa commit**.

## 1. File đã sửa

| File | Nội dung sửa |
|---|---|
| `src/components/hh/product/ProductCard.tsx` | Badge "Liên hệ báo giá", CTA đổi theo `priceMode`, bỏ rating/reviewCount giả |
| `src/components/hh/brand-library/BrandLibraryCard.tsx` | Đổi màu badge "Tham khảo" sang xám trung tính |
| `src/components/hh/pdp/ProductBuyBox.tsx` | Bỏ hiển thị rating/reviewCount giả, thay bằng "Chưa có đánh giá" |
| `src/components/hh/pdp/ProductReviews.tsx` | Bỏ 3 review giả + rating breakdown giả, giữ layout/anchor, thêm empty-state |
| `src/app/san-pham/[slug]/page.tsx` | Cập nhật lời gọi `<ProductReviews />` (bỏ prop không còn dùng) |
| `src/components/hh/layout/Footer.tsx` | 4 link hỗ trợ khách hàng + 3 social icon + 2 legal link → "Đang cập nhật" / non-interactive |
| `src/components/hh/offers/GiftDiscoveryTiles.tsx` | Tile "Thẻ quà tặng Hoàng Hà" (href `#`) → non-interactive + "Đang cập nhật" |
| `src/components/hh/home/SocialFeed.tsx` | CTA "Theo dõi cộng đồng" (href `#`) → non-interactive |
| `public/robots.txt` | **File mới** — `User-agent: * / Disallow: /` |

## 2. Bestseller homepage — kết quả kiểm tra lại

**Phát hiện quan trọng: tiền đề "4/4 ảnh placeholder" của yêu cầu không còn đúng tại thời điểm kiểm tra.** Xác minh trực tiếp (data + file ảnh + browser):

- Cả 4 sản phẩm trong `getBestSellers()` (`bestSeller: true`) đều có field `image` trỏ tới file JPEG thật, tồn tại trên đĩa, đã kiểm tra bằng `file`/`curl` (1200×1200, hợp lệ):
  1. **Gel Tắm Pháp Le Petit Marseillais Dịu Nhẹ Cam Hữu Cơ & Bưởi Hữu Cơ** (650ml) — nhóm `sua-tam`
  2. **Sữa Dưỡng Thể Pháp Le Petit Marseillais Dưỡng Ẩm Bơ Hạt Mỡ, Hạnh Nhân & Argan** (400ml) — nhóm `duong-the`
  3. **Dầu Gội Pháp Le Petit Marseillais Vào Nếp Suôn Mượt Chiết Xuất Hạnh Nhân và Hạt Lanh Hữu Cơ** (300ml) — nhóm `cham-soc-toc`
  4. **Hộp 2 Bánh Xà Phòng Tắm Le Petit Marseillais Dầu Hạnh Nhân Ngọt** (2x100g) — nhóm `xa-phong-banh`
- Đã 4 nhóm sản phẩm khác nhau (trong 7 nhóm hiện có), tên rõ ràng, ảnh chất lượng tốt, không méo, crop đồng đều (`object-contain`, nền `hh-cream` thống nhất) — đúng tiêu chí đề ra.
- QA browser xác nhận: desktop 1440px hiển thị đúng ảnh thật; mobile 500px không tràn ngang, card scroll ngang có chủ đích (carousel), không lỗi layout.
- **Kết luận: không cần sửa gì cho mục này** — giữ nguyên `getBestSellers()`/`BestSellers.tsx`, không đổi dữ liệu danh mục chung, không chọn lại sản phẩm khác (tránh churn không cần thiết). Nhận định "placeholder" ở lượt đánh giá trước đó là đọc nhầm màn hình (nhầm với section "Trải nghiệm mua sắm cùng Hoàng Hà" — section riêng bên dưới, dùng gradient minh hoạ có chủ đích, không phải ảnh sản phẩm).

## 3. Badge "Liên hệ báo giá"

- **Số ProductCard có `priceMode === "inquiry"`: 69/83** (83% catalog Hoàng Hà).
- Badge hiển thị ngay dưới badge "Hữu cơ" (nếu có) trong cùng cột `flex flex-col gap-1` ở góc trái-trên ảnh — không che nhau, không đổi chiều cao card (badge nằm trong vùng ảnh `absolute`, không chiếm layout flow).
- Màu: `bg-hh-accent` (cam) + `text-hh-accent-foreground` (nâu đậm) — contrast tính tay ≈ 6.4:1, đạt WCAG AA cho text nhỏ (yêu cầu ≥4.5:1).
- CTA: `price !== null` → "Thêm vào giỏ" (không đổi hành vi cũ); `price === null` → **"Xem sản phẩm"**, là `Link` dẫn tới PDP thay vì gọi `addToCart` thẳng từ card — để khách xem đầy đủ thông tin trước khi gửi yêu cầu, khớp đúng 1 trong 2 lựa chọn CTA mà yêu cầu đưa ra.
- Không tạo giá mới cho bất kỳ sản phẩm nào — chỉ đọc field `priceMode` có sẵn.
- Verify trực tiếp trên `/san-pham`, PDP related-products, kết quả search — đều hiển thị đúng qua component `ProductCard` dùng chung.

## 4. Badge "Tham khảo"

- Đổi từ `bg-hh-ink/70` (đen 70% trong suốt, không thực sự "xanh" nhưng mờ/không nhất quán theo nền ảnh) sang **`bg-slate-600`** (xám lam trung tính, đặc, không trong suốt) + `text-white`.
- Contrast tính tay ≈ 7.9:1 — đạt WCAG AA thoải mái.
- Khác biệt rõ với `bg-hh-primary` (xanh lá đậm, badge "Hữu cơ") và `bg-hh-accent` (cam, badge "Liên hệ báo giá" mới) — 3 badge giờ có 3 tông màu tách bạch.
- Chỉ 1 vị trí render badge này trong toàn bộ codebase (`BrandLibraryCard.tsx`) — không có nơi nào khác cần đồng bộ.
- Verify trực tiếp trên `/thu-vien-san-pham-hang` (zoom ảnh xác nhận màu mới).

## 5. Rating/Review demo

**Vấn đề xác nhận:** `rating`/`reviewCount` là số liệu mô phỏng cho toàn bộ 83 sản phẩm (không có nguồn đánh giá khách thật nào trong dataset); `ProductReviews.tsx` còn có 3 review với tên khách hàng bịa ("Hương T.", "Minh Đ.", "Lan A.") và nội dung review tự viết, trình bày như review thật.

**Đã sửa — chọn phương án ẩn dữ liệu giả, không phải bổ sung disclaimer:**

- `ProductCard.tsx`: bỏ 5 sao + `(reviewCount)`, thay bằng dòng chữ **"Chưa có đánh giá"**.
- `ProductBuyBox.tsx`: bỏ sao + số đánh giá liên kết tới `#danh-gia`, thay bằng link **"Chưa có đánh giá — hãy là người đầu tiên"** (vẫn dẫn tới section đánh giá, nơi có nút "Viết đánh giá").
- `ProductReviews.tsx`: xoá hoàn toàn `SAMPLE_REVIEWS` (3 review giả) và `BREAKDOWN_SHAPE` (% sao giả). Thay bằng 2 dòng empty-state: "Chưa có đánh giá nào cho sản phẩm này." (cột tóm tắt) và "Chưa có đánh giá nào từ khách hàng. Hãy là người đầu tiên chia sẻ trải nghiệm của bạn." (cột review). **Giữ nguyên**: layout 2 cột, `id="danh-gia"` (anchor khớp với link ở ProductBuyBox), khối "Viết đánh giá" + nút "Gửi đánh giá" (đây là lời mời hành động thật, không phải dữ liệu giả, nên giữ lại).
- Không tạo review mới, không dùng tên khách hàng giả ở bất kỳ đâu.
- Cấu trúc component giữ nguyên hình dạng (heading, cột, `id`) để khi có dữ liệu đánh giá thật, chỉ cần thay khối empty-state bằng `.map()` qua dữ liệu thật — không cần dựng lại section.

## 6. `href="#"` đã xử lý

**Tổng: 11 vị trí**, phân loại theo đúng khung A/B/C của yêu cầu:

| Vị trí | Nhãn | Phân loại | Xử lý |
|---|---|---|---|
| Footer — Hỗ trợ khách hàng | Câu hỏi thường gặp | B | → text "(Đang cập nhật)", không click được |
| Footer — Hỗ trợ khách hàng | Chính sách đổi trả | B | → text "(Đang cập nhật)" |
| Footer — Hỗ trợ khách hàng | Chính sách vận chuyển | B | → text "(Đang cập nhật)" |
| Footer — Hỗ trợ khách hàng | Liên hệ | B | → text "(Đang cập nhật)" |
| Footer — social | Facebook | B | → icon mờ, non-interactive, `aria-label` "đang cập nhật" |
| Footer — social | Zalo | B | → icon mờ, non-interactive |
| Footer — social | YouTube | B | → icon mờ, non-interactive |
| Footer — legal bar | Chính sách bảo mật | B | → text "(Đang cập nhật)" |
| Footer — legal bar | Điều khoản dịch vụ | B | → text "(Đang cập nhật)" |
| `/uu-dai` — GiftDiscoveryTiles | Thẻ quà tặng Hoàng Hà | B | → tile mờ, non-interactive, nhãn "(Đang cập nhật)" |
| Trang chủ — SocialFeed | Theo dõi cộng đồng | B | → nút mờ, non-interactive |

**Không có mục nào rơi vào loại A** (không route thật nào khớp FAQ/chính sách/liên hệ/social hiện có trong 33 route template của site) — đúng dự đoán, vì các trang này chưa từng được xây trong toàn bộ các pass trước.

**Không phải link chết:** "Đăng nhập"/"Đăng ký thành viên" trong Footer vẫn giữ `href="#"` trong data nhưng có field `action` riêng, mở `AuthOverlay` thật khi bấm — đây là chức năng thật, không đổi.

**Ghi nhận thêm (không sửa, ngoài phạm vi "href='#'" của yêu cầu):** `/#hoi-vien` (Câu Lạc Bộ Hoàng Hà — xuất hiện ở Footer "Tài khoản", Footer legal bar "Chính sách thành viên", MobileDrawer) là anchor chết theo kiểu khác — trỏ tới `id="hoi-vien"` nhưng `MembershipSection.tsx` (component chứa id này) đã bị gỡ khỏi trang chủ từ lượt UI Alignment Pass 2 trước đây, xác nhận bằng `curl` không thấy `id="hoi-vien"` trong HTML trang chủ. Không sửa trong pass này vì: (1) không phải `href="#"` literal như yêu cầu quét, (2) MobileDrawer là thành phần nav vừa được QA kỹ ở đợt trước, đổi vào đây vượt phạm vi "không đổi route/chức năng đã QA". Nêu rõ để cân nhắc ở đợt sau.

## 7. robots.txt

`public/robots.txt` (mới):
```
User-agent: *
Disallow: /
```
Metadata `noindex, nofollow, nocache` trong `src/app/layout.tsx` giữ nguyên không đổi — hai lớp chặn index giờ hoạt động song song.

## 8. Kết quả QA

**Console/hydration:** 0 lỗi thật. 1 cảnh báo hydration-mismatch xuất hiện trên mọi trang — đã xác nhận lại đúng như 2 báo cáo QA trước: do thuộc tính `bis_register`/`__processed_*` một tiện ích mở rộng trình duyệt chèn vào `<body>` trước khi React hydrate trong chính profile Chrome tự động hoá này, không phải lỗi code — không liên quan tới các thay đổi của pass này.

**Route đã test trực tiếp:** `/`, `/san-pham` (+ 1 PDP có giá thật, 1 PDP inquiry qua "Xem sản phẩm"), `/thu-vien-san-pham-hang`, footer desktop + trong luồng PDP.

**Breakpoint:** 1440px (chính), ~1100–1288px và 834px (xác nhận qua ảnh chụp — nội dung không tràn ngang, badge không chồng nhau, grid 2/3/4 cột đúng), 500px (mobile — 3 card fit khung nhìn, "Chưa có đánh giá" hiển thị gọn, sticky CTA không che nội dung). Công cụ resize trong môi trường này không map 1:1 pixel theo yêu cầu ở một vài lần gọi (đã ghi nhận từ các báo cáo QA trước) — mọi lần đọc `window.innerWidth`/ảnh chụp đều được đối chiếu trực tiếp, không suy đoán.

**Regression:**
- Search overlay: mở/gõ "hoa" → 35 kết quả, card hiển thị đúng badge/CTA mới, không lỗi.
- Cart drawer: mở, hiển thị đúng sản phẩm seed + giá + tổng — không đổi hành vi.
- Filter/mega menu/Escape/scroll-lock (từ đợt audit trước): không bị ảnh hưởng bởi các thay đổi trong pass này (không đụng tới `SiteUIContext`, `use-focus-trap.ts`, các overlay).
- 4/4 bestseller vẫn có ảnh thật, không méo, crop đồng đều, mobile không tràn (xem §2).
- Badge "Liên hệ báo giá" xuất hiện đúng, không che badge khác, không đổi chiều cao card (xem §3).
- Badge "Tham khảo" đổi màu đúng (xem §4).
- Không còn rating/review hiển thị như dữ liệu thật ở ProductCard, ProductBuyBox, ProductReviews (xem §5).
- Không còn link `href="#"` bấm được mà không có tác dụng (xem §6).

## 9. `npm run check`

```
lint      → 0 lỗi, 0 cảnh báo
typecheck → pass
build     → thành công, 360 route (không đổi so với trước pass này)
```

## 10. Trạng thái Git

Branch `hh-lpm-ceo-review-polish`, 8 file sửa + 1 file mới (`public/robots.txt`). **Chưa commit** theo đúng yêu cầu. `docs/reports/` (2 file cũ, untracked) không bị động tới.
