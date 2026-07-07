import Image from "next/image";
import { cn } from "@/lib/utils";
import type { TimelineEntryData } from "@/components/reference/brand-story/data";

export function TimelineEntry({ entry }: { entry: TimelineEntryData }) {
  const { year, heading, body, image, imageAlt, align, ctaLabel, ctaHref } =
    entry;

  return (
    <div className="relative aspect-[2578/1200] w-full">
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="100vw"
        className="object-cover"
      />

      <div
        className={cn(
          "absolute bottom-0 flex w-[85%] flex-col gap-3 bg-white/70 p-6 sm:w-[45%] sm:p-8",
          align === "left" ? "left-0" : "right-0"
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
