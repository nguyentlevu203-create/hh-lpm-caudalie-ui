# HH × LPM — Phase 2 Repo Hygiene Report

**Ngày:** 2026-07-20
**Branch:** `hh-lpm-caudalie-ui-parity`
**Baseline commit (điểm branch tách ra):** `e7a2ffc` ("Complete Maison Luxury V4: CTA hierarchy") — commit gần nhất trên `hh-lpm-maison-luxury-v4` trước khi tách branch parity.
**Trạng thái:** Chưa commit. Toàn bộ thay đổi ở working tree, dừng lại để review theo đúng yêu cầu (§K).

---

## A. Nguyên tắc đã tuân thủ

- Chỉ sửa lỗi kỹ thuật/metadata/semantic/cấu hình — không đổi color palette, font family, header/hero/footer grid, container width.
- Không sửa `/reference/*` về mặt hình ảnh (chỉ thêm 1 layout wrapper vô hình về mặt thị giác — xem §E).
- Không xoá `docs/reports/`.
- Không đụng 6 worktree cũ (`.claude/worktrees/agent-*`).
- Không commit, không push.

---

## B. Package metadata — trước/sau

| Field | Trước | Sau |
|---|---|---|
| `name` | `ai-website-clone-template` | `hh-lpm-website` |
| `version` | `0.3.1` | `1.0.0` |
| `description` | "Clone any website into a clean, modern Next.js codebase using AI coding agents" | "Website Le Petit Marseillais Vietnam by Hoang Ha Distribution" |
| `author` | `JCodesMore` | `Hoang Ha Distribution` |
| `license` | `MIT` | `UNLICENSED` |
| `repository.url` | `github.com/JCodesMore/ai-website-cloner-template.git` | `github.com/nguyentlevu203-create/hh-lpm-caudalie-ui.git` |
| `homepage` | `github.com/JCodesMore/ai-website-cloner-template` | `github.com/nguyentlevu203-create/hh-lpm-caudalie-ui` |
| `bugs.url` | `.../ai-website-cloner-template/issues` | `.../hh-lpm-caudalie-ui/issues` |
| `keywords` | `claude-code, website-clone, reverse-engineering, nextjs, ai, template, tailwindcss, shadcn-ui` | `le-petit-marseillais, hoang-ha-distribution, nextjs, ecommerce, vietnam, beauty, personal-care` |

`engines`, `scripts` gốc (`dev`/`build`/`start`/`lint`/`typecheck`/`check`), `dependencies`, `devDependencies` — **giữ nguyên 100%**, chỉ thêm 1 script mới (`dev:lan`, xem §J). Không có package nào bị thêm/bớt/nâng version.

---

## C. LAN config — trước/sau

**Trước:** `next.config.ts` hard-code `allowedDevOrigins: ["192.168.1.23"]` — 1 IP cụ thể, gãy ngay khi đổi mạng/DHCP cấp lại IP (đúng sự cố đã xảy ra ở đầu phiên làm việc trước — xem hội thoại: IP cũ `192.168.1.35` không còn khớp máy khi test).

**Sau:**
```ts
const lanDevOrigins = [process.env.LAN_DEV_HOST, process.env.LAN_DEV_IP]
  .filter((value): value is string => Boolean(value))
  .map((value) => value.replace(/^https?:\/\//, "").replace(/:\d+$/, ""));

allowedDevOrigins: ["localhost", "127.0.0.1", "Mac-mini-cua-Hoang.local", ...lanDevOrigins],
```

- `localhost` — theo tài liệu Next.js (`node_modules/next/dist/docs/.../allowedDevOrigins.md`, đã đọc trước khi sửa theo đúng quy tắc AGENTS.md): đã là default, liệt kê tường minh không gây lỗi, chỉ dư thừa vô hại.
- `127.0.0.1` — origin khác `localhost` theo góc nhìn trình duyệt, không nằm trong default — giữ tường minh.
- `Mac-mini-cua-Hoang.local` — **đây là hostname mDNS, không phải IP** — ổn định qua các lần đổi mạng/DHCP (khác bản chất với lỗi IP hard-code cũ), chỉ phân giải được trong LAN của chính máy này nên rủi ro thấp nếu bị lộ; đã cân nhắc bỏ hẳn nhưng giữ lại làm default hoạt động ngay không cần cấu hình `.env.local` cho máy hiện tại — **đã giải thích rõ trong comment code**, không giấu.
- `.filter(Boolean)` đảm bảo không đẩy `undefined` vào mảng khi biến môi trường không được set.
- `.env.example` (file mới, **không có IP thật**, không phải `.env.local`):
  ```
  LAN_DEV_HOST=Mac-mini-cua-Hoang.local
  LAN_DEV_IP=
  ```
- `.gitignore` đã sẵn có `.env`/`.env.local`/`.env.*.local` (dòng 13–17, không cần sửa) — xác nhận `.env.local` sẽ không bao giờ bị commit nếu người dùng tạo file đó theo hướng dẫn.
- **Không** thêm `.env.local` (đúng yêu cầu "không tạo nếu chưa có yêu cầu").
- `next build` không đọc `allowedDevOrigins` (chỉ ảnh hưởng `next dev`) — xác nhận qua `npm run build` chạy sạch (§K), production output không đổi.

---

## D. URL hard-code — kết quả audit toàn repo

Đã grep `localhost`/`127.0.0.1`/`192.168.`/`http://`/`https://` trên toàn bộ `src/` và `public/`.

