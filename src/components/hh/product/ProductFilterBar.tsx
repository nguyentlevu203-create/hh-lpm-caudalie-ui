import Link from "next/link";
import { HH_CATEGORIES, type HHCategorySlug } from "@/data/products";
import { cn } from "@/lib/utils";

interface ProductFilterBarProps {
  activeCategory?: HHCategorySlug;
  activeScent?: string;
}

/** Category quick-filter pills — pattern cloned from /reference/search's
 * SearchCategoryPills, but wired to real query-param filtering instead of
 * being decorative links. */
export function ProductFilterBar({ activeCategory, activeScent }: ProductFilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/san-pham"
        className={cn(
          "rounded-full border px-4 py-1.5 text-sm transition-colors",
          !activeCategory && !activeScent
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
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm transition-colors",
            activeCategory === cat.slug
              ? "border-hh-primary bg-hh-primary text-white"
              : "border-hh-border text-hh-ink"
          )}
        >
          {cat.shortName}
        </Link>
      ))}
    </div>
  );
}
