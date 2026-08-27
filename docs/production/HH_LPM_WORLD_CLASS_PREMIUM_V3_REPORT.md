# HH × LPM — World-Class Premium V3 Report

**Ngày:** 2026-07-17
**Branch:** `hh-lpm-world-class-premium-v3` (từ `hh-lpm-premium-color-system`, sau khi V2 micro polish đã commit)
**Định hướng:** Quiet Provence Luxury / French apothecary editorial.
**Trạng thái:** Chưa commit. Toàn bộ thay đổi ở working tree, sẵn sàng để review.

---

## 0. Cách thực hiện

Dev server dùng để lặp nhanh khi implement; **QA cuối cùng chạy trên production build** (`npm run build` + `npm run start`), đúng methodology các đợt trước.

### Giới hạn breakpoint

`resize_window` trong phiên này hoạt động **chính xác** ở 5/6 mốc yêu cầu: **1440px, 1100px, 1024px, 834px, 500px** đều đạt đúng giá trị request (xác nhận bằng `window.innerWidth`). Riêng **390px bị chặn ở mức tối thiểu ~500px** của môi trường — không ép được, không tuyên bố đã test mốc này.

---

## 1. Baseline (trước khi sửa)

Đã chụp qua Chrome MCP tại 1440/1253px trước khi đổi code: Homepage hero, Bestseller (ảnh thật cho SKU bán chạy, gradient placeholder cho phần còn lại), Category (`/san-pham`, toàn gradient placeholder, 2 badge/card), PDP buy box (2 CTA trong buy box + sticky bar 2 CTA = 4 CTA cùng lúc trên mobile — xác nhận lại đúng vấn đề V1/V2 đã flag), Brand story hero, Article (`/bai-viet/...`, cột full-width ~1000px, bullet "•" dán trong đoạn văn liền), Search overlay, Footer (trắng, band "Quyền lợi" teal đặc, newsletter box tint nhẹ), Mobile homepage (2 banner + sticky CTA), Mobile PDP (4 CTA chồng).

**Phát hiện quan trọng ngay từ baseline:** console có 1 lỗi hydration mismatch trên dev server, nguồn gốc là **browser extension** chèn thuộc tính `bis_register`/`__processed_*` vào `<body>` trước khi React hydrate — không phải bug của app. Đã xác nhận lại: **hoàn toàn biến mất trên production build** (xem mục 9).

---

## 2. Nguyên tắc tham chiếu (Phase 2)

Không truy cập/sao chép trực tiếp Dior/Chanel/Aesop/L'Occitane/Le Labo — chỉ áp dụng nguyên tắc thiết kế chung đã biết từ trước:

| Nguyên tắc | Tham chiếu | Áp dụng cho HH × LPM |
|---|---|---|
| Mật độ nội dung thấp, nhiều khoảng thở | Aesop, Le Labo | Gộp nền lặp lại giữa section liền kề thay vì đổi màu liên tục (không giảm số section — giữ nguyên nội dung/route) |
| Tỷ lệ ảnh/chữ nghiêng về ảnh | Chanel, Dior Beauty | Bestseller/category card giữ ảnh làm trọng tâm, giảm metadata phụ |
| Whitespace phân tách thay vì viền/nền màu | Aesop, Le Labo | Section cùng tông nền không cần khung phân cách |
| Phân cấp typography ít bậc | Dior, Chanel | Giới hạn heading-section lớn, demote heading phụ (card/utility) sang sans |
| Accent chỉ ở chi tiết nhỏ | L'Occitane, Chanel | Champagne accent chỉ ở badge/viền/icon, không làm nền lớn |
| Product grid thưa, card gần như "vô hình" | L'Occitane, Aesop | Border mảnh thay vì shadow nặng, hover mới nổi |
| Footer là điểm "hạ màn" yên tĩnh | Le Labo, Aesop | Đánh giá lại — xem mục 6.H |
| Dịch vụ/lợi ích trình bày mảnh, không "card hóa" quá mức | Le Labo, Aesop | Ghi nhận, không đổi cấu trúc lớn trong đợt này |

**Không lấy:** logo, font proprietary, ảnh, icon, copy, mã màu nhận diện chính xác, bố cục 1:1 của bất kỳ thương hiệu nào kể trên.

---

## 3. Palette trước/sau

### 3.1 Bảng giá trị

