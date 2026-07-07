import Link from "next/link";
import { ChevronRight } from "@/components/icons";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface CategoryBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function CategoryBreadcrumb({ items }: CategoryBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
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
              <span className={isLast ? "font-medium text-primary" : undefined}>
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight className="size-3.5" />}
          </span>
        );
      })}
    </nav>
  );
}
