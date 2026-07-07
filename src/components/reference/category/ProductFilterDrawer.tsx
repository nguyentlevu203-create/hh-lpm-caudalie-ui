"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, SlidersHorizontal, X } from "@/components/icons";

const FILTER_GROUPS = [
  "Price",
  "Ingredients",
  "Collection",
  "Formulas",
  "Product type",
  "Formats",
  "Skin concern",
  "Skin type",
];

export function ProductFilterDrawer() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleGroup = (label: string) => {
    setExpanded((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-2.5 text-base text-primary"
      >
        Filter
        <SlidersHorizontal className="size-4" />
      </button>

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
          "fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col overflow-y-auto bg-white transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
      >
        <div className="flex items-center justify-between px-6 py-5">
          <h2 className="text-2xl text-primary">Filters</h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close filters"
            className="flex size-8 items-center justify-center text-primary"
          >
            <X className="size-6" />
          </button>
        </div>

        <div className="flex-1 divide-y divide-border border-t border-border px-6">
          {FILTER_GROUPS.map((label) => {
            const isExpanded = expanded.includes(label);
            return (
              <div key={label} className="py-5">
                <button
                  type="button"
                  onClick={() => toggleGroup(label)}
                  aria-expanded={isExpanded}
                  className="flex w-full items-center justify-between text-left"
                >
                  <span className="text-base text-primary">{label}</span>
                  <ChevronDown
                    className={cn(
                      "size-5 text-primary transition-transform",
                      isExpanded && "rotate-180"
                    )}
                  />
                </button>
                {isExpanded && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    {label} options will appear here once filtering is wired up.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
