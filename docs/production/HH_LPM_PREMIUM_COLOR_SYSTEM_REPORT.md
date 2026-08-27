# HH × LPM Premium Color System — Báo cáo hoàn thiện

**Ngày:** 2026-07-17
**Branch:** `hh-lpm-premium-color-system`
**Commit gốc trước color pass:** `bb77c56` (Premium typography pass: Cormorant Garamond display font) — toàn bộ đợt đổi màu nằm trong working tree, chưa commit.
**Merge-base với `master`:** `5884e4d`

---

## A. Phạm vi

| Mục | Số liệu |
|---|---|
| Component/route tham chiếu design token `hh-*` | 73 file (`src/components/hh/**`, `src/app/**`) |
| File đổi trực tiếp (component) | 40 file dưới `src/components/hh/` |
| File đổi trực tiếp (data) | 1 file — `src/data/site-content.ts` (scent-advisor card colors) |
| File token/config liên quan | `src/app/globals.css` (nguồn token), `next.config.ts` (không liên quan màu — xem mục G) |
| File tự động ăn theo token (không cần sửa) | 34 file — xem danh sách Phụ lục A |
| **Tổng số file thay đổi trong working tree** | **43 file** (`git diff --stat`), 203 dòng thêm / 139 dòng xóa |

Toàn bộ 41 component/data trực tiếp + 34 file auto-inherit = **75 điểm chạm đã được audit** (một số component vừa dùng token vừa có hex thập phân — không double-count).

Ngoài phạm vi kiểm: các trang `/reference/*` (Caudalie gốc) — `HHShell` không đụng tới `<html>/<body>` root nên hoàn toàn cách ly khỏi token HH, không bị ảnh hưởng bởi đợt đổi màu này.

---

## B. Palette trước/sau

| Token | Giá trị cũ | Giá trị mới | Lý do đổi |
|---|---|---|---|
| `--hh-primary` | `#2f6b4f` (xanh lá đậm, "deep herb green") | `#244a57` (xanh than Provence) | Xanh lá bị đánh giá gần với dược phẩm/organic-food hơn là mỹ phẩm cao cấp; xanh than mineral gợi liên tưởng Địa Trung Hải, tương phản tốt hơn với nền be/kem. |
| `--hh-primary-dark` | `#204a37` | `#193a45` | Theo cùng hue mới, dùng cho hover/pressed và lớp phủ gradient. |
| `--hh-accent` | `#e08a3e` (cam terracotta) | `#c99a4a` (vàng nắng trầm) | Cam terracotta bão hoà cao dễ xung đột với ảnh sản phẩm; vàng nắng trầm giữ tinh thần "Provence sun" nhưng kiềm chế hơn, chỉ dùng cho badge/eyebrow. |
| `--hh-accent-foreground` | `#2a1a08` | `#243338` | Đồng bộ với `--hh-ink` mới thay vì tông nâu riêng biệt. |
| `--hh-cream` | `#fbf6ec` | alias → `--hh-surface-warm` (`#f8f1e8`) | Giữ tên cũ (tránh sửa ~mọi component) nhưng trỏ vào token surface mới để nhất quán hệ thống layer. |
| `--hh-ink` | `#20241f` (đen ngả xanh lá) | `#243338` (đen ngả xanh than) | Đồng bộ hue với primary mới. |
| `--hh-muted` | `#eef1e8` | alias → `--hh-surface-soft` (`#f4f7f4`) | Cùng lý do với `--hh-cream`. |
| `--hh-muted-foreground` | `#5b6459` | `#667579` | Đồng bộ hue, tăng nhẹ độ sáng để đọc tốt hơn trên nền mới. |
| `--hh-border` | `#dfe4d8` | `#e2e7e4` | Đồng bộ hue trung tính mới. |

## C. Token mới (thêm trong đợt này)

