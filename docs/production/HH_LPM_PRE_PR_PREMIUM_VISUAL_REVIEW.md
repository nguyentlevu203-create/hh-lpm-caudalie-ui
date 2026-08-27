# HH × LPM — Pre-PR Premium Visual Review

**Ngày:** 2026-07-17
**Branch:** `hh-lpm-premium-color-system`
**Phạm vi:** audit + đề xuất sau đợt Premium Typography (Cormorant Garamond + Be Vietnam Pro) và Premium Color System. **Không sửa code, không đổi token, không commit, không redesign.**

---

## 0. Cách review được thực hiện

`npm run build` + `npm run start -- --hostname 0.0.0.0 --port 3000`, kiểm tra qua Chrome MCP trên production build (không phải dev server).

### Giới hạn breakpoint — ghi rõ theo yêu cầu

`resize_window` trong môi trường phiên này **không ép được chính xác pixel yêu cầu** — mỗi tab "chốt" ở một `window.innerWidth` khác với giá trị request, và giá trị đó khác nhau giữa các tab. Đã xác nhận bằng `window.innerWidth` qua JS thay vì tin vào tham số resize:

| Tab | Yêu cầu resize | `window.innerWidth` thực đo |
|---|---|---|
| Tab desktop chính | 1440 | **1253px** |
| Tab mobile | 390 | **500px** |
| Tab tablet | 1024 | **834px** |
| Tab desktop phụ | 390 | **1024px** |

→ **Đã kiểm thực tế ở 4 viewport: 1253px, 1024px, 834px, 500px.** Không đạt chính xác 1440px, 1100px, 390px — không tuyên bố đã test các mốc này. 1253px được dùng thay thế cho dải "desktop rộng" (1440/1100); 1024px và 834px trùng khớp đúng 2 mốc yêu cầu; 500px trùng khớp đúng mốc còn lại. Route/component nào không được nhìn ở cả 4 viewport sẽ được ghi rõ trong từng mục.

### Route đã kiểm
`/`, `/san-pham`, 3 PDP, `/uu-dai`, `/tu-van-chon-san-pham`, `/cau-chuyen-thuong-hieu`, 1 bài viết (`/bai-viet/hieu-ve-loai-toc-cua-toi`), 1 nguyên liệu (`/nguyen-lieu/fleur-d-oranger`), mega menu desktop, mobile hero + mobile PDP (500px). Không mở lại search/cart/auth/checkout overlay trong lượt này — đã QA màu các overlay này kỹ ở đợt review trước (`HH_LPM_PREMIUM_COLOR_SYSTEM_REPORT.md`) và không có gì đổi từ đó; nhận định trong report này về overlay dựa trên việc đọc lại code (`globals.css`, các component) chứ không phải screenshot mới.

---

## 1. Đánh giá hiện trạng (tổng quan)

Sau 2 đợt (typography + color), website đã có một **hệ thống rõ ràng, nhất quán về mặt kỹ thuật**: type scale 8 cấp (`hh-heading-hero` → `hh-caption`), palette 1 primary + 2 accent + 5 surface tier. Đây là nền tảng tốt hơn hẳn một site "mặc định shadcn". Vấn đề hiện tại không nằm ở việc thiếu hệ thống, mà ở **cách hệ thống đó được áp dụng lặp lại quá đều** trên nhiều section liên tiếp — heading serif cùng 1 class (`hh-heading-section`) xuất hiện 7 lần chỉ riêng trên trang chủ, 4 khối icon-grid gần giống hệt nhau (2 trên trang chủ, 1 trên PDP), 6 màu pastel khác nhau trên trang tư vấn mùi hương không map vào token surface nào. Kết quả: nhìn tổng thể vẫn hơi giống "site được sinh ra từ component library" hơn là một trang biên tập (editorial) được thiết kế theo layout riêng cho từng section.

Điểm mạnh rõ rệt: hero, term-block "[SAVON DE MARSEILLE]", full-bleed brand story, quote italic — đây là những chỗ đang *đúng tinh thần* premium editorial. Điểm yếu rõ rệt: nội dung dài (PDP description, bài viết, nguyên liệu) đang dùng cột văn bản quá rộng và bullet giả bằng dấu "•" trong một đoạn văn, làm giảm cảm giác "được biên tập".

---

## 2. Scorecard (1–10)

