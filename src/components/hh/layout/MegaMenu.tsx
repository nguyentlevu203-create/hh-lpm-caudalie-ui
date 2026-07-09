import Link from "next/link";
import { HH_CATEGORIES } from "@/data/products";

/** Desktop mega menu dropdown under the "Sản phẩm" nav item — pattern
 * cloned from the shared Caudalie Header's category dropdown, rebuilt with
 * HH categories/copy. */
export function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="absolute left-1/2 top-full z-30 w-[560px] -translate-x-1/2 rounded-xl border border-hh-border bg-white p-6 shadow-lg">
      <div className="grid grid-cols-2 gap-4">
        {HH_CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/san-pham?category=${cat.slug}`}
            onClick={onNavigate}
            className="rounded-lg p-3 transition-colors hover:bg-hh-muted"
          >
            <p className="text-sm font-medium text-hh-ink">{cat.name}</p>
            <p className="mt-1 text-xs text-hh-muted-foreground">{cat.description}</p>
          </Link>
        ))}
      </div>
      <Link
        href="/san-pham"
        onClick={onNavigate}
        className="mt-4 inline-block text-sm font-medium text-hh-primary underline underline-offset-2"
      >
        Xem tất cả sản phẩm
      </Link>
    </div>
  );
}
