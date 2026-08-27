import { Leaf, ShieldCheck, BadgeCheck, Recycle } from "lucide-react";
import { BRAND_VALUES } from "@/data/site-content";

const VALUE_ICONS = [Leaf, ShieldCheck, BadgeCheck, Recycle];

/** Header + alternating-background tile grid — structural analog of the
 * shared Caudalie homepage's BrandValues.tsx. The reference tiles are a
 * single product photo each; HH has no equivalent brand-value photography,
 * so each tile pairs a plain lucide icon (consistent with the site's
 * PermanentBenefits/TrustBadges icon convention) with the value's title and
 * description instead of an image.
 *
 * P2.1: dropped the "Khám phá" → /cau-chuyen-thuong-hieu link that used to
 * sit in this section's header — FullBleedBrandStory (now the very next
 * section on the homepage) already offers its own CTA to that same route,
 * so this section reads as pure supporting content instead of repeating a
 * CTA the reader is about to see again immediately below. */
export function BrandValues() {
  return (
    <section className="w-full">
      <div className="px-6 py-8 text-center lg:px-12">
        <h2 className="hh-heading-section text-hh-ink">Giá trị thương hiệu</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {BRAND_VALUES.map((value, index) => {
          const Icon = VALUE_ICONS[index % VALUE_ICONS.length];
          return (
            <div
              key={value.id}
              className={`flex min-h-[400px] flex-col items-center justify-center gap-4 p-8 text-center lg:p-12 ${
                index % 2 === 0 ? "bg-hh-surface" : "bg-hh-surface-warm"
              }`}
            >
              <Icon size={48} className="text-hh-primary" strokeWidth={1.5} />
              <h3 className="text-lg font-medium text-hh-ink">{value.title}</h3>
              <p className="text-sm text-hh-muted-foreground">{value.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
