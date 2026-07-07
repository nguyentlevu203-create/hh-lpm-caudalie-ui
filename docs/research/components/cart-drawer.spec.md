# Cart Drawer Specification

## Overview
- **Source page:** `https://en.caudalie.com/checkout/cart` — a real navigable URL, but it renders as a right-side slide-in "My Cart" drawer over whatever the current page was, not a standalone page. Inspected both the empty state (direct nav with no items) and the populated state (added the Vinoperfect 30ml serum from its PDP first).
- **Target route:** `src/app/reference/cart/page.tsx`
- **Target components:** `src/components/reference/cart/{CartDrawer,CartEmptyState}.tsx`
- **Reused:** `Header`, `Footer`.
- **Interaction model:** the drawer is **open by default** on this reference route (mirroring what happens when you navigate straight to `/checkout/cart` on the live site — it always shows the drawer, never a bare page). It can be closed (back-chevron or backdrop click), which reveals a small "Reopen cart" trigger, and reopened.

## Layout
1. **Header row** — back-chevron (closes drawer) left, "My Cart" centered, cart-bag icon with an item-count badge on the right. (The live site does not show a close `X` here — the back-chevron is the only close affordance, matching the mobile nav drawer pattern reused elsewhere on the site.)
2. **Line item(s)** — product thumbnail, brand + product name, quantity stepper (`− n +`, pill-shaped border), line price, and a small `X` to remove the line entirely. Decrementing quantity to 0 removes the line (matches natural e-commerce behavior — not explicitly re-verified on the live site, but a safe, expected default).
3. **"Choose my free mini"** and **"Add gift box"** — two disclosure rows (label + `ChevronRight`), no real content wired up (placeholder rows only — the live site's expanded content wasn't captured in this pass).
4. **Promo code row** — text input (`PROMO CODE` placeholder) + "Apply" button. No real coupon logic.
5. **Order summary** — collapsible section (starts collapsed, matches the live site's default), header row toggles a `ChevronDown` that rotates 180° when open. Expanded content: "This order gives you N MYCAUDALIE points", item count + subtotal, "Shipping: Free", bold "Total", and a `Lock` icon + "100% Secure payment" line.
6. **Footer CTAs** — "Go to checkout | €total" (primary purple button) and "Buy with Apple Pay" (black button, plain text label — no Apple logo asset used).
7. **Empty state** (`CartEmptyState`) — shown when the cart has zero lines (e.g. after removing the only item): "Your cart is empty" + short helper line + "Go back shopping" button that closes the drawer. Matches the live site's empty-cart copy/layout captured earlier during the URL-inventory pass.

## Data
- Single seed line: Vinoperfect — Dark Spot Brightening Serum Vitamin C Alternative - 30ml, €53.00, qty 1, reusing the already-downloaded `public/images/reference/category/vinoperfect-30ml.jpg` (no new asset needed).
- Loyalty points: `80 × quantity`, matching the PDP's "+40 x 2 = 80 loyalty points" pattern for this same product.
- Shipping always shows "Free" (the live cart showed this for a €53 order, above the site's €39 free-shipping threshold noted elsewhere on the site) — no logic to show a paid-shipping or "spend €X more for free shipping" state, since it wasn't observed in this pass.

## Requirements checklist
1. Do not modify `src/app/page.tsx` or any homepage-only section component.
2. New route at `src/app/reference/cart/page.tsx`; new components under `src/components/reference/cart/`.
3. Reused `Header`/`Footer` consumed as-is.
4. Tailwind utility classes only, existing brand tokens — no new colors.
5. `npm run check` (lint + typecheck + build) must pass.