| Tiêu chí | Điểm | Lý do |
|---|---|---|
| Typography | 7 | Type scale rõ ràng, cặp serif/sans đúng vai trò ở phần lớn nơi (PDP H1 sans, mega menu sans, quote italic serif). Trừ điểm vì: heading-section lặp quá dày trên trang chủ, TimelineEntry xếp 2 dòng serif chồng nhau (year + heading) làm mất phân cấp, cột văn bản dài (PDP/bài viết/nguyên liệu) rộng hơn mức đọc thoải mái. |
| Color harmony | 7 | Palette 1 primary + 2 accent nhất quán, badge phân vai rõ (hữu cơ/bán chạy/liên hệ giá/tham khảo dùng 4 hue khác nhau có chủ đích). Trừ điểm vì: primary xanh than được dùng làm nền đặc (dark band, overlay, sticky CTA) ở nhiều nơi khiến tổng thể trang hơi lạnh/nặng hơn cảm giác "ánh nắng Provence"; 6 card tư vấn mùi hương dùng 6 pastel hex rời rạc không thuộc 5 surface token. |
| Visual hierarchy | 6 | H1 trang thường tốt (to, rõ, đúng vị trí). Nhưng bên trong nhiều component, hierarchy giữa heading chính và heading phụ yếu (TimelineEntry, SeoTextBlock heading dùng cùng class với các H2 khác dù nội dung là SEO filler). |
| Whitespace | 7 | Padding/margin theo scale nhất quán (Tailwind spacing), không có chỗ bị chật. Nhưng nhiều section có padding-y gần bằng nhau tạo nhịp đều-đều hơi máy móc (xem mục 5). |
| Brand feeling | 6 | Có tinh thần Provence rõ ở hero/term-block/full-bleed, nhưng bị pha loãng bởi các block chức năng chung chung (icon-grid 4 cột, banner khuyến mãi 2 tầng) không mang dấu ấn riêng. |
| Luxury feeling | 5 | Bị giới hạn nặng bởi thiếu ảnh sản phẩm thật — phần lớn card dùng `ProductPlaceholderArt` (gradient hình chai) thay vì ảnh, đây là yếu tố ảnh hưởng "sang trọng" nhiều hơn bất kỳ token màu/font nào. |
| Product presentation | 4 | Cùng lý do trên — nhiều sản phẩm cạnh nhau trên `/san-pham` trông giống hệt nhau (cùng gradient be, cùng 2 badge). Đây là giới hạn dữ liệu, không phải lỗi thiết kế, nhưng ảnh hưởng trực tiếp đến điểm số. |
| Mobile polish | 6 | Layout không vỡ, không tràn ngang ở 500px/834px. Trừ điểm: 2 banner thông báo xếp chồng đẩy hero xuống thấp trên màn hình nhỏ; PDP mobile có 3–4 CTA cùng lúc trong 1 màn hình (buy box 2 nút + sticky bar 2 nút); breadcrumb PDP wrap để lại dấu ">" mồ côi cuối dòng. |
| Editorial quality | 5 | Term-block và quote là điểm sáng thực sự editorial. Nhưng mô tả PDP/bài viết/nguyên liệu dùng bullet giả bằng "•" trong một đoạn văn liền, không phải danh sách thật — đọc mệt, không có cảm giác được biên tập. |
| Conversion clarity | 6 | CTA chính (nền primary đặc) vẫn là điểm nổi bật nhất mỗi màn hình — tốt. Nhưng PDP mobile có quá nhiều CTA cùng cấp độ nổi bật (xem mục 5), làm giảm rõ ràng "nút nào là hành động chính". |
| UI consistency | 8 | Đây là điểm mạnh nhất — overlay (auth/cart/filter/mobile-drawer) dùng chung 1 pattern nhất quán, badge/button dùng đúng token xuyên suốt, không có màu "đi lạc" ngoài palette (trừ vài hex trang trí cố ý trong `colorFrom/colorTo`). |
| Accessibility perception (chỉ cảm quan, không đo) | 6 | Text chính đọc rõ ở mọi nơi đã xem; lo ngại duy nhất là dòng chữ dài + text-align center ở `SeoTextBlock` (giảm khả năng scan), và chưa có styling riêng cho trạng thái disabled (ghi nhận lại từ đợt trước, không mới). |

**Điểm trung bình: 6.1/12 tiêu chí ≈ 6.2/10** — nền tảng vững, cần tinh chỉnh có mục tiêu hơn là thay đổi lớn.

---

## 3. Typography findings

### 3.1 Type scale hiện tại (từ `globals.css`)

| Class | Font | Weight | Size (clamp) | Line-height | Dùng ở |
|---|---|---|---|---|---|
| `.hh-heading-hero` | Cormorant | 500 | 2.4rem → 4.5rem | 1.08 | Hero H1 |
| `.hh-heading-page` | Cormorant | 500 | 2.1rem → 3rem | 1.1 | Page H1 (`/san-pham`, `/uu-dai`…) |
| `.hh-heading-section` | Cormorant | 500 | 1.75rem → 2.5rem | 1.15 | H2 mọi section (dùng lại **rất nhiều lần**) |
| `.hh-heading-card` | Cormorant | 500 | 1.25rem → 1.5rem | 1.25 | Card/timeline heading |
| `.hh-quote` | Cormorant italic | 400 | 1.6rem → 2.75rem | 1.25 | Pull-quote |
| `.hh-body-lg` | Be Vietnam Pro | — | 17px | 1.7 | Body lớn |
| `.hh-body` | Be Vietnam Pro | — | 15px | 1.65 | Body |
| `.hh-label` | Be Vietnam Pro | 600 | 12px | — (tracking .08em, uppercase) | Eyebrow label |

Ở viewport thực đo 1253px: `hh-heading-hero` chạm trần 4.5rem (72px, vì 6vw ≈ 75px > 72px cap). Ở 500px: chạm sàn 2.4rem (38.4px, vì 6vw = 30px < sàn). Clamp hoạt động đúng như thiết kế, không có kích thước bất thường ở 2 đầu dải đã đo.

**Không có heading nào dùng weight 400 (regular)** — tất cả các class heading là weight 500. Vì vậy nhận định "weight 400 quá mảnh" **không áp dụng** cho hệ class chính thức; nơi duy nhất "mảnh" thật sự là `.hh-quote` (weight 400 italic) — nhưng đó là chủ ý đúng cho pull-quote (italic tạo cảm giác nhẹ, tương phản có chủ đích với heading đậm hơn), nên giữ nguyên.

### 3.2 Vấn đề cụ thể tìm thấy

**(a) Serif dùng quá nhiều/quá dày trên một trang — Nghiêm trọng: Trung bình**
Trang chủ (`/`) dùng `.hh-heading-section` cho ít nhất 7 heading khác nhau trong một lượt cuộn: "Trải nghiệm mua sắm cùng Hoàng Hà", "Giá trị thương hiệu", "Le Petit Marseillais tại Việt Nam" (full-bleed), "Chăm sóc cá nhân thiên nhiên cho cả gia đình" (SEO block), "Quyền lợi mỗi đơn hàng", membership heading, "Cộng đồng Hoàng Hà". Cùng 1 kiểu chữ, cùng size, cùng weight lặp lại liên tục khiến mắt không còn phân biệt được "đây là section quan trọng" vs "đây chỉ là section phụ" — mọi thứ trông "quan trọng như nhau", tức là **không có gì thực sự nổi bật**.
→ File: `src/components/hh/home/*.tsx` (nhiều file dùng chung class), `src/app/globals.css` (định nghĩa `.hh-heading-section`).

