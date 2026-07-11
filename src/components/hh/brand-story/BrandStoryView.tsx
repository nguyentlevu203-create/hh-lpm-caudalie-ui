import { BrandStoryHero } from "@/components/hh/brand-story/BrandStoryHero";
import { BrandStoryIntro } from "@/components/hh/brand-story/BrandStoryIntro";
import { BrandStoryTimeline } from "@/components/hh/brand-story/BrandStoryTimeline";
import { BrandStoryFootnotes } from "@/components/hh/brand-story/BrandStoryFootnotes";

/**
 * Brand-story page body — component tree and section order mirror
 * /reference/brand-story's `BrandStoryView` exactly: full-bleed hero →
 * centered heading/intro → alternating-side milestone timeline (using the
 * CURRENT, fixed CSS-grid-stack `TimelineEntry` technique, interleaved with
 * the term-callout and pull-quote editorial blocks) → footnotes. Only the
 * skin (colors, font, copy, milestone content) differs from the reference;
 * the layout/structure is a 1:1 re-skin, not a redesign.
 */
export function BrandStoryView() {
  return (
    <div className="w-full">
      <BrandStoryHero />
      <BrandStoryIntro />
      <BrandStoryTimeline />
      <BrandStoryFootnotes />
    </div>
  );
}
