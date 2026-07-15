"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND_LIBRARY_CATEGORIES } from "@/data/brand-library";

function buildHref(params: { category?: string; q?: string }) {
  const search = new URLSearchParams();
  if (params.category) search.set("category", params.category);
  if (params.q) search.set("q", params.q);
  const qs = search.toString();
  return qs ? `/thu-vien-san-pham-hang?${qs}` : "/thu-vien-san-pham-hang";
}

export function BrandLibraryFilterBar({
  activeCategory,
  activeQuery,
}: {
  activeCategory?: string;
  activeQuery?: string;
}) {
  const router = useRouter();
  const [q, setQ] = useState(activeQuery ?? "");

  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push(buildHref({ category: activeCategory, q }));
        }}
        className="flex items-center gap-2 rounded-md bg-hh-muted px-4 py-2.5"
      >
        <Search className="size-4 shrink-0 text-hh-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Tìm trong danh mục tham khảo hãng..."
          className="flex-1 bg-transparent text-sm text-hh-ink outline-none placeholder:text-hh-muted-foreground"
        />
        <button type="submit" className="text-sm font-medium text-hh-primary">
          Tìm
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        <Link
          href={buildHref({ q: activeQuery })}
          className={cn(
            "rounded-full border px-3 py-1.5 text-sm transition-colors",
            !activeCategory ? "border-hh-primary bg-hh-primary text-white" : "border-hh-border text-hh-ink"
          )}
        >
          Tất cả
        </Link>
        {BRAND_LIBRARY_CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={buildHref({ category: cat, q: activeQuery })}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm transition-colors",
              activeCategory === cat ? "border-hh-primary bg-hh-primary text-white" : "border-hh-border text-hh-ink"
            )}
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}
