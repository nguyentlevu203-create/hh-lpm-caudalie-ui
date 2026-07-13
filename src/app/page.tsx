import type { Metadata } from "next";
import { HH_BASE_METADATA } from "@/data/site-content";
import { HHShell } from "@/components/hh/HHShell";
import { PromoBar } from "@/components/hh/layout/PromoBar";
import { Header } from "@/components/hh/layout/Header";
import { Footer } from "@/components/hh/layout/Footer";
import { HeroCampaign } from "@/components/hh/home/HeroCampaign";
import { BestSellers } from "@/components/hh/home/BestSellers";
import { ExperienceCards } from "@/components/hh/home/ExperienceCards";
import { FeaturedCollection } from "@/components/hh/home/FeaturedCollection";
import { AdvisorBanner } from "@/components/hh/home/AdvisorBanner";
import { BrandValues } from "@/components/hh/home/BrandValues";
import { FullBleedBrandStory } from "@/components/hh/home/FullBleedBrandStory";
import { SocialFeed } from "@/components/hh/home/SocialFeed";
import { SeoTextBlock } from "@/components/hh/home/SeoTextBlock";
import { PermanentBenefits } from "@/components/hh/home/PermanentBenefits";

export const metadata: Metadata = HH_BASE_METADATA;

/**
 * Hoàng Hà / Le Petit Marseillais Việt Nam production homepage.
 * This replaces the previous Caudalie homepage clone that lived at this
 * path (still recoverable via git history) — the Caudalie UI reference
 * itself is unaffected and lives on at `/reference/*`.
 *
 * Section order matches the shared Caudalie homepage clone's own order
 * (src/app/page.tsx at commit 44b21bd — Header, HeroBanner, YourSelection,
 * ExperienceCards, DiscoverCults, SkinAnalysisBanner, BrandValues,
 * BeautyFromVine, InstagramFeed, SeoTextBlock, PermanentBenefits, Footer).
 * CategoryShowcase.tsx and ComboOffers.tsx have no structural analog in
 * that reference order and are intentionally not rendered here (see
 * HH_LPM_UI_ALIGNMENT_PASS_2_REPORT.md) — the files are kept, unused, for
 * potential reuse on /san-pham or /uu-dai. Same for BrandStoryTeaser.tsx
 * (superseded on the homepage by FullBleedBrandStory.tsx, the reference's
 * own full-bleed treatment) and MembershipSection.tsx (the loyalty CTA
 * lives on via the footer/header entry points instead of a homepage band).
 */
export default function HHHomePage() {
  return (
    <HHShell>
      <PromoBar />
      <Header />
      <main className="flex flex-1 flex-col">
        <HeroCampaign />
        <BestSellers />
        <ExperienceCards />
        <FeaturedCollection />
        <AdvisorBanner />
        <BrandValues />
        <FullBleedBrandStory />
        <SocialFeed />
        <SeoTextBlock />
        <PermanentBenefits />
      </main>
      <Footer />
    </HHShell>
  );
}
