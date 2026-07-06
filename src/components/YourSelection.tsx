"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types/content";

const sampleProducts: Product[] = [
  {
    id: "eau-des-vignes",
    badge: "New",
    title: "Fresh Fragrances & Perfumes",
    subtitle: "Fresh Fragrance Eau des Vignes",
    image: "/images/caudalie/product-eau-des-vignes-packshot.jpg",
    rating: 4.5,
    reviewCount: 52,
    price: 30.0,
    href: "#",
  },
  {
    id: "caudalie-essentials",
    badge: "Limited edition",
    title: "Caudalie Essentials x Maria de la Orden",
    subtitle: "",
    image: "/images/caudalie/product-caudalie-essentials-set.jpg",
    rating: 4.5,
    reviewCount: 798,
    price: 16.0,
    href: "#",
  },
  {
    id: "ange-des-vignes",
    badge: "New",
    title: "Fresh Fragrances & Perfumes",
    subtitle: "Ange des Vignes Light Fragrance",
    image: "/images/caudalie/product-ange-des-vignes-packshot.jpg",
    rating: 4.5,
    reviewCount: 34,
    price: 30.0,
    href: "#",
  },
  {
    id: "tinted-lip-balm",
    title: "Vinotherapist™",
    subtitle: "Tinted Lip Balm",
    image: "/images/caudalie/product-tinted-lip-balm.jpg",
    rating: 4.5,
    reviewCount: 86,
    price: 10.0,
    href: "#",
  },
  {
    id: "grape-water",
    title: "Vinoclean",
    subtitle: "Grape Water - 300ml",
    image: "/images/caudalie/product-grape-water.jpg",
    rating: 5,
    reviewCount: 260,
    price: 17.0,
    compareAtPrice: 21.0,
    href: "#",
  },
];

type FilterKey = "bestSellers" | "recentlyViewed" | "new";

const filters: { key: FilterKey; label: string }[] = [
  { key: "bestSellers", label: "Best Sellers" },
  { key: "recentlyViewed", label: "Recently Viewed" },
  { key: "new", label: "New" },
];

const productsByFilter: Record<FilterKey, Product[]> = {
  bestSellers: sampleProducts,
  recentlyViewed: sampleProducts,
  new: sampleProducts,
};

export function YourSelection() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("bestSellers");

  const products = productsByFilter[activeFilter];

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-12 md:px-8">
      <h2 className="text-2xl font-normal text-black md:text-3xl">Your Selection</h2>

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
                  ? "rounded-2xl border border-black bg-black px-[10px] py-[3px] text-base text-white"
                  : "rounded-2xl border border-black bg-transparent px-[10px] py-[3px] text-base text-black"
              }
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
        {products.map((product, index) => (
          <ProductCard key={`${activeFilter}-${product.id}-${index}`} product={product} />
        ))}
      </div>
    </section>
  );
}
