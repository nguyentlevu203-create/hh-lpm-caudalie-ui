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
import { getCardsForRoute } from "@/data/cards";
import { getBrandPageBySlug, CAM_KET_SLUG } from "@/data/brand-pages";

export const metadata: Metadata = { ...HH_BASE_METADATA, title: "Cam kết" };

export default function CamKetPage() {
  const page = getBrandPageBySlug(CAM_KET_SLUG);
  if (!page) notFound();

  return (
    <HHShell>
      <PromoBar />
      <Header />
      <main className="mx-auto w-full max-w-[900px] flex-1 px-4 py-6 md:px-8">
        <ProductBreadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Cam kết" }]} />

        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-md bg-hh-cream">
          {page.image ? (
            <Image src={page.image} alt={page.pageName} fill sizes="900px" className="object-cover" priority />
          ) : (
            <ProductPlaceholderArt colorFrom="#2f6b4f" colorTo="#7fb79c" className="h-full w-full" />
          )}
        </div>

        <h1 className="mt-6 hh-heading-page text-hh-ink">{page.h1 || page.pageName}</h1>
        {page.intro && <p className="mt-3 text-base text-hh-muted-foreground">{page.intro}</p>}
        {page.sections && <div className="mt-8 whitespace-pre-line text-base text-hh-ink">{page.sections}</div>}

        <ContentCardCarousel cards={getCardsForRoute("/cam-ket")} heading="Nội dung liên quan" />
      </main>
      <Footer />
    </HHShell>
  );
}
