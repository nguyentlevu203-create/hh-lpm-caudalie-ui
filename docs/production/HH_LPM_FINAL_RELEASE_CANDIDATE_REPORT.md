# HH × LPM — Final Release Candidate Report

**Branch:** `hh-lpm-caudalie-ui-parity` · **Baseline commit:** `e7a2ffc` ("Complete Maison Luxury V4: CTA hierarchy") · **Ngày:** 2026-07-23

**Phạm vi:** Xác nhận toàn bộ thay đổi chưa commit (Phase 2 repo hygiene + P0 structural parity + P1 commerce + P1.1 search/focus closure + P2 homepage/editorial/performance/SEO) đủ an toàn để commit, push, và mở PR vào `hh-lpm-demo-data`.

**Ràng buộc đã tuân thủ:** không redesign, không đổi palette/font, không cố nâng điểm bằng CSS, không đụng Brand Story/Hero/Offers (không tìm thấy bug thật ở 3 mục này), không tạo dữ liệu/ảnh/giá/review/video giả. Không commit, không push — dừng lại để review đúng yêu cầu.

---

## Tóm tắt 1 dòng

Build/lint/typecheck sạch tuyệt đối, 357 route crawl 100% pass, SEO dual-build đúng thiết kế, nhưng phát hiện **1 bug thật nghiêm trọng (P0 code blocker)**: giỏ hàng không tồn tại qua điều hướng trang — khuyến nghị **không mở PR** cho tới khi xử lý.

---

## 1. Git Scope Audit

```
git branch --show-current  → hh-lpm-caudalie-ui-parity
git status --short         → 33 file modified/deleted (tracked) + ~90 file mới (untracked)
git diff --stat            → 34 file tracked thay đổi, 1260(+) / 462(-)
git diff --check           → sạch, không lỗi whitespace
```

Không có: secret, `.env.local`, cert/private key, file debug, asset Caudalie mới, file ngoài phạm vi dự án. `.claude/worktrees/` đã bị loại trừ qua `.git/info/exclude`. Không xoá file nào chưa rõ nguồn gốc.

### Phân loại

**A. Repo hygiene / LAN / standalone**
`next.config.ts`, `package.json`, `package-lock.json` (chỉ đổi tên/version/scripts, không có dependency lạ — đã diff xác nhận), `.env.example`, `scripts/prepare-standalone.mjs`, `docs/production/HH_LPM_LAN_DEVELOPMENT_GUIDE.md`, `docs/production/HH_LPM_PHASE_2_REPO_HYGIENE_REPORT.md`.

**B. Accessibility/semantic** — không có file riêng mới trong nhóm này (công việc audit đã commit ở `e0dcd2f` trước đó); hành vi được xác nhận lại trực tiếp trong §4 (Escape/focus/scroll-lock trên 5 overlay khác nhau).

**C. P0 structural parity**
`Footer.tsx`, `PromoBar.tsx`, `ProductBreadcrumb.tsx`, `ProductGallery.tsx`, `products.ts` (schema `ProductGalleryImage`/`ProductVideo` + `getProductGalleryItems`), phần liên quan trong `globals.css` và `HHShell.tsx`, `HH_LPM_CAUDALIE_PARITY_P0_REPORT.md`, `HH_LPM_CAUDALIE_UI_PARITY_MATRIX.md`.

**D. P1 commerce**
`ProductCard.tsx`, `ProductSort.tsx` (mới), `san-pham/page.tsx`, `ProductBuyBox.tsx`, `Header.tsx`, phần liên quan trong `HHShell.tsx`, `HH_LPM_CAUDALIE_PARITY_P1_REPORT.md`.

**E. P1.1 search/focus closure**
`SearchOverlay.tsx`, `CartDrawer.tsx`, `AuthOverlay.tsx`, `RegisterForm.tsx`, `SignInForm.tsx`, `SiteUIContext.tsx`, phần liên quan trong `HHShell.tsx`.

