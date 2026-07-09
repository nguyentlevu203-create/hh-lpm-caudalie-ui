# Hoàng Hà / Le Petit Marseillais Việt Nam — Production UI (Phase 1)

**Date:** 2026-07-09
**Scope:** First production UI pass, built from the patterns established in `/reference/*` (Caudalie UI reference) but with 100% original Vietnamese copy, an independent color/font system, and zero Caudalie assets. Not deployed. `/reference/*` is untouched and still serves as the pattern library.

## 1. Files created / modified

### Modified (2 files, both additive)
| File | Change |
|---|---|
| `src/app/page.tsx` | Full rewrite — was the Caudalie homepage clone, now the HH/LPM production homepage. The original is fully recoverable from git history (previous commits); not deleted anywhere else. |
| `src/app/globals.css` | Additive only — added a new `--hh-*` token block (`--hh-primary`, `--hh-accent`, `--hh-cream`, `--hh-ink`, etc.) and a `--font-hh` theme entry. No existing Caudalie token (`--primary`, `--brand-purple`, `--font-sans`, etc.) was renamed, removed, or repointed — `/reference/*` reads the exact same values as before. |

**Not modified:** `src/app/layout.tsx` (still loads the 3 Caudalie font files and the Caudalie `<title>`/favicon defaults — this is intentional, see §3), `src/app/favicon.ico`, everything under `src/app/reference/`, everything under `src/components/` at the root (`Header.tsx`, `Footer.tsx`, `icons.tsx`, `ProductCard.tsx`, etc.) and everything under `src/components/reference/`.

### Created — data layer
- `src/data/products.ts` — `HH_PRODUCTS` (14 SKUs across 6 categories), `HH_CATEGORIES`, lookup/filter helpers.
- `src/data/site-content.ts` — nav, promo bar messages, hero copy, membership/loyalty copy, offers, scent-advisor content, brand-story copy, footer links, base metadata.

### Created — shared production infrastructure
- `src/lib/hh-fonts.ts` — Be Vietnam Pro loader (`next/font/google`), exposed only via `HHShell`, never touches `<html>`/`<body>`.
- `public/hh/favicon.svg` — new, original icon (two nested shapes in the HH green), not derived from any Caudalie asset.
- `src/components/hh/HHShell.tsx` — per-page root wrapper: applies the `font-hh`/`bg-hh-cream`/`text-hh-ink` scoped tokens, mounts `SiteUIProvider` and the 4 global overlays.
- `src/components/hh/SiteUIContext.tsx` — single-overlay-at-a-time UI state (cart/search/auth/mobile-menu) + real cart line-item state (add/update-qty/remove).
- `src/components/hh/ProductPlaceholderArt.tsx` — gradient + plain-geometry "product photo" placeholder (no images at all — see §4).

### Created — layout chrome
`src/components/hh/layout/{PromoBar,Header,MegaMenu,MobileDrawer,Footer,StickyMobileCta}.tsx`

### Created — overlays
`src/components/hh/cart/CartDrawer.tsx`, `src/components/hh/search/SearchOverlay.tsx`, `src/components/hh/auth/{AuthOverlay,SignInForm,RegisterForm}.tsx`

### Created — product / PDP
`src/components/hh/product/{ProductCard,ProductGrid,ProductFilterBar}.tsx`, `src/components/hh/pdp/{ProductGallery,ProductBuyBox,ProductDescription,RelatedProducts}.tsx`

### Created — home sections
`src/components/hh/home/{HeroCampaign,CategoryShowcase,BestSellers,ComboOffers,MembershipSection,BrandStoryTeaser}.tsx`

### Created — page-specific views
`src/components/hh/offers/OffersView.tsx`, `src/components/hh/advisor/ScentAdvisorView.tsx`, `src/components/hh/brand-story/BrandStoryView.tsx`

### Created — routes
- `src/app/page.tsx` (homepage, see "Modified" above)
- `src/app/san-pham/page.tsx` — listing, real `?category=`/`?scent=` filtering
- `src/app/san-pham/[slug]/page.tsx` — PDP, `generateStaticParams` over all 14 SKUs
- `src/app/uu-dai/page.tsx`
- `src/app/tu-van-chon-san-pham/page.tsx`
- `src/app/cau-chuyen-thuong-hieu/page.tsx`

