import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import { HH_BASE_METADATA } from "@/data/site-content";
import { HHShell } from "@/components/hh/HHShell";
import { PromoBar } from "@/components/hh/layout/PromoBar";
import { Header } from "@/components/hh/layout/Header";
import { Footer } from "@/components/hh/layout/Footer";
import { ProductBreadcrumb } from "@/components/hh/product/ProductBreadcrumb";
import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";
import { ContentCardCarousel } from "@/components/hh/content/ContentCardCarousel";
import { getCardsForRoute } from "@/data/cards";
import { HH_CONTENT_PAGES, getContentPageBySlug } from "@/data/content-library";

interface Props {
  params: Promise<{ slug: string }>;
}

/** Excludes the 3 slugs that already have a named, untouched route
 * (/thuong-hieu, /cam-ket, /cong-thuc-minh-bach) — those redirect below
 * instead of getting a second, duplicate page at this path. */
export function generateStaticParams() {
  return HH_CONTENT_PAGES.filter((p) => !p.dedicatedRoute).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getContentPageBySlug(slug);
  if (!page) return HH_BASE_METADATA;
  return { ...HH_BASE_METADATA, title: page.pageName, description: page.intro || HH_BASE_METADATA.description };
}

export default async function NoiDungThuongHieuDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = getContentPageBySlug(slug);
  if (!page) notFound();
  if (page.dedicatedRoute) redirect(page.dedicatedRoute);

  return (
    <HHShell>
      <PromoBar />
      <Header />
      <main className="mx-auto w-full max-w-[900px] flex-1 px-4 py-6 md:px-8">
        <ProductBreadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Nội dung thương hiệu", href: "/noi-dung-thuong-hieu" },
            { label: page.pageName },
          ]}
        />

        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-md bg-hh-cream">
          {page.image ? (
            <Image src={page.image} alt={page.pageName} fill sizes="900px" className="object-cover" priority />
          ) : (
            <ProductPlaceholderArt colorFrom="#204a37" colorTo="#123023" className="h-full w-full" />
          )}
        </div>

        <h1 className="mt-6 hh-heading-page text-hh-ink">{page.h1 || page.pageName}</h1>
        {page.intro && <p className="mt-3 text-base text-hh-muted-foreground">{page.intro}</p>}
        {page.sections && <div className="mt-8 whitespace-pre-line text-base text-hh-ink">{page.sections}</div>}

        <ContentCardCarousel cards={getCardsForRoute(`/noi-dung-thuong-hieu/${slug}`)} heading="Nội dung liên quan" />
      </main>
      <Footer />
    </HHShell>
  );
}
