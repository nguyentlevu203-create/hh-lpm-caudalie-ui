"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useSiteUI } from "@/components/hh/SiteUIContext";
import { useAccount } from "@/components/hh/AccountContext";
import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";
import { cn } from "@/lib/utils";
import { getEffectivePrice, INQUIRY_PRICE_LABEL, type HHProduct } from "@/data/products";

const INQUIRY_BADGE_LABEL = "Liên hệ báo giá";

export function formatVnd(value: number) {
  return value.toLocaleString("vi-VN") + "₫";
}

/** Grid product card — pattern cloned from /reference/category's
 * ProductGridCard (badge top-left, wishlist heart top-right, image, title +
 * meta line, 5-star rating row, price + optional compare-at, full-width
 * CTA) with HH tokens/copy; "Thêm vào giỏ" and the wishlist heart are both
 * wired to real state (cart context / AccountContext demo wishlist). */
export function ProductCard({ product }: { product: HHProduct }) {
  const { addToCart } = useSiteUI();
  const { isWishlisted, toggleWishlist } = useAccount();
  const price = getEffectivePrice(product);
  const wishlisted = isWishlisted(product.slug);

  const isOrganicBadge = product.badge === "Hữu cơ";

  return (
    <div className="flex flex-col transition-transform duration-200 hover:-translate-y-0.5">
      <div className="hh-shadow-sm relative aspect-square w-full overflow-hidden rounded-sm border border-hh-border bg-hh-surface transition-shadow duration-200 hover:hh-shadow-md">
        <div className="absolute left-2 top-2 z-10 flex flex-col items-start gap-1">
          {product.badge && (
            <span
              className={cn(
                "rounded px-[10px] py-1 text-xs font-normal",
                isOrganicBadge ? "bg-[#dceee1] text-[#1f5c3d]" : "bg-hh-primary text-white"
              )}
            >
              {product.badge}
            </span>
          )}
          {product.priceMode === "inquiry" && (
            <span className="rounded bg-hh-accent-gold-soft px-[10px] py-1 text-xs font-normal text-hh-accent-foreground">
              {INQUIRY_BADGE_LABEL}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product.slug)}
          aria-label={wishlisted ? "Bỏ khỏi yêu thích" : "Thêm vào yêu thích"}
          aria-pressed={wishlisted}
          className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-hh-surface/80 backdrop-blur-sm"
        >
          <Heart className={cn("h-4 w-4 text-hh-primary", wishlisted && "fill-hh-primary")} strokeWidth={1.5} />
        </button>

        <Link href={`/san-pham/${product.slug}`} className="relative block h-full w-full">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-contain p-4"
            />
          ) : (
            <ProductPlaceholderArt
              colorFrom="#d9bd87"
              colorTo="#f5e7c9"
              shape={product.category === "xa-phong-banh" ? "soap" : product.category === "cham-soc-tay" ? "tube" : "bottle"}
              className="h-full w-full rounded-sm"
            />
          )}
        </Link>
      </div>

      <Link href={`/san-pham/${product.slug}`} className="mt-3 block">
        <p className="line-clamp-2 text-base font-normal text-hh-ink">{product.name}</p>
        <p className="text-sm text-hh-muted-foreground">{product.volume}</p>
      </Link>

      <p className="mt-1 text-sm text-hh-muted-foreground">Chưa có đánh giá</p>

      <div className="mt-1 flex items-center gap-2">
        {price !== null ? (
          <>
            <span className="text-base font-semibold text-hh-ink">{formatVnd(price)}</span>
            {product.compareAtPrice && (
              <span className="text-base text-hh-muted-foreground line-through">
                {formatVnd(product.compareAtPrice)}
              </span>
            )}
          </>
        ) : (
          <span className="text-base font-semibold text-hh-primary">{INQUIRY_PRICE_LABEL}</span>
        )}
      </div>

      {price !== null ? (
        <button
          type="button"
          onClick={() => addToCart(product.slug)}
          className="hh-cta-transactional mt-3 w-full px-[15px] py-3 text-base"
        >
          Thêm vào giỏ
        </button>
      ) : (
        <Link
          href={`/san-pham/${product.slug}`}
          className="hh-cta-editorial mt-3 w-full px-[15px] py-3 text-base"
        >
          Xem sản phẩm
        </Link>
      )}
    </div>
  );
}
