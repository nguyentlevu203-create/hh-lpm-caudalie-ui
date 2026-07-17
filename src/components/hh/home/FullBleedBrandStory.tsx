"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BRAND_STORY } from "@/data/site-content";
import { getBrandPageBySlug, CAM_KET_SLUG } from "@/data/brand-pages";

const storyImage = getBrandPageBySlug(CAM_KET_SLUG)?.image ?? null;

/** Full-bleed editorial section — structural analog of the shared Caudalie
 * homepage's BeautyFromVine.tsx: full-bleed image with a dark overlay and
 * centered white text + CTA. Uses the real "cam kết bảo vệ môi trường"
 * brand-content photo (Phase 3 download), falling back to the gradient
 * placeholder on load error or if missing — no Caudalie imagery reused.
 * Distinct from BrandStoryTeaser.tsx (a 2-col card + milestone chips),
 * which this section replaces on the main homepage flow per the
 * reference's own single full-bleed treatment. */
export function FullBleedBrandStory() {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = storyImage && !imageFailed;

  return (
    <section className="relative flex min-h-[400px] w-full items-center justify-center overflow-hidden md:min-h-[500px]">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, #244a57, #193a45 55%, #5f8e91)" }}
      />
      {showImage && (
        <Image
          src={storyImage as string}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-70"
          onError={() => setImageFailed(true)}
        />
      )}
      <div className="absolute inset-0 bg-hh-primary-dark/40" />
      <div className="relative z-10 mx-auto max-w-[600px] px-4 text-center">
        <h2 className="hh-heading-section text-white">{BRAND_STORY.heading}</h2>
        <p className="mt-4 text-center text-base text-white">{BRAND_STORY.intro}</p>
        <Link
          href="/cau-chuyen-thuong-hieu"
          className="hh-cta-primary mt-6 px-6 py-3"
        >
          Khám phá câu chuyện
        </Link>
      </div>
    </section>
  );
}
