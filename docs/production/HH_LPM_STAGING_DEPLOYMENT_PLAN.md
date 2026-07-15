# Staging Deployment Plan — HH / LPM Internal Demo

**Date:** 2026-07-15
**Purpose:** Internal demo for CEO/Marketing review only. **Not production, not merged to `master`, not connected to WordPress/WooCommerce or any real backend.**
**Branch:** `hh-lpm-demo-data` (pushed and in sync with `origin/hh-lpm-demo-data` as of this writing)

---

## 1. Deploy configuration

| Item | Value |
|---|---|
| Branch to deploy | `hh-lpm-demo-data` |
| Build command | `npm run build` (runs `next build`, Turbopack) |
| Start command | `npm run start` (runs `next start`) |
| Framework | Next.js 16.2.1, App Router, `output: "standalone"` (`next.config.ts`) |
| Node version | `>=24` (per `package.json` `engines`) |
| Install command | `npm ci` (lockfile present and tracked: `package-lock.json`) |

`npm run build` and `npm run start` were both re-verified live in this pass: build succeeds (197 static/SSG routes), the standalone server boots and serves `GET /` with `HTTP 200`.

### Runtime dependencies — confirmed none required
- **No Excel workbook at runtime.** `data-source/*.xlsx` is read only by an offline extraction script (not part of this repo — kept outside per the Phase 1 audit's own instruction) and is gitignored; `grep -rn "data-source" src/` shows only doc-comment references to where the data originally came from, never an `import`/`require`/`fs.readFileSync` of the file.
- **No absolute local paths.** Swept `src/` for `/Users/VuIT` and `/private/tmp` — zero matches.
- **No secrets/env vars required to run the demo.** No `fetch()`/`XMLHttpRequest`/`axios` calls anywhere in `src/` — the entire app is static/client-state (cart, account, wishlist, orders all in `localStorage`). Nothing to configure to make the demo functional.
- **All local images committed.** Cross-checked every `image` path in the four derived catalog/content JSON files (`hh-products-derived.json`, `ingredients-derived.json`, `articles-derived.json`, `brand-pages-derived.json` — 139 referenced images total) against the filesystem. **Found and fixed 3 broken product images** (see §7) before confirming 139/139 now resolve.

---

## 2. noindex / nocache

Added `robots: { index: false, follow: false, nocache: true }` to the single root `src/app/layout.tsx` metadata export. Verified in built HTML output:

```html
<meta name="robots" content="noindex, nofollow, nocache"/>
```

Confirmed present on the homepage, on `/thanh-toan` (a client-heavy route), and on `/reference/pdp`.

**Could not be scoped to exclude `/reference/*`** without touching every individual page's metadata — Next.js's metadata API fully **replaces** (not merges) a `robots` object defined by a closer segment, and no page in this app currently sets its own `robots`, so a single root-level declaration is what governs every route today. Per instruction, applying noindex to the **entire staging build** (including `/reference/*`) was accepted as the correct fallback, since `/reference/*` is itself reference/demo content that shouldn't be indexed either — there is no case in this app where noindex on `/reference/*` is undesirable.

No `robots.txt` or `sitemap.xml` exists in this project — nothing to update there.

---

## 3. Password protection (recommendation only — not implemented)

The actual hosting platform for this deploy has not been specified, so no middleware was written this pass, per instruction. Priority order for whoever deploys this:

1. **Hosting platform's built-in password protection**, if available (e.g. Vercel Preview/Password Protection on Pro+ plans applied per-deployment or per-branch). This is the least code, most reliable option and should be used if the plan supports it — check before doing anything else.
2. **If the platform has no built-in option**, add a minimal Next.js middleware doing HTTP Basic Auth, gated by two environment variables set only in the hosting platform's dashboard (never committed):
   - `STAGING_BASIC_AUTH_USER`
   - `STAGING_BASIC_AUTH_PASS`

   Sketch (not implemented — for whoever wires it up once the platform is known):
   ```ts
   // middleware.ts
   export function middleware(request: Request) {
     const auth = request.headers.get("authorization");
     const expected = "Basic " + btoa(`${process.env.STAGING_BASIC_AUTH_USER}:${process.env.STAGING_BASIC_AUTH_PASS}`);
     if (auth !== expected) {
       return new Response("Auth required", { status: 401, headers: { "WWW-Authenticate": 'Basic realm="staging"' } });
     }
   }
   export const config = { matcher: "/((?!_next/static|_next/image|favicon.ico).*)" };
   ```
3. **No password is hard-coded anywhere in this repo**, and no `.env` file was created or committed — `.gitignore` already excludes `.env`, `.env.local`, `.env.*.local`. Any staging credentials must be entered directly into the hosting platform's environment-variable UI at deploy time.

---

## 4. Demo safety — confirmed

Swept the entire `src/` tree for each of the following; all clean:

| Check | Result |
|---|---|
| Checkout calls a real payment API | ✅ None — `CheckoutContent.tsx`'s `handleSubmit` only calls local `placeOrder()` (writes to `localStorage` via `AccountContext`), no `fetch`/`stripe`/`paypal`/`momo`/`vnpay`/`zalopay` anywhere in the codebase |
| Any form sends data externally | ✅ No `<form>` has an `action` attribute pointing off-app; `SignInForm`, `RegisterForm`, `CheckoutContent` all use `onSubmit` + local state only |
| Webhooks | ✅ None found (`grep -rniE "webhook"` → zero matches in `src/`) |
| Shipping API | ✅ None — "Giao hàng dự kiến: 2–5 ngày làm việc" is static copy, not a real carrier integration |
| Real account storage | ✅ None — `AccountContext` is 100% `localStorage`, key `hh-demo-account-v1`, no server, no database |
| Orders/vouchers/wishlist persistence | ✅ `localStorage` only, confirmed in live QA (order placed anonymously, then correctly appeared in `/tai-khoan` after registering — same browser, same `localStorage`) |
| Production tracking (GA4/Meta Pixel/TikTok Pixel) | ✅ None — zero `<script>` tags anywhere in `src/app` or `src/components`; zero matches for `gtag`, `googletagmanager`, `fbq(`, `ttq.`, or similar |
| Buttons that trigger a real transaction | ✅ None — "Mua ngay"/"Đặt hàng"/"Gửi yêu cầu mua hàng" all resolve to local `placeOrder()` / `addToCart()`, no network call |

**One minor pre-existing observation, not a data-exfiltration issue:** the footer newsletter `<form>` (`src/components/hh/layout/Footer.tsx:109`) has no `onSubmit` handler and no `action` attribute. Clicking its submit button triggers the browser's default same-page `GET` form submission, which reloads the current page with the email appended as a URL query string — it does **not** send data to any external server (no `action` = no destination). This predates Phase 3 and was left unfixed per "không sửa code nếu chưa phát hiện vấn đề thật" (this is a UX quirk, not data leaving the app). Worth a follow-up `onSubmit={(e) => e.preventDefault()}` before any wider demo use, but not a staging blocker.

---

## 5. Staging QA checklist

Run once against the actual staging URL, across three breakpoints: **desktop (≥1280px), tablet (~768–1024px), mobile (~390px)**. Check for zero console errors on every page (`DevTools → Console`, or the browser extension's `read_console_messages` tool filtered `error`).

| # | Item | Desktop | Tablet | Mobile |
|---|---|---|---|---|
| 1 | Trang chủ (`/`) loads, demo banner + hero visible | ☐ | ☐ | ☐ |
| 2 | Danh mục sản phẩm (`/san-pham`) — grid renders, 83 products reachable | ☐ | ☐ | ☐ |
| 3 | Filter 4 chiều (danh mục / dòng sản phẩm / dung tích / mùi hương) combine correctly via URL params | ☐ | ☐ | ☐ |
| 4 | Tìm kiếm sản phẩm — overlay opens, results render with images/prices | ☐ | ☐ | ☐ |
| 5 | Tìm kiếm bài viết — same overlay returns article results below product results | ☐ | ☐ | ☐ |
| 6 | ≥10 PDP across ≥3 different categories, incl. one exact-tier (real photo) and one unmatched-tier (placeholder) product | ☐ | ☐ | ☐ |
| 7 | `/nguyen-lieu` list + at least 2 detail pages | ☐ | ☐ | ☐ |
| 8 | `/bai-viet` list + at least 2 detail pages | ☐ | ☐ | ☐ |
| 9 | `/thuong-hieu`, `/cam-ket`, `/cong-thuc-minh-bach` each render real content + image | ☐ | ☐ | ☐ |
| 10 | Giỏ hàng — add/remove/adjust quantity, inquiry-priced item shows correct label and is excluded from subtotal | ☐ | ☐ | ☐ |
| 11 | Checkout demo (`/thanh-toan`) — form validation, submit, confirmation screen with real order ID | ☐ | ☐ | ☐ |
| 12 | Đăng ký/đăng nhập demo — both flows create/restore a session | ☐ | ☐ | ☐ |
| 13 | Điểm, hạng, voucher — visible and correct immediately after registration | ☐ | ☐ | ☐ |
| 14 | Wishlist — toggle on a product card and on a PDP, confirm it appears on `/tai-khoan` | ☐ | ☐ | ☐ |
| 15 | Lịch sử đơn — an order placed while logged out still appears after logging in | ☐ | ☐ | ☐ |
| 16 | Mobile drawer — hamburger menu opens/closes, nav links work | ☐ | — | ☐ |
| 17 | Footer — all link groups present, newsletter form does not error (see §4 caveat) | ☐ | ☐ | ☐ |
| 18 | Ảnh lỗi fallback — every unmatched/no-image product renders the gradient placeholder, never a broken `<img>` icon | ☐ | ☐ | ☐ |
| 19 | Refresh trang — cart persists only within the tab session (documented in-memory design); account/points/vouchers/wishlist/orders survive a hard refresh via `localStorage` | ☐ | ☐ | ☐ |
| 20 | Console — zero errors on homepage, one PDP, checkout, and account pages | ☐ | ☐ | ☐ |

---

## 6. Rollback procedure

Staging is a **redeploy of a branch**, not a stateful service — rollback is just re-pointing the deploy at an earlier commit:

1. On the hosting platform, redeploy commit `571dba2` (last commit before Phase 3) or any earlier known-good commit on `hh-lpm-demo-data` if Phase 3 needs to be pulled back.
2. No database/migration to reverse — all "state" (orders, accounts, wishlist) lives in each visitor's own browser `localStorage`, not on any server, so there is nothing server-side to roll back or clean up.
3. If a bad deploy needs to be taken down entirely rather than rolled back, disable/delete the staging deployment on the hosting platform directly — do **not** `git push --force` or rewrite `hh-lpm-demo-data` history to "undo" a deploy; deployment state and git history are independent here.

---

## 7. Updating the staging build later

1. Commit changes to `hh-lpm-demo-data` as usual (see the 3-commit Phase 3 pattern for a model: data → media → routes/functionality, each independently reviewable).
2. Push: `git push origin hh-lpm-demo-data`.
3. Re-run `npm run check` locally before pushing, every time — it is the single gate that currently catches lint/type/build regressions (197 routes as of this doc).
4. If new product images are added via `scripts/download-catalog-images.mjs` / `scripts/download-content-images.mjs`, **re-run the missing-image check** before committing:
   ```
   node -e '/* see §1 verification snippet in this session's history, or write a fresh one */'
   ```
   This session found and fixed 3 products whose `image` field pointed at a file that was never actually written (a batch-download race condition when two SKUs shared one source image) — that class of bug won't be caught by `npm run build` (Next.js doesn't fail the build for a missing `public/` asset referenced only by a data file), so it must be checked explicitly.
5. Redeploy triggers automatically if the hosting platform is connected to the branch, or manually otherwise.

---

## 8. Explicitly NOT production

- No real Hoàng Hà pricing (`officialPrice` is `null` everywhere; `demoPrice`/`priceMode: "inquiry"` only).
- No real payment processing, shipping integration, or order fulfillment.
- No real customer accounts, CRM, or email/SMS notifications.
- No WordPress/WooCommerce connection of any kind.
- No production analytics/tracking.
- Membership points/tier/vouchers are illustrative, not tied to any real loyalty program.
- Product-image matches below "exact" confidence (28 medium, 3 low) are algorithmic suggestions, not confirmed — see `src/data/catalog/product-matches.json`.
- 69 of 83 products have no price at all (`priceMode: "inquiry"`) — by design, not a bug.
- This entire build is `noindex, nofollow, nocache` (§2) and should additionally sit behind the password protection described in §3 before any link is shared outside the immediate CEO/Marketing review group.

---

## 9. `npm run check` result (this pass)

```
✔ eslint — 0 errors
✔ tsc --noEmit — 0 errors
✔ next build — 197/197 routes generated
✔ next start — server boots, GET / → 200, noindex meta tag confirmed live
```

No commit, deploy, merge, or tag was made in this pass. The 3 re-downloaded product images (§1/§7) are new, uncommitted files in the working tree — flagged here so they aren't lost or mistaken for unrelated changes before the next commit.
