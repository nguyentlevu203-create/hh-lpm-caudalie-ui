# Caudalie URL Inventory — en.caudalie.com

Purpose: internal UI-system reference. This is a **URL inventory only** — no cloning/build has started. Scope is the public, unauthenticated surface of the site (English/EU storefront, `en.caudalie.com`).

Site stack note (from prior homepage research in `docs/research/en.caudalie.com/PAGE_TOPOLOGY.md`): the live site runs on **Nuxt/Vue**, not Next.js. Our template's `AGENTS.md` targets Next.js — that's expected; we're cloning visual/UI system only, not the framework.

## 1. Homepage
| URL | Notes |
|---|---|
| `https://en.caudalie.com/` | Full homepage — hero carousel, product rails, brand-values grid, footer. Partial research already exists (`PAGE_TOPOLOGY.md`, `BEHAVIORS.md`). |

## 2. Category / Listing pages
Template: breadcrumb → title/intro copy → filter button → product grid (badges: New / Bestseller / Limited edition / Special offer, wishlist heart, price).

| URL | Notes |
|---|---|
| `/c/all-products/face/serums.html` | Face sub-category — **visited & confirmed**, representative of all `face/*` and `body/*` sub-cats. |
| `/c/all-products.html` | Top-level "all products" — likely richer filter UI (more attributes). |
| `/c/best-sellers.html` | Curated listing variant. |
| `/c/new.html` | Curated listing variant. |

Other listing URLs that share the same template (not needed individually): `/c/all-products/{face,body}/*.html`, `/c/all-products/needs/*.html`, `/c/all-products/collections/*.html` (Premier Cru, Vinoperfect, Vinopure, VinoHydra, Vinoclean, Vinosculpt, Vinotherapist, Suncare, Resveratrol-Lift).

## 3. Product Detail Page (PDP)
| URL | Notes |
|---|---|
| `/p/432C/vinoperfect-radiance-serum-complexion-correcting-432c.html` | Standard PDP — **visited & confirmed**. Gallery w/ video thumbnail, sticky "Add to bag \| price" bar, delivery estimate, breadcrumb. |
| `/p/7265/gift-card.html` | Non-physical / gift-card product — check for a variant PDP layout (no shipping estimate, amount selector). |

## 4. Offers / Gifts
| URL | Notes |
|---|---|
| `/gift-offers/all-offers` | Offers hub/listing. |
| `/gift-offers/offer-double-your-points` | Single-offer landing page (currently the homepage hero promo). |
| `/c/gift-offers/our-limited-editions.html` | Limited-editions listing (category-template variant). |

## 5. Needs / Diagnosis
| URL | Notes |
|---|---|
| `/find-your-regimen/find-your-regimen` | "1 issue, 1 solution" hub — **visited & confirmed**. Colored concern cards linking to collections. |
| `/skin-diag` | Interactive skin-diagnosis / scan tool — distinct app-like flow, worth a dedicated look. |

## 6. About / Brand story
| URL | Notes |
|---|---|
| `/about-caudalie/our-story` | Long-form brand story — **visited & confirmed**. Full-bleed imagery + timeline-style sections. |
| `/about-caudalie/our-commitments-to-the-planet` | Sibling page, same template family (sustainability). |

## 7. Store / Spa / Events
| URL | Notes |
|---|---|
| `/store-locator` | Map + search-by-city/postcode + filter dropdown — **visited & confirmed**. |
| `/les-sources-de-caudalie` | Spa microsite page — **visited & confirmed**. Different tone/layout (gallery carousel, boutique info block, opening hours). |
| `/studio-yoga-pilates-paris` | Events/studio page, same family as spa — not yet opened, likely same template. |

## 8. Search
| URL | Notes |
|---|---|
| `/search?q=serum` | Search results page — **confirmed pattern** (submitted via header search box; `?q=` query param). |

## 9. Cart / Mini-cart
| URL | Notes |
|---|---|
| `/checkout/cart` | Renders as a right-side drawer overlay on top of the current page (not a standalone page) — **visited & confirmed**, empty-state captured. |

## 10. Account / Login
| URL | Notes |
|---|---|
| `/login` | Public sign-in page (email + password, "Register today" CTA) — **visited & confirmed**. Real target is `/customer/account/login`, which redirects here. |
| `/customer/account` | Logged-in account dashboard — **requires auth**, not publicly viewable. Skip unless we create a test account. |

## Other public utility pages (support the design system but aren't primary templates)
- `/rewards-and-benefits` — loyalty program detail page
- `/faq`, `/faq/deliveries`, `/faq/return-policy`, `/faq/payment` — FAQ accordion template
- `/contact` — contact form
- `/personal-data-cookies-en`, `/cgv`, `/legal-statement`, `/mycaudalie-terms` — legal boilerplate pages (low visual value, likely simple text template)

---

## Proposed clone order (priority)

1. **Homepage** (`/`) — foundation; richest set of shared components (header, mega-menu, product card, footer).
2. **Category/Listing** (`/c/all-products/face/serums.html`) — grid, filter UI, breadcrumb.
3. **Product Detail Page** (`/p/432C/vinoperfect-radiance-serum-complexion-correcting-432c.html`) — gallery, sticky add-to-bag bar, PDP-specific components.
4. **Cart drawer** (`/checkout/cart`) — reusable overlay component, quick to capture.
5. **Search results** (`/search?q=serum`) — likely reuses listing-grid components with a different header state.
6. **Login** (`/login`) — form components (inputs, validation states, CTA button).
7. **Needs/Diagnosis hub** (`/find-your-regimen/find-your-regimen`) — distinct card-grid pattern.
8. **Offers hub** (`/gift-offers/all-offers`) — promo-card pattern, may reuse listing/PDP pieces.
9. **About/brand story** (`/about-caudalie/our-story`) — long-form editorial layout, full-bleed sections.
10. **Store locator** (`/store-locator`) — map + list UI, more complex/interactive.
11. **Spa microsite** (`/les-sources-de-caudalie`) — distinct sub-brand layout.
12. *(Optional, lower value)* FAQ (`/faq`) and Contact (`/contact`) — mostly text/form, low unique-component yield.

---

**Status: awaiting approval.** Do not run `/clone-website` until this list is confirmed or adjusted.