**(b) TimelineEntry xếp 2 dòng serif chồng nhau — Nghiêm trọng: Trung bình**
`src/components/hh/brand-story/TimelineEntry.tsx` render `year` bằng `.hh-display text-2xl font-medium md:text-[38px]` (serif) ngay phía trên `heading` bằng `.hh-heading-card` (cũng serif, weight 500). Ví dụ thực tế: "Hoàng Hà tại Việt Nam" (to) rồi ngay dưới "Đồng hành cùng người tiêu dùng Việt" (nhỏ hơn nhưng cùng font/weight) — hai dòng serif liền kề không đủ tương phản để mắt biết dòng nào là "nhãn năm/giai đoạn" và dòng nào là "tiêu đề mốc son". Lặp lại giống hệt ở cả 3 mốc trên trang `/cau-chuyen-thuong-hieu`.
→ File: `src/components/hh/brand-story/TimelineEntry.tsx` dòng 48–49.
→ Đề xuất: đổi `year` sang `.hh-label` (sans, uppercase, tracking rộng, nhỏ) để nó đóng vai trò eyebrow thay vì heading thứ hai — giữ nguyên `heading` là serif duy nhất trong block.

**(c) Cột văn bản dài quá mức đọc thoải mái — Nghiêm trọng: Trung bình**
Mô tả PDP (`ProductDescription`/nội dung `Sản phẩm này là gì?`), thân bài viết (`/bai-viet/[slug]`), thân trang nguyên liệu (`/nguyen-lieu/[slug]`) đều render trong container rộng gần bằng max-width trang (~900–1000px ở 1253px viewport) — mỗi dòng dài hơn 90–100 ký tự, vượt xa mức khuyến nghị 45–75 ký tự/dòng cho văn bản dài. Đọc bị mỏi mắt hơn cần thiết, cảm giác kém "biên tập" so với một trang tạp chí/editorial thật.
→ Đề xuất: giới hạn cột văn bản thân bài ở `max-w-2xl`/`max-w-3xl` (~640–720px) thay vì để full container, đặc biệt cho bài viết và nguyên liệu.

**(d) Bullet giả bằng ký tự "•" trong một đoạn văn liền — Nghiêm trọng: Trung bình**
Cả mô tả PDP và thân bài viết đều có xu hướng nhét nhiều ý dạng "- Thành phần tự nhiên: ... - Chứng nhận hữu cơ: ... - KHÔNG sulfate: ..." vào chung một `<p>`, hoặc dùng "•" làm dấu đầu dòng thủ công thay vì `<ul><li>`. Đây là vấn đề nội dung/markup nhiều hơn là font, nhưng ảnh hưởng trực tiếp đến "editorial quality" — trông như dữ liệu thô dán vào, chưa được biên tập lại cho web.
→ File: dữ liệu nguồn trong `src/data/*.ts` (mô tả sản phẩm/bài viết), không phải component.

**(e) SeoTextBlock — heading dùng chung class với H2 quan trọng khác + văn bản canh giữa nhiều dòng — Nghiêm trọng: Nhẹ**
`src/components/hh/home/SeoTextBlock.tsx` dùng `.hh-heading-section` (giống mọi H2 khác) cho một block về bản chất là SEO filler text, rồi 3 đoạn văn dài canh giữa (`text-center`). Văn bản 3+ dòng canh giữa khó quét mắt hơn văn bản canh trái; kết hợp với heading to ngang hàng các heading "thật" khác, block SEO này đang được cấp một mức độ nổi bật thị giác cao hơn vai trò thực tế của nó.
→ File: `src/components/hh/home/SeoTextBlock.tsx`.
→ Đề xuất: giữ heading nhỏ hơn (dùng `.hh-heading-card` thay vì `.hh-heading-section`), và canh trái đoạn văn từ đoạn 2 trở đi (đoạn mở đầu ngắn 1 dòng có thể giữ canh giữa).

**(f) Diacritics tiếng Việt — không quan sát thấy lỗi cắt dấu thực tế, nhưng line-height hệ thống khá chật**
Đã zoom kiểm tra trực tiếp hero H1 3 dòng ("Le Petit Marseillais — Chăm / sóc cá nhân theo tinh thần / thần") ở line-height 1.08 — **không thấy dấu bị cắt hay chồng lên dòng trên** trong trường hợp cụ thể này. Tuy nhiên `1.08–1.15` là khá chật cho một hệ chữ có dấu chồng đôi (ví dụ "ầ", "ữ", "ẫ") khi dòng phía trên vô tình kết thúc bằng chữ có nét xuống (g, p, y, q). Đây là **rủi ro tiềm ẩn**, không phải lỗi đã xác nhận — cần QA thêm trên các heading dài hơn/khác nội dung trước khi kết luận chắc chắn an toàn.

**(g) Heading H1 xuống dòng — không phát hiện lỗi xuống dòng xấu (orphan 1 từ, chữ mồ côi) trên các heading đã kiểm** ở cả 1253px và 500px. Hero H1 xuống dòng cân đối 3 dòng ở cả hai viewport.

**(h) Sans-serif ở nơi cần sans — đúng, giữ nguyên**: PDP H1, breadcrumb, mega menu, toàn bộ overlay (search/cart/auth/filter), nút CTA đều dùng sans nhất quán, không có serif "đi lạc" vào các bề mặt chức năng/giao dịch. Đây là điểm cộng thực sự — không nên đổi.

