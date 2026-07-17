# HH × LPM — Premium V2 Micro Polish Report

**Ngày:** 2026-07-17
**Branch:** `hh-lpm-premium-color-system`
**Phạm vi:** chỉ triển khai 3 đề xuất A1, A2, A5 từ `docs/production/HH_LPM_PRE_PR_PREMIUM_VISUAL_REVIEW.md`. Không redesign, không đổi font, không đổi giá trị token màu toàn cục, không thêm màu/gradient mới, không đổi layout lớn, không sửa `/reference/*` hay dữ liệu sản phẩm, không đụng `docs/reports/`. Chưa commit.

---

## 1. A1 — SeoTextBlock heading

**File:** `src/components/hh/home/SeoTextBlock.tsx`

Thay đổi:
- Heading (`h2`) đổi từ `.hh-heading-section` (serif, 1.75rem→2.5rem, cùng cấp với "Quyền lợi mỗi đơn hàng", "Giá trị thương hiệu"…) xuống `.hh-heading-card` (serif, 1.25rem→1.5rem — cùng cấp heading card/nội dung phụ).
- Khối đoạn văn (`div` bọc 3 `<p>`): thêm `mx-auto max-w-2xl text-left text-sm leading-relaxed` — canh trái, giới hạn còn ~672px thay vì kế thừa `max-w-3xl` (~768px) toàn section, cỡ chữ giảm xuống `text-sm` để đúng vai trò nội dung phụ/SEO filler.
- Heading và dòng disclaimer vẫn giữ canh giữa (kế thừa `text-center` của `<section>`) — chỉ đoạn văn thân bài đổi canh trái để dễ scan.
- Không đổi nội dung, không xóa section, không biến thành card mới (không thêm border/bg/shadow).

Kết quả QA trực quan (1253px): heading SeoTextBlock rõ ràng nhỏ hơn heading "Quyền lợi mỗi đơn hàng" ngay bên dưới — phân cấp được khôi phục, section không còn cạnh tranh với các section bán hàng/editorial chính.

---

## 2. A2 — TimelineEntry year label

**File:** `src/components/hh/brand-story/TimelineEntry.tsx` (dòng 48)

Thay đổi:
```diff
- <p className="hh-display text-2xl font-medium text-hh-primary md:text-[38px]">{year}</p>
+ <p className="hh-label text-hh-muted-foreground">{year}</p>
```
- `.hh-label` = sans-serif (Be Vietnam Pro), 12px, weight 600, uppercase, letter-spacing 0.08em — đúng yêu cầu "nhỏ hơn rõ rệt, uppercase, tracking nhẹ, weight 600".
- Màu: chọn `text-hh-muted-foreground` thay vì `accent-gold` theo đúng lựa chọn được phép trong yêu cầu ("dùng màu accent-gold hoặc text-secondary nếu contrast đủ") — đã tính contrast: gold (`#c99a4a`) trên nền card trắng/85% chỉ ~2.56:1 (không đạt), trong khi `--hh-muted-foreground` (`#667579`) đạt ~4.79:1 trên nền trắng và ~6.4:1 khi tính cả lớp `bg-hh-surface/85` — đạt chuẩn AA cho text nhỏ.
- `heading` (tiêu đề milestone) giữ nguyên `.hh-heading-card` serif — vẫn là nội dung chính duy nhất dùng serif trong block.
- Không đổi cấu trúc, không đổi vị trí milestone, không đổi nội dung.

Kết quả QA trực quan (1253px & 500px, cả 3 milestone — đầu "Truyền thống"/"Khởi nguồn từ Marseille", giữa "Chiết xuất thiên nhiên"/"Nguyên liệu từ vùng Provence", cuối "Hoàng Hà tại Việt Nam"/"Đồng hành cùng người tiêu dùng Việt"): year label nay đóng vai trò eyebrow rõ ràng, heading milestone là điểm nhấn thị giác chính, không còn 2 dòng serif chồng lớp.

---

## 3. A5 — Scent Advisor surface colors

**File:** `src/data/site-content.ts` (interface `HHScentAdvisorQuestion`, mảng `SCENT_ADVISOR_QUESTIONS`), `src/components/hh/advisor/ScentAdvisorView.tsx`

### Ánh xạ 6 card → 3 token hiện có

