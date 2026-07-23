import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ALWAYS_NOINDEX_ROBOTS } from "@/lib/seo";

/**
 * The root document (`src/app/layout.tsx`) sets `<html lang="vi">` for the
 * 350+ Vietnamese HH production pages. `/reference/*` is the original
 * English-language Caudalie clone used only as an internal parity
 * reference — this nested layout re-asserts `lang="en"` at the highest
 * element `/reference/*` controls, so assistive technology still announces
 * this subtree correctly, without a second `<html>`/`<body>` (which Next.js
 * doesn't support outside the root layout, and would force a full reload
 * between HH and reference routes).
 *
 * P2.9: also pins `robots` to always-noindex here — the internal parity
 * reference must never be publicly indexed even if `NEXT_PUBLIC_SITE_ENV`
 * is ever set to "production" for the HH production routes.
 */
export const metadata: Metadata = { robots: ALWAYS_NOINDEX_ROBOTS };

export default function ReferenceLayout({ children }: { children: ReactNode }) {
  return <div lang="en">{children}</div>;
}
