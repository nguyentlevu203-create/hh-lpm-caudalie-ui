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
import { HH_CONTENT_PAGES, HH_CONTENT_DUPLICATES, contentPageRoute } from "@/data/content-library";

export const metadata: Metadata = {
  ...HH_BASE_METADATA,
  title: "Nội dung thương hiệu",
  description:
    "Toàn bộ nội dung thương hiệu Le Petit Marseillais: tuyên ngôn, cam kết môi trường, công thức minh bạch và các bài viết thương hiệu khác.",
};

const canonicalLabel: Record<string, string> = {
  ingredient: "Nguyên liệu",
  article: "Bài viết",
  brand_content: "Nội dung thương hiệu",
};

export default function NoiDungThuongHieuPage() {
  const grouped = {
    ingredient: HH_CONTENT_DUPLICATES.filter((d) => d.canonicalType === "ingredient"),
    article: HH_CONTENT_DUPLICATES.filter((d) => d.canonicalType === "article"),
    brand_content: HH_CONTENT_DUPLICATES.filter((d) => d.canonicalType === "brand_content"),
  };

  return (
    <HHShell>
      <PromoBar />
      <Header />
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-6 md:px-8">
        <ProductBreadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Nội dung thương hiệu" }]} />

        <div className="mt-6 text-center">
          <h1 className="hh-heading-page text-hh-ink">Nội dung thương hiệu</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-hh-muted-foreground">
            {HH_CONTENT_PAGES.length} trang nội dung thương hiệu gốc từ Le Petit Marseillais, cộng thêm{" "}
            {HH_CONTENT_DUPLICATES.length} bản scrape trùng lặp đã được đối chiếu và gộp về đúng trang chính (xem
            danh sách bên dưới).
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {HH_CONTENT_PAGES.map((page) => (
            <Link key={page.id} href={contentPageRoute(page)} className="flex flex-col gap-2">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-hh-cream">
                {page.image ? (
                  <Image src={page.image} alt={page.pageName} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                ) : (
                  <ProductPlaceholderArt colorFrom="#204a37" colorTo="#123023" className="h-full w-full" />
                )}
              </div>
              <p className="line-clamp-2 text-base font-medium text-hh-ink">{page.pageName}</p>
              {page.intro && <p className="line-clamp-2 text-sm text-hh-muted-foreground">{page.intro}</p>}
            </Link>
          ))}
        </div>

        <section className="mt-16 pb-16">
          <h2 className="text-2xl font-normal text-hh-ink">
            {HH_CONTENT_DUPLICATES.length} nội dung trùng lặp đã được gộp
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-hh-muted-foreground">
            Đây là các trang được crawl thô từ sheet <code>05_Trang_noi_dung</code> — nội dung trùng 1-1 (đối chiếu
            qua URL nguồn) với dữ liệu đã hiển thị ở nguyên liệu, bài viết hoặc nội dung thương hiệu phía trên. Giữ
            đầy đủ metadata, không tạo trang riêng để tránh trùng lặp nội dung.
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {(["ingredient", "article", "brand_content"] as const).map((type) => (
              <div key={type}>
                <h3 className="text-base font-semibold text-hh-ink">
                  {canonicalLabel[type]} ({grouped[type].length})
                </h3>
                <ul className="mt-3 space-y-2">
                  {grouped[type].map((dup) => (
                    <li key={dup.id} className="text-sm">
                      <span className="text-hh-muted-foreground">{dup.title}</span>{" "}
                      {dup.canonicalRoute && (
                        <Link href={dup.canonicalRoute} className="text-hh-primary underline underline-offset-2">
                          → xem bản chính
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </HHShell>
  );
}
