# HH × LPM — Caudalie Parity Phase 8C: P2 Implementation Report

**Ngày:** 2026-07-21 · Branch `hh-lpm-caudalie-ui-parity` · Baseline: **P1.1 Closure score 7.2/10** (`HH_LPM_CAUDALIE_PARITY_P1_REPORT.md`).
**Trạng thái:** Chưa commit. Chưa push. Dừng lại để review.

**Nguyên tắc đã tuân thủ:** không đổi font family, không thay toàn bộ palette, không sửa `/reference/*`, không tạo dữ liệu/ảnh/review/video/giá giả, không copy asset/logo/font/copy/màu độc quyền Caudalie.

---

## P2.0 — Baseline và scope

`git status --short` tại đầu phiên cho thấy working tree **không sạch** dù nhánh đã ở baseline "P1.1 Closure" — 22 file thuộc phạm vi P0–P1.1 (đã duyệt qua các báo cáo trước) vẫn ở trạng thái uncommitted, cộng thêm các file tài liệu/screenshot mới chưa track. Đã hỏi và được xác nhận: coi toàn bộ uncommitted diff hiện có là baseline P1.1 Closure thật (không tự ý commit hộ), rồi mới bắt đầu P2 trên nền đó.

**Phát hiện quy trình cần ghi nhận trung thực:** 4 file P2.1 đầu tiên (`src/app/page.tsx`, `BrandValues.tsx`, `SocialFeed.tsx`, `site-content.ts`) đã bị sửa **trước khi** chụp đủ baseline P2 — vi phạm đúng yêu cầu "không sửa trước khi có baseline". Đã tự phát hiện, `git stash push` đúng 4 file đó, rebuild lại đúng trạng thái P1.1 gốc, chụp lại toàn bộ baseline P2 cần thiết, rồi `git stash pop` để tiếp tục — không có ảnh "before" nào trong báo cáo này được chụp sau khi code đã đổi.

`npm run check` tại baseline: **pass** (lint 0 lỗi, typecheck 0 lỗi, build 362 trang thành công).

Đã đọc: `HH_LPM_PREMIUM_UI_ASSESSMENT.md`, `HH_LPM_CAUDALIE_UI_PARITY_MATRIX.md`, `HH_LPM_CAUDALIE_PARITY_P0_REPORT.md`, `HH_LPM_CAUDALIE_PARITY_P1_REPORT.md` (bao gồm P1.1 Closure), `HH_LPM_UI_COMPONENT_SCORECARD.md`, `HH_LPM_UI_UX_UPGRADE_ROADMAP.md`.

### Breakpoint thực đo trong toàn bộ P2

**1440px và 500px** — cả hai xác nhận chính xác qua `window.innerWidth` nhiều lần trong phiên. **1100/1024/834/390px không đạt được** trong môi trường automation này — cùng vấn đề đã ghi nhận xuyên suốt từ Phase 4 tới P1.1 (môi trường resize không ổn định, cần "wait" 1 nhịp sau `resize_window` mới phản ánh đúng kích thước, và một số resize không áp dụng nếu tái sử dụng tab cũ — đã làm việc quanh bằng cách luôn tạo tab mới trước khi resize). Không tuyên bố đã test các mốc chưa đạt.

Baseline screenshots: `docs/production/screenshots/caudalie-parity/before-p2/{1440,500}/`.
After screenshots: `docs/production/screenshots/caudalie-parity/after-p2/{1440,500}/`.

---

## P2.1 — Homepage Information Architecture

### Audit thứ tự section (trước)

```
Hero → BestSellers → ExperienceCards → FeaturedCollection → AdvisorBanner
  → BrandValues → FullBleedBrandStory → SocialFeed → SeoTextBlock → PermanentBenefits
```

**Vấn đề cụ thể tìm thấy, đo được bằng cách đọc code + data, không suy đoán:**

1. **`ExperienceCards`** (5 thẻ: nhập khẩu / tư vấn mùi / tích điểm / ưu đãi thành viên mới / giao hàng) trùng lặp gần như hoàn toàn nội dung đã có ở nơi khác trên cùng trang: "tư vấn mùi hương" lặp lại Hero slide 2 **và** `AdvisorBanner` (tổng 3 lần cùng 1 CTA "Tư vấn ngay"/"Bắt đầu tư vấn" trên 1 trang), "tích điểm"/"giao hàng" lặp `PermanentBenefits`, "ưu đãi thành viên mới" trùng thẳng 1 offer trong `/uu-dai`. Toàn bộ 5 thẻ dùng `ProductPlaceholderArt` (không ảnh thật).
2. **`BrandValues`** và **`FullBleedBrandStory`** đứng cạnh nhau, cả hai đều có CTA trỏ **cùng route** `/cau-chuyen-thuong-hieu` ("Khám phá" và "Khám phá câu chuyện") — 2 section liên tiếp cùng đích đến.
3. **`SocialFeed`** hiển thị ảnh bài viết thật (đã có sẵn) nhưng đóng khung là "Cộng đồng Hoàng Hà" với CTA **bị vô hiệu hoá** ("Theo dõi cộng đồng — đang cập nhật", `cursor-default`, không phải link) — một CTA chết nằm giữa trang chủ.
4. **7/10 section** dùng chung style `.hh-heading-section` bất kể vai trò (commerce/editorial/brand/utility) — đúng vấn đề đã flag từ `HH_LPM_PRE_PR_PREMIUM_VISUAL_REVIEW.md` §5.

### Thay đổi

**File:** `src/app/page.tsx`, `src/components/hh/home/BrandValues.tsx`, `src/components/hh/home/SocialFeed.tsx`, `src/data/site-content.ts`.

