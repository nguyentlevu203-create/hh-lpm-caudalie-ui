import Link from "next/link";
import { HH_CATEGORIES, type HHCategorySlug } from "@/data/products";
import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";

const CATEGORY_COLORS: Record<HHCategorySlug, [string, string]> = {
  "sua-tam": ["#7c6fb0", "#b8aede"],
  "xa-phong-banh": ["#8fa06a", "#c7d3a8"],
  "duong-the": ["#d98fa0", "#f3c9d3"],
  "cham-soc-tay": ["#e2a33a", "#f3cf87"],
  "cham-soc-toc": ["#c7ab7a", "#e8d5ac"],
  "son-duong-moi": ["#cd6a3c", "#e8ab84"],
  "rua-tay": ["#5a9bb0", "#a9d4e0"],
};

/** Category tile row — pattern cloned from the shared Caudalie homepage's
 * category navigation strip, rebuilt with HH categories/placeholder art. */
export function CategoryShowcase() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 py-12 md:px-8">
      <h2 className="text-2xl font-semibold text-hh-ink sm:text-3xl">Danh mục sản phẩm</h2>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
        {HH_CATEGORIES.map((cat) => {
          const [colorFrom, colorTo] = CATEGORY_COLORS[cat.slug];
          return (
            <Link
              key={cat.slug}
              href={`/san-pham?category=${cat.slug}`}
              className="flex flex-col items-center gap-2 text-center"
            >
              <ProductPlaceholderArt
                colorFrom={colorFrom}
                colorTo={colorTo}
                shape={cat.slug === "xa-phong-banh" ? "soap" : cat.slug === "cham-soc-tay" ? "tube" : "bottle"}
                className="aspect-square w-full"
              />
              <span className="text-sm font-medium text-hh-ink">{cat.shortName}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
