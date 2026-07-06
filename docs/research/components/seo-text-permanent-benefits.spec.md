# SeoTextBlock + PermanentBenefits Specification

## Overview
- **Target files:** `src/components/SeoTextBlock.tsx` and `src/components/PermanentBenefits.tsx` (two small, simple, static sections — kept in one spec file since both are low-complexity, but must be built as separate component files/exports).
- **Interaction model:** both fully static, no interactivity.

## SeoTextBlock
- Centered text block, `max-w-3xl mx-auto text-center px-4`.
- Heading: "Our natural skincare to pamper your skin" — `font-size: 36px`, `font-weight: 400`, `color: #000`, centered.
- 2 paragraphs of body copy (centered, `text-base text-black`, `space-y-4`):
  1. "At Caudalie, we believe in the power of Nature to provide the best skincare for your skin: the most effective, the most natural, the cleanest and the most sustainable. That's why all our skincare products are formulated with at least 95% natural origin ingredients⁽¹⁾, carefully selected to deliver results that can be seen, while respecting your skin."
  2. "All of our skincare products are created in France at our Natural Formulation Laboratory. Our team of formulators surpass themselves every day to create a new generation of highly natural skincare. All Caudalie products follow a very strict naturality charter which is improved every year, for cosmetics that are ever more sustainable and natural. Whether you're looking for a day cream, cleansing gel or face serum, at Caudalie, you'll find the skincare product that meets your skin's needs."
  3. "Our unique, innovative formulas are designed using patented ingredients, developed with the best anti-ageing research labs, for visible, lasting results. Experience the perfect combination of science and the power of ingredients from the vine with our natural beauty products. Discover our emblematic natural skincare collections and reveal your beauty."
- Footnote below (small, muted grey, centered): "(1) Except Suncare and Fresh Fragrances"

## PermanentBenefits
- Full-width band, `background-color: #2d1946` (brand purple / `bg-primary`), text color light cream (`text-[#f4f3f1]` or `text-white`), generous vertical padding (`py-16`).
- Heading: "Your permanent benefits" — `font-size: 20px`, `font-weight: 400`, centered.
- Below: 4-column grid at desktop (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8`), each item centered, containing: an icon (simple line-icon, use a lucide icon as a reasonable stand-in — `Truck`-like for delivery, a `Gift`-like icon for the two gift-related ones, and a generic star/badge icon for the loyalty one; check `src/components/icons.tsx` / lucide-react for the closest available icons, e.g. lucide has `Truck`, `Gift`, `Sparkles`, `Award` — pick sensible ones), then heading text + subtext, both centered, white/cream text:
  1. Icon (delivery truck) — "Free delivery" / "over €39*"
  2. Icon (gift/loyalty badge) — "MYCAUDALIE loyalty program" / "100 points = 1 gift"
  3. Icon (gift box) — "A FREE travel-size product of your choice" / "when you spend €49"
  4. Icon (star/sparkle) — "Exclusive offers" / "all year round"

## Requirements
1. Both plain function components (server components fine, no interactivity).
2. `SeoTextBlock` needs no images. `PermanentBenefits` uses lucide icons only (no downloaded images needed) — import additional lucide icons directly from `lucide-react` if not already re-exported from `src/components/icons.tsx` (it's fine to import a few extra ones directly, e.g. `import { Truck, Gift, Sparkles } from "lucide-react"`).
3. Tailwind utility classes only.
4. Export default `SeoTextBlock` from its file and default `PermanentBenefits` from its file.
5. Do NOT edit `src/app/page.tsx` or other section files.
6. Verify with `npx tsc --noEmit` before finishing (zero errors related to your new files).

Report back concisely: what you built and typecheck status.
