# Footer Specification

## Overview
- **Target file:** `src/components/Footer.tsx`
- **Interaction model:** static link columns (verified — footer accordion `+` icons seen at some viewport widths are likely just a mobile-collapse affordance; at desktop 1440px the columns render fully expanded with plain link lists, confirmed via screenshot). Build as always-expanded columns at desktop; optionally collapse to accordions below `md` if easy, but expanded-by-default static lists are the verified, safe baseline.

## Layout
- Full-width band, background `#2d1946` (brand purple) for the "Your permanent benefits" strip is a SEPARATE component (already handled by `PermanentBenefits.tsx` — do not duplicate it here); this Footer component starts directly below that strip, background white / very light grey (`bg-white` main area, `bg-secondary`/`#f4f3f1` for the newsletter column on the right).
- 4-column link area (`grid grid-cols-1 md:grid-cols-4 gap-8`, left 3 columns) + 1 newsletter column (right, spans remaining width, `bg-secondary p-8`):
  - **Order online**: Track my order, My account, My orders, MYCAUDALIE points, Free shipping, Return policy, Payment options
  - **Services**: Loyalty program, Skin diagnosis, Find a store, Find an event, eGift Card, Paris Yoga & Pilates Studio
  - **About Caudalie**: Our story, 1% for the planet, Recruitment & Careers, Sustainability Report
  - **Need help?**: FAQ, Contact us
  - Column headings: `font-size: 16px`, `font-weight: 400`ish but visually bold/heavier than the links below — use `font-medium text-base text-black mb-4`. Links: `text-base text-black/80 hover:underline`, stacked vertically with `space-y-2` or `space-y-3`.
- **Newsletter column** ("Let's be grape friends"): heading (`text-xl font-normal text-black mb-4`), email input + "OK" submit inline (`flex items-center gap-4`, input has a bottom-border only style: `border-0 border-b-2 border-[#ccc] bg-transparent focus:outline-none px-0 py-2 flex-1`, placeholder "Your email address...", "OK" as a plain text button/link to the right of the input). Below: row of 5 social icons (`flex gap-3 mt-6`) using the real downloaded PNGs via `next/image`, each ~32px circular/square, linking out (`target="_blank" rel="noopener noreferrer"`):
  - `/images/caudalie/icon-instagram.png` → https://www.instagram.com/caudalie
  - `/images/caudalie/icon-facebook.png` → https://www.facebook.com/CaudalieFrance/
  - `/images/caudalie/icon-youtube.png` → https://www.youtube.com/Caudalie
  - `/images/caudalie/icon-tiktok.png` → https://www.tiktok.com/@caudalie (best-guess URL, use as-is)
  - `/images/caudalie/icon-linkedin.png` → https://www.linkedin.com/company/caudalie (best-guess URL, use as-is)
  - Below the icons: small muted legal text: "By registering, you authorize Caudalie to use your email address to send you newsletters and to retain it as part of its Personal Data Protection Policy." (`text-sm text-black/60 mt-4`).
- **Bottom legal bar** (full width, below everything above, `border-t border-border pt-6 pb-6 flex flex-wrap items-center gap-6 text-sm`):
  - Country selector: flag icon (`/images/caudalie/icon-flag-international.svg`, ~20px) + "International" text + a chevron-down, styled as a dropdown trigger (doesn't need real dropdown functionality — static is fine).
  - Links: Personal data & Cookies, T&C, Legal Note, Loyalty Program, MYCAUDALIE terms, © Caudalie Copyright (last one is plain text, not a link).

## Requirements
1. Can be a server component (no required interactivity — the email input doesn't need working submit logic, just markup/state-free).
2. Use `next/image` for the 5 social icons and the flag icon (all already downloaded to `public/images/caudalie/`).
3. Tailwind utility classes only, using brand tokens where they fit (`bg-secondary`, `border-border`, etc. from `src/app/globals.css`).
4. Export default `Footer`, no required props.
5. Do NOT edit `src/app/page.tsx` or other section files.
6. Verify with `npx tsc --noEmit` before finishing.

Report back concisely: what you built and typecheck status.
