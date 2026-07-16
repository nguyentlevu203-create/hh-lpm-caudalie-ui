import Link from "next/link";
import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";
import { EXPERIENCE_HIGHLIGHTS } from "@/data/site-content";

/** Highlight rail — structure ported from the shared Caudalie homepage's
 * ExperienceCards.tsx ("The Caudalie Experience"): a horizontally
 * scrollable row of image + title + description + CTA cards. No current HH
 * homepage section mapped to this pattern, so it's ported as its own
 * section, rebuilt with HH highlights (import guarantee, scent advisor,
 * loyalty, welcome offer, nationwide shipping) and placeholder art instead
 * of Caudalie photography. */
export function ExperienceCards() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 py-12 md:px-8 md:py-16">
      <h2 className="hh-heading-section mb-6 text-left text-hh-ink md:mb-8">
        Trải nghiệm mua sắm cùng Hoàng Hà
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {EXPERIENCE_HIGHLIGHTS.map((card) => (
          <div key={card.id} className="flex w-[280px] flex-shrink-0 flex-col md:w-[320px]">
            <ProductPlaceholderArt
              colorFrom={card.colorFrom}
              colorTo={card.colorTo}
              className="aspect-[4/5] w-full"
            />

            <h3 className="mt-4 text-base font-medium text-hh-ink">{card.title}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-hh-muted-foreground">{card.description}</p>

            <Link
              href={card.href}
              className="mt-4 w-fit rounded-md border border-hh-primary/40 px-4 py-3 text-sm font-medium text-hh-primary"
            >
              {card.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
