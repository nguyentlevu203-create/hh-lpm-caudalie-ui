"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CartEmptyState } from "@/components/reference/cart/CartEmptyState";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Lock,
  Minus,
  Plus,
  ShoppingBag,
  X,
} from "@/components/icons";

interface CartLine {
  id: string;
  brand: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const INITIAL_LINES: CartLine[] = [
  {
    id: "vinoperfect-30ml",
    brand: "Vinoperfect",
    name: "Dark Spot Brightening Serum Vitamin C Alternative - 30ml",
    image: "/images/reference/category/vinoperfect-30ml.jpg",
    price: 53.0,
    quantity: 1,
  },
];

const POINTS_PER_UNIT = 80;

export function CartDrawer() {
  const [open, setOpen] = useState(true);
  const [lines, setLines] = useState<CartLine[]>(INITIAL_LINES);
  const [summaryExpanded, setSummaryExpanded] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const loyaltyPoints = lines.reduce(
    (sum, line) => sum + line.quantity * POINTS_PER_UNIT,
    0
  );

  const updateQuantity = (id: string, delta: number) => {
    setLines((prev) =>
      prev
        .map((line) =>
          line.id === id ? { ...line, quantity: line.quantity + delta } : line
        )
        .filter((line) => line.quantity > 0)
    );
  };

  const removeLine = (id: string) => {
    setLines((prev) => prev.filter((line) => line.id !== id));
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base text-primary-foreground shadow-lg"
        >
          <ShoppingBag className="size-5" />
          Reopen cart ({itemCount})
        </button>
      )}

      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/30 transition-opacity",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-[92%] max-w-md flex-col bg-white transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="My Cart"
      >
        <div className="relative flex h-14 shrink-0 items-center justify-center border-b border-border px-4">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close cart"
            className="absolute left-4 flex h-8 w-8 items-center justify-center text-primary"
          >
            <ChevronLeft className="size-6" />
          </button>
          <p className="text-lg text-primary">My Cart</p>
          <div className="absolute right-4 flex items-center gap-3">
            <span className="relative flex items-center">
              <ShoppingBag className="size-5 text-primary" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </span>
          </div>
        </div>

        {lines.length === 0 ? (
          <CartEmptyState onGoBackShopping={() => setOpen(false)} />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              {lines.map((line) => (
                <div key={line.id} className="flex gap-3 border-b border-border px-4 py-4">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-sm bg-brand-cream">
                    <Image
                      src={line.image}
                      alt={line.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-base text-primary">{line.brand}</p>
                        <p className="text-sm text-muted-foreground">{line.name}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(line.id)}
                        aria-label={`Remove ${line.name}`}
                        className="text-primary/60"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3 rounded-full border border-border px-2 py-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(line.id, -1)}
                          aria-label="Decrease quantity"
                          className="flex size-5 items-center justify-center text-primary"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-4 text-center text-sm text-primary">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(line.id, 1)}
                          aria-label="Increase quantity"
                          className="flex size-5 items-center justify-center text-primary"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <span className="text-base text-primary">
                        {"€"}
                        {(line.price * line.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="flex w-full items-center justify-between border-b border-border px-4 py-4 text-base text-primary"
              >
                Choose my free mini
                <ChevronRight className="size-5" />
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-between border-b border-border px-4 py-4 text-base text-primary"
              >
                Add gift box
                <ChevronRight className="size-5" />
              </button>

              <div className="flex items-center gap-2 px-4 py-4">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="PROMO CODE"
                  className="h-11 flex-1 rounded-md border border-border px-3 text-sm text-primary placeholder:text-primary/50 focus:outline-none"
                />
                <button
                  type="button"
                  className="h-11 rounded-md bg-primary px-5 text-sm text-primary-foreground"
                >
                  Apply
                </button>
              </div>

              <div className="border-t border-border">
                <button
                  type="button"
                  onClick={() => setSummaryExpanded((prev) => !prev)}
                  aria-expanded={summaryExpanded}
                  className="flex w-full items-center justify-between px-4 py-4 text-base text-primary"
                >
                  Order summary
                  <ChevronDown
                    className={cn(
                      "size-5 transition-transform",
                      summaryExpanded && "rotate-180"
                    )}
                  />
                </button>
                {summaryExpanded && (
                  <div className="px-4 pb-4">
                    <p className="text-center text-sm text-muted-foreground">
                      This order gives you {loyaltyPoints} MYCAUDALIE points
                    </p>
                    <div className="mt-3 flex items-center justify-between text-base text-primary">
                      <span>
                        {itemCount} item{itemCount === 1 ? "" : "s"}
                      </span>
                      <span>
                        {"€"}
                        {subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-base text-primary">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-lg font-medium text-primary">
                      <span>Total</span>
                      <span>
                        {"€"}
                        {subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Lock className="size-4" />
                      100% Secure payment
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="shrink-0 space-y-2 border-t border-border p-4">
              <button
                type="button"
                className="w-full rounded-md bg-primary px-6 py-4 text-base text-primary-foreground"
              >
                Go to checkout | €{subtotal.toFixed(2)}
              </button>
              <button
                type="button"
                className="w-full rounded-md bg-black px-6 py-4 text-base text-white"
              >
                Buy with Apple Pay
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
