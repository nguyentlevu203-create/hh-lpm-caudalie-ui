import Image from "next/image";

interface BrandValueTile {
  src: string;
  alt: string;
}

const BRAND_VALUE_TILES: BrandValueTile[] = [
  {
    src: "/images/caudalie/brand-value-natural-origin.jpg",
    alt: "Natural origin ingredients",
  },
  {
    src: "/images/caudalie/brand-value-zero-percent.jpg",
    alt: "0% controversial ingredients",
  },
  {
    src: "/images/caudalie/brand-value-1-percent-planet.jpg",
    alt: "1% for the Planet member",
  },
  {
    src: "/images/caudalie/brand-value-ocean-plastic.jpg",
    alt: "Ocean plastic recycled packaging",
  },
];

export default function BrandValues() {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between px-6 py-8 lg:px-12">
        <h2 className="text-2xl font-normal text-black">Brand values</h2>
        <button
          type="button"
          className="rounded-md border border-black/30 bg-white px-6 py-3 text-[#2d1946]"
        >
          Discover
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {BRAND_VALUE_TILES.map((tile, index) => (
          <div
            key={tile.src}
            className={`flex min-h-[400px] items-center justify-center p-8 lg:p-12 ${
              index % 2 === 0 ? "bg-white" : "bg-secondary"
            }`}
          >
            <Image
              src={tile.src}
              alt={tile.alt}
              width={623}
              height={623}
              className="h-auto w-full max-w-[320px] object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export { BrandValues };
