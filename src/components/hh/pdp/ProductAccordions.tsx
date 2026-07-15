"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HHProduct } from "@/data/products";

/** Multi-open accordion structure cloned 1:1 from /reference/pdp's
 * ProductAccordions (grey-background rows, "+" icon rotating to "×" when
 * open). "Thành phần" and "Hướng dẫn sử dụng" render the product's real
 * ingredient list / usage steps from Hoàng Hà's source sheet; "Câu hỏi
 * thường gặp" has no real FAQ data in either source workbook, so it stays
 * an honest placeholder rather than fabricated Q&A. */
export function ProductAccordions({ product }: { product: HHProduct }) {
  const [expanded, setExpanded] = useState<string[]>([]);

  const sections = [
    { label: "Thành phần", body: product.ingredients },
    { label: "Hướng dẫn sử dụng", body: product.howToUse },
    { label: "Câu hỏi thường gặp", body: `Nội dung câu hỏi thường gặp của ${product.name} đang được cập nhật.` },
  ];

  const toggle = (label: string) => {
    setExpanded((prev) => (prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]));
  };

  return (
    <div className="mt-4 border-t border-hh-border">
      {sections.map(({ label, body }) => {
        const isExpanded = expanded.includes(label);
        return (
          <div key={label} className="border-b border-hh-border">
            <button
              type="button"
              onClick={() => toggle(label)}
              aria-expanded={isExpanded}
              className="flex w-full items-center justify-between bg-hh-muted px-4 py-4 text-left"
            >
              <span className="text-base text-hh-ink">{label}</span>
              <Plus className={cn("size-5 text-hh-ink transition-transform", isExpanded && "rotate-45")} />
            </button>
            {isExpanded && <p className="px-4 py-4 text-base text-hh-muted-foreground">{body}</p>}
          </div>
        );
      })}
    </div>
  );
}
