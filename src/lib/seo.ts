/**
 * P2.9 SEO release readiness. This site is currently staging — nothing in
 * this branch sets `NEXT_PUBLIC_SITE_ENV=production` anywhere it's actually
 * deployed, so `DEFAULT_ROBOTS` stays noindex exactly as before this file
 * existed. Setting `NEXT_PUBLIC_SITE_ENV=production` at build time (a real
 * launch decision, not made in this branch) opens indexing for public
 * routes via the root layout's `metadata.robots`.
 *
 * `ALWAYS_NOINDEX_ROBOTS` still applies regardless of env to routes that
 * should never be publicly indexed — a page's (or nested layout's) own
 * `metadata.robots` fully replaces, rather than merges with, an ancestor's
 * value in Next.js, so setting this on those specific routes is enough to
 * keep them noindex even after `NEXT_PUBLIC_SITE_ENV=production`.
 */
import type { Metadata } from "next";

export const SITE_ENV: "staging" | "production" =
  process.env.NEXT_PUBLIC_SITE_ENV === "production" ? "production" : "staging";

export const DEFAULT_ROBOTS: Metadata["robots"] =
  SITE_ENV === "production" ? { index: true, follow: true } : { index: false, follow: false, nocache: true };

export const ALWAYS_NOINDEX_ROBOTS: Metadata["robots"] = { index: false, follow: false, nocache: true };