| id | scent | `cardBg` cũ (hex) | `cardBg` mới (class) |
|---|---|---|---|
| `relax` | Oải hương | `#e3ecee` | `bg-hh-surface-blue` |
| `fresh` | Hoa cam | `#eaf2e9` | `bg-hh-surface-warm` |
| `warm` | Mật ong & sữa | `#f5e9d9` | `bg-hh-surface-soft` |
| `sweet` | Hoa hồng | `#f3e3e2` | `bg-hh-surface-soft` |
| `classic` | Dầu ô liu | `#f4f0e6` | `bg-hh-surface-blue` |
| `gentle` | Hạnh nhân | `#f8f1e8` | `bg-hh-surface-warm` |

Mỗi token dùng đúng 2 lần; thứ tự chọn tránh 2 card cùng token nằm cạnh nhau (ngang lẫn dọc) trong lưới `lg:grid-cols-3` — không token mới, không hex mới trong `cardBg`.

### Thay đổi kiến trúc dữ liệu
- Field `cardBg` đổi ý nghĩa từ "hex màu nền" sang "tên class Tailwind của token surface hiện có" (đã cập nhật doc-comment interface). Cả 3 class (`bg-hh-surface-warm/-blue/-soft`) đã tồn tại và được dùng literal ở nhiều file khác (`BrandStoryTeaser.tsx`, `Footer.tsx`, `MegaMenu.tsx`…) nên Tailwind chắc chắn generate CSS cho chúng dù được reference gián tiếp qua data.
- `headingColor` (luôn `#243338` = `--hh-ink` cho cả 6 card, không dùng `onDark`) không còn được apply qua inline `style`; thay bằng `text-hh-ink` cố định trên `<Link>` — đơn giản hóa, không đổi kết quả hiển thị (giá trị inline cũ vốn luôn giống token này).
- Các field khác của interface (`color`, `buttonBg`, `buttonTextColor`, `colorFrom`, `colorTo`, `shape`, `muted`, `onDark`) **không đụng tới** — đã là dữ liệu chưa dùng từ trước (ghi chú sẵn trong code là "kept for backward compatibility"), ngoài phạm vi A5.

### Phân biệt card (`ScentAdvisorView.tsx`)
- Thêm 1 icon `lucide-react` riêng cho mỗi card (map theo `id`, cùng convention `size`/`strokeWidth={1.5}`/`text-hh-primary` đã dùng ở `BrandValues.tsx`): `relax`→`Moon`, `fresh`→`Sun`, `warm`→`Flame`, `sweet`→`Heart`, `classic`→`Leaf`, `gentle`→`Droplet`.
- Tên nhóm mùi ("Hương {scent}") giữ nguyên, nay dùng `text-hh-muted-foreground` cố định thay vì `opacity-80` trên `headingColor` động.
- Thêm `border border-hh-border` mặc định (viền nhẹ, không đổi theo hover) + `hover:border-hh-primary/50 hover:shadow-md` (hover nhẹ, không tăng saturation, chỉ đổi viền/shadow) + `focus-visible:ring-2 focus-visible:ring-hh-primary focus-visible:ring-offset-2` (điều hướng bàn phím có ring rõ ràng dùng primary — đáp ứng yêu cầu "selected state phải dùng primary/ring rõ" cho pattern link-grid hiện tại, vốn không có bước "chọn rồi xác nhận" riêng mà điều hướng thẳng).
- Text: heading `font-semibold` trên `text-hh-ink` (contrast cao), body dùng `text-hh-ink/80` (đã tính: ≈6.45:1 trên nền ấm nhất `bg-hh-surface-warm`, đạt AA).
- Không đổi logic matching (`scentMatches` trong `products.ts` không bị đụng), không đổi route (`/san-pham?scent=...` giữ nguyên), không đổi dữ liệu sản phẩm.

Kết quả QA trực quan (1253/834/500px): 6 card giờ chỉ còn 3 sắc nền lặp lại có chủ đích, phân biệt rõ bằng icon + tên mùi; hover có shadow/border nhẹ; focus-visible có ring primary rõ ràng qua Tab; click-through `Oải hương` → `/san-pham?scent=Oải%20hương` → trang "Mùi hương Oải hương" hiển thị đúng sản phẩm — không regression logic matching.

---

## 4. File đã sửa

- `src/components/hh/home/SeoTextBlock.tsx`
- `src/components/hh/brand-story/TimelineEntry.tsx`
- `src/data/site-content.ts`
- `src/components/hh/advisor/ScentAdvisorView.tsx`

