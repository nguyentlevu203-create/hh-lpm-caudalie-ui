import type { Metadata } from "next";
import { HH_BASE_METADATA } from "@/data/site-content";
import { HHShell } from "@/components/hh/HHShell";
import { PromoBar } from "@/components/hh/layout/PromoBar";
import { Header } from "@/components/hh/layout/Header";
import { Footer } from "@/components/hh/layout/Footer";
import { ScentAdvisorView } from "@/components/hh/advisor/ScentAdvisorView";

export const metadata: Metadata = {
  ...HH_BASE_METADATA,
  title: "Tư vấn chọn mùi",
  description: "Tìm mùi hương Le Petit Marseillais phù hợp với bạn cùng Hoàng Hà.",
};

export default function TuVanChonSanPhamPage() {
  return (
    <HHShell>
      <PromoBar />
      <Header />
      <main className="flex-1">
        <ScentAdvisorView />
      </main>
      <Footer />
    </HHShell>
  );
}
