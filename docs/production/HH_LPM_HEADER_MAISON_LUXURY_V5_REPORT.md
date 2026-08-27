# Header Maison Luxury V5 — Premium Navigation Refinement

**Branch:** `hh-lpm-caudalie-ui-parity` (PR #2 vẫn đang mở, không merge, không đụng branch base) · **Ngày:** 2026-07-23

**Phạm vi:** chỉ Header / Desktop Navigation / Mobile Header. Không đụng Hero, Product Card, Footer, hay nội dung trang. Không sao chép logo/font/icon/màu/nội dung/asset Caudalie — chỉ dùng lại design token HH hiện có (`--hh-canvas`, `--hh-surface`, `--hh-primary`, `--hh-primary-dark`, `--hh-ink`, `--hh-muted-foreground`, `--hh-border`) và 2 asset ảnh thật đã tồn tại sẵn trong site (không phải ảnh mới).

**Không commit. Không push.** File đã sửa nằm trong working tree, chờ review.

---

## Giới hạn môi trường (đọc trước khi xem breakpoint)

`resize_window` trong phiên automation này chỉ áp dụng được không nhất quán — nhiều lần yêu cầu resize bị bỏ qua hoặc áp dụng trễ 1 nhịp. Sau nhiều lần thử, 4 breakpoint đo được ổn định và xác nhận bằng `window.innerWidth` thật: **1440, 1024, 834, 500**. Không đạt được 1280, 1100, 390 trong phiên này — nhất quán với hạn chế đã ghi nhận ở các báo cáo trước (`HH_LPM_CAUDALIE_UI_PARITY_MATRIX.md`: "1100/834/390 không đạt được"). Không tuyên bố đã đo các mốc không đạt được.

Vì hạn chế này, **Variant A và Variant B không được A/B bằng screenshot đầy đủ ở cả 1440px và 1280px như yêu cầu gốc** — 1280px không đạt được trong phiên. Quyết định chọn Variant A dựa trên đo đạc thật (số nav item, độ rộng container, độ rộng logo/action cluster) + 1 lần build/đo thật của chính Variant A tại 1440/1024/834/500, không dựng song song Variant B thành code riêng. Đây là đánh đổi phạm vi cần nêu rõ, không che giấu.

---

## Phase 1 — Audit header hiện tại (trước khi sửa)

Đọc toàn bộ: `HHShell.tsx`, `Header.tsx`, `MegaMenu.tsx`, `BrandMegaMenu.tsx`, `MobileDrawer.tsx`, `DemoBanner.tsx`, `PromoBar.tsx`, `globals.css`, `site-content.ts` (NAV_ITEMS, 7 mục: Trang chủ, Sản phẩm[mega], Nguyên liệu, Bài viết, Ưu đãi, Tư vấn chọn mùi, Thương hiệu[mega]).

**Đo bằng computed style/DOM thật tại 1440px (trước sửa):**

| Đại lượng | Giá trị đo được |
|---|---|
| Tổng chiều cao header (3 hàng) | **160px** (60 + 44 + 56) |
| Chrome phía trên nội dung chính (DemoBanner 28 + PromoBar 40 + Header 160) | **228px** |
| Logo lockup | 160.6 × 36px, monogram 36×36, font 14px |
| Nav gap | 24px (`xl:gap-6`) |
| Icon hit area (map pin / account / cart) | **24×24px — bằng đúng kích thước icon, không có padding** |
| Cart badge | 16×16px, font 10px |
| Search trigger row | 1216×40px, hàng riêng, luôn hiện diện |
| Sticky trên desktop | **Không có** — header cuộn mất hoàn toàn (chỉ mobile search-row có `sticky`) |
| Hover state trên nav item | **Không có** — chỉ active state (font-semibold + màu) |

**10 vấn đề ghi nhận (đúng checklist audit):**

1. ✅ Khoảng trắng chết lớn — xác nhận: 3 hàng riêng biệt, mỗi hàng tự padding, tổng 160px cho nội dung thực chất chỉ cần ~85px.
2. ✅ Logo/action row và nav row tách rời — 2 flex-container độc lập, không có liên kết thị giác.
3. Chữ nav không quá nặng, nhưng chiều cao hàng (44px) cảm giác "dày" so với nội dung.
4. ⚠️ Icon cùng size (24px) nhưng **hit area quá nhỏ** — vấn đề thật là touch target, không phải optical size.
5. Cart badge (16px/10px) đã tạm ổn, nằm trong dải spec — không phải vấn đề nghiêm trọng.
6. Border gần như không tồn tại ở desktop (chỉ có ở mobile search-row) — không phải "quá dễ thấy", mà là không nhất quán.
7. ✅ **Không có hover state nào trên nav item** — xác nhận qua đọc code, không có `hover:` class nào trên Link/button nav.
8. ✅ Mega menu là grid tile phẳng, hover đổi nền, không có cột editorial/ảnh thật.
9. ✅ **Sticky desktop không tồn tại** — nghiêm trọng hơn "chưa tạo cảm giác chuyển trạng thái", header biến mất hoàn toàn khi cuộn.
10. ✅ Mobile header **2 hàng hiển thị** (logo/action 60px + hamburger/search 56px = 117px), không phải 1 hàng như mục tiêu.

Ảnh before lưu tại `docs/production/screenshots/header-maison-v5/before/{1440,1024,834,500}-before.jpg`.

---

## Phase 2–3 — Quyết định kiến trúc: Variant A (Single Premium Row)

**Đo khả thi trước khi chọn:** tại 1024px (mốc hẹp nhất cần giữ không-wrap), 7 nav item + logo + action cluster đo được tổng nhu cầu ngang **~750px cho riêng nav** ở gap/font gốc — vượt ngân sách khả dụng (~944px trừ container gap/padding, trừ logo ~196px, trừ 4 action ~172px = ~512px còn lại cho nav). Điều này **loại trừ khả năng giữ nguyên gap-7/text-15px ở single-row tại 1024px** — phải giảm gap/font responsive.

**Quyết định: chọn Variant A (single row)**, không dựng Variant B (compact two-row) thành code — lý do đo được: ngay cả sau khi consolidate, tổng nội dung (logo + 7 nav + 4 action) vẫn fit 1 hàng ~87px tại 1024px sau khi giảm gap/font hợp lý (xem Phase 7), nên two-row không mang lại lợi ích gì ngoài 50px+ chiều cao dư thừa mà chính audit Phase 1 đã gắn cờ là vấn đề #1. Brief cũng ưu tiên rõ: "Ưu tiên phương án single-row nếu nó đạt đủ chức năng và không làm navigation chật."

**Kiến trúc đã build và đo thật (không phải ước tính):**

| Đại lượng | Mục tiêu | Đo được (1440px) | Đo được (1024px) |
|---|---|---|---|
| Tổng chiều cao desktop | 80–88px | **87px** | **87px** |
| Chiều cao khi sticky/scrolled | giảm 8–14px | **giảm 12px → 75px** | (chưa đo riêng, cùng logic) |
| Nav wrap | không được wrap | **không wrap** | **không wrap** |
| Horizontal overflow | không được có | — | **0 (đã sửa, xem Phase 7 bug)** |

---

## Phase 4 — Utility Actions

Chuẩn hóa: `ACTION_BUTTON` dùng chung cho search/store/account/cart — `size-10` (40×40px hit area, đúng spec tối thiểu), icon `size-6` (24px) căn giữa, cùng stroke (lucide mặc định), cùng hover (`hover:bg-hh-surface-soft`), cùng focus-visible ring.

**Store locator ("Tìm cửa hàng"):** trước đây là `<button>` không có `onClick` — icon trang trí thuần túy, vi phạm "không giữ icon chỉ để trang trí". Đã sửa theo đúng hướng spec cho phép: `disabled`, `title="Đang cập nhật"`, `aria-label="Tìm cửa hàng — đang cập nhật"`, `opacity-40 cursor-not-allowed`. Cũng thêm dòng tương ứng vào panel dưới cùng của `MobileDrawer` (trước đây hoàn toàn không có store locator ở mobile).

**Cart badge:** `h-[17px] min-w-[17px]`, nền `--hh-primary`, chữ trắng 10px, vị trí `right-1 top-1` bên trong button 40×40 (không dán sát góc icon như trước — trước đây badge nằm `-right-2 -top-2` NGOÀI vùng icon 24×24). Hiển thị `99+` khi vượt 2 chữ số. `aria-label` đọc được số lượng: `"Giỏ hàng, N sản phẩm"`.

Tất cả 4 action đều có `aria-label`, `focus-visible:outline`, kích hoạt được bằng bàn phím (native `<button>`/`<Link>`), không có layout shift khi cart count đổi (badge là absolute, không đẩy icon).

---

## Phase 5 — Sticky/Scroll State

Không dùng scroll listener. Dùng `IntersectionObserver` quan sát 1 sentinel `<div className="h-px">` đặt ngay tại vị trí gốc của header (trước `<header>` trong DOM) — khi sentinel rời viewport, `scrolled=true`.

- Header luôn `sticky top-0 z-30`.
- Khi `scrolled`: `border-b border-hh-border`, `hh-shadow-sm`, `backdrop-blur-sm` + `bg-hh-surface/95` (chỉ khi trình duyệt hỗ trợ `backdrop-filter`, qua `supports-[backdrop-filter]`), padding giảm (py-5→py-4), monogram giảm (46px→42px).
- **Đo thật:** 87px → 75px (giảm 12px, đúng dải 8–14px mục tiêu).
- `transition-[box-shadow,border-color,background-color] duration-300 motion-reduce:transition-none` — tôn trọng `prefers-reduced-motion` qua Tailwind `motion-reduce:` variant.
- Không bounce, không opacity-flash, không biến mất, không resize theo từng pixel (chỉ 1 state boolean, không phải giá trị liên tục theo scrollY).

Xác nhận trực tiếp bằng browser: cuộn xuống → header dính đúng ở top:0, giảm kích thước mượt, không content-jump, không mất focus.

---

## Phase 6 — Mega Menu Editorial

Cả 2 mega menu (`MegaMenu.tsx` — "Sản phẩm", `BrandMegaMenu.tsx` — "Thương hiệu") viết lại thành panel 4-cột:

**"Sản phẩm":** Cột 1–2 chia 7 `HH_CATEGORIES` (4+3, cột 2 có thêm "Xem tất cả sản phẩm"). Cột 3 "Tư vấn & khám phá": Tư vấn chọn mùi, Nguyên liệu, Bài viết, Thư viện sản phẩm hãng. Cột 4: ảnh thật + route thật — ingredient "Hoa cam" (`/nguyen-lieu/fleur-d-oranger`, ảnh `/images/hh/ingredients/fleur-d-oranger/main.jpg`) — xác nhận `fleur-d-oranger` là **slug canonical** (không phải bản duplicate phụ) qua `content-duplicates-derived.json`.

**"Thương hiệu":** 6 link cũ + heading, cột 4 editorial feature dùng trang "Provence, một vùng đất trù phú" (`/noi-dung-thuong-hieu/provence-mot-vung-dat-tru-phu`, ảnh `/images/hh/brand/provence-mot-vung-dat-tru-phu/main.jpg`) — cũng xác nhận là slug canonical, `dedicatedRoute: null`.

**Không có ảnh/route giả nào được tạo** — cả 2 ảnh + cả 2 route đều đã tồn tại và đang phục vụ ở nơi khác trong site trước khi V5 bắt đầu; V5 chỉ tái sử dụng.

**Interaction:**
- Mở sau delay 120ms khi hover (`MEGA_OPEN_DELAY`), huỷ delay nếu chuột rời trước khi kịp mở — tránh flicker khi lướt ngang qua nav bar.
- Click cũng mở/đóng (toggle).
- Escape đóng + trả focus về đúng trigger đã mở panel.
- Click ngoài đóng (qua `pointerdown` listener kiểm tra `navRef.current.contains`).
- Di chuyển chuột từ trigger xuống panel không đóng (panel có `onMouseEnter` huỷ mọi timer đóng).
- **Xác nhận qua JS:** `document.body.style.overflow` vẫn rỗng khi mega mở — không body-scroll-lock trên desktop, đúng yêu cầu.
- `aria-expanded`, `aria-controls` đầy đủ trên cả 2 trigger; xác nhận qua DOM chỉ đúng 1 trigger có `aria-expanded="true"` tại 1 thời điểm.

Typography: heading nhóm 11px uppercase letter-spacing, link 14px, không dùng serif, mỗi link không phải button riêng biệt (giữ đúng "không biến mỗi link thành button").

---

## Phase 7 — Responsive Behavior

**≥1024px (desktop, dùng breakpoint `lg` sẵn có của Tailwind, không đổi quy ước cũ):** single row, không wrap.

**🔴 Bug thật phát hiện và đã sửa trong phiên này:** sau khi build Variant A lần đầu với gap/font cố định (giữ nguyên `text-[15px]`, `gap-7/xl:gap-9`, wordmark luôn hiện), đo tại 1024px cho kết quả **`document.body.scrollWidth = 1221px > innerWidth 1024px`** — tràn ngang thật (action cluster bị đẩy ra ngoài viewport 197px). Nguyên nhân: 7 nav item ở `text-[15px]` + gap 28px có nội dung tự nhiên rộng 750px, không đủ chỗ trong ngân sách ~512px còn lại sau khi trừ logo+actions. Đã sửa bằng 3 thay đổi:
1. Wordmark logo ("Hoàng Hà" / "LE PETIT MARSEILLAIS") ẩn dưới `xl` (1280px), chỉ hiện monogram — tiết kiệm ~150px.
2. Nav font `text-[14px]` (base) → `xl:text-[15px]`; nav gap `gap-5` (base) → `xl:gap-8`.
3. Gap giữa logo/nav/actions trong hàng chính: `gap-4` (base) → `xl:gap-10`.

**Đo lại sau fix:** `bodyScrollWidth = 1009px < innerWidth 1024px` — **0 overflow**, nav vẫn không wrap, header vẫn 87px. Xác nhận bằng screenshot: 1024px hiện đúng single row, monogram-only logo, 7 nav item + 4 action đều hiển thị đủ, không chen chúc.

**<1024px (mobile, dùng đúng breakpoint `lg` hiện có):** single row thật (trước đây là 2 hàng hiển thị — đã sửa). Cấu trúc: hamburger trái, logo **giữa** (monogram + tên thương hiệu, chọn theo A/B vì phù hợp cảm giác cao cấp hơn logo-trái khi chỉ còn 1 hàng), tối đa 3 action phải (search, account, cart — store locator chuyển hẳn vào drawer).

- **Đo tại 834px:** header height **65px** (dải mục tiêu 60–68px ✓), 0 horizontal overflow.
- **Đo tại 500px:** header height **65px**, 0 horizontal overflow.
- **Đánh đổi UX cần nêu rõ:** search không còn là thanh input luôn hiện (trước đây chiếm nguyên 1 hàng 56–57px) mà trở thành icon trigger mở `SearchOverlay` — bắt buộc về mặt hình học để đạt "1 hàng, tối đa 3 action, 60–68px" theo đúng yêu cầu Phase 7; giảm mức độ gợi ý tìm kiếm ngay lập tức trên trang, đổi lại bằng chiều cao header giảm gần một nửa.

**Mobile Drawer:** không đổi cấu trúc chính (header riêng, accordion nhóm, focus trap có sẵn qua `useFocusTrap`, tap target ≥44px ở các hàng chính) — chỉ thêm 1 dòng store-locator disabled ở cuối.

---

## Phase 8 — Visual Detail

Chỉ dùng token đã có: `bg-hh-primary`, `bg-hh-surface`, `border-hh-border`, `text-hh-ink`, `text-hh-muted-foreground`, `hover:bg-hh-surface-soft`, `hh-shadow-sm`. Không thêm hex one-off nào mới. Không gradient, không glassmorphism mạnh (chỉ `backdrop-blur-sm` rất nhẹ khi scrolled, có fallback `supports-[backdrop-filter]`), không pill-nav, không nhiều shadow (chỉ `hh-shadow-sm` khi scrolled), không ornament. Border chỉ xuất hiện khi `scrolled` (trước đó `border-transparent`) — nhẹ hơn bản có border cố định, vẫn đủ tương phản (`--hh-border: #c2b8a4`, đã deepened từ trước, không đổi trong V5).

Hover nav dùng underline-reveal (`scale-x-0 → scale-x-100`, `origin-left`, 200ms) thay vì đổi nền — đúng "không pill background cho mọi nav item". Active dùng cùng cơ chế underline nhưng `scale-x-100` cố định + màu `--hh-primary` (đậm hơn hover `--hh-primary-dark` một chút, đúng phân cấp "active rõ hơn hover nhưng không quá mạnh").

---

## Phase 9 — Functional Safety

Xác nhận trực tiếp bằng browser (dev server + standalone production preview):

| Kiểm tra | Kết quả |
|---|---|
| Search mở lần đầu | ✅ Đúng, overlay hiện danh mục gợi ý |
| Cart mở lần đầu (đã đăng nhập/chưa) | ✅ Đúng, giữ nguyên cart persistence từ fix trước |
| Auth (click icon account khi chưa đăng nhập) | ✅ Logic đúng qua code (`user ? Link : button onClick=openAuth`); khi đã đăng nhập, click điều hướng đúng `/tai-khoan` |
| Cart count cập nhật trên badge | ✅ Đúng |
| Esc đóng overlay | ✅ Đúng (mega menu, search, cart đều test) |
| Click ngoài đóng mega menu | ✅ Đúng (`pointerdown` outside-check) |
| Focus restore sau khi đóng mega | ✅ Giữ nguyên cơ chế cũ, không đổi logic |
| Direct refresh (`navigate` lại đúng URL) | ✅ Header/cart/mega đều render đúng sau full reload |
| SEO / hydration | ✅ 0 lỗi hydration thật (chỉ có 1 warning từ chính extension Chrome automation tiêm `bis_register` vào `<body>` — đã phân biệt rõ, không phải lỗi app) |
| Cart persistence (fix trước đó) | ✅ Không bị ảnh hưởng — verify lại qua PDP → thanh toán, vẫn giữ đúng sản phẩm |

`SiteUIContext` **không bị đụng** trong đợt này (chỉ Header/MegaMenu/BrandMegaMenu/MobileDrawer thay đổi) — đúng yêu cầu "Không thay logic SiteUIContext ngoài phần thật sự cần cho header".

---

## Phase 10 — Screenshot A/B

Lưu tại `docs/production/screenshots/header-maison-v5/`:
- `before/{1440,1024,834,500}-before.jpg`
- `final/{1440,1024,834,500}-final.jpg` + `final/1440-final-megamenu.jpg`

*(Variant A là phương án duy nhất được dựng thành code và chụp — xem ghi chú giới hạn ở đầu báo cáo về lý do không dựng song song Variant B.)*

| Hạng mục | Before | Final (Variant A) |
|---|---:|---:|
| Tổng chiều cao (1440px) | 160px | **87px** |
| Tổng chiều cao khi sticky/scrolled | — (không có sticky) | **75px** |
| Logo size | monogram 36px | monogram 46px (42px khi scrolled) |
| Nav gap (1440px) | 24px | 40px (`xl:gap-10`) |
| Nav gap (1024px) | 24px (nhưng gây tràn khi build V5 ban đầu) | 20px (`gap-5`, đã fix tràn) |
| Icon hit area | 24×24px | **40×40px** |
| Header-to-content (chrome phía trên `<main>`) | 228px | **~155px** (87 header + 28 DemoBanner + 40 PromoBar) |
| Mega menu width | full-width, 2 cột tile phẳng | full-width, 4 cột editorial + ảnh thật |
| Mobile header height (500/834px) | 117px (2 hàng hiển thị) | **65px (1 hàng)** |

Không kết luận "đẹp hơn" chỉ bằng cảm nhận — mọi con số trên đều đo bằng `getBoundingClientRect()`/computed style qua `javascript_tool`, không ước lượng bằng mắt.

---

## Phase 11 — QA

**Production standalone preview thật** (`npm run build && npm run prepare:standalone && HOSTNAME=127.0.0.1 PORT=4173 npm run start`), không dùng `next start`.

Route đã kiểm tra trực tiếp (dev + standalone): `/`, `/san-pham`, 1 PDP thật, `/thanh-toan`, `/reference/category` (xác nhận **không bị ảnh hưởng** — vẫn dùng header Caudalie clone riêng, tách biệt hoàn toàn khỏi `HHShell`/`Header` mới).

| Kiểm tra | Kết quả |
|---|---|
| Nav không wrap (1024px) | ✅ |
| Horizontal overflow | ✅ 0 (sau khi sửa bug Phase 7) |
| Header không che nội dung | ✅ (sentinel + sticky đo đúng offset) |
| Sticky offset đúng | ✅ `top:0`, không content-jump |
| Mega menu không flicker | ✅ (delay 120ms + huỷ timer đúng) |
| Mega menu keyboard | ✅ Escape + focus-restore; Tab/click hoạt động qua `<button>`/`<Link>` chuẩn |
| Mobile drawer hoạt động | ✅ Mở/đóng đúng, có thêm dòng store-locator |
| Search/Cart/Auth hoạt động | ✅ |
| Cart badge đúng | ✅ |
| Không `href="#"` mới | ✅ Không thêm link giả nào |
| Không dead icon | ✅ Store locator giờ trung thực (disabled + tooltip), không còn icon trang trí vô nghĩa |
| Console error | ✅ 0 lỗi thật (đã phân biệt noise từ extension automation) |
| Hydration error | ✅ 0 |
| Chunk/font/image 404 | ✅ 0 (2 ảnh mega menu tải thành công, `naturalWidth` > 0 xác nhận) |
| CLS khi sticky đổi trạng thái | Không đo bằng Lighthouse; quan sát trực tiếp không thấy giật/nhảy nội dung khi cuộn |
| Không cắt dấu tiếng Việt | ✅ Toàn bộ nav/mega menu tiếng Việt hiển thị đúng |

**Command results:**
```
npm run lint       → 0 lỗi
npm run typecheck  → 0 lỗi
npm run build      → PASS (356 trang, không đổi so với trước)
npm run check      → PASS
git diff --check   → CLEAN
```

---

## Chấm điểm

| Hạng mục | Điểm | Ghi chú |
|---|---|---|
| Visual balance | 8.5 | Single-row đạt cân bằng logo/nav/action rõ; wordmark ẩn ở 1024-1279px là đánh đổi có kiểm soát. |
| Luxury perception | 8 | Underline-reveal, mega menu editorial nâng cảm giác rõ rệt so với before; chưa đạt 9 vì asset ảnh/nội dung vẫn giới hạn (chỉ 2 ảnh thật khả dụng cho toàn bộ mega menu). |
| Navigation clarity | 8.5 | Hover/active rõ ràng, không wrap ở mọi breakpoint đo được, đã sửa bug tràn ngang thật tại 1024px. |
| Mega menu | 8 | 4 cột thật, ảnh+route thật, interaction đầy đủ (delay/Escape/outside-click/no-scroll-lock) — đạt mục tiêu tối thiểu 8/10. |
| Sticky behavior | 8.5 | IntersectionObserver, giảm đúng dải 8–14px, tôn trọng reduced-motion. |
| Mobile header | 8 | Đúng 1 hàng, 60–68px, tối đa 3 action — đạt mục tiêu tối thiểu 8/10; đánh đổi mất search-bar luôn hiện. |
| Accessibility | 8.5 | aria-label/aria-expanded/aria-controls/focus-visible/focus-restore đầy đủ; không tự động test screen-reader thật trong phiên này. |
| Functional stability | 9 | 0 regression Search/Cart/Auth/cart-persistence xác nhận qua browser thật; `SiteUIContext` không bị đụng. |

**Trung bình 8 mục: 8.4/10.**

### Đối chiếu Acceptance Criteria

| Tiêu chí | Mục tiêu | Đạt được | Kết quả |
|---|---|---|---|
| Header score tối thiểu | 8.5 | 8.4 (trung bình) | ⚠️ Sát ngưỡng, chưa chắc chắn đạt — không làm tròn lên để "vừa đạt". |
| Tổng chiều cao desktop giảm rõ | — | 160→87px (−46%) | ✅ Đạt |
| Không khoảng trắng chết | — | Xác nhận qua đo, không còn hàng dư | ✅ Đạt |
| Nav không wrap tại 1024px | — | Xác nhận + đã sửa 1 bug tràn ngang thật | ✅ Đạt |
| Icon cùng optical size | — | Cùng 24px icon trong cùng 40×40 button | ✅ Đạt |
| Cart badge tinh tế | — | 17px, trong vùng button, không dán góc | ✅ Đạt |
| Mega menu ≥8/10 | 8 | 8 | ✅ Đạt (biên) |
| Mobile header ≥8/10 | 8 | 8 | ✅ Đạt (biên) |
| Không regression Search/Cart/Auth | — | Xác nhận qua browser thật | ✅ Đạt |
| Không copy asset Caudalie | — | Xác nhận — chỉ dùng token/ảnh HH có sẵn | ✅ Đạt |

---

## Hạn chế còn lại

1. **Breakpoint 1280/1100/390 không đo được** trong phiên automation này (môi trường resize không ổn định) — chỉ xác nhận 1440/1024/834/500.
2. **Variant B không được dựng thành code song song** để so sánh pixel-thật — quyết định chọn A dựa trên đo đạc khả thi + build thật của A, không phải so sánh trực tiếp A/B cùng lúc.
3. **Search không còn thanh input luôn hiện** (cả desktop lẫn mobile) — đổi thành icon trigger để đạt mục tiêu chiều cao; đây là thay đổi UX thật, không chỉ thẩm mỹ, cần xác nhận với đội ngũ business trước khi launch nếu discoverability tìm kiếm là ưu tiên cao.
4. **Wordmark logo ẩn ở dải 1024–1279px** (chỉ hiện monogram) — đánh đổi bắt buộc về mặt hình học để tránh tràn ngang; cân nhắc lại nếu có thêm không gian sau này (VD: rút gọn số nav item hoặc đổi label ngắn hơn).
5. Store locator vẫn ở trạng thái "Đang cập nhật" vĩnh viễn cho tới khi có route/chức năng thật — đã ghi nhận từ trước ở Final Release Candidate Report, không phải vấn đề mới.
6. CLS khi sticky đổi trạng thái chỉ được xác nhận bằng quan sát trực tiếp, không đo bằng Lighthouse/Web Vitals thật trong phiên này.

**Không commit. Không push. Dừng lại để người dùng review screenshot before/final tại `docs/production/screenshots/header-maison-v5/`.**
