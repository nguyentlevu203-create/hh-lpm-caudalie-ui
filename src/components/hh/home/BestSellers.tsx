"use client";

import { useState } from "react";
import { ProductCard } from "@/components/hh/product/ProductCard";
import { getBestSellers } from "@/data/products";

type FilterKey = "bestSellers" | "recentlyViewed" | "new";

const filters: { key: FilterKey; label: string }[] = [
  { key: "bestSellers", label: "Bán chạy" },
  { key: "recentlyViewed", label: "Đã xem gần đây" },
  { key: "new", label: "Mới về" },
];

/** Product rail — pattern cloned from the shared Caudalie homepage's "Your
 * Selection" rail (src/components/YourSelection.tsx): filter pill tabs
 * above a horizontally scrollable row of product cards. Reuses
 * ProductCard/ProductGrid's card as-is (only the rail wrapper is new); all
 * three tabs point at the same best-seller data set, matching the
 * reference's own YourSelection (its 3 tabs all reuse one demo array too —
 * see production report). */
export function BestSellers() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("bestSellers");
  const products = getBestSellers();

  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 py-12 md:px-8">
      <h2 className="hh-heading-section text-hh-ink">Sản phẩm bán chạy</h2>

      <div className="mt-4 flex flex-wrap gap-2">
        {filters.map((filter) => {
          const isActive = filter.key === activeFilter;
          return (
            <button
              key={filter.key}
              type="button"
              onClick={() => setActiveFilter(filter.key)}
              className={
                isActive
                  ? "rounded-2xl border border-hh-primary bg-hh-primary-soft px-[10px] py-[3px] text-sm text-hh-primary"
                  : "rounded-2xl border border-hh-primary bg-transparent px-[10px] py-[3px] text-sm text-hh-primary"
              }
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
        {products.map((product, index) => (
          <div key={`${activeFilter}-${product.id}-${index}`} className="w-[200px] flex-shrink-0 sm:w-[220px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
