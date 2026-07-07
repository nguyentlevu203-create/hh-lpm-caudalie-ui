import { OfferCard } from "@/components/reference/offers/OfferCard";
import { OFFER_CARDS } from "@/components/reference/offers/data";

export function OfferGrid() {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
      {OFFER_CARDS.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}
