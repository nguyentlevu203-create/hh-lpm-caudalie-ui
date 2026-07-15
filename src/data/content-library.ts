/**
 * Full brand-content index — Phase 4 Part 3. Covers every row of
 * `06_Brand_content` (14) plus the single unique `ingredient_index_page` row
 * of `05_Trang_noi_dung` (1) — 15 total, built by
 * `scripts/build-content-index.mjs`. The other 104 rows of
 * `05_Trang_noi_dung` are 100%-confirmed scrape duplicates of content
 * already rendered at /nguyen-lieu, /bai-viet, or here — see
 * `content-duplicates-derived.json` / `HH_CONTENT_DUPLICATES` below, which
 * keeps their canonical/duplicate metadata without creating 104 redundant
 * pages. See `docs/production/HH_LPM_DATA_TO_UI_COVERAGE_AUDIT.md`.
 */
import contentPagesDerived from "./content/content-pages-derived.json";
import contentDuplicatesDerived from "./content/content-duplicates-derived.json";

export interface HHContentPage {
  id: string;
  slug: string;
  pageName: string;
  h1: string | null;
  intro: string | null;
  sections: string | null;
  cards: string | null;
  image: string | null;
  sourceUrl: string | null;
  /** Set for the 3 rows that already have a named route from Phase 3
   * (/thuong-hieu, /cam-ket, /cong-thuc-minh-bach) — /noi-dung-thuong-hieu
   * links out to those instead of duplicating the page. */
  dedicatedRoute: string | null;
  isIndexPage?: boolean;
}

export interface HHContentDuplicate {
  id: string;
  pageTypeRaw: string;
  title: string;
  h1: string | null;
  sourceUrl: string | null;
  canonicalType: "ingredient" | "article" | "brand_content" | null;
  canonicalSlug: string | null;
  canonicalTitle: string | null;
  canonicalRoute: string | null;
}

export const HH_CONTENT_PAGES: HHContentPage[] = contentPagesDerived as HHContentPage[];
export const HH_CONTENT_DUPLICATES: HHContentDuplicate[] = contentDuplicatesDerived as HHContentDuplicate[];

export function getContentPageBySlug(slug: string): HHContentPage | undefined {
  return HH_CONTENT_PAGES.find((p) => p.slug === slug);
}

export function contentPageRoute(page: HHContentPage): string {
  return page.dedicatedRoute ?? `/noi-dung-thuong-hieu/${page.slug}`;
}
