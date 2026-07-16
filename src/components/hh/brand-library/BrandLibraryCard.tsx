import Image from "next/image";
import Link from "next/link";
import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";
import type { HHBrandLibraryProduct } from "@/data/brand-library";

/** Reference-catalogue tile — deliberately NOT a ProductCard clone: no
 * price, no rating, no wishlist heart, no "Thêm vào giỏ" button. Always
 * carries the "Tham khảo" badge so it can never be mistaken for a real HH
 * SKU in a grid. */
export function BrandLibraryCard({ product }: { product: HHBrandLibraryProduct }) {
  return (
    <Link href={`/thu-vien-san-pham-hang/${product.slug}`} className="flex flex-col gap-2">
      <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-hh-cream">
        <span className="absolute left-2 top-2 z-10 rounded bg-slate-600 px-[10px] py-1 text-xs font-normal text-white">
          Tham khảo
        </span>
        {product.image ? (
          <Image
            src={product.image}
            alt={product.nameVi}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-contain p-4"
          />
        ) : (
          <ProductPlaceholderArt colorFrom="#8a8f98" colorTo="#c4c8ce" className="h-full w-full rounded-sm" />
        )}
      </div>
      <p className="line-clamp-2 text-base font-normal text-hh-ink">{product.nameVi}</p>
      <p className="text-sm text-hh-muted-foreground">
        {[product.volume, product.productLine].filter(Boolean).join(" · ")}
      </p>
    </Link>
  );
}
