import { ConcernCard } from "@/components/reference/diagnosis/ConcernCard";
import { DIAGNOSIS_CONCERNS } from "@/components/reference/diagnosis/data";

export function ConcernGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {DIAGNOSIS_CONCERNS.map((concern) => (
        <ConcernCard key={concern.id} concern={concern} />
      ))}
    </div>
  );
}
