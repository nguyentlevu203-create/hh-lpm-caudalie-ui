"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { useSiteUI } from "@/components/hh/SiteUIContext";
import { ProductCard } from "@/components/hh/product/ProductCard";
import { HH_PRODUCTS, HH_CATEGORIES, getBestSellers } from "@/data/products";
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
                {results.length > 0
                  ? `(${results.length} kết quả)`
                  : `Không tìm thấy sản phẩm cho “${query}”`}
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
              {results.length > 0 ? (
                <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {results.map((product) => (
                    <li key={product.id}>
                      <ProductCard product={product} />
                    </li>
                  ))}
                </ul>
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
