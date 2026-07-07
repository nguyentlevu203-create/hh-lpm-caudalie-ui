import { DiagnosisIntro } from "@/components/reference/diagnosis/DiagnosisIntro";
import { ConcernGrid } from "@/components/reference/diagnosis/ConcernGrid";

export function DiagnosisView() {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-10 md:px-8 md:py-16">
      <DiagnosisIntro />
      <ConcernGrid />
    </div>
  );
}
