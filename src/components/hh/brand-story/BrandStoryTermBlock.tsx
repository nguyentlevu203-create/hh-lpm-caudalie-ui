import { BRAND_STORY } from "@/data/site-content";

/** One-off full-width editorial callout — structural clone of
 * /reference/brand-story's `KodaliBlock` (large display term + definition
 * text, centered, on a neutral background). Re-skinned with HH's
 * `--hh-cream` (be champagne) token instead of the reference's `#F4F3F1`,
 * and with a "Savon de Marseille" craft-term explanation instead of the
 * Caudalie name etymology. */
export function BrandStoryTermBlock() {
  return (
    <div className="bg-hh-cream px-4 py-14 text-center md:py-20">
      <p className="hh-display text-5xl text-hh-primary md:text-[80px]">{BRAND_STORY.termCallout.term}</p>
      <div className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-hh-muted-foreground">
        {BRAND_STORY.termCallout.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}
