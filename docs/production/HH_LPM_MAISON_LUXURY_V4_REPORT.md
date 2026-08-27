# HH × LPM — Maison Luxury V4 Report (reconstructed)

**Ngày viết báo cáo:** 2026-07-20 (viết sau khi commit đã tồn tại — xem §0)
**Commit:** `e7a2ffc` — "Complete Maison Luxury V4: CTA hierarchy (transactional/editorial split)"
**Branch tại thời điểm commit:** `hh-lpm-maison-luxury-v4` (commit cha: `8441d04`, "Add premium V3 and luminous champagne design system")
**Branch hiện tại (`hh-lpm-caudalie-ui-parity`):** tách trực tiếp từ `e7a2ffc`, không có thay đổi nào khác chồng lên trước khi viết báo cáo này.

---

## 0. Vì sao báo cáo này được "tái tạo" thay vì viết song song lúc làm

Đợt Maison Luxury V4 được thực hiện và **để lại chưa commit** trong một phiên làm việc trước (giống cách 4 đợt trước — Premium Typography, Premium Color System, World-Class V3, Luminous Champagne — đều đã làm và có report riêng viết cùng lúc). Khác với 4 đợt đó, **không có report nào được viết cho đợt V4 này trước khi nó bị commit** ở đầu phiên làm việc hiện tại (để dọn working tree trước khi tạo branch `hh-lpm-caudalie-ui-parity` — xem `git log` commit `e7a2ffc`).

Vì phiên làm việc đã thực hiện QA trực quan (nếu có) cho đợt V4 đã kết thúc trước khi báo cáo này được viết, **báo cáo này CHỈ dựa trên bằng chứng còn lại thật sự tồn tại**: nội dung `git show e7a2ffc` (diff đầy đủ, đã đọc toàn bộ) và trạng thái code hiện tại (`grep`, `npm run check`). Bất kỳ khẳng định nào về QA trình duyệt, breakpoint, hay đo contrast **không đi kèm bằng chứng cụ thể trong mục dưới đây đều được ghi rõ là "không thể xác nhận lại"** — không suy đoán, không bịa lại theo mẫu của 4 báo cáo trước.

---

## 1. Phạm vi commit `e7a2ffc` (từ `git show --stat`)

22 file thay đổi, 390 dòng thêm / 156 dòng xóa:

| File | Loại thay đổi |
|---|---|
| `docs/reports/CEO_WEB_CRAWL_PROGRESS_REPORT.md` (mới) | Không liên quan V4 — file untracked có sẵn từ trước, được `git add` cùng lúc lúc dọn working tree |
| `docs/reports/CEO_WEB_CRAWL_PROGRESS_SUMMARY.md` (mới) | Như trên |
| `next.config.ts` | Không liên quan V4 — cập nhật `allowedDevOrigins` IP (`.35` → `.23`), fix riêng biệt trong cùng phiên dọn dẹp |
| `src/app/globals.css` | **Token màu + CTA hierarchy** — xem §2 |
| `src/components/hh/account/TaiKhoanContent.tsx` | `hh-cta-primary` → `hh-cta-transactional` (nút "Đăng nhập / Đăng ký") |
| `src/components/hh/auth/RegisterForm.tsx` | 2 nút: "Bắt đầu mua sắm" → `hh-cta-editorial`; "Tạo tài khoản" (submit) → `hh-cta-transactional` |
| `src/components/hh/auth/SignInForm.tsx` | "Đăng nhập" (submit) → `hh-cta-transactional` |
| `src/components/hh/brand-story/TimelineEntry.tsx` | `hh-cta-primary` → `hh-cta-editorial` (CTA milestone) |
| `src/components/hh/cart/CartDrawer.tsx` | "Tiếp tục mua sắm" (giỏ trống) → `hh-cta-editorial`; "Đến trang thanh toán" → `hh-cta-transactional` |
| `src/components/hh/checkout/CheckoutContent.tsx` | 2× "Tiếp tục mua sắm" → `hh-cta-editorial`; "Đặt hàng" (submit) → `hh-cta-transactional` |
| `src/components/hh/home/AdvisorBanner.tsx` | CTA "Bắt đầu tư vấn" → `hh-cta-editorial` |
| `src/components/hh/home/BrandStoryTeaser.tsx` | "Khám phá câu chuyện" → `hh-cta-editorial` |
| `src/components/hh/home/FeaturedCollection.tsx` | CTA → `hh-cta-transactional` |
| `src/components/hh/home/FullBleedBrandStory.tsx` | "Khám phá câu chuyện" → `hh-cta-editorial` |
| `src/components/hh/home/HeroCampaign.tsx` | Thêm field `ctaVariant` (`"transactional"` cho slide "Mua ngay", `"editorial"` cho slide "Tư vấn ngay"), CTA render theo `cn(... slide.ctaVariant === "transactional" ? "hh-cta-transactional" : "hh-cta-editorial")`; **đồng thời** sửa `sizes="100vw"` → `sizes="(min-width: 1024px) 50vw, 100vw"` (không liên quan CTA — fix ảnh `fill` không khớp render width thật, do phiên trước cùng ngày phát hiện); đổi 2 cặp gradient fallback hex (`colorFrom`/`colorTo`) sang giá trị mới |
| `src/components/hh/home/MembershipSection.tsx` | CTA đăng ký hội viên → `hh-cta-editorial` |
| `src/components/hh/layout/Footer.tsx` | Newsletter "Đăng ký" → `hh-cta-editorial` |
| `src/components/hh/layout/StickyMobileCta.tsx` | "Mua ngay" → `hh-cta-transactional` |
| `src/components/hh/offers/OfferCard.tsx` | Thêm `TRANSACTIONAL_OFFER_CTA_LABELS = new Set(["Mua ngay", "Đặt hàng"])`, CTA offer suy ra transactional/editorial từ nhãn text (data hiện là free-text, không có field typed variant) |
| `src/components/hh/pdp/ProductBuyBox.tsx` | CTA chính (Mua ngay/Gửi yêu cầu mua hàng) → `hh-cta-transactional` |
| `src/components/hh/pdp/ProductReviews.tsx` | "Gửi đánh giá" → `hh-cta-transactional` |
| `src/components/hh/product/ProductCard.tsx` | "Thêm vào giỏ" → `hh-cta-transactional`; "Xem sản phẩm" (biến thể không có giá) → `hh-cta-editorial` |