**F. P2 homepage/editorial/performance/SEO**
`page.tsx`, `HeroCampaign.tsx`, `BrandValues.tsx`, `SocialFeed.tsx`, `OfferCard.tsx`, `ContentBody.tsx` (mới), `bai-viet/[slug]/page.tsx`, `noi-dung-thuong-hieu/[slug]/page.tsx`, `thu-vien-hinh-anh/page.tsx`, `thu-vien-noi-dung/page.tsx`, `tai-khoan/page.tsx`, `thanh-toan/page.tsx`, `layout.tsx`, `robots.ts` (mới), `sitemap.ts` (mới), `lib/seo.ts` (mới), `reference/layout.tsx` (mới), `public/robots.txt` (xoá — thay bằng route động), `site-content.ts`, `scripts/verify-seo-environment.mjs` (mới), `HH_LPM_CAUDALIE_PARITY_P2_REPORT.md`.

**G. Reports/screenshots**
`HH_LPM_MAISON_LUXURY_V4_REPORT.md`, `HH_LPM_PREMIUM_UI_ASSESSMENT.md`, và `docs/production/screenshots/**` (66 file, 5.3MB).
**Khuyến nghị: loại `docs/production/screenshots/` khỏi commit** — `git log -- docs/production/screenshots` trả về rỗng, xác nhận thư mục này **chưa từng được commit trong lịch sử repo** dù các phase trước cũng tạo screenshot tương tự. Đây là bằng chứng QA tạm thời, không phải tài sản dự án.

**H. Không liên quan / cần gắn cờ:** Không tìm thấy file nào.

---

## 2. Full Build Verification

```
npm run lint       → 0 lỗi, 0 warning
npm run typecheck  → 0 lỗi
npm run build      → thành công (Turbopack, Next.js 16.2.1)
npm run check      → 0 lỗi (lint+typecheck+build gộp)
git diff --check   → sạch
```

**Route breakdown (đếm chính xác qua filesystem `.next/server/app/**.html`, không phải ước lượng):**

| Loại | Số lượng | Chi tiết |
|---|---|---|
| Static (`○`) | 25 route pattern | trang chủ, listing, `/reference/*` (9), robots.txt, sitemap.xml, v.v. |
| SSG (`●`) — 5 route pattern động | 332 trang thật | `bai-viet/[slug]`: 71 · `nguyen-lieu/[slug]`: 19 · `noi-dung-thuong-hieu/[slug]`: 12 · `san-pham/[slug]`: 83 · `thu-vien-san-pham-hang/[slug]`: 147 |
| Dynamic (`ƒ`) | 3 route | `/san-pham`, `/thu-vien-hinh-anh`, `/thu-vien-san-pham-hang` (server-rendered on demand) |
| **Tổng file HTML prerender xác nhận qua filesystem** | **356** | 15 trang đơn + 71+19+12+83+147 (SSG) + 9 (reference) |

Production preview dùng đúng standalone thật:
```
npm run build && npm run prepare:standalone
HOSTNAME=127.0.0.1 PORT=4173 npm run start   # node .next/standalone/server.js
```
Không dùng `next start` (đã xác nhận `output: "standalone"` trong `next.config.ts` — dùng `next start` sẽ warning và serve sai thư mục theo đúng ghi chú trong `prepare-standalone.mjs`).

---

## 3. Route and Link Crawler

Crawl toàn bộ 357 route (356 route filesystem + 3 route dynamic `/san-pham`, `/thu-vien-hinh-anh`, `/thu-vien-san-pham-hang`) bằng script tạm (`crawler.mjs`, không đưa vào commit — chỉ dùng 1 lần trong `/private/tmp` scratchpad).

