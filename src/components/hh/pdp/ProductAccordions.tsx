"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const SECTIONS = ["Thành phần", "Hướng dẫn sử dụng", "Câu hỏi thường gặp"];

/** Multi-open accordion structure cloned 1:1 from /reference/pdp's
 * ProductAccordions (grey-background rows, "+" icon rotating to "×" when
 * open). Body copy is an honest placeholder line per section — real
 * ingredient lists / usage steps / FAQ content from Hoàng Hà still need to
 * replace this before launch, same intentional gap as the reference. */
export function ProductAccordions({ productName }: { productName: string }) {
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggle = (label: string) => {
    setExpanded((prev) => (prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]));
  };

  return (
    <div className="mt-4 border-t border-hh-border">
      {SECTIONS.map((label) => {
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
            {isExpanded && (
              <p className="px-4 py-4 text-base text-hh-muted-foreground">
                Nội dung {label.toLowerCase()} của {productName} đang được cập nhật.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
