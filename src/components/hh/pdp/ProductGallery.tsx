"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import type { HHProduct } from "@/data/products";

/** Structure adapted from /reference/pdp's ProductGallery: a square main
 * image carrying the badge (top-left) and wishlist heart (top-right). The
 * thumbnail rail and prev/next affordances from the reference are dropped
 * here — each real product currently has exactly one matched photo (see
 * production audit), so a multi-view swapper would have nothing real to
 * switch between. */
export function ProductGallery({ product }: { product: HHProduct }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-hh-muted">
      {product.badge && (
        <span className="absolute left-3 top-3 z-10 rounded bg-hh-primary px-[10px] py-1 text-xs font-normal text-white">
          {product.badge}
        </span>
      )}
      <button
        type="button"
        aria-label="Yêu thích"
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm"
      >
        <Heart className="h-4 w-4 text-hh-primary" strokeWidth={1.5} />
      </button>

      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        priority
        className="object-contain p-8"
      />
    </div>
  );
}
