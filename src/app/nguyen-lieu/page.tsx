import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HH_BASE_METADATA } from "@/data/site-content";
import { HHShell } from "@/components/hh/HHShell";
import { PromoBar } from "@/components/hh/layout/PromoBar";
import { Header } from "@/components/hh/layout/Header";
import { Footer } from "@/components/hh/layout/Footer";
import { ProductBreadcrumb } from "@/components/hh/product/ProductBreadcrumb";
import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";
import { HH_INGREDIENTS } from "@/data/ingredients";

export const metadata: Metadata = {
  ...HH_BASE_METADATA,
  title: "Nguyên liệu",
  description: "Câu chuyện các nguyên liệu thiên nhiên trong sản phẩm Le Petit Marseillais.",
};

export default function NguyenLieuPage() {
  return (
    <HHShell>
      <PromoBar />
      <Header />
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-6 md:px-8">
        <ProductBreadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Nguyên liệu" }]} />

        <div className="mt-6 text-center">
          <h1 className="text-3xl font-normal text-hh-ink md:text-4xl">Nguyên liệu</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-hh-muted-foreground">
            Câu chuyện đằng sau {HH_INGREDIENTS.length} nguyên liệu thiên nhiên được Le Petit Marseillais tuyển chọn.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 pb-16 sm:grid-cols-3 lg:grid-cols-4">
          {HH_INGREDIENTS.map((ing) => (
            <Link key={ing.id} href={`/nguyen-lieu/${ing.slug}`} className="flex flex-col gap-2">
              <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-hh-cream">
                {ing.image ? (
                  <Image src={ing.image} alt={ing.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                ) : (
                  <ProductPlaceholderArt colorFrom="#7fb79c" colorTo="#2f6b4f" className="h-full w-full" />
                )}
              </div>
              <p className="text-base font-medium text-hh-ink">{ing.name}</p>
              {ing.headline && <p className="line-clamp-2 text-sm text-hh-muted-foreground">{ing.headline}</p>}
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </HHShell>
  );
}