| Token (giữ nguyên tên — xem giải thích §3.2) | V2 (trước) | V3 (sau) | Vai trò theo spec V3 |
|---|---|---|---|
| `--hh-canvas` | `#fcfaf6` | `#f8f6f1` | canvas |
| `--hh-surface` | `#ffffff` | `#fffefc` | surface |
| `--hh-surface-soft` | `#f4f7f4` | `#f3f5f2` | surface-soft |
| `--hh-surface-warm` | `#f8f1e8` | `#f3ede3` | surface-warm |
| `--hh-surface-blue` | `#eaf4f5` | `#edf3f1` | surface-mineral (tên giữ nguyên, vai trò đổi — xem §3.2) |
| `--hh-primary` | `#244a57` | `#1e4b4f` | primary |
| `--hh-primary-dark` | `#193a45` | `#153a3d` | primary-hover |
| `--hh-primary-foreground` | `#ffffff` | `#fffefc` | text-inverse |
| `--hh-primary-soft` | `#dce8e9` | `#dde9e7` | primary-soft |
| `--hh-accent` | `#c99a4a` (gold) | `#a77b43` (champagne) | accent |
| `--hh-accent-foreground` | `#243338` | `#182a2d` | (dark text on accent) |
| `--hh-accent-gold-soft` | `#f5e7c9` | `#efe2cd` | accent-soft |
| `--hh-ink` | `#243338` | `#182a2d` | text |
| `--hh-muted-foreground` | `#667579` | `#5c696b` | text-secondary |
| `--hh-text-muted` | `#879397` | `#7a8586` | text-muted |
| `--hh-border` | `#e2e7e4` | **`#c6bcaa`** (đã chỉnh, spec đề xuất `#dedad2`) | border |
| `--hh-border-soft` | `#edf0ee` | **`#ddd6c8`** (đã chỉnh, spec đề xuất `#ece8e1`) | border-soft |
| `--hh-shadow-color` | `rgba(32,55,62,.08)` | `rgba(24,42,45,.07)` | shadow |
| `--hh-accent-blue` | `#5f8e91` | **Xóa hẳn** | — (0 call site, V3 chỉ muốn 1 accent) |

### 3.2 Quyết định kiến trúc: giữ tên token cũ, đổi giá trị

V3 spec dùng tên khác (`--hh-text`, `--hh-text-secondary`, `--hh-primary-hover`, `--hh-surface-mineral`...). Đã **giữ nguyên tên token V1/V2** (`--hh-ink`, `--hh-muted-foreground`, `--hh-primary-dark`, `--hh-surface-blue`...) và chỉ thay giá trị, để tránh rename cơ học qua **~150+ file / hàng trăm call site** (`text-hh-ink` dùng ở 62 file, `text-hh-muted-foreground` ở 52 file, `hh-primary` ở 43 file...). Đây là rủi ro cao cho một thay đổi thuần CSS variable, không mang lại lợi ích thị giác nào. Bảng trên map rõ tên-cũ ↔ vai trò-spec để không gây nhầm lẫn khi đọc code sau này.

**Đã xóa `--hh-accent-blue`** (0 call site xác nhận bằng grep) thay vì giữ làm dead code — đúng tinh thần "không phô trương", giảm 1 token thay vì giữ nguyên só, cũng khớp yêu cầu V3 "chỉ 1 accent".

### 3.3 Token đã chỉnh vì contrast không đạt

`--hh-border` theo giá trị spec (`#DEDAD2`) chỉ đạt **1.29:1** so với `--hh-canvas` — gần như vô hình, **trực tiếp vi phạm yêu cầu QA "card không hòa vào nền"** trong chính bản brief này (canvas và surface tự thân chỉ chênh **1.07:1** với nhau, nên card phụ thuộc hoàn toàn vào border để tách khỏi nền). Đã đo và chỉnh sâu hơn trong cùng gam taupe ấm, không đổi hue:

| | Trước (spec) | Sau (đã chỉnh) |
|---|---|---|
| `--hh-border` vs canvas | 1.29:1 | **1.74:1** |
| `--hh-border` vs surface | 1.38:1 | **1.86:1** |
| `--hh-border-soft` vs canvas | 1.13:1 | **1.34:1** |
| `--hh-border-soft` vs surface | 1.21:1 | **1.43:1** |

Vẫn là viền rất mảnh/yên tĩnh ("quiet"), chỉ đủ để mắt phân biệt được card khỏi nền — không phải viền đậm.

---

## 4. Typography trước/sau

