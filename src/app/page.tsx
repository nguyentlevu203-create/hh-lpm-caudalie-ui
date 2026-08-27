import type { Metadata } from "next";
import { HH_BASE_METADATA } from "@/data/site-content";
import { HHShell } from "@/components/hh/HHShell";
import { PromoBar } from "@/components/hh/layout/PromoBar";
import { Header } from "@/components/hh/layout/Header";
import { Footer } from "@/components/hh/layout/Footer";
import { HeroCampaign } from "@/components/hh/home/HeroCampaign";
import { BestSellers } from "@/components/hh/home/BestSellers";
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
 * Section order (Phase 8C / P2 homepage IA pass — see
 * HH_LPM_CAUDALIE_PARITY_P2_REPORT.md §P2.1): commerce (Hero → BestSellers →
 * FeaturedCollection) → trust (PermanentBenefits) → brand values → discovery
 * (AdvisorBanner) → editorial (SocialFeed, real article tiles) → brand story
 * close (FullBleedBrandStory) → SEO copy. Chosen over the shared Caudalie
 * clone's original section order (Header, HeroBanner, YourSelection,
 * ExperienceCards, DiscoverCults, SkinAnalysisBanner, BrandValues,
 * BeautyFromVine, InstagramFeed, SeoTextBlock, PermanentBenefits) because
 * that order put two deep-teal full-bleed bands back-to-back
 * (SkinAnalysisBanner/AdvisorBanner directly followed by BeautyFromVine/
 * FullBleedBrandStory) with only a thin icon-grid between them — this order
 * alternates light/dark bands so no two full-bleed dark sections are
 * adjacent, and every homepage CTA now points at a distinct destination
 * (previously "Tư vấn chọn mùi" and "/cau-chuyen-thuong-hieu" each had 2-3
 * separate homepage entry points repeating the same pitch).
 *
 * ExperienceCards.tsx is intentionally not rendered here — audited during
 * P2.1: 4 of its 5 tiles (advisor, loyalty, welcome offer, shipping)
 * duplicate messaging already covered by HeroCampaign's second slide,
 * AdvisorBanner, and PermanentBenefits, using placeholder-gradient art with
 * no real photography. Kept unused, same precedent as CategoryShowcase.tsx/
 * ComboOffers.tsx (see HH_LPM_UI_ALIGNMENT_PASS_2_REPORT.md) — no data
 * deleted, just not rendered on this page. BrandStoryTeaser.tsx remains
 * superseded by FullBleedBrandStory.tsx; MembershipSection.tsx's loyalty CTA
 * still lives via the footer/header entry points, not a homepage band.
 */
export default function HHHomePage() {
  return (
    <HHShell>
      <PromoBar />
      <Header />
      <main className="flex flex-1 flex-col">
        <HeroCampaign isPageHeading />
        <BestSellers />
        <FeaturedCollection />
        <PermanentBenefits />
        <BrandValues />
        <AdvisorBanner />
        <SocialFeed />
        <FullBleedBrandStory />
        <SeoTextBlock />
      </main>
      <Footer />
    </HHShell>
  );
}
