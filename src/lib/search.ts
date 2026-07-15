/**
 * Site-wide search — Phase 4 Part 7. Searches across all 7 datasets now
 * surfaced on the site (previously only products + articles). Results stay
 * grouped by dataset so the overlay can render clear sections; each group
 * is capped so a broad query doesn't flood the panel. Brand-library
 * (referenceOnly) results are tagged so callers never render an
 * add-to-cart affordance for them.
 */
import { HH_PRODUCTS, HH_CATEGORIES, type HHProduct } from "@/data/products";
import { HH_BRAND_LIBRARY, type HHBrandLibraryProduct } from "@/data/brand-library";
import { HH_INGREDIENTS, type HHIngredient } from "@/data/ingredients";
import { HH_ARTICLES, type HHArticle } from "@/data/articles";
import { HH_CONTENT_PAGES, contentPageRoute, type HHContentPage } from "@/data/content-library";
import { HH_CARDS, type HHCard } from "@/data/cards";
import { HH_MEDIA_LIBRARY, type HHMediaRecord } from "@/data/media-library";

const GROUP_LIMIT = 6;

function includesQuery(haystack: Array<string | null | undefined>, q: string): boolean {
  return haystack.some((field) => field?.toLowerCase().includes(q));
}

export interface SiteSearchResults {
  query: string;
  products: HHProduct[];
  brandLibrary: HHBrandLibraryProduct[];
  ingredients: HHIngredient[];
  articles: HHArticle[];
  contentPages: HHContentPage[];
  cards: HHCard[];
  media: HHMediaRecord[];
  totalCount: number;
}

export function searchSite(rawQuery: string): SiteSearchResults {
  const q = rawQuery.trim().toLowerCase();
  if (!q) {
    return {
      query: q,
      products: [],
      brandLibrary: [],
      ingredients: [],
      articles: [],
      contentPages: [],
      cards: [],
      media: [],
      totalCount: 0,
    };
  }

  const products = HH_PRODUCTS.filter((p) => {
    const categoryName = HH_CATEGORIES.find((c) => c.slug === p.category)?.name ?? "";
    return includesQuery([p.name, p.scent, p.shortDescription, categoryName], q);
  }).slice(0, GROUP_LIMIT);

  const brandLibrary = HH_BRAND_LIBRARY.filter((p) =>
    includesQuery([p.nameVi, p.nameOriginal, p.productLine, p.scentOrKeyIngredient], q)
  ).slice(0, GROUP_LIMIT);

  const ingredients = HH_INGREDIENTS.filter((i) => includesQuery([i.name, i.headline, i.intro], q)).slice(
    0,
    GROUP_LIMIT
  );

  const articles = HH_ARTICLES.filter((a) => includesQuery([a.title, a.topic, a.intro], q)).slice(0, GROUP_LIMIT);

  const contentPages = HH_CONTENT_PAGES.filter((p) => includesQuery([p.pageName, p.h1, p.intro], q)).slice(
    0,
    GROUP_LIMIT
  );

  const cards = HH_CARDS.filter((c) => includesQuery([c.title, c.description], q)).slice(0, GROUP_LIMIT);

  const media = HH_MEDIA_LIBRARY.filter((m) => includesQuery([m.altTextVi], q)).slice(0, GROUP_LIMIT);

  const totalCount =
    products.length +
    brandLibrary.length +
    ingredients.length +
    articles.length +
    contentPages.length +
    cards.length +
    media.length;

  return { query: q, products, brandLibrary, ingredients, articles, contentPages, cards, media, totalCount };
}

export { contentPageRoute };
