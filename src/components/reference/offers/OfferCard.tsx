"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Gift } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { OfferCard as OfferCardData } from "@/components/reference/offers/data";

export function OfferCard({ offer }: { offer: OfferCardData }) {
  const [termsOpen, setTermsOpen] = useState(false);
  const {
    heading,
    body,
    code,
    ctaLabel,
    ctaHref,
    image,
    imageAlt,
    hasGiftBadge,
    terms,
  } = offer;

  return (
    <div>
      <div className="flex bg-[#F4F3F1]">
        <div className="relative aspect-square w-1/2 shrink-0 sm:w-2/5">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 768px) 20vw, 40vw"
            className="object-cover"
          />
          {hasGiftBadge && (
            <Gift
              className="absolute right-3 top-3 size-7 text-white"
              strokeWidth={1.5}
            />
          )}
        </div>

        <div className="flex w-1/2 flex-col items-center justify-center gap-3 px-5 py-8 text-center sm:w-3/5 sm:px-8">
          <p className="text-lg font-medium leading-snug">{heading}</p>
          <p className="whitespace-pre-line text-sm leading-relaxed">{body}</p>
          {code && <p className="text-sm">{code}</p>}
          <a
            href={ctaHref}
            className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-base text-primary-foreground transition-opacity hover:opacity-90"
          >
            {ctaLabel}
          </a>
        </div>
      </div>

      {terms && terms.length > 0 && (
        <div className="border-b border-border">
          <button
            type="button"
            onClick={() => setTermsOpen((prev) => !prev)}
            aria-expanded={termsOpen}
            className="flex w-full items-center justify-center gap-2 py-4 text-sm"
          >
            Terms &amp; conditions
            <ChevronDown
              className={cn(
                "size-4 transition-transform",
                termsOpen && "rotate-180"
              )}
            />
          </button>
          {termsOpen && (
            <div className="space-y-3 px-6 pb-6 text-center text-xs text-muted-foreground">
              {terms.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