No new page routes were added for cart/search/login/register — per the task's own "chỉ tạo route phụ nếu cần" instruction, these 3 are implemented as global overlays (drawer/modal) opened from the header, matching how the live Caudalie site's cart and login also behave (drawer overlay / in-place view swap) rather than as dedicated pages.

## 2. Pattern provenance (what was cloned from which reference route)

| HH component | Cloned from | What was kept / what changed |
|---|---|---|
| `PromoBar` | shared Caudalie `Header`'s promo strip | Rotation behavior kept; new copy, new rotation implementation |
| `Header` + `MegaMenu` + `MobileDrawer` | shared Caudalie `Header` | Sticky top bar, hamburger-left-on-mobile, hover mega-menu, slide-in mobile nav — same shape; from-scratch text/badge wordmark instead of `LogoIcon` |
| `CartDrawer` | `/reference/cart` (`CartDrawer.tsx`) | Right-side slide-in, back-chevron close, qty stepper, collapsible order summary, sticky footer CTA — same shape; real add/remove/qty state (reference's was a static seed line) and real free-shipping-threshold math |
| `SearchOverlay` | `/reference/search` | Result-count summary + category shortcuts + product grid + empty state — same shape; wired to a real substring search over the catalog instead of a fixed "try this query" toggle |
| `AuthOverlay` / `SignInForm` / `RegisterForm` | `/reference/login` + `/reference/register` | In-place sign-in ↔ register swap with carried-over email, inline required/invalid-email/password-length/confirm-mismatch validation — same shape; simplified field set (no country/phone-widget/DOB — see §5), collapsed into one modal instead of two routes |
| `ProductGrid` / `ProductFilterBar` | `/reference/category` | Responsive 2→3→4 col grid, pill filter row — same shape; pills now do real `?category=` filtering instead of being a presentational shell |
| `ProductCard` | `/reference/category`'s `ProductGridCard` + shared `ProductCard` | Badge, rating row, price + compare-at, full-width CTA — same shape; CTA is wired to real cart state |
| `ProductGallery` / `ProductBuyBox` / `ProductDescription` / `RelatedProducts` | `/reference/pdp` | 2-col gallery+buybox layout, thumbnail rail with active state, qty stepper + "Mua ngay" bar, attribute/highlight description block, horizontal-scroll related row — same shape; buy box is wired to real cart state |
| `OffersView` | `/reference/offers` | Heading/intro, 2-col campaign card grid, per-card terms accordion — same shape; no product-photo cards (no real HH campaign photography exists) |
| `ScentAdvisorView` | `/reference/diagnosis` | 2-col colored concern-card grid ("1 issue, 1 solution") — reworked from skin-concern matching into scent-mood matching; cards link to a real `?scent=` filter instead of a static "Shop now" link |
| `BrandStoryView` | `/reference/brand-story` | Heading/intro + alternating-side milestone layout — **deliberately not** the reference's `absolute bottom-0` overlay-card-on-photo technique (that was the exact root cause of the overlap bug fixed on the reference route in the previous phase); rebuilt as a normal-flow flex row so the whole bug class is structurally impossible |
| `HeroCampaign` / `CategoryShowcase` / `BestSellers` / `ComboOffers` / `MembershipSection` | shared Caudalie homepage sections (hero banner, category nav, "Your Selection" rail, permanent-benefits band) | Same general shapes (full-bleed hero + CTA pair, category tile row, product grid, perk band); `MembershipSection` uses an original loyalty program name ("Câu Lạc Bộ Hoàng Hà") instead of MYCAUDALIE |
| `StickyMobileCta` | **new pattern, not in the reference set** | Added specifically for the "bán hàng nhanh" mobile-first goal — always-visible bottom CTA bar, item #18 in the task's requirement list |

## 3. Caudalie assets removed / replaced

| Caudalie asset | Replacement |
|---|---|
| `LogoIcon` (real Caudalie wordmark SVG path, `src/components/icons.tsx`) | Not imported anywhere in `src/app` (excl. `/reference`) or `src/components/hh`. Replaced with an original "HH" circular badge + text wordmark built from Tailwind classes, no external SVG. |
| 5 `Caudalie-*.woff2` self-hosted font files | `Be_Vietnam_Pro` via `next/font/google` (network access to Google Fonts confirmed working in this environment before committing to this approach), loaded only in `src/lib/hh-fonts.ts` and scoped via `HHShell`. |
| `--primary: #2d1946` (Caudalie purple) and sibling brand tokens | New, independent `--hh-primary: #2f6b4f` (herb green) / `--hh-accent: #e08a3e` (terracotta) / `--hh-cream: #fbf6ec` palette — additive tokens, the old ones are untouched for `/reference/*`. |
| Page `<title>`/description ("CAUDALIE: Natural Beauty Skincare...") | Every HH route exports its own `metadata` — default title "Hoàng Hà — Le Petit Marseillais Việt Nam", per-route overrides (e.g. "Sản phẩm \| Hoàng Hà — ..."), verified in the rendered `<head>` (see §6). |
| `public/images/caudalie/*`, `public/images/reference/*` product photography | Not referenced anywhere in production code — `ProductPlaceholderArt` (gradient + plain geometric SVG shapes) used instead; zero images used. |
| "MYCAUDALIE" loyalty-program name | "Câu Lạc Bộ Hoàng Hà" (original name, used consistently in `MembershipSection`, footer, cart copy). |

**Known, documented platform limitation — favicon:** Next.js's `favicon.ico` file convention can only be set once, at the true app root (`src/app/favicon.ico`), and applies additively to every route in the app directory — there is no per-route-subset override mechanism short of restructuring `/reference/*` into a separate route group with its own root layout (out of scope: it would change the reference routes' file paths, which the task says to leave alone). Each HH page's `metadata.icons.icon` correctly points at the new `/hh/favicon.svg`, and it **is** present in the rendered `<head>` (confirmed via `curl`), but the original `favicon.ico` link tag is also still present alongside it, unavoidably, on every route including HH ones. Modern browsers generally prefer the SVG icon when both are declared, so in practice the HH tab icon should show, but this isn't a hard platform guarantee. Flagging this transparently rather than silently leaving it undocumented.

