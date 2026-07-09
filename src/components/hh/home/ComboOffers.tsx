import Link from "next/link";
import { ProductGrid } from "@/components/hh/product/ProductGrid";
import { getCombos } from "@/data/products";

/** Combo/gift-set grid — pattern cloned from /reference/offers' campaign
 * grid shape, rebuilt as a product grid of combo SKUs. */
export function ComboOffers() {
  const combos = getCombos();

  return (
    <section className="bg-hh-muted py-12">
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-hh-ink sm:text-3xl">Combo ưu đãi</h2>
          <Link href="/uu-dai" className="text-sm font-medium text-hh-primary underline underline-offset-2">
            Xem ưu đãi khác
          </Link>
        </div>
        <div className="mt-6">
          <ProductGrid products={combos} />
        </div>
      </div>
    </section>
  );
}
