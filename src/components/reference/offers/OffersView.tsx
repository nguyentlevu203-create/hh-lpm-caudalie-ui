import { OffersIntro } from "@/components/reference/offers/OffersIntro";
import { OfferGrid } from "@/components/reference/offers/OfferGrid";
import { GiftDiscoveryTiles } from "@/components/reference/offers/GiftDiscoveryTiles";

export function OffersView() {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-10 md:px-8 md:py-16">
      <OffersIntro />
      <OfferGrid />
      <GiftDiscoveryTiles />
    </div>
  );
}
