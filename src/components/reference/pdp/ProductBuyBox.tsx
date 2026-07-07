"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Gift } from "@/components/icons";

interface Variant {
  label: string;
  price: number;
}

const VARIANTS: Variant[] = [
  { label: "30mL", price: 53.0 },
  { label: "50mL", price: 74.0 },
];

const AUTO_REPLENISH_DISCOUNT = 0.1;

export function ProductBuyBox() {
  const [variantIndex, setVariantIndex] = useState(0);
  const [purchaseType, setPurchaseType] = useState<"one-time" | "auto">("one-time");

  const variant = VARIANTS[variantIndex];
  const autoPrice = variant.price * (1 - AUTO_REPLENISH_DISCOUNT);
  const activePrice = purchaseType === "one-time" ? variant.price : autoPrice;

  return (
    <div>
      <h1 className="text-2xl text-primary">Vinoperfect</h1>
      <p className="text-2xl font-light text-primary">
        Dark Spot Brightening Serum Vitamin C Alternative - {variant.label}
      </p>
      <a href="#reviews" className="mt-2 inline-block text-sm text-primary underline">
        Leave a review
      </a>

      <p className="mt-4 text-2xl text-primary">€{variant.price.toFixed(2)}</p>
      <p className="mt-2 inline-block rounded-full bg-accent/50 px-3 py-1 text-sm text-primary">
        +40 x 2 = 80 loyalty points
      </p>

      <div className="mt-4 flex gap-2" role="radiogroup" aria-label="Size">
        {VARIANTS.map((v, index) => (
          <button
            key={v.label}
            type="button"
            role="radio"
            aria-checked={index === variantIndex}
            onClick={() => setVariantIndex(index)}
            className={cn(
              "rounded-md border px-5 py-2.5 text-base",
              index === variantIndex
                ? "border-primary text-primary"
                : "border-border text-primary/60"
            )}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <label className="flex items-center gap-2 text-base text-primary">
          <input
            type="radio"
            name="purchase-type"
            checked={purchaseType === "one-time"}
            onChange={() => setPurchaseType("one-time")}
            className="size-4 accent-primary"
          />
          €{variant.price.toFixed(2)} One-time purchase
        </label>
        <div>
          <label className="flex items-center gap-2 text-base text-primary">
            <input
              type="radio"
              name="purchase-type"
              checked={purchaseType === "auto"}
              onChange={() => setPurchaseType("auto")}
              className="size-4 accent-primary"
            />
            €{autoPrice.toFixed(2)} Auto-replenishment{" "}
            <span className="underline">every 3 months</span>
          </label>
          <p className="mt-1 pl-6 text-sm text-muted-foreground">
            Save {AUTO_REPLENISH_DISCOUNT * 100}% + free shipping
          </p>
        </div>
      </div>

      <button
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-4 text-base text-primary-foreground"
      >
        Add to bag
        <span className="opacity-60">|</span>
        {"€"}
        {activePrice.toFixed(2)}
      </button>

      <div className="mt-3 rounded-md border border-border px-4 py-3 text-center text-base text-primary">
        Estimated delivery: 10/7 - 13/7
      </div>

      <div className="mt-3 flex items-center gap-3 rounded-md bg-secondary px-4 py-3">
        <Gift className="size-6 shrink-0 text-primary" />
        <p className="text-sm text-primary">
          Two free must-haves when you spend €69, code: SUMMER
        </p>
      </div>
    </div>
  );
}
