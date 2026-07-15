/**
 * Le Petit Marseillais France reference catalogue — mechanically derived
 * from `data-source/lpm_brand_web.xlsx` sheet `01_San_pham` (147 rows, all
 * imported) via `scripts/download-brand-library-images.mjs`. These are
 * NOT Hoàng Hà products: `sellable` is always false, `referenceOnly` is
 * always true. Used only as a browsable reference library
 * (`/thu-vien-san-pham-hang`) — never addable to cart, never shown a price.
 * See `src/data/catalog/brand-products.json` for the full source-tracked
 * import and `docs/production/HH_LPM_DATA_TO_UI_COVERAGE_AUDIT.md` for
 * coverage notes.
 */
import brandLibraryDerived from "./catalog/brand-products-derived.json";

export interface HHBrandLibraryProduct {
  id: string;
  slug: string;
  nameVi: string;
  nameOriginal: string | null;
  categoryRaw: string | null;
  subGroup: string | null;
  productLine: string | null;
  volume: string | null;
  scentOrKeyIngredient: string | null;
  shortDescription: string | null;
  description: string | null;
  benefits: string | null;
  howToUse: string | null;
  ingredients: string | null;
  claims: string | null;
  packaging: string | null;
  image: string | null;
  imageSourceUrl: string | null;
  productUrl: string | null;
  sellable: false;
  referenceOnly: true;
}

export const HH_BRAND_LIBRARY: HHBrandLibraryProduct[] = brandLibraryDerived as HHBrandLibraryProduct[];

export function getBrandLibraryProductBySlug(slug: string): HHBrandLibraryProduct | undefined {
  return HH_BRAND_LIBRARY.find((p) => p.slug === slug);
}

export const BRAND_LIBRARY_CATEGORIES: string[] = Array.from(
  new Set(HH_BRAND_LIBRARY.map((p) => p.categoryRaw).filter((c): c is string => Boolean(c)))
).sort((a, b) => a.localeCompare(b, "vi"));

export const BRAND_LIBRARY_DISCLAIMER =
  "Danh mục tham khảo từ website hãng Le Petit Marseillais (Pháp) — không phải sản phẩm Hoàng Hà đang phân phối tại Việt Nam. Không thể mua hoặc thêm vào giỏ hàng.";