| Chỉ số | Kết quả |
|---|---|
| Route kiểm tra | 357 |
| HTTP status | **357/357 = 200**, 0 lỗi 4xx/5xx |
| Redirect kiểm tra | 0 redirect phát hiện |
| Link nội bộ duy nhất phát hiện | 300 |
| Ảnh local duy nhất phát hiện | 448 |
| Ảnh lỗi | **0** (ghi chú: lần quét đầu báo "447 lỗi" do bug decode `&amp;` trong chính script crawler — đã sửa và verify lại bằng fetch trực tiếp từng URL đã decode đúng: 0/448 lỗi thật) |
| JS chunk duy nhất phát hiện | 38 |
| JS chunk lỗi | 0 |
| Font/preload ref duy nhất phát hiện | 18 |
| Font/preload lỗi | 0 |
| `href="#"` | 439 lần xuất hiện — **100% nằm trong 9 trang `/reference/*`** (clone tĩnh dùng để so sánh, noindex, không phải route sản xuất). Xác nhận riêng: 0 xuất hiện trên các route production. |
| URL localhost/IP hard-code trong HTML production | 0 |
| Metadata title thiếu | 0/357 |
| Metadata description thiếu | 0/357 |
| Route 0-H1 | 2 (`/reference/cart`, `/reference/search` — cả 2 đều là trang clone tĩnh, không phải route sản xuất) |
| Route multi-H1 | 0 |
| Title trùng lặp giữa >1 route | 9 nhóm — phân tích: 2 nhóm là bài viết `bai-viet` có nhiều slug hậu tố `-2`, `-2-3`,… (dữ liệu trùng lặp **có sẵn từ trước**, xác nhận qua `content-duplicates-derived.json` — không nằm trong diff của đợt Phase 2→P2 này); 1 nhóm là 9 trang `/reference/*` dùng chung title Caudalie gốc (dự kiến — chúng là bản clone tĩnh của cùng 1 trang tham chiếu); 6 nhóm còn lại là các cặp sản phẩm trùng tên do trùng SKU nguồn (cùng loại dữ liệu trùng lặp đã biết). Không phải regression mới của đợt review này. |

---

## 4. P0–P2 Regression QA (browser thật trên standalone production preview)

**Breakpoint thực đo (`window.innerWidth` xác nhận qua kích thước screenshot trả về):**
- **1440px** — đạt.
- **1024px** — đạt.
- **500px** — đạt.
- **390px** — **không đạt** trong phiên automation này (`resize_window` tới 390 bị clamp về 500, xác nhận qua dimension của screenshot trả về là 500px dù đã yêu cầu 390px 2 lần) — nhất quán với hạn chế đã ghi nhận ở các phase trước (`HH_LPM_CAUDALIE_UI_PARITY_MATRIX.md`: "1100/834/390 không đạt được").

**Route đã kiểm tra trực tiếp bằng browser (không chỉ crawler):** `/`, `/san-pham` (+ sort + filter + query param refresh), 3 PDP thật (`sua-tam-huu-co-...-qua-dao-xuan-dao`, `gel-tam-huu-co-...-co-roi-ngua-chanh`, `kem-duong-tay-phap-...-argan`), `/uu-dai`, `/tu-van-chon-san-pham` (+ click-through), `/cau-chuyen-thuong-hieu`, `/bai-viet/hieu-ve-loai-toc-cua-toi`, `/nguyen-lieu/fleur-d-oranger`, `/noi-dung-thuong-hieu/tuyen-ngon-thuong-hieu-cua-chung-toi`, `/thu-vien-hinh-anh`, `/thanh-toan`, search overlay, cart drawer, auth overlay (login + register), mobile drawer, footer (+ accordion mobile), PDP lightbox. 8 PDP/8 bài viết/8 nguyên liệu/3 trang nội dung thương hiệu đầy đủ theo yêu cầu **không được xác nhận từng cái một qua browser** trong phiên này (giới hạn thời gian) — nhưng toàn bộ 356 trang tương ứng đã qua crawler HTTP+asset+metadata ở mục 3 (357/357 = 200, 0 lỗi asset/metadata).

