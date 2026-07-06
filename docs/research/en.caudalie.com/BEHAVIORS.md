# Behaviors — en.caudalie.com (Homepage)

## Scroll Sweep
- **No sticky/floating main header at desktop.** `header { position: static }` — confirmed via `getComputedStyle`. Scrolls away normally.
- **Search bar row IS sticky, but only via a responsive Tailwind-style class, not a scroll listener.** Exact class found: `sticky lg:relative top-0 w-full bg-th-white border-b lg:border-b-0 z-10`.
  - Below `lg` breakpoint (tested at 1019px): `position: sticky; top: 0` — stays pinned while scrolling, with a bottom border, height ~87px (includes hamburger icon + search input row).
  - At `lg` and above (tested at 1440px): `position: relative` — scrolls away with the rest of the header.
  - IMPLEMENTATION: use Tailwind `sticky lg:relative top-0 z-10` classes on the wrapper div — no JS/IntersectionObserver needed.
- **No scroll-snap** on any container (`scroll-snap-type` not found on body/main).
- **No smooth-scroll library** detected (no `.lenis`, `.locomotive-scroll`, or similar wrapper classes).
- Product/card rows (Your Selection, Caudalie Experience, Discover our cults, Instagram feed) are **horizontally scrollable flex/grid rows**, not scroll-snap carousels with JS control — natural horizontal overflow-x scroll, confirmed by partial-card-visible cropping at every viewport width tested.
- No elements observed animating into view on scroll (no fade-up/stagger reveal detected during the sweep) — sections render immediately as they enter viewport with no transition. If subtle IntersectionObserver-based fades exist they were not visually detectable during this pass; treat homepage sections as static-on-scroll unless a builder discovers otherwise while extracting a specific section.

## Click Sweep
- **Nav "Shop" item**: clicking (not hovering) navigates away to `/c/all-products.html` (a real category listing page) — this is a real `<a>` link, not a JS-only dropdown trigger. The mega-menu overlay is a **separate hover interaction** that intercepts before a click completes (see Hover Sweep).
- **"Your Selection" filter pills** (Best Sellers / Recently Viewed / New): click-to-switch tabs, "Best Sellers" active by default (visually: filled/outlined pill state — exact active-state colors need per-component extraction pass).
- **Footer accordions** (Order online / Services / About Caudalie / Need help?): each has a `+` icon that is presumed to toggle expand/collapse on click (standard accordion pattern) — confirmed present as closed-by-default at page load; click-to-expand behavior assumed standard, verify exact expand animation during footer component extraction.
- **Newsletter "OK" button**: submits email input (not tested — do not submit real data during extraction).
- **Hamburger menu (mobile/tablet, <lg width)**: click opens a **left slide-in drawer** overlaying the page with a dimmed backdrop. Drawer has its own back-arrow to close, and nested chevron items presumably expand in-place (sub-accordion) rather than navigating — not fully drilled down during this pass; verify one nested item during nav component build.
- **Chat widget bubble**: auto-opens a small popup ("ANY QUESTIONS? FIND A GIFT?") on page load without user interaction; has its own collapse chevron and an X close button. Treat as a static cosmetic replica (no real chat backend per project scope).

## Hover Sweep
- **Desktop nav items with children open mega-menu dropdowns on hover** (confirmed for "Shop" and "Needs"; visually indicated by an underline appearing beneath the hovered label). Each mega-menu is full-width, positioned directly below the nav bar, white background, no visible entrance animation captured (appeared instantly in screenshots — treat as opacity/display toggle, verify transition timing during header component extraction).
  - "Shop" mega-menu: 4 columns (Face, Body, Needs, Collections), each a heading + underline + vertical link list, plus a centered "Discover all products" outlined button below all columns, plus product recommendation cards peeking at the very bottom (partially visible, cut off in capture — verify during extraction).
  - "Needs" mega-menu: different internal layout — vertical concern-list column on the left, a text label + 2 promo image tiles on the right ("Learn how to treat dark spots", "Get your 30-second Skin Analysis"), and a centered "Find your regimen" button below.
  - CONCLUSION: mega-menu is a shared shell component with **per-nav-item custom content**, not a single reusable grid — each nav item needs its own content data structure.
- Wishlist heart icons on product cards, "Add to bag" buttons: hover states not captured with pixel diffs in this pass (no before/after computed-style diff taken) — capture exact hover color/shadow changes during the Your Selection / product-card component extraction step.

## Responsive Sweep
Tested at 1440px (desktop), 1019px (tablet-ish — this project's `lg` breakpoint boundary), and 500px (mobile — this is the browser automation tool's minimum resizable window width; true 390px could not be forced, treat 500px findings as a close proxy and re-verify true small-mobile layout with Chrome DevTools device emulation or CSS review during build if pixel-exact mobile spacing matters).

- **1440px**: Full horizontal nav bar visible with all top-level items. Hero banner renders as a 2-column side-by-side grid (2 distinct promo banners, no dots). "Your Selection" and other card rows show 5+ cards per row before overflow.
- **1019px**: Nav bar still shows full horizontal item list (hasn't collapsed to hamburger yet — the `lg` breakpoint for hamburger-vs-full-nav is narrower than 1019px, OR nav bar and hamburger/search-sticky-row are controlled by different breakpoints — verify exact breakpoint value in extracted CSS during header build). Hero banner changes from 2-column grid to a **single-slide carousel with 2 dot indicators** — confirms the grid→carousel swap happens somewhere between 1440 and 1019px. Search bar becomes sticky (see Scroll Sweep).
- **500px**: Full hamburger-drawer navigation (no horizontal nav bar at all). Header: hamburger — logo — account/cart icons only, location pin icon hidden. Card rows show ~1.3 cards per view (clearly horizontally scrollable). Hero banner: single full-width slide.
- **Breakpoint estimate**: hamburger-vs-full-nav swap and hero grid-vs-carousel swap both occur somewhere in the 1020–1440px range — narrow this down to an exact pixel value (likely Tailwind `lg` = 1024px or custom) when extracting the header/hero components, by testing at 1024px, 1100px, 1279px etc.
- Brand values 4-column grid and footer accordion default-state at true mobile width were not re-verified after the 500px-minimum constraint was discovered — confirm during those components' extraction passes.
