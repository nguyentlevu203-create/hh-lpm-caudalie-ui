/**
 * Brand story / commitment / formula-transparency pages — mechanically
 * derived from `data-source/lpm_brand_web.xlsx` sheet `06_Brand_content`
 * (14 rows, all imported) via `scripts/download-content-images.mjs`. The
 * three named routes (/thuong-hieu, /cam-ket, /cong-thuc-minh-bach) each
 * map to the single closest-matching row by name below; the other 11 rows
 * are still fully imported and browsable via /nguyen-lieu-style listing if
 * needed later — see `src/data/content/brand-pages.json` for all 14 (plus
 * the 105-row generic `05_Trang_noi_dung` scrape) with full source tracking.
 */
import brandPagesDerived from "./content/brand-pages-derived.json";

export interface HHBrandPage {
  id: string;
  slug: string;
  pageName: string;
  h1: string | null;
  intro: string | null;
  sections: string | null;
  cards: string | null;
  image: string | null;
  sourceUrl: string | null;
}

export const HH_BRAND_PAGES: HHBrandPage[] = brandPagesDerived as HHBrandPage[];

export function getBrandPageBySlug(slug: string): HHBrandPage | undefined {
  return HH_BRAND_PAGES.find((p) => p.slug === slug);
}

export const THUONG_HIEU_SLUG = "thuong-hieu-le-petit-marseillais";
export const CAM_KET_SLUG = "le-petit-marseillais-cam-ket-bao-ve-moi-truong-tai-provence";
export const CONG_THUC_MINH_BACH_SLUG = "cong-thuc-cua-chung-toi-duoc-trinh-bay-mot-cach-hoan-toan-minh-bach";
