"use client";

import { useState } from "react";
import Link from "next/link";
import { HERO_CAMPAIGN, HERO_SECONDARY_SLIDE } from "@/data/site-content";
import { cn } from "@/lib/utils";

const CONTAINER = "mx-auto w-full max-w-[1280px] px-4 md:px-8";

interface Slide {
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
  cta: { label: string; href: string };
  colorFrom: string;
  colorTo: string;
}

const SLIDES: Slide[] = [
  {
    id: "nhap-khau",
    eyebrow: HERO_CAMPAIGN.eyebrow,
    heading: HERO_CAMPAIGN.heading,
    body: HERO_CAMPAIGN.body,
    cta: HERO_CAMPAIGN.primaryCta,
    colorFrom: "#2f6b4f",
    colorTo: "#204a37",
  },
  {
    id: "tu-van",
    eyebrow: HERO_SECONDARY_SLIDE.eyebrow,
    heading: HERO_SECONDARY_SLIDE.heading,
    body: HERO_SECONDARY_SLIDE.body,
    cta: HERO_SECONDARY_SLIDE.cta,
    colorFrom: "#e08a3e",
    colorTo: "#b8672a",
  },
];

function SlidePanel({ slide }: { slide: Slide }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${slide.colorFrom}, ${slide.colorTo})` }}
    >
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
    <section className={cn("flex min-h-[60vh] pb-6", CONTAINER, "pt-6")}>
      <div className="flex w-full flex-col">
        {/* Desktop: both slides side-by-side */}
        <div className="hidden w-full flex-1 gap-4 lg:flex">
          {SLIDES.map((slide) => (
            <div key={slide.id} className="min-h-[60vh] flex-1 overflow-hidden rounded-2xl">
              <SlidePanel slide={slide} />
            </div>
          ))}
        </div>

        {/* Mobile / tablet: single slide with dot indicators */}
        <div className="flex w-full flex-1 flex-col lg:hidden">
          <div className="relative min-h-[60vh] w-full flex-1 overflow-hidden rounded-2xl">
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
