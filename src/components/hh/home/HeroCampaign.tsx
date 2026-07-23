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
  priority = true,
}: {
  slide: Slide;
  headingAs?: "h1" | "h2";
  /** P2.8: defaults true (desktop tree — both slides sit side-by-side and
      visible on load, so both are real LCP candidates). The mobile/tablet
      carousel tree passes this explicitly per-slide: only the slide visible
      at mount needs eager loading — inactive carousel slides were
      previously preloaded with the same priority even though hidden
      (`opacity-0`/`pointer-events-none`) until the user manually navigates. */
  priority?: boolean;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <SlideBackground slide={slide} priority={priority} />
      <div className="relative z-10 flex h-full flex-col items-start justify-end gap-3 p-8 text-white sm:p-10 lg:p-12">
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

/** Hero pattern cloned from the shared Caudalie homepage hero
 * (src/components/HeroBanner.tsx): two full-bleed campaign slides shown
 * side-by-side on desktop, and a single-slide carousel with dot indicators
 * on mobile/tablet — rebuilt with HH color gradients (no Caudalie
 * photography) and LPM-Vietnam campaign copy.
 *
 * `isPageHeading` (default `false`) controls whether slide 1's heading
 * renders as the page's `<h1>` — only the homepage should pass `true`.
 * Threading this through an explicit prop (rather than checking the route
 * via `usePathname`) keeps the component safe to reuse elsewhere later
 * without silently producing a duplicate H1 — any future caller that
 * doesn't pass `isPageHeading` gets the safe H2-only default.
 *
 * IMPORTANT: the component renders TWO parallel DOM trees for the same
 * slide data — a desktop tree (`hidden lg:flex`, both slides side by side,
 * visible ≥1024px) and a mobile/tablet tree (`flex lg:hidden`, one slide at
 * a time via opacity + `aria-hidden`, visible <1024px) — CSS `hidden` only
 * toggles visibility, it does NOT remove the element from the DOM. Marking
 * slide 1's heading `<h1>` in BOTH trees would put two real `<h1>` elements
 * in the document at once regardless of which is visible at the current
 * viewport. To keep exactly one `<h1>` in the DOM at all times, only the
 * MOBILE/TABLET tree's slide-1 heading ever becomes `<h1>`; the desktop
 * tree's slide-1 heading always stays `<h2>`, even when `isPageHeading` is
 * true. Chose the mobile/tablet tree as the canonical h1 (over the desktop
 * tree) because it's the one visible across the wider practical viewport
 * range (<1024px covers phones, tablets, and any unmaximized/narrower
 * laptop window — not just phones) and matches Google's mobile-first
 * indexing default plus this project's stated "mobile-first" convention
 * (AGENTS.md). Trade-off this accepts: on desktop viewports (≥1024px) the
 * visually-primary hero heading is marked `<h2>` (visual style unchanged —
 * only the tag differs), while an identical-text `<h1>` sits inert
 * (`display:none`) in the mobile/tablet tree. This was chosen over a
 * client-side matchMedia approach (adds hydration-mismatch risk) and over
 * restructuring the two trees into one shared render (a real layout
 * change, out of scope for the "semantic H1 only" constraint of this
 * pass). */
export function HeroCampaign({ isPageHeading = false }: { isPageHeading?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={cn("flex min-h-[70vh] pb-6", CONTAINER, "pt-6")}>
      <div className="flex w-full flex-col">
        {/* Desktop: both slides side-by-side */}
        <div className="hidden w-full flex-1 gap-4 lg:flex">
          {SLIDES.map((slide) => (
            <div key={slide.id} className="min-h-[70vh] flex-1 overflow-hidden">
              {/* Always h2 here — see the "IMPORTANT" note above the
                  component: the mobile/tablet tree below owns the single
                  real h1 for this slide. */}
              <SlidePanel slide={slide} headingAs="h2" />
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
                <SlidePanel
                  slide={slide}
                  headingAs={isPageHeading && index === 0 ? "h1" : "h2"}
                  priority={index === activeIndex}
                />
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