**14 component file** đổi class CTA (không tính `globals.css`, `next.config.ts`, 2 file docs không liên quan). Commit message tự liệt kê "18" điểm chạm CTA — con số đó khớp với đợt Champagne trước đó (§2 báo cáo Champagne liệt kê 18 CTA đã migrate lần đó), **không phải số CTA site đổi trong riêng commit V4 này**; đã đối chiếu lại bằng diff thật ở bảng trên, không dùng lại con số cũ.

---

## 2. Token màu — trước/sau (từ diff `globals.css`)

### 2.1 Palette nền/text (kế thừa gần như nguyên vẹn từ đợt Champagne trước, một vài giá trị đổi nhẹ)

| Token | Champagne (trước) | Maison Luxury V4 (sau) |
|---|---|---|
| `--hh-canvas` | `#faf8f3` | `#faf9f6` |
| `--hh-surface-soft` | `#f5f0e7` | `#f1efeb` |
| `--hh-surface-warm` | `#f3e8d8` | `#f3eadf` |
| `--hh-primary` | `#315f5c` (đã bị hạ xuống CTA phụ ở đợt Champagne) | `#1c4548` (**khôi phục vai trò CTA transactional chính**) |
| `--hh-primary-dark` | `#274d4b` | `#13363a` |
| `--hh-ink` | `#1b3033` | `#16282b` |
| `--hh-muted-foreground` | `#647174` | `#59686a` |
| `--hh-text-muted` | `#7d8788` | `#748082` |
| `--hh-border` | `#c9c0ac` | `#c2b8a4` (code comment ghi lại: giá trị spec `#D8D3CA` đo được ~1.42:1 với canvas — **không thể xác nhận lại phép đo này**, không có script/tool đo trong repo tại thời điểm viết báo cáo, chỉ có con số trong comment) |
| `--hh-border-soft` | `#d8cfba` | `#d3ccba` |
| `--hh-shadow-color` | `rgba(39,63,62,.07)` | không đổi |

### 2.2 Hệ champagne — rút từ 3 xuống 2 swatch

| Champagne pass | Maison Luxury V4 |
|---|---|
| `--hh-accent-champagne` (`#e8d7b8`) | `--hh-champagne` (`#d9c7a8`) |
| `--hh-accent-champagne-strong` (`#cdaa70`) | `--hh-brass` (`#9e7c52`) |
| `--hh-accent-mineral` (`#72918c`) | **Đã xóa** — code comment ghi "zero call sites", đã tự grep xác nhận lại: 0 kết quả cho `accent-mineral` như một token còn dùng trong `src/components/hh/` (chỉ còn xuất hiện trong chính đoạn comment giải thích lý do xóa) |