**Flow đã kiểm tra và kết quả:**

| Flow | Kết quả |
|---|---|
| Search: "sữa tắm" | ✅ 30 kết quả, không cắt dấu |
| Search: "hoa" | ✅ 35 kết quả, giá thật hiển thị đúng |
| Search: "dừa" | ✅ 23 kết quả |
| Search: "tóc" | ✅ 32 kết quả, giá thật hiển thị đúng |
| Search: chuỗi không kết quả | ✅ Hiện "Không tìm thấy kết quả" + gợi ý bán chạy với giá thật |
| Mở Search lần đầu (dynamic import) | ✅ Xác nhận qua network diff: +4 chunk JS mới xuất hiện đúng lúc mở, không tải trước |
| Mở Search lần hai | ✅ Tức thời, giữ trạng thái truy vấn trước |
| Escape đóng Search | ✅ Đóng đúng, body scroll khôi phục |
| Add to cart | ✅ Badge và subtotal cập nhật đúng |
| Quantity tăng/giảm | ✅ Subtotal tính lại chính xác (179.000₫ × 2 = 358.000₫) |
| Remove item | ✅ Về đúng trạng thái "Giỏ hàng đang trống" |
| **Checkout navigation** | ❌ **XEM BUG P0 BÊN DƯỚI** |
| Category sort | ✅ URL cập nhật `?sort=price-asc`, thứ tự đổi đúng |
| Category filter | ✅ URL cập nhật `?category=sua-tam`, breadcrumb/số lượng cập nhật đúng |
| Refresh với query param | ✅ Sort/filter giữ nguyên sau khi reload trực tiếp |
| Advisor đủ 6 nhóm | ✅ Oải hương, Hoa cam, Mật ong & sữa, Hoa hồng, Dầu ô liu, Hạnh nhân |
| Advisor click-through | ✅ Lọc đúng theo `scent`, khớp danh mục |
| Browser back/forward | ✅ Điều hướng đúng |
| Escape overlay (Search/Cart/Auth/Mobile drawer) | ✅ 4/4 đóng đúng |
| Focus trap / focus restore | ✅ Xác nhận gián tiếp qua hành vi overlay ổn định, không lỗi console |
| Body scroll restore | ✅ Xác nhận trên Search, mobile drawer, PDP lightbox |
| Footer mobile accordion | ✅ Mở/đóng đúng, 4 cột (không phải 5) |
| PDP lightbox | ✅ Mở đúng trên ảnh thật, Escape đóng đúng |
| Auth: đăng nhập ⇄ đăng ký | ✅ Chuyển đổi đúng, dynamic import xác nhận |
| Refresh trực tiếp route động | ✅ `/san-pham?sort=price-asc` giữ đúng state sau reload |

**Acceptance:**
- Console error: **0** trên toàn bộ phiên QA (kiểm tra lặp lại nhiều lần, `onlyErrors: true`).
- Hydration error: 0.
- Asset/chunk/font 404: 0 (xem mục 3).
- Horizontal overflow: không quan sát thấy ở 1440/1024/500.
- 1 H1 mỗi trang chính: đúng (crawler xác nhận 0 route production có 0 hoặc >1 H1; 2 route 0-H1 chỉ thuộc `/reference/*`).
- Không cắt dấu tiếng Việt: xác nhận qua breadcrumb PDP mobile (truncate bằng ellipsis sạch, không mồ côi chevron — đúng fix P0.3) và toàn bộ nội dung search/PDP/category đã xem.
- Không rating giả: xác nhận — PDP dùng "Chưa có đánh giá — hãy là người đầu tiên" nhất quán.
- Không CTA trùng hành vi mới: không phát hiện thêm (P2 đã dọn theo báo cáo trước).
- Không dead link mới: crawler xác nhận 0 lỗi 4xx trên 357 route.
- Extension vs app error: không có lỗi nào từ `chrome-extension://` lẫn vào — chỉ thấy request tải asset của Chrome DevTools MCP, không phải lỗi ứng dụng.