| Loại | Kết quả |
|---|---|
| **(1) URL nội bộ cần đổi sang relative path** | **0 phát hiện.** Không có `fetch("http://localhost...")` hay tương tự ở bất kỳ đâu trong `src/`. Mọi link nội bộ đã dùng relative path (`/san-pham`, `/thanh-toan`, v.v. — xác nhận qua cách các component hiện tại dùng `<Link href="/...">`). |
| **(2) URL tài sản thật được phép giữ** | `src/components/icons.tsx`: `http://www.w3.org/2000/svg` — namespace XML chuẩn của thẻ `<svg>`, không phải network URL, giữ nguyên. |
| **(3) URL reference/tài liệu chỉ dùng nội bộ** | `src/components/Footer.tsx`, `src/components/InstagramFeed.tsx` (chỉ được import bởi 9 trang `/reference/*`, xác nhận bằng grep reverse-import) — chứa link mạng xã hội Caudalie thật (`instagram.com/caudalie`, `facebook.com/CaudalieFrance`...). Đây là một phần nguyên bản của trang tham chiếu, không sửa theo đúng "không sửa /reference/* về hình ảnh". `src/components/reference/*/data.ts` (brand-story/diagnosis/offers/search) — cùng loại, dữ liệu mock của reference, không đụng. |
| **(4) URL đáng ngờ cần báo cáo** | **0 phát hiện.** Toàn bộ URL còn lại nằm trong `src/data/catalog/*.json` và `src/data/content/*.json` — là URL nguồn thật đã được thu thập từ đợt scrape dữ liệu trước (link sản phẩm chính hãng LPM, ảnh...), thuộc phạm vi dữ liệu sản phẩm — **không sửa** theo đúng chỉ đạo gốc "không sửa dữ liệu sản phẩm trừ khi cần sửa lỗi mapping" và "không thay URL ảnh/nguồn dữ liệu hợp lệ một cách máy móc". |
| Kết quả trong `docs/production/*.md` | 1 file (`HH_LPM_PREMIUM_COLOR_SYSTEM_REPORT.md`) nhắc tới IP cũ trong văn bản mô tả lịch sử — đây là báo cáo đã có từ trước, không thuộc phạm vi sửa của Phase 2 (chỉ báo cáo Phase 2 mới được tạo/sửa). |

**Kết luận D:** Không có URL hard-code nội bộ nào cần sửa — codebase đã dùng relative path nhất quán từ trước.

---

## E. Language attribute

- `src/app/layout.tsx`: `<html lang="en">` → **`<html lang="vi">`** — áp dụng cho root document, đúng với >350 trang tiếng Việt.
- **File mới** `src/app/reference/layout.tsx` — nested layout (không phải root layout thứ hai, không có `<html>`/`<body>` lồng), chỉ bọc: `<div lang="en">{children}</div>`. Next.js tự động áp dụng layout này cho toàn bộ 9 route con dưới `/reference/*` mà không cần sửa từng page.
- Verify trực tiếp qua browser (production build, §K): `document.documentElement.lang === "vi"` trên `/`, `/san-pham`, PDP; `document.querySelector('[lang="en"]')` tồn tại và là con trực tiếp của `<body>` trên `/reference/category` và `/reference/pdp`.
- Không gây full reload giữa HH và reference routes (đây là 1 nested layout thường, không phải root layout riêng) — xác nhận qua `npm run build` không báo lỗi cấu trúc route, và điều hướng qua `<Link>` giữa các route (đã test click-through §K) không có dấu hiệu full page reload (SPA transition mượt, không nhấp nháy trắng).

---

## F. PDP semantic title

- `src/components/hh/pdp/ProductBuyBox.tsx`: `<p className="text-2xl font-semibold text-hh-ink">{product.name}</p>` → **`<h1 className="text-2xl font-semibold text-hh-ink">{product.name}</h1>`** — chỉ đổi tag, **giữ nguyên class** (không đổi font-size/weight/spacing/pixel).
- Xác nhận trước khi sửa: `/san-pham/[slug]` (route PDP) **không có `<h1>` nào khác** — route `/san-pham` (danh mục) có `<h1>` riêng của chính nó ("Tất cả sản phẩm"), là route khác, không xung đột.
- QA sau khi sửa (production build, PDP `gel-tam-huu-co-...-co-roi-ngua-chanh` và `sua-tam-phap-...-qua-mo`): đúng **1 h1/trang**, heading order đúng (`H1` tên sản phẩm → `H2` "Sản phẩm này là gì?" → `H2` "Khách hàng nói gì" → `H3` "Kết nối với Hoàng Hà" [footer newsletter] → `H2` "Đăng nhập" [AuthOverlay, ẩn/off-canvas, không hiển thị mặc định]).

---

## G. Reference safety — re-verify (không cần sửa gì thêm)

| Kiểm tra | Kết quả |
|---|---|
| `/reference/*` trong nav production | 0 kết quả (`grep -rln "/reference" src/components/hh/layout/`) |
| `/reference/*` trong sitemap | Không tồn tại route/file sitemap nào trong repo (`find src/app -iname "sitemap*"` → rỗng) — không áp dụng |
| noindex/nofollow | `metadata.robots = {index:false, follow:false, nocache:true}` tại root layout — áp dụng cho **mọi** route kể cả `/reference/*` (Next.js: `robots` không set ở page con → kế thừa từ layout cha) |
| Production import token/font/asset Caudalie | `grep -rn "font-caudalie\|brand-purple\|brand-yellow\|brand-terracotta\|brand-cream" src/components/hh/` → **0 kết quả** |

