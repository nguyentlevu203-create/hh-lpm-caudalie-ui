"use client";

"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";
import { useAccount } from "@/components/hh/AccountContext";
import { cn } from "@/lib/utils";
import type { HHProduct } from "@/data/products";

/** Structure adapted from /reference/pdp's ProductGallery: a square main
 * image carrying the badge (top-left) and wishlist heart (top-right). The
 * thumbnail rail and prev/next affordances from the reference are dropped
 * here — each real product currently has exactly one matched photo (see
 * production audit), so a multi-view swapper would have nothing real to
 * switch between. */
export function ProductGallery({ product }: { product: HHProduct }) {
  const { isWishlisted, toggleWishlist } = useAccount();
  const wishlisted = isWishlisted(product.slug);

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-hh-muted">
      {product.badge && (
        <span className="absolute left-3 top-3 z-10 rounded bg-hh-primary px-[10px] py-1 text-xs font-normal text-white">
          {product.badge}
        </span>
      )}
      <button
        type="button"
        onClick={() => toggleWishlist(product.slug)}
        aria-label={wishlisted ? "Bỏ khỏi yêu thích" : "Yêu thích"}
        aria-pressed={wishlisted}
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm"
      >
        <Heart className={cn("h-4 w-4 text-hh-primary", wishlisted && "fill-hh-primary")} strokeWidth={1.5} />
      </button>

      {product.image ? (
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
          className="object-contain p-8"
        />
      ) : (
        <ProductPlaceholderArt
          colorFrom="#c7ab7a"
          colorTo="#e8d5ac"
          shape={product.category === "xa-phong-banh" ? "soap" : product.category === "cham-soc-tay" ? "tube" : "bottle"}
          className="h-full w-full rounded-none"
        />
      )}
    </div>
  );
}
