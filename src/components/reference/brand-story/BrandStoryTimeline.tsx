import { TimelineEntry } from "@/components/reference/brand-story/TimelineEntry";
import { KodaliBlock } from "@/components/reference/brand-story/KodaliBlock";
import { QuoteBlock } from "@/components/reference/brand-story/QuoteBlock";
import { TIMELINE_BLOCKS } from "@/components/reference/brand-story/data";

export function BrandStoryTimeline() {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {TIMELINE_BLOCKS.map((block, i) => {
        if (block.type === "kodali") return <KodaliBlock key={`kodali-${i}`} />;
        if (block.type === "quote") return <QuoteBlock key={`quote-${i}`} />;
        return <TimelineEntry key={block.id} entry={block} />;
      })}
    </div>
  );
}
