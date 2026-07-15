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
import { HH_ARTICLES } from "@/data/articles";

export const metadata: Metadata = {
  ...HH_BASE_METADATA,
  title: "Bài viết",
  description: "Mẹo chăm sóc da, tóc và làm đẹp từ Le Petit Marseillais.",
};

export default function BaiVietPage() {
  return (
    <HHShell>
      <PromoBar />
      <Header />
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-6 md:px-8">
        <ProductBreadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Bài viết" }]} />

        <div className="mt-6 text-center">
          <h1 className="text-3xl font-normal text-hh-ink md:text-4xl">Bài viết</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-hh-muted-foreground">
            {HH_ARTICLES.length} bài viết mẹo chăm sóc da, tóc và làm đẹp.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 pb-16 sm:grid-cols-2 lg:grid-cols-3">
          {HH_ARTICLES.map((art) => (
            <Link key={art.id} href={`/bai-viet/${art.slug}`} className="flex flex-col gap-3">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-hh-cream">
                {art.image ? (
                  <Image src={art.image} alt={art.title} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" />
                ) : (
                  <ProductPlaceholderArt colorFrom="#e08a3e" colorTo="#204a37" className="h-full w-full" />
                )}
              </div>
              <div>
                {art.topic && <p className="text-xs uppercase tracking-wide text-hh-primary">{art.topic}</p>}
                <p className="mt-1 line-clamp-2 text-base font-medium text-hh-ink">{art.title}</p>
                {art.intro && <p className="mt-1 line-clamp-2 text-sm text-hh-muted-foreground">{art.intro}</p>}
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </HHShell>
  );
}
