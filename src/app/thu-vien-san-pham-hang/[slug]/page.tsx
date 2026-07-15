import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { HH_BASE_METADATA } from "@/data/site-content";
import { HHShell } from "@/components/hh/HHShell";
import { PromoBar } from "@/components/hh/layout/PromoBar";
import { Header } from "@/components/hh/layout/Header";
import { Footer } from "@/components/hh/layout/Footer";
import { ProductBreadcrumb } from "@/components/hh/product/ProductBreadcrumb";
import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";
import { ContentCardCarousel } from "@/components/hh/content/ContentCardCarousel";
import { getCardsForRoute } from "@/data/cards";
import { HH_BRAND_LIBRARY, getBrandLibraryProductBySlug, BRAND_LIBRARY_DISCLAIMER } from "@/data/brand-library";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return HH_BRAND_LIBRARY.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getBrandLibraryProductBySlug(slug);
  if (!product) return HH_BASE_METADATA;
  return { ...HH_BASE_METADATA, title: product.nameVi, description: product.shortDescription || HH_BASE_METADATA.description };
}

export default async function ThuVienSanPhamHangDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getBrandLibraryProductBySlug(slug);
  if (!product) notFound();

  return (
    <HHShell>
      <PromoBar />
      <Header />
      <main className="mx-auto w-full max-w-[900px] flex-1 px-4 py-6 md:px-8">
        <ProductBreadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Thư viện sản phẩm hãng", href: "/thu-vien-san-pham-hang" },
            { label: product.nameVi },
          ]}
        />

        <div className="mt-4 rounded-md bg-hh-muted px-4 py-3 text-sm text-hh-ink">{BRAND_LIBRARY_DISCLAIMER}</div>

        <div className="relative mt-6 aspect-square w-full max-w-sm overflow-hidden rounded-md bg-hh-cream">
          {product.image ? (
            <Image src={product.image} alt={product.nameVi} fill sizes="384px" className="object-contain p-6" priority />
          ) : (
            <ProductPlaceholderArt colorFrom="#8a8f98" colorTo="#c4c8ce" className="h-full w-full" />
          )}
        </div>

        <h1 className="mt-6 text-3xl font-normal text-hh-ink md:text-4xl">{product.nameVi}</h1>
        {product.nameOriginal && (
          <p className="mt-1 text-sm italic text-hh-muted-foreground">{product.nameOriginal}</p>
        )}
        <p className="mt-3 text-sm text-hh-muted-foreground">
          {[product.categoryRaw, product.productLine, product.volume].filter(Boolean).join(" · ")}
        </p>

        {product.shortDescription && <p className="mt-4 text-base text-hh-ink">{product.shortDescription}</p>}

        <div className="mt-8 space-y-6 text-base text-hh-ink">
          {product.description && (
            <section>
              <h2 className="text-lg font-medium">Mô tả</h2>
              <p className="mt-2 whitespace-pre-line text-hh-muted-foreground">{product.description}</p>
            </section>
          )}
          {product.benefits && (
            <section>
              <h2 className="text-lg font-medium">Công dụng</h2>
              <p className="mt-2 whitespace-pre-line text-hh-muted-foreground">{product.benefits}</p>
            </section>
          )}
          {product.howToUse && (
            <section>
              <h2 className="text-lg font-medium">Cách dùng</h2>
              <p className="mt-2 whitespace-pre-line text-hh-muted-foreground">{product.howToUse}</p>
            </section>
          )}
          {product.ingredients && (
            <section>
              <h2 className="text-lg font-medium">Thành phần</h2>
              <p className="mt-2 whitespace-pre-line text-sm text-hh-muted-foreground">{product.ingredients}</p>
            </section>
          )}
          {product.claims && (
            <section>
              <h2 className="text-lg font-medium">Nhãn/chứng nhận (theo hãng)</h2>
              <p className="mt-2 whitespace-pre-line text-hh-muted-foreground">{product.claims}</p>
            </section>
          )}
          {product.packaging && (
            <section>
              <h2 className="text-lg font-medium">Bao bì</h2>
              <p className="mt-2 whitespace-pre-line text-hh-muted-foreground">{product.packaging}</p>
            </section>
          )}
        </div>

        {product.productUrl && (
          <p className="mt-8 text-sm text-hh-muted-foreground">
            Nguồn:{" "}
            <a href={product.productUrl} target="_blank" rel="noopener noreferrer" className="text-hh-primary underline underline-offset-2">
              {product.productUrl}
            </a>
          </p>
        )}

        <ContentCardCarousel cards={getCardsForRoute(`/thu-vien-san-pham-hang/${slug}`)} heading="Nội dung liên quan" />

        <div className="mt-10">
          <Link href="/thu-vien-san-pham-hang" className="text-sm text-hh-primary underline underline-offset-2">
            ← Quay lại thư viện sản phẩm hãng
          </Link>
        </div>
      </main>
      <Footer />
    </HHShell>
  );
}
