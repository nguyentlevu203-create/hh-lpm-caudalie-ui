"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Gift } from "lucide-react";
import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";
import { cn } from "@/lib/utils";
import type { HHOffer } from "@/data/site-content";

/** Campaign card — structure cloned 1:1 from /reference/offers's
 * `OfferCard` (image|text split row, optional "Mã:" line, optional
 * gift-badge overlay, optional "Điều kiện áp dụng" accordion directly
 * beneath the card). Uses `ProductPlaceholderArt` in place of the
 * reference's real campaign photography, since no real HH campaign
 * photography exists yet. */
/** `cta` is a free-text label from data (not a typed variant), so the
 * transactional/editorial split is inferred from the label itself — offers
 * whose CTA reads as a purchase action ("Mua ngay"/"Đặt hàng") get the
 * transactional teal treatment, discovery/signup-framed labels ("Tìm hiểu
 * thêm"/"Đăng ký") get editorial champagne. V4 CTA hierarchy, Phase 5. */
const TRANSACTIONAL_OFFER_CTA_LABELS = new Set(["Mua ngay", "Đặt hàng"]);

export function OfferCard({ offer }: { offer: HHOffer }) {
  const [termsOpen, setTermsOpen] = useState(false);
  const { heading, body, code, cta, colorFrom, colorTo, shape, hasGiftBadge, terms } = offer;
  const isTransactional = TRANSACTIONAL_OFFER_CTA_LABELS.has(cta);

  return (
    <div>
      <div className="flex bg-hh-surface-blue">
        <div className="relative w-1/2 shrink-0 sm:w-2/5">
          <ProductPlaceholderArt
            colorFrom={colorFrom}
            colorTo={colorTo}
            shape={shape}
            className="aspect-square w-full rounded-none"
          />
          {hasGiftBadge && (
            <Gift className="absolute right-3 top-3 size-7 text-white" strokeWidth={1.5} />
          )}
        </div>

        <div className="flex w-1/2 flex-col items-center justify-center gap-3 px-5 py-8 text-center sm:w-3/5 sm:px-8">
          <p className="text-lg font-medium leading-snug text-hh-ink">{heading}</p>
          <p className="whitespace-pre-line text-sm leading-relaxed text-hh-muted-foreground">{body}</p>
          {code && (
            <p className="inline-block rounded bg-hh-surface px-3 py-1 text-sm font-semibold text-hh-primary">
              Mã: {code}
            </p>
          )}
          <Link
            href="/san-pham"
            className={cn("mt-2 h-11 px-5 text-base", isTransactional ? "hh-cta-transactional" : "hh-cta-editorial")}
          >
            {cta}
          </Link>
        </div>
      </div>

      {terms && terms.length > 0 && (
        <div className="border-b border-hh-border">
          <button
            type="button"
            onClick={() => setTermsOpen((prev) => !prev)}
            aria-expanded={termsOpen}
            className="flex w-full items-center justify-center gap-2 py-4 text-sm text-hh-ink"
          >
            Điều kiện áp dụng
            <ChevronDown className={cn("size-4 transition-transform", termsOpen && "rotate-180")} />
          </button>
          {termsOpen && (
            <div className="space-y-3 px-6 pb-6 text-center text-xs text-hh-muted-foreground">
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
