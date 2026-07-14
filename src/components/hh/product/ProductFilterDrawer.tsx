"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { HH_CATEGORIES, HH_PRODUCTS, type HHCategorySlug } from "@/data/products";

interface ProductFilterDrawerProps {
  activeCategory?: HHCategorySlug;
  activeScent?: string;
}

const SCENTS = Array.from(new Set(HH_PRODUCTS.map((p) => p.scent))).sort((a, b) =>
  a.localeCompare(b, "vi")
);

/** Filter trigger + slide-in panel — pattern cloned from /reference/category's
 * ProductFilterDrawer (pill trigger, right-side drawer, backdrop, collapsed
 * accordion groups with a rotating ChevronDown) rebuilt with two real,
 * working groups ("Danh mục" / "Mùi hương") wired to the same `?category=`/
 * `?scent=` query-param navigation the previous inline `ProductFilterBar`
 * used — the reference's own drawer groups (Price, Ingredients, ...) are
 * presentational-only placeholders with no live filtering, so they were
 * swapped for the two dimensions this catalog actually supports rather than
 * ported verbatim. This keeps the real filtering behavior intact while
 * matching the reference's trigger + slide-in drawer shape. */
export function ProductFilterDrawer({ activeCategory, activeScent }: ProductFilterDrawerProps) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string[]>(["Danh mục"]);

  const hasActiveFilter = Boolean(activeCategory || activeScent);

  const toggleGroup = (label: string) => {
    setExpanded((prev) => (prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]));
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-full border border-hh-primary/30 px-5 py-2.5 text-base text-hh-primary"
      >
        Bộ lọc
        {hasActiveFilter && <span className="size-1.5 rounded-full bg-hh-accent" aria-hidden="true" />}
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
        aria-label="Bộ lọc"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <h2 className="text-2xl text-hh-ink">Bộ lọc</h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Đóng bộ lọc"
            className="flex size-8 items-center justify-center text-hh-ink"
          >
            <X className="size-6" />
          </button>
        </div>

        <div className="flex-1 divide-y divide-hh-border border-t border-hh-border px-6">
          <div className="py-5">
            <button
              type="button"
              onClick={() => toggleGroup("Danh mục")}
              aria-expanded={expanded.includes("Danh mục")}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="text-base text-hh-ink">Danh mục</span>
              <ChevronDown
                className={cn(
                  "size-5 text-hh-ink transition-transform",
                  expanded.includes("Danh mục") && "rotate-180"
                )}
              />
            </button>
            {expanded.includes("Danh mục") && (
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href="/san-pham"
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm transition-colors",
                    !activeCategory
                      ? "border-hh-primary bg-hh-primary text-white"
                      : "border-hh-border text-hh-ink"
                  )}
                >
                  Tất cả
                </Link>
                {HH_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/san-pham?category=${cat.slug}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-sm transition-colors",
                      activeCategory === cat.slug
                        ? "border-hh-primary bg-hh-primary text-white"
                        : "border-hh-border text-hh-ink"
                    )}
                  >
                    {cat.shortName}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="py-5">
            <button
              type="button"
              onClick={() => toggleGroup("Mùi hương")}
              aria-expanded={expanded.includes("Mùi hương")}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="text-base text-hh-ink">Mùi hương</span>
              <ChevronDown
                className={cn(
                  "size-5 text-hh-ink transition-transform",
                  expanded.includes("Mùi hương") && "rotate-180"
                )}
              />
            </button>
            {expanded.includes("Mùi hương") && (
              <div className="mt-3 flex flex-wrap gap-2">
                {SCENTS.map((scent) => (
                  <Link
                    key={scent}
                    href={`/san-pham?scent=${encodeURIComponent(scent)}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-sm transition-colors",
                      activeScent?.toLowerCase() === scent.toLowerCase()
                        ? "border-hh-primary bg-hh-primary text-white"
                        : "border-hh-border text-hh-ink"
                    )}
                  >
                    {scent}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
