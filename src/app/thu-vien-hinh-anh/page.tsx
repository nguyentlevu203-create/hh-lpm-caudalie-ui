import type { Metadata } from "next";
import { HH_BASE_METADATA } from "@/data/site-content";
import { ALWAYS_NOINDEX_ROBOTS } from "@/lib/seo";
import { HHShell } from "@/components/hh/HHShell";
import { PromoBar } from "@/components/hh/layout/PromoBar";
import { Header } from "@/components/hh/layout/Header";
import { Footer } from "@/components/hh/layout/Footer";
import { ProductBreadcrumb } from "@/components/hh/product/ProductBreadcrumb";
import { Pagination } from "@/components/hh/Pagination";
import { MediaLibraryFilterBar } from "@/components/hh/media/MediaLibraryFilterBar";
import { MediaRecordCard } from "@/components/hh/media/MediaRecordCard";
import { HH_MEDIA_LIBRARY } from "@/data/media-library";

// P2.9: internal data-library/QA route, stays noindex regardless of
// NEXT_PUBLIC_SITE_ENV — not meant for public search results.
export const metadata: Metadata = {
  ...HH_BASE_METADATA,
  title: "Thư viện hình ảnh",
  description: "Metadata của toàn bộ 1.161 ảnh nhập từ website hãng Le Petit Marseillais.",
  robots: ALWAYS_NOINDEX_ROBOTS,
};

const PAGE_SIZE = 60;

interface Props {
  searchParams: Promise<{ sheet?: string; type?: string; status?: string; page?: string }>;
}

export default async function ThuVienHinhAnhPage({ searchParams }: Props) {
  const { sheet, type, status, page: pageParam } = await searchParams;

  const filtered = HH_MEDIA_LIBRARY.filter((r) => {
    if (sheet && r.sourceSheet !== sheet) return false;
    if (type && r.imageType !== type) return false;
    if (status && r.downloadStatus !== status) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, Number(pageParam) || 1), totalPages);
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const downloadedCount = HH_MEDIA_LIBRARY.filter((r) => r.downloadStatus === "downloaded").length;

  return (
    <HHShell>
      <PromoBar />
      <Header />
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-6 md:px-8">
        <ProductBreadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Thư viện hình ảnh" }]} />

        <div className="mt-6 text-center">
          <h1 className="hh-heading-page text-hh-ink">Thư viện hình ảnh</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-hh-muted-foreground">
            Metadata của toàn bộ {HH_MEDIA_LIBRARY.length} ảnh nhập từ thư viện ảnh hãng — {downloadedCount} ảnh đã
            được tải và host cục bộ (trùng URL với ảnh đang dùng thật trong sản phẩm/nguyên liệu/bài viết/nội dung
            thương hiệu/card), phần còn lại chỉ hiển thị metadata với trạng thái &quot;Chưa tải&quot; — không hotlink
            ảnh chưa dùng.
          </p>
        </div>

        <div className="mt-8">
          <MediaLibraryFilterBar activeSheet={sheet} activeType={type} activeStatus={status} />
        </div>

        <p className="mt-4 text-sm text-hh-muted-foreground">
          {filtered.length} kết quả · trang {page}/{totalPages}
        </p>

        <div className="mt-6 pb-8">
          {pageItems.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-16 text-center">
              <p className="text-lg font-medium text-hh-ink">Không tìm thấy bản ghi phù hợp</p>
              <p className="text-sm text-hh-muted-foreground">Vui lòng thử bộ lọc khác.</p>
            </div>
          ) : (
            <ul className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
              {pageItems.map((record) => (
                <li key={record.id}>
                  <MediaRecordCard record={record} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <Pagination basePath="/thu-vien-hinh-anh" searchParams={{ sheet, type, status }} page={page} totalPages={totalPages} />
      </main>
      <Footer />
    </HHShell>
  );
}
