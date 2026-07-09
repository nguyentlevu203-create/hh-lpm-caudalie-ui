"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";
import { useSiteUI } from "@/components/hh/SiteUIContext";
import type { HHProduct } from "@/data/products";

export function formatVnd(value: number) {
  return value.toLocaleString("vi-VN") + "₫";
}

export function placeholderShape(category: HHProduct["category"]) {
  if (category === "xa-phong-banh") return "soap" as const;
  if (category === "cham-soc-tay") return "tube" as const;
  return "bottle" as const;
}

/** Grid product card — pattern cloned from /reference/category's
 * ProductGridCard (badge, rating row, price + compare-at, full-width CTA)
 * with HH tokens/copy; "Thêm vào giỏ" is wired to the real cart context. */
export function ProductCard({ product }: { product: HHProduct }) {
  const { addToCart } = useSiteUI();

  return (
    <div className="flex flex-col">
      <Link href={`/san-pham/${product.slug}`} className="relative block">
        <ProductPlaceholderArt
          colorFrom={product.colorFrom}
          colorTo={product.colorTo}
          shape={placeholderShape(product.category)}
          className="aspect-square w-full"
        />
        {product.badge && (
          <span className="absolute left-2 top-2 rounded bg-hh-primary px-2 py-1 text-xs font-medium text-white">
            {product.badge}
          </span>
        )}
      </Link>
      <Link href={`/san-pham/${product.slug}`} className="mt-3">
        <p className="line-clamp-2 text-sm font-medium text-hh-ink">{product.name}</p>
        <p className="mt-0.5 text-xs text-hh-muted-foreground">{product.volume}</p>
      </Link>
      <div className="mt-1 flex items-center gap-1 text-xs text-hh-muted-foreground">
        <Star className="size-3.5 fill-hh-accent text-hh-accent" />
        <span>{product.rating}</span>
        <span>({product.reviewCount})</span>
      </div>
      <div className="mt-1 flex items-center gap-2">
        <span className="text-sm font-semibold text-hh-ink">{formatVnd(product.price)}</span>
        {product.compareAtPrice && (
          <span className="text-xs text-hh-muted-foreground line-through">
            {formatVnd(product.compareAtPrice)}
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={() => addToCart(product.slug)}
        className="mt-3 h-10 w-full rounded-md border border-hh-primary/40 text-sm font-medium text-hh-primary transition-colors hover:bg-hh-primary hover:text-white"
      >
        Thêm vào giỏ
      </button>
    </div>
  );
}
