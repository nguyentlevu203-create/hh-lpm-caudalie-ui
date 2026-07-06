# InstagramFeed Specification

## Overview
- **Target file:** `src/components/InstagramFeed.tsx`
- **Interaction model:** static, horizontally-scrollable image row, no lightbox/modal needed.

## Layout
- Header row: heading "Follow us on Instagram" (left, `text-2xl font-normal text-black`) + button "Follow us on Instagram" (right-aligned, outlined pill/rounded button with an Instagram icon, `border border-black/30 rounded-md px-6 py-3 bg-white text-[#2d1946] flex items-center gap-2`) linking to `https://www.instagram.com/caudalie` (use a plain `<a>` tag, `target="_blank" rel="noopener noreferrer"`).
- Below: horizontally-scrolling row (`flex gap-2 overflow-x-auto`) of 6 square-ish Instagram post thumbnails, each `flex-shrink-0 w-[200px] md:w-[264px]`, using `next/image`:
  1. `/images/caudalie/instagram-post-1.png`
  2. `/images/caudalie/instagram-post-2.png`
  3. `/images/caudalie/instagram-post-3.png`
  4. `/images/caudalie/instagram-post-4.png`
  5. `/images/caudalie/instagram-post-5.png`
  6. `/images/caudalie/instagram-post-6.png`
- Each thumbnail links to `https://www.instagram.com/caudaliefrance/` (`target="_blank" rel="noopener noreferrer"`).
- For the Instagram icon in the header button, use `/images/caudalie/icon-instagram.png` (real downloaded icon, ~24px) via `next/image`, not a lucide icon.

## Requirements
1. Plain function component (server component fine, no interactivity needed).
2. Use `next/image` for all images.
3. Tailwind utility classes only.
4. Export default `InstagramFeed`, no required props.
5. Do NOT edit `src/app/page.tsx` or other section files.
6. Verify with `npx tsc --noEmit` before finishing.

Report back concisely: what you built and typecheck status.
