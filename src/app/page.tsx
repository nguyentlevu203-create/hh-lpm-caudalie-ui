import type { Metadata } from "next";
import { HH_BASE_METADATA } from "@/data/site-content";
import { HHShell } from "@/components/hh/HHShell";
import { PromoBar } from "@/components/hh/layout/PromoBar";
import { Header } from "@/components/hh/layout/Header";
import { Footer } from "@/components/hh/layout/Footer";
import { HeroCampaign } from "@/components/hh/home/HeroCampaign";
import { CategoryShowcase } from "@/components/hh/home/CategoryShowcase";
import { BestSellers } from "@/components/hh/home/BestSellers";
import { ComboOffers } from "@/components/hh/home/ComboOffers";
import { BrandStoryTeaser } from "@/components/hh/home/BrandStoryTeaser";
import { MembershipSection } from "@/components/hh/home/MembershipSection";

export const metadata: Metadata = HH_BASE_METADATA;

/**
 * Hoàng Hà / Le Petit Marseillais Việt Nam production homepage.
 * This replaces the previous Caudalie homepage clone that lived at this
 * path (still recoverable via git history) — the Caudalie UI reference
 * itself is unaffected and lives on at `/reference/*`.
 */
export default function HHHomePage() {
  return (
    <HHShell>
      <PromoBar />
      <Header />
      <main className="flex flex-1 flex-col">
        <HeroCampaign />
        <CategoryShowcase />
        <BestSellers />
        <ComboOffers />
        <BrandStoryTeaser />
        <MembershipSection />
      </main>
      <Footer />
    </HHShell>
  );
}
