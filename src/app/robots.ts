import type { MetadataRoute } from "next";
import { SITE_ENV } from "@/lib/seo";

/**
 * P2.9 SEO release readiness. Replaces the previous static
 * `public/robots.txt` (always `Disallow: /`) with an env-aware generated
 * file, mirroring `DEFAULT_ROBOTS` in `@/lib/seo`:
 *
 * - staging (default — `NEXT_PUBLIC_SITE_ENV` unset or anything other than
 *   "production"): `Disallow: /` for every agent, same as before.
 * - production (`NEXT_PUBLIC_SITE_ENV=production`, a real launch decision
 *   not made in this branch): allows public routes, but still disallows
 *   `/reference`, `/tai-khoan`, `/thanh-toan`, `/thu-vien-hinh-anh`, and
 *   `/thu-vien-noi-dung` — the same always-noindex routes as
 *   `ALWAYS_NOINDEX_ROBOTS`.
 *
 * `sitemap` is only included when `NEXT_PUBLIC_SITE_URL` is set — no
 * domain is hard-coded here (per project instruction not to hard-code an
 * unconfirmed domain).
 */
const ALWAYS_DISALLOWED_PATHS = ["/reference", "/tai-khoan", "/thanh-toan", "/thu-vien-hinh-anh", "/thu-vien-noi-dung"];

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (SITE_ENV !== "production") {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ALWAYS_DISALLOWED_PATHS,
    },
    ...(siteUrl ? { sitemap: `${siteUrl.replace(/\/$/, "")}/sitemap.xml` } : {}),
  };
}
