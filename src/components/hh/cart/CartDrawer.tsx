"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronDown, Minus, Plus, ShoppingBag, Lock } from "lucide-react";
import { useSiteUI, type CartLine } from "@/components/hh/SiteUIContext";
import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";
import {
  getProductBySlug,
  getEffectivePrice,
  PRICE_DISCLAIMER,
  INQUIRY_PRICE_LABEL,
  type HHProduct,
} from "@/data/products";
import { cn } from "@/lib/utils";
import { useFocusTrap } from "@/lib/use-focus-trap";

const FREE_SHIP_THRESHOLD = 399000;

interface CartLineWithProduct extends CartLine {
  product: HHProduct;
}

function formatVnd(value: number) {
  return value.toLocaleString("vi-VN") + "₫";
}

/** Right-side slide-in cart, structure aligned 1:1 with /reference/cart's
 * CartDrawer + CartEmptyState (absolute-positioned back-chevron/bag header,
 * qty stepper, collapsible order summary with a bold Total row, sticky
 * footer CTA bar, dedicated empty-cart state) — rebuilt with HH
 * tokens/copy and real local cart state (working qty +/-, remove,
 * free-shipping-threshold math) instead of a static seed line. */
export function CartDrawer() {
  const { active, close, cartLines, updateCartQuantity, removeFromCart } = useSiteUI();
  const isOpen = active === "cart";
  const [summaryOpen, setSummaryOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, isOpen);

  const items: CartLineWithProduct[] = cartLines.flatMap((line) => {
    const product = getProductBySlug(line.slug);
    return product ? [{ ...line, product }] : [];
  });

  const itemCount = items.reduce((n, i) => n + i.quantity, 0);
  const subtotal = items.reduce((sum, item) => {
    const price = getEffectivePrice(item.product);
    return price !== null ? sum + price * item.quantity : sum;
  }, 0);
  const inquiryItemCount = items.filter((item) => getEffectivePrice(item.product) === null).length;
  const remainingForFreeShip = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-hh-primary/30 transition-opacity",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={close}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-label="Giỏ hàng"
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-[92%] max-w-md flex-col bg-hh-surface transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="relative flex h-14 shrink-0 items-center justify-center border-b border-hh-border px-4">
          <button
            type="button"
            onClick={close}
            aria-label="Đóng giỏ hàng"
            className="absolute left-4 flex h-8 w-8 items-center justify-center text-hh-ink"
          >
            <ChevronLeft className="size-6" />
          </button>
          <p className="text-lg font-semibold text-hh-ink">Giỏ hàng của bạn</p>
          <div className="absolute right-4 flex items-center gap-3">
            <span className="relative flex items-center">
              <ShoppingBag className="size-5 text-hh-ink" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-hh-primary text-[10px] text-white">
                  {itemCount}
                </span>
              )}
            </span>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <p className="text-xl text-hh-ink">Giỏ hàng của bạn đang trống</p>
            <p className="mt-3 text-base text-hh-muted-foreground">
              Bạn chưa thêm sản phẩm nào vào giỏ. Khám phá các sản phẩm Le
              Petit Marseillais đang được yêu thích để bắt đầu mua sắm.
            </p>
            <Link
              href="/san-pham"
              onClick={close}
              className="hh-cta-editorial mt-6 w-full px-6 py-3 text-base"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              {remainingForFreeShip > 0 ? (
                <p className="border-b border-hh-border bg-hh-muted px-4 py-3 text-center text-sm text-hh-ink">
                  Mua thêm {formatVnd(remainingForFreeShip)} để được miễn phí vận chuyển
                </p>
              ) : (
                <p className="border-b border-hh-border bg-hh-muted px-4 py-3 text-center text-sm text-hh-primary">
                  Đơn hàng của bạn được miễn phí vận chuyển
                </p>
              )}

              <div className="divide-y divide-hh-border">
                {items.map(({ product, quantity }) => (
                  <div key={product.slug} className="flex gap-3 px-4 py-4">
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-sm bg-hh-cream">
                      {product.image ? (
                        <Image src={product.image} alt={product.name} fill sizes="80px" className="object-contain p-1.5" />
                      ) : (
                        <ProductPlaceholderArt
                          colorFrom="#d9bd87"
                          colorTo="#f5e7c9"
                          shape={product.category === "xa-phong-banh" ? "soap" : product.category === "cham-soc-tay" ? "tube" : "bottle"}
                          className="size-20"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-base text-hh-ink">{product.name}</p>
                          <p className="text-sm text-hh-muted-foreground">{product.volume}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(product.slug)}
                          aria-label={`Xóa ${product.name}`}
                          className="text-hh-ink/60"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-3 rounded-full border border-hh-border px-2 py-1">
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(product.slug, -1)}
                            aria-label="Giảm số lượng"
                            className="flex size-5 items-center justify-center text-hh-ink"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-4 text-center text-sm text-hh-ink">{quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(product.slug, 1)}
                            aria-label="Tăng số lượng"
                            className="flex size-5 items-center justify-center text-hh-ink"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <span className="text-base text-hh-ink">
                          {(() => {
                            const price = getEffectivePrice(product);
                            return price !== null ? formatVnd(price * quantity) : (
                              <span className="text-sm text-hh-primary">{INQUIRY_PRICE_LABEL}</span>
                            );
                          })()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-hh-border">
                <button
                  type="button"
                  onClick={() => setSummaryOpen((prev) => !prev)}
                  aria-expanded={summaryOpen}
                  className="flex w-full items-center justify-between px-4 py-4 text-base text-hh-ink"
                >
                  Tóm tắt đơn hàng
                  <ChevronDown
                    className={cn("size-5 transition-transform", summaryOpen && "rotate-180")}
                  />
                </button>
                {summaryOpen && (
                  <div className="px-4 pb-4">
                    <div className="flex items-center justify-between text-base text-hh-ink">
                      <span>{itemCount} sản phẩm</span>
                      <span>{formatVnd(subtotal)}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-base text-hh-ink">
                      <span>Vận chuyển</span>
                      <span>{remainingForFreeShip > 0 ? "Tính khi thanh toán" : "Miễn phí"}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-lg font-medium text-hh-ink">
                      <span>Tổng cộng (chưa gồm sản phẩm cần liên hệ)</span>
                      <span>{formatVnd(subtotal)}</span>
                    </div>
                    {inquiryItemCount > 0 && (
                      <p className="mt-1 text-sm text-hh-primary">
                        {inquiryItemCount} sản phẩm trong giỏ chưa có giá — nhân viên Hoàng Hà sẽ liên hệ xác nhận sau khi gửi đơn.
                      </p>
                    )}
                    <div className="mt-3 flex items-center justify-center gap-2 text-sm text-hh-muted-foreground">
                      <Lock className="size-4" />
                      Thanh toán an toàn, bảo mật
                    </div>
                    <p className="mt-2 text-center text-xs text-hh-muted-foreground">{PRICE_DISCLAIMER}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="shrink-0 space-y-2 border-t border-hh-border p-4">
              <Link
                href="/thanh-toan"
                onClick={close}
                className="hh-cta-transactional w-full px-6 py-4 text-base"
              >
                Đến trang thanh toán | {formatVnd(subtotal)}
              </Link>
              <Link
                href="/san-pham"
                onClick={close}
                className="flex w-full items-center justify-center rounded-md border-2 border-hh-primary px-6 py-4 text-base font-medium text-hh-primary"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