Không sửa file nào khác. `git status --short` xác nhận chỉ 4 file trên bị thay đổi (`M`), cộng 2 mục untracked có sẵn từ trước (`docs/production/HH_LPM_PRE_PR_PREMIUM_VISUAL_REVIEW.md`, `docs/reports/`) — không phải do đợt polish này tạo ra và không bị đụng tới.

---

## 5. Breakpoint thực đo

`resize_window` trong phiên này đạt chính xác các mốc yêu cầu (khác với hạn chế đã ghi nhận ở đợt review trước):

| Yêu cầu resize | `window.innerWidth` thực đo |
|---|---|
| 1253px | **1253px** (khớp) |
| 1024px | **1024px** (khớp) |
| 834px | **834px** (khớp) |
| 500px | **500px** (khớp) |
| 390px | **500px** (không đạt — cửa sổ có giới hạn chiều rộng tối thiểu ~500px trong môi trường này, resize xuống 390 bị chặn lại ở 500) |

→ Đã kiểm thực tế ở 4 viewport: **1253px, 1024px, 834px, 500px**. Không đạt chính xác 390px — không tuyên bố đã test mốc này; mốc 500px đã đo dùng thay thế cho dải mobile nhỏ nhất khả dụng.

---

## 6. Route đã QA

- `/` — SeoTextBlock (heading + đoạn văn canh trái, so sánh với section "Quyền lợi mỗi đơn hàng" liền kề) — 1253px & 500px.
- `/cau-chuyen-thuong-hieu` — toàn bộ timeline, milestone đầu ("Truyền thống"), giữa ("Chiết xuất thiên nhiên"), cuối ("Hoàng Hà tại Việt Nam") — 1253px & 500px.
- `/tu-van-chon-san-pham` — 6 card, hover state, focus-visible ring, click-through sang `/san-pham?scent=Oải%20hương` và kết quả sản phẩm — 1253px, 834px, 500px.

Không mở lại các route/overlay khác (PDP, `/san-pham`, search/cart/auth) vì A1/A2/A5 không chạm tới các khu vực đó.

---

## 7. `npm run check`

```
npm run lint       → pass (0 lỗi)
npm run typecheck  → pass (0 lỗi)
npm run build      → pass — 360 static pages generated thành công
```

`git diff --check` → không có whitespace error.
`git diff --stat`:
```
 src/components/hh/advisor/ScentAdvisorView.tsx  | 49 ++++++++++++++++++-------
 src/components/hh/brand-story/TimelineEntry.tsx |  2 +-
 src/components/hh/home/SeoTextBlock.tsx         |  4 +-
 src/data/site-content.ts                        | 17 +++++----
 4 files changed, 49 insertions(+), 23 deletions(-)
```
`git status --short`: chỉ 4 file trên ở trạng thái `M`; không file nào trong `docs/reports/` hay `/reference/*` bị đụng.

Console browser: không có lỗi/exception, không có hydration error trên cả 3 route đã QA (kiểm bằng `read_console_messages` sau khi navigate/refresh từng route).

---

## 8. Giới hạn còn lại

- **390px chưa test chính xác** — môi trường resize bị chặn ở tối thiểu ~500px trong phiên này; đã dùng 500px thay thế, không tuyên bố đã kiểm 390px.
- **A5 — "selected state"**: `ScentAdvisorView` là lưới link điều hướng thẳng (`?scent=...`), không có bước "chọn rồi xác nhận" tách biệt như multi-step quiz. Đã diễn giải yêu cầu "selected state phải dùng primary/ring rõ" thành `focus-visible:ring-2 ring-hh-primary` (điều hướng bàn phím) + hover border/shadow nhẹ, vì không có state "đã chọn" thường trực nào khác tồn tại trong kiến trúc hiện tại.
- **Field dữ liệu chưa dùng** (`color`, `buttonBg`, `buttonTextColor`, `colorFrom`, `colorTo`, `shape`, `muted`, `onDark` trong `HHScentAdvisorQuestion`) không được dọn dẹp — nằm ngoài phạm vi A5, giữ nguyên như trước để tránh mở rộng diff.
- Các đề xuất khác trong report gốc (A3, A4, A6, B1–B5) **chưa triển khai** theo đúng chỉ định — chỉ A1, A2, A5.

---

**Chưa commit.** Toàn bộ thay đổi đang ở working tree, sẵn sàng để review trước khi commit.