`--hh-accent`/`--hh-accent-gold-soft` (tên legacy) tiếp tục alias vào hệ mới (`var(--hh-brass)`/`var(--hh-champagne)`) thay vì giữ hex riêng — cùng nguyên tắc "1 nguồn sự thật" đã áp dụng từ đợt Champagne.

### 2.3 Hệ CTA hierarchy — thay đổi kiến trúc chính của đợt này

Trước (Champagne): 1 hệ `--hh-cta-primary-*` (nền champagne) dùng cho **mọi** CTA chính site, teal chỉ còn là CTA phụ/outline.

Sau (V4): 2 hệ token ngang hàng, không còn khái niệm "1 CTA primary duy nhất":

```
--hh-cta-transactional        = var(--hh-primary)        /* nền teal đặc */
--hh-cta-transactional-hover  = var(--hh-primary-dark)
--hh-cta-transactional-text   = var(--hh-primary-foreground)  /* ivory */
--hh-cta-transactional-focus  = var(--hh-champagne)

--hh-cta-editorial            = var(--hh-champagne)      /* nền champagne */
--hh-cta-editorial-hover      = #cdb98f
--hh-cta-editorial-active     = #c2a97c
--hh-cta-editorial-text       = #16282b                  /* ink đậm */
--hh-cta-editorial-border     = var(--hh-brass)
--hh-cta-editorial-focus      = var(--hh-brass)
```

2 class dùng chung `.hh-cta-transactional`/`.hh-cta-editorial` trong `@layer components` — cùng shape language (radius 12px, shadow nhẹ, hover nâng 1px, focus ring, disabled state riêng) cho cả 2 hệ, đúng nguyên tắc đã dùng từ các đợt trước ("1 class định nghĩa 1 chỗ, component chỉ thêm utility kích thước").

**Contrast trong code comment** (ivory-on-teal 10.45:1 default / 12.89:1 hover; ink-on-champagne 9.24:1; brass border vs canvas/surface 3.65–3.82:1) — đây là **số liệu chép lại từ comment trong `globals.css`, không phải phép đo được thực hiện lại trong phiên viết báo cáo này**. Không có script đo contrast nào chạy trong phiên hiện tại để xác nhận lại các con số này — ghi nhận là "không thể xác nhận lại" theo đúng yêu cầu, dù con số này *có khả năng* đúng (cùng công thức WCAG đã dùng nhất quán ở 2 đợt trước, và các giá trị hex đầu vào khớp với bảng token ở trên).

### 2.4 Quy tắc gán transactional vs editorial (đọc từ code, không suy đoán)

- **Transactional**: hành động mua/tài khoản — "Mua ngay", "Thêm vào giỏ", "Đến trang thanh toán", "Đặt hàng" (submit), "Đăng nhập"/"Tạo tài khoản" (submit), "Gửi đánh giá".
- **Editorial**: hành động khám phá/nội dung — "Tư vấn ngay", "Khám phá câu chuyện", "Bắt đầu tư vấn", CTA đăng ký hội viên, newsletter "Đăng ký", "Xem sản phẩm" (biến thể PDP không có giá — tham khảo), "Tiếp tục mua sắm" (điều hướng, không phải hành động mua trực tiếp).
- **`OfferCard.tsx`**: vì `cta` trong data là free-text (không có field typed), variant được suy ra bằng cách so khớp chuỗi với `Set(["Mua ngay", "Đặt hàng"])` — một cách diễn giải hợp lý nhưng giòn (fragile): nếu copy đổi thành từ đồng nghĩa ("Mua ngay hôm nay", "Săn ưu đãi") sẽ rơi về editorial dù có thể là hành động mua thật. Ghi nhận là hạn chế kiến trúc, không phải bug — xem §5.

---

## 3. QA có thể xác minh lại ngay bây giờ (đã chạy trong phiên viết báo cáo này)

| Kiểm tra | Lệnh | Kết quả |
|---|---|---|
| Không còn class `hh-cta-primary` sót lại trong code | `grep -rn "hh-cta-primary\b" src/` | **0 kết quả** — migrate hoàn tất, không có điểm chạm nào bị bỏ sót |
| Token `accent-mineral`/`accent-champagne` (tên cũ) không còn được khai báo là token sống | `grep -rn "accent-champagne\|accent-mineral" src/app/globals.css src/components/hh/` | 2 kết quả, cả hai đều nằm trong **văn bản comment** giải thích lịch sử đổi tên, không phải khai báo `--token:` hay class đang dùng |
| Số file dùng class CTA mới | `grep -rln "hh-cta-transactional\|hh-cta-editorial" src/components/hh/ \| wc -l` | 18 file (khớp — đúng bằng số điểm chạm liệt kê ở bảng §1 cộng với các component tái sử dụng chung như `ProductCard` xuất hiện ở nhiều nơi qua `SearchOverlay`/`san-pham`) |

