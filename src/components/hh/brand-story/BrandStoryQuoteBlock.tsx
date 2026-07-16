import { BRAND_STORY } from "@/data/site-content";

/** One-off pull-quote callout — structural clone of /reference/brand-story's
 * `QuoteBlock` (italic quote + attribution, centered, on a neutral
 * background). Attributed to Hoàng Hà as the distributor rather than an
 * invented founder identity; intentionally has no signature image since no
 * real signature asset exists and no Caudalie asset may be substituted. */
export function BrandStoryQuoteBlock() {
  return (
    <div className="bg-hh-muted px-4 py-10 text-center md:py-14">
      <p className="hh-quote mx-auto max-w-2xl text-hh-ink">
        &ldquo;{BRAND_STORY.quote.text}&rdquo;
      </p>
      <p className="mt-4 text-sm font-semibold text-hh-ink">{BRAND_STORY.quote.name}</p>
      <p className="mt-1 text-sm italic text-hh-muted-foreground">{BRAND_STORY.quote.role}</p>
    </div>
  );
}
