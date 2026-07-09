"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ChevronLeft, ChevronDown, Minus, Plus, ShoppingBag, Lock } from "lucide-react";
import { useSiteUI, type CartLine } from "@/components/hh/SiteUIContext";
import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";
import { getProductBySlug, type HHProduct } from "@/data/products";
import { cn } from "@/lib/utils";

const FREE_SHIP_THRESHOLD = 399000;

interface CartLineWithProduct extends CartLine {
  product: HHProduct;
}

function formatVnd(value: number) {
  return value.toLocaleString("vi-VN") + "₫";
}

function placeholderShape(category: HHProduct["category"]) {
  if (category === "xa-phong-banh") return "soap" as const;
  if (category === "cham-soc-tay") return "tube" as const;
  return "bottle" as const;
}

/** Right-side slide-in cart, pattern cloned from /reference/cart's CartDrawer
 * (back-chevron header, qty stepper, collapsible order summary, sticky
 * footer CTA) — rebuilt with HH tokens/copy and real local cart state
 * (working qty +/-, remove, free-shipping-threshold math) instead of a
 * static seed line. */
export function CartDrawer() {
  const { active, close, cartLines, updateCartQuantity, removeFromCart } = useSiteUI();
  const isOpen = active === "cart";
  const [summaryOpen, setSummaryOpen] = useState(false);

  const items: CartLineWithProduct[] = cartLines.flatMap((line) => {
    const product = getProductBySlug(line.slug);
    return product ? [{ ...line, product }] : [];
  });

  const itemCount = items.reduce((n, i) => n + i.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const remainingForFreeShip = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/30 transition-opacity",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={close}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-label="Giỏ hàng"
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-[92%] max-w-md flex-col bg-white transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center gap-3 border-b border-hh-border px-4 py-4">
          <button type="button" onClick={close} aria-label="Đóng giỏ hàng" className="text-hh-ink">
            <ChevronLeft className="size-5" />
          </button>
          <p className="flex-1 text-center text-lg font-semibold text-hh-ink">Giỏ hàng của bạn</p>
          <div className="relative">
            <ShoppingBag className="size-5 text-hh-ink" />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-hh-primary text-[10px] text-white">
                {itemCount}
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
              <p className="text-lg font-medium text-hh-ink">Giỏ hàng trống</p>
              <p className="text-sm text-hh-muted-foreground">
                Khám phá các sản phẩm Le Petit Marseillais đang được yêu thích.
              </p>
              <Link
                href="/san-pham"
                onClick={close}
                className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-hh-primary px-6 text-sm font-medium text-white"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          ) : (
            <>
              {remainingForFreeShip > 0 ? (
                <p className="border-b border-hh-border bg-hh-muted px-4 py-2 text-center text-xs text-hh-ink">
                  Mua thêm {formatVnd(remainingForFreeShip)} để được miễn phí vận chuyển
                </p>
              ) : (
                <p className="border-b border-hh-border bg-hh-muted px-4 py-2 text-center text-xs text-hh-primary">
                  Đơn hàng của bạn được miễn phí vận chuyển
                </p>
              )}

              <div className="divide-y divide-hh-border">
                {items.map(({ product, quantity }) => (
                  <div key={product.slug} className="flex gap-3 px-4 py-4">
                    <ProductPlaceholderArt
                      colorFrom={product.colorFrom}
                      colorTo={product.colorTo}
                      shape={placeholderShape(product.category)}
                      className="size-20 shrink-0"
                    />
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-hh-ink">{product.name}</p>
                        <button
                          type="button"
                          onClick={() => removeFromCart(product.slug)}
                          aria-label="Xóa sản phẩm"
                          className="text-hh-muted-foreground"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                      <p className="text-xs text-hh-muted-foreground">{product.volume}</p>
                      <div className="mt-1 flex items-center justify-between">
                        <div className="flex items-center gap-3 rounded-full border border-hh-border px-2 py-1">
                          <button type="button" onClick={() => updateCartQuantity(product.slug, -1)} aria-label="Giảm số lượng">
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-4 text-center text-sm">{quantity}</span>
                          <button type="button" onClick={() => updateCartQuantity(product.slug, 1)} aria-label="Tăng số lượng">
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-hh-ink">{formatVnd(product.price * quantity)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-hh-border px-4 py-3">
                <button
                  type="button"
                  onClick={() => setSummaryOpen((v) => !v)}
                  className="flex w-full items-center justify-between text-sm font-medium text-hh-ink"
                >
                  Tóm tắt đơn hàng
                  <ChevronDown className={cn("size-4 transition-transform", summaryOpen && "rotate-180")} />
                </button>
                {summaryOpen && (
                  <div className="mt-3 space-y-2 text-sm text-hh-muted-foreground">
                    <div className="flex justify-between">
                      <span>Tạm tính ({itemCount} sản phẩm)</span>
                      <span>{formatVnd(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vận chuyển</span>
                      <span>{remainingForFreeShip > 0 ? "Tính khi thanh toán" : "Miễn phí"}</span>
                    </div>
                    <div className="flex items-center gap-2 pt-1 text-xs">
                      <Lock className="size-3.5" />
                      Thanh toán an toàn, bảo mật
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-2 border-t border-hh-border px-4 py-4">
            <Link
              href="#"
              className="flex h-12 w-full items-center justify-center rounded-md bg-hh-primary text-sm font-semibold text-white"
            >
              Đến trang thanh toán | {formatVnd(subtotal)}
            </Link>
            <Link
              href="/san-pham"
              onClick={close}
              className="flex h-11 w-full items-center justify-center rounded-md border-2 border-hh-primary text-sm font-medium text-hh-primary"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
