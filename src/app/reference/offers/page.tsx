import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { PermanentBenefits } from "@/components/PermanentBenefits";
import { OffersView } from "@/components/reference/offers/OffersView";

export default function OffersReferencePage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">
        <OffersView />
        <PermanentBenefits />
      </main>
      <Footer />
    </>
  );
}
