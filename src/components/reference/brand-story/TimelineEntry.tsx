import Image from "next/image";
import { cn } from "@/lib/utils";
import type { TimelineEntryData } from "@/components/reference/brand-story/data";

export function TimelineEntry({ entry }: { entry: TimelineEntryData }) {
  const { year, heading, body, image, imageAlt, align, ctaLabel, ctaHref } =
    entry;

  return (
    <div className="relative grid w-full grid-cols-1">
      {/* Invisible spacer: reserves the full-bleed photo's aspect-ratio height
          as a minimum, so the grid row still grows taller when the card's
          real content (long body copy at narrow widths) needs more room than
          the photo alone would give it — preventing the card from
          overflowing into the previous section. */}
      <div
        aria-hidden="true"
        className="invisible col-start-1 row-start-1 aspect-[2578/1200] w-full"
      />
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="100vw"
        className="col-start-1 row-start-1 object-cover"
      />

      <div
        className={cn(
          "relative col-start-1 row-start-1 flex w-[85%] flex-col gap-3 self-end bg-white/70 p-6 sm:w-[45%] sm:p-8",
          align === "left" ? "justify-self-start" : "justify-self-end"
        )}
      >
        <p className="text-2xl font-medium md:text-[38px]">{year}</p>
        <p className="text-xl md:text-[28px]">{heading}</p>
        <p className="text-sm leading-relaxed">{body}</p>
        {ctaLabel && (
          <a
            href={ctaHref}
            className="mt-2 inline-flex h-11 w-fit items-center justify-center rounded-md border-2 border-primary px-5 text-base text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            {ctaLabel}
          </a>
        )}
      </div>
    </div>
  );
}
