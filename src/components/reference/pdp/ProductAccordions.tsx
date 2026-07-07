"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Plus } from "@/components/icons";

const SECTIONS = ["Our ingredients", "Application tips", "Frequently asked questions"];

export function ProductAccordions() {
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggle = (label: string) => {
    setExpanded((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  return (
    <div className="mt-4 border-t border-border">
      {SECTIONS.map((label) => {
        const isExpanded = expanded.includes(label);
        return (
          <div key={label} className="border-b border-border">
            <button
              type="button"
              onClick={() => toggle(label)}
              aria-expanded={isExpanded}
              className="flex w-full items-center justify-between bg-secondary px-4 py-4 text-left"
            >
              <span className="text-base text-primary">{label}</span>
              <Plus
                className={cn(
                  "size-5 text-primary transition-transform",
                  isExpanded && "rotate-45"
                )}
              />
            </button>
            {isExpanded && (
              <p className="px-4 py-4 text-base text-muted-foreground">
                {label} content will appear here once wired up to real product data.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
