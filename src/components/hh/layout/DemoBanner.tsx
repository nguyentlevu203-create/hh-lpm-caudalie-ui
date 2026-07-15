import { DEMO_DATA_BANNER } from "@/data/products";

/** Persistent, dismiss-proof internal-demo disclaimer — required on every
 * page per the Phase 3 spec so no one mistakes demo price/promo/membership
 * data for Hoàng Hà's real published policy. */
export function DemoBanner() {
  return (
    <div className="bg-hh-ink px-4 py-1.5 text-center text-xs text-white/90">
      {DEMO_DATA_BANNER}
    </div>
  );
}
