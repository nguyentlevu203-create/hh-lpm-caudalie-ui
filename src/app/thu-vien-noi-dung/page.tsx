import type { Metadata } from "next";
import { HH_BASE_METADATA } from "@/data/site-content";
import { HHShell } from "@/components/hh/HHShell";
import { PromoBar } from "@/components/hh/layout/PromoBar";
import { Header } from "@/components/hh/layout/Header";
import { Footer } from "@/components/hh/layout/Footer";
import { ProductBreadcrumb } from "@/components/hh/product/ProductBreadcrumb";
import { ContentCardGrid } from "@/components/hh/content/ContentCardGrid";
import { HH_CARDS, CARD_CATEGORY_LABEL, type HHCardCategory } from "@/data/cards";

export const metadata: Metadata = {
  ...HH_BASE_METADATA,
  title: "Thư viện nội dung",
  description: "Toàn bộ 159 card/CTA nhập từ website hãng Le Petit Marseillais, phân nhóm theo loại nội dung.",
};

const ORDER: HHCardCategory[] = [
  "san-pham",
  "nguyen-lieu",
  "bai-viet",
  "noi-dung-thuong-hieu",
  "campaign",
  "cta-chung",
  "chua-phan-loai",
];

export default function ThuVienNoiDungPage() {
  return (
    <HHShell>
      <PromoBar />
      <Header />
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-6 md:px-8">
        <ProductBreadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Thư viện nội dung" }]} />

        <div className="mt-6 text-center">
          <h1 className="text-3xl font-normal text-hh-ink md:text-4xl">Thư viện nội dung</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-hh-muted-foreground">
            Toàn bộ {HH_CARDS.length} card/CTA nhập từ sheet <code>07_Cards_CTA</code> của website hãng, phân nhóm
            theo loại nội dung. Card có đích rõ ràng dẫn thẳng tới trang tương ứng; card chưa xác định được vị trí
            hiển thị với nhãn riêng, không bị bỏ sót.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-14 pb-16">
          {ORDER.map((cat) => {
            const cards = HH_CARDS.filter((c) => c.category === cat);
            if (cards.length === 0) return null;
            return (
              <ContentCardGrid key={cat} cards={cards} heading={`${CARD_CATEGORY_LABEL[cat]} (${cards.length})`} />
            );
          })}
        </div>
      </main>
      <Footer />
    </HHShell>
  );
}