### 3.3 Component nào giữ nguyên / đổi gì

| Component | Hiện trạng | Đề xuất |
|---|---|---|
| Hero (`HeroCampaign`) | `.hh-heading-hero`, serif 500, tốt | **Giữ nguyên** |
| Term block (`BrandStoryTermBlock`) | Serif caps lớn, có dấu ngoặc `[ ]` | **Giữ nguyên** — điểm sáng editorial nhất site |
| Quote (`BrandStoryQuoteBlock`) | `.hh-quote` italic 400 | **Giữ nguyên** |
| PDP H1 (`ProductBuyBox`) | Sans, semibold | **Giữ nguyên** |
| Mega menu, overlay, breadcrumb | Sans xuyên suốt | **Giữ nguyên** |
| `TimelineEntry` (year label) | Serif `.hh-display text-2xl/38px` | **Đổi sang `.hh-label` (sans, uppercase, tracking)** — mục 3.2(b) |
| `SeoTextBlock` heading | `.hh-heading-section` | **Đổi xuống `.hh-heading-card`**, đoạn văn canh trái — mục 3.2(e) |
| PDP/bài viết/nguyên liệu body | Full container width | **Giới hạn `max-w-2xl`/`3xl`** — mục 3.2(c) |
| Mô tả sản phẩm/bài viết (data) | "•"/"-" giả bullet trong 1 đoạn | **Tách thành danh sách thật** (ngoài phạm vi component, cần sửa data) — mục 3.2(d) |

**Không đề xuất font thứ ba** — không có lý do đủ mạnh; vấn đề hiện tại là *cách dùng* 2 font đã có, không phải thiếu font.

---

## 4. Color findings

### 4.1 Token hiện tại

| Token | Giá trị | Giữ/Điều chỉnh | Giá trị đề xuất | Lý do |
|---|---|---|---|---|
| `--hh-canvas` | `#fcfaf6` | Điều chỉnh (nhẹ) | Ấm hơn một chút, ví dụ `#faf7f1` | R−B chỉ chênh 6/255 — gần như trắng trung tính, chưa đủ "ấm" để tạo cảm giác ivory/apothecary cao cấp mà brief "sáng hơn, ấm hơn" hướng tới. Đây là thay đổi 1 token, rủi ro thấp vì mọi surface khác đã tách lớp rõ. |
| `--hh-surface` | `#ffffff` | Giữ | — | Card/modal cần trắng thuần để tương phản với canvas ấm — đúng vai trò. |
| `--hh-primary` | `#244a57` | Giữ (dùng cho CTA/text), **cân nhắc thu hẹp phạm vi dùng làm nền đặc lớn** | không đổi giá trị, chỉ đổi *nơi dùng* | Bản thân màu ổn cho CTA (diện tích nhỏ, tương phản tốt với nền sáng). Nhưng bị dùng làm nền đặc ở nhiều diện tích lớn (dark band "Quyền lợi mỗi đơn hàng", overlay ảnh, MobileDrawer/AuthOverlay backdrop, StickyMobileCta) — cộng dồn lại tạo cảm giác trang "lạnh/nặng" hơn mức cần thiết cho một brand mỹ phẩm Địa Trung Hải nắng ấm. Đây là vấn đề *tần suất sử dụng*, không phải giá trị token sai. |
| `--hh-primary-dark` | `#193a45` | Giữ | — | Đúng vai trò hover/pressed, chỉ xuất hiện thoáng qua. |
| `--hh-primary-soft` | `#dce8e9` | Giữ | — | Đúng vai trò tint nhẹ cho trạng thái chọn — không lạm dụng. |
| `--hh-accent-blue` | `#5f8e91` | Giữ | — | Dùng hạn chế (gradient phụ, link nội dung), không lấn primary. |
| `--hh-accent` (gold) | `#c99a4a` | Giữ | — | Xuất hiện đúng vai trò hạn chế (badge/eyebrow/loyalty pill), không bị lạm dụng — không thấy gold phủ diện rộng ở bất kỳ đâu đã kiểm. |
| `--hh-accent-gold-soft` | `#f5e7c9` | Giữ | — | Đúng vai trò tint nhẹ cho badge/loyalty. |
| `--hh-ink` (text) | `#243338` | Giữ | — | Đọc tốt trên mọi nền sáng đã kiểm. |
| `--hh-muted-foreground` (secondary text) | `#667579` | Giữ | — | Đủ tối để đọc được, đủ nhạt để phân cấp — cân bằng hợp lý, không "quá nhạt" như lo ngại ban đầu. |
| `--hh-border` | `#e2e7e4` | Giữ | — | Đủ để phân tách card khỏi canvas mà không gắt. |
| `--hh-shadow-color` | `rgba(32,55,62,.08)` | Giữ | — | Shadow rất nhẹ, đúng chủ trương "không đậm". |
| *(không có token)* — 6 màu pastel `cardBg` trong `SCENT_ADVISOR_QUESTIONS` | hex rời rạc (`#e3ecee`, `#eaf2e9`, `#f5e9d9`, `#f3e3e2`, `#f4f0e6`, `#f8f1e8`) | **Điều chỉnh** | Rút còn 2–3 tông từ `--hh-surface-blue`/`--hh-surface-warm`/`--hh-surface-soft` đã có sẵn, luân phiên | 6 pastel khác hue cạnh nhau trên cùng 1 lưới tạo cảm giác "bảng màu ngẫu nhiên" (xem mục 5) thay vì một palette được tuyển chọn có chủ đích — đây là vấn đề hierarchy/consistency, không phải sở thích cá nhân. |

### 4.2 Trả lời trực tiếp các câu hỏi màu trong brief

