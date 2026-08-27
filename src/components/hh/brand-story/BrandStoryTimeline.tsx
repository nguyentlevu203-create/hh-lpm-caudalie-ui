import { TimelineEntry } from "@/components/hh/brand-story/TimelineEntry";
import { BrandStoryTermBlock } from "@/components/hh/brand-story/BrandStoryTermBlock";
import { BrandStoryQuoteBlock } from "@/components/hh/brand-story/BrandStoryQuoteBlock";
import { BRAND_STORY } from "@/data/site-content";

const MILESTONE_COLORS: [string, string][] = [
  ["#8fa06a", "#c7d3a8"],
  ["#7c6fb0", "#b8aede"],
  ["#244a57", "#a8c7b6"],
];

/**
 * Alternating-side milestone timeline interspersed with the two one-off
 * editorial blocks — structural clone of /reference/brand-story's
 * `BrandStoryTimeline` (`TIMELINE_BLOCKS` sequence of entry/kodali/quote
 * blocks in a `flex flex-col gap-6 md:gap-8` stack). Hoàng Hà only has 3
 * written milestones (see `src/data/site-content.ts`), so the same
 * entry → term-callout → entry → quote → entry interleaving pattern is
 * reproduced at that smaller scale rather than padded with invented
 * milestones.
 */
export function BrandStoryTimeline() {
  const [m0, m1, m2] = BRAND_STORY.milestones;
  const [c0, c1, c2] = MILESTONE_COLORS;

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <TimelineEntry milestone={m0} align="left" colorFrom={c0[0]} colorTo={c0[1]} />
      <BrandStoryTermBlock />
      <TimelineEntry milestone={m1} align="right" colorFrom={c1[0]} colorTo={c1[1]} />
      <BrandStoryQuoteBlock />
      <TimelineEntry milestone={m2} align="left" colorFrom={c2[0]} colorTo={c2[1]} />
    </div>
  );
}
