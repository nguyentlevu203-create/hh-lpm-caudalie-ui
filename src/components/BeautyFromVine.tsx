import Image from "next/image";

export function BeautyFromVine() {
  return (
    <section className="relative min-h-[400px] md:min-h-[500px] w-full flex items-center justify-center">
      <Image
        src="/images/caudalie/beauty-from-the-vine.jpg"
        alt="Beauty from the vine"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 max-w-[600px] mx-auto px-4 text-center">
        <h2 className="text-4xl font-light text-white">Beauty from the vine</h2>
        <p className="text-base text-white text-center mt-4">
          It all began in Bordeaux, in the heart of the vines at Château Smith
          Haut Lafitte. Since 1995, Caudalie has concentrated all the
          exceptional powers of the vine and grapes in patented formulas, for
          highly effective, natural and more sustainable skincare products.
        </p>
        <button
          type="button"
          className="bg-white text-[#2d1946] rounded-md px-6 py-3 mt-6"
        >
          Discover our story
        </button>
      </div>
    </section>
  );
}

export default BeautyFromVine;
