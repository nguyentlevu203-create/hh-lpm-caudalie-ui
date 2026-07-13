import Link from "next/link";
import { ChevronRight } from "lucide-react";

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
 * equivalent at all. */
export function ProductBreadcrumb({ items }: ProductBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-sm text-hh-muted-foreground"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "font-medium text-hh-ink" : undefined}>{item.label}</span>
            )}
            {!isLast && <ChevronRight className="size-3.5" />}
          </span>
        );
      })}
    </nav>
  );
}
