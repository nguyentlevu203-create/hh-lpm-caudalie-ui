import type { MetadataRoute } from "next";
import { SITE_ENV } from "@/lib/seo";
import { HH_PRODUCTS } from "@/data/products";
import { HH_ARTICLES } from "@/data/articles";
import { HH_INGREDIENTS } from "@/data/ingredients";
import { HH_BRAND_LIBRARY } from "@/data/brand-library";
import { HH_CONTENT_PAGES } from "@/data/content-library";

/**
 * P2.9 SEO release readiness. Only emits entries when both conditions hold:
 * `NEXT_PUBLIC_SITE_ENV=production` AND `NEXT_PUBLIC_SITE_URL` is set — no
 * domain is hard-coded here, and a staging build (the only state this
 * branch actually ships) intentionally produces an empty sitemap rather
 * than one built on a placeholder/example domain.
 *
 * Deliberately excludes: `/reference/*` (internal parity reference),
 * `/tai-khoan` and `/thanh-toan` (account/checkout), `/thu-vien-hinh-anh`
 * and `/thu-vien-noi-dung` (internal data-library/QA routes) — the same
 * always-noindex set as `app/robots.ts` and `ALWAYS_NOINDEX_ROBOTS`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (SITE_ENV !== "production" || !siteUrl) return [];

  const base = siteUrl.replace(/\/$/, "");
  const url = (path: string): string => `${base}${path}`;

  const staticRoutes = [
    "/",
    "/san-pham",
    "/uu-dai",
    "/tu-van-chon-san-pham",
    "/cau-chuyen-thuong-hieu",
    "/bai-viet",
    "/nguyen-lieu",
    "/noi-dung-thuong-hieu",
    "/thu-vien-san-pham-hang",
    "/thuong-hieu",
    "/cam-ket",
    "/cong-thuc-minh-bach",
  ].map((path) => ({ url: url(path) }));

  const productRoutes = HH_PRODUCTS.map((p) => ({ url: url(`/san-pham/${p.slug}`) }));
  const articleRoutes = HH_ARTICLES.map((a) => ({ url: url(`/bai-viet/${a.slug}`) }));
  const ingredientRoutes = HH_INGREDIENTS.map((i) => ({ url: url(`/nguyen-lieu/${i.slug}`) }));
  const brandLibraryRoutes = HH_BRAND_LIBRARY.map((p) => ({ url: url(`/thu-vien-san-pham-hang/${p.slug}`) }));
  // Content pages that redirect to an already-listed dedicated route
  // (/thuong-hieu, /cam-ket, /cong-thuc-minh-bach) are skipped — they'd
  // otherwise duplicate a static route above at a second URL.
  const contentPageRoutes = HH_CONTENT_PAGES.filter((p) => !p.dedicatedRoute).map((p) => ({
    url: url(`/noi-dung-thuong-hieu/${p.slug}`),
  }));

  return [
    ...staticRoutes,
    ...productRoutes,
    ...articleRoutes,
    ...ingredientRoutes,
    ...brandLibraryRoutes,
    ...contentPageRoutes,
  ];
}
