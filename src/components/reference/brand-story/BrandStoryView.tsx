import { BrandStoryHero } from "@/components/reference/brand-story/BrandStoryHero";
import { BrandStoryIntro } from "@/components/reference/brand-story/BrandStoryIntro";
import { BrandStoryTimeline } from "@/components/reference/brand-story/BrandStoryTimeline";
import { BrandStoryFootnotes } from "@/components/reference/brand-story/BrandStoryFootnotes";

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
