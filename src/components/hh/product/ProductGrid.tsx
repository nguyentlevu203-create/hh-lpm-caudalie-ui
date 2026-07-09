import { ProductCard } from "@/components/hh/product/ProductCard";
import type { HHProduct } from "@/data/products";

/** Responsive grid shell cloned from /reference/category's ProductGrid
 * (2 → 3 → 4 columns) plus /reference/search's empty-state pattern. */
export function ProductGrid({ products }: { products: HHProduct[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-center">
        <p className="text-lg font-medium text-hh-ink">Không tìm thấy sản phẩm phù hợp</p>
        <p className="text-sm text-hh-muted-foreground">Vui lòng thử danh mục hoặc mùi hương khác.</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
