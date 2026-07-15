/**
 * Ingredient story pages — mechanically derived from
 * `data-source/lpm_brand_web.xlsx` sheet `03_Nguyen_lieu` (19 rows, all
 * imported) via `scripts/download-content-images.mjs`. See
 * `src/data/content/ingredients.json` for the full source-tracked import
 * and `docs/production/HH_LPM_FULL_DEMO_DATA_REPORT.md` for coverage notes.
 */
import ingredientsDerived from "./content/ingredients-derived.json";

export interface HHIngredient {
  id: string;
  slug: string;
  name: string;
  headline: string | null;
  h1: string | null;
  intro: string | null;
  origin: string | null;
  benefit: string | null;
  beautyTip: string | null;
  scentExperience: string | null;
  fullContent: string | null;
  image: string | null;
  sourceUrl: string | null;
}

export const HH_INGREDIENTS: HHIngredient[] = ingredientsDerived as HHIngredient[];

export function getIngredientBySlug(slug: string): HHIngredient | undefined {
  return HH_INGREDIENTS.find((i) => i.slug === slug);
}