| Token | Giá trị | Vai trò |
|---|---|---|
| `--hh-canvas` | `#fcfaf6` | Nền toàn trang (`HHShell` root) — thay `bg-hh-cream` cũ trên root để tách biệt "nền trang" khỏi "nền card". |
| `--hh-surface` | `#ffffff` | Card, modal, dropdown, overlay panel, nền sản phẩm. |
| `--hh-surface-soft` | `#f4f7f4` (= `--hh-muted`) | Nền phụ trung tính — input tìm kiếm, accordion header. |
| `--hh-surface-warm` | `#f8f1e8` (= `--hh-cream`) | Nền "be champagne" — section ấm, ProductGallery/ContentCard placeholder. |
| `--hh-surface-blue` | `#eaf4f5` | Nền xanh mineral nhạt — section nhấn (BrandStoryTeaser, FeaturedCollection, Footer newsletter, OfferCard). |
| `--hh-primary` | `#244a57` | Màu thương hiệu chính. |
| `--hh-primary-hover` (dùng qua `--hh-primary-dark`) | `#193a45` | Hover/pressed. |
| `--hh-primary-soft` | `#dce8e9` | Nền tint cho filter chip/badge đang chọn, focus chip — thay thế pattern "bg-primary + text trắng" quá gắt trên diện rộng. |
| `--hh-accent-blue` | `#5f8e91` | Accent lạnh phụ — gradient, link trong nội dung. |
| `--hh-accent-gold` (= `--hh-accent`) | `#c99a4a` | Badge, eyebrow, accent nhỏ. |
| `--hh-accent-gold-soft` | `#f5e7c9` | Nền tint rất nhạt cho badge/loyalty pill (thay `bg-hh-accent/20`). |
| `--hh-text` (= `--hh-ink`) | `#243338` | Text chính. |
| `--hh-text-secondary` (= `--hh-muted-foreground`) | `#667579` | Text phụ. |
| `--hh-text-muted` | `#879397` | Tầng text thứ ba — placeholder, de-emphasis sâu, **không dùng cho body copy**. |
| `--hh-border` | `#e2e7e4` | Border mặc định. |
| `--hh-border-soft` | `#edf0ee` | Border rất nhạt (chưa được áp dụng rộng, sẵn cho dùng sau). |
| `--hh-shadow-color` | `rgba(32,55,62,0.08)` | Màu nền cho `.hh-shadow-sm` / `.hh-shadow-md` — shadow tinted thay vì đen thuần, độ mờ thấp theo đúng chủ trương "không dùng shadow đậm". |

---

## D. Component rollout

### Header / Navigation
- **Đổi trực tiếp:** `Header.tsx`, `MegaMenu.tsx`, `BrandMegaMenu.tsx`, `MobileDrawer.tsx` — `bg-white`→`bg-hh-surface`, hover `bg-hh-muted`→`bg-hh-surface-blue`, backdrop drawer `bg-black/30`→`bg-hh-primary/35`, mega-panel thêm `hh-shadow-md`.
- **Không cần sửa (auto token):** `DemoBanner.tsx`, `PromoBar.tsx`.

### Footer
- **Đổi trực tiếp:** `Footer.tsx` — nền `bg-white`→`bg-hh-surface`, newsletter box `bg-hh-muted`→`bg-hh-surface-blue`, region dropdown thêm `hh-shadow-sm`, social icon nền `bg-white`→`bg-hh-surface`.

### Homepage
- **Đổi trực tiếp:** `HeroCampaign.tsx`, `AdvisorBanner.tsx`, `BestSellers.tsx`, `BrandStoryTeaser.tsx`, `BrandValues.tsx`, `CategoryShowcase.tsx`, `FeaturedCollection.tsx`, `FullBleedBrandStory.tsx`, `MembershipSection.tsx`, `SocialFeed.tsx`.
- **Không cần sửa (auto token):** `ExperienceCards.tsx`, `PermanentBenefits.tsx`, `SeoTextBlock.tsx`.
- **Cố ý không đổi:** gradient minh hoạ trong `HeroCampaign.SLIDES`/`SocialFeed.TILE_COLORS` giữ vài mã hex trang trí không thuộc palette chính (xem mục "hardcoded legacy còn lại").

