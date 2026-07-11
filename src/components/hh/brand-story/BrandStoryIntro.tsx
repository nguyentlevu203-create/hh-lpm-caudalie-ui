import { BRAND_STORY } from "@/data/site-content";

/** Centered heading + intro paragraph directly below the hero — structural
 * clone of /reference/brand-story's `BrandStoryIntro` (same container
 * width, spacing, and heading/body size scale), re-skinned with HH copy
 * and color tokens. */
export function BrandStoryIntro() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-center md:py-16">
      <h1 className="text-2xl font-semibold text-hh-ink md:text-[38px]">{BRAND_STORY.heading}</h1>
      <p className="mt-4 text-base leading-relaxed text-hh-muted-foreground">{BRAND_STORY.intro}</p>
    </div>
  );
}
