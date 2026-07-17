import Link from "next/link";
import { Leaf, ShieldCheck, BadgeCheck, Recycle } from "lucide-react";
import { BRAND_VALUES } from "@/data/site-content";

const VALUE_ICONS = [Leaf, ShieldCheck, BadgeCheck, Recycle];

/** Header + alternating-background tile grid — structural analog of the
 * shared Caudalie homepage's BrandValues.tsx. The reference tiles are a
 * single product photo each; HH has no equivalent brand-value photography,
 * so each tile pairs a plain lucide icon (consistent with the site's
 * PermanentBenefits/TrustBadges icon convention) with the value's title and
 * description instead of an image. */
export function BrandValues() {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between px-6 py-8 lg:px-12">
        <h2 className="hh-heading-section text-hh-ink">Giá trị thương hiệu</h2>
        <Link
          href="/cau-chuyen-thuong-hieu"
          className="rounded-md border border-hh-border bg-hh-surface px-6 py-3 text-hh-primary"
        >
          Khám phá
        </Link>
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
