import Image from "next/image";
import Link from "next/link";
import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";
import { CARD_CATEGORY_LABEL, type HHCard } from "@/data/cards";
import { cn } from "@/lib/utils";

/** Generic card tile for the 159 imported `07_Cards_CTA` records — reused
 * by /thu-vien-noi-dung (full library) and by the related-content
 * carousels embedded on ingredient/article/brand/product-library detail
 * pages. Cards with no resolved `matchedRoute` render as a non-link tile
 * with the required "Chưa phân loại — dữ liệu demo nội bộ" badge instead of
 * a dead/guessed link. */
export function ContentCard({ card, className }: { card: HHCard; className?: string }) {
  const body = (
    <>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-hh-border bg-hh-surface">
        <span className="absolute left-2 top-2 z-10 rounded bg-hh-ink/70 px-[10px] py-1 text-xs font-normal text-white">
          {CARD_CATEGORY_LABEL[card.category]}
        </span>
        {card.image ? (
          <Image src={card.image} alt={card.title} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
        ) : (
          <ProductPlaceholderArt colorFrom="#7c6fb0" colorTo="#b8aede" className="h-full w-full" />
        )}
      </div>
      <p className="mt-2 line-clamp-2 text-sm font-medium text-hh-ink">{card.title}</p>
      {!card.matchedRoute && (
        <p className="mt-1 text-xs text-hh-muted-foreground">Chưa phân loại — dữ liệu demo nội bộ</p>
      )}
    </>
  );

  if (card.matchedRoute) {
    return (
      <Link href={card.matchedRoute} className={cn("flex flex-shrink-0 flex-col", className)}>
        {body}
      </Link>
    );
  }

  return <div className={cn("flex flex-shrink-0 flex-col", className)}>{body}</div>;
}
