import { Be_Vietnam_Pro, Cormorant_Garamond } from "next/font/google";

/**
 * Fonts for the Hoàng Hà / Le Petit Marseillais Việt Nam production UI.
 * Loaded independently from the Caudalie reference fonts in
 * `src/app/layout.tsx` — applied only via the `.variable` className on
 * `HHShell`, never on `<html>`/`<body>`, so it has zero effect on
 * `/reference/*` pages.
 *
 * Be Vietnam Pro — UI/body sans, used for nav, buttons, forms, prices,
 * badges, and all running body copy (unchanged from before this pass).
 */
export const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hh-vietnam-pro",
  display: "swap",
});

/**
 * Cormorant Garamond — premium editorial display serif, used only for
 * large headings/quotes (hero, page H1, section H2, editorial quote — see
 * `.hh-heading-*`/`.hh-quote` in globals.css). Weights capped at 400/500 —
 * no 600 is needed since no display heading in this pass uses a semibold
 * serif treatment. Confirmed via `next/font/google`'s font-data metadata
 * that Cormorant Garamond ships a `vietnamese` subset, and separately
 * verified live in-browser against real Vietnamese copy with heavy
 * diacritics (see HH_LPM_PREMIUM_TYPOGRAPHY_REPORT.md §7) before adopting
 * it — Lora was the pre-approved fallback if that check had failed.
 */
export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
  variable: "--font-hh-cormorant",
  display: "swap",
});

/**
 * Separate italic-only instance (weight 400, style italic) for `.hh-quote`
 * (the brand-story pull-quote — the one place italic is used). Deliberately
 * NOT folded into `cormorantGaramond` above: next/font loads the full
 * weight×style cross product for a single call, so adding `style: ["normal",
 * "italic"]` there would also pull down an unused 500-italic face. Kept to
 * one weight here instead. Without this, CSS `font-style: italic` on the
 * upright-only face would fall back to the browser's synthetic/faux-slant
 * rendering rather than Cormorant Garamond's real italic letterforms.
 */
export const cormorantGaramondItalic = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-hh-cormorant-italic",
  display: "swap",
});