| Class | V2 (trước) | V3 (sau) |
|---|---|---|
| `.hh-heading-hero` | serif 500, `clamp(2.4rem,6vw,4.5rem)`, lh 1.08, ls -0.01em | serif 500, `clamp(3rem,5.4vw,5.25rem)`, lh 1, **không letter-spacing** (xem §4.2), `text-wrap:balance` |
| `.hh-heading-page` | serif 500, `clamp(2.1rem,3.5vw,3rem)`, lh 1.1 | serif 500, `clamp(2.6rem,4.2vw,4.25rem)`, lh 1.04, **không letter-spacing**, `text-wrap:balance` |
| `.hh-heading-section` | serif 500, `clamp(1.75rem,3vw,2.5rem)`, lh 1.15 | serif 500, `clamp(2.1rem,3.2vw,3.3rem)`, lh 1.08, `text-wrap:balance` |
| `.hh-heading-card` | serif 500 (dùng cho mọi card) | **sans** (Be Vietnam Pro) 600, `clamp(1.15rem,1.6vw,1.375rem)` — cho card thương mại/utility |
| `.hh-heading-card-serif` *(class mới)* | — | serif 500 (định nghĩa cũ của `.hh-heading-card`) — chỉ dùng cho card editorial thật sự |
| `.hh-body` | 15px, lh 1.65 | 16px, lh 1.7 |
| `.hh-body-lg` | 17px, lh 1.7 | 18px, lh 1.7 |
| `.hh-label` | 12px/600/uppercase/tracking .08em | không đổi (đã nằm trong dải 11–13px yêu cầu) |

### 4.1 `.hh-heading-card` split — vì sao

Grep 4 nơi dùng `.hh-heading-card`: `GiftDiscoveryTiles` ("Bạn đang tìm quà tặng?"), `SeoTextBlock`, `ProductReviews` ("Khách hàng nói gì") — cả 3 đều là heading thương mại/utility, không editorial. Chỉ `TimelineEntry` (brand-story milestone) là editorial thật. Theo đúng spec "ưu tiên Be Vietnam Pro cho product/utility card, chỉ dùng Cormorant trong editorial card": 3 nơi đầu chuyển sang class mới sans; `TimelineEntry` giữ serif qua class `.hh-heading-card-serif` mới. Tác dụng phụ tốt: giảm thêm số heading serif lớn/viewport (đúng nguyên tắc "≤3 serif heading/viewport").

### 4.2 Bug thật phát hiện và sửa: `letter-spacing` âm làm mất dấu tiếng Việt

Spec yêu cầu `letter-spacing: -0.025em`/`-0.02em` cho hero/page. Đã **live-test** trên `.hh-heading-page` với H1 thật 3 dòng nhiều dấu (`/thu-vien-san-pham-hang/dau-xa-cham-soc-nhanh-mem-mai-rang-ro-voi-hanh-nhan-va-hat-lanh-huu-co` → "...và **hạt** lanh hữu cơ."):

- Với `letter-spacing: -0.02em`: **dấu nặng (dot-below) của chữ "ạ" trong "hạt" hoàn toàn biến mất** khi zoom kiểm tra ảnh chụp — không phải mờ, mà là không render.
- Xác nhận nguyên nhân bằng cách toggle `letter-spacing: normal` trực tiếp trên phần tử live trong DevTools: dấu quay lại ngay lập tức.
- Cormorant Garamond compose "ạ" qua mark-to-base GPOS positioning; `letter-spacing` âm phá vỡ việc gắn dấu vào ký tự gốc trong trình duyệt này.