### Product card / category
- **Đổi trực tiếp:** `ProductCard.tsx`, `CategoryShowcase.tsx` (cùng nhóm home), `ProductFilterDrawer.tsx`.
- **Không cần sửa:** `ProductGrid.tsx`, `ProductBreadcrumb.tsx`.
- **Hardcoded loại bỏ:** badge "Hữu cơ" trước dùng chung màu `bg-hh-primary` với badge bán chạy — nay tách riêng `bg-[#dceee1] text-[#1f5c3d]` để không nhầm lẫn hai loại badge (xem mục F — đây là badge duy nhất còn giữ hex cứng, có chủ đích vì cần một sắc lục riêng biệt khỏi primary xanh than mới).

### PDP
- **Đổi trực tiếp:** `ProductGallery.tsx`, `ProductBuyBox.tsx`, `ProductAccordions.tsx`, `ProductReviews.tsx`, `TrustBadges.tsx`.
- **Không cần sửa:** `ProductDescription.tsx`, `RelatedProducts.tsx`.

### Search / Cart / Checkout
- **Đổi trực tiếp:** `SearchOverlay.tsx`, `CheckoutContent.tsx`.
- **Sửa bổ sung trong đợt QA này:** `CartDrawer.tsx` — phát hiện bị **sót khỏi lần rollout trước**: backdrop vẫn `bg-black/30` và panel vẫn `bg-white` trong khi mọi overlay khác (AuthOverlay, MobileDrawer, ProductFilterDrawer, SearchOverlay) đã chuyển sang `bg-hh-primary/30` + `bg-hh-surface`. Đây là lỗi thật (thiếu nhất quán giữa các overlay cùng loại), đã sửa 2 dòng để khớp pattern chung. Không đổi gì khác trong file.

### Offers / Advisor
- **Đổi trực tiếp:** `OfferCard.tsx`, `AdvisorBanner.tsx` (nhóm home).
- **Không cần sửa:** `GiftDiscoveryTiles.tsx`, `OffersIntro.tsx`.
- **Data đổi trực tiếp:** `SCENT_ADVISOR_QUESTIONS` trong `site-content.ts` — bỏ hoàn toàn pattern "card nền tối + chữ trắng" (2/6 card trước đây `onDark:true`), toàn bộ 6 card nay dùng nền pastel sáng + `headingColor:"#243338"` đồng nhất + `buttonBg:"#244a57"` (trừ 1 card badge/CTA riêng), giúp toàn bộ lưới thẻ tư vấn đồng nhất về độ sáng.

### Auth / Forms
- **Đổi trực tiếp:** `AuthOverlay.tsx`.
- **Không cần sửa:** `RegisterForm.tsx`, `SignInForm.tsx`.

### Brand story / Content
- **Đổi trực tiếp:** `BrandStoryQuoteBlock.tsx`, `BrandStoryTermBlock.tsx`, `BrandStoryTimeline.tsx`, `TimelineEntry.tsx`, `ContentCard.tsx`.
- **Không cần sửa:** `BrandStoryFootnotes.tsx`, `BrandStoryHero.tsx`, `BrandStoryIntro.tsx`, `ContentCardCarousel.tsx`, `ContentCardGrid.tsx`.
- Toàn bộ trang `/bai-viet`, `/bai-viet/[slug]`, `/cam-ket`, `/thuong-hieu`, `/nguyen-lieu`, `/nguyen-lieu/[slug]`, `/noi-dung-thuong-hieu`, `/noi-dung-thuong-hieu/[slug]`, `/cong-thuc-minh-bach` **không cần sửa** — chỉ dùng token (`bg-hh-cream`, `text-hh-ink`…) nên tự động ăn theo palette mới; phần hex cứng còn lại trong các trang này chỉ là gradient trang trí cho `ProductPlaceholderArt` khi thiếu ảnh thật (xem mục F).