Không có gì cần sửa ở mục G — xác nhận lại nguyên trạng.

---

## H. Robots/indexing — ghi nhận, không đổi

Hiện trạng xác nhận:
- `public/robots.txt`: `User-agent: * / Disallow: /` — đã tồn tại sẵn (không phải tạo mới trong Phase 2).
- `metadata.robots.index: false` toàn site (root layout).

**Ghi nhận rõ theo yêu cầu:** cấu hình này **đúng cho giai đoạn staging/demo nội bộ hiện tại**, nhưng **không phù hợp nếu launch production công khai** — trước khi launch thật cần: xoá/đổi `Disallow: /` trong `robots.txt` theo đúng route muốn cho phép index, xoá `index:false` khỏi metadata (hoặc chuyển sang set theo từng route nếu vẫn cần giữ noindex cho `/reference/*`/`/tai-khoan`/`/thanh-toan`), và cân nhắc thêm `sitemap.xml` thật. **Không thay đổi gì trong Phase 2** — đúng yêu cầu.

---

## I. Maison Luxury V4 report

Đã tạo `docs/production/HH_LPM_MAISON_LUXURY_V4_REPORT.md` — tái tạo từ `git show e7a2ffc` (diff đầy đủ đã đọc), không bịa lại QA/breakpoint/contrast không còn bằng chứng. Các mục "không thể xác nhận lại" được liệt kê tường minh trong report đó (§4), gồm: breakpoint đã test cho riêng đợt V4, QA browser tại thời điểm code được viết, và tính hợp lệ độc lập của số liệu contrast chép trong code comment. Chi tiết đầy đủ — xem file đó, không lặp lại ở đây.

---

## J. `dev:lan` script

- Thêm `"dev:lan": "next dev --hostname 0.0.0.0 --port 3000"` vào `package.json` (script gốc `dev`/`build`/`start`/`lint`/`typecheck`/`check` giữ nguyên).
- Không thêm đường dẫn certificate HTTPS cố định nào vào `package.json`/`next.config.ts`.
- Tạo `docs/production/HH_LPM_LAN_DEVELOPMENT_GUIDE.md` — nội dung: chạy `dev:lan`, lấy IP macOS (`ipconfig getifaddr en0`), URL truy cập từ thiết bị khác, khác biệt `localStorage`/cookie theo origin, danh sách Web API cần secure context (microphone/camera/clipboard nâng cao/service worker), cách dùng `LAN_DEV_HOST`/`LAN_DEV_IP`, và cảnh báo rõ không commit certificate/private key.

---

## K. Phase 2 QA — kết quả lệnh

```
npm run lint        → pass (0 lỗi, package name hiển thị đúng hh-lpm-website@1.0.0)
npm run typecheck   → pass (tsc --noEmit, 0 lỗi)
npm run build       → pass — 360 trang static/SSG generate thành công, gồm cả /reference/* với layout mới
npm run check        → pass (lint + typecheck + build, chạy lại lần 2, kết quả giống hệt)
git diff --check     → exit 0, không lỗi whitespace
```

**Lưu ý phát hiện ngoài phạm vi sửa:** `npm run start` in cảnh báo `"next start" does not work with "output: standalone" configuration. Use "node .next/standalone/server.js" instead.` — đây là cấu hình `output: "standalone"` đã có sẵn trong `next.config.ts` **từ trước Phase 2** (không phải do thay đổi lần này), server vẫn phục vụ đúng (xác nhận `curl` trả 200 và HTML đúng nội dung) nên không chặn QA, nhưng ghi nhận đây là điểm cần dọn ở một đợt khác (không thuộc phạm vi B–J của Phase 2).

### Route đã QA (production build qua `npm run start`, browser thật)

| Route | `lang` | H1 | Console error | Ghi chú |
|---|---|---|---|---|
| `/` | `vi` ✅ | 0 (trang chủ không có h1 — hiện trạng có sẵn từ trước, ngoài phạm vi Phase 2) | 0 | Click nav/search hoạt động, điều hướng sang PDP qua kết quả tìm kiếm thành công |
| `/san-pham` | `vi` ✅ | 1 ("Tất cả sản phẩm") | 0 | — |
| PDP (`sua-tam-...-qua-mo`) | `vi` ✅ | **1** ("Sữa Tắm Pháp...") — đúng sau fix §F | 0 | Heading order đúng |
| PDP thứ 2 (`gel-tam-...-buoi-huu-co`, truy cập qua click search) | `vi` ✅ | 1 | 0 | Click-through từ search overlay hoạt động, URL đúng slug |
| `/reference/category` | `vi` (root) + `en` (wrapper trực tiếp dưới `<body>`) ✅ | — | 0 | |
| `/reference/pdp` | `vi` (root) + `en` (wrapper) ✅ | 1 ("Vinoperfect", không đổi — reference không bị sửa hình ảnh) | 0 | |

**Static review (không test thiết bị LAN thật):**
- `allowedDevOrigins` trong `next.config.ts` không còn IP literal nào — chỉ `localhost`/`127.0.0.1`/hostname `.local`/giá trị từ env var. Xác nhận bằng đọc lại file, không phải đoán.
- **Không tuyên bố** đã test truy cập từ điện thoại/tablet thật qua LAN trong phiên này — chỉ xác nhận cấu hình đúng cú pháp Next.js (theo tài liệu chính thức đã đọc trước khi sửa) và `npm run build`/`npm run dev` không báo lỗi liên quan.