- **Xanh teal lạnh/đậm?** Về giá trị: đúng là cool + tối (luminance ~25%) — hợp lý khi dùng làm text/CTA nhỏ trên nền sáng, nhưng **đậm hơn mức lý tưởng khi dùng làm nền đặc diện rộng**. Không đề xuất đổi giá trị primary (sẽ ảnh hưởng CTA contrast toàn site — rủi ro cao); đề xuất giảm số nơi dùng nó làm *nền đặc lớn*.
- **Gold xuất hiện quá nhiều?** Không — quan sát thực tế cho thấy gold dùng đúng mức, hạn chế ở badge/pill nhỏ.
- **Canvas đủ ấm?** Chưa hẳn — chênh lệch ấm quá nhỏ để cảm nhận rõ, có thể tăng nhẹ.
- **Section bị chia màu vụn?** Có phần — trang chủ có ~8 kiểu nền khác nhau trong một lượt cuộn (canvas → ảnh → canvas → cream/blue-split → cream/white-checker → ảnh tối → cream → navy-đặc → trắng). Từng cặp liền kề không xung đột, nhưng tổng số lần đổi nền khá nhiều — xem mục 5.
- **Card nổi khỏi canvas?** Có — `border-hh-border` + `bg-hh-surface`/`hh-shadow-sm` tạo phân tách rõ ràng ở mọi nơi đã kiểm.
- **CTA đủ nổi bật?** Có, ở cấp độ từng section riêng lẻ. Nhưng trên PDP mobile, có 3–4 CTA cùng mức nổi bật xuất hiện cùng lúc → giảm rõ ràng "đâu là hành động chính" (xem mục 5).
- **Text secondary quá nhạt?** Không — `#667579` đủ đậm để đọc thoải mái.
- **Overlay quá tối?** Không — `bg-hh-primary/30–35` là mức tint nhẹ, không che khuất nội dung phía sau quá mức.
- **Footer cảm giác premium?** Trung bình — sạch, chức năng, nhưng không có điểm nhấn nào phân biệt nó với một footer e-commerce mặc định (không serif, không dấu ấn thị giác riêng ngoài logo tròn "HH").
- **Badge quá nhiều màu?** Không quá — 4 hue có chủ đích (đen-navy/bán chạy, xanh lá/hữu cơ, gold/liên hệ giá, xám/tham khảo), mỗi màu gắn với đúng 1 ý nghĩa, không trùng lặp nhầm lẫn.

---

## 5. Template-feel findings

| # | Vấn đề | Route | Component | Mức ảnh hưởng | Cách tinh chỉnh |
|---|---|---|---|---|---|
| 1 | 4 icon outline cùng màu, cùng size, cách đều trong lưới 4 cột — lặp lại 3 lần (2 lần trang chủ + PDP trust badges) | `/`, mọi PDP | `BrandValues.tsx`, `PermanentBenefits.tsx` (band navy "Quyền lợi mỗi đơn hàng"), `TrustBadges.tsx` | Trung bình | Gộp 2 khối icon-grid trên trang chủ thành 1, hoặc đổi 1 trong 2 sang dạng khác (ví dụ hàng ngang inline thay vì lưới thẻ) để phá vỡ lặp lại |
| 2 | Heading serif `.hh-heading-section` xuất hiện 7 lần trên 1 trang, cùng size/weight | `/` | Nhiều file trong `src/components/hh/home/` | Cao | Xem mục 3.2(a)/(e) — hạ cấp 1–2 heading (đặc biệt `SeoTextBlock`) xuống `.hh-heading-card` |
| 3 | Carousel 4+ ô gradient bão hoà cao liền kề màu khác nhau (xanh lá, tím, gold, hồng…) | `/` | `home` section "Trải nghiệm mua sắm cùng Hoàng Hà" | Trung bình | Đây là placeholder do thiếu ảnh thật — khi có ảnh sản phẩm, vấn đề tự giảm; trong lúc chờ, có thể giảm số ô hiển thị cùng lúc hoặc dùng cùng 1 tông màu (chỉ đổi độ đậm/nhạt) thay vì 4 hue khác nhau |
| 4 | 6 card nền pastel khác hue liền kề nhau | `/tu-van-chon-san-pham` | `ScentAdvisorView.tsx` + data `SCENT_ADVISOR_QUESTIONS` | Cao | Xem bảng 4.1 — rút còn 2–3 tông từ token surface có sẵn |
| 5 | ~8 lần đổi nền nền tảng trong một lượt cuộn trang chủ | `/` | Toàn bộ homepage sections | Trung bình | Không cần giảm số section, chỉ cần *gộp* các section liền kề dùng chung 1 nền thay vì luân phiên liên tục — ví dụ 2 section cream liên tiếp không cần tách rời bằng khoảng trắng thuần ở giữa |
| 6 | 3–4 CTA cùng mức độ nổi bật xuất hiện cùng lúc trên PDP mobile (buy box "Gửi yêu cầu mua hàng" + "Thêm vào giỏ" + sticky bar "Tư vấn chọn mùi" + "Mua ngay") | Mọi PDP, mobile (500px) | `ProductBuyBox.tsx` + `StickyMobileCta.tsx` | Cao | `StickyMobileCta` hiện mount toàn site không loại trừ PDP (`src/components/hh/layout/StickyMobileCta.tsx` — không có điều kiện theo route). Cân nhắc ẩn sticky bar trên PDP vì buy box đã có CTA riêng, tránh 2 tầng "Mua ngay"-tương-tự chồng nhau |
| 7 | 2 banner thông báo xếp chồng phía trên header, chiếm nhiều chiều cao trên mobile trước khi tới nội dung | Mọi trang, mobile (500px) | `DemoBanner.tsx` + `PromoBar.tsx` | Nhẹ–Trung bình | Cân nhắc gộp 2 banner thành 1 dòng, hoặc cho banner demo tự ẩn sau khi cuộn |
| 8 | Bullet giả "•"/"-" trong một đoạn văn liền thay vì danh sách thật | PDP, bài viết | Data nguồn (`src/data/*.ts`) | Trung bình | Xem mục 3.2(d) |
| 9 | Nhiều card sản phẩm giống hệt nhau (cùng gradient, cùng 2 badge) do thiếu ảnh thật | `/san-pham`, trang chủ bestsellers | `ProductCard.tsx` (không phải lỗi component, do dữ liệu) | Cao (nhưng ngoài phạm vi sửa code/design) | Không phải việc của đợt tinh chỉnh này — cần ảnh sản phẩm thật, đã ghi nhận là hạn chế từ trước |
| 10 | Rounded corners: phần lớn dùng `rounded-sm`/`rounded-md` nhất quán, **không** phát hiện lạm dụng `rounded-full`/`rounded-2xl` tràn lan | Toàn site | — | Không đáng kể | Không cần tinh chỉnh — đây thực ra là điểm tốt, ghi nhận để không bị hiểu nhầm là vấn đề |
| 11 | Breadcrumb PDP wrap để lại dấu ">" mồ côi cuối dòng trên mobile | Mọi PDP, mobile (500px) | `ProductBreadcrumb.tsx` | Nhẹ | Ẩn separator cuối cùng hoặc rút gọn breadcrumb trên mobile (chỉ hiện "← Sản phẩm") |