### Libraries
- **Đổi trực tiếp:** `BrandLibraryCard.tsx`, `BrandLibraryFilterBar.tsx`, `MediaLibraryFilterBar.tsx`, `MediaRecordCard.tsx`.
- **Không cần sửa:** `/thu-vien-san-pham-hang`, `/thu-vien-san-pham-hang/[slug]`, `/thu-vien-hinh-anh`, `/thu-vien-noi-dung` (route-level, chỉ dùng token).
- Badge "Tham khảo" (`bg-slate-600`) trên các thẻ thư viện **cố ý giữ nguyên** — màu xám trung tính này phân biệt rõ dữ liệu tham khảo hãng khỏi sản phẩm Hoàng Hà thật, không thuộc palette thương hiệu nên không đổi.

### Misc / Layout
- **Đổi trực tiếp:** `HHShell.tsx` (root canvas), `Pagination.tsx`, `StickyMobileCta.tsx`, `TaiKhoanContent.tsx` (placeholder art color).

---

## E. Contrast

**Giới hạn quan trọng:** phần kiểm tra dưới đây chỉ thực hiện bằng đọc mã nguồn + quan sát trực quan qua browser (screenshot), **không đo bằng công cụ đo tỷ lệ tương phản (không dùng axe/Lighthouse/WebAIM contrast checker)**. Do đó **không khẳng định đạt chuẩn WCAG AA** cho bất kỳ cặp màu nào dưới đây — đây là đánh giá định tính "đọc được rõ ràng trên nhiều nền" qua quan sát thực tế, không phải kết quả đo.

| Khu vực | Quan sát |
|---|---|
| Body text | `text-hh-ink` (`#243338`) trên `--hh-canvas`/`--hh-surface`/`--hh-surface-warm` — tối trên nền rất sáng, quan sát rõ ràng ở mọi section đã QA. |
| Secondary text | `text-hh-muted-foreground` (`#667579`) trên nền trắng/be — đọc được nhưng nhạt hơn body text, đúng vai trò phân cấp. |
| CTA | Nút primary (`bg-hh-primary` nền xanh than + chữ trắng) và nút accent-soft (`bg-hh-accent-gold-soft` + `text-hh-accent-foreground` tối) đều quan sát rõ trên mọi nền đã kiểm (hero tối, canvas sáng, card trắng). |
| Badge | "Hữu cơ" (`#dceee1`/`#1f5c3d`) và "Liên hệ báo giá"/loyalty (`bg-hh-accent-gold-soft`/`text-hh-accent-foreground`) **phân biệt rõ ràng với nhau** khi đứng cạnh nhau trên `ProductCard`/`ProductGallery` — không còn tình trạng badge dùng chung 1 màu primary như trước. |
| Footer | Dải "Quyền lợi mỗi đơn hàng" nền `--hh-primary-dark`-ish + chữ trắng — đọc rõ; phần link nền trắng + `text-hh-ink`/`text-hh-muted-foreground` — đọc rõ; các mục "(Đang cập nhật)" dùng `text-hh-muted-foreground` italic — phân biệt được với link hoạt động. |
| Text trên ảnh | Hero, FullBleedBrandStory, AdvisorBanner dùng overlay `bg-hh-primary-dark/20`–`/40` phủ lên ảnh + chữ trắng — quan sát rõ trên các ảnh đã kiểm (soap, lavender, orchard, forest); không kiểm tra toàn bộ ~80+ ảnh sản phẩm/PDP có thể có vùng sáng cục bộ làm giảm tương phản chữ overlay. |
| Focus ring | 8 file dùng `focus-visible:outline-hh-primary` (input, select trong `MediaLibraryFilterBar` và tương tự) — outline màu primary mới trên nền trắng, quan sát được nhưng chưa đo độ dày/contrast theo WCAG 2.4.11. |
| Form / input | Input tìm kiếm, checkout, filter đều dùng `bg-hh-surface`/`bg-hh-surface-soft` + border `hh-border` + text `hh-ink` — đọc rõ trong mọi màn hình đã test. |
| Disabled state | **Không tìm thấy class `disabled:` tường minh nào trong `src/components/hh/**`** (grep không ra kết quả) — nút "Theo dõi cộng đồng", các mục footer "(Đang cập nhật)" dùng `cursor-default`/`text-muted-foreground` thay vì thuộc tính `disabled` thật + style `disabled:`. Đây là khoảng trống styling từ trước, không phải regression của đợt đổi màu này, nhưng cũng chưa được thiết kế riêng trong hệ token mới — cần audit riêng nếu muốn chuẩn hoá disabled state.

