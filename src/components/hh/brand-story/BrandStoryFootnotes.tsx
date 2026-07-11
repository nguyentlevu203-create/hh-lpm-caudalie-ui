import { BRAND_STORY } from "@/data/site-content";

/** Small-print footnote block — structural clone of /reference/brand-story's
 * `BrandStoryFootnotes` (centered, muted, numbered citation lines). */
export function BrandStoryFootnotes() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 text-center text-xs text-hh-muted-foreground">
      {BRAND_STORY.footnotes.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}