---

## L. File đã sửa / tạo

**Sửa (4 file, đã có trong `git diff --stat`):**
```
next.config.ts                          | 25 ++++++++++++++++++-------
package.json                            | 30 +++++++++++++++---------------
src/app/layout.tsx                      |  2 +-
src/components/hh/pdp/ProductBuyBox.tsx |  2 +-
```

**Tạo mới (untracked, chưa `git add`):**
```
.env.example
docs/production/HH_LPM_LAN_DEVELOPMENT_GUIDE.md
docs/production/HH_LPM_MAISON_LUXURY_V4_REPORT.md
src/app/reference/layout.tsx
```

(Báo cáo này — `docs/production/HH_LPM_PHASE_2_REPO_HYGIENE_REPORT.md` — cũng là file mới, tạo sau khi lệnh `git status` cuối cùng ở trên được chạy nên không xuất hiện trong danh sách đó.)

---

## Hạn chế còn lại

- Trang chủ (`/`) không có `<h1>` nào — hiện trạng có sẵn từ trước Phase 2, ngoài phạm vi yêu cầu (chỉ PDP được chỉ định sửa ở §F). Ghi nhận để cân nhắc ở đợt sau nếu cần.
- `npm run start` cảnh báo không tương thích hoàn toàn với `output: standalone` (xem §K) — không phải lỗi do Phase 2 gây ra, nhưng nên dọn ở đợt kỹ thuật riêng.
- Chưa test truy cập LAN thật từ thiết bị thứ hai (điện thoại/tablet) — chỉ static review cấu hình.
- `OfferCard.tsx` suy luận CTA transactional/editorial từ text label (ghi nhận trong `HH_LPM_MAISON_LUXURY_V4_REPORT.md` §5) — không thuộc phạm vi Phase 2, chỉ nhắc lại làm điểm cần theo dõi.
- Robots/indexing vẫn ở trạng thái staging-only (§H) — cần đổi trước khi launch production thật, chưa đổi trong Phase 2 theo đúng chỉ đạo.

## Khuyến nghị cho Phase 3

Phase 3 (dev local/LAN parity) phần lớn đã được chuẩn bị sẵn ở Phase 2 (§C, §J) — `dev:lan` script và `HH_LPM_LAN_DEVELOPMENT_GUIDE.md` đã có. Việc còn lại cho Phase 3 đúng nghĩa: test thật trên thiết bị LAN thứ hai (không chỉ static review), xác nhận HMR/RSC/search/cart/auth/advisor/filter hoạt động giống nhau giữa `localhost` và LAN IP (trừ khác biệt `localStorage`/cookie theo origin đã tài liệu hoá ở §J), và ghi rõ chức năng nào cần HTTPS thật (đã liệt kê sẵn trong guide, chưa verify thực tế bằng mkcert).

---

## Lệnh xác nhận cuối (theo yêu cầu)

```
$ git diff --stat
 next.config.ts                          | 25 ++++++++++++++++++-------
 package.json                            | 30 +++++++++++++++---------------
 src/app/layout.tsx                      |  2 +-
 src/components/hh/pdp/ProductBuyBox.tsx |  2 +-
 4 files changed, 35 insertions(+), 24 deletions(-)

$ git status --short
 M next.config.ts
 M package.json
 M src/app/layout.tsx
 M src/components/hh/pdp/ProductBuyBox.tsx
?? .env.example
?? docs/production/HH_LPM_LAN_DEVELOPMENT_GUIDE.md
?? docs/production/HH_LPM_MAISON_LUXURY_V4_REPORT.md
?? docs/production/HH_LPM_PHASE_2_REPO_HYGIENE_REPORT.md
?? src/app/reference/layout.tsx
```

**Không commit. Không push. Dừng lại để review.**

---
---

# Phase 2.1 — Final Technical Stabilization

**Ngày:** 2026-07-20 (tiếp theo, cùng branch `hh-lpm-caudalie-ui-parity`, sau khi Phase 2 được duyệt "về cơ bản")
**Trạng thái:** Chưa commit. Nối tiếp working tree của Phase 2 — không tách branch mới.
**Nguyên tắc đã tuân thủ:** không đổi màu, không đổi font, không chỉnh header/hero/footer layout ngoài phần semantic H1, không sang layout parity, không commit, không push.

---

## 1. package-lock.json metadata

**Kiểm tra:** `package-lock.json` tồn tại, top-level `name`/`version` và `packages[""].name`/`packages[""].version` đều **chưa khớp** — vẫn `ai-website-clone-template@0.3.1` dù `package.json` đã đổi từ Phase 2.

**Đã sửa:** đúng 4 chỗ (2 field × 2 vị trí) → `hh-lpm-website@1.0.0`. `git diff package-lock.json` xác nhận **chỉ 4 dòng đổi**, không có dòng `integrity`/`resolved`/version của bất kỳ dependency nào bị chạm — không chạy `npm install`/`npm update`, sửa trực tiếp bằng text edit có kiểm soát.

```diff
-  "name": "ai-website-clone-template",
-  "version": "0.3.1",
+  "name": "hh-lpm-website",
+  "version": "1.0.0",
   "lockfileVersion": 3,
   "requires": true,
   "packages": {
     "": {
-      "name": "ai-website-clone-template",
-      "version": "0.3.1",
+      "name": "hh-lpm-website",
+      "version": "1.0.0",
       "license": "MIT",
```

