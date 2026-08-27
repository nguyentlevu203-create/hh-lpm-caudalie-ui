import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { HH_BASE_METADATA } from "@/data/site-content";
import { HHShell } from "@/components/hh/HHShell";
import { PromoBar } from "@/components/hh/layout/PromoBar";
import { Header } from "@/components/hh/layout/Header";
import { Footer } from "@/components/hh/layout/Footer";
import { ProductBreadcrumb } from "@/components/hh/product/ProductBreadcrumb";
import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";
import { ContentCardCarousel } from "@/components/hh/content/ContentCardCarousel";
import { ContentBody } from "@/components/hh/content/ContentBody";
import { getCardsForRoute } from "@/data/cards";
import { HH_ARTICLES, getArticleBySlug } from "@/data/articles";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return HH_ARTICLES.map((art) => ({ slug: art.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const art = getArticleBySlug(slug);
  if (!art) return HH_BASE_METADATA;
  return { ...HH_BASE_METADATA, title: art.title, description: art.intro || HH_BASE_METADATA.description };
}

export default async function BaiVietDetailPage({ params }: Props) {
  const { slug } = await params;
  const art = getArticleBySlug(slug);
  if (!art) notFound();

  return (
    <HHShell>
      <PromoBar />
      <Header />
      <main className="mx-auto w-full max-w-[900px] flex-1 px-4 py-6 md:px-8">
        <ProductBreadcrumb
          items={[{ label: "Trang chủ", href: "/" }, { label: "Bài viết", href: "/bai-viet" }, { label: art.title }]}
        />

        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-md bg-hh-cream">
          {art.image ? (
            <Image src={art.image} alt={art.title} fill sizes="900px" className="object-cover" priority />
          ) : (
            <ProductPlaceholderArt colorFrom="#e08a3e" colorTo="#204a37" className="h-full w-full" />
          )}
        </div>

        <div className="mx-auto max-w-[65ch]">
          {art.topic && <p className="mt-6 text-xs uppercase tracking-wide text-hh-primary">{art.topic}</p>}
          <h1 className="mt-2 hh-heading-page text-hh-ink">{art.title}</h1>
          {art.intro && <p className="mt-3 hh-body-lg text-hh-muted-foreground">{art.intro}</p>}

          {art.mainContent && <ContentBody text={art.mainContent} className="mt-8 space-y-4 hh-body text-hh-ink" />}
        </div>

        <ContentCardCarousel cards={getCardsForRoute(`/bai-viet/${slug}`)} heading="Nội dung liên quan" />
      </main>
      <Footer />
    </HHShell>
  );
}