## 4. Real Hoàng Hà assets still needed

Nothing in this build uses any Caudalie or placeholder-stolen imagery — but consequently **nothing in this build uses real photography either**. Before this can go further than Phase 1:
- Real product packshots for all 14 SKUs (or however many real SKUs Hoàng Hà actually carries) — `ProductPlaceholderArt` gradients stand in for every product image site-wide (cards, PDP gallery, cart lines, search results).
- A real logo/wordmark file (SVG preferred) if Hoàng Hà has established brand identity guidelines — currently a plain circular "HH" badge + text.
- Real campaign/hero photography for `HeroCampaign` (currently a plain color gradient).
- Real brand-story photography for `cau-chuyen-thuong-hieu` (currently `ProductPlaceholderArt` tiles).
- A confirmed brand color palette from Hoàng Hà/LPM's actual guidelines — the green/terracotta palette used here is an original placeholder choice evoking "Provence/savon de Marseille," not sourced from any official LPM Vietnam brand book.
- Real product catalog data (names, prices, volumes, descriptions) to replace the 14 originally-written placeholder SKUs in `src/data/products.ts`.
- A confirmed hotline/email/legal footer content to replace the placeholder contact info in `src/data/site-content.ts`.

## 5. What's still a placeholder / simplified vs. the reference

