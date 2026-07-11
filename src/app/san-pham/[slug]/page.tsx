import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HH_BASE_METADATA } from "@/data/site-content";
import { HHShell } from "@/components/hh/HHShell";
import { PromoBar } from "@/components/hh/layout/PromoBar";
import { Header } from "@/components/hh/layout/Header";
import { Footer } from "@/components/hh/layout/Footer";
import { ProductGallery } from "@/components/hh/pdp/ProductGallery";
import { ProductBuyBox } from "@/components/hh/pdp/ProductBuyBox";
import { ProductDescription } from "@/components/hh/pdp/ProductDescription";
import { ProductAccordions } from "@/components/hh/pdp/ProductAccordions";
import { TrustBadges } from "@/components/hh/pdp/TrustBadges";
import { ProductReviews } from "@/components/hh/pdp/ProductReviews";
import { RelatedProducts } from "@/components/hh/pdp/RelatedProducts";
import { getProductBySlug, getRelatedProducts, HH_PRODUCTS } from "@/data/products";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return HH_PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return HH_BASE_METADATA;
  return {
    ...HH_BASE_METADATA,
    title: product.name,
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

  return (
    <HHShell>
      <PromoBar />
      <Header />
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-10 md:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <ProductGallery product={product} />
          <ProductBuyBox product={product} />
        </div>
        <TrustBadges />
        <ProductDescription product={product} />
        <ProductAccordions productName={product.name} />
        <ProductReviews product={product} />
        <RelatedProducts products={related} />
      </main>
      <Footer />
    </HHShell>
  );
}
