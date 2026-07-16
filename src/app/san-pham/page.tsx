import type { Metadata } from "next";
import { HH_BASE_METADATA } from "@/data/site-content";
import { HHShell } from "@/components/hh/HHShell";
import { PromoBar } from "@/components/hh/layout/PromoBar";
import { Header } from "@/components/hh/layout/Header";
import { Footer } from "@/components/hh/layout/Footer";
import { ProductBreadcrumb, type ProductBreadcrumbItem } from "@/components/hh/product/ProductBreadcrumb";
import { ProductFilterDrawer } from "@/components/hh/product/ProductFilterDrawer";
import { ProductGrid } from "@/components/hh/product/ProductGrid";
import { HH_PRODUCTS, HH_CATEGORIES, scentMatches, type HHCategorySlug } from "@/data/products";

export const metadata: Metadata = {
  ...HH_BASE_METADATA,
  title: "Sản phẩm",
  description:
    "Toàn bộ sản phẩm Le Petit Marseillais chính hãng tại Hoàng Hà: sữa tắm, xà phòng, dưỡng thể, chăm sóc tay, chăm sóc tóc và combo quà tặng.",
};

interface SanPhamPageProps {
  searchParams: Promise<{ category?: string; scent?: string; line?: string; volume?: string }>;
}

/** Category/listing page — structure cloned 1:1 from /reference/category
 * (breadcrumb, centered heading + intro copy, right-aligned filter drawer
 * trigger, responsive product grid), wired to real `?category=`/`?scent=`
 * filtering over the static catalog. */
export default async function SanPhamPage({ searchParams }: SanPhamPageProps) {
  const { category, scent, line, volume } = await searchParams;
  const activeCategory = HH_CATEGORIES.find((c) => c.slug === category)?.slug as
    | HHCategorySlug
    | undefined;

  const products = HH_PRODUCTS.filter((product) => {
    if (activeCategory && product.category !== activeCategory) return false;
    if (scent && !scentMatches(product.scent, scent)) return false;
    if (line && product.productLine?.toLowerCase() !== line.toLowerCase()) return false;
    if (volume && product.volume?.toLowerCase() !== volume.toLowerCase()) return false;
    return true;
  });

  const activeCategoryInfo = HH_CATEGORIES.find((c) => c.slug === activeCategory);
  const hasAnyFilter = Boolean(activeCategoryInfo || scent || line || volume);
  const heading = activeCategoryInfo
    ? activeCategoryInfo.name
    : scent
      ? `Mùi hương ${scent}`
      : line
        ? `Dòng ${line}`
        : volume
          ? `Dung tích ${volume}`
          : "Tất cả sản phẩm";
  const description = activeCategoryInfo
    ? activeCategoryInfo.description
    : "Sản phẩm chăm sóc cá nhân nhập khẩu từ Pháp, chiết xuất thiên nhiên.";

  const breadcrumbItems: ProductBreadcrumbItem[] = [
    { label: "Trang chủ", href: "/" },
    { label: "Sản phẩm", href: hasAnyFilter ? "/san-pham" : undefined },
  ];
  if (hasAnyFilter) {
    breadcrumbItems.push({ label: heading });
  }

  return (
    <HHShell>
      <PromoBar />
      <Header />
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-6 md:px-8">
        <ProductBreadcrumb items={breadcrumbItems} />

        <div className="mt-6 text-center">
          <h1 className="hh-heading-page text-hh-ink">{heading}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-hh-muted-foreground">{description}</p>
        </div>

        <div className="mt-8 flex justify-end">
          <ProductFilterDrawer activeCategory={activeCategory} activeScent={scent} activeLine={line} activeVolume={volume} />
        </div>

        <div className="mt-6 pb-16">
          <ProductGrid products={products} />
        </div>
      </main>
      <Footer />
    </HHShell>
  );
}