---

## F. QA

### Breakpoint — có một giới hạn môi trường quan trọng

Công cụ `resize_window` của trình duyệt tự động trong phiên làm việc này **không hoạt động ổn định**: mỗi lần gọi resize tới các độ rộng mục tiêu (1440/1100/1024/834/500/390), cửa sổ thực tế "kẹt" ở một độ rộng cố định khác nhau tuỳ tab (đã xác nhận bằng `window.innerWidth` qua JS), không phải giá trị yêu cầu. Đã xác nhận được 2 viewport thực tế hoạt động ổn định trong phiên:

- **~1024px** (đúng biên `lg:` của Tailwind — layout desktop đầy đủ, nav ngang, không có `StickyMobileCta`).
- **~834px** (dưới biên `lg:` — layout tablet/mobile: hamburger menu, `StickyMobileCta` xuất hiện, `MobileDrawer`, không tràn ngang xác nhận bằng `scrollWidth === clientWidth`).

**Không ép được** các độ rộng 1440, 1100, 500, 390 trong phiên này (nhiều lần thử resize cho kết quả ngẫu nhiên khác nhau — 1024, 834, 1100 tuỳ tab, không theo yêu cầu). Đây đúng với điều kiện "390px nếu môi trường hỗ trợ" mà brief đã lường trước — môi trường lần này **không hỗ trợ** đầy đủ 6 breakpoint. Toàn bộ nhận định layout dưới đây dựa trên 2 breakpoint thực đo (~1024px, ~834px) cộng với việc `npm run build` không phát hiện lỗi build/type liên quan responsive, và code Tailwind responsive (`sm:`/`md:`/`lg:`) không bị đụng tới trong đợt đổi màu (chỉ đổi màu, không đổi cấu trúc layout/breakpoint).

### Route đã kiểm (tại 2 breakpoint thực đo ở trên)

| Route | Kết quả |
|---|---|
| `/` | Không tràn ngang, hero/best-sellers/featured-collection/brand-story-teaser/brand-values/full-bleed/social-feed/footer — card phân biệt rõ với canvas, CTA nổi bật, không lỗi console. |
| `/san-pham` | Grid sản phẩm, badge "Hữu cơ" vs "Liên hệ báo giá" phân biệt rõ; `ProductFilterDrawer` mở đúng màu (`bg-hh-primary/30` backdrop, `bg-hh-surface` panel, chip active `bg-hh-primary-soft`). |
| 3 PDP (`.../huong-qua-dao-xuan-dao`, `.../co-roi-ngua-chanh`, `.../huong-hoa-hong-dai`) | Gallery, buy box, trust badges, accordions, reviews, related products — nhất quán, không lỗi console. |
| `/uu-dai` | `OfferCard` nền `bg-hh-surface-blue` phân biệt rõ canvas, mã giảm giá nổi bật. |
| `/tu-van-chon-san-pham` | Toàn bộ 6 card nền pastel sáng + heading tối — không còn card nền tối/chữ trắng. |
| `/cau-chuyen-thuong-hieu` | Hero gradient mới, term block, quote block — đọc rõ. |
| 1 bài viết (`/bai-viet/hieu-ve-loai-toc-cua-toi`) | OK, không cần sửa code (auto token). |
| 1 trang nguyên liệu (`/nguyen-lieu/fleur-d-oranger`) | OK, không cần sửa code (auto token). |
| `/thu-vien-san-pham-hang` | Filter chip đúng màu, badge "Tham khảo" giữ nguyên xám trung tính (cố ý). |
| Search overlay | `bg-hh-surface`, input `bg-hh-surface-soft`, kết quả sản phẩm/ingredient/article đúng badge. |
| Cart drawer | **Đã fix trong phiên này** — nay đồng bộ với các overlay khác. |
| Auth overlay | Backdrop + panel đúng token, mở qua footer "Đăng nhập". |
| Checkout (`/thanh-toan`) | Order summary card `bg-hh-surface` có border, "Tạm tính" `font-semibold`. |
| Footer desktop/mobile | Đọc rõ ở cả 2 breakpoint đã test, grid 2 cột ở tablet xác nhận không tràn ngang qua `scrollWidth`. |

