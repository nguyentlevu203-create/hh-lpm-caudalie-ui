# Page Topology — en.caudalie.com (Homepage)

Target URL: https://en.caudalie.com/
Framework detected: Nuxt (Vue) — Tailwind-like utility class names present in DOM (`relative z-30`, `sticky lg:relative`, etc.)

## Overall Layout
- Single scrolling column, `max-width` content container centered, full-bleed image sections break out to viewport width.
- No page-level scroll-snap, no smooth-scroll library detected (native scroll).
- No sticky/fixed main header at desktop (`header { position: static }`).
- The hamburger + search bar row IS responsively sticky: class `sticky lg:relative top-0 w-full bg-th-white border-b lg:border-b-0 z-10` — sticky below the `lg` breakpoint (~1024px), static (scrolls away) at `lg` and above.
- Floating widgets (fixed, high z-index): chat/support bubble bottom-right (`ANY QUESTIONS? FIND A GIFT?` mini popup that auto-opens on load, dismissible via X), likely a third-party iframe widget.

## Sections, top to bottom (desktop 1440px)

1. **Promo Top Bar** — full-width dark purple bar, centered white text, e.g. "We're doubling your loyalty points!". Static, no dismiss button observed.
2. **Header** — logo (CAUDALIE wordmark, centered-left), location-pin icon, account icon (with red notification dot), cart/bag icon (right-aligned). Static position.
3. **Primary Nav Bar** — horizontal menu: Summer Selection (highlighted yellow pill/bg), Shop, New, Best-sellers, Gifts & offers, Needs, Spa & events, About Caudalie, Scan Your Skin (grey pill, right-aligned). Interaction: **hover-driven mega menus** for Shop and Needs (and likely Gifts & offers, Spa & events, About Caudalie) — confirmed via hover test, NOT click-navigation. Each item's mega-menu has unique column content (Shop: Face/Body/Needs/Collections categories; Needs: skin-concern list + 2 promo image tiles + "Find your regimen" CTA).
4. **Search Bar** — full-width input with search icon + mic/voice icon. Wrapper is the sticky-below-lg element described above.
5. **Hero Banner** — at desktop: 2-column grid of promo banners shown side-by-side ("Until 07/07 / Double your loyalty points", "Summer freshness / A free Grape Water..."). At narrower (~1019px and below) width: collapses to a **swipeable single-slide carousel with 2 dot indicators**. INTERACTION MODEL: responsive layout change (grid → carousel), carousel is click/swipe-driven (dots visible, not auto-verified for autoplay).
6. **"Your Selection"** — heading + filter pills (Best Sellers / Recently Viewed / New — click-driven tab switch, "Best Sellers" active by default) + horizontally scrollable product card row (5+ cards visible, each: badge tag like "New"/"Limited edition", wishlist heart icon, product image, title, subtitle, star rating + review count, price, "Add to bag" button).
7. **"The Caudalie Experience"** — heading + horizontally scrollable card row (5 cards: "Powered by the Grape", "Skin diagnosis", "Earn loyalty points", "Welcome offer", "Where..."(cropped, likely "Where our boutiques are")). Each card: image, title, description, CTA button (Shop now / Scan my skin).
8. **"Discover our cults"** — heading with underline + pull-quote text ("Powered by the grape. Patented, highly effective, natural formulas.") + "Shop now" button + horizontally scrollable product image row (3+ images: serum, green bottle, etc.)
9. **Skin Analysis full-bleed banner** — full-width photo (model with phone skin-scan overlay), text card overlaid bottom-left ("Skin Analysis" heading, description, "Scan my skin" CTA). Carousel dots present (2 slides) — same carousel pattern as hero.
10. **"Brand values"** — heading + "Discover" button (top-right), 4-column stat grid: ">95% NATURAL-ORIGIN INGREDIENTS" (circular text badge), "0% Parabens, phenoxyethanol, mineral oils, PEG, silicones, sodium laureth sulfate, animal ingredients." (large 0% numeral), "1% FOR THE PLANET MEMBER" (circular badge), "100% OCEAN PLASTIC COLLECT" (circular arrow badge). Alternating light-grey / white column backgrounds.
11. **"Beauty from the vine"** — full-bleed background image/video (grapes on vine, blurred), centered white heading + paragraph + "Discover our story" button.
12. **"Follow us on Instagram"** — heading + "Follow us on Instagram" button (top-right, with Instagram glyph), horizontally scrollable image row (real Instagram post thumbnails).
13. **SEO text block** — centered heading "Our natural skincare to pamper your skin" + 2-3 paragraphs of body copy + footnote "(1) Except Suncare and Fresh Fragrances".
14. **"Your permanent benefits"** band — full-width dark purple background, white text, centered heading, 4 items in a row (desktop) each with icon + heading + subtext: Free delivery (over €39*), MYCAUDALIE loyalty program (100 points = 1 gift), A FREE travel-size product (when you spend €49), Exclusive offers (all year round).
15. **Footer**:
    - Left column: 4 accordion sections (click-to-expand, "+" icon toggles): "Order online", "Services", "About Caudalie", "Need help?"
    - Right column: "Let's be grape friends" newsletter signup (email input + "OK" submit), social icons row (Instagram, Facebook, YouTube, TikTok, LinkedIn), legal consent text below.
    - Bottom legal bar: country/flag selector ("International" dropdown), then links: Personal data & Cookies, T&C, Legal Note, Loyalty Program, MYCAUDALIE terms, © Caudalie Copyright.

## Mobile (≤500px, tool's minimum resizable width) differences
- Header collapses to: hamburger icon (left) — logo (center) — account icon + cart icon (right). Location pin icon hidden.
- Search bar remains full-width below header, always sticky (mobile is below `lg` breakpoint).
- Hamburger opens a **left slide-in drawer** (not hover mega-menu): back-arrow + logo at top, vertical list of nav items, expandable items show a chevron (Shop, Gifts & offers, Needs, Spa & events, About Caudalie), non-expandable items are plain links (New, Best-sellers). "Scan Your Skin" rendered as a highlighted pill row. Below the nav list, a purple utility panel: "My account", "Enter your unique code", "Find a store" (each with icon).
- Hero banner grid collapses to single full-width slide (carousel behavior, same dots pattern as desktop's narrow-width state).
- Horizontally scrollable card rows (Your Selection, Caudalie Experience, Discover our cults, Instagram) become swipeable single/partial-card-visible carousels (already partly visible at 1019px width, cards ~1.3 per view).
- Brand values 4-column grid likely stacks to 2 columns or 1 column (not yet confirmed at true 390px — verify during build QA).
- Footer accordions likely default to collapsed on mobile too (behavior consistent across breakpoints, only the desktop layout may show them expanded — verify during extraction).

## Assets & Widgets Noted
- Third-party chat widget (bottom-right, auto-opens "ANY QUESTIONS? FIND A GIFT?" prompt on load, dismissible via X, iframe-based) — treat as out-of-scope mock or simple static UI replica per project defaults (no real backend chat).
- Self-hosted custom font family "Caudalie" (Regular/Light/Bold/Italic variants), NOT a Google Font.