**Ghi chú không sửa:** `packages[""].license` vẫn là `"MIT"` trong lockfile dù `package.json.license` đã đổi thành `"UNLICENSED"` ở Phase 2 — nằm ngoài phạm vi được yêu cầu ("chỉ cập nhật metadata dự án" chỉ liệt kê `name`/`version`), **cố ý không sửa thêm** để tránh vượt phạm vi; ghi nhận là điểm lệch nhỏ nếu cần đồng bộ sau này.

---

## 2. Production standalone preview

### Vấn đề trước khi sửa

`next.config.ts` có `output: "standalone"` nhưng `package.json.scripts.start` vẫn là `next start` — chạy `npm run start` phát cảnh báo `"next start" does not work with "output: standalone" configuration` và không phục vụ đúng thư mục standalone (thiếu `public/`/`.next/static/` nếu chạy trực tiếp `node .next/standalone/server.js` mà không copy trước).

### Giải pháp

**File mới `scripts/prepare-standalone.mjs`** — dùng thuần `node:fs/promises` (`cp`/`rm` đệ quy có sẵn từ Node 16+, không gọi shell `cp`/`rm`), cross-platform:
1. Kiểm tra `.next/standalone/server.js` tồn tại — nếu không, in lỗi rõ ràng yêu cầu chạy `npm run build` trước, `exitCode = 1`, dừng.
2. Xoá đích cũ (`rm({recursive:true, force:true})`) trước khi copy — không giữ file rác từ build trước.
3. Copy `public/` → `.next/standalone/public`.
4. Copy `.next/static/` → `.next/standalone/.next/static`.
5. Chỉ copy đúng 2 thư mục này — không copy `.env*`, không copy `src/`, không copy gì khác ngoài whitelist.

**`package.json` scripts:**
```diff
   "build": "next build",
+  "prepare:standalone": "node scripts/prepare-standalone.mjs",
+  "prestart": "npm run prepare:standalone",
-  "start": "next start",
+  "start": "node .next/standalone/server.js",
```
`dev`, `dev:lan`, `lint`, `typecheck`, `check` — **giữ nguyên 100%**, không đổi.

**Không hard-code port/hostname** — xác nhận `.next/standalone/server.js` (do chính Next.js sinh ra khi build) tự đọc `process.env.PORT` (mặc định `3000`) và `process.env.HOSTNAME` (mặc định `0.0.0.0`) — đọc trực tiếp file trước khi kết luận, không đoán.

### Trước/sau (đã QA thật, xem §5)

| | Trước | Sau |
|---|---|---|
| Lệnh | `npm run start` → `next start` | `npm run start` → hook `prestart` chạy `prepare-standalone.mjs` rồi `node .next/standalone/server.js` |
| Warning | `"next start" does not work with "output: standalone"` | **Không còn** — xác nhận bằng `grep -i "does not work\|warning" /tmp/standalone-start.log` → rỗng |
| Asset phục vụ | Nếu chạy thẳng `node .next/standalone/server.js` không qua chuẩn bị: `public/`/`.next/static/` **thiếu**, ảnh/font/CSS/JS 404 | `public/`/`.next/static/` được copy tự động trước khi server khởi động — 0 asset 404 (xem §5) |

`HH_LPM_LAN_DEVELOPMENT_GUIDE.md` đã cập nhật mục "1b. Production-like standalone preview" ghi rõ 2 câu lệnh:
```
npm run build
HOSTNAME=127.0.0.1 PORT=4173 npm run start     # preview máy hiện tại
HOSTNAME=0.0.0.0 PORT=4173 npm run start        # cho thiết bị LAN truy cập
```

---

## 3. Homepage H1

### Phát hiện + tự sửa lỗi trong lúc làm (quan trọng — ghi trung thực)

**Bước 1:** Đổi heading hiển thị trong `HeroCampaign.tsx` (`SlidePanel`) từ `<h2>` cố định sang tag động qua prop `headingAs`, truyền `isPageHeading` từ `src/app/page.tsx` (`<HeroCampaign isPageHeading />`) để slide 1 (transactional, "Le Petit Marseillais — Chăm sóc cá nhân theo tinh thần Provence") render `<h1>`. Giữ nguyên text/class/font/size/spacing — chỉ đổi tag.

**Bước 2 — QA phát hiện lỗi thật:** `document.querySelectorAll('h1').length` trên `/` (production standalone, `http://127.0.0.1:4173/`) trả về **2**, cùng nội dung text. Nguyên nhân: `HeroCampaign` render **2 cây DOM song song** cho cùng dữ liệu slide — cây desktop (`hidden lg:flex`, luôn tồn tại trong DOM, chỉ ẩn bằng CSS `display:none` dưới 1024px) và cây mobile/tablet (`flex lg:hidden`, ẩn bằng CSS trên 1024px). CSS `hidden` không xoá phần tử khỏi DOM — gán `headingAs="h1"` theo `index === 0` ở **cả hai** cây tạo ra 2 `<h1>` thật trong tài liệu bất kể viewport.

**Bước 3 — sửa:** Chỉ MỘT cây được là chủ sở hữu `<h1>` thật; cây còn lại luôn là `<h2>` bất kể `isPageHeading`. Đã chọn **cây mobile/tablet** làm chủ sở hữu (không phải desktop) vì: (a) đây là cây hiển thị ở dải viewport rộng hơn trong thực tế (<1024px — bao gồm điện thoại, tablet, và cả laptop chưa maximize/zoom), (b) khớp với chỉ mục hoá "mobile-first" mặc định của Google, (c) khớp quy ước "mobile-first" đã nêu trong `AGENTS.md` của dự án. Đã re-test: `h1Count === 1`, `visible: true` ở viewport 994px (dải phổ biến trong môi trường QA này).