---

## 6. Đề xuất Premium V2 (tối đa 12)

### A. Nên làm trước PR (tác động cao, rủi ro thấp, không redesign lớn)

**A1. Hạ cấp heading `SeoTextBlock` từ `.hh-heading-section` xuống `.hh-heading-card`, canh trái đoạn văn 2–3**
- Route/component: `/`, `src/components/hh/home/SeoTextBlock.tsx`
- Hiện trạng: heading to ngang các H2 "thật" khác dù nội dung là SEO filler; 3 đoạn văn canh giữa
- Thay đổi cụ thể: đổi class heading; thêm `text-left` (hoặc bỏ `text-center` ở section, giữ heading canh giữa riêng)
- Tác động: giảm 1/7 lần lặp serif-section, cải thiện scan văn bản
- Độ khó: rất thấp (đổi 1–2 class)
- Rủi ro: thấp — chỉ ảnh hưởng 1 component cô lập
- File: `src/components/hh/home/SeoTextBlock.tsx`

**A2. Đổi `year` trong `TimelineEntry` từ serif sang `.hh-label` (sans, eyebrow style)**
- Route/component: `/cau-chuyen-thuong-hieu`, `src/components/hh/brand-story/TimelineEntry.tsx`
- Hiện trạng: 2 dòng serif chồng nhau (year + heading), yếu hierarchy
- Thay đổi cụ thể: `<p className="hh-display text-2xl font-medium ...">` → `<p className="hh-label text-hh-primary">`
- Tác động: khôi phục tương phản heading chính/phụ ở cả 3 mốc timeline
- Độ khó: thấp
- Rủi ro: thấp — component dùng 1 chỗ duy nhất
- File: `src/components/hh/brand-story/TimelineEntry.tsx`

**A3. Giới hạn cột văn bản mô tả PDP xuống `max-w-2xl`/`max-w-3xl`**
- Route/component: mọi PDP, component mô tả sản phẩm
- Hiện trạng: dòng dài 90–100+ ký tự
- Thay đổi cụ thể: bọc block mô tả trong `max-w-2xl` (hoặc `max-w-3xl` nếu container cha đã hẹp)
- Tác động: cải thiện đọc rõ rệt cho nội dung dài nhất site
- Độ khó: thấp
- Rủi ro: thấp — chỉ ảnh hưởng layout văn bản, không ảnh hưởng token
- File: component chứa mô tả PDP (`ProductDescription.tsx` hoặc phần render trong `ProductAccordions`/khu vực "Sản phẩm này là gì?")

**A4. Giới hạn cột văn bản thân bài viết + trang nguyên liệu tương tự A3**
- Route/component: `/bai-viet/[slug]`, `/nguyen-lieu/[slug]`
- Hiện trạng: cùng vấn đề cột quá rộng
- Thay đổi cụ thể: `max-w-2xl` cho khối nội dung chính
- Tác động: đồng bộ cải thiện đọc cho toàn bộ nội dung dài trên site
- Độ khó: thấp
- Rủi ro: thấp
- File: `src/app/bai-viet/[slug]/page.tsx`, `src/app/nguyen-lieu/[slug]/page.tsx`

**A5. Rút 6 pastel `cardBg` của scent-advisor về 2–3 tông từ token surface có sẵn**
- Route/component: `/tu-van-chon-san-pham`, `src/data/site-content.ts` (`SCENT_ADVISOR_QUESTIONS`)
- Hiện trạng: 6 hex rời rạc, mỗi card 1 hue khác nhau
- Thay đổi cụ thể: map lại `cardBg` sang luân phiên `--hh-surface-warm` / `--hh-surface-blue` / `--hh-surface-soft` (giá trị đã tồn tại, không cần token mới)
- Tác động: giảm cảm giác "bảng màu ngẫu nhiên", tăng tính "được tuyển chọn"
- Độ khó: thấp (đổi giá trị trong 1 mảng data)
- Rủi ro: thấp — không đổi cấu trúc component, chỉ đổi giá trị màu nền
- File: `src/data/site-content.ts`

