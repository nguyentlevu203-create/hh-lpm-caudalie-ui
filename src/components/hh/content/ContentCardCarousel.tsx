import { ContentCard } from "@/components/hh/content/ContentCard";
import type { HHCard } from "@/data/cards";

/** Horizontal-scroll rail for "related content" cards embedded on a
 * specific detail page (ingredient/article/brand-content/brand-library) —
 * only rendered when at least one imported card's targetUrl resolved to
 * that exact page. */
export function ContentCardCarousel({ cards, heading }: { cards: HHCard[]; heading?: string }) {
  if (cards.length === 0) return null;
  return (
    <section className="mt-10">
      {heading && <h2 className="text-lg font-medium text-hh-ink">{heading}</h2>}
      <div className={heading ? "mt-4 flex gap-4 overflow-x-auto pb-2" : "flex gap-4 overflow-x-auto pb-2"}>
        {cards.map((card) => (
          <ContentCard key={card.id} card={card} className="w-[200px]" />
        ))}
      </div>
    </section>
  );
}
