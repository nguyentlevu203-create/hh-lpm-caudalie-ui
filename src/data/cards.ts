/**
 * All 159 `07_Cards_CTA` cards — classified and downloaded by
 * `scripts/build-cards-library.mjs`. See
 * `docs/production/HH_LPM_DATA_TO_UI_COVERAGE_AUDIT.md` for the
 * classification methodology (path-bucket category + exact-URL item match).
 */
import cardsDerived from "./content/cards-derived.json";

export type HHCardCategory =
  | "san-pham"
  | "nguyen-lieu"
  | "bai-viet"
  | "noi-dung-thuong-hieu"
  | "campaign"
  | "cta-chung"
  | "chua-phan-loai";

export interface HHCard {
  id: string;
  title: string;
  description: string | null;
  cta: string | null;
  image: string | null;
  imageSourceUrl: string | null;
  targetUrl: string | null;
  sourcePage: string | null;
  category: HHCardCategory;
  matchedType: "ingredient" | "article" | "brand_content" | "brand_library" | null;
  matchedSlug: string | null;
  matchedTitle: string | null;
  matchedRoute: string | null;
}

export const HH_CARDS: HHCard[] = cardsDerived as HHCard[];

export const CARD_CATEGORY_LABEL: Record<HHCardCategory, string> = {
  "san-pham": "Sản phẩm",
  "nguyen-lieu": "Nguyên liệu",
  "bai-viet": "Bài viết",
  "noi-dung-thuong-hieu": "Nội dung thương hiệu",
  campaign: "Campaign",
  "cta-chung": "CTA chung",
  "chua-phan-loai": "Chưa phân loại",
};

/** Cards to embed as a related-content carousel on a specific detail page —
 * only the ones whose target URL resolved to that exact slug. */
export function getCardsForRoute(route: string): HHCard[] {
  return HH_CARDS.filter((c) => c.matchedRoute === route);
}