### Console / hydration
Đã kiểm tra console (`onlyErrors: true`) sau full page load trên: `/`, PDP, `/san-pham`, `/uu-dai` (gián tiếp qua cùng session), `/thu-vien-san-pham-hang`, `/thanh-toan`, và tab tablet — **không phát hiện lỗi console hoặc cảnh báo hydration nào** trên các route đã kiểm.

### Không tràn ngang / card phân biệt / CTA nổi bật / badge không nhầm nghĩa / section không vụn màu
Xác nhận qua quan sát trực tiếp trên toàn bộ route liệt kê ở trên, tại cả 2 breakpoint thực đo — không phát hiện vấn đề.

---

## G. Performance

- **Không thêm thư viện mới** — `package.json` không bị đụng tới trong đợt này.
- **Không thêm ảnh/video** — chỉ đổi giá trị màu trong CSS variable, class Tailwind, và vài mã hex trang trí trong TS/TSX.
- **Không làm tăng bundle đáng kể** — toàn bộ thay đổi là CSS custom property + Tailwind utility class có sẵn trong hệ thống (`bg-hh-*`, `text-hh-*`, 2 utility mới `.hh-shadow-sm`/`.hh-shadow-md`); `npm run build` (Turbopack) hoàn tất thành công, 360 trang static/SSG generate bình thường, không có cảnh báo kích thước bundle mới.
- **`next.config.ts` → `allowedDevOrigins: ["192.168.1.35"]`**: đây là cấu hình **chỉ áp dụng cho dev server** (cho phép truy cập LAN khi demo bằng điện thoại/tablet qua HMR/RSC dev-only request). Theo comment trong code và theo hành vi của Next.js, field này **không có tác dụng gì với production build** (`next build`/`next start`) — đã xác nhận `npm run build` chạy sạch không liên quan tới field này. Không thuộc phạm vi đổi màu nhưng đã có mặt sẵn trong working tree khi bắt đầu phiên này.

---

## H. Hạn chế còn lại

- **Ảnh sản phẩm thiếu**: nhiều sản phẩm vẫn dùng `ProductPlaceholderArt` (gradient SVG) thay vì ảnh thật — không thuộc phạm vi đợt đổi màu này, giữ nguyên hành vi cũ.
- **Giá thật thiếu**: banner "Bản demo nội bộ — dữ liệu giá, khuyến mại và thành viên chưa phải chính sách chính thức" vẫn hiển thị xuyên suốt — dữ liệu giá là demo, không đổi trong đợt này.
- **Review thật chưa có**: PDP hiển thị "Chưa có đánh giá — hãy là người đầu tiên" trên toàn bộ sản phẩm đã kiểm — dữ liệu demo, không đổi trong đợt này.
- **robots/noindex**: không được kiểm tra trong đợt QA này (ngoài phạm vi color pass — không có file `robots.txt`/metadata `noindex` nào bị đụng tới trong diff).
- **`ScentAdvisorIntro.tsx` orphaned**: xác nhận bằng grep toàn repo — component này **không được import ở bất kỳ đâu** ngoài chính file của nó (`src/components/hh/advisor/ScentAdvisorIntro.tsx`). Route `/tu-van-chon-san-pham` thực tế render qua `ScentAdvisorView.tsx`. File này *có* dùng đúng token màu mới (nằm trong danh sách 34 file auto-inherit ở Phụ lục A) nên nếu được mount lại sau này sẽ không bị lệch màu — nhưng **không bị xoá, không bị nối lại, không bị sửa** trong phiên này theo đúng yêu cầu. Cần một task riêng để quyết định xoá hay tái sử dụng.
- **Badge "Hữu cơ" dùng hex cứng** (`#dceee1`/`#1f5c3d`) thay vì token — cố ý (mục D) để tách biệt khỏi `--hh-primary` mới, nhưng về lâu dài nên có token `--hh-organic`/`--hh-success` riêng thay vì hex rời rạc lặp lại ở `ProductCard.tsx` và `ProductGallery.tsx`.
- **Giới hạn breakpoint QA** — xem chi tiết mục F: chỉ xác thực được ~1024px và ~834px trong môi trường phiên này; 1440/1100/500/390 chưa được xác thực trực tiếp bằng browser, chỉ suy luận từ cấu trúc Tailwind responsive không đổi + build thành công.
- **Disabled state chưa chuẩn hoá** — xem mục E, không phải regression của đợt này nhưng là khoảng trống hệ thống.