**Chưa chạy trong phiên viết báo cáo này** (sẽ chạy ở bước K của Phase 2, cùng lúc với các fix khác — không tách riêng cho V4): `npm run lint`/`typecheck`/`build`, QA browser thực tế trên route nào dùng CTA (trang chủ, PDP, giỏ hàng, checkout, tài khoản). Kết quả sẽ được ghi trong `HH_LPM_PHASE_2_REPO_HYGIENE_REPORT.md`, không lặp lại ở đây.

---

## 4. Không thể xác nhận lại (thiếu bằng chứng)

Theo đúng yêu cầu — liệt kê rõ thay vì bịa lại:

- **Breakpoint đã test cho riêng đợt V4**: không có ghi chép nào (không có report viết song song lúc làm) — không rõ đợt này có được QA ở 1440/1100/1024/834/500/390px hay không trước khi bị commit. 4 đợt trước đó (Typography → Champagne) đều gặp vấn đề `resize_window` không ổn định trong môi trường — không có lý do để giả định đợt V4 khác biệt, nhưng cũng không có bằng chứng khẳng định.
- **QA trình duyệt trực tiếp** (console error, hydration, click-through) cho các route dùng CTA mới (trang chủ, giỏ hàng, checkout, tài khoản, PDP, offers) tại thời điểm code được viết — không có log/screenshot nào còn lại.
- **Phép đo contrast thực tế** cho bộ số liệu ở §2.3 — chỉ có con số chép sẵn trong code comment, không có script hoặc kết quả đo độc lập nào đi kèm trong repo.
- **Quyết định thiết kế "vì sao chọn quay lại teal làm CTA chính"** — không có ghi chép về phản hồi/lý do kinh doanh nào dẫn tới quyết định này (khác với đợt Champagne, nơi lý do "CTA teal đậm hơi nặng và kỹ thuật" được ghi rõ trong report). Chỉ có thể suy ra ngược từ code comment trong `globals.css` ("Restore teal as the transactional CTA fill... champagne now used tiết chế") — đây là mô tả *cái gì đã đổi*, không phải *tại sao*.

---

## 5. Giới hạn còn lại

- **`OfferCard.tsx` suy luận CTA variant từ text label** (§2.4) — giòn, nên cân nhắc thêm field `ctaVariant` typed vào data thay vì so khớp chuỗi, nếu còn mở rộng thêm nhãn CTA mới cho ưu đãi.
- **`HeroCampaign.tsx`'s `sizes` fix và 2 cặp gradient hex** được commit chung với đợt CTA hierarchy dù không liên quan về mặt chức năng — không tách commit vì cả hai đều nằm trong cùng working tree chưa commit khi phiên trước kết thúc; không gây rủi ro kỹ thuật (đã verify riêng `sizes` fix ở phiên trước đó trong cùng ngày) nhưng làm lịch sử git kém rõ ràng hơn nếu cần revert từng phần sau này.
- **Không có phép đo contrast/breakpoint độc lập nào cho riêng V4** — xem §4. Nếu cần mức đảm bảo ngang các đợt trước (Typography/Color/V3/Champagne đều có bảng đo contrast + breakpoint QA riêng), cần một đợt QA bổ sung baseline cho V4, ngoài phạm vi Phase 2 (repo hygiene) — đề xuất đưa vào Phase 4 (baseline screenshot) của kế hoạch Caudalie Parity.
- Báo cáo này được viết **sau khi commit đã tồn tại** — không thể phỏng vấn lại quyết định thiết kế gốc, chỉ tái tạo được phần đo lường được từ code hiện tại.

---

**Kết luận:** Commit `e7a2ffc` là một thay đổi mạch lạc, migrate hoàn tất (0 điểm chạm sót lại theo grep), có kiến trúc CTA hai tầng rõ ràng và nhất quán về mặt code. Phần còn thiếu là **bằng chứng QA/đo lường độc lập** cho chính đợt này — không phải nghi ngờ về chất lượng code, mà là khoảng trống tài liệu hoá do báo cáo không được viết cùng lúc với lúc code được tạo ra.
