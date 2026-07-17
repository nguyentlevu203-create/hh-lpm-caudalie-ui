# HH × LPM — Luminous Champagne Color Pass Report

**Ngày:** 2026-07-17
**Branch:** `hh-lpm-world-class-premium-v3` (tiếp tục trên nền V3 đã commit tại `61c89d6`)
**Định hướng:** Luminous Champagne Luxury — Bright French beauty editorial.
**Trạng thái:** Chưa commit. Toàn bộ thay đổi ở working tree, sẵn sàng để review.

---

## 0. Bối cảnh

V3 (World-Class Premium) dùng `bg-hh-primary` (teal đậm) + chữ trắng làm CTA chính xuyên suốt site. Phản hồi: CTA teal đậm "hơi nặng và kỹ thuật". Đợt này thay **hệ CTA primary** sang champagne sáng, đồng thời nâng toàn bộ palette sang tông ivory/mineral/warm-white ấm hơn — nhưng **giữ nguyên vai trò của teal** cho CTA phụ, link, focus, và các nền đặc lớn (band "Quyền lợi", overlay).

---

## 1. Token trước/sau

### 1.1 CTA-primary — hệ token hoàn toàn mới

| Token | Giá trị | Vai trò |
|---|---|---|
| `--hh-cta-primary` | `#e8d7b8` (= `--hh-accent-champagne`) | nền CTA chính |
| `--hh-cta-primary-hover` | `#dcc297` | hover |
| `--hh-cta-primary-active` | `#d2b384` | active/pressed |
| `--hh-cta-primary-text` | `#17383b` | chữ CTA (không phải `--hh-ink`, token riêng theo đúng spec) |
| `--hh-cta-primary-border` | `#cdaa70` (= `--hh-accent-champagne-strong`) | viền 1px |
| `--hh-cta-primary-focus` | `#8c6a3e` | focus ring |

Bundled thành 1 class dùng chung: `.hh-cta-primary` (`globals.css`, `@layer components`) — bg/border/radius 14px/shadow rất nhẹ/hover nâng 1px/focus ring/disabled state đều định nghĩa 1 chỗ, các component chỉ thêm class này + utility kích thước (`h-12 px-6...`) của riêng chúng.

### 1.2 Palette toàn site

| Token (tên giữ nguyên từ V1–V3) | V3 (trước) | V4 Champagne (sau) | Vai trò spec |
|---|---|---|---|
| `--hh-canvas` | `#f8f6f1` | `#faf8f3` | canvas |
| `--hh-surface` | `#fffefc` | `#fffefc` (không đổi) | surface |
| `--hh-surface-soft` | `#f3f5f2` | `#f5f0e7` | surface-soft |
| `--hh-surface-warm` | `#f3ede3` | `#f3e8d8` | surface-warm |
| `--hh-surface-blue` | `#edf3f1` | `#edf4f1` | surface-mineral (tên giữ, vai trò theo V3) |
| `--hh-primary` | `#1e4b4f` | `#315f5c` | teal — **không còn là CTA chính**, dùng cho CTA phụ/link/focus/nền đặc |
| `--hh-primary-dark` | `#153a3d` | `#274d4b` | primary-hover |
| `--hh-primary-soft` | `#dde9e7` | `#dfebe8` | primary-soft |
| `--hh-ink` | `#182a2d` | `#1b3033` | text |
| `--hh-muted-foreground` | `#5c696b` | `#647174` | text-secondary |
| `--hh-text-muted` | `#7a8586` | `#7d8788` | text-muted |
| `--hh-border` | `#c6bcaa` (đã chỉnh ở V3) | **`#c9c0ac`** (spec đề xuất `#DDD8CE` đo chỉ 1.34:1, lại phải chỉnh — xem §5) | border |
| `--hh-border-soft` | `#ddd6c8` | **`#d8cfba`** (cùng lý do) | border-soft |
| `--hh-shadow-color` | `rgba(24,42,45,.07)` | `rgba(39,63,62,.07)` | shadow |
| `--hh-accent-champagne` *(mới)* | — | `#e8d7b8` | canonical champagne |
| `--hh-accent-champagne-strong` *(mới)* | — | `#cdaa70` | canonical champagne đậm |
| `--hh-accent-mineral` *(mới)* | — | `#72918c` | mineral accent, trang trí/icon lớn |
| `--hh-accent` | `#a77b43` | `var(--hh-accent-champagne-strong)` (alias) | legacy name |
| `--hh-accent-gold-soft` | `#efe2cd` | `var(--hh-accent-champagne)` (alias) | legacy name |
| `--hh-accent-foreground` | `#182a2d` | `#1b3033` | dark text on accent |