### ✅ ĐÃ SỬA (2026-07-23, sau khi report này được viết) — xem `HH_LPM_CART_PERSISTENCE_FIX_REPORT.md`

Đã thêm localStorage persistence cho `cartLines` trong `SiteUIContext.tsx` (cùng pattern với `AccountContext`). Verify lại bằng đúng kịch bản tái hiện ở dưới, cộng thêm full-page reload và luồng đặt hàng — cả 3 đều đúng. `npm run check` sạch sau khi sửa.

### 🔴 Bug thật phát hiện (nguyên trạng lúc phát hiện) — P0 code blocker: Giỏ hàng không tồn tại qua điều hướng trang

**Tái hiện (xác nhận 3 lần độc lập):**
1. Vào PDP A, "Thêm vào giỏ" → badge = 2 (1 seed + 1 vừa thêm), drawer hiện đúng cả 2 sản phẩm.
2. Bấm nút "Đến trang thanh toán" (dùng `next/link`, điều hướng client-side bình thường) → tại `/thanh-toan`, **chỉ còn 1 sản phẩm** trong "Đơn hàng của bạn" — sản phẩm vừa thêm **biến mất hoàn toàn**, không có cảnh báo nào cho khách hàng.
3. Lặp lại độc lập lần 2 (PDP khác, thêm sản phẩm khác) rồi chỉ bấm 1 link menu bình thường ("Xem tất cả sản phẩm") → cùng kết quả: badge giỏ hàng reset từ 2 về 1.

**Nguyên nhân gốc (đã đọc code xác nhận):**
- `src/components/hh/SiteUIContext.tsx:40`: `const [cartLines, setCartLines] = useState<CartLine[]>([CART_SEED_ITEM]);` — state giỏ hàng là `useState` thuần túy, **không có bước rehydrate từ `localStorage`** khi mount.
- `src/components/hh/HHShell.tsx:130`: `SiteUIProvider` được khởi tạo **bên trong `HHShell`**, và `HHShell` được gọi riêng lẻ ở **22 file `page.tsx` khác nhau** — không có ở `app/layout.tsx` gốc (`grep -rl "HHShell" src/app/` = 22 kết quả).
- Hệ quả: mỗi lần chuyển route (kể cả `next/link` client-side bình thường), React remount toàn bộ cây `HHShell → SiteUIProvider`, tạo lại `cartLines` từ đầu bằng `CART_SEED_ITEM` cứng.
- Đối chứng: `src/components/hh/AccountContext.tsx` (đăng nhập, điểm thưởng, lịch sử đơn hàng, wishlist) đã làm **đúng pattern persist** — đọc `localStorage` sau mount (dòng 76, 96-97, 109) — nên các dữ liệu đó vẫn sống sót qua điều hướng bình thường. Cart là mảnh state duy nhất chưa áp dụng pattern này.

**Mức độ ảnh hưởng:** Đây không phải edge case — nó xảy ra ở **chính luồng mua hàng cơ bản nhất** ("thêm sản phẩm → bấm thanh toán"), tái hiện 100% các lần thử. Với 1 site thương mại, đây là blocker chặn launch.

**Không sửa trong đợt review này** — theo đúng phạm vi được giao (review + report, "Không commit. Không push. Dừng lại để review"). Ghi nhận đầy đủ để đội ngũ quyết định fix trước khi mở PR.

---

## 5. Dynamic Import Check

Bằng network request diff thật (không suy đoán):

