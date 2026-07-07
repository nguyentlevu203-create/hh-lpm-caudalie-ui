import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/content";
import { Heart, StarIcon } from "@/components/icons";

interface ProductGridCardProps {
  product: Product;
}

export function ProductGridCard({ product }: ProductGridCardProps) {
  const {
    badge,
    title,
    subtitle,
    image,
    rating,
    reviewCount,
    price,
    compareAtPrice,
    href,
  } = product;

  const filledStars = Math.round(rating);

  return (
    <div className="flex flex-col">
      <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-brand-cream">
        {badge && (
          <span className="absolute left-2 top-2 z-10 rounded bg-primary px-[10px] py-1 text-xs font-normal text-white">
            {badge}
          </span>
        )}

        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm"
        >
          <Heart className="h-4 w-4 text-primary" strokeWidth={1.5} />
        </button>

        <Link href={href} className="block h-full w-full">
          <Image
            src={image}
            alt={subtitle || title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </Link>
      </div>

      <Link href={href} className="mt-3 block">
        <p className="text-base font-light text-primary">{title}</p>
        {subtitle && <p className="text-base font-normal text-primary">{subtitle}</p>}
      </Link>

      <div className="mt-1 flex items-center gap-1">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              className="h-4 w-4"
              fill={i < filledStars ? "#2d1946" : "#d9d9d9"}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500">
          ({reviewCount.toLocaleString("en-US")})
        </span>
      </div>

      <div className="mt-1 flex items-center gap-2">
        <span className="text-base text-primary">
          {"€"}
          {price.toFixed(2)}
        </span>
        {compareAtPrice !== undefined && (
          <span className="text-base text-gray-400 line-through">
            {"€"}
            {compareAtPrice.toFixed(2)}
          </span>
        )}
      </div>

      <button
        type="button"
        className="mt-3 w-full rounded-md border border-black/30 bg-white px-[15px] py-3 text-base text-primary"
      >
        Add to bag
      </button>
    </div>
  );
}