**Đánh đổi đã ghi rõ trong code comment** (`HeroCampaign.tsx`, đoạn "IMPORTANT"): ở viewport ≥1024px (desktop), heading hiển thị chính về mặt thị giác được đánh dấu `<h2>` (không đổi style), trong khi một `<h1>` cùng nội dung tồn tại nhưng `display:none` trong cây mobile/tablet. Đây là giới hạn thật của kiến trúc 2-cây-DOM-song-song sẵn có của component (không phải lỗi do Phase 2.1 gây ra — pattern này đã tồn tại từ trước cho toàn bộ nội dung slide, không riêng heading), và không thể giải quyết triệt để nếu không tái cấu trúc layout (ngoài phạm vi "chỉ sửa semantic H1" của đợt này).

**Không dùng logic pathname** — giải quyết hoàn toàn bằng prop tường minh (`isPageHeading`, mặc định `false`) đúng theo yêu cầu. `HeroCampaign` hiện chỉ được dùng ở `src/app/page.tsx` (xác nhận bằng grep, 0 route khác import) nên chưa có rủi ro trùng H1 thực tế ở route khác, nhưng prop default an toàn (`false` → luôn H2) đã có sẵn cho việc tái sử dụng sau này.

### Heading order trang chủ (đã verify lại sau fix)

```
H1  "Le Petit Marseillais — Chăm sóc cá nhân theo tinh thần Provence" (hero, cây mobile/tablet)
H2  "Sản phẩm bán chạy"                    (BestSellers)
H2  "..."                                  (ExperienceCards) → H3 (card title, đúng lồng dưới H2)
H2  "..."                                  (AdvisorBanner)
H2  "Giá trị thương hiệu"                  (BrandValues) → H3 (value title, đúng lồng dưới H2)
H2  "..."                                  (FullBleedBrandStory)
H2  "..."                                  (SocialFeed)
H2  "..."                                  (SeoTextBlock)
H2  "Quyền lợi mỗi đơn hàng"               (PermanentBenefits)
```
Không có H3 nào đứng ngoài một H2 hợp lệ. `FeaturedCollection` không có heading riêng — không ảnh hưởng thứ tự.

---

## 4. `allowedDevOrigins` review

Đã đọc lại `next.config.ts` theo đúng yêu cầu trước khi sửa. Thay đổi duy nhất: **bỏ `"localhost"`** khỏi mảng — xác nhận qua tài liệu Next.js chính thức (đã đọc ở Phase 2, `node_modules/next/dist/docs/.../allowedDevOrigins.md`) rằng `localhost` là origin mặc định của dev server, liệt kê thêm chỉ dư thừa.

**Giữ nguyên:** `127.0.0.1` (thực sự đang dùng — QA Phase 2.1 §5 chạy standalone preview qua chính `HOSTNAME=127.0.0.1`), `Mac-mini-cua-Hoang.local` (hostname mDNS ổn định, không phải IP), `...lanDevOrigins` (từ `LAN_DEV_HOST`/`LAN_DEV_IP`, `.filter(Boolean)` nên không đẩy `undefined`).

**Không thêm:** IP thật cố định mới, wildcard, origin có protocol/port sai định dạng — mảng cuối cùng chỉ chứa hostname trần, đúng định dạng ví dụ trong tài liệu Next.js (`'local-origin.dev'`, không có `http://`/port).

Cấu hình trước khi sửa **không phát cảnh báo** — thay đổi này là dọn dẹp tự nguyện theo đúng gợi ý "có thể bỏ nếu xác nhận default", không phải sửa lỗi.

---

## 5. Phase 2.1 QA — kết quả lệnh

```
npm run lint        → pass (0 lỗi)
npm run typecheck   → pass (0 lỗi) — chạy 2 lần (trước và sau khi sửa bug 2×H1 ở §3, cả 2 lần đều sạch)
npm run build       → pass — 360 trang, gồm route mới không đổi
```

### QA production standalone thật (`HOSTNAME=127.0.0.1 PORT=4173 npm run start`)

```
> prestart
> npm run prepare:standalone
[prepare-standalone] Copied public/ -> .next/standalone/public
[prepare-standalone] Copied .next/static/ -> .next/standalone/.next/static
[prepare-standalone] Done. .next/standalone/ is ready to serve.
> start
> node .next/standalone/server.js
▲ Next.js 16.2.1
- Local:         http://127.0.0.1:4173
✓ Ready in 0ms
```
**Không còn** dòng cảnh báo `output: standalone` (xác nhận bằng grep log, xem §2).

| Route | `lang` | H1 | Console error | Ghi chú |
|---|---|---|---|---|
| `/` | `vi` | **1** (sau fix §3; ban đầu phát hiện 2, đã sửa) | 0 | 42 network request kiểm tra thủ công — toàn bộ 200 |
| `/san-pham` | `vi` | 1 ("Tất cả sản phẩm") | 0 | |
| PDP `sua-tam-...-qua-mo` | `vi` | 1 | 0 | |
| PDP `gel-tam-...-buoi-huu-co` | `vi` | 1 | 0 | |
| `/reference/category` | `vi` (root) + `en` (wrapper) | — | 0 | |
| `/reference/pdp` | `vi` (root) + `en` (wrapper) | 1 ("Vinoperfect", không đổi) | 0 | |