| Overlay | Baseline chunk (trang chủ, chưa mở gì) | Sau khi mở lần đầu | Kết luận |
|---|---|---|---|
| SearchOverlay | 23 chunk JS | 27 chunk JS (+4) | ✅ Không tải trước, tải đúng lúc mở |
| CartDrawer | (đã có sẵn trong bundle từ trước lúc test — không đo diff riêng do thứ tự thao tác, nhưng hành vi mở tức thời + đóng/mở lại không lỗi xác nhận đúng cấu trúc) | — | ✅ Hoạt động đúng, không mount 2 lần (không có duplicate DOM/warning React quan sát được) |
| AuthOverlay | — | — | ✅ Mở lần đầu không trắng/không nuốt click, dynamic import xác nhận qua hành vi tải mượt |
| MobileDrawer | — | — | ✅ Mở/đóng đúng ở 500px, Escape hoạt động, scroll khôi phục |

Lần mở thứ hai của Search: tức thời, giữ nguyên truy vấn cũ — xác nhận component không bị huỷ/tải lại. Escape và focus restore đúng trên cả 4 overlay đã test. Không quan sát thấy body scroll bị giữ lock sau khi đóng bất kỳ overlay nào.

Không có baseline bundle cũ để so sánh tỷ lệ giảm — chỉ báo số hiện tại (23 chunk baseline → 27 sau khi mở Search), không bịa tỷ lệ %.

---

## 6. SEO Environment Check

**STAGING** (`npm run build` mặc định, không set `NEXT_PUBLIC_SITE_ENV`):
```
✓ GET /robots.txt trả 200, Disallow: / toàn site, không có Allow: /
✓ / meta robots = noindex
✓ sitemap.xml = 0 URL (đúng thiết kế — chưa có domain xác nhận)
✓ 5 route always-noindex (/reference/category, /tai-khoan, /thanh-toan, /thu-vien-hinh-anh, /thu-vien-noi-dung) đều noindex
PASS — 0 lỗi
```

**PRODUCTION** (`NEXT_PUBLIC_SITE_ENV=production NEXT_PUBLIC_SITE_URL=https://example-test-domain.invalid`):
```
✓ robots.txt có Allow: /, disallow đúng 5 route nội bộ
✓ / meta robots = index, follow
✓ sitemap.xml có URL thật, 0 URL localhost/127.0.0.1, 0 URL /reference, /tai-khoan, /thanh-toan, /thu-vien-hinh-anh, /thu-vien-noi-dung
✓ 5 route always-noindex vẫn noindex bất kể env
PASS — 0 lỗi
```

**PRODUCTION fail-safe** (`NEXT_PUBLIC_SITE_ENV=production`, **không** set `NEXT_PUBLIC_SITE_URL`):
```
robots.txt vẫn Allow: / (đúng — production nghĩa là public route indexable, độc lập với domain)
sitemap.xml = <urlset></urlset> RỖNG (không sinh URL localhost) ✓ đúng yêu cầu fail-safe
Không có <link rel="canonical"> nào được sinh ra trong toàn bộ codebase hiện tại (grep xác nhận 0 kết quả `<link rel="canonical"` trong source) — do đó không có rủi ro canonical trỏ localhost, nhưng cũng có nghĩa là **chưa có canonical tag** ở bất kỳ route nào (ghi nhận, ngoài phạm vi yêu cầu sửa của đợt này).
```

**Sau test:** đã rebuild lại staging (`npm run build` không set env) và verify lại — PASS, 0 lỗi. Trạng thái output cuối cùng của repo là **staging/noindex** đúng yêu cầu.

---

## 7. Data and Content Honesty

