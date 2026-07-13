"use client";

import { useState } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";
import { placeholderShape } from "@/components/hh/product/ProductCard";
import type { HHProduct } from "@/data/products";
import { cn } from "@/lib/utils";

/** 3 synthetic "views" (same placeholder art, flipped/rotated) so the
 * thumbnail-swap interaction from /reference/pdp's ProductGallery is
 * demonstrated honestly — no real multi-angle photography exists yet, so
 * these are not presented as distinct real photos (see production report). */
const VIEW_TRANSFORMS = ["", "scale-x-[-1]", "rotate-2"];

/** Structure cloned 1:1 from /reference/pdp's ProductGallery: a left
 * thumbnail rail (hidden below sm, w-20 square tiles with a border that
 * highlights the active one) plus a flex-1 square main image carrying the
 * badge (top-left), wishlist heart (top-right) and prev/next chevrons
 * overlaid directly on the image. */
export function ProductGallery({ product }: { product: HHProduct }) {
  const [active, setActive] = useState(0);
  const shape = placeholderShape(product.category);

  const goTo = (index: number) => {
    setActive((index + VIEW_TRANSFORMS.length) % VIEW_TRANSFORMS.length);
  };

  return (
    <div className="flex gap-3">
      <div className="hidden w-20 shrink-0 flex-col gap-3 sm:flex">
        {VIEW_TRANSFORMS.map((t, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Xem ảnh ${i + 1}`}
            className={cn(
              "relative aspect-square w-full overflow-hidden rounded-sm border bg-hh-muted",
              active === i ? "border-hh-primary" : "border-transparent"
            )}
          >
            <ProductPlaceholderArt
              colorFrom={product.colorFrom}
              colorTo={product.colorTo}
              shape={shape}
              className={cn("h-full w-full rounded-none", t)}
            />
          </button>
        ))}
      </div>

      <div className="relative aspect-square w-full flex-1 overflow-hidden rounded-sm bg-hh-muted">
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

        <ProductPlaceholderArt
          colorFrom={product.colorFrom}
          colorTo={product.colorTo}
          shape={shape}
          className={cn("h-full w-full rounded-none", VIEW_TRANSFORMS[active])}
        />

        <button
          type="button"
          onClick={() => goTo(active - 1)}
          aria-label="Ảnh trước"
          className="absolute left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80"
        >
          <ChevronLeft className="size-5 text-hh-primary" />
        </button>
        <button
          type="button"
          onClick={() => goTo(active + 1)}
          aria-label="Ảnh sau"
          className="absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80"
        >
          <ChevronRight className="size-5 text-hh-primary" />
        </button>
      </div>
    </div>
  );
}
