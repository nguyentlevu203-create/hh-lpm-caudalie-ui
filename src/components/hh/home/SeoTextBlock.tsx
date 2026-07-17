import { SEO_INTRO } from "@/data/site-content";

/** Centered SEO copy block — structural analog of the shared Caudalie
 * homepage's SeoTextBlock.tsx. */
export function SeoTextBlock() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h2 className="hh-heading-card text-hh-ink">{SEO_INTRO.heading}</h2>
      <div className="mx-auto mt-6 max-w-2xl space-y-4 text-left text-sm leading-relaxed text-hh-ink">
        {SEO_INTRO.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <p className="mt-6 text-sm text-hh-muted-foreground">{SEO_INTRO.disclaimer}</p>
    </section>
  );
}
