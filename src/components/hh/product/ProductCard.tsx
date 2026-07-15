"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { useSiteUI } from "@/components/hh/SiteUIContext";
import type { HHProduct } from "@/data/products";

export function formatVnd(value: number) {
  return value.toLocaleString("vi-VN") + "₫";
}

/** Grid product card — pattern cloned from /reference/category's
 * ProductGridCard (badge top-left, wishlist heart top-right, image, title +
 * meta line, 5-star rating row, price + optional compare-at, full-width
 * CTA) with HH tokens/copy; "Thêm vào giỏ" stays wired to the real cart
 * context (the wishlist heart is presentational-only, matching the
 * reference's own un-wired heart button). */
export function ProductCard({ product }: { product: HHProduct }) {
  const { addToCart } = useSiteUI();
  const filledStars = Math.round(product.rating);

  return (
    <div className="flex flex-col">
      <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-hh-cream">
        {product.badge && (
          <span className="absolute left-2 top-2 z-10 rounded bg-hh-primary px-[10px] py-1 text-xs font-normal text-white">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          aria-label="Thêm vào yêu thích"
          className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm"
        >
          <Heart className="h-4 w-4 text-hh-primary" strokeWidth={1.5} />
        </button>

        <Link href={`/san-pham/${product.slug}`} className="relative block h-full w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-contain p-4"
          />
        </Link>
      </div>

      <Link href={`/san-pham/${product.slug}`} className="mt-3 block">
        <p className="line-clamp-2 text-base font-light text-hh-ink">{product.name}</p>
        <p className="text-sm text-hh-muted-foreground">{product.volume}</p>
      </Link>

      <div className="mt-1 flex items-center gap-1">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={i < filledStars ? "h-4 w-4 fill-hh-accent text-hh-accent" : "h-4 w-4 fill-hh-muted text-hh-border"}
            />
          ))}
        </div>
        <span className="text-sm text-hh-muted-foreground">({product.reviewCount})</span>
      </div>

      <div className="mt-1 flex items-center gap-2">
        <span className="text-base text-hh-ink">{formatVnd(product.price)}</span>
        {product.compareAtPrice && (
          <span className="text-base text-hh-muted-foreground line-through">
            {formatVnd(product.compareAtPrice)}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={() => addToCart(product.slug)}
        className="mt-3 w-full rounded-md border border-hh-primary/40 bg-white px-[15px] py-3 text-base text-hh-primary transition-colors hover:bg-hh-primary hover:text-white"
      >
        Thêm vào giỏ
      </button>
    </div>
  );
}