- **All product imagery** — gradient + geometric-shape placeholders, everywhere (see §4).
- **PDP gallery "multiple angles"** — 3 thumbnails are the *same* placeholder art flipped/rotated via CSS, not real distinct photos; documented in the component's own code comment so it isn't mistaken for real asset diversity.
- **Register form field set** — simplified from the reference's full field set (dropped the country `<select>` + flag/dial-code phone widget + date-of-birth + newsletter checkbox) to a leaner mobile-first set (name, email, phone, password, confirm, terms) for the "bán hàng nhanh" goal. All client-side validation still real (required fields, email pattern, 6-char minimum, password match).
- **PDP accordions (ingredients/FAQ) and a dedicated reviews section** — not built in this pass; the reference's own PDP already flagged these as its weakest, most-placeholder area (per the earlier audit), and this pass didn't try to invent real HH ingredient/FAQ/review copy in their place.
- **"You may also like" / related products** — real logic (same category or scent family), not hardcoded.
- **Cart/search/auth state persistence across full navigation** — each top-level route (`/`, `/san-pham`, `/san-pham/[slug]`, `/uu-dai`, `/tu-van-chon-san-pham`, `/cau-chuyen-thuong-hieu`) independently mounts its own `HHShell`/`SiteUIProvider` instance (no shared route-group layout was introduced, to keep the exact file paths the task specified). This means cart contents added on one page reset to the seed item after a full navigation to a different top-level route. This is a static UI shell, not a wired backend — real persistence (localStorage or a server session) is real future work, not attempted here.
- **Checkout** — "Đến trang thanh toán" is a `href="#"` placeholder, same convention the reference used throughout for un-built destinations.
- **Mega-menu click vs. hover** — the desktop "Sản phẩm" nav item opens on hover (primary interaction) and also has a click toggle for keyboard/no-hover use; clicking immediately after a hover-open will toggle it closed (a minor, known interaction nuance, not a functional break — hover-driven use works correctly, confirmed live).

## 6. QA

### `npm run check`
```
npm run lint      → pass, 0 errors
npm run typecheck  → pass, 0 errors
npm run build      → pass — 31 routes generated:
  10 /reference/* routes (unchanged, still static)
  / , /uu-dai, /tu-van-chon-san-pham, /cau-chuyen-thuong-hieu (static)
  /san-pham (dynamic — reads searchParams)
  /san-pham/[slug] × 14 (SSG via generateStaticParams)
```

### grep check (`Caudalie` / `caudalie` / `en.caudalie.com`)
```
grep -rniE "caudalie|en\.caudalie\.com" src/app --include="*.tsx" --include="*.ts" | grep -v "src/app/reference/"
grep -rniE "caudalie|en\.caudalie\.com" src/components/hh
```
Result: only developer code **comments** documenting pattern provenance (e.g. `// pattern cloned from the shared Caudalie Header`) — verified by filtering out comment-prefixed lines, which left **zero** matches. No asset path, no URL, no user-facing string. The only non-comment hits anywhere in scope are in the untouched, shared `src/app/layout.tsx` (still legitimately loading Caudalie fonts and the default title, required for `/reference/*` to keep rendering unchanged) — outside this scan's intended target per the task's own framing ("route /reference vẫn giữ nguyên"). `en.caudalie.com` does not appear anywhere in `src/app` (excl. reference) or `src/components/hh`.

### Live verification
- `<title>` on `/`: confirmed via `curl` as **"Hoàng Hà — Le Petit Marseillais Việt Nam"**.
- `<link rel="icon" href="/hh/favicon.svg">` confirmed present in the rendered `<head>` (see §3 caveat about the co-present root favicon.ico).
- Visually verified in-browser at desktop (1440px) and mobile (~606px effective, platform-capped) widths: homepage (hero, category tiles, best sellers, combo grid, brand-story teaser, membership band, footer), PDP (gallery thumbnails, buy box math, combo contents), `/san-pham` category- and scent-filtering (pill active state + heading update), search overlay (real substring results + count), cart drawer (qty +/-, free-shipping math, order-summary accordion), mobile hamburger drawer, sign-in/register modal swap + validation, `/uu-dai`, `/tu-van-chon-san-pham` (scent card → filtered listing), `/cau-chuyen-thuong-hieu` (no overlap, confirmed at mobile width).
- Re-verified `/reference/search` unchanged: same Caudalie title, fonts, colors, layout, content — zero regression.

## 7. Stopping point

Phase 1 production UI is complete per the task's scope: 18/18 requested UI sections built, 6/6 routes wired, `npm run check` green, grep clean, `/reference/*` untouched and re-verified. **Not deployed**, per instruction. Waiting for review before any further phase (real assets, real backend, checkout, persistence, or route-group restructuring for the favicon edge case).
