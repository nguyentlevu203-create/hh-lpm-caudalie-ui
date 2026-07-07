import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { PermanentBenefits } from "@/components/PermanentBenefits";
import { BrandStoryView } from "@/components/reference/brand-story/BrandStoryView";

export default function BrandStoryReferencePage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">
        <BrandStoryView />
        <PermanentBenefits />
      </main>
      <Footer />
    </>
  );
}
