import type { Metadata } from "next";
import { HH_BASE_METADATA } from "@/data/site-content";
import { HHShell } from "@/components/hh/HHShell";
import { PromoBar } from "@/components/hh/layout/PromoBar";
import { Header } from "@/components/hh/layout/Header";
import { Footer } from "@/components/hh/layout/Footer";
import { OffersView } from "@/components/hh/offers/OffersView";

export const metadata: Metadata = {
  ...HH_BASE_METADATA,
  title: "Ưu đãi",
  description:
    "Ưu đãi, mã giảm giá và chương trình khuyến mại đang áp dụng cho sản phẩm Le Petit Marseillais tại Hoàng Hà.",
};

export default function UuDaiPage() {
  return (
    <HHShell>
      <PromoBar />
      <Header />
      <main className="flex-1">
        <OffersView />
      </main>
      <Footer />
    </HHShell>
  );
}
