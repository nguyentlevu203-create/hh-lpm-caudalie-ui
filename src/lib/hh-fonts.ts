import { Be_Vietnam_Pro } from "next/font/google";

/**
 * Font for the Hoàng Hà / Le Petit Marseillais Việt Nam production UI.
 * Loaded independently from the Caudalie reference fonts in
 * `src/app/layout.tsx` — applied only via the `beVietnamPro.variable`
 * className on `HHShell`, never on `<html>`/`<body>`, so it has zero
 * effect on `/reference/*` pages.
 */
export const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hh-vietnam-pro",
  display: "swap",
});
