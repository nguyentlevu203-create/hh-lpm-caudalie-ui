"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HERO_CAMPAIGN, HERO_SECONDARY_SLIDE } from "@/data/site-content";
import { getBrandPageBySlug, THUONG_HIEU_SLUG } from "@/data/brand-pages";
import { HH_INGREDIENTS } from "@/data/ingredients";
import { cn } from "@/lib/utils";

const CONTAINER = "mx-auto w-full max-w-[1440px] px-4 md:px-8";

interface Slide {
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
  cta: { label: string; href: string };
  colorFrom: string;
  colorTo: string;
  image: string | null;
}

const heroBrandImage = getBrandPageBySlug(THUONG_HIEU_SLUG)?.image ?? null;
const heroIngredientImage = HH_INGREDIENTS.find((i) => i.slug === "fleur-d-oranger")?.image ?? null;

const SLIDES: Slide[] = [
  {
    id: "nhap-khau",
    eyebrow: HERO_CAMPAIGN.eyebrow,
    heading: HERO_CAMPAIGN.heading,
    body: HERO_CAMPAIGN.body,
    cta: HERO_CAMPAIGN.primaryCta,
    colorFrom: "#2f6b4f",
    colorTo: "#204a37",
    image: heroBrandImage,
  },
  {
    id: "tu-van",
    eyebrow: HERO_SECONDARY_SLIDE.eyebrow,
    heading: HERO_SECONDARY_SLIDE.heading,
    body: HERO_SECONDARY_SLIDE.body,
    cta: HERO_SECONDARY_SLIDE.cta,
    colorFrom: "#e08a3e",
    colorTo: "#b8672a",
    image: heroIngredientImage,
  },
];

/** Real photo (thương hiệu / nguyên liệu, from Phase 3's downloaded
 * catalogue) with a gradient + dark-overlay wash for text legibility, and
 * an `onError` fallback to the plain gradient placeholder if the local file
 * ever fails to load — no Caudalie imagery, no unrelated filler photo. */
function SlideBackground({ slide }: { slide: Slide }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = slide.image && !imageFailed;

  return (
    <div
      className="absolute inset-0"
      style={{ background: `linear-gradient(135deg, ${slide.colorFrom}, ${slide.colorTo})` }}
    >
      {showImage && (
        <Image
          src={slide.image as string}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-80"
          onError={() => setImageFailed(true)}
          priority
        />
      )}
      {!showImage && (
        <svg className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <circle cx="82" cy="20" r="26" fill="#ffffff" fillOpacity="0.3" />
          <circle cx="10" cy="90" r="34" fill="#000000" fillOpacity="0.15" />
        </svg>
      )}
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
}

function SlidePanel({ slide }: { slide: Slide }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <SlideBackground slide={slide} />
      <div className="relative z-10 flex h-full flex-col items-start justify-end gap-3 p-8 text-white sm:p-10 lg:p-12">
        <p className="text-sm font-medium uppercase tracking-widest text-white/80">{slide.eyebrow}</p>
        <h2 className="max-w-md text-3xl font-semibold leading-tight sm:text-4xl">{slide.heading}</h2>
        <p className="max-w-sm text-sm text-white/85 sm:text-base">{slide.body}</p>
        <Link
          href={slide.cta.href}
          className="mt-2 rounded-md bg-white px-8 py-3 text-sm font-semibold text-hh-primary transition-colors hover:bg-white/90"
        >
          {slide.cta.label}
        </Link>
      </div>
    </div>
  );
}

/** Hero pattern cloned from the shared Caudalie homepage hero
 * (src/components/HeroBanner.tsx): two full-bleed campaign slides shown
 * side-by-side on desktop, and a single-slide carousel with dot indicators
 * on mobile/tablet — rebuilt with HH color gradients (no Caudalie
 * photography) and LPM-Vietnam campaign copy. */
export function HeroCampaign() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={cn("flex min-h-[70vh] pb-6", CONTAINER, "pt-6")}>
      <div className="flex w-full flex-col">
        {/* Desktop: both slides side-by-side */}
        <div className="hidden w-full flex-1 gap-4 lg:flex">
          {SLIDES.map((slide) => (
            <div key={slide.id} className="min-h-[70vh] flex-1 overflow-hidden">
              <SlidePanel slide={slide} />
            </div>
          ))}
        </div>

        {/* Mobile / tablet: single slide with dot indicators */}
        <div className="flex w-full flex-1 flex-col lg:hidden">
          <div className="relative min-h-[70vh] w-full flex-1 overflow-hidden">
            {SLIDES.map((slide, index) => (
              <div
                key={slide.id}
                className={cn(
                  "absolute inset-0 transition-opacity",
                  index === activeIndex ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
                )}
                aria-hidden={index !== activeIndex}
              >
                <SlidePanel slide={slide} />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 pt-4">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Xem banner ${index + 1}: ${slide.heading}`}
                aria-current={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "h-2.5 w-2.5 rounded-full border border-hh-primary transition-colors",
                  index === activeIndex ? "bg-hh-primary" : "bg-transparent"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