**A6. Ẩn `StickyMobileCta` trên route PDP**
- Route/component: mọi PDP, mobile
- Hiện trạng: 3–4 CTA cùng mức nổi bật cùng lúc trên 1 màn hình
- Thay đổi cụ thể: thêm điều kiện route (`usePathname` bắt đầu bằng `/san-pham/`) để không render sticky bar khi đã ở PDP có buy box riêng
- Tác động: giảm nhiễu CTA, tăng rõ ràng conversion đúng như tiêu chí "vẫn dễ mua hàng"
- Độ khó: thấp–trung bình (thêm 1 điều kiện, cần kiểm tra không phá layout `pb-20` ở `HHShell`)
- Rủi ro: trung bình thấp — cần xác nhận `HHShell`'s `pb-20` (khoảng chừa cho sticky bar) không để lại khoảng trắng thừa khi sticky bar ẩn trên PDP
- File: `src/components/hh/layout/StickyMobileCta.tsx`, `src/components/hh/HHShell.tsx`

### B. Nên làm sau CEO review (tác động trung bình, cần thêm QA)

**B1. Tăng nhẹ độ ấm của `--hh-canvas`**
- Hiện trạng: `#fcfaf6`, chênh ấm rất nhỏ (R−B = 6/255)
- Thay đổi cụ thể: thử `#faf7f1` hoặc tương đương, cần so sánh cạnh nhau với `--hh-surface` (trắng) để đảm bảo vẫn đủ tương phản canvas/card
- Tác động: tăng cảm giác "ấm hơn" đúng yêu cầu brief, nhưng ảnh hưởng **toàn site** (canvas dùng ở root `HHShell`) nên cần QA lại toàn bộ route như đợt color-system trước
- Độ khó: thấp về mặt code (1 giá trị token), nhưng QA lại tốn công ngang 1 đợt review nhỏ
- Rủi ro: trung bình — ảnh hưởng diện rộng, cần xem lại contrast card/canvas ở mọi route
- File: `src/app/globals.css`

**B2. Giảm tần suất dùng `--hh-primary` làm nền đặc diện rộng**
- Hiện trạng: dark band "Quyền lợi mỗi đơn hàng", overlay ảnh, backdrop overlay đều dùng primary/primary-dark làm nền lớn
- Thay đổi cụ thể: cân nhắc 1 trong các nền đặc lớn (ví dụ dark band lợi ích) chuyển sang `--hh-ink` hoặc giữ nguyên nhưng thêm ảnh/texture nhẹ để giảm cảm giác "mảng màu đặc"
- Tác động: giảm cảm giác lạnh/nặng tổng thể, nhưng cần cân nhắc từng nơi riêng vì mỗi chỗ có vai trò khác nhau (overlay cần tối để đọc chữ trắng, dark band có thể không cần)
- Độ khó: trung bình — cần rà từng component, không phải 1 thay đổi token duy nhất
- Rủi ro: trung bình — có thể ảnh hưởng contrast text trắng nếu đổi không cẩn thận
- File: nhiều file (`PermanentBenefits.tsx`/dark band, `AuthOverlay.tsx`, `MobileDrawer.tsx`, `ProductFilterDrawer.tsx`)

**B3. Gộp 2 banner thông báo trên đầu trang thành 1 dòng (hoặc cho tự ẩn khi cuộn)**
- Hiện trạng: `DemoBanner` + `PromoBar` xếp chồng, chiếm nhiều chiều cao trên mobile
- Thay đổi cụ thể: cần bàn với CEO vì `DemoBanner` mang thông điệp pháp lý ("dữ liệu demo") — không thể tự ý bỏ, cần quyết định giữ cả 2 nhưng rút gọn, hay đổi vị trí
- Tác động: cải thiện mobile polish, đưa hero lên gần đầu màn hình hơn
- Độ khó: trung bình — liên quan quyết định nội dung/pháp lý, không chỉ CSS
- Rủi ro: trung bình — cần đồng thuận về việc có được rút gọn nội dung demo-disclaimer hay không
- File: `src/components/hh/layout/DemoBanner.tsx`, `src/components/hh/layout/PromoBar.tsx`

**B4. Tách bullet giả "•"/"-" trong mô tả PDP/bài viết thành danh sách thật**
- Hiện trạng: nội dung dài dạng "- A: ... - B: ... - C: ..." nhét trong 1 đoạn
- Thay đổi cụ thể: parse lại dữ liệu mô tả thành mảng, render `<ul><li>`
- Tác động: cải thiện đáng kể "editorial quality" và khả năng scan
- Độ khó: trung bình–cao — cần sửa **dữ liệu nguồn** (`src/data/products.ts` hoặc tương đương) cho hàng chục sản phẩm/bài viết, không chỉ 1 component
- Rủi ro: trung bình — khối lượng thay đổi dữ liệu lớn, cần QA lại nhiều trang
- File: `src/data/*.ts` (nhiều file dữ liệu)

**B5. Sửa breadcrumb PDP mobile không để dấu ">" mồ côi**
- Hiện trạng: wrap để lại chevron cuối dòng lẻ loi
- Thay đổi cụ thể: ẩn breadcrumb chi tiết trên mobile, chỉ hiện "← Sản phẩm" hoặc rút gọn tên danh mục giữa
- Tác động: nhỏ nhưng dễ thấy khi CEO xem trên điện thoại
- Độ khó: thấp–trung bình
- Rủi ro: thấp
- File: `src/components/hh/product/ProductBreadcrumb.tsx`

### C. Không nên làm

