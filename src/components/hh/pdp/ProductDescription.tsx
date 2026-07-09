import type { HHProduct } from "@/data/products";

/** Description block pattern cloned from /reference/pdp's
 * ProductDescription (attribute/definition style copy + highlight list). */
export function ProductDescription({ product }: { product: HHProduct }) {
  return (
    <div className="mt-10 grid gap-8 border-t border-hh-border pt-10 sm:grid-cols-2">
      <div>
        <p className="text-lg font-semibold text-hh-ink">Sản phẩm này là gì?</p>
        <p className="mt-3 text-sm leading-relaxed text-hh-muted-foreground">{product.description}</p>
      </div>
      <div>
        <p className="text-lg font-semibold text-hh-ink">Điểm nổi bật</p>
        <ul className="mt-3 space-y-2 text-sm text-hh-muted-foreground">
          {product.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2">
              <span className="text-hh-primary">•</span>
              {highlight}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm font-medium text-hh-ink">Cách dùng</p>
        <p className="mt-2 text-sm text-hh-muted-foreground">{product.howToUse}</p>
      </div>
    </div>
  );
}
