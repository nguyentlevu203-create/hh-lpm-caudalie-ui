import Image from "next/image";

export default function SkinAnalysisBanner() {
  return (
    <section>
      <div className="relative min-h-[500px] md:min-h-[600px] w-full">
        <Image
          src="/images/caudalie/skin-analysis-banner.jpg"
          alt="Skin Analysis"
          fill
          className="object-cover"
        />

        <div className="absolute bottom-8 left-8 max-w-[400px] bg-white px-8 py-6">
          <h2 className="text-2xl font-normal text-black">Skin Analysis</h2>
          <p className="mt-2 text-base text-black">
            Get a 30-second skin analysis, comparing your selfie to our skin
            health database of 70,000+ clinically graded images.
          </p>
          <button
            type="button"
            className="mt-4 border border-black/30 rounded-md px-4 py-3 bg-white text-[#2d1946]"
          >
            Scan my skin
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-2 py-4">
        <span className="h-2 w-2 rounded-full bg-[#2d1946]" aria-hidden="true" />
        <span
          className="h-2 w-2 rounded-full border border-gray-300 bg-transparent"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
