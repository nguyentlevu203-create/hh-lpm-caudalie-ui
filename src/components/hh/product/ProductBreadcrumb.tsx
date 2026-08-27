import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProductBreadcrumbItem {
  label: string;
  href?: string;
}

interface ProductBreadcrumbProps {
  items: ProductBreadcrumbItem[];
}

/** Breadcrumb trail — pattern cloned from /reference/category's
 * CategoryBreadcrumb (ChevronRight-separated crumbs, last crumb bold/ink
 * and not a link) with HH tokens; san-pham previously had no breadcrumb
 * equivalent at all.
 *
 * Phase 8A P0.3: on mobile (`<sm`, i.e. <640px) collapse trails longer than
 * 2 items down to just item 1 + the current page — item 0 ("Trang chủ")
 * and any deeper intermediate items (category, etc.) hide via CSS
 * (`hidden sm:inline-flex`, no JS viewport check, no layout shift). This
 * is what removed the orphaned trailing chevron on mobile PDP: the crumb
 * that used to wrap onto its own line ending in a lone ">" is simply not
 * rendered at that width. Full trail still shows ≥640px. The current-page
 * item gets `aria-current="page"` and truncates to one line on mobile
 * (`truncate` needs `min-w-0` on its flex-wrap ancestor to actually
 * clamp, not just grow) instead of wrapping across 2-3 lines. */
export function ProductBreadcrumb({ items }: ProductBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex min-w-0 flex-wrap items-center gap-2 text-sm text-hh-muted-foreground"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isCollapsible = items.length > 2 && index !== 1 && !isLast;
        return (
          <span
            key={item.label}
            className={cn(
              "flex min-w-0 items-center gap-2",
              isCollapsible && "hidden sm:flex",
              isLast && "min-w-0 flex-1 sm:flex-initial"
            )}
          >
            {item.href && !isLast ? (
              <Link href={item.href} className="shrink-0 hover:underline">
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(isLast && "truncate font-medium text-hh-ink")}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight className="size-3.5 shrink-0" />}
          </span>
        );
      })}
    </nav>
  );
}
