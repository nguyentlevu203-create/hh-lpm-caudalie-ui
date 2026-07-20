"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SCENT_ADVISOR_BANNER } from "@/data/site-content";
import { HH_INGREDIENTS } from "@/data/ingredients";

const bannerImage = HH_INGREDIENTS.find((i) => i.slug === "lavande")?.image ?? null;

/** Full-bleed callout banner — structural analog of the shared Caudalie
 * homepage's SkinAnalysisBanner.tsx: full-bleed image, bottom-left white
 * copy card, static dot-indicator row below. Repointed at the HH
 * scent-advisor route; uses the real "Oải hương" (lavender) ingredient
 * photo — thematically the closest real asset to a scent-advisor banner —
 * falling back to the gradient placeholder on load error or if missing. */
export function AdvisorBanner() {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = bannerImage && !imageFailed;

  return (
    <section>
      <div className="relative min-h-[500px] w-full overflow-hidden md:min-h-[600px]">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #244a57, #5f8e91 60%, #c99a4a)" }}
        />
        {showImage ? (
          <Image
            src={bannerImage as string}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-85"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <svg
            className="absolute inset-0 h-full w-full opacity-30"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <circle cx="78" cy="24" r="20" fill="#ffffff" fillOpacity="0.25" />
            <circle cx="20" cy="80" r="30" fill="#193a45" fillOpacity="0.35" />
          </svg>
        )}
        <div className="absolute inset-0 bg-hh-primary-dark/10" />

        <div className="absolute bottom-8 left-8 max-w-[400px] bg-hh-surface px-8 py-6">
          <h2 className="hh-heading-section text-hh-ink">{SCENT_ADVISOR_BANNER.heading}</h2>
          <p className="mt-2 text-base text-hh-ink">{SCENT_ADVISOR_BANNER.body}</p>
          <Link
            href={SCENT_ADVISOR_BANNER.cta.href}
            className="hh-cta-editorial mt-4 px-6 py-3 text-sm"
          >
            {SCENT_ADVISOR_BANNER.cta.label}
          </Link>
        </div>
      </div>

      <div className="flex justify-center gap-2 py-4">
        <span className="h-2 w-2 rounded-full bg-hh-primary" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full border border-hh-border bg-transparent" aria-hidden="true" />
      </div>
    </section>
  );
}
