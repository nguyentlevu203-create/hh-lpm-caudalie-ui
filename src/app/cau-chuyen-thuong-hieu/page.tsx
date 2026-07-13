import type { Metadata } from "next";
import { HH_BASE_METADATA } from "@/data/site-content";
import { HHShell } from "@/components/hh/HHShell";
import { PromoBar } from "@/components/hh/layout/PromoBar";
import { Header } from "@/components/hh/layout/Header";
import { Footer } from "@/components/hh/layout/Footer";
import { MembershipSection } from "@/components/hh/home/MembershipSection";
import { BrandStoryView } from "@/components/hh/brand-story/BrandStoryView";

export const metadata: Metadata = {
  ...HH_BASE_METADATA,
  title: "Câu chuyện thương hiệu",
  description: "Câu chuyện Le Petit Marseillais và hành trình Hoàng Hà phân phối tại Việt Nam.",
};

export default function CauChuyenThuongHieuPage() {
  return (
    <HHShell>
      <PromoBar />
      <Header />
      <main className="flex-1">
        <BrandStoryView />
        {/* Shared loyalty/benefits band, reused as-is — structural parity
            with /reference/brand-story, which renders the shared
            `PermanentBenefits` bar right before the footer. */}
        <MembershipSection />
      </main>
      <Footer />
    </HHShell>
  );
}
