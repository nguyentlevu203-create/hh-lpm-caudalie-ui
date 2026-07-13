import Link from "next/link";
import { BRAND_STORY } from "@/data/site-content";

/** Full-bleed editorial section — structural analog of the shared Caudalie
 * homepage's BeautyFromVine.tsx: full-bleed image with a dark overlay and
 * centered white text + CTA. The "image" is a structured gradient
 * placeholder (no real HH brand-story photography exists yet). Distinct
 * from BrandStoryTeaser.tsx (a 2-col card + milestone chips), which this
 * section replaces on the main homepage flow per the reference's own
 * single full-bleed treatment. */
export function FullBleedBrandStory() {
  return (
    <section className="relative flex min-h-[400px] w-full items-center justify-center overflow-hidden md:min-h-[500px]">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, #204a37, #2f6b4f 55%, #7c6a3f)" }}
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 mx-auto max-w-[600px] px-4 text-center">
        <h2 className="text-4xl font-light text-white">{BRAND_STORY.heading}</h2>
        <p className="mt-4 text-center text-base text-white">{BRAND_STORY.intro}</p>
        <Link
          href="/cau-chuyen-thuong-hieu"
          className="mt-6 inline-block rounded-md bg-white px-6 py-3 text-hh-primary"
        >
          Khám phá câu chuyện
        </Link>
      </div>
    </section>
  );
}
