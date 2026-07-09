"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { useSiteUI } from "@/components/hh/SiteUIContext";
import { ProductCard } from "@/components/hh/product/ProductCard";
import { HH_PRODUCTS, HH_CATEGORIES } from "@/data/products";
import { cn } from "@/lib/utils";

/** Full-screen search overlay — pattern cloned from /reference/search
 * (category quick-links, result-count summary, product grid, empty state)
 * but wired to a real (client-side, substring) search over the static
 * catalog instead of a "try this fixed query" toggle. */
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

      <div className="flex-1 overflow-y-auto px-4 py-6">
        {query.trim() === "" ? (
          <>
            <p className="text-sm font-medium text-hh-ink">Danh mục gợi ý</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {HH_CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setQuery(cat.shortName)}
                  className="rounded-full border border-hh-border px-4 py-1.5 text-sm text-hh-ink"
                >
                  {cat.shortName}
                </button>
              ))}
            </div>
          </>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <p className="text-lg font-medium text-hh-ink">Không tìm thấy sản phẩm cho “{query}”</p>
            <p className="text-sm text-hh-muted-foreground">
              Thử tìm theo tên mùi hương như &quot;oải hương&quot;, &quot;hoa hồng&quot;...
            </p>
          </div>
        ) : (
          <>
            <p className="mb-4 text-sm font-medium text-hh-ink">
              {results.length} kết quả cho &quot;{query}&quot;
            </p>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {results.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
