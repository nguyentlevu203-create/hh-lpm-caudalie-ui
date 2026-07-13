import { OffersIntro } from "@/components/hh/offers/OffersIntro";
import { OfferGrid } from "@/components/hh/offers/OfferGrid";
import { GiftDiscoveryTiles } from "@/components/hh/offers/GiftDiscoveryTiles";

/** Offers hub — structure cloned 1:1 from /reference/offers's `OffersView`
 * (intro block, 2-col campaign card grid, gift-discovery tile row), reskinned
 * with HH tokens/copy. No product-photo cards since no real HH campaign
 * photography exists yet — `ProductPlaceholderArt` stands in throughout. */
export function OffersView() {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-10 md:px-8 md:py-16">
      <OffersIntro />
      <OfferGrid />
      <GiftDiscoveryTiles />
    </div>
  );
}
