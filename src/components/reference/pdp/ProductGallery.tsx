"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Heart, Play } from "@/components/icons";

interface GalleryImage {
  src: string;
  alt: string;
  isVideoStyle?: boolean;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/images/reference/category/vinoperfect-30ml.jpg",
    alt: "Vinoperfect Dark Spot Brightening Serum bottle",
  },
  {
    src: "/images/reference/pdp/vinoperfect-clinical.jpg",
    alt: "Clinical results demonstration",
    isVideoStyle: true,
  },
  {
    src: "/images/reference/pdp/vinoperfect-dark-spots.jpg",
    alt: "Types of dark spots the serum targets",
  },
  {
    src: "/images/reference/pdp/vinoperfect-before-after.jpg",
    alt: "Before and after results",
  },
  {
    src: "/images/reference/pdp/vinoperfect-ingredients.jpg",
    alt: "Key ingredients close-up",
  },
];

interface ProductGalleryProps {
  badge?: string;
}

export function ProductGallery({ badge = "Bestseller" }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = GALLERY_IMAGES[activeIndex];

  const goTo = (index: number) => {
    setActiveIndex((index + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  return (
    <div className="flex gap-3">
      <div className="hidden w-20 shrink-0 flex-col gap-3 sm:flex">
        {GALLERY_IMAGES.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show image: ${image.alt}`}
            className={cn(
              "relative aspect-square w-full overflow-hidden rounded-sm border bg-brand-cream",
              index === activeIndex ? "border-primary" : "border-transparent"
            )}
          >
            <Image src={image.src} alt={image.alt} fill sizes="80px" className="object-cover" />
            {image.isVideoStyle && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                <Play className="size-5 fill-white text-white" />
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="relative aspect-square w-full flex-1 overflow-hidden rounded-sm bg-brand-cream">
        {badge && (
          <span className="absolute left-3 top-3 z-10 rounded bg-primary px-[10px] py-1 text-xs font-normal text-white">
            {badge}
          </span>
        )}

        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm"
        >
          <Heart className="h-4 w-4 text-primary" strokeWidth={1.5} />
        </button>

        <Image
          src={active.src}
          alt={active.alt}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
          priority
        />

        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80"
        >
          <ChevronLeft className="size-5 text-primary" />
        </button>
        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next image"
          className="absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80"
        >
          <ChevronRight className="size-5 text-primary" />
        </button>
      </div>
    </div>
  );
}
