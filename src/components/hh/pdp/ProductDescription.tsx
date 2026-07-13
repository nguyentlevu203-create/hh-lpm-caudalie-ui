"use client";

import { useState } from "react";
import { HH_CATEGORIES } from "@/data/products";
import type { HHProduct } from "@/data/products";

/** Description block structure cloned 1:1 from /reference/pdp's
 * ProductDescription: a `dl` attribute list, then a "What is it?" heading +
 * paragraph, then an expandable "See more" section revealing extra
 * highlight bullets. Content is real product data (category/scent/volume/
 * highlights/how-to-use) rather than the reference's clinical-claim copy,
 * since HH sells personal-care basics, not a dermo-cosmetic serum. */
export function ProductDescription({ product }: { product: HHProduct }) {
  const [expanded, setExpanded] = useState(false);
  const categoryName = HH_CATEGORIES.find((c) => c.slug === product.category)?.name ?? product.category;
  const [firstHighlight, ...restHighlights] = product.highlights;

  return (
    <div className="mt-10 border-t border-hh-border pt-8">
      <dl className="grid gap-2 text-base text-hh-ink">
        <div className="flex gap-1">
          <dt className="font-medium">Dòng sản phẩm :</dt>
          <dd className="text-hh-muted-foreground">{categoryName}</dd>
        </div>
        <div className="flex gap-1">
          <dt className="font-medium">Hương thơm :</dt>
          <dd className="text-hh-muted-foreground">{product.scent}</dd>
        </div>
        <div className="flex gap-1">
          <dt className="font-medium">Dung tích :</dt>
          <dd className="text-hh-muted-foreground">{product.volume}</dd>
        </div>
        {firstHighlight && (
          <div className="flex gap-1">
            <dt className="font-medium">Điểm nổi bật :</dt>
            <dd className="text-hh-muted-foreground">{firstHighlight}</dd>
          </div>
        )}
        <div className="flex gap-1">
          <dt className="font-medium">Cách dùng :</dt>
          <dd className="text-hh-muted-foreground">{product.howToUse}</dd>
        </div>
      </dl>

      <h2 className="mt-6 text-lg font-medium text-hh-ink">Sản phẩm này là gì?</h2>
      <p className="mt-2 text-base text-hh-muted-foreground">{product.description}</p>

      {expanded && restHighlights.length > 0 && (
        <div className="mt-4">
          <p className="text-base font-medium text-hh-ink">Điểm nổi bật khác</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-base text-hh-muted-foreground">
            {restHighlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          {product.isCombo && product.comboIncludes && (
            <p className="mt-2 text-xs text-hh-muted-foreground">
              *Combo gồm {product.comboIncludes.length} sản phẩm, xem chi tiết ở phần mua hàng phía trên.
            </p>
          )}
        </div>
      )}

      {restHighlights.length > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-4 block text-base text-hh-primary underline"
        >
          {expanded ? "Thu gọn" : "Xem thêm"}
        </button>
      )}
    </div>
  );
}
