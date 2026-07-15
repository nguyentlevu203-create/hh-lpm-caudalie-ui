/**
 * Marketing/advice articles — mechanically derived from
 * `data-source/lpm_brand_web.xlsx` sheet `04_Bai_viet_MKT` (71 rows, all
 * imported) via `scripts/download-content-images.mjs`. See
 * `src/data/content/articles.json` for the full source-tracked import.
 * 5/71 articles have no hero image in the source data (documented in
 * `docs/production/HH_LPM_FULL_DEMO_DATA_REPORT.md`) — `image` is null for
 * those, rendered with a placeholder rather than a broken `<img>`.
 */
import articlesDerived from "./content/articles-derived.json";

export interface HHArticle {
  id: string;
  slug: string;
  title: string;
  topic: string | null;
  intro: string | null;
  headings: string | null;
  mainContent: string | null;
  image: string | null;
  sourceUrl: string | null;
  relatedProducts: string | null;
}

export const HH_ARTICLES: HHArticle[] = articlesDerived as HHArticle[];

export function getArticleBySlug(slug: string): HHArticle | undefined {
  return HH_ARTICLES.find((a) => a.slug === slug);
}