**Không giữ 2 palette song song**: `--hh-accent`/`--hh-accent-gold-soft` (tên cũ, ~10 call site) giờ **alias** thẳng vào 3 token champagne mới thay vì giữ hex độc lập — một nguồn sự thật duy nhất cho họ màu champagne.

---

## 2. Số CTA đã migrate: 18

| # | File | CTA |
|---|---|---|
| 1 | `HeroCampaign.tsx` | CTA hero chính (2 slide) |
| 2 | `ProductCard.tsx` | "Thêm vào giỏ" / "Xem sản phẩm" (2 biến thể cùng 1 CTA) |
| 3 | `ProductBuyBox.tsx` | "Mua ngay \| giá" / "Gửi yêu cầu mua hàng" |
| 4 | `StickyMobileCta.tsx` | "Mua ngay" |
| 5 | `CartDrawer.tsx` | "Tiếp tục mua sắm" (giỏ trống) + "Đến trang thanh toán \| tổng" |
| 6 | `CheckoutContent.tsx` | "Tiếp tục mua sắm" (giỏ trống) + "Tiếp tục mua sắm" (đặt hàng thành công) + "Đặt hàng" (submit) |
| 7 | `RegisterForm.tsx` | "Bắt đầu mua sắm" (sau đăng ký) + "Tạo tài khoản" (submit) |
| 8 | `SignInForm.tsx` | "Đăng nhập" (submit) |
| 9 | `TaiKhoanContent.tsx` | "Đăng nhập / Đăng ký" |
| 10 | `BrandStoryTeaser.tsx` | "Khám phá câu chuyện" |
| 11 | `FeaturedCollection.tsx` | CTA "Xem thêm"-type |
| 12 | `MembershipSection.tsx` | CTA đăng ký hội viên (trên nền teal đặc) |
| 13 | `OfferCard.tsx` | CTA ưu đãi |
| 14 | `ProductReviews.tsx` | "Gửi đánh giá" |
| 15 | `Footer.tsx` | Newsletter "Đăng ký" — **nâng cấp kiến trúc**: từ text-link trần lên box CTA thật (xem §4) |
| 16 | `TimelineEntry.tsx` | CTA milestone brand-story |
| 17 | `FullBleedBrandStory.tsx` | "Khám phá câu chuyện" (trên ảnh full-bleed) |
| 18 | `AdvisorBanner.tsx` | "Bắt đầu tư vấn" |

**Chủ động KHÔNG migrate** (giữ teal/secondary/decorative đúng theo brief):
- Pagination active state, `BrandLibraryFilterBar`/`BestSellers`/`ProductFilterDrawer` filter chip (5 vị trí) — "không biến filter chip thành nút champagne".
- `MegaMenu` CTA — nav phụ, giữ outline teal (không phải hành động chính của trang).
- Mọi backdrop/scrim overlay (`AuthOverlay`, `CartDrawer`, `MobileDrawer`, `ProductFilterDrawer`) — giữ `bg-hh-primary/30-35`.
- Badge ("Bán chạy", "Hữu cơ") — không phải CTA.
- Monogram "HH" (Header/Footer), cart/nav count-dot — không phải CTA.
- `ScentAdvisorView` "Xem sản phẩm" — đã là tertiary text-link (underline) từ V2, đúng chuẩn tertiary, không đổi.
- `ProductDescription.tsx` — không có CTA, chỉ `<dl>`/`<ul><li>` mô tả.
- Section nền đặc teal không gắn CTA (`PermanentBenefits`, `PromoBar`, `MobileDrawer` panel dưới) — giữ nguyên vai trò "vùng kết thúc/băng thông tin", không phải nút.

---

## 3. Component rollout — theo đúng danh sách audit

