import { BRAND_STORY } from "@/data/site-content";
import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";
import { cn } from "@/lib/utils";

const MILESTONE_COLORS: [string, string][] = [
  ["#8fa06a", "#c7d3a8"],
  ["#7c6fb0", "#b8aede"],
  ["#2f6b4f", "#a8c7b6"],
];

/** Brand-story timeline — pattern cloned from /reference/brand-story's
 * heading/intro + alternating-side milestone layout, but deliberately
 * built with a normal-flow flex row (image beside text, no absolute
 * overlay) instead of the reference's `absolute bottom-0` card-over-image
 * technique — that technique was the exact root cause of a real text
 * overlap bug fixed on the reference route; this rewrite avoids the whole
 * bug class by construction rather than reproducing it. */
export function BrandStoryView() {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-10 md:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-semibold text-hh-ink sm:text-4xl">{BRAND_STORY.heading}</h1>
        <p className="mt-4 text-sm leading-relaxed text-hh-muted-foreground sm:text-base">{BRAND_STORY.intro}</p>
      </div>

      <div className="mt-12 flex flex-col gap-10">
        {BRAND_STORY.milestones.map((milestone, i) => {
          const [colorFrom, colorTo] = MILESTONE_COLORS[i % MILESTONE_COLORS.length];
          const reverse = i % 2 === 1;
          return (
            <div
              key={milestone.year}
              className={cn(
                "flex flex-col gap-6 sm:flex-row sm:items-center",
                reverse && "sm:flex-row-reverse"
              )}
            >
              <ProductPlaceholderArt
                colorFrom={colorFrom}
                colorTo={colorTo}
                shape="bottle"
                className="aspect-[4/3] w-full sm:w-2/5"
              />
              <div className="sm:w-3/5">
                <p className="text-sm font-semibold uppercase tracking-widest text-hh-primary">
                  {milestone.year}
                </p>
                <p className="mt-2 text-xl font-semibold text-hh-ink">{milestone.heading}</p>
                <p className="mt-3 text-sm leading-relaxed text-hh-muted-foreground">{milestone.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
