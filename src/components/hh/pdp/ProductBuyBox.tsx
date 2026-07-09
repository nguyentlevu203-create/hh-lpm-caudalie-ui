"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Gift } from "lucide-react";
import { useSiteUI } from "@/components/hh/SiteUIContext";
import { formatVnd } from "@/components/hh/product/ProductCard";
import type { HHProduct } from "@/data/products";

/** Buy box pattern cloned from /reference/pdp's ProductBuyBox (title, rating
 * link to reviews, price, gift/shipping banner, qty stepper, sticky-style
 * CTA) — quantity and "Mua ngay"/"Thêm vào giỏ" are wired to the real cart
 * context instead of being decorative. */
export function ProductBuyBox({ product }: { product: HHProduct }) {
  const { addToCart } = useSiteUI();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-2xl font-semibold text-hh-ink">{product.name}</p>
        <p className="mt-1 text-sm text-hh-muted-foreground">
          {product.volume} · Hương {product.scent}
        </p>
      </div>

      <div className="flex items-center gap-2 text-sm text-hh-muted-foreground">
        <Star className="size-4 fill-hh-accent text-hh-accent" />
        <span>{product.rating}</span>
        <Link href="#danh-gia" className="underline underline-offset-2">
          ({product.reviewCount} đánh giá)
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-2xl font-semibold text-hh-ink">{formatVnd(product.price)}</span>
        {product.compareAtPrice && (
          <span className="text-base text-hh-muted-foreground line-through">
            {formatVnd(product.compareAtPrice)}
          </span>
        )}
      </div>

      {product.isCombo && product.comboIncludes && (
        <div className="rounded-lg bg-hh-muted p-4">
          <p className="text-sm font-medium text-hh-ink">Combo gồm:</p>
          <ul className="mt-2 space-y-1 text-sm text-hh-muted-foreground">
            {product.comboIncludes.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center gap-2 rounded-lg bg-hh-muted px-4 py-3 text-sm text-hh-ink">
        <Gift className="size-4 shrink-0" />
        Miễn phí vận chuyển cho đơn từ 399.000₫
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 rounded-full border border-hh-border px-3 py-2">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Giảm số lượng"
            className="text-hh-ink"
          >
            −
          </button>
          <span className="w-4 text-center text-sm">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Tăng số lượng"
            className="text-hh-ink"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={() => addToCart(product.slug, quantity)}
          className="h-12 flex-1 rounded-md bg-hh-primary text-sm font-semibold text-white"
        >
          Mua ngay | {formatVnd(product.price * quantity)}
        </button>
      </div>

      <button
        type="button"
        onClick={() => addToCart(product.slug, quantity)}
        className="h-11 w-full rounded-md border-2 border-hh-primary text-sm font-medium text-hh-primary"
      >
        Thêm vào giỏ
      </button>
    </div>
  );
}