### Asset request QA (homepage, 42 request bắt qua `read_network_requests`)

| Loại | Số lượng | Kết quả |
|---|---|---|
| Document (`/`) | 1 | 200 |
| Font `.woff2` (cả Caudalie 5 file + HH/next-font ~13 file) | 18 | 200, 0 404 |
| CSS chunk | 2 | 200 |
| JS chunk | 11 | 200, 0 404 |
| `next/image` (ảnh hero tối ưu qua `/_next/image?url=...`) | 2 | 200 |
| Chrome extension request (không liên quan app) | 5 | Bỏ qua — không phải request của ứng dụng |

Ảnh `public/` (favicon.ico, robots.txt, `/images/hh/cards/card-8/main.jpg`) — kiểm bằng `curl` trực tiếp trước khi mở browser: **cả 3 đều 200**.

### Chức năng đã click-through thật (không chỉ đọc code)

- Search: gõ "sua tam" (không dấu) → fallback "Sản phẩm bán chạy" đúng hành vi đã biết từ trước (giới hạn matching không dấu, không phải regression mới).
- Add to cart: click "Thêm vào giỏ" → badge giỏ hàng tăng đúng.
- Cart drawer: mở đúng, hiển thị đúng sản phẩm/số lượng/subtotal (`358.000đ` = `179.000 × 2`), CTA transactional/editorial đúng màu.
- Escape đóng search overlay đúng.

```
npm run check        → pass (lint + typecheck + build)
git diff --check     → exit 0
```

---

## 6. File đã sửa / tạo trong Phase 2.1

**Sửa thêm (nối tiếp diff Phase 2):**
```
next.config.ts                          (bỏ "localhost")
package-lock.json                       (name/version × 2 vị trí)
package.json                            (scripts: prepare:standalone/prestart/start mới)
src/app/page.tsx                        (truyền isPageHeading cho HeroCampaign)
src/components/hh/home/HeroCampaign.tsx (headingAs prop, mobile-tree-owns-h1)
```

**Tạo mới:**
```
scripts/prepare-standalone.mjs
```

(`src/app/layout.tsx`, `src/components/hh/pdp/ProductBuyBox.tsx`, `.env.example`, và 3 file docs — đã tạo/sửa ở Phase 2, không đổi thêm ở Phase 2.1 ngoại trừ nội dung `HH_LPM_LAN_DEVELOPMENT_GUIDE.md` được bổ sung mục 1b.)

**Diff tổng cộng tính đến cuối Phase 2.1** — xem lệnh xác nhận cuối bên dưới.

---

## 7. Hạn chế còn lại (Phase 2.1)

- `package-lock.json.packages[""].license` vẫn `"MIT"`, lệch với `package.json.license: "UNLICENSED"` — cố ý không sửa, ngoài phạm vi được giao (§1).
- Đánh đổi H1 mobile-vs-desktop (§3) — ở viewport ≥1024px, heading hero hiển thị chính về mặt thị giác là `<h2>`, không phải `<h1>` thật (một `<h1>` cùng nội dung tồn tại nhưng `display:none`). Chỉ giải quyết triệt để bằng tái cấu trúc layout (2 cây DOM → 1), ngoài phạm vi đợt này.
- Chưa test standalone preview qua thiết bị LAN thật (điện thoại/tablet) — chỉ test trên chính máy qua `127.0.0.1:4173`, đúng phạm vi Phase 2.1 (`HOSTNAME=127.0.0.1`). Việc test LAN thật thuộc Phase 3A/3B.
- `search "sua tam"` (không dấu) không khớp `"sữa tắm"` — hạn chế thuật toán search đã biết từ các báo cáo trước, không phải regression của Phase 2.1, không sửa (ngoài phạm vi).

## Lệnh xác nhận cuối (Phase 2.1)

```
$ git diff --stat
 next.config.ts                          | 29 +++++++++++++++-----
 package-lock.json                       |  8 +++---
 package.json                            | 34 ++++++++++++-----------
 src/app/layout.tsx                      |  2 +-
 src/app/page.tsx                        |  2 +-
 src/components/hh/home/HeroCampaign.tsx | 48 ++++++++++++++++++++++++++++-----
 src/components/hh/pdp/ProductBuyBox.tsx |  2 +-
 7 files changed, 88 insertions(+), 37 deletions(-)

$ git status --short
 M next.config.ts
 M package-lock.json
 M package.json
 M src/app/layout.tsx
 M src/app/page.tsx
 M src/components/hh/home/HeroCampaign.tsx
 M src/components/hh/pdp/ProductBuyBox.tsx
?? .env.example
?? docs/production/HH_LPM_LAN_DEVELOPMENT_GUIDE.md
?? docs/production/HH_LPM_MAISON_LUXURY_V4_REPORT.md
?? docs/production/HH_LPM_PHASE_2_REPO_HYGIENE_REPORT.md
?? scripts/prepare-standalone.mjs
?? src/app/reference/layout.tsx
```

**Không commit. Không push. Dừng lại để review.**

---
---

# Phase 3 — Local/LAN Origin Parity

**Ngày:** 2026-07-20, cùng branch `hh-lpm-caudalie-ui-parity`, tiếp theo Phase 2.1.

## Phase 3A — Automated same-machine origin parity

