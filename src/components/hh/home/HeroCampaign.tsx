"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HERO_CAMPAIGN, HERO_SECONDARY_SLIDE } from "@/data/site-content";
import { getBrandPageBySlug, THUONG_HIEU_SLUG } from "@/data/brand-pages";
import { HH_INGREDIENTS } from "@/data/ingredients";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 6000;

interface Slide {
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
  cta: { label: string; href: string };
  /** Slide 1 "Mua ngay" is a real purchase entry point (transactional);
   * slide 2 "Tư vấn ngay" opens the scent-advisor quiz, a discovery/content
   * flow with no purchase (editorial) — V4 CTA hierarchy, Phase 5. */
  ctaVariant: "transactional" | "editorial";
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
    ctaVariant: "transactional",
    colorFrom: "#1c4548",
    colorTo: "#13363a",
    image: heroBrandImage,
  },
  {
    id: "tu-van",
    eyebrow: HERO_SECONDARY_SLIDE.eyebrow,
    heading: HERO_SECONDARY_SLIDE.heading,
    body: HERO_SECONDARY_SLIDE.body,
    cta: HERO_SECONDARY_SLIDE.cta,
    ctaVariant: "editorial",
    colorFrom: "#9e7c52",
    colorTo: "#7d6140",
    image: heroIngredientImage,
  },
];

/** Real photo (thương hiệu / nguyên liệu, from Phase 3's downloaded
 * catalogue) with a gradient + dark-overlay wash for text legibility, and
 * an `onError` fallback to the plain gradient placeholder if the local file
 * ever fails to load — no Caudalie imagery, no unrelated filler photo. */
function SlideBackground({ slide, priority }: { slide: Slide; priority: boolean }) {
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
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover opacity-80"
          onError={() => setImageFailed(true)}
          priority={priority}
        />
      )}
      {!showImage && (
        <svg className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <circle cx="82" cy="20" r="26" fill="#ffffff" fillOpacity="0.3" />
          <circle cx="10" cy="90" r="34" fill="#000000" fillOpacity="0.15" />
        </svg>
      )}
      <div className="absolute inset-0 bg-hh-primary-dark/20" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-hh-primary-dark/60 to-transparent" />
    </div>
  );
}

function SlidePanel({
  slide,
  headingAs: Heading = "h2",
  priority = false,
  active,
}: {
  slide: Slide;
  headingAs?: "h1" | "h2";
  /** Only the slide visible at mount (index 0) needs eager loading — inactive
   * carousel slides sit behind it at opacity-0 until the user/autoplay
   * advances to them. */
  priority?: boolean;
  active: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 transition-opacity duration-700",
        active ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
      )}
      aria-hidden={!active}
    >
      <SlideBackground slide={slide} priority={priority} />
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col items-start justify-center gap-3 px-6 text-white sm:px-10 lg:px-16">
        <p className="text-sm font-medium uppercase tracking-widest text-white/80">{slide.eyebrow}</p>
        <Heading className="hh-display max-w-md text-balance text-3xl font-medium leading-[1.05] sm:text-4xl lg:text-[2.75rem]">
          {slide.heading}
        </Heading>
        {/* P2.2: widened from max-w-sm — slide 1's longer body copy was
            wrapping to 4 lines at max-w-sm, past the ~2-3 line desktop
            target; max-w-md keeps both slides' copy unchanged but fits
            slide 1 in 3 lines. */}
        <p className="max-w-md text-sm text-white/85 sm:text-base">{slide.body}</p>
        <Link
          href={slide.cta.href}
          className={cn(
            "mt-2 px-8 py-3 text-sm",
            slide.ctaVariant === "transactional" ? "hh-cta-transactional" : "hh-cta-editorial"
          )}
        >
          {slide.cta.label}
        </Link>
      </div>
    </div>
  );
}

/** Single full-bleed hero banner, matching the live Caudalie homepage hero
 * (en.caudalie.com): one edge-to-edge image spanning the full viewport
 * width with no side gutters, text overlay pinned to the left, and a
 * carousel between campaign slides via small dot indicators bottom-right —
 * at every breakpoint, not just mobile. Rebuilt with HH color gradients (no
 * Caudalie photography) and LPM-Vietnam campaign copy.
 *
 * Earlier revision split the two slides side-by-side on desktop
 * (recoverable via git history) — replaced because it didn't match the
 * large single banner the live Caudalie site shows.
 *
 * `isPageHeading` (default `false`) controls whether slide 1's heading
 * renders as the page's `<h1>` — only the homepage should pass `true`.
 * Since there's now a single DOM tree (all slides stacked via
 * absolute/opacity, not two parallel trees), slide 1's heading is the only
 * element that ever needs to become `<h1>` — no duplicate-H1 risk. */
export function HeroCampaign({ isPageHeading = false }: { isPageHeading?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-[440px] w-full overflow-hidden sm:h-[500px] lg:h-[600px]">
      {SLIDES.map((slide, index) => (
        <SlidePanel
          key={slide.id}
          slide={slide}
          headingAs={isPageHeading && index === 0 ? "h1" : "h2"}
          priority={index === 0}
          active={index === activeIndex}
        />
      ))}

      <div className="absolute inset-x-0 bottom-5 z-20 flex items-center justify-center gap-2 sm:justify-end sm:pr-10 lg:pr-16">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Xem banner ${index + 1}: ${slide.heading}`}
            aria-current={index === activeIndex}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "h-2 w-2 rounded-full border border-white/80 transition-colors",
              index === activeIndex ? "bg-white" : "bg-white/30"
            )}
          />
        ))}
      </div>
    </section>
  );
}