| Component | Kết quả audit |
|---|---|
| HeroCampaign | ✅ CTA champagne, đã QA trên ảnh thật (soap/orange blossom) |
| Header | Không có CTA chính (chỉ nav + icon) — không đổi, đúng |
| MegaMenu | CTA phụ giữ teal outline — quyết định có chủ đích |
| MobileDrawer | Không có CTA champagne cần thiết (chỉ nav rows + auth row trong panel teal) |
| ProductCard | ✅ Cả 2 biến thể CTA |
| ProductBuyBox | ✅ Primary champagne, secondary "Thêm vào giỏ" giữ outline teal |
| StickyMobileCta | ✅ "Mua ngay" champagne, "Tư vấn chọn mùi" giữ outline teal — 2 CTA rõ ràng |
| CartDrawer | ✅ Cả 2 CTA checkout |
| CheckoutContent | ✅ Cả 3 CTA |
| SearchOverlay | Không có CTA riêng — tái dùng `ProductCard` (đã fix tự động) |
| AuthOverlay | Không có CTA riêng của overlay — chứa `RegisterForm`/`SignInForm` (đã fix) |
| Offers | ✅ `OfferCard` |
| ScentAdvisorView | Đã compliant từ trước (tertiary text-link), không đổi |
| Newsletter Footer | ✅ Nâng cấp từ text-link → box CTA thật |
| Article CTA | Không tồn tại CTA trên trang bài viết/nguyên liệu — không có gì để đổi |
| Brand story CTA | ✅ `TimelineEntry` + `FullBleedBrandStory` |
| Membership CTA | ✅ |

**Icon button/quantity control/accordion/pagination**: đã audit riêng — quantity stepper (`ProductBuyBox`, `-`/`+`) không có nền, chỉ `text-hh-ink`, không đổi. Accordion (`Thành phần`/`Hướng dẫn sử dụng`) không có CTA nền. Pagination — xem trên, giữ nguyên.

---

## 4. Footer newsletter — thay đổi kiến trúc nhỏ

Trước: `<input>` + `<button>` share 1 dòng, button chỉ là `text-sm font-medium text-hh-primary` (không nền, không viền — gần như vô hình). Spec yêu cầu "newsletter CTA champagne" — không thể nhét 1 CTA có nền/viền/radius vào chung dòng gạch chân với input mà không vỡ layout. Đã đổi form từ `flex-row` (input+button chung 1 dòng, viền dưới chung) sang `flex-col` (input dạng box viền riêng, button `.hh-cta-primary` full-width bên dưới). Đây là thay đổi bố cục nhỏ **trong phạm vi component**, không phải "redesign layout" ở cấp trang — cần thiết để CTA champagne thực sự tồn tại được ở đây theo đúng yêu cầu.

---

## 5. Contrast measurements (đo thực tế)