Chạy `npm run dev:lan` (`next dev --hostname 0.0.0.0 --port 3000`). LAN IP tại thời điểm test: **`192.168.1.23`** (`en1`, xác nhận bằng `ipconfig getifaddr en1`).

| Origin | Kết quả |
|---|---|
| `http://localhost:3000` | ✅ Test đầy đủ 15 mục brief yêu cầu — header/menu, search (query có dấu "sữa tắm" → 30 kết quả, click-through đúng), PDP, tăng số lượng (1→3, giá cập nhật live "537.000₫"), thêm giỏ, cart subtotal đúng (4×179.000=716.000₫), auth overlay (form "Đăng nhập" mở đúng), advisor click-through (`?scent=Oải hương` → đúng trang lọc), client nav mượt (không full reload quan sát được). Console: 3 lỗi hydration lặp lại qua các lần điều hướng — đối chiếu lại đúng là extension trình duyệt (`bis_register`/`__processed_*`), không phải lỗi app (đã xác nhận từ nhiều báo cáo trước, biến mất trên production build). |
| `http://127.0.0.1:3000` | ✅ DOM giống hệt localhost (1 H1, `lang="vi"`), `isSecureContext=true`, `mediaDevices` khả dụng. Cart badge độc lập (`"1"`, không phải `"4"` như tab localhost đã thao tác trước đó) — xác nhận đúng origin-isolation dự kiến. PDP load đúng, console chỉ có lỗi hydration extension (không phải app). |
| `http://192.168.1.23:3000` (LAN IP) | ✅ DOM giống hệt, 67 network request bắt được đều `200`/`304` — gồm cả các chunk HMR (`hmr-client_ts_*.js`) tải thành công, xác nhận `allowedDevOrigins` không chặn RSC/HMR qua origin này. **Đo được thực tế** (không suy đoán): `isSecureContext = false`, `navigator.mediaDevices = undefined` — đúng như tài liệu `HH_LPM_LAN_DEVELOPMENT_GUIDE.md` đã cảnh báo (HTTP LAN không phải secure context). Add-to-cart xác nhận đúng bằng click thật qua toạ độ pixel (một vài lần gọi `.click()` bằng JS trong lúc debug không kích hoạt state — nghi do overlay/timing của chính phiên test, không phải bug ứng dụng; click thật cho kết quả đúng: giỏ hàng 1 sản phẩm, `179.000₫`). |
| `http://Mac-mini-cua-Hoang.local:3000` | ❌ **Không resolve được trong môi trường automation này** — `curl`, `ping`, `dscacheutil -q host` đều timeout/thất bại. **Không tuyên bố đã test origin này.** Đã xác nhận tĩnh bằng đọc code: hostname này có mặt đúng trong `allowedDevOrigins` (`next.config.ts`), nên về cấu hình là đúng — chỉ là mDNS/Bonjour không hoạt động trong sandbox của phiên làm việc, không phải lỗi cấu hình. **Việc mDNS chưa resolve được không chặn truy cập bằng LAN IP trực tiếp** — origin `192.168.1.23` (mục trên) hoạt động bình thường và đã được xác nhận qua cả automation lẫn thiết bị thật (Phase 3B). |

**Ghi nhận đúng yêu cầu:**
- localStorage/cookie khác nhau theo origin là hành vi dự kiến — đã verify thực tế (khác giá trị `cartBadge` giữa `localhost` và `127.0.0.1` dù cùng code/cùng máy).
- HTTP LAN **không** được tuyên bố giống HTTPS — đo được `isSecureContext=false`/`mediaDevices=undefined` thật trên `192.168.1.23`, không phải suy đoán.
- Microphone/camera **thực sự không khả dụng** trên origin LAN qua HTTP (đo trực tiếp, không chỉ trích dẫn tài liệu).
- Automated same-machine LAN URL test **không thay thế** test trên điện thoại thật — xem Phase 3B.

## Phase 3B — Manual device gate

**Người test:** người dùng (chủ dự án), tự thực hiện.
**Thiết bị/trình duyệt:** điện thoại thật của người dùng, kết nối cùng mạng Wi-Fi với máy Mac chạy dev server (loại thiết bị/trình duyệt cụ thể không được cung cấp trong xác nhận — ghi nhận đây là giới hạn thông tin, không phải bỏ sót).
**IP LAN đã test:** `http://192.168.1.23:3000` — khớp đúng IP đã in ra ở Phase 3A, cùng phiên `npm run dev:lan`.

**Kết quả — người dùng xác nhận PASS toàn bộ:**
- Homepage — PASS
- Mobile menu — PASS
- Search và click kết quả — PASS
- Product filter — PASS
- PDP — PASS
- Add to cart — PASS
- Quantity và subtotal — PASS
- Cart drawer — PASS
- Scent advisor — PASS
- Auth overlay — PASS
- Font và ảnh — PASS
- Refresh trực tiếp route — PASS
- Không phát hiện tràn ngang hoặc lỗi hiển thị

**Kết luận Phase 3:** Đạt điều kiện để tiếp tục Phase 4 — cả kiểm tra tự động cùng máy (3A, 3/4 origin, 1 origin không resolve được do giới hạn môi trường mDNS chứ không phải lỗi cấu hình) lẫn kiểm tra thiết bị thật qua LAN IP (3B, người dùng tự xác nhận) đều không phát hiện lỗi. `npm run dev:lan` đã dừng sau khi hoàn tất Phase 3B (không cần chạy dev server nền cho Phase 4 — Phase 4 dùng production standalone preview).

**Không commit. Không push.**
