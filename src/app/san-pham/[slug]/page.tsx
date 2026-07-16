import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HH_BASE_METADATA } from "@/data/site-content";
import { HHShell } from "@/components/hh/HHShell";
import { PromoBar } from "@/components/hh/layout/PromoBar";
import { Header } from "@/components/hh/layout/Header";
import { Footer } from "@/components/hh/layout/Footer";
import { ProductBreadcrumb, type ProductBreadcrumbItem } from "@/components/hh/product/ProductBreadcrumb";
import { ProductGallery } from "@/components/hh/pdp/ProductGallery";
import { ProductBuyBox } from "@/components/hh/pdp/ProductBuyBox";
import { ProductDescription } from "@/components/hh/pdp/ProductDescription";
import { ProductAccordions } from "@/components/hh/pdp/ProductAccordions";
import { TrustBadges } from "@/components/hh/pdp/TrustBadges";
import { ProductReviews } from "@/components/hh/pdp/ProductReviews";
import { RelatedProducts } from "@/components/hh/pdp/RelatedProducts";
import { getProductBySlug, getRelatedProducts, HH_CATEGORIES, HH_PRODUCTS } from "@/data/products";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return HH_PRODUCTS.map((product) => ({ slug: product.slug }));
}

/** Names shared by more than one product (same scent sold in different
 * volumes, e.g. "Gel Tắm ... Hoa Tiaré" at 250ml and 650ml) — their <title>
 * would otherwise be byte-identical across two distinct PDPs. */
const DUPLICATE_PRODUCT_NAMES = new Set(
  Object.entries(
    HH_PRODUCTS.reduce<Record<string, number>>((counts, p) => {
      counts[p.name] = (counts[p.name] ?? 0) + 1;
      return counts;
    }, {})
  )
    .filter(([, count]) => count > 1)
    .map(([name]) => name)
);

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return HH_BASE_METADATA;
  const title =
    DUPLICATE_PRODUCT_NAMES.has(product.name) && product.volume
      ? `${product.name} — ${product.volume}`
      : product.name;
  return {
    ...HH_BASE_METADATA,
    title,
    description: product.shortDescription,
  };
}

/** PDP shell — structure cloned 1:1 from /reference/pdp: gallery + buy box
 * (2-col grid) → trust badges → description → accordions → reviews →
 * related products, rebuilt with placeholder art instead of real packshots
 * (see production report for what real assets are still needed). */
export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const categoryName = HH_CATEGORIES.find((c) => c.slug === product.category)?.name ?? product.category;
  const breadcrumbItems: ProductBreadcrumbItem[] = [
    { label: "Trang chủ", href: "/" },
    { label: "Sản phẩm", href: "/san-pham" },
    { label: categoryName, href: `/san-pham?category=${product.category}` },
    { label: product.name },
  ];

  return (
    <HHShell>
      <PromoBar />
      <Header />
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-10 md:px-8">
        <ProductBreadcrumb items={breadcrumbItems} />
        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <ProductGallery product={product} />
          <ProductBuyBox product={product} />
        </div>
        <TrustBadges />
        <ProductDescription product={product} />
        <ProductAccordions product={product} />
        <ProductReviews />
        <RelatedProducts products={related} />
      </main>
      <Footer />
    </HHShell>
  );
}
