import { SEO_INTRO } from "@/data/site-content";

/** Centered SEO copy block — structural analog of the shared Caudalie
 * homepage's SeoTextBlock.tsx. */
export function SeoTextBlock() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h2 className="text-3xl font-normal text-hh-ink md:text-4xl">{SEO_INTRO.heading}</h2>
      <div className="mt-6 space-y-4 text-base text-hh-ink">
        {SEO_INTRO.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <p className="mt-6 text-sm text-hh-muted-foreground">{SEO_INTRO.disclaimer}</p>
    </section>
  );
}