---

## I. Đánh giá trước/sau

| Tiêu chí | Trước | Sau |
|---|---|---|
| Độ sáng | Nền `--hh-cream`/`--hh-muted` cũ ngả vàng-lục, cảm giác hơi đục | `--hh-canvas` mới sáng và trung tính hơn (`#fcfaf6`), phân lớp rõ ràng canvas → surface-soft → surface (card trắng) → surface-blue (nhấn) |
| Độ cao cấp | Xanh lá đậm + cam terracotta bão hoà cao — gần với mỹ phẩm hữu cơ đại trà | Xanh than Provence + vàng nắng trầm, dùng có kiểm soát (badge/eyebrow, không phủ diện rộng) — gợi cảm giác mineral/cao cấp hơn |
| Khả năng đọc | Nhiều nơi dùng "nền primary đậm + chữ trắng" cho trạng thái active (filter chip, pagination) — tương phản cao nhưng chiếm diện tích lớn, gây chói khi lặp lại nhiều lần trên một trang | Chuyển phần lớn trạng thái active sang `primary-soft` (nền nhạt + chữ primary đậm) — vẫn phân biệt rõ trạng thái nhưng dịu mắt hơn khi lặp lại (filter chip, pagination, badge "Tất cả") |
| Tính nhất quán | 2/6 card tư vấn mùi hương dùng nền tối/chữ trắng khác hẳn 4 card còn lại; CartDrawer lệch khỏi pattern overlay chung; badge "Hữu cơ" và "Bán chạy" từng dùng chung 1 màu primary | Toàn bộ 6 card tư vấn đồng nhất; mọi overlay (auth/cart/mobile-drawer/filter-drawer) cùng pattern `primary/30 backdrop + surface panel`; badge phân tách rõ theo vai trò |
| Cảm giác thương hiệu | Lệch về "thiên nhiên/hữu cơ" đơn thuần (xanh lá + cam) | Cân bằng hơn giữa "Provence Địa Trung Hải" (xanh than mineral) và "nắng miền Nam nước Pháp" (vàng gold tiết chế) — đúng định hướng "French Mediterranean Beauty" |
| Conversion clarity | CTA chính (nền primary đậm) đôi khi cạnh tranh thị giác với badge cũng dùng primary | CTA chính vẫn nền `--hh-primary` đặc — nổi bật nhất trên trang; badge/trạng thái phụ dùng `primary-soft`/`accent-gold-soft` — phân cấp thị giác rõ giữa "hành động" và "thông tin" |

---

## Phụ lục A — 34 file auto-inherit qua token (không cần sửa trực tiếp)