- **Bỏ `ExperienceCards` khỏi render** (giữ nguyên file, không xoá — cùng tiền lệ với `CategoryShowcase.tsx`/`ComboOffers.tsx` đã có từ trước theo đúng comment gốc trong `page.tsx`). Không xoá dữ liệu.
- **Thứ tự mới:** `Hero → BestSellers → FeaturedCollection → PermanentBenefits → BrandValues → AdvisorBanner → SocialFeed → FullBleedBrandStory → SeoTextBlock`.
  - Lý do cụ thể (không chỉ "cho đẹp"): tránh 2 dải full-bleed tối đứng cạnh nhau. Thứ tự cũ nếu giữ nguyên PermanentBenefits+AdvisorBanner+FullBleedBrandStory sát nhau sẽ tạo 2-3 dải nền tối liên tiếp (cả 2 đều dùng gradient `--hh-primary` #1c4548 làm màu chủ đạo). Thứ tự mới xen kẽ sáng-tối: trắng(BestSellers) → sáng kem/xanh(FeaturedCollection) → **tối**(PermanentBenefits) → sáng(BrandValues) → **tối**(AdvisorBanner) → sáng(SocialFeed/Articles) → **tối**(FullBleedBrandStory) → sáng(SeoTextBlock). Không có 2 dải tối liên tiếp ở bất kỳ điểm nào — verify bằng screenshot thật (xem `after-p2/1440/`).
  - Không bắt buộc theo đúng thứ tự gợi ý trong brief (Hero→Bestsellers→Benefits→Advisor→Brand story→Article→Membership→SEO) — dữ liệu thực (màu nền từng section) cho thấy hướng xen kẽ sáng/tối tốt hơn cho nhịp thị giác, đã ghi lý do ngay trong comment `page.tsx`.
  - Không thêm section "Membership/newsletter" riêng trên trang chủ — đã có sẵn newsletter panel trong Footer (P0.4), thêm 1 băng nữa sẽ trùng lặp đúng vấn đề P2 đang cố tránh.
- **`BrandValues`**: bỏ CTA "Khám phá" trùng đích với `FullBleedBrandStory` ngay sau đó — heading giờ đứng một mình, căn giữa.
- **`SocialFeed` → "Bài viết nổi bật từ Hoàng Hà"**: đổi từ khung "cộng đồng" giả (CTA chết) sang rail bài viết thật — mỗi thẻ giờ có ảnh + eyebrow (chủ đề) + tiêu đề, link thẳng `/bai-viet/[slug]`; CTA đầu mục đổi thành "Xem tất cả bài viết" link thật tới `/bai-viet`. Không tạo dữ liệu — dùng đúng `HH_ARTICLES` đã có, chỉ đổi cách trình bày từ "social feed giả" sang "editorial rail thật".

**Kết quả đo được (không suy đoán):**

| | Trước | Sau |
|---|---|---|
| Số CTA trong phần thân trang chủ (không tính Hero/Header/Footer) | ~9 (5 ExperienceCards + FeaturedCollection + AdvisorBanner + BrandValues + FullBleedBrandStory), trong đó 3 CTA trùng đích "tư vấn mùi", 2 CTA trùng đích "câu chuyện thương hiệu" | **4** (FeaturedCollection, AdvisorBanner, [Articles CTA mới], FullBleedBrandStory) — **0 đích trùng lặp** |
| Section dùng `ProductPlaceholderArt` không ảnh thật | ExperienceCards (5 thẻ) | 0 (đã bỏ khỏi render) |
| CTA chết (`cursor-default`, không phải link) | 1 (SocialFeed "Theo dõi cộng đồng") | 0 |
| Dải nền tối (full-bleed) liên tiếp | Có thể tới 2-3 nếu sắp cạnh nhau | 0 — xen kẽ sáng/tối xác nhận bằng ảnh chụp |

Screenshot: `before-p2/1440/01`–`08` so với `after-p2/1440/01`–`06`.

---

## P2.2 — Hero premium composition

**Giữ nguyên đúng yêu cầu:** 1 H1 duy nhất (mobile/tablet tree), nội dung HH×LPM không đổi, CTA hierarchy transactional/editorial (V4) không đổi, ảnh thật hiện có (thương hiệu + nguyên liệu hoa cam) không đổi, không thêm gradient mới.

**Đo thật tại 1440px trước khi sửa:** body text slide 1 ("Hoàng Hà phân phối chính hãng...") bọc trong `max-w-sm` (384px) → **4 dòng**, vượt mục tiêu "tối đa 2-3 dòng desktop". Slide 2 (ngắn hơn) đã đạt 2 dòng, không cần sửa.

**Sửa:** `src/components/hh/home/HeroCampaign.tsx` — nới `max-w-sm` → `max-w-md` (448px) cho đoạn body ở cả 2 slide (không đổi câu chữ). Đo lại sau khi build: slide 1 xuống còn **3 dòng** — verify bằng screenshot thật (`after-p2/1440/01-hero.jpg`), không phải tính toán lý thuyết.

**Phát hiện + sửa thêm (P2.8 trùng phạm vi hero):** cây mobile/tablet của Hero luôn set `priority` trên **cả 2 slide** dù chỉ 1 slide hiển thị lúc tải trang (`opacity-0`/`pointer-events-none` cho slide còn lại) — nghĩa là ảnh của slide chưa xem cũng được preload ưu tiên cao, lãng phí băng thông LCP-critical. Đã thêm prop `priority` truyền theo `index === activeIndex`: chỉ slide đang hiển thị lúc mount mới `priority`, slide còn lại tải bình thường (chỉ khi người dùng bấm dot chuyển slide). Cây desktop (2 slide hiện song song thật) giữ `priority` cho cả hai — đúng vì cả hai đều là LCP candidate thật.

**Không đổi:** heading (`hh-display`, 3 dòng ở max-w-md, không tràn), semantic H1/H2 desktop trade-off (đã ghi nhận từ trước là quyết định có chủ đích, ngoài phạm vi "chỉ sửa layout" của P2.2), ảnh/crop hiện có (không đủ dữ liệu ảnh mới để cải thiện crop — ghi nhận giới hạn, không tạo ảnh giả).

---

## P2.3 — Homepage visual rhythm

Kết quả trực tiếp từ P2.1 (thứ tự) + P2.2 (hero). Kiểm tra lại theo đúng 6 quy tắc đã nêu:

| Quy tắc | Trước | Sau |
|---|---|---|
| Không quá 3 section liên tiếp H2 serif căn giữa | Không vi phạm rõ (phần lớn heading trước đó căn trái, chỉ `FullBleedBrandStory`/`SeoTextBlock` căn giữa, không liên tiếp) | Không vi phạm — không đổi thêm |
| Không quá 2 section pastel liên tiếp | `FeaturedCollection` (kem+xanh) rồi `BrandValues` (kem/kem-ấm xen kẽ nội bộ) — 2 pastel sát nhau ở 1 điểm | Vẫn 2 tối đa tại bất kỳ điểm nào (đã tách bởi PermanentBenefits ở giữa) |
| Không dùng card khi plain layout đủ | Không đổi | Không đổi |
| Không dùng shadow thường trực | Không đổi (đã audit trước, không có shadow thường trực ngoài hover) | Không đổi |
| Text editorial không rộng quá 62–66ch | Article/Ingredient detail đã dùng `max-w-[65ch]` từ trước; **Brand-content detail (`/noi-dung-thuong-hieu/[slug]`) trước đó KHÔNG có giới hạn ký tự** | Đã thêm `max-w-[65ch]` cho brand-content detail (xem P2.6) |
| Product section giữ container commerce hiện tại | Không đổi | Không đổi (`max-w-[1280px]` toàn site, không đụng trong P2 — rủi ro lan rộng, ngoài phạm vi đã quyết ở P0.6/P1.6) |

---

## P2.4 — Offers page

**Audit trước khi sửa:** `OfferCard.tsx` xác định biến thể CTA (transactional/editorial) bằng cách so khớp chuỗi `cta` với `Set(["Mua ngay", "Đặt hàng"])` — đúng vấn đề đã nêu ("suy luận CTA type từ text").

**Sửa:** thêm field semantic `ctaVariant?: "transactional" | "editorial"` vào interface `HHOffer` (`src/data/site-content.ts`), gán tường minh cho cả 6 offer hiện có (4 transactional, 2 editorial — khớp đúng phân loại cũ, không đổi hành vi hiển thị). `OfferCard.tsx` giờ ưu tiên đọc `offer.ctaVariant`, chỉ fallback về so khớp text cũ nếu field bị bỏ trống (backward compatible, không phá vỡ caller nào khác).

**Không đổi:** hero/title, thứ tự card, accordion "Điều kiện áp dụng", `GiftDiscoveryTiles` (đã audit riêng — `href: "#"` render đúng thành div disabled + "(Đang cập nhật)", không phải dead `<a>`, không cần sửa).

**QA thật:** verify lại `/uu-dai` sau build — cả 4 offer "Mua ngay"/"Đặt hàng" vẫn hiện teal transactional, 2 offer "Tìm hiểu thêm"/"Đăng ký" vẫn hiện champagne editorial — **không regression**, chỉ đổi cơ chế quyết định phía dưới (screenshot `after-p2/1440/07-offers-hero.jpg`).

**Giới hạn còn lại (không giả vờ đã giải quyết):** mọi CTA "Mua ngay" trên Offers vẫn trỏ generic `/san-pham` (không trỏ đúng sản phẩm/collection của từng offer) — đây là giới hạn kiến trúc dữ liệu đã biết từ trước, không sửa trong P2 vì cần ánh xạ offer→category/collection thật, ngoài phạm vi field `ctaVariant`.

---

## P2.5 — Scent Advisor

**Audit, không sửa code** (kết luận: đã đạt phần lớn yêu cầu từ trước, không cần thay đổi cấu trúc):

| Yêu cầu | Hiện trạng |
|---|---|
| Giữ logic matching, query param, 6 nhóm mùi | ✅ Không đổi — 6 câu hỏi, mỗi câu `?scent=` filter đúng `/san-pham` |
| Icon riêng mỗi nhóm | ✅ 6 icon Lucide riêng (Moon/Sun/Flame/Heart/Leaf/Droplet), keyed theo `id` không theo index |
| 3 surface token chuẩn hoá | ✅ `bg-hh-surface-blue/-warm/-soft` tái sử dụng, không hex riêng mỗi card |
| Selected/focus state | ✅ `hover:-translate-y-1`, border đổi màu, shadow, `focus-visible:ring-2` — đã đủ, card là link điều hướng thẳng (không có bước "chọn" trung gian nên không cần "selected" state riêng) |
| CTA sau khi chọn | ✅ Trang `/san-pham?scent=X` đổi heading thành "Mùi hương X" — xác nhận qua code `san-pham/page.tsx` (đã verify từ P1.1) |
| Không biến thành quiz dài | ✅ Giữ nguyên — không thêm bước nào |
| Card proportions | Grid CSS mặc định `align-items: stretch` khiến các card cùng hàng tự cao bằng nhau — xác nhận bằng ảnh chụp (`after-p2/1440/09-advisor.jpg`), không cần ép `min-h` thủ công |

**Phát hiện phụ (không sửa, chỉ ghi nhận):** `ScentAdvisorIntro.tsx` là file **không dùng** (dead code) — `ScentAdvisorView.tsx` tự render heading/intro riêng thay vì import component này. Không xoá trong P2 (ngoài phạm vi, rủi ro thấp nhưng không phải yêu cầu của P2.5).

Kết luận: **không có thay đổi code cho P2.5** — audit xác nhận đã đạt chuẩn, tránh "sửa máy móc" khi không có vấn đề thật.

---

## P2.6 — Editorial system

**Audit cấu trúc card theo 4 loại yêu cầu:**

| Loại | Component/route | Có CTA button lớn? | Ảnh | Excerpt |
|---|---|---|---|---|
| Product card | `ProductCard.tsx` | Có ("Thêm vào giỏ") | Ảnh sản phẩm | Không (giá/badge) |
| Article card | `/bai-viet` inline | **Không** | 4:3 | 2 dòng (`line-clamp-2`) + eyebrow chủ đề |
| Ingredient card | `/nguyen-lieu` inline | **Không** | 1:1 | 1 dòng headline |
| Brand content card | `/noi-dung-thuong-hieu` inline | **Không** | 4:3 | 2 dòng intro |

**Kết luận:** 3 loại card editorial **đã** phân biệt đúng với Product card (không CTA button, ưu tiên ảnh+category+title+excerpt) từ trước — không cần xây component mới. Việc cần sửa là ở **nội dung**, không phải cấu trúc card.

**Bug thật tìm thấy và sửa:** trang chi tiết bài viết (`/bai-viet/[slug]`) đã có `ArticleBody` (từ đợt V3/P0) parse đúng dòng "• " thành `<ul><li>` thật thay vì hiện "•" thô trong text. Nhưng trang **brand-content detail** (`/noi-dung-thuong-hieu/[slug]`) vẫn render `page.sections` bằng `whitespace-pre-line` thô — kiểm tra dữ liệu thật: **9/15 trang** `content-pages-derived.json` có text bắt đầu bằng "• " (ví dụ nội dung "Nos Engagements" — cam kết môi trường), tất cả đều hiện bullet giả dạng text thô trước khi sửa.

**Sửa:**
- Tách logic parse bullet từ `ArticleBody` (trong `bai-viet/[slug]/page.tsx`) thành component dùng chung `src/components/hh/content/ContentBody.tsx`.
- `bai-viet/[slug]/page.tsx`: dùng `ContentBody` thay `ArticleBody` cũ (behavior y hệt, chỉ đổi chỗ định nghĩa).
- `noi-dung-thuong-hieu/[slug]/page.tsx`: đổi `<div whitespace-pre-line>` → `<ContentBody>`, đồng thời thêm `max-w-[65ch]` (trước đó không có giới hạn ký tự, khác 2 trang editorial còn lại).

**QA thật:** mở `/noi-dung-thuong-hieu/le-petit-marseillais-dang-chung-tay-vi-hanh-tinh-cua-chung-ta` sau build — xác nhận bằng ảnh chụp thật (`after-p2/1440/08-brandcontent-detail-real-bullets.jpg`): dòng "Một cam kết dựa trên 3 trụ cột:" và "1. Sản phẩm có trách nhiệm hơn:" hiện đúng dạng đoạn văn, danh sách "Nguyên liệu bền vững...", "70%: chiết xuất..." hiện đúng dạng `<ul><li>` thật — **không còn ký tự "•" thô** trong text.

**Không đổi:** heading order (h1→h2 đã đúng ở ingredient detail), `ContentCard`/`ContentCardCarousel` (dùng cho related-content — đã có badge phân loại rõ, không giả làm product card).

---

## P2.7 — Brand story

**Audit (không sửa code):**

| Hạng mục | Hiện trạng |
|---|---|
| Hero | Gradient placeholder (`aspect-[2734/880]`), không có ảnh thật — giới hạn dữ liệu đã biết từ trước, không tạo ảnh giả |
| Timeline rhythm | `flex flex-col gap-6 md:gap-8`, xen kẽ trái/phải đúng pattern reference, 3 milestone thật + term-callout + quote-block chen giữa |
| Year label / title hierarchy | ✅ Giữ nguyên đúng yêu cầu — year là eyebrow sans (`hh-label`), title là serif chính (`hh-heading-card-serif`) |
| Ending | Milestone cuối cùng có CTA "Khám phá sản phẩm" → `/san-pham` — đóng vai trò kết thúc câu chuyện bằng hành động, không phải chỉ trôi vào footnote im lặng |
| Footnotes | 3 dòng disclaimer nhỏ, đúng vai trò "nguồn tham khảo", không lẫn với nội dung chính |
| Mobile stacking | Không re-test trực tiếp trong P2 (không đổi code) — đã verify ở các đợt trước, không có thay đổi nào ảnh hưởng |

**Kết luận:** không tìm thấy vấn đề đủ cụ thể để sửa mà không rủi ro phá vỡ cấu trúc đã ổn định — **không có thay đổi code cho P2.7**. Đây là hạng mục duy nhất trong P2 mà điểm số **không đổi** so với P1.1 (vẫn 6/10) — ghi nhận trung thực trong bảng điểm cuối, không "tự chấm cao hơn" vì đã "audit".

---

## P2.8 — Performance readiness

Audit thực tế qua code + network capture thật, không chỉ cảm nhận.

### Phát hiện 1: 4 overlay toàn cục luôn nằm trong bundle ban đầu

`HHShell.tsx` (bọc **mọi** trang) import tĩnh `CartDrawer`, `SearchOverlay`, `AuthOverlay`, `MobileDrawer` — cả 4 luôn mount (chỉ ẩn bằng CSS `-translate-y-full`/`pointer-events-none`), nghĩa là code của chúng nằm trong bundle JS ban đầu của **mọi** route dù phần lớn lượt xem trang không bao giờ mở overlay nào.

Đo dữ liệu cụ thể `SearchOverlay` kéo theo qua `searchSite()`:

| File dataset | Kích thước |
|---|---|
| `media-library-derived.json` | **656KB** |
| `brand-pages.json` | 644KB |
| `articles.json` | 492KB |
| `articles-derived.json` | 380KB |
| `cards-derived.json` + `cards.json` | 140KB + 132KB |
| `ingredients.json` + `-derived` | 92KB + 84KB |
| `content-duplicates-derived.json` | 60KB |
| `content-pages-derived.json` | 44KB |

Toàn bộ 7 dataset này (`HH_PRODUCTS`, `HH_BRAND_LIBRARY`, `HH_INGREDIENTS`, `HH_ARTICLES`, `HH_CONTENT_PAGES`, `HH_CARDS`, `HH_MEDIA_LIBRARY`) đi vào bundle client của mọi route qua chuỗi import tĩnh `HHShell → SearchOverlay → search.ts`.

**Sửa:** `HHShell.tsx` — chuyển cả 4 overlay sang `next/dynamic(..., { ssr: false })`, tách mỗi overlay thành chunk riêng tải sau khi hydrate thay vì nằm trong bundle chính. Không đổi hành vi mở/đóng (vẫn qua `SiteUIContext`, vẫn cùng vị trí mount).

**QA thật sau khi đổi (không chỉ đọc code):** mở Search từ trang chủ → gõ "sữa tắm" → 30 kết quả hiện đúng, "Kết quả khác (24)" hoạt động; mở Cart → sản phẩm/subtotal hiện đúng; console 0 lỗi cả hai lần. **Không regression.**

### Phát hiện 2: Hero preload ảnh dư thừa (đã sửa ở P2.2, xem trên)

### Phát hiện 3: `<Image fill>` thiếu `sizes`

Quét toàn bộ `<Image` trong `src/components/hh` — tìm thấy 2/4 chỗ trong `ProductGallery.tsx` thiếu `sizes`: ảnh poster video ở main viewport (dùng chung khung với ảnh chính có `sizes` sẵn) và ảnh thumbnail 64px trong rail. Đã thêm `sizes="(min-width: 1024px) 50vw, 100vw"` và `sizes="64px"` tương ứng.

### Network trước/sau (đo thật qua `read_network_requests`, không ước lượng)

| | Trang chủ, tải lần đầu |
|---|---|
| Tổng request | 51 (trừ 4 request `chrome-extension://` là noise của công cụ automation, không thuộc app) |
| Lỗi mạng | **0** — toàn bộ `statusCode: 200` |
| Ảnh tải ở viewport ban đầu | 2 (`_next/image` cho 2 ảnh Hero — brand + ingredient) |
| Font | 18 file `.woff2` (Be Vietnam Pro + Cormorant Garamond cho HH, Caudalie cho `/reference/*` — cả 2 bộ font cùng nằm trong `layout.tsx` gốc, không đổi trong P2) |

**Không đo được / không tuyên bố:** Lighthouse, Core Web Vitals (LCP/CLS/INP số thật) — không có công cụ Lighthouse trong môi trường này ở bất kỳ đợt nào tính đến nay, kể cả đợt này. Không bịa điểm.

### Không làm

- Không đổi kiến trúc dataset lớn hơn phạm vi "dynamic import overlay" (ví dụ tách nhỏ `search.ts` theo dataset) — rủi ro cao hơn mức phù hợp cho 1 đợt P2, chưa có đo lường chứng minh cần thiết.
- Không thêm bundle-analyzer/CI budget — ngoài phạm vi "audit + fix rủi ro thấp" của P2.8.

---

## P2.9 — SEO release readiness

**Trạng thái trước:** `public/robots.txt` tĩnh luôn `Disallow: /`; `layout.tsx` hardcode `robots: {index:false, follow:false, nocache:true}` cho mọi route — không có cơ chế theo environment.

**Xây dựng:**

- **`src/lib/seo.ts`** (mới) — đọc `NEXT_PUBLIC_SITE_ENV` (mặc định `"staging"` nếu không set hoặc khác `"production"`). Export `DEFAULT_ROBOTS` (staging: noindex như cũ; production: `{index:true, follow:true}`) và `ALWAYS_NOINDEX_ROBOTS` (dùng cho route luôn phải noindex bất kể env).
- **`src/app/layout.tsx`** — `robots: DEFAULT_ROBOTS` thay vì hardcode.
- **5 route luôn noindex dù `NEXT_PUBLIC_SITE_ENV=production`** (vì `metadata.robots` ở page/layout con luôn REPLACE hoàn toàn giá trị của ancestor trong Next.js, không merge): `src/app/reference/layout.tsx`, `src/app/tai-khoan/page.tsx`, `src/app/thanh-toan/page.tsx`, `src/app/thu-vien-hinh-anh/page.tsx`, `src/app/thu-vien-noi-dung/page.tsx` — mỗi file đặt `robots: ALWAYS_NOINDEX_ROBOTS` tường minh.
- **`src/app/robots.ts`** (mới, thay `public/robots.txt` đã xoá) — sinh `robots.txt` động: staging → `Disallow: /` như cũ; production → `Allow: /` + `Disallow` 5 route trên, kèm dòng `Sitemap:` **chỉ khi** `NEXT_PUBLIC_SITE_URL` đã cấu hình.
- **`src/app/sitemap.ts`** (mới) — chỉ sinh URL khi **cả hai** `NEXT_PUBLIC_SITE_ENV=production` **và** `NEXT_PUBLIC_SITE_URL` đã set; nếu không, trả về mảng rỗng (staging hiện tại → sitemap rỗng, đúng ý "không dùng URL production khi env chưa cấu hình"). Liệt kê đầy đủ route công khai (12 route tĩnh + sản phẩm + bài viết + nguyên liệu + thư viện sản phẩm hãng + nội dung thương hiệu không trùng route riêng), loại trừ đúng 5 route always-noindex.
- **`.env.example`** — thêm tài liệu `NEXT_PUBLIC_SITE_ENV`/`NEXT_PUBLIC_SITE_URL` với comment giải thích rõ tác động.

**QA thật — build kép để xác nhận cơ chế hoạt động đúng (không chỉ đọc code):**

| | Staging (mặc định, trạng thái ship trong branch này) | Production (build thử nghiệm, **không** ship) |
|---|---|---|
| `robots.txt` | `User-Agent: *` / `Disallow: /` | `Allow: /` + `Disallow` 5 route + `Sitemap: https://.../sitemap.xml` |
| `/` robots meta | `noindex, nofollow, nocache` | `index, follow` |
| `/tai-khoan` robots meta | `noindex, nofollow, nocache` | **`noindex, nofollow, nocache`** (không đổi) |
| `/reference/category` robots meta | `noindex, nofollow, nocache` | **`noindex, nofollow, nocache`** (không đổi) |
| `sitemap.xml` | rỗng (`<urlset></urlset>`) | 344 URL, 0 URL nào chứa `/reference`, `/tai-khoan`, `/thanh-toan`, `/thu-vien-hinh-anh`, `/thu-vien-noi-dung` |

Sau khi xác nhận cả 2 chiều hoạt động đúng, đã **rebuild lại về staging** (xoá `.next`, build không set `NEXT_PUBLIC_SITE_ENV`) — verify lại `robots.txt`/robots meta đã về đúng trạng thái staging trước khi tiếp tục — **không ship production indexing trong branch này**, đúng yêu cầu.

---

## P2.10 — Final consistency pass

Quét toàn bộ production components (không quét `/reference/*`):

| Hạng mục | Kết quả |
|---|---|
| `href="#"` | 0 kết quả trong `src/components/hh` + `src/app` (ngoài `/reference`) |
| Rating giả | 0 — đã dọn sạch từ P1.1 (`ProductCard` không còn dòng rating placeholder, chỉ còn 1 chỗ thật ở PDP "hãy là người đầu tiên") |
| `href="#"` trong data (`GiftDiscoveryTiles`) | Render đúng thành `<div>` disabled + "(Đang cập nhật)", không phải `<a>` chết — đã đúng từ trước, xác nhận lại |
| Bullet giả (`whitespace-pre-line` chứa "• ") | **Tìm thấy và sửa** — xem P2.6 (brand-content detail, 9/15 trang) |
| CTA trùng đích | **Tìm thấy và sửa** — xem P2.1 (Homepage), P2.4 (Offers không đổi, không phát hiện thêm) |
| Editorial vs Product card | Đã phân biệt đúng từ trước — xem P2.6 |
| Desktop card lệch chiều cao | Không phát hiện thêm (grid `stretch` mặc định đã xử lý — xem P2.5) |
| Mobile overflow | Không phát hiện route mới bị tràn (xem route QA bên dưới) |

**Không sửa máy móc** — mỗi thay đổi trong P2 đều có lý do cụ thể ghi trong các mục §P2.1–§P2.9 ở trên, không có thay đổi "vì thấy vậy thôi".

---

## P2 QA

### Command results

```
npm run lint       → pass (0 lỗi)
npm run typecheck  → pass (0 lỗi)
npm run build      → pass — 362 trang static/SSG (tăng 2 route: /robots.txt, /sitemap.xml)
npm run check      → pass
git diff --check   → exit 0, không lỗi whitespace
```

### Route QA (production standalone, `HOSTNAME=127.0.0.1 PORT=4173`)

Kiểm tra hàng loạt qua `curl` (HTTP status + đếm `<h1>` + robots meta) cho toàn bộ route bắt buộc:

| Route | HTTP | Số H1 | Robots (staging) |
|---|---|---|---|
| `/` | 200 | 1 | noindex |
| `/san-pham` | 200 | 1 | noindex |
| `/san-pham/gel-tam-...-co-roi-ngua-chanh` | 200 | 1 | noindex |
| `/uu-dai` | 200 | 1 | noindex |
| `/tu-van-chon-san-pham` | 200 | 1 | noindex |
| `/cau-chuyen-thuong-hieu` | 200 | 1 | noindex |
| `/bai-viet` | 200 | 1 | noindex |
| `/bai-viet/hieu-ve-loai-toc-cua-toi` | 200 | 1 | noindex |
| `/nguyen-lieu` | 200 | 1 | noindex |
| `/nguyen-lieu/fleur-d-oranger` | 200 | 1 | noindex |
| `/noi-dung-thuong-hieu` | 200 | 1 | noindex |
| `/noi-dung-thuong-hieu/le-petit-marseillais-...` | 200 | 1 | noindex |
| `/thu-vien-san-pham-hang` | 200 | 1 | noindex |
| `/tai-khoan` | 200 | 1 | noindex (luôn, mọi env) |
| `/thanh-toan` | 200 | 1 | noindex (luôn, mọi env) |
| `/thu-vien-hinh-anh` | 200 | 1 | noindex (luôn, mọi env) |
| `/thu-vien-noi-dung` | 200 | 1 | noindex (luôn, mọi env) |

**Tất cả 17 route: đúng 1 H1, HTTP 200, robots đúng kỳ vọng.**

### Kiểm tra tương tác thật bằng browser (không chỉ HTTP)

| Kiểm tra | Kết quả |
|---|---|
| Trang chủ sau reorder — console log | **0 lỗi/warning** (kiểm tra bằng `read_console_messages` sau reload sạch) |
| Search: mở overlay (dynamic import) → gõ "sữa tắm" | Overlay mở đúng, 30 kết quả, "Kết quả khác (24)" — **không regression sau khi chuyển sang `next/dynamic`** |
| Cart: mở overlay (dynamic import) | Hiện đúng sản phẩm/subtotal/CTA thanh toán — **không regression** |
| Escape đóng overlay | Hoạt động đúng cho cả Search và Cart |
| Homepage mobile (500px) | 1 banner (không đổi từ P0), Hero → BestSellers → FeaturedCollection đúng thứ tự mới, không tràn ngang |
| Offers, Advisor (1440px) | Không regression, ctaVariant/card layout đúng như trước |
| Brand-content detail | Bullet thật thay vì "•" thô — xác nhận bằng ảnh |

**Không kiểm tra trong đợt này** (không có thay đổi code chạm tới các route/luồng này ngoài `HHShell`/`globals.css` dùng chung toàn site — rủi ro thấp nhưng chưa verify trực tiếp bằng thao tác, ghi nhận là giới hạn QA): checkout flow đầy đủ, auth overlay thao tác thật (chỉ verify code path giống Cart/Search), mobile drawer thao tác thật, 7/8 PDP còn lại ngoài 1 PDP đã spot-check, 1024/834/390px.

---

## Screenshot

Lưu tại `docs/production/screenshots/caudalie-parity/{before-p2,after-p2}/{1440,500}/`.

| Vùng | Reference | Before-P2 | After-P2 |
|---|---|---|---|
| Homepage — Hero | — (không có route home trong `/reference/*`) | `before-p2/1440/01-hero.jpg` | `after-p2/1440/01-hero.jpg` (**3 dòng thay vì 4**) |
| Homepage — thứ tự section | — | `before-p2/1440/02`–`08` | `after-p2/1440/02`–`06` (**thứ tự mới, xen kẽ sáng/tối**) |
| Offers | `/reference/offers` (kế thừa, không chụp lại trong P2) | `before-p2/1440/09-offers-hero.jpg` | `after-p2/1440/07-offers-hero.jpg` |
| Advisor | `/reference/diagnosis` (kế thừa) | `before-p2/1440/11-advisor-hero.jpg` | `after-p2/1440/09-advisor.jpg` |
| Article list | — | `before-p2/1440/13-article-list.jpg` | `after-p2/1440/10-article-list.jpg` |
| Ingredient list | — | `before-p2/1440/16-ingredient-list.jpg` | `after-p2/1440/11-ingredient-list.jpg` |
| Brand story milestone | `/reference/brand-story` (kế thừa) | `before-p2/1440/20-brandstory-milestone1.jpg` | `after-p2/1440/12-brandstory-milestone.jpg` |
| Brand-content detail (bullet fix) | — | (chưa có route này trong before-p2, phát hiện mới trong P2.6) | `after-p2/1440/08-brandcontent-detail-real-bullets.jpg` |
| Homepage mobile | — | `before-p2/500/01`–`02` | `after-p2/500/01`–`02` |

**Không chỉ nhận xét "đẹp hơn"** — mỗi thay đổi ở bảng trên đều có số đo hoặc mô tả cụ thể trong các mục §P2.1–§P2.9.

---

## Dữ liệu còn thiếu / giới hạn

- **Ảnh sản phẩm placeholder** — vẫn 43/83 sản phẩm không có ảnh thật (không đổi trong P2, không phải phạm vi P2, đã ghi nhận xuyên suốt từ Phase 5).
- **Hero photography** — vẫn dùng ảnh thương hiệu/nguyên liệu hiện có + gradient overlay, không phải ảnh hero chuyên biệt (không tạo ảnh mới).
- **Brand story hero** — vẫn gradient placeholder, không ảnh thật.
- **Offers CTA routing** — vẫn trỏ generic `/san-pham`, không trỏ đúng sản phẩm/collection từng offer (giới hạn kiến trúc dữ liệu, không phải field `ctaVariant` mới thêm).
- **Lighthouse/Core Web Vitals** — không đo được trong môi trường này ở bất kỳ đợt nào.
- **1024/834/390/1100px** — không đạt được trong phiên automation này.

## Việc cố ý không sao chép

Không dùng bất kỳ asset/logo/font/copy/màu hex độc quyền nào từ Caudalie trong toàn bộ thay đổi P2. Tất cả ảnh dùng lại là ảnh HH/LPM đã tải từ trước (Phase 3), không thêm ảnh mới. Copy mới (SocialFeed heading "Bài viết nổi bật từ Hoàng Hà", CTA "Xem tất cả bài viết") là copy gốc viết cho dự án này.

---

## Điểm sau P2 (tính lại đầy đủ 25 mục, kế thừa từ P1.1)

| # | Hạng mục | Sau P1.1 | Sau P2 | Thay đổi |
|---|---|---|---|---|
| 1 | Header | 7.5 | 7.5 | — (không đổi) |
| 2 | Navigation | 7.5 | 7.5 | — |
| 3 | Hero | 6 | **7** | +1 (body 4→3 dòng đo được, priority preload sửa đúng slide hiển thị) |
| 4 | Homepage rhythm | 6 | **8** | +2 (bỏ ExperienceCards trùng lặp, xen kẽ sáng/tối xác nhận bằng ảnh, 0 CTA trùng đích so với ~5 cặp trùng trước đó) |
| 5 | Typography | 8 | 8 | — |
| 6 | Color harmony | 7 | 7 | — |
| 7 | Whitespace | 6 | 6 | — (không đổi trực tiếp, chỉ hưởng lợi gián tiếp từ rhythm) |
| 8 | Product card | 8 | 8 | — |
| 9 | Category | 8 | 8 | — |
| 10 | PDP | 7.5 | 7.5 | — (chỉ thêm `sizes`, không đổi thị giác) |
| 11 | Search | 8.5 | 8.5 | — (dynamic import không đổi UX, chỉ đổi performance — tính ở #21) |
| 12 | Cart | 9 | 9 | — |
| 13 | Offers | 7 | **7.5** | +0.5 (ctaVariant semantic, đúng nhưng chưa đổi trình bày/hierarchy) |
| 14 | Advisor | 8 | 8 | — (audit xác nhận đã đạt, không cần sửa) |
| 15 | Brand story | 6 | **6** | — (audit-only, không tìm ra thay đổi đủ an toàn để thực hiện) |
| 16 | Article | 7 | 7 | — (ContentBody dedupe là refactor, không đổi thị giác) |
| 17 | Ingredient | 6 | 6 | — |
| 18 | Footer | 8 | 8 | — |
| 19 | Mobile UX | 8 | 8 | — |
| 20 | Accessibility | 9 | 9 | — |
| 21 | Performance | 6 | **7.5** | +1.5 (dynamic-import 4 overlay giảm bundle ban đầu — ~1.5MB+ dataset không còn bắt buộc tải sớm; sửa `sizes` thiếu; sửa priority preload dư — đo được bằng network capture thật, không có Lighthouse) |
| 22 | SEO | 6 | **8.5** | +2.5 (cơ chế env-aware đầy đủ, verify 2 chiều staging/production bằng build kép thật, sitemap 344 URL đúng loại trừ) |
| 23 | Brand confidence | 6 | 6 | — |
| 24 | Premium perception | 7 | **7.3** | +0.3 (nhịp trang chủ sạch hơn rõ rệt, vẫn giới hạn nặng bởi ảnh/giá placeholder chưa giải quyết) |
| 25 | Reference fidelity | 7 | 7 | — (không đụng container/parity item nào trong P2) |

**Tổng: 187.8/250 ≈ 7.5/10** (từ 7.2/10 sau P1.1).

### Đối chiếu acceptance criteria

| Tiêu chí | Mục tiêu | Đạt được | Kết quả |
|---|---|---|---|
| Premium perception (composite) | ≥ 7.8 | **7.5** | ❌ **CHƯA đạt** |
| Homepage rhythm | ≥ 8 | **8** | ✅ **Đạt** |
| Hero | ≥ 8 | **7** | ❌ Chưa đạt |
| Offers | ≥ 8 | **7.5** | ❌ Chưa đạt |
| Advisor | ≥ 8 | **8** | ✅ Đạt (đã đạt sẵn từ trước P2, xác nhận qua audit) |
| Editorial | ≥ 8 | **~7.5** (3 loại card đã phân biệt đúng cấu trúc + bullet giả đã sửa, nhưng vẫn dùng chung template hình ảnh, chưa có ngôn ngữ thị giác riêng biệt sâu hơn giữa 3 loại) | ⚠️ Gần đạt, chưa chắc chắn |
| Brand story | ≥ 8 | **6** | ❌ **CHƯA đạt — không có thay đổi trong P2** |
| SEO readiness | ≥ 8 | **8.5** | ✅ **Đạt** |
| Performance readiness | ≥ 7.5 | **7.5** | ✅ Đạt (biên, dựa trên bằng chứng network thật, không có Lighthouse) |
| Không regression | Bắt buộc | Xác nhận qua QA thật (search/cart dynamic-import, route H1/HTTP, console 0 lỗi) | ✅ Đạt |
| Không giả dữ liệu | Bắt buộc | 0 ảnh/giá/review giả mới | ✅ Đạt |
| Không sao chép Caudalie | Bắt buộc | 0 asset/màu/font/copy Caudalie trong thay đổi mới | ✅ Đạt |

### Launch blocker thực tế (không tăng điểm giả để "vừa đạt")

Điểm tổng **7.5/10 chưa chạm mốc 7.8/10**. Khoảng cách còn lại tập trung ở 3 blocker cụ thể, đều thuộc loại **cần thêm effort/dữ liệu**, không phải lỗi kỹ thuật còn tồn đọng:

1. **Brand story (6/10, mục tiêu 8)** — blocker rõ nhất: P2.7 chỉ audit, không tìm ra thay đổi đủ cụ thể và đủ an toàn để nâng điểm mà không rủi ro phá vỡ cấu trúc `TimelineEntry`/`BrandStoryTimeline` đã ổn định qua nhiều đợt. Cần: hoặc ảnh hero/milestone thật (giới hạn dữ liệu), hoặc 1 đợt riêng tập trung thiết kế lại nhịp timeline với đủ thời gian đo đạc trước/sau — không nên gộp chung với khối lượng P2 hiện tại.
2. **Hero (7/10, mục tiêu 8)** và **Offers (7.5/10, mục tiêu 8)** — cả hai đã có cải thiện thật (đo được) nhưng chưa đủ sâu để chạm "premium 8": Hero còn giới hạn bởi ảnh không chuyên biệt + trade-off H1/H2 chưa giải quyết; Offers còn giới hạn bởi CTA routing generic. Đây là blocker **kiến trúc dữ liệu**, không phải thiếu ý tưởng thiết kế.
3. **Editorial (~7.5, mục tiêu 8, chưa chắc chắn)** — 3 loại card đã đúng cấu trúc (không CTA button, ảnh+eyebrow+excerpt) nhưng vẫn dùng chung 1 khuôn hình ảnh/typography, chưa có ngôn ngữ thị giác phân biệt sâu hơn giữa Article/Ingredient/Brand-content — cần quyết định thiết kế cụ thể hơn (ví dụ: màu eyebrow riêng theo loại, tỷ lệ ảnh riêng biệt hơn) trong 1 đợt polish tiếp theo.

**Không phải blocker (đã đạt hoặc vượt mục tiêu, xác nhận bằng bằng chứng thật):** Homepage rhythm (8), Advisor (8, không cần sửa), SEO readiness (8.5, verify build kép), Performance readiness (7.5, verify network capture), không regression, không giả dữ liệu, không sao chép Caudalie.

---

---

## P3 — Hero full-bleed redesign + Final Hero QA

**Ngày:** 2026-08-24. Yêu cầu người dùng: Hero đầu trang phải là 1 banner full-bleed dài, sát 2 mép viewport, giống bản live `en.caudalie.com`, thay vì layout 2 cột song song trước đó.

### Thay đổi

`src/components/hh/home/HeroCampaign.tsx` viết lại hoàn toàn:

- Bỏ cấu trúc **2 cây DOM song song** (desktop side-by-side `hidden lg:flex` + mobile/tablet carousel `flex lg:hidden`) — nguồn gốc rủi ro duplicate-H1 đã phải xử lý bằng logic riêng ở bản cũ.
- Thay bằng **1 cây DOM duy nhất**: mỗi slide là 1 `<div className="absolute inset-0">` chồng lên nhau, chuyển đổi bằng `opacity` + `aria-hidden`, chạy giống nhau ở mọi breakpoint.
- Section không còn bọc trong container `max-w-[1440px] px-4 md:px-8` — giờ `w-full` thật sự, ảnh chạm 2 mép viewport (`heroRect.left === 0`, `heroRect.right === docClientWidth` xác nhận bằng JS ở mọi breakpoint đã đo).
- Thêm autoplay `setInterval` 6s (`useEffect` deps `[]`, functional `setActiveIndex`, cleanup `clearInterval` khi unmount) + dot điều hướng thủ công ở góc dưới-phải (giống vị trí dot của Caudalie).
- Chỉ slide đầu (`index === 0`) nhận `priority=true`; slide còn lại dùng `loading="lazy"` mặc định của `next/image` — không ép preload cả 2 ảnh.

### Lệnh đã chạy

```
npm run lint        → pass, 0 lỗi
npm run typecheck    → pass, 0 lỗi
npm run check        → pass (lint + typecheck + build, 362 trang)
git diff --check     → sạch, không whitespace error
```

### Breakpoint thực đo (window.innerWidth)

Môi trường automation phiên này gán kích thước cửa sổ theo 1 tập preset cố định bất kể giá trị `resize_window` yêu cầu — **cùng hiện tượng đã ghi nhận ở P2.0** ("resize không ổn định... một số resize không áp dụng"). Đã xác nhận bằng cách tạo tab mới cho mỗi lần đo và đọc `window.innerWidth` thật qua JS, không suy đoán:

| Yêu cầu | Thực đo | Tầng Tailwind tương ứng |
|---|---|---|
| 1440px | **1920px** (không ép được đúng 1440, nhưng component chỉ dùng `sm:`/`lg:`, không có `xl:`/`2xl:` — 1920 và 1440 render y hệt nhau ở mọi class trong file) | `lg:` |
| 1280px | **1280px** (khớp chính xác) | `lg:` |
| 1024px | không đạt được (không có preset nào ở đúng 1024) | — |
| 834px | **834px** (khớp chính xác) | `sm:` (640–1023) |
| 500px | **500px** (khớp chính xác) | base (<640) |
| 390px | không đạt được | — |

3/6 mốc khớp chính xác tuyệt đối (1280, 834, 500); mốc 1440 được suy ra an toàn từ 1920 vì component không có breakpoint nào giữa 1024 và vô cực; 1024 và 390 không đo được trực tiếp nhưng 1280 (≥1024) và 500 (<640) đã phủ đủ 3 tầng CSS thực sự tồn tại trong file (base / `sm:` / `lg:`).

### Kết quả checklist

| Mục | Kết quả |
|---|---|
| Đúng 1 H1 trên trang chủ | ✅ Pass ở cả 4 width đo được (`document.querySelectorAll('h1').length === 1`) |
| Hero full-bleed sát viewport, không horizontal overflow | ✅ Pass — `heroRect.left=0`, `right=clientWidth` và `scrollWidth − clientWidth = 0` ở cả 4 width |
| Text ≤ 3 dòng desktop | ✅ Pass — 3 dòng (H1) / 2 dòng (H2) ở 1920 & 1280; giảm còn 2/1 dòng ở 834 & 500 |
| Mobile CTA nằm trong vùng nhìn đầu trang | ✅ Pass — CTA `bottom` (446–532px) luôn nhỏ hơn `innerHeight` (813–874px) ở 834/500, không cần cuộn |
| Dot navigation click được | ✅ Pass — click đổi `aria-current` và nội dung slide ngay lập tức |
| Auto-slide 6s hoạt động | ✅ Pass — quan sát `aria-current` tự chuyển banner 1→2 qua nhiều screenshot cách nhau ngoài chủ ý |
| Không double timer / không double-clear | ✅ Pass by construction — `useEffect` deps `[]`, `setActiveIndex` dạng functional update, dot click không đụng tới interval |
| Interval cleanup khi unmount | ✅ Pass — `return () => clearInterval(id)` |
| `prefers-reduced-motion` được tôn trọng | ✅ Pass (gián tiếp) — rule toàn cục có sẵn ở `globals.css:534` (`@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition-duration: 0.01ms !important; ... } }`) đã override `transition-opacity duration-700` của Hero về gần-tức-thời; không tắt autoplay nhưng thỏa điều kiện "hoặc" (bỏ fade mạnh) |
| Ảnh không flash trắng khi chuyển | ✅ Pass — crossfade qua gradient nền + `opacity`, không quan sát flash |
| Ảnh không méo | ✅ Pass — `object-fit: cover` ở cả 2 ảnh, không distort |
| `object-position` hợp lý mobile | ✅ Pass — mặc định `50% 50%`, chủ thể (đá xà phòng, hoa cam) vẫn rõ trong khung ở 834/500 |
| Không preload cả 2 ảnh không cần thiết | ✅ Pass — chỉ ảnh slide 1 không có `loading` attr (eager, do `priority`), ảnh slide 2 có `loading="lazy"` |
| Không CLS rõ rệt | ✅ Pass — section có `h-[440px] sm:h-[500px] lg:h-[600px]` cố định, ảnh không đổi kích thước layout khi tải |
| Không console error (app) | ⚠️ **Có 1 cảnh báo hydration mismatch ở cả 4 tab, nhưng đã xác nhận không phải lỗi app** — xem "Ghi chú kỹ thuật" bên dưới |
| Dot dùng button thật | ✅ Pass — `<button type="button">` |
| aria-label kiểu "Xem slide N" | ✅ Pass (định dạng khác chữ nhưng đúng ý nghĩa) — thực tế là `Xem banner {n}: {heading}`, mô tả rõ hơn bản mẫu "Xem slide 1" |
| aria-current / trạng thái active accessible | ✅ Pass — `aria-current={index === activeIndex}` |
| Keyboard Tab tới dot được | ✅ Pass — xác nhận bằng Tab thật (không phải `.focus()` JS), `document.activeElement.matches(':focus-visible') === true` sau khi Tab |
| Focus-visible rõ | ✅ Pass — `outlineStyle: "auto"` (viền mặc định trình duyệt) xuất hiện đúng lúc `:focus-visible` khớp; không bị site override `outline: none` (khác CTA `.hh-cta-*` vốn có ring riêng) |
| Ảnh decorative `alt=""` | ✅ Pass — cả 2 ảnh nền Hero đều `alt=""` (trang trí, có lớp text riêng biệt truyền tải nội dung) |
| Ảnh mang thông tin `alt` đúng nội dung | N/A — không có ảnh mang thông tin trong Hero (chỉ ảnh nền trang trí) |

### Ghi chú kỹ thuật: cảnh báo hydration mismatch

Cả 4 tab đều log đúng 1 lỗi console giống hệt nhau: React hydration-mismatch do các thuộc tính lạ `bis_skin_checked`, `bis_register`, `__processed_<uuid-khác-nhau-mỗi-tab>__` bị chèn vào **toàn bộ** cây DOM (Header, Footer, ProductCard, mọi section — không riêng Hero) trước khi React hydrate. Đây là dấu hiệu đặc trưng của một tiện ích mở rộng trình duyệt (nhóm Bitdefender TrafficLight/Anti-tracker dùng tiền tố `bis_`) sửa DOM trước khi React kịp hydrate — UUID khác nhau mỗi tab xác nhận nguồn gốc runtime/extension, không phải SSR/CSR mismatch từ code. Không phải regression của Hero, không actionable từ phía app.

### Cập nhật điểm Hero (bảng điểm P2 → P3)

| # | Hạng mục | Sau P2 | Sau P3 | Thay đổi |
|---|---|---|---|---|
| 3 | Hero | 7 | **8** | +1 — đạt mục tiêu ≥8: full-bleed thật sự sát viewport (đúng yêu cầu ban đầu, khớp bố cục Caudalie live), carousel hoạt động đồng nhất mọi breakpoint thay vì chỉ mobile, kiến trúc DOM đơn giản hơn (hết rủi ro duplicate-H1 by design thay vì phải né bằng quy tắc riêng), a11y dot đầy đủ (button thật, aria-label, aria-current, focus-visible xác nhận bằng keyboard thật). Giới hạn còn lại giữ nguyên từ trước: ảnh nền vẫn là ảnh thương hiệu/nguyên liệu có sẵn, không phải ảnh hero chuyên biệt — không phải phạm vi P3. |

### Không commit riêng cho P3

Thay đổi Hero (`HeroCampaign.tsx`) nằm trong cùng working tree đang có các thay đổi liên quan khác thuộc phiên trước đó chưa commit — theo đúng yêu cầu, không tách commit riêng ở bước này.

---

## Không commit. Không push. Dừng lại để review.
