"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useSiteUI } from "@/components/hh/SiteUIContext";
import { ProductCard } from "@/components/hh/product/ProductCard";
import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";
import { HH_PRODUCTS, HH_CATEGORIES, getBestSellers } from "@/data/products";
import { HH_ARTICLES } from "@/data/articles";
import { cn } from "@/lib/utils";

/** Full-screen search overlay — internal content structure aligned with
 * /reference/search's SearchResultsView + its 4 sub-components: a
 * result-count summary ("(N kết quả)" / "Không tìm thấy"), a category-pill
 * sidebar block derived from the real matched products, a responsive
 * `lg:grid lg:grid-cols-3` sidebar/grid split (stacked below `lg`), and a
 * real-bestsellers fallback grid (mirroring the reference's "Bestsellers"
 * empty-state rail) instead of a bare "no results" message. Wired to a
 * real (client-side, substring) search over the static catalog — no
 * "try this fixed query" toggle, since that reference affordance is
 * flagged in the spec as reference-only, not part of the live site. */
export function SearchOverlay() {
  const { active, close } = useSiteUI();
  const isOpen = active === "search";
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return HH_PRODUCTS.filter((product) => {
      const categoryName = HH_CATEGORIES.find((c) => c.slug === product.category)?.name ?? "";
      return [product.name, product.scent, product.shortDescription, categoryName].some((field) =>
        field.toLowerCase().includes(q)
      );
    });
  }, [query]);

  const matchedCategories = useMemo(() => {
    return results.map(
      (product) => HH_CATEGORIES.find((c) => c.slug === product.category)?.name ?? ""
    );
  }, [results]);

  const articleResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return HH_ARTICLES.filter((article) =>
      [article.title, article.topic, article.intro].some((field) => field?.toLowerCase().includes(q))
    ).slice(0, 6);
  }, [query]);

  const bestSellers = useMemo(() => getBestSellers(), []);
  const hasQuery = query.trim() !== "";

  return (
    <div
      role="dialog"
      aria-label="Tìm kiếm sản phẩm"
      aria-hidden={!isOpen}
      className={cn(
        "fixed inset-0 z-50 flex flex-col bg-white transition-transform duration-300",
        isOpen ? "translate-y-0" : "pointer-events-none -translate-y-full"
      )}
    >
      <div className="flex items-center gap-3 border-b border-hh-border px-4 py-4">
        <div className="flex flex-1 items-center gap-2 rounded-full bg-hh-muted px-4 py-2.5">
          <Search className="size-4 text-hh-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm sản phẩm, mùi hương..."
            className="flex-1 bg-transparent text-sm text-hh-ink outline-none placeholder:text-hh-muted-foreground"
          />
        </div>
        <button type="button" onClick={close} aria-label="Đóng tìm kiếm" className="text-hh-ink">
          <X className="size-5" />
        </button>
      </div>

      <div className="mx-auto w-full max-w-[1280px] flex-1 overflow-y-auto px-4 py-6 md:px-8">
        {!hasQuery ? (
          <>
            <p className="mb-4 text-base font-medium text-hh-ink">Danh mục gợi ý</p>
            <ul className="flex flex-wrap gap-2">
              {HH_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <button
                    type="button"
                    onClick={() => setQuery(cat.shortName)}
                    className="inline-block rounded border border-hh-border px-3 py-1 text-sm text-hh-ink"
                  >
                    {cat.shortName}
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="lg:grid lg:grid-cols-3 lg:gap-4">
            <div>
              <p className="mb-4 text-center text-base font-medium text-hh-ink lg:text-left">
                {results.length + articleResults.length > 0
                  ? `(${results.length} sản phẩm, ${articleResults.length} bài viết)`
                  : `Không tìm thấy kết quả cho “${query}”`}
              </p>
              {matchedCategories.length > 0 && (
                <div className="mb-6">
                  <p className="mb-4 text-base font-medium text-hh-ink">Danh mục</p>
                  <ul className="flex flex-wrap gap-2">
                    {matchedCategories.map((category, index) => (
                      <li key={`${category}-${index}`}>
                        <button
                          type="button"
                          onClick={() => setQuery(category)}
                          className="inline-block rounded bg-hh-primary px-3 py-1 text-sm text-white"
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="lg:col-span-2">
              {results.length > 0 || articleResults.length > 0 ? (
                <>
                  {results.length > 0 && (
                    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
                      {results.map((product) => (
                        <li key={product.id}>
                          <ProductCard product={product} />
                        </li>
                      ))}
                    </ul>
                  )}
                  {articleResults.length > 0 && (
                    <div className={results.length > 0 ? "mt-8" : undefined}>
                      <p className="mb-4 text-base font-medium text-hh-ink">Bài viết</p>
                      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {articleResults.map((article) => (
                          <li key={article.id}>
                            <Link href={`/bai-viet/${article.slug}`} onClick={close} className="flex gap-3">
                              <div className="relative size-16 shrink-0 overflow-hidden rounded-sm bg-hh-cream">
                                {article.image ? (
                                  <Image src={article.image} alt={article.title} fill sizes="64px" className="object-cover" />
                                ) : (
                                  <ProductPlaceholderArt colorFrom="#e08a3e" colorTo="#204a37" className="size-16" />
                                )}
                              </div>
                              <div>
                                <p className="line-clamp-2 text-sm font-medium text-hh-ink">{article.title}</p>
                                {article.topic && <p className="text-xs text-hh-muted-foreground">{article.topic}</p>}
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <p className="mb-4 text-base font-medium text-hh-ink">Sản phẩm bán chạy</p>
                  <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {bestSellers.map((product) => (
                      <li key={product.id}>
                        <ProductCard product={product} />
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
