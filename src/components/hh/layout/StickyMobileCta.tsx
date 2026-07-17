"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSiteUI } from "@/components/hh/SiteUIContext";
import { STICKY_MOBILE_CTA } from "@/data/site-content";

/** Sticky bottom CTA bar, mobile only — new pattern (not present on the
 * Caudalie reference) added specifically for the "bán hàng nhanh"
 * mobile-first goal: always-visible primary purchase + advisor entry
 * points regardless of scroll position.
 *
 * Hidden on PDP routes (`/san-pham/[slug]`, not the `/san-pham` list) —
 * V3 "reduce CTA hierarchy noise" pass. `ProductBuyBox` already renders its
 * own primary ("Mua ngay"/"Gửi yêu cầu mua hàng") + secondary ("Thêm vào
 * giỏ") CTA pair for that exact product; stacking this generic bar under it
 * put 3–4 same-weight CTAs on screen at once on mobile PDP (flagged but not
 * fixed in the V2 pre-PR review as proposal A6). */
export function StickyMobileCta() {
  const { openCart } = useSiteUI();
  const pathname = usePathname();
  const isPdp = pathname?.startsWith("/san-pham/") ?? false;

  if (isPdp) return null;

  return (
    <div className="hh-shadow-md fixed inset-x-0 bottom-0 z-20 flex gap-2 border-t border-hh-border bg-hh-surface p-3 lg:hidden">
      <Link
        href="/tu-van-chon-san-pham"
        className="flex h-12 flex-1 items-center justify-center rounded-md border border-hh-primary text-sm font-medium text-hh-primary"
      >
        {STICKY_MOBILE_CTA.secondaryLabel}
      </Link>
      <button type="button" onClick={openCart} className="hh-cta-primary h-12 flex-1 text-sm">
        {STICKY_MOBILE_CTA.label}
      </button>
    </div>
  );
}
