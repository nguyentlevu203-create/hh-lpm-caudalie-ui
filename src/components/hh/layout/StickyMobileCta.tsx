"use client";

import Link from "next/link";
import { useSiteUI } from "@/components/hh/SiteUIContext";
import { STICKY_MOBILE_CTA } from "@/data/site-content";

/** Sticky bottom CTA bar, mobile only — new pattern (not present on the
 * Caudalie reference) added specifically for the "bán hàng nhanh"
 * mobile-first goal: always-visible primary purchase + advisor entry
 * points regardless of scroll position. */
export function StickyMobileCta() {
  const { openCart } = useSiteUI();

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 flex gap-2 border-t border-hh-border bg-white p-3 lg:hidden">
      <Link
        href="/tu-van-chon-san-pham"
        className="flex h-12 flex-1 items-center justify-center rounded-md border-2 border-hh-primary text-sm font-medium text-hh-primary"
      >
        {STICKY_MOBILE_CTA.secondaryLabel}
      </Link>
      <button
        type="button"
        onClick={openCart}
        className="flex h-12 flex-1 items-center justify-center rounded-md bg-hh-primary text-sm font-semibold text-white"
      >
        {STICKY_MOBILE_CTA.label}
      </button>
    </div>
  );
}
