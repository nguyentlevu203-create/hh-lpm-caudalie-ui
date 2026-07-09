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

/** PDP shell — pattern cloned from /reference/pdp (gallery + buy box 2-col
 * grid, description block, related row) rebuilt with placeholder art
 * instead of real packshots and no ingredients/FAQ accordion or reviews
 * section yet (see production report for what's still missing). */
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
        <ProductDescription product={product} />
        <RelatedProducts products={related} />
      </main>
      <Footer />
    </HHShell>
  );
}
