import { Truck, Award, Gift, ShieldCheck } from "lucide-react";
import { TRUST_BENEFITS } from "@/data/site-content";

const BENEFIT_ICONS = [Truck, Award, Gift, ShieldCheck];

/** Dark full-bleed benefits band — structural analog of the shared Caudalie
 * homepage's PermanentBenefits.tsx (4-icon grid on a solid brand-color
 * band). Distinct from MembershipSection.tsx (the loyalty-program CTA
 * section, not part of the reference-aligned homepage order). */
export function PermanentBenefits() {
  return (
    <section className="bg-hh-primary px-4 py-16 text-white">
      <h2 className="text-center text-xl font-normal">Quyền lợi mỗi đơn hàng</h2>
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {TRUST_BENEFITS.map((benefit, index) => {
          const Icon = BENEFIT_ICONS[index % BENEFIT_ICONS.length];
          return (
            <div key={benefit.id} className="flex flex-col items-center gap-2 text-center">
              <Icon size={40} className="text-white" strokeWidth={1.5} />
              <p className="font-medium">{benefit.title}</p>
              <p className="text-sm text-white/70">{benefit.subtitle}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
