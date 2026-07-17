import Link from "next/link";
import { HH_CATEGORIES } from "@/data/products";
import { BRAND_LIBRARY_LINK } from "@/data/site-content";

const CONTAINER = "mx-auto w-full max-w-[1280px] px-4 md:px-8";

/** Desktop mega menu dropdown under the "Sản phẩm" nav item — full-width
 * panel structure cloned from the shared Caudalie Header's mega menu
 * (column grid of category links + a centered outlined CTA), rebuilt with
 * HH categories/copy. Also surfaces the brand's reference-only product
 * library (BRAND_LIBRARY_LINK, same href used in FOOTER_LINKS) as one more
 * tile, styled to match the category tiles. */
export function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className={CONTAINER + " py-8"}>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-3">
        {HH_CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/san-pham?category=${cat.slug}`}
            onClick={onNavigate}
            className="block rounded-lg border-b border-hh-border pb-3 transition-colors hover:bg-hh-surface-blue"
          >
            <p className="text-base font-medium text-hh-ink">{cat.name}</p>
            <p className="mt-1 text-sm text-hh-muted-foreground">{cat.description}</p>
          </Link>
        ))}
        <Link
          href={BRAND_LIBRARY_LINK.href}
          onClick={onNavigate}
          className="block rounded-lg border-b border-hh-border pb-3 transition-colors hover:bg-hh-surface-blue"
        >
          <p className="text-base font-medium text-hh-ink">{BRAND_LIBRARY_LINK.label}</p>
          <p className="mt-1 text-sm text-hh-muted-foreground">
            Danh mục tham khảo từ website hãng Le Petit Marseillais (Pháp).
          </p>
        </Link>
      </div>
      <div className="mt-8 flex justify-center">
        <Link
          href="/san-pham"
          onClick={onNavigate}
          className="inline-flex items-center justify-center rounded-full border border-hh-primary px-6 py-2.5 text-sm font-medium text-hh-primary transition-colors hover:bg-hh-primary hover:text-white"
        >
          Xem tất cả sản phẩm
        </Link>
      </div>
    </div>
  );
}
