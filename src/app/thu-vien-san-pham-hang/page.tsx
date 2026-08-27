import type { Metadata } from "next";
import { HH_BASE_METADATA } from "@/data/site-content";
import { HHShell } from "@/components/hh/HHShell";
import { PromoBar } from "@/components/hh/layout/PromoBar";
import { Header } from "@/components/hh/layout/Header";
import { Footer } from "@/components/hh/layout/Footer";
import { ProductBreadcrumb } from "@/components/hh/product/ProductBreadcrumb";
import { Pagination } from "@/components/hh/Pagination";
import { BrandLibraryCard } from "@/components/hh/brand-library/BrandLibraryCard";
import { BrandLibraryFilterBar } from "@/components/hh/brand-library/BrandLibraryFilterBar";
import { HH_BRAND_LIBRARY, BRAND_LIBRARY_DISCLAIMER } from "@/data/brand-library";

export const metadata: Metadata = {
  ...HH_BASE_METADATA,
  title: "Thư viện sản phẩm hãng",
  description:
    "Toàn bộ 147 sản phẩm Le Petit Marseillais (Pháp) — danh mục tham khảo từ website hãng, không phải sản phẩm Hoàng Hà đang phân phối.",
};

const PAGE_SIZE = 24;

interface Props {
  searchParams: Promise<{ category?: string; q?: string; page?: string }>;
}

export default async function ThuVienSanPhamHangPage({ searchParams }: Props) {
  const { category, q, page: pageParam } = await searchParams;

  const query = q?.trim().toLowerCase() ?? "";
  const filtered = HH_BRAND_LIBRARY.filter((p) => {
    if (category && p.categoryRaw !== category) return false;
    if (query) {
      const haystack = [p.nameVi, p.nameOriginal, p.productLine, p.scentOrKeyIngredient]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, Number(pageParam) || 1), totalPages);
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <HHShell>
      <PromoBar />
      <Header />
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-6 md:px-8">
        <ProductBreadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Thư viện sản phẩm hãng" }]} />

        <div className="mt-6 text-center">
          <h1 className="hh-heading-page text-hh-ink">Thư viện sản phẩm hãng</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-hh-muted-foreground">
            {HH_BRAND_LIBRARY.length} sản phẩm Le Petit Marseillais (Pháp) — dữ liệu tham khảo trực tiếp từ website
            hãng, dùng để đối chiếu công thức/ảnh gốc.
          </p>
          <p className="mx-auto mt-3 max-w-2xl rounded-md bg-hh-muted px-4 py-3 text-sm text-hh-ink">
            {BRAND_LIBRARY_DISCLAIMER}
          </p>
        </div>

        <div className="mt-8">
          <BrandLibraryFilterBar activeCategory={category} activeQuery={q} />
        </div>

        <p className="mt-4 text-sm text-hh-muted-foreground">{filtered.length} kết quả</p>

        <div className="mt-6 pb-8">
          {pageItems.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-16 text-center">
              <p className="text-lg font-medium text-hh-ink">Không tìm thấy sản phẩm phù hợp</p>
              <p className="text-sm text-hh-muted-foreground">Vui lòng thử danh mục hoặc từ khoá khác.</p>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
              {pageItems.map((p) => (
                <li key={p.id}>
                  <BrandLibraryCard product={p} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <Pagination
          basePath="/thu-vien-san-pham-hang"
          searchParams={{ category, q }}
          page={page}
          totalPages={totalPages}
        />
      </main>
      <Footer />
    </HHShell>
  );
}
