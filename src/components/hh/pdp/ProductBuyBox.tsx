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

/**
 * Buy box — P1.3 hierarchy pass. Explicit 8-level order per the parity
 * brief: (1) tên sản phẩm → (2) công dụng ngắn → (3) dung tích/trạng thái
 * → (4) giá/liên hệ → (5) quantity → (6) CTA giao dịch → (7) trust/
 * disclaimer → (8) technical info (lives in `ProductAccordions`, rendered
 * after this component — already correctly last in the page, untouched).
 *
 * Real bug fixed here (not just reordering): the buy box used to render
 * TWO CTAs that both called the identical `addToCart` handler — a solid
 * "Mua ngay | {giá}" (or, for inquiry items, a misleadingly-labeled "Gửi
 * yêu cầu mua hàng" that didn't actually send any request) plus an outline
 * "Thêm vào giỏ" directly below doing the exact same thing. Collapsed to
 * ONE CTA whose label always matches what it does ("Thêm vào giỏ"),
 * removing a same-level duplicate control and the label/behavior mismatch
 * in one pass — this was already flagged as a real defect in the original
 * UX audit, not a new finding invented for P1.
 *
 * No data changed: `shortDescription` (level 2) already existed on
 * `HHProduct`, just wasn't surfaced in the buy box before. No fabricated
 * review/price/technical content added.
 */
export function ProductBuyBox({ product }: { product: HHProduct }) {
  const { addToCart } = useSiteUI();
  const [quantity, setQuantity] = useState(1);

  const price = getEffectivePrice(product);
  const loyaltyPoints = price !== null ? Math.round((price * quantity) / VND_PER_LOYALTY_POINT) : 0;

  return (
    <div className="flex flex-col gap-3">
      {/* 1. Tên sản phẩm */}
      <h1 className="text-2xl font-semibold text-hh-ink">{product.name}</h1>

      {/* 2. Công dụng ngắn */}
      {product.shortDescription && (
        <p className="text-sm text-hh-muted-foreground">{product.shortDescription}</p>
      )}

      {/* 3. Dung tích / trạng thái */}
      <p className="text-sm text-hh-ink">
        {product.volume} · Hương {product.scent}
      </p>

      <Link href="#danh-gia" className="w-fit text-sm text-hh-muted-foreground underline underline-offset-2">
        Chưa có đánh giá — hãy là người đầu tiên
      </Link>

      {/* 4. Giá / trạng thái liên hệ */}
      <div className="mt-1">
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

      {/* 5. Quantity + 6. CTA giao dịch — 1 CTA duy nhất, cùng cấp với quantity */}
      <div className="mt-1 flex items-center gap-3">
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
          className="hh-cta-transactional h-12 flex-1 text-sm"
        >
          {price !== null ? (
            <>
              Thêm vào giỏ <span className="opacity-60">|</span> {formatVnd(price * quantity)}
            </>
          ) : (
            "Thêm vào giỏ"
          )}
        </button>
      </div>

      {/* 7. Trust / disclaimer */}
      <div className="mt-1 rounded-md border border-hh-border bg-hh-surface-soft px-4 py-3 text-center text-base text-hh-ink">
        Giao hàng dự kiến: 2-5 ngày làm việc
      </div>

      <div className="flex items-center gap-3 rounded-md bg-hh-muted px-4 py-3">
        <Gift className="size-6 shrink-0 text-hh-primary" />
        <p className="text-sm text-hh-ink">Miễn phí vận chuyển cho đơn từ 399.000₫</p>
      </div>
    </div>
  );
}
