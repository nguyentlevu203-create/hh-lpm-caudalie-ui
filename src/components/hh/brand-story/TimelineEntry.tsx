import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";
import { cn } from "@/lib/utils";
import type { BrandStoryMilestone } from "@/data/site-content";

interface TimelineEntryProps {
  milestone: BrandStoryMilestone;
  align: "left" | "right";
  colorFrom: string;
  colorTo: string;
}

/**
 * Full-bleed "photo" + translucent text card, structurally identical to the
 * CURRENT (fixed, 2026-07-09) `/reference/brand-story` `TimelineEntry`: an
 * invisible aspect-ratio spacer, a fill "image", and the normal-flow card
 * all share a single CSS Grid cell (`col-start-1 row-start-1`), so the row
 * auto-sizes to `max(photo height, card content height)` and the card can
 * never overflow past its own box — the exact fix for the old
 * `absolute bottom-0` overlap bug. Do not revert to that technique.
 *
 * The reference uses a real downloaded photo here; no equivalent Hoàng Hà /
 * Le Petit Marseillais photography exists yet, so `ProductPlaceholderArt`
 * (gradient + plain geometry) fills the same grid cell in its place.
 */
export function TimelineEntry({ milestone, align, colorFrom, colorTo }: TimelineEntryProps) {
  const { year, heading, body, cta } = milestone;

  return (
    <div className="relative grid w-full grid-cols-1">
      {/* Invisible spacer: reserves the placeholder photo's aspect-ratio
          height as a minimum, so the row still grows taller when the
          card's real content needs more room than the photo alone would
          give it. */}
      <div aria-hidden="true" className="invisible col-start-1 row-start-1 aspect-[2578/1200] w-full" />
      <ProductPlaceholderArt
        colorFrom={colorFrom}
        colorTo={colorTo}
        shape="bottle"
        className="col-start-1 row-start-1 h-full w-full rounded-none"
      />

      <div
        className={cn(
          "relative col-start-1 row-start-1 flex w-[85%] flex-col gap-3 self-end bg-hh-surface/85 p-6 sm:w-[45%] sm:p-8",
          align === "left" ? "justify-self-start" : "justify-self-end"
        )}
      >
        <p className="hh-label text-hh-muted-foreground">{year}</p>
        <p className="hh-heading-card text-hh-ink">{heading}</p>
        <p className="text-sm leading-relaxed text-hh-muted-foreground">{body}</p>
        {cta && (
          <a
            href={cta.href}
            className="mt-2 inline-flex h-11 w-fit items-center justify-center rounded-md border-2 border-hh-primary px-5 text-base text-hh-primary transition-colors hover:bg-hh-primary hover:text-white"
          >
            {cta.label}
          </a>
        )}
      </div>
    </div>
  );
}
