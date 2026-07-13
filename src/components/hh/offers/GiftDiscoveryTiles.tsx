import Link from "next/link";
import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";
import { HH_GIFT_DISCOVERY_TILES } from "@/data/site-content";

/** "Bạn đang tìm quà tặng?" discovery row — structure cloned 1:1 from
 * /reference/offers's `GiftDiscoveryTiles` (image+caption tile, no card
 * chrome, whole tile is the link, `grid-cols-1 sm:grid-cols-3`). Uses
 * `ProductPlaceholderArt` in place of the reference's real tile photography,
 * since no real HH photography exists yet. */
export function GiftDiscoveryTiles() {
  return (
    <div className="mt-16 md:mt-20">
      <div className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
        <h2 className="text-xl font-normal text-hh-ink md:text-2xl">Bạn đang tìm quà tặng?</h2>
        <p className="mt-3 text-base text-hh-muted-foreground">
          Khám phá các gợi ý quà tặng và ưu đãi độc quyền từ Hoàng Hà!
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {HH_GIFT_DISCOVERY_TILES.map((tile) => (
          <Link key={tile.id} href={tile.href} className="text-center">
            <ProductPlaceholderArt
              colorFrom={tile.colorFrom}
              colorTo={tile.colorTo}
              shape={tile.shape}
              className="aspect-video w-full rounded-none"
            />
            <p className="mt-3 text-base text-hh-ink">{tile.caption}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