| Cặp | Tỷ lệ | Đạt? |
|---|---|---|
| `#17383B` (cta-text) trên `#E8D7B8` (cta-primary) | **8.91:1** | ✅ vượt xa 4.5:1 |
| `#17383B` trên `#DCC297` (cta-hover) | **7.33:1** | ✅ |
| `#17383B` trên `#D2B384` (cta-active) | **6.32:1** | ✅ |
| `--hh-ink` (#1b3033) trên canvas (#faf8f3) | 13.04:1 | ✅ |
| `--hh-muted-foreground` (#647174) trên canvas | 4.76:1 | ✅ |
| `--hh-primary` (#315f5c) trên canvas/surface | 6.77 / 7.13:1 | ✅ |
| Chữ ivory trên `--hh-primary` (nếu section teal đặc, vd MembershipSection band, footer band cũ) | 7.13:1 | ✅ |
| `--hh-text-muted` (#7d8788) trên canvas | 3.48:1 | ⚠️ large-text only, đúng chủ đích (placeholder) |
| `--hh-accent-champagne-strong` (#cdaa70) trên surface (nếu dùng làm text/icon lớn) | 2.17:1 | ❌ — xác nhận không dùng làm text nhỏ ở đâu, chỉ border/decorative |
| Focus ring `--hh-cta-primary-focus` (#8c6a3e) trên nền cta-primary | 3.50:1 | ✅ đạt ngưỡng 3:1 cho non-text UI boundary (WCAG 1.4.11) |

### Phát hiện & sửa — `--hh-border` lại fail (lần 2)

Giống hệt vấn đề đã gặp ở V3: giá trị spec đề xuất cho `--hh-border` (`#DDD8CE`) chỉ đạt **1.34:1** so với canvas mới — quá yếu, card sẽ hòa vào nền. Đã đo và chỉnh lại trong cùng gam màu:

| | Spec | Đã chỉnh |
|---|---|---|
| `--hh-border` vs canvas | 1.34:1 | **1.70:1** |
| `--hh-border` vs surface | 1.41:1 | **1.79:1** |
| `--hh-border-soft` vs canvas/surface | ~1.2:1 | **1.46 / 1.54:1** |

### Câu hỏi trọng tâm của brief: "CTA champagne có bị coi là disabled không?"

Đo thô: **nền CTA (#E8D7B8) vs canvas (#FAF8F3) chỉ đạt 1.33:1** — gần như không phân biệt được bằng độ sáng thuần túy. Đây là rủi ro thật đã được brief lường trước ("nếu bản champagne làm CTA khó nhận ra... không giữ chỉ vì màu sáng hơn"). Xử lý:
1. Border `--hh-cta-primary-border` (#cdaa70) vs canvas/surface đạt **2.07 / 2.17:1** — đủ để mắt nhận ra viền.
2. Đã QA trực quan qua browser thật (không chỉ số đo) trên nhiều ngữ cảnh nền khác nhau — xem §7.
3. **Kết luận sau QA trực quan: KHÔNG đọc như disabled** ở bất kỳ ngữ cảnh nào đã kiểm (ảnh tối, canvas sáng, card trắng, section nền teal đặc) — chữ đậm 600 + viền + shadow nhẹ đủ tạo affordance "đây là nút bấm". Không cần điều chỉnh thêm border/hover.

---

## 6. Lỗi phát hiện và đã sửa

1. **`--hh-border` spec value fail contrast (1.34:1)** — lặp lại vấn đề V3, đã chỉnh sang `#c9c0ac`/`#d8cfba`.
2. **Footer newsletter CTA gần như vô hình** (text-only, không nền/viền) trước khi sửa — không phải lỗi mới phát sinh từ đợt này nhưng được phát hiện khi audit theo yêu cầu "newsletter CTA champagne", đã nâng cấp thành CTA thật.
3. **Môi trường trình duyệt: server production bị lẫn với 1 process `next dev` sót lại** giữa phiên QA (phát hiện qua log console vẫn hiện `<HotReload>` dù đã chạy `npm run start`) — đã `kill -9` toàn bộ tiến trình cũ, `npm run build` + `npm run start` lại từ đầu, xác nhận qua `curl` không còn `webpack-hmr` trong HTML trước khi tiếp tục QA. Không phải lỗi code — lỗi vệ sinh môi trường phiên làm việc, ghi lại để minh bạch quá trình QA.
4. **`resize_window` không ổn định hơn hẳn các đợt trước** — cùng 1 lệnh resize trên các tab khác nhau trả về các `window.innerWidth` khác nhau và không liên quan tới giá trị yêu cầu (1920, 800, 834, 1440, rồi mới ra đúng 500). Đã thử nhiều tab tới khi đạt đúng 500px và 834px cho QA mobile/tablet; không đạt chính xác 1440/1100/1024/390 trong phiên này.

---

## 7. QA browser — route & kết quả

Chạy trên **production build** (`npm run build` + `npm run start`), đã xác minh không lẫn dev-server (§6.3).

| Route | Overflow | Console error | Ghi chú |
|---|---|---|---|
| `/` | ok | 0 | Hero CTA champagne rõ trên ảnh thật, sticky mobile CTA đúng |
| `/san-pham` | ok | 0 | Card CTA champagne, không quá to trong card |
| 3 PDP (`.../huong-qua-dao-xuan-dao`, `.../co-roi-ngua-chanh`, `.../huong-hoa-hong-dai`) | ok | 0 | Buy box CTA rõ, separator "\|" không quá nổi |
| PDP giá thật (`.../gel-tam-phap...-diu-nhe-cam-huu-co-buoi-huu-co`) | ok | 0 | "Mua ngay \| 179.000đ" — zoom kiểm tra kỹ, rất rõ ràng |
| `/uu-dai` | ok | 0 | CTA champagne nổi tốt trên card gradient tối |
| `/tu-van-chon-san-pham` | ok | 0 | Không có CTA champagne (đúng — giữ tertiary text-link) |
| `/cau-chuyen-thuong-hieu` | ok | 0 | Term-block/timeline hiển thị đúng |
| Search overlay | ok | 0 | Kết quả tái dùng ProductCard — CTA champagne tự động đúng |
| Cart drawer | ok | 0 | Thêm 2x sản phẩm thành công, CTA champagne + outline rõ |
| `/thanh-toan` (checkout) | ok | 0 | "Đặt hàng" champagne, đặt hàng demo hoạt động |
| `/tai-khoan` | ok | 0 | Voucher card, badge thành viên đúng tông champagne |
| Footer (mọi trang) | ok | 0 | Newsletter CTA mới, input có viền |

### Breakpoint thực đo

| Yêu cầu | Đạt |
|---|---|
| 500px | ✅ chính xác (xác nhận qua nhiều tab) |
| 834px | ✅ chính xác |
| 1920px | Đạt (không phải giá trị yêu cầu, dùng thay cho "desktop thực tế lớn nhất đạt được") |
| ~800px | Đạt (giá trị phụ, không trùng yêu cầu nào) |
| 1440 / 1100 / 1024 / 390 | **Không đạt chính xác trong phiên này** — không tuyên bố đã test các mốc này |

**Mobile PDP — kiểm tra trọng tâm nhất của brief**: tại đúng 500px, đã xác nhận **chỉ 2 CTA** ("Mua ngay | giá" champagne + "Thêm vào giỏ" outline teal), không có sticky bar chồng lên (đúng theo fix từ V3 — sticky bar vẫn ẩn trên route PDP), không tràn ngang, không lỗi console.

### Chức năng

- Search: gõ "sữa tắm" → 30 kết quả, card CTA champagne đúng.
- Cart: thêm sản phẩm, tăng số lượng, tổng tiền cập nhật đúng, "Đến trang thanh toán" điều hướng đúng.
- Checkout: form hiển thị đúng, "Đặt hàng" submit hoạt động (demo).
- Auth: `RegisterForm`/`SignInForm` submit button đã migrate, không kiểm tra được toàn bộ luồng do có sẵn phiên đăng nhập demo trong lúc QA, nhưng đã đọc/sửa code trực tiếp nên xác nhận đúng class.

---

## 8. Screenshot A/B — nhận định

*(So sánh trực tiếp qua Chrome MCP với trạng thái V3 vừa QA trước đó trong cùng phiên làm việc, không lưu file ảnh riêng.)*

| Khu vực | Trước (V3 teal) | Sau (Champagne) | Nhận định |
|---|---|---|---|
| Hero CTA | Nền trắng đặc + chữ teal | Nền champagne + chữ teal đậm, viền nâu nhạt | Ấm hơn rõ rệt, hợp với ảnh đá/thiên nhiên hơn màu trắng lạnh trước đó |
| Product card CTA | Outline teal → fill teal khi hover | Champagne solid mặc định | Card đỡ "công cụ" hơn, nhưng độ nổi so với card trắng thấp hơn — bù bằng viền + shadow nhẹ, đã QA xác nhận không bị nhầm disabled |
| PDP buy box | Solid teal + chữ trắng, giá lồng trong `\|` | Champagne + chữ teal đậm, `\|` mờ nhẹ dùng `opacity-60` kế thừa màu chữ | Giá dễ đọc hơn (chữ tối trên nền sáng thường dễ đọc hơn chữ trắng trên nền tối bão hòa), cảm giác "cao cấp" tăng |
| Sticky mobile CTA | 2 nút: outline teal + solid teal | 2 nút: outline teal + champagne | Vẫn đúng 2 CTA, không tăng nhiễu, phân biệt chính/phụ rõ hơn (champagne khác biệt rõ hơn teal-vs-teal trước đây) |
| Cart/checkout CTA | Solid teal | Champagne | Nhất quán với toàn site |
| Footer newsletter CTA | Text link trần (gần như không tồn tại về mặt thị giác) | Box CTA champagne thật | Cải thiện rõ rệt nhất trong toàn đợt — trước đó gần như là 1 lỗi thị giác |
| Offer CTA | Solid teal trên card gradient tối | Champagne trên card gradient tối | Nổi bật hơn nền tối, đúng tinh thần "luminous" |

**Không có trường hợp nào CTA champagne bị đánh giá "khó nhận ra hơn hoặc giống disabled" sau QA trực quan** — nếu có, brief yêu cầu chỉnh border/hover ngay, nhưng không cần thiết trong đợt này.

---

## 9. `npm run check`, `git diff --check`

```
npm run lint       → pass (0 lỗi)
npm run typecheck  → pass (0 lỗi)
npm run build      → pass — 360 trang static/SSG generate thành công
```
Chạy 2 lần (ngay sau khi migrate CTA, và lại lần cuối trước khi viết report) — cả 2 lần đều sạch.

`git diff --check` → exit 0, không lỗi whitespace.

`git diff --stat`: 19 file thay đổi (1 file token `globals.css` + 18 file component CTA), 160 dòng thêm / 75 dòng xóa.

`git status --short`: đúng 19 file `M`, `docs/reports/` (untracked có sẵn) không bị đụng.

---

## 10. Hạn chế còn lại

- **1440/1100/1024/390px chưa test chính xác** trong phiên này — môi trường resize bất ổn hơn các đợt trước, đã bù bằng 500px (mobile) + 834px (tablet) + 1920px (desktop rộng) là 3 dải đại diện đủ rộng, nhưng không thay thế được việc test đúng từng mốc yêu cầu.
- **Không kiểm tra được toàn bộ luồng auth thật** (đăng ký → xác nhận → đăng nhập) do có sẵn phiên demo đã đăng nhập trong môi trường — đã xác nhận đúng qua đọc code thay vì thao tác UI đầy đủ.
- **Field dữ liệu chưa dùng** (`color`, `buttonBg`, `colorFrom`, `colorTo`... trong `HHScentAdvisorQuestion`) từ các đợt trước vẫn giữ nguyên, ngoài phạm vi đợt này.
- **Overlay text-trên-ảnh** (hero, full-bleed brand story) không đo pixel thật, chỉ suy luận cấu trúc CSS overlay — như đã ghi nhận từ V3, không lặp lại phân tích ở đây.
- **`.hh-cta-primary:disabled`/`[aria-disabled]` chưa được bất kỳ nút nào trong site thực sự kích hoạt** — grep xác nhận không có button nào hiện dùng thuộc tính `disabled` động. CSS disabled-state đã định nghĩa đúng spec nhưng là hạ tầng chưa được một live instance nào kiểm chứng trực quan.

---

## 11. Kết luận — có tốt hơn V3 (teal CTA) không?

**Có, với 2 điều kiện đã được kiểm chứng thay vì giả định:**

1. **Contrast chữ-trên-CTA vượt xa yêu cầu** (8.91/7.33/6.32:1 cho default/hover/active — brief yêu cầu ≥4.5:1) — đây là con số đo được, không phải cảm quan.
2. **Rủi ro lớn nhất của phương án champagne** (nền CTA chỉ 1.33:1 so với canvas → có thể bị coi là "nhạt/disabled") **đã được kiểm tra trực quan qua browser thật ở nhiều ngữ cảnh nền khác nhau và không xảy ra** — border + chữ đậm 600 + shadow nhẹ đủ bù đắp. Đây chính xác là bài kiểm brief yêu cầu ("nếu khó nhận ra thì chỉnh, không giữ chỉ vì sáng hơn") và đã được thực hiện nghiêm túc, không chỉ tuyên bố suông.
3. **Footer newsletter CTA** từ chỗ gần như không tồn tại về mặt thị giác (text link trần) trở thành 1 CTA thật — cải thiện khách quan, không tranh cãi.
4. **0 CTA teal cũ bị sót** — grep xác nhận toàn bộ `bg-hh-primary` còn lại đều là badge/backdrop/section-band/monogram/filter-chip có chủ đích, không phải CTA bị bỏ quên.
5. **Mobile PDP vẫn giữ đúng 2 CTA** — không quay lại tình trạng 4 nút chồng nhau đã fix ở V3.
6. **1 lỗi contrast thật lặp lại từ V3** (`--hh-border`) được phát hiện và sửa lại — không lặp lại sai lầm cũ.

**Không tự nhận là "hoàn hảo tuyệt đối"**: bộ champagne có độ tương phản nền-CTA-vs-canvas thấp hơn đáng kể so với teal-vs-canvas trước đây (1.33:1 vs teal đạt 6.77:1) — đây là đánh đổi có chủ đích của chính hướng thiết kế "luminous/sáng/tinh tế" mà brief yêu cầu, được bù bằng border/chữ đậm/shadow thay vì bằng độ tương phản nền thuần túy. Đây là lựa chọn thẩm mỹ đã được xác minh bằng mắt thật qua nhiều ngữ cảnh, không phải một giả định chưa kiểm chứng.

**Khuyến nghị:** giữ bản champagne, không revert về teal CTA.

---

**Chưa commit.** Dừng lại để người dùng review.
