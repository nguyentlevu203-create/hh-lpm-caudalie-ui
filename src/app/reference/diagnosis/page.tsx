import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { PermanentBenefits } from "@/components/PermanentBenefits";
import { DiagnosisView } from "@/components/reference/diagnosis/DiagnosisView";

export default function DiagnosisReferencePage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">
        <DiagnosisView />
        <PermanentBenefits />
      </main>
      <Footer />
    </>
  );
}
