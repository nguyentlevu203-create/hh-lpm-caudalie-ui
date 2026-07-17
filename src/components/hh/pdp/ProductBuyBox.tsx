"use client";

import { useState } from "react";
import Link from "next/link";
import { Gift } from "lucide-react";
import { useSiteUI } from "@/components/hh/SiteUIContext";
import { formatVnd } from "@/components/hh/product/ProductCard";
import { getEffectivePrice, INQUIRY_PRICE_LABEL, PRICE_DISCLAIMER, type HHProduct } from "@/data/products";

/** 10.000₫ = 1 điểm — same membership ratio published on the homepage's
 * Câu Lạc Bộ Hoàng Hà section (see MEMBERSHIP.perks[0] in site-content.ts). */
const VND_PER_LOYALTY_POINT = 10000;

/** Buy box structure cloned 1:1 from /reference/pdp's ProductBuyBox: title +
 * subtitle, review-count link to the reviews anchor, price row + loyalty
 * pill, a selector-equivalent block (combo contents), the CTA button (price
 * shown inline, matching "Add to bag | €price"), then a delivery-estimate
 * bar and a gift/shipping banner last — same order as the reference.
 * Quantity stepper and cart wiring are real (production-specific — the
 * reference has no live cart to wire to). */
export function ProductBuyBox({ product }: { product: HHProduct }) {
  const { addToCart } = useSiteUI();
  const [quantity, setQuantity] = useState(1);

  const price = getEffectivePrice(product);
  const loyaltyPoints = price !== null ? Math.round((price * quantity) / VND_PER_LOYALTY_POINT) : 0;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-2xl font-semibold text-hh-ink">{product.name}</p>
        <p className="mt-1 text-sm text-hh-muted-foreground">
          {product.volume} · Hương {product.scent}
        </p>
      </div>

      <div className="text-sm text-hh-muted-foreground">
        <Link href="#danh-gia" className="underline underline-offset-2">
          Chưa có đánh giá — hãy là người đầu tiên
        </Link>
      </div>

      <div>
        {price !== null ? (
          <>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold text-hh-ink">{formatVnd(price)}</span>
              {product.compareAtPrice && (
                <span className="text-base text-hh-muted-foreground line-through">
                  {formatVnd(product.compareAtPrice)}
                </span>
              )}
            </div>
            <p className="mt-2 inline-block rounded-full bg-hh-accent-gold-soft px-3 py-1 text-sm text-hh-accent-foreground">
              Tích {loyaltyPoints} điểm thành viên
            </p>
            <p className="mt-2 text-xs text-hh-muted-foreground">{PRICE_DISCLAIMER}</p>
          </>
        ) : (
          <p className="text-xl font-semibold text-hh-primary">{INQUIRY_PRICE_LABEL}</p>
        )}
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
          className="hh-cta-primary h-12 flex-1 text-sm"
        >
          {price !== null ? (
            <>
              Mua ngay <span className="opacity-60">|</span> {formatVnd(price * quantity)}
            </>
          ) : (
            "Gửi yêu cầu mua hàng"
          )}
        </button>
      </div>

      <button
        type="button"
        onClick={() => addToCart(product.slug, quantity)}
        className="h-11 w-full rounded-md border border-hh-primary text-sm font-medium text-hh-primary transition-colors hover:bg-hh-primary-soft"
      >
        Thêm vào giỏ
      </button>

      <div className="rounded-md border border-hh-border bg-hh-surface-soft px-4 py-3 text-center text-base text-hh-ink">
        Giao hàng dự kiến: 2-5 ngày làm việc
      </div>

      <div className="flex items-center gap-3 rounded-md bg-hh-muted px-4 py-3">
        <Gift className="size-6 shrink-0 text-hh-primary" />
        <p className="text-sm text-hh-ink">Miễn phí vận chuyển cho đơn từ 399.000₫</p>
      </div>
    </div>
  );
}