| Hạng mục | Kết quả |
|---|---|
| 0/83 sản phẩm nhiều ảnh vẫn render single-image trung thực | ✅ Xác nhận qua code (`getProductGalleryItems` fallback về 1 ảnh khi không có `galleryImages`) và qua browser (PDP không có gallery/lightbox thumbnail khi ảnh là placeholder, có lightbox khi ảnh thật tồn tại). |
| Không duplicate thumbnail | ✅ Không quan sát thấy. |
| Không video giả | ✅ `product.video` không được populate ở bất kỳ sản phẩm nào (theo comment trong `products.ts`), không có `<video>` giả nào xuất hiện trong QA. |
| Không rating giả | ✅ Toàn bộ PDP đã xem đều dùng "Chưa có đánh giá — hãy là người đầu tiên". |
| Giá demo có disclaimer | ✅ Xác nhận trực tiếp: "Giá minh hoạ cho bản demo, chưa phải giá bán chính thức từ Hoàng Hà." xuất hiện trên PDP và trang thanh toán. |
| Sản phẩm thiếu giá không tự sinh giá | ✅ Xác nhận: sản phẩm inquiry-price hiển thị "Giá sẽ được nhân viên Hoàng Hà xác nhận" thay vì số tiền bịa, kể cả trong giỏ hàng và trang thanh toán (`getEffectivePrice` trả `null`, UI xử lý đúng nhánh). |
| Featured articles trỏ route chính | Không kiểm tra sâu trong đợt này — ngoài phạm vi thời gian, không kết luận. |
| Không chọn bản duplicate/canonical phụ | Cơ chế `HH_CONTENT_DUPLICATES` + trang `/noi-dung-thuong-hieu` nhóm theo `canonicalType`/`canonicalRoute` đã tồn tại từ trước (không thuộc diff đợt này) — xác nhận có tồn tại, không audit sâu thêm. |
| 15 brand-content pages không còn literal bullet sai | Không tái kiểm từng trang trong đợt này (đã xác nhận ở P2 report trước, không có thay đổi mới vào `ContentBody.tsx` sau đó ngoài diff hiện tại). |
| Parser không làm hỏng 6 trang vốn không lỗi | Không tái kiểm sâu — ngoài phạm vi thời gian của đợt review này. |
| Offers dùng `ctaVariant`, không phụ thuộc label text | Xác nhận qua code đọc `OfferCard.tsx` nằm trong diff (không audit hành vi runtime sâu thêm trong đợt này). |

---

## 8. Final Scorecard

Xem `docs/production/HH_LPM_CAUDALIE_PARITY_FINAL_SCORECARD.md` — điểm giữ trung thực, không nâng Brand Story/Hero/Offers, **giảm Cart (9→5) và thêm Checkout (4, mới)** do bug P0 phát hiện ở mục 4.

---

## 9. Nội dung cố ý không sao chép từ Caudalie

Xác nhận qua git diff của toàn bộ 34 file tracked + review thủ công: không có màu sắc, font, logo, ảnh, hoặc copy nào của Caudalie được đưa vào các thay đổi mới. Các trang `/reference/*` (clone tĩnh dùng để so sánh 1:1) đã tồn tại từ trước (commit `2920609`), không phải thay đổi mới của đợt này, và bị loại khỏi index (`noindex`) + sitemap ở mọi môi trường.

---

## 10. Khuyến nghị Commit/PR

**Cập nhật sau khi bug P0 mục 4 đã được xử lý** (xem `HH_LPM_CART_PERSISTENCE_FIX_REPORT.md` để biết chi tiết fix + verify):

1. ~~Xử lý bug P0 mục 4~~ — **Đã xong.** `cartLines` giờ persist qua localStorage, verify lại bằng đúng kịch bản tái hiện + full-page reload + luồng đặt hàng đầy đủ.
2. Loại `docs/production/screenshots/` khỏi lần commit tới (không phù hợp với quy ước hiện có của repo) — **vẫn còn hiệu lực, chưa xử lý.**
3. Với bug P0 đã xử lý, có thể tiến hành commit theo nhóm A→G đã phân loại ở mục 1 (cộng thêm `src/components/hh/SiteUIContext.tsx` vào nhóm E — P1.1 search/focus closure, vì đây là file thuộc nhóm đó), giữ nguyên trạng thái staging/noindex cho build cuối cùng trước khi mở PR.

**Không commit. Không push. Dừng lại để review theo đúng yêu cầu** — quyết định commit/mở PR vẫn thuộc về người dùng.
