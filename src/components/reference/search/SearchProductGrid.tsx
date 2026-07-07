import type { SearchProduct } from "@/types/content";
import { SearchProductCard } from "@/components/reference/search/SearchProductCard";

interface SearchProductGridProps {
  products: SearchProduct[];
  heading?: string;
}

export function SearchProductGrid({ products, heading }: SearchProductGridProps) {
  return (
    <div className="lg:col-span-2">
      {heading && (
        <p className="mb-4 text-base font-medium text-primary">{heading}</p>
      )}
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {products.map((product) => (
          <li key={product.id}>
            <SearchProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
