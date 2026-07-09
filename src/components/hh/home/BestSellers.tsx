import Link from "next/link";
import { ProductGrid } from "@/components/hh/product/ProductGrid";
import { getBestSellers } from "@/data/products";

/** Pattern cloned from the shared Caudalie homepage's "Your Selection" rail
 * / /reference/category's grid — rebuilt as a static best-seller grid with
 * HH data (no tab-switching, since the reference's 3 tabs reused the same
 * demo data anyway; see production report). */
export function BestSellers() {
  const products = getBestSellers();

  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 py-12 md:px-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-hh-ink sm:text-3xl">Sản phẩm bán chạy</h2>
        <Link href="/san-pham" className="text-sm font-medium text-hh-primary underline underline-offset-2">
          Xem tất cả
        </Link>
      </div>
      <div className="mt-6">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