- **Đổi/thêm font thứ ba** — không có lý do đủ mạnh; vấn đề hiện tại là cách dùng 2 font sẵn có, không phải thiếu lựa chọn font.
- **Thêm màu mới vào palette** — palette hiện tại (1 primary + 2 accent + 5 surface) đã đủ vai trò cho mọi nhu cầu quan sát được; thêm màu sẽ đi ngược hướng "ít cảm giác template hơn" mà brief yêu cầu.
- **Thêm gradient/decoration trang trí mới** — site đã có khá nhiều gradient trang trí (`ProductPlaceholderArt`, hero slide background); thêm nữa sẽ làm tăng cảm giác "được tạo tự động" thay vì giảm.
- **Đổi layout lớn trước PR** (ví dụ redesign lại toàn bộ trang chủ, đổi số cột, đổi grid system) — nằm ngoài phạm vi "tinh chỉnh", rủi ro cao, cần một đợt riêng có CEO buy-in trước.

---

## 7. Screenshot comparison plan (trước/sau)

Không tạo ảnh mockup — chỉ liệt kê viewport và vùng cần chụp khi áp dụng đề xuất mục 6, để so sánh trước/sau:

| # | Khu vực | Viewport | Vùng cụ thể |
|---|---|---|---|
| 1 | Homepage hero | 1253px & 500px | Từ đầu trang đến hết 2 slide hero (bao gồm 2 banner phía trên) |
| 2 | Bestseller section | 1253px | Toàn bộ lưới 4 sản phẩm + heading "Bán chạy" |
| 3 | Category/gradient carousel | 1253px | "Trải nghiệm mua sắm cùng Hoàng Hà" — toàn bộ dải carousel |
| 4 | PDP buy box | 1253px & 500px | Từ H1 đến hết nút "Thêm vào giỏ" + delivery box, **và trên mobile bao gồm cả sticky CTA bar để thấy chồng lấn CTA trước/sau A6** |
| 5 | Brand story timeline | 1253px | 1 `TimelineEntry` đầy đủ (ảnh + card text) trước/sau A2 |
| 6 | Article (bài viết) | 1253px | Từ H1 đến hết đoạn văn đầu, để thấy độ rộng cột trước/sau A4 |
| 7 | Mobile header/menu | 500px | Header + hamburger mở (`MobileDrawer`) |
| 8 | Mobile PDP | 500px | Từ H1 đến hết vùng CTA (buy box + sticky bar) — trọng tâm A6 |
| 9 | Search overlay | 1253px | Overlay mở + kết quả gợi ý |
| 10 | Footer | 1253px & 834px | Toàn bộ footer, chú ý layout 2 cột ở tablet |
| 11 | Scent advisor grid | 1253px | Toàn bộ lưới 6 card, trọng tâm A5 (màu nền) |
| 12 | SeoTextBlock | 1253px | Toàn bộ block, trọng tâm A1 (heading size + text-align) |

---

## 8. Token đề xuất (nếu làm B1)

Chỉ 1 token cần cân nhắc đổi giá trị, không cần token mới:

| Token | Giá trị hiện tại | Giá trị đề xuất (cần QA trước khi chốt) |
|---|---|---|
| `--hh-canvas` | `#fcfaf6` | `#faf7f1` (ví dụ, cần thử nghiệm trực quan trước) |

Mọi đề xuất còn lại trong mục 6 là thay đổi **class/markup/data**, không phải token màu/font.

---

## 9. Việc nên giữ nguyên

- Toàn bộ type scale 8 cấp trong `globals.css` — hệ thống đúng, chỉ cần dùng có kiểm soát hơn ở vài nơi.
- Hero, term-block, quote — 3 điểm editorial mạnh nhất, không chạm vào.
- PDP H1 sans, mega menu sans, overlay sans — đúng vai trò, không chuyển sang serif.
- 4 hue badge (bán chạy/hữu cơ/liên hệ giá/tham khảo) — phân vai rõ, không hợp nhất hay đổi màu.
- `--hh-accent` (gold) và cách dùng hạn chế của nó — đúng mức, không mở rộng thêm.
- Overlay pattern (`bg-hh-primary/30` + `bg-hh-surface` panel) — nhất quán toàn site, giữ nguyên.
- Border-radius nhỏ (`rounded-sm`/`rounded-md`) — không lạm dụng bo tròn, giữ nguyên.

## 10. Việc không nên làm

Xem mục 6C.

---

## 11. Kết luận

Website ở trạng thái **đủ tốt để đi vào PR như hiện tại** — không có lỗi màu/font nghiêm trọng, không tràn ngang, không mất contrast ở các viewport đã kiểm (1253/1024/834/500px). Các đề xuất trong mục 6A (6 đề xuất) đều là thay đổi nhỏ, cô lập, rủi ro thấp và có thể làm trước PR nếu muốn nâng điểm "premium perception" thêm một bậc mà không trễ deadline — tổng khối lượng ước tính dưới nửa ngày làm việc cho cả 6 đề xuất A.

**Có nên sửa thêm trước PR hay không:** Khuyến nghị làm **A1, A2, A5** (3 đề xuất đổi class/data thuần, không đụng layout, rủi ro gần như bằng 0, tác động trực tiếp đến 2 vấn đề bị nêu rõ nhất trong brief — "heading serif dày đặc" và "pastel section liên tục"). A3/A4/A6 có thể làm trước PR nếu còn thời gian nhưng nên coi là "nice to have" chứ không bắt buộc — chúng đúng nhưng không phải thứ CEO sẽ nhìn thấy đầu tiên. B1–B5 nên để sau CEO review vì cần thêm QA diện rộng (B1, B4) hoặc cần quyết định ngoài phạm vi thiết kế (B3, pháp lý demo-disclaimer).

Hạn chế lớn nhất ảnh hưởng "luxury feeling"/"product presentation" (điểm 4-5/10) là **thiếu ảnh sản phẩm thật**, không phải font hay màu — không token/class nào trong report này giải quyết được vấn đề đó, cần ghi nhận riêng với CEO như một hạn chế dữ liệu, không phải hạn chế thiết kế.
