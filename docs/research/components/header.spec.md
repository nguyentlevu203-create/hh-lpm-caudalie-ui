# Header Specification

## Overview
- **Target file:** `src/components/Header.tsx`
- **Interaction model:** hover-driven mega menus (desktop, `lg`+); click-driven slide-in drawer (below `lg`)
- **Reference doc:** see `docs/research/en.caudalie.com/PAGE_TOPOLOGY.md` sections 1-4 and `BEHAVIORS.md`

## Structure (top to bottom)
1. **Promo top bar**: full-width bar, `height: 40px`, background `#2d1946` (brand purple), centered white text, `font-size: 16px` (`text-sm md:text-base` responsive — 14px mobile / 16px desktop), single line message e.g. "We're doubling your loyalty points!". No dismiss control observed. Has class `transition-all ease-in-out duration-700` on outer wrapper (likely for a height-collapse transition if the promo is dismissed elsewhere in the app — implement as a simple static bar, transition not critical to replicate exactly).
2. **Main header row**: white background, contains (left to right): hamburger icon (mobile/tablet only, hidden at `lg`+), CAUDALIE logo (SVG, viewBox `0 0 240.88 49.98`, rendered height `40px` desktop / `30px` mobile, fill `#2d1946`), spacer, location-pin icon (desktop only), account icon (with small red notification dot badge, `#dc2626`), cart/shopping-bag icon. Icons ~24px, color `#2d1946` (use `LogoIcon` from `src/components/icons.tsx` for the logo — already extracted).
3. **Primary nav row** (desktop `lg`+ only, hidden on mobile — replaced by drawer): horizontal flex row of nav items, `font-size: 16px`, `font-weight: 400`, `color: #2d1946`, each item is a link with `border-bottom` underline that appears on hover/active. Items: Summer Selection (has permanent yellow `#fae25f` pill background — `bg-[#fae25f] px-3 py-1` roughly), Shop, New, Best-sellers, Gifts & offers, Needs, Spa & events, About Caudalie, then right-aligned "Scan Your Skin" (grey pill background `#efefef` or similar light grey, rounded, padding ~`8px 16px`).
4. **Search bar row**: wrapper classes exactly `sticky lg:relative top-0 w-full bg-th-white border-b lg:border-b-0 z-10` — CSS-only responsive sticky (sticky + `top:0` below `lg` breakpoint, `relative` at `lg`+). Contains: hamburger icon (mobile only, opens drawer), search input (flex-1, background `#f4f3f1`, `border-radius: 6px` (`rounded-md`), `height: 40px`, `padding: 8px`, `font-size: 16px`, placeholder "Search for a product, a treatment.."), search (magnifying glass) icon inside input on the left, mic icon inside input on the right.

## Mega Menu (hover-driven, desktop only)
Shared shell component, **content differs per nav item** — pass a `megaMenu` data prop (see `MegaMenuColumn`/`MegaMenuPromoTile` types in `src/types/content.ts`). Appears as a full-width white panel directly below the nav row, no visible entrance-animation captured (implement as instant show/hide via CSS `group-hover` or a simple opacity toggle — do not invent a fade timing not observed).

### "Shop" mega menu layout
- 4 columns, each: heading (`font-size: 16px`, underline below heading) + vertical list of text links (`font-size: 16px`, `color: #2d1946`, generous vertical spacing ~12px).
  - Face: Creams & fluids, Cleansers, Serums, Night creams, Toners & Facial Mists, Eye contours & lip Conditioners, Masks/scrubs & peelings, Face Suncare, Face oils, Refills, Self-tan, Travel Sizes
  - Body: Body Lotions, Fragrances, Shower Gels, Hand creams, Body Suncare, Body oils, Deodorant, Body Scrub, After-Sun
  - Needs: Anti-wrinkle Firming, Radiance & Hyperpigmentation, Wrinkles Dark Spots Volume, Dry & Sensitive, Acne-prone skin, Anti-puffiness anti-dark circles, Sun Protection, Body Firming, Healthy glow
  - Collections: Premier Cru, Resveratrol-Lift, Vinoperfect, Vinopure, VinoHydra, Vinoclean, Vinosculpt, Vinotherapist, Suncare
- Centered outlined button below all columns: "Discover all products"

### "Needs" mega menu layout (different internal structure — proves shell is data-driven, not fixed-grid)
- Left: vertical list of skin-concern links: Correct all the signs of ageing, Prolong the youthfulness of your skin, Learn how to treat dark spots, Moisturize and soothe your skin, Cleansing and make-up removal, Get rid of blemishes, Recovering a firm and toned body, Find a Beauty Event Near You
- Right: 2 promo image tiles (portrait, `520x626`-ish aspect) each with a caption overlay: "Learn how to treat dark spots", "Get your 30-second Skin Analysis"
- Centered outlined button below: "Find your regimen"

For other nav items with a chevron/expandable indicator (Gifts & offers, Spa & events, About Caudalie), build the same mega-menu shell and populate with a simple single-column link list as a reasonable placeholder structure (exact content not extracted for these — do not block on it, use plausible category links consistent with an e-commerce skincare site).

## Mobile / Tablet (below `lg`) — Slide-in Drawer
Triggered by hamburger icon. Drawer slides in from the left, dims page behind it (backdrop overlay).
- Top: back-arrow (chevron-left) + centered CAUDALIE logo.
- Vertical nav list matching desktop items; items with children (Shop, Gifts & offers, Needs, Spa & events, About Caudalie) show a chevron-down at the right (tap expands an in-place sub-list — implement as accordion, not navigation).
- "Summer Selection" keeps its yellow pill background even in the drawer list.
- "Scan Your Skin" rendered as its own highlighted/grey pill row.
- Below the nav list: a purple (`#2d1946`) panel with 3 rows, each icon + label: "My account", "Enter your unique code", "Find a store".

## Assets
- Logo: `LogoIcon` in `src/components/icons.tsx` (already extracted, exact path data).
- Generic icons (search, mic, map-pin, user/account, shopping-bag, menu/hamburger, chevron-down, chevron-left, x): import from `src/components/icons.tsx` (re-exported from `lucide-react`).
- Notification dot on account icon: small circle, `background: #dc2626`, positioned top-right of the icon (`absolute -top-1 -right-1`, ~8px diameter).

## Colors
- Purple (primary/brand): `#2d1946`
- Cream/off-white surfaces: `#f4f3f1`
- Yellow highlight (Summer Selection pill): `#fae25f`
- Notification red: `#dc2626`
- Border/divider grey: `#e5e7eb`

## Responsive Behavior
- **Desktop (≥ ~1024-1280px, exact breakpoint TBD — test 1024px first as Tailwind `lg` default):** full horizontal nav bar visible, mega menus on hover, search bar row is `relative` (scrolls away with page).
- **Below that breakpoint:** nav bar collapses entirely (no horizontal item list), hamburger + search row becomes `sticky top-0`, hamburger opens the slide-in drawer instead of hover mega-menus.
- **Mobile (~500px and below):** header row shows hamburger — logo — account icon (with badge) — cart icon only; location-pin icon is hidden.
