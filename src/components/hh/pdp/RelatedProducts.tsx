import { ProductCard } from "@/components/hh/product/ProductCard";
import type { HHProduct } from "@/data/products";

/** Horizontal-scroll related row — pattern cloned from /reference/pdp's
 * RelatedProducts ("You may also like"). */
export function RelatedProducts({ products }: { products: HHProduct[] }) {
  if (products.length === 0) return null;

  return (
    <div className="mt-12 border-t border-hh-border pt-10">
      <p className="text-lg font-semibold text-hh-ink">Có thể bạn sẽ thích</p>
      <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
        {products.map((product) => (
          <div key={product.id} className="w-40 shrink-0 sm:w-48">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
