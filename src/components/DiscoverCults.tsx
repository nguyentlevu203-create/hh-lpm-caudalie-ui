import Image from "next/image"

const CULT_PRODUCTS = [
  {
    src: "/images/caudalie/cult-product-vinoperfect.png",
    alt: "Vinoperfect",
  },
  {
    src: "/images/caudalie/cult-product-vinopure.jpg",
    alt: "Vinopure",
  },
  {
    src: "/images/caudalie/cult-product-premier-cru.png",
    alt: "Premier Cru",
  },
  {
    src: "/images/caudalie/cult-product-resveratrol-lift.png",
    alt: "Resveratrol Lift",
  },
  {
    src: "/images/caudalie/cult-product-beaute.png",
    alt: "Beaute",
  },
]

export function DiscoverCults() {
  return (
    <section className="flex flex-col md:flex-row">
      <div className="flex w-full flex-col justify-center gap-8 px-6 py-16 md:w-1/2 md:px-16 md:py-24">
        <div className="w-fit border-b border-black pb-2">
          <span className="text-base text-black">Discover our cults</span>
        </div>

        <p className="text-3xl font-normal text-black md:text-4xl">
          Powered by the grape. Patented, highly effective, natural formulas.
        </p>

        <button
          type="button"
          className="w-fit rounded-md border border-black/30 bg-white px-[15px] py-[12px] text-[#2d1946]"
        >
          Shop now
        </button>
      </div>

      <div className="flex w-full gap-4 overflow-x-auto px-6 py-16 md:w-1/2 md:px-16 md:py-24">
        {CULT_PRODUCTS.map((product) => (
          <div
            key={product.src}
            className="relative aspect-[3/4] w-[300px] flex-shrink-0"
          >
            <Image
              src={product.src}
              alt={product.alt}
              fill
              sizes="300px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default DiscoverCults
