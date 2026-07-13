import { OfferCard } from "@/components/hh/offers/OfferCard";
import { OFFERS } from "@/data/site-content";

/** 2-column campaign card grid — structure cloned 1:1 from
 * /reference/offers's `OfferGrid` (single column on mobile/tablet, two
 * columns from `md:` up). */
export function OfferGrid() {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
      {OFFERS.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}
