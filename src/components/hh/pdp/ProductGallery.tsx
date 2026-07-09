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

export function ProductGallery({ product }: { product: HHProduct }) {
  const [active, setActive] = useState(0);
  const shape = placeholderShape(product.category);

  return (
    <div className="flex flex-col gap-3 sm:flex-row-reverse sm:gap-4">
      <div className="relative flex-1">
        <ProductPlaceholderArt
          colorFrom={product.colorFrom}
          colorTo={product.colorTo}
          shape={shape}
          className={cn("aspect-square w-full", VIEW_TRANSFORMS[active])}
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded bg-hh-primary px-2 py-1 text-xs font-medium text-white">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          aria-label="Yêu thích"
          className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/90"
        >
          <Heart className="size-4 text-hh-ink" />
        </button>
        <button
          type="button"
          aria-label="Ảnh trước"
          onClick={() => setActive((v) => (v - 1 + VIEW_TRANSFORMS.length) % VIEW_TRANSFORMS.length)}
          className="absolute left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Ảnh sau"
          onClick={() => setActive((v) => (v + 1) % VIEW_TRANSFORMS.length)}
          className="absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
      <div className="flex gap-2 sm:flex-col">
        {VIEW_TRANSFORMS.map((t, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Xem ảnh ${i + 1}`}
            className={cn(
              "size-16 shrink-0 overflow-hidden rounded-lg border-2",
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
    </div>
  );
}