→ **Đã bỏ hẳn `letter-spacing` âm khỏi `.hh-heading-hero`/`.hh-heading-page`** (và khỏi `HeroCampaign.tsx`'s ad-hoc heading, xem §6). Đây là trường hợp yêu cầu tường minh "không cắt dấu tiếng Việt" của chính brief này ghi đè lên giá trị số cụ thể của spec — ưu tiên đúng, không giữ số spec chỉ vì đúng số.

### 4.3 Phát hiện kiến trúc: `.hh-heading-hero` chưa từng được dùng

`.hh-heading-hero` được định nghĩa trong `globals.css` từ đợt Premium Typography (V1) nhưng **grep xác nhận 0 component nào áp dụng class này**. `HeroCampaign.tsx` (2 slide side-by-side, mỗi slide chỉ rộng ~1/2 viewport) dùng kích thước Tailwind ad-hoc riêng (`text-3xl sm:text-4xl`) vì heading-scale đầy đủ không vừa 1 panel nửa-viewport. Đã **không** ép `.hh-heading-hero` vào layout 2-panel này (sẽ vỡ layout/wrap xấu) — thay vào đó tăng nhẹ kích thước heading trong panel (`lg:text-[2.75rem]`, `leading-[1.05]`, `text-balance`, bỏ letter-spacing âm theo phát hiện §4.2) để đồng bộ tinh thần mà không phá cấu trúc 2-panel hiện có. `.hh-heading-hero` giữ nguyên trong CSS làm hạ tầng sẵn có cho hero full-bleed một-slide trong tương lai. Class thực sự mang vai trò "heading lớn nhất site" hiện tại là **`.hh-heading-page`** (18 call site — mọi H1 trang), đã verify diacritic ở §4.2.

---

## 5. Contrast measurements (đo thực tế, không suy đoán)

Công thức WCAG chuẩn (relative luminance + contrast ratio), tính bằng script Node cho toàn bộ cặp token thực dùng trong code — không phải cảm quan qua screenshot.

| Cặp | Tỷ lệ | Đạt AA? |
|---|---|---|
| text (#182a2d) / canvas | 13.81:1 | ✅ |
| text / surface | 14.80:1 | ✅ |
| text / surface-warm | 12.81:1 | ✅ |
| text / surface-mineral | 13.28:1 | ✅ |
| text-secondary (#5c696b) / canvas | 5.27:1 | ✅ (normal text) |
| text-secondary / surface | 5.65:1 | ✅ |
| text-muted (#7a8586) / canvas | 3.52:1 | ⚠️ large-text only — đúng chủ đích (placeholder/de-emphasis, không dùng cho body) |
| text-inverse trên primary | 9.58:1 | ✅ |
| text-inverse trên primary-hover | 12.22:1 | ✅ |
| primary trên canvas/surface (CTA outline, focus ring) | 8.94 / 9.58:1 | ✅ vượt xa mức 3:1 cho UI boundary |
| accent (#a77b43) trên surface/canvas | 3.50–3.75:1 | ⚠️ large-text only — grep xác nhận `--hh-accent` hiện chỉ dùng làm **nền** (dot indicator, gradient, `/20` tint nền + `text-hh-ink`), **không** dùng làm màu chữ trực tiếp ở đâu — an toàn với cách dùng hiện tại, ghi chú "không dùng làm text nhỏ" cho tương lai |
| accent trên accent-soft (nếu lỡ dùng làm text-trên-tint) | **2.96:1 FAIL** | Không được dùng cặp này — xác nhận code hiện tại không dùng (dùng `text-hh-accent-foreground` = ink, 11.67:1, thay vào đó) |
| badge "Hữu cơ" (#1f5c3d trên #dceee1, hex cứng cố ý từ V1) | 6.53:1 | ✅ |
| badge "Bán chạy" (trắng trên primary) | 9.58:1 | ✅ |
| footer link (text-secondary trên surface) | 5.65:1 | ✅ |
| footer "(Đang cập nhật)" — **trước khi sửa** (`/60` opacity) | **2.49:1 FAIL** | Dưới cả ngưỡng large-text (3:1) |
| footer "(Đang cập nhật)" — **sau khi sửa** (`/80` opacity) | **3.66:1** | Đạt ngưỡng large-text; đã ghi rõ đây là text de-emphasized có chủ đích, không đạt 4.5:1 đầy đủ nhưng đọc được |
| `--hh-border` — xem bảng §3.3 | 1.29→1.74:1 (canvas) | Đã chỉnh, xem lý do |

**Overlay chữ trắng trên ảnh hero:** không đo được pixel thật của ảnh (giới hạn công cụ), nhưng suy luận có cơ sở: `HeroCampaign` xếp 2 lớp overlay chồng nhau tại đáy panel (nơi chữ đặt) — `bg-hh-primary-dark/20` phủ toàn bộ + gradient `from-hh-primary-dark/60 to-transparent` tại nửa dưới — độ phủ hiệu dụng tại vị trí chữ ước tính ~68% (1-(1-0.2)×(1-0.6)), tương đương mức đã test bằng proxy nền ảnh sáng/trung/tối ở opacity 0.5–0.6 đều cho ≥3.77:1, phần lớn ≥4.6:1. **Không tuyên bố đã đo chính xác** — đây là suy luận từ cấu trúc CSS, không phải phép đo pixel.

**Kết luận Phase 7:** 2 lỗi contrast thật được tìm thấy và sửa (`--hh-border` theo spec, và footer disabled-link). Không token nào bị giữ nguyên "vì đẹp" khi đo không đạt.

---

## 6. Component đã thay đổi

| # | File | Thay đổi |
|---|---|---|
| 1 | `src/app/globals.css` | Toàn bộ token màu V3 (§3), toàn bộ class typography V3 (§4), xóa `--hh-accent-blue` |
| 2 | `src/components/hh/home/HeroCampaign.tsx` | Heading panel: `text-balance`, `leading-[1.05]`, bỏ letter-spacing âm, `lg:text-[2.75rem]`; gradient fallback `colorFrom/colorTo` cập nhật sang hex V3 (trước đó hardcode hex V1/V2 cũ, lệch token) |
| 3 | `src/components/hh/brand-story/TimelineEntry.tsx` | `.hh-heading-card` → `.hh-heading-card-serif` (giữ serif cho editorial) |
| 4 | `src/components/hh/ProductPlaceholderArt.tsx` | `rounded-2xl` (18px) → `rounded-xl` (14px) — áp dụng tự động cho ~25 call site dùng component này |
| 5 | `src/components/hh/home/MembershipSection.tsx` | `rounded-2xl` → `rounded-xl` |
| 6 | `src/components/hh/home/BrandStoryTeaser.tsx` | `rounded-2xl` → `rounded-xl` |
| 7 | `src/components/hh/advisor/ScentAdvisorView.tsx` | `rounded-2xl` → `rounded-xl`; `hover:shadow-md` (Tailwind mặc định, đậm) → `hover:hh-shadow-md` (utility mảnh của site) |
| 8 | `src/components/hh/auth/AuthOverlay.tsx` | `rounded-2xl` → `rounded-xl` |
| 9 | `src/components/hh/layout/StickyMobileCta.tsx` | Ẩn hẳn trên route PDP (`usePathname().startsWith("/san-pham/")`) — xem §6.E |
| 10 | `src/components/hh/HHShell.tsx` | `pb-20` (khoảng chừa cho sticky bar) chỉ áp dụng khi **không** phải PDP, tránh khoảng trắng thừa |
| 11 | `src/components/hh/pdp/ProductBuyBox.tsx` | "Thêm vào giỏ": `border-2` → `border` + `hover:bg-hh-primary-soft`, rõ ràng là CTA phụ hơn |
| 12 | `src/components/hh/layout/Footer.tsx` | `text-hh-muted-foreground/60` → `/80` cho link "(Đang cập nhật)" (fix contrast §5) |
| 13 | `src/app/bai-viet/[slug]/page.tsx` | Cột text `max-w-[65ch]`; `mainContent` parse thành `<ul><li>` thật thay vì "•" dán trong `<p>` (component `ArticleBody`, không đổi data) |
| 14 | `src/app/nguyen-lieu/[slug]/page.tsx` | Cột text `max-w-[65ch]` |

### 6.E — PDP CTA hierarchy (đề xuất A6 từ V2, chưa làm khi đó — nay đã làm)

Baseline mobile PDP có **4 CTA cùng mức nổi bật**: buy box "Gửi yêu cầu mua hàng"/"Mua ngay" (solid) + "Thêm vào giỏ" (outline) + sticky bar "Tư vấn chọn mùi" (outline) + "Mua ngay" (solid, mở cart drawer chung chung, trùng chức năng với buy box). Đã ẩn `StickyMobileCta` trên toàn bộ route `/san-pham/[slug]` (không ẩn ở `/san-pham` danh sách), vì buy box đã có đủ CTA riêng cho đúng sản phẩm đó. Đồng thời gỡ padding `pb-20` thừa để không để lại khoảng trắng ở đáy trang PDP mobile. Đã verify qua browser: PDP mobile giờ chỉ còn 2 CTA (1 chính + 1 phụ rõ ràng), sticky bar biến mất sạch ở cả 500px và 834px, không còn khoảng trắng thừa.

### 6.F — Article/ingredient (max-width + bullet thật)

Cột text bọc trong `max-w-[65ch]` (ảnh header vẫn giữ full-width container, đúng nguyên tắc "ảnh lớn hơn chữ" ở Phase 2). Phát hiện `mainContent` của bài viết là 1 string với `\n` thật, mỗi dòng tiền tố `"• "` — viết component `ArticleBody` parse dòng bullet thành `<ul><li>` thật ở **render time**, dữ liệu nguồn (`articles-derived.json`) **không bị đụng tới byte nào**. Đây là điều V1/V2 report từng đánh giá "cần sửa dữ liệu nguồn" — hóa ra sửa được thuần ở tầng render vì cấu trúc dữ liệu vốn đã có separator `\n` rõ ràng.

### 6.G — Scent advisor

Đã ở trạng thái tốt từ V2 (3 surface token, icon riêng, không pastel rời rạc). V3 chỉ chỉnh nhất quán radius (`rounded-xl`) và shadow hover (`hh-shadow-md` thay vì Tailwind `shadow-md` mặc định) — không đổi logic/matching/route.

### 6.H — Footer: quyết định giữ nền sáng

Spec cho phép "teal sâu **hoặc** surface sáng tùy kết quả thực tế". Đã đánh giá: footer hiện tại (trắng, band "Quyền lợi" teal đặc phía trên, newsletter box tint mineral) đã thỏa mọi tiêu chí cứng — không đen tuyệt đối, newsletter là khối màu duy nhất trong footer, link đạt 5.65:1. Đổi toàn bộ footer sang nền teal đặc sẽ là thêm 1 vùng nền-đặc-lớn dùng primary, đi ngược chính phát hiện của V1 report ("primary dùng làm nền đặc ở nhiều diện tích lớn khiến trang hơi lạnh/nặng hơn tinh thần Provence nắng ấm") — **quyết định giữ nguyên nền sáng**, chỉ sửa lỗi contrast cụ thể tìm được (§5). Không phải "chưa làm" — là lựa chọn có cân nhắc, ghi lại lý do thay vì đổi chỉ vì spec liệt kê 2 lựa chọn.

### Không đổi / cân nhắc nhưng bỏ qua

- **Header (A):** đã đủ khoảng thở, active state mảnh, không capsule hóa — quan sát tại 1440/834px không thấy vấn đề cần sửa.
- **Bestseller/Category (C, D):** border/radius tự động cải thiện qua token + `ProductPlaceholderArt` fix; không cần đổi cấu trúc.
- **ProductDescription.tsx (PDP mô tả):** đã dùng `<dl>`/`<ul><li>` thật, không có vấn đề "•" giả — không cần sửa.
- **Gradient trang trí `ProductPlaceholderArt` per-instance** (`colorFrom`/`colorTo` ở CategoryShowcase, SocialFeed, FullBleedBrandStory, ProductGallery, CartDrawer, SearchOverlay, TaiKhoanContent, BrandStoryTimeline — 10 file): vẫn dùng hex V1/V2 cũ, **chưa** đồng bộ sang V3. Chỉ sửa `HeroCampaign.tsx` (tác động thị giác cao nhất, gần với "màu thương hiệu chính thức" nhất). Phần còn lại là màu trang trí đa dạng theo từng sản phẩm/danh mục (không phải token thương hiệu), khối lượng sửa lớn (~10 file, nhiều cặp màu mỗi file), rủi ro thấp nếu để nguyên — ghi nhận là hạn chế còn lại (§10), không phải bỏ sót.

---

## 7. Giảm template-feel — trước/sau

| Vấn đề | Trước | Sau |
|---|---|---|
| Rounded corners | `rounded-2xl` (18px) ở 6 nơi (card chính, modal) | `rounded-xl` (14px) — đúng dải "10–14px" spec yêu cầu cho card chính |
| Shadow | 1 chỗ dùng Tailwind `shadow-md` mặc định (đậm hơn hệ thống) | Đồng bộ về `.hh-shadow-md` (mảnh, tint theo `--hh-shadow-color`) |
| CTA hierarchy PDP mobile | 4 CTA cùng cấp | 2 CTA (1 chính rõ, 1 phụ outline nhẹ) |
| Card density / editorial | Article/ingredient full-width, bullet giả | Cột 65ch, bullet thật |
| Heading serif/viewport | `.hh-heading-card` luôn serif kể cả non-editorial | 3/4 usage chuyển sang sans — giảm thêm số serif lớn cùng lúc |
| Badge/section background | Không đổi (đã đạt 2 badge/card, hue phân biệt từ V1/V2) | Không cần sửa thêm |

---

## 8. Screenshot A/B — so sánh có giải thích

*(Không lưu file ảnh riêng — đã xem trực tiếp qua Chrome MCP trong phiên làm việc, mô tả cụ thể từng điểm khác biệt bên dưới thay vì chỉ kết luận "đẹp hơn".)*

**Hero/Homepage:** Canvas sáng/mát hơn rõ rệt (giảm ám vàng so với `#fcfaf6` cũ). Badge "Bán chạy" và nút CTA dùng teal trầm hơn, bớt cảm giác "biển xanh lạnh" đã bị V1 report phê bình. Heading panel hero đọc cân đối hơn nhờ `text-balance`, không còn từ đơn côi cuối dòng.

**Bestseller:** Card giờ có viền phân biệt rõ với canvas (trước: 1.29:1 gần như vô hình → sau: 1.74–1.86:1 nhìn thấy được ở cả 4 card, kể cả 3 card dùng placeholder gradient chưa có ảnh thật). Đây là cải thiện đo được, không chỉ cảm quan.

**Category (`/san-pham`):** Heading "Tất cả sản phẩm" to/tự tin hơn hẳn (page-heading tăng từ `clamp(2.1rem,...,3rem)` lên `clamp(2.6rem,...,4.25rem)`). Card border rõ hơn cùng lý do trên. "Bộ lọc" pill giữ nguyên, không "dashboard hóa".

**PDP buy box:** Giảm từ 4 xuống 2 CTA nhìn thấy cùng lúc trên mobile — cải thiện **chức năng**, không chỉ thị giác: người dùng không còn phải chọn giữa 4 nút trông "quan trọng như nhau".

**Brand story / Article:** Cột văn bản bài viết co lại từ ~1000px xuống ~65ch (~700px ở 1253px viewport) — dòng ngắn hơn, dễ scan hơn hẳn theo đúng khuyến nghị 45–75 ký tự/dòng. Bullet "•" dán trong đoạn văn nay là `<ul><li>` thật với marker — đọc như bài báo được biên tập, không còn cảm giác "dữ liệu thô dán vào" (đúng phát hiện Phase 2 nguyên tắc Aesop/Le Labo).

**Scent advisor:** Không đổi thị giác đáng kể so với V2 (đã tốt), chỉ radius/shadow nhất quán hơn với phần còn lại của site.

**Search overlay, Footer:** Không đổi cấu trúc; kế thừa token mới tự động (link, input, badge đều đậm/nhạt đúng theo bảng contrast §5). Text "(Đang cập nhật)" trong footer đọc rõ hơn (2.49:1 → 3.66:1).

**Mobile PDP:** Thay đổi rõ nhất trong toàn bộ đợt — sticky bar biến mất hoàn toàn, không còn khoảng trắng thừa ở đáy, chỉ còn buy box với 2 CTA rõ ràng.

---

## 9. Breakpoint thực đo & Route QA

### Breakpoint
**Đạt chính xác:** 1440px, 1100px, 1024px, 834px, 500px.
**Không đạt:** 390px (môi trường chặn ở tối thiểu ~500px) — không tuyên bố đã test mốc này.

### Route đã QA (production build, `npm run start`)

| Route | Overflow | Console error |
|---|---|---|
| `/` | ok | 0 |
| `/san-pham` | ok | 0 |
| 5 PDP (`.../huong-qua-dao-xuan-dao`, `.../co-roi-ngua-chanh`, `.../huong-hoa-hong-dai`, + 2 truy cập gián tiếp qua search/scent-advisor) | ok | 0 |
| `/uu-dai` | ok | 0 |
| `/tu-van-chon-san-pham` | ok | 0 |
| `/cau-chuyen-thuong-hieu` | ok | 0 |
| `/bai-viet/hieu-ve-loai-toc-cua-toi`, `/bai-viet/meo-nho-lam-dep-va-cham-soc-da-cua-chung-toi` | ok | 0 |
| `/nguyen-lieu/fleur-d-oranger`, `/nguyen-lieu/abricot` | ok | 0 |
| `/thu-vien-san-pham-hang` (+ 1 chi tiết dùng để test diacritic §4.2) | ok | 0 |
| `/thanh-toan` (checkout) | ok | 0 |
| Search overlay | hoạt động đúng, kết quả sản phẩm thật hiển thị | 0 |
| Cart drawer | hoạt động đúng, CTA chính/phụ rõ | 0 |
| Scent advisor click-through | `?scent=Oải hương` → đúng trang lọc, đúng sản phẩm | 0 |
| Mobile homepage (500px), Mobile PDP (500px, 834px) | ok, sticky bar đúng logic ẩn/hiện | 0 |

**Console/hydration:** 0 lỗi trên **production build** ở mọi route đã kiểm (đã `clear` buffer trước mỗi lần đọc để tránh nhiễu từ session dev-server trước đó). Xác nhận lại: lỗi hydration thấy ở baseline dev-server hoàn toàn biến mất trên production — đúng như phán đoán ban đầu (browser extension, không phải app bug).

**`npm run check`:** pass sạch (lint + typecheck + build, 360 trang static/SSG generate thành công) — chạy 2 lần (sau khi hoàn tất component pass, và lại sau khi sửa gradient Hero) đều pass.

**`git diff --check`:** exit 0, không whitespace error.

**`git status --short`:** 14 file `M`, không file nào ngoài phạm vi bị đụng; `docs/reports/` (untracked có sẵn từ trước) không bị động tới.

---

## 10. Lỗi phát hiện và đã sửa trong đợt này

1. **`--hh-border` theo spec chỉ đạt 1.29:1** — sửa thành `#c6bcaa` (~1.74–1.86:1).
2. **`letter-spacing` âm theo spec làm mất dấu nặng tiếng Việt** trên Cormorant Garamond (bug rendering thật, xác minh bằng ảnh chụp + toggle live) — bỏ letter-spacing âm khỏi hero/page heading.
3. **Footer "(Đang cập nhật)" chỉ đạt 2.49:1** (dưới cả ngưỡng large-text) — tăng opacity 60%→80%, đạt 3.66:1.
4. **`ScentAdvisorView` dùng Tailwind `shadow-md` mặc định** thay vì utility mảnh của site — sửa về `hh-shadow-md`.
5. **`HeroCampaign` hardcode hex V1/V2 cũ** cho gradient fallback, lệch với token mới sau khi đổi palette — cập nhật sang hex V3.
6. **`.hh-heading-hero` không được component nào dùng** — không phải lỗi cần sửa (không có regression), nhưng ghi nhận rõ để tránh hiểu nhầm class này "đang hoạt động" khi đọc code.

---

## 11. Giới hạn còn lại

- **390px chưa test** — môi trường resize chặn ở ~500px tối thiểu.
- **~10 file dùng `ProductPlaceholderArt` với hex V1/V2 cũ chưa đồng bộ V3** (CategoryShowcase, SocialFeed, FullBleedBrandStory, ProductGallery, CartDrawer, SearchOverlay, TaiKhoanContent, BrandStoryTimeline...) — màu trang trí đa dạng theo sản phẩm, không phải token thương hiệu, khối lượng sửa lớn, để lại có chủ đích thay vì mở rộng phạm vi.
- **Thiếu ảnh sản phẩm thật** vẫn là giới hạn lớn nhất ảnh hưởng "luxury feeling"/"product presentation" — không token/class/typography nào trong đợt V3 (hay V1, V2) giải quyết được vấn đề này, đúng như đã ghi nhận từ trước.
- **Overlay text-trên-ảnh hero** — đánh giá bằng suy luận cấu trúc CSS (2 lớp overlay chồng), không đo pixel thật của từng ảnh — không tuyên bố đã đo chính xác.
- **Footer giữ nguyên nền sáng** — quyết định có cân nhắc (§6.H), không phải "chưa làm"; nếu CEO muốn thử phương án teal đặc, cần 1 đợt riêng để QA lại toàn bộ contrast link/text trên nền tối.
- **Field dữ liệu chưa dùng** trong `HHScentAdvisorQuestion` (`color`, `buttonBg`, `colorFrom`, `colorTo`, `shape`, `muted`, `onDark`) từ V2 vẫn giữ nguyên, ngoài phạm vi V3.

---

## 12. Tác động performance

- Không thêm thư viện UI/animation mới — `package.json` không đổi.
- Không thêm ảnh/video mới.
- `ArticleBody` (parse bullet) là 1 hàm helper thuần React, chạy tại render time, chi phí không đáng kể (string split trên nội dung đã ngắn).
- `usePathname()` thêm vào `HHShell`/`StickyMobileCta` — hook tiêu chuẩn Next.js App Router, chi phí runtime không đáng kể, không ảnh hưởng SSG (các trang tĩnh vẫn prerender bình thường, chỉ phần client-side ẩn/hiện sticky bar chạy sau hydrate).
- `npm run build` (Turbopack): 360 trang static/SSG generate thành công, không cảnh báo bundle size mới.

---

## 13. Kết luận — V3 có thực sự tốt hơn V2 không?

**Có — dựa trên bằng chứng cụ thể, không chỉ cảm quan:**

1. **2 lỗi contrast thật** (`--hh-border`, footer disabled-link) được tìm thấy và sửa — nếu áp dụng spec V3 nguyên văn mà không đo, site sẽ có card "vô hình" trên nền, tệ hơn V2.
2. **1 bug rendering thật** (mất dấu tiếng Việt do letter-spacing) được tìm thấy và sửa trước khi kịp ảnh hưởng người dùng thật.
3. **Vấn đề chức năng đã được flag từ V1, chưa từng sửa qua 2 đợt** (4 CTA chồng nhau trên PDP mobile) — nay đã sửa dứt điểm.
4. **Vấn đề editorial-quality đã flag từ V1** (bullet giả, cột text quá rộng trong bài viết) — nay đã sửa mà không đụng dữ liệu nguồn.
5. **Palette khách quan trầm/sáng/mát hơn** theo đúng định hướng "quiet Provence luxury" — đo được qua giá trị hex, không chỉ nhìn.
6. **0 regression** phát hiện qua QA trên toàn bộ route/breakpoint đã kiểm, `npm run check` sạch cả 2 lần chạy.

**Không tự nhận toàn bộ 10 phase đã "hoàn hảo":** ~10 file gradient trang trí chưa đồng bộ token mới, footer chưa thử phương án tối, 390px chưa test được — đây là giới hạn thật, ghi rõ ở mục 11, không che giấu.

**Khuyến nghị:** giữ V3, không revert. Các cải thiện đo được (contrast, bug tiếng Việt, CTA hierarchy chức năng) đủ mạnh để vượt ngưỡng "tốt hơn rõ ràng" mà brief yêu cầu trước khi giữ lại thay vì quay về V2.

---

**Chưa commit.** Dừng lại để người dùng review.