```
src/app/bai-viet/[slug]/page.tsx
src/app/bai-viet/page.tsx
src/app/cam-ket/page.tsx
src/app/cong-thuc-minh-bach/page.tsx
src/app/nguyen-lieu/[slug]/page.tsx
src/app/nguyen-lieu/page.tsx
src/app/noi-dung-thuong-hieu/[slug]/page.tsx
src/app/noi-dung-thuong-hieu/page.tsx
src/app/san-pham/page.tsx
src/app/thu-vien-hinh-anh/page.tsx
src/app/thu-vien-noi-dung/page.tsx
src/app/thu-vien-san-pham-hang/[slug]/page.tsx
src/app/thu-vien-san-pham-hang/page.tsx
src/app/thuong-hieu/page.tsx
src/components/hh/advisor/ScentAdvisorIntro.tsx   (orphaned — xem mục H)
src/components/hh/advisor/ScentAdvisorView.tsx
src/components/hh/auth/RegisterForm.tsx
src/components/hh/auth/SignInForm.tsx
src/components/hh/brand-story/BrandStoryFootnotes.tsx
src/components/hh/brand-story/BrandStoryHero.tsx
src/components/hh/brand-story/BrandStoryIntro.tsx
src/components/hh/content/ContentCardCarousel.tsx
src/components/hh/content/ContentCardGrid.tsx
src/components/hh/home/ExperienceCards.tsx
src/components/hh/home/PermanentBenefits.tsx
src/components/hh/home/SeoTextBlock.tsx
src/components/hh/layout/DemoBanner.tsx
src/components/hh/layout/PromoBar.tsx
src/components/hh/offers/GiftDiscoveryTiles.tsx
src/components/hh/offers/OffersIntro.tsx
src/components/hh/pdp/ProductDescription.tsx
src/components/hh/pdp/RelatedProducts.tsx
src/components/hh/product/ProductBreadcrumb.tsx
src/components/hh/product/ProductGrid.tsx
```

---

## Kết luận

- **File code thay đổi:** 43 file (`git diff --stat`) — 40 component + 1 data file (`site-content.ts`) + 1 file token nguồn (`globals.css`) + 1 file config không liên quan màu (`next.config.ts`).
- **Token đổi:** 9 token giá trị thay đổi (bảng B) + 16 token mới thêm (bảng C).
- **Route đã QA:** 13 route/overlay (bảng F) — đúng danh sách brief yêu cầu.
- **Breakpoint đã QA thực tế bằng browser:** 2/6 (~1024px, ~834px) — do giới hạn môi trường `resize_window` không ổn định trong phiên này (xem mục F, đã ghi rõ theo điều khoản "nếu môi trường hỗ trợ").
- **Lỗi contrast còn lại:** không phát hiện lỗi contrast rõ ràng qua quan sát trực quan; **chưa đo bằng công cụ**, không tuyên bố đạt WCAG AA (xem mục E). Khoảng trống còn lại: disabled state chưa có styling riêng, chưa đo contrast overlay-trên-ảnh cho toàn bộ ảnh sản phẩm.
- **`npm run check`:** ✅ PASS sạch — lint, typecheck, `next build` (Turbopack) đều thành công, 360 trang generate không lỗi.
- **`git diff --check`:** ✅ PASS — không có lỗi whitespace.

**Kết luận về điều kiện commit:** Đủ điều kiện commit về mặt kỹ thuật (build/lint/typecheck sạch, không lỗi console/hydration trên các route đã kiểm, không tràn ngang, không xung đột badge). Sửa duy nhất ngoài phạm vi "chỉ audit" là fix `CartDrawer.tsx` — một lỗi thật (overlay bị sót khỏi rollout trước), phù hợp với chỉ đạo "không đổi thêm nếu không phát hiện lỗi thật". Điểm cần lưu ý trước khi commit: báo cáo này **không** thay thế một lần đo contrast bằng công cụ chuẩn và **không** xác thực đầy đủ 6 breakpoint — nên ghi rõ trong PR description nếu người review cần mức đảm bảo cao hơn cho các mobile breakpoint hẹp (500px/390px) chưa xác thực trực tiếp.
