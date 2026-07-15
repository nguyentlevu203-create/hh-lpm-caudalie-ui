/**
 * Hoàng Hà / Le Petit Marseillais Việt Nam — Phase 3 full demo catalogue.
 *
 * `HH_PRODUCTS` (83 products) is mechanically generated from the imported,
 * source-tracked catalogue at `src/data/catalog/products.json` (every row
 * of `data-source/hh_web_company.xlsx`, see
 * `docs/production/HH_LPM_FULL_DEMO_DATA_REPORT.md`) via
 * `src/data/catalog/hh-products-derived.json` — not hand-authored. SKU,
 * name, category, description, ingredients and usage all trace back to
 * Hoàng Hà's own workbook. Product photography (`image`/`imageSourceUrl`)
 * comes from the matched Le Petit Marseillais France catalogue only where
 * `matchConfidence` is "exact" — see `src/data/catalog/product-matches.json`
 * for the full confidence tiering (exact/medium/low/unmatched) and why each
 * decision was made. Products without a confident image match render the
 * gradient placeholder instead of a wrong photo.
 *
 * `officialPrice` is null for every product — neither source workbook nor
 * any web source contains real Hoàng Hà pricing. `demoPrice` is a fabricated
 * illustrative placeholder, set for the 14 products explicitly approved for
 * this in Phase 2; the other 69 use `priceMode: "inquiry"` (see
 * PRICE_DISCLAIMER / INQUIRY_PRICE_LABEL) rather than invented numbers.
 * `rating`/`reviewCount` are also illustrative placeholders (no review data
 * exists in either source).
 */
import hhProductsDerived from "./catalog/hh-products-derived.json";

export type HHCategorySlug =
  | "sua-tam"
  | "xa-phong-banh"
  | "duong-the"
  | "cham-soc-tay"
  | "cham-soc-toc"
  | "son-duong-moi"
  | "rua-tay";

export interface HHCategory {
  slug: HHCategorySlug;
  name: string;
  shortName: string;
  description: string;
}

export const HH_CATEGORIES: HHCategory[] = [
  {
    slug: "sua-tam",
    name: "Sữa tắm / Gel tắm",
    shortName: "Sữa tắm",
    description: "Sữa tắm, gel tắm chiết xuất thiên nhiên, hương thơm nhập khẩu từ Pháp.",
  },
  {
    slug: "xa-phong-banh",
    name: "Xà phòng bánh",
    shortName: "Xà phòng",
    description: "Xà phòng bánh truyền thống kiểu Marseille, dịu nhẹ cho da.",
  },
  {
    slug: "duong-the",
    name: "Sữa dưỡng thể",
    shortName: "Dưỡng thể",
    description: "Sữa dưỡng thể cấp ẩm, thẩm thấu nhanh, không nhờn rít.",
  },
  {
    slug: "cham-soc-tay",
    name: "Kem dưỡng tay",
    shortName: "Chăm sóc tay",
    description: "Kem dưỡng tay bỏ túi tiện lợi, làm mềm da tay khô ráp.",
  },
  {
    slug: "cham-soc-toc",
    name: "Dầu gội & Dầu xả",
    shortName: "Chăm sóc tóc",
    description: "Dầu gội, dầu xả phục hồi tóc chắc khỏe từ thiên nhiên.",
  },
  {
    slug: "son-duong-moi",
    name: "Son dưỡng môi",
    shortName: "Dưỡng môi",
    description: "Son dưỡng môi 3 trong 1, nuôi dưỡng và bảo vệ môi khô nứt nẻ.",
  },
  {
    slug: "rua-tay",
    name: "Gel rửa tay",
    shortName: "Rửa tay",
    description: "Gel rửa tay dịu nhẹ, làm sạch mà không gây khô da.",
  },
];

/** "official" = real Hoàng Hà price (never populated in this demo — none
 * exists in either source); "demo" = fabricated illustrative price, always
 * shown with PRICE_DISCLAIMER; "inquiry" = no price at all, shown with
 * INQUIRY_PRICE_LABEL — still addable to cart/checkout, never contributes a
 * fabricated number to any total. */
export type PriceMode = "official" | "demo" | "inquiry";

export interface HHProduct {
  id: string;
  sku: string;
  slug: string;
  name: string;
  category: HHCategorySlug;
  /** "Dòng/định vị" from the source sheet (Hữu cơ, Tiêu chuẩn, Nam, ...). */
  productLine: string | null;
  scent: string;
  volume: string | null;
  /** True when volume was blank in Hoàng Hà's own sheet and this is the
   * matched LPM France reference pack size instead. */
  volumeIsReference?: boolean;
  officialPrice: number | null;
  demoPrice: number | null;
  priceMode: PriceMode;
  compareAtPrice?: number;
  badge?: string;
  bestSeller?: boolean;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  description: string;
  highlights: string[];
  ingredients: string;
  howToUse: string;
  /** Local path under /public once downloaded (Phase E); null renders the
   * gradient placeholder instead of a wrong or missing photo. */
  image: string | null;
  /** Matched LPM France source image URL, kept for traceability/redownload
   * even before (or instead of) a local copy exists. */
  imageSourceUrl?: string | null;
  sellable: boolean;
  referenceOnly: boolean;
  /** "exact" | "medium" | "low" | "unmatched" — see product-matches.json. */
  matchConfidence: string | null;
  /** Set when the source sheet flagged a marketing claim needing RA/legal
   * sign-off before publishing — surfaced in QA tooling only, never shown
   * to shoppers as a customer-facing badge. */
  claimFlag?: string | null;
}

export const PRICE_DISCLAIMER =
  "Giá minh hoạ cho bản demo, chưa phải giá bán chính thức từ Hoàng Hà.";

export const INQUIRY_PRICE_LABEL = "Giá sẽ được nhân viên Hoàng Hà xác nhận";

export const DEMO_DATA_BANNER =
  "Bản demo nội bộ — dữ liệu giá, khuyến mại và thành viên chưa phải chính sách chính thức.";

export const HH_PRODUCTS: HHProduct[] = hhProductsDerived as HHProduct[];

export function getProductBySlug(slug: string): HHProduct | undefined {
  return HH_PRODUCTS.find((p) => p.slug === slug);
}

export function getBestSellers(): HHProduct[] {
  return HH_PRODUCTS.filter((p) => p.bestSeller);
}

export function getProductsByCategory(category: HHCategorySlug): HHProduct[] {
  return HH_PRODUCTS.filter((p) => p.category === category);
}

export function getRelatedProducts(product: HHProduct, limit = 4): HHProduct[] {
  return HH_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.scent === product.scent)
  ).slice(0, limit);
}

/** The price to actually charge/sum, or null when the product has none yet
 * (priceMode "inquiry", or "official" before Hoàng Hà supplies a real
 * price) — callers must never substitute 0 or a guess for null. */
export function getEffectivePrice(product: HHProduct): number | null {
  if (product.priceMode === "official") return product.officialPrice;
  if (product.priceMode === "demo") return product.demoPrice;
  return null;
}

export function hasRealPrice(product: HHProduct): boolean {
  return getEffectivePrice(product) !== null;
}
