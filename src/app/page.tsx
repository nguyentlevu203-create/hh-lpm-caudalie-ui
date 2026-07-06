import { Header } from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import { YourSelection } from "@/components/YourSelection";
import ExperienceCards from "@/components/ExperienceCards";
import DiscoverCults from "@/components/DiscoverCults";
import SkinAnalysisBanner from "@/components/SkinAnalysisBanner";
import BrandValues from "@/components/BrandValues";
import BeautyFromVine from "@/components/BeautyFromVine";
import InstagramFeed from "@/components/InstagramFeed";
import SeoTextBlock from "@/components/SeoTextBlock";
import PermanentBenefits from "@/components/PermanentBenefits";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">
        <HeroBanner />
        <YourSelection />
        <ExperienceCards />
        <DiscoverCults />
        <SkinAnalysisBanner />
        <BrandValues />
        <BeautyFromVine />
        <InstagramFeed />
        <SeoTextBlock />
        <PermanentBenefits />
      </main>
      <Footer />
    </>
  );
}
