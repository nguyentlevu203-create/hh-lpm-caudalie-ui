import { ContentCard } from "@/components/hh/content/ContentCard";
import type { HHCard } from "@/data/cards";

export function ContentCardGrid({ cards, heading }: { cards: HHCard[]; heading?: string }) {
  if (cards.length === 0) return null;
  return (
    <section>
      {heading && <h2 className="text-lg font-medium text-hh-ink">{heading}</h2>}
      <ul className={heading ? "mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" : "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"}>
        {cards.map((card) => (
          <li key={card.id}>
            <ContentCard card={card} />
          </li>
        ))}
      </ul>
    </section>
  );
}
