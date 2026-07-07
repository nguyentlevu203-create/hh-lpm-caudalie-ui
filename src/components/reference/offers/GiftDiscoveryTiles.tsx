import Image from "next/image";
import Link from "next/link";
import { GIFT_DISCOVERY_TILES } from "@/components/reference/offers/data";

export function GiftDiscoveryTiles() {
  return (
    <div className="mt-16 md:mt-20">
      <div className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
        <h2 className="text-xl font-normal md:text-2xl">
          Looking for the perfect gift?
        </h2>
        <p className="mt-3 text-base">
          Discover our selection of gift ideas and exclusive offers!
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {GIFT_DISCOVERY_TILES.map((tile) => (
          <Link key={tile.id} href={tile.href} className="text-center">
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={tile.image}
                alt={tile.imageAlt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-base">{tile.caption}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
