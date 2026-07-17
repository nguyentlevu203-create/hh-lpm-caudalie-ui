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
import { HH_INGREDIENTS, getIngredientBySlug } from "@/data/ingredients";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return HH_INGREDIENTS.map((ing) => ({ slug: ing.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ing = getIngredientBySlug(slug);
  if (!ing) return HH_BASE_METADATA;
  return { ...HH_BASE_METADATA, title: ing.name, description: ing.intro || HH_BASE_METADATA.description };
}

export default async function NguyenLieuDetailPage({ params }: Props) {
  const { slug } = await params;
  const ing = getIngredientBySlug(slug);
  if (!ing) notFound();

  return (
    <HHShell>
      <PromoBar />
      <Header />
      <main className="mx-auto w-full max-w-[900px] flex-1 px-4 py-6 md:px-8">
        <ProductBreadcrumb
          items={[{ label: "Trang chủ", href: "/" }, { label: "Nguyên liệu", href: "/nguyen-lieu" }, { label: ing.name }]}
        />

        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-md bg-hh-cream">
          {ing.image ? (
            <Image src={ing.image} alt={ing.name} fill sizes="900px" className="object-cover" priority />
          ) : (
            <ProductPlaceholderArt colorFrom="#7fb79c" colorTo="#2f6b4f" className="h-full w-full" />
          )}
        </div>

        <div className="mx-auto max-w-[65ch]">
          <h1 className="mt-6 hh-heading-page text-hh-ink">{ing.h1 || ing.name}</h1>
          {ing.intro && <p className="mt-3 hh-body-lg text-hh-muted-foreground">{ing.intro}</p>}

          <div className="mt-8 space-y-6 hh-body text-hh-ink">
            {ing.origin && (
              <section>
                <h2 className="text-lg font-medium">Nguồn gốc</h2>
                <p className="mt-2 whitespace-pre-line text-hh-muted-foreground">{ing.origin}</p>
              </section>
            )}
            {ing.benefit && (
              <section>
                <h2 className="text-lg font-medium">Công dụng</h2>
                <p className="mt-2 whitespace-pre-line text-hh-muted-foreground">{ing.benefit}</p>
              </section>
            )}
            {ing.beautyTip && (
              <section>
                <h2 className="text-lg font-medium">Bí quyết làm đẹp</h2>
                <p className="mt-2 whitespace-pre-line text-hh-muted-foreground">{ing.beautyTip}</p>
              </section>
            )}
            {ing.scentExperience && (
              <section>
                <h2 className="text-lg font-medium">Hương/Trải nghiệm</h2>
                <p className="mt-2 whitespace-pre-line text-hh-muted-foreground">{ing.scentExperience}</p>
              </section>
            )}
          </div>
        </div>

        <ContentCardCarousel cards={getCardsForRoute(`/nguyen-lieu/${slug}`)} heading="Nội dung liên quan" />
      </main>
      <Footer />
    </HHShell>
  );
}
