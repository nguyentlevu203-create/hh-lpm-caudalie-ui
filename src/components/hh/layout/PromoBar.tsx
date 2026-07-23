"use client";

import { useEffect, useState } from "react";
import { PROMO_MESSAGES } from "@/data/site-content";

/** Rotating top promo bar — pattern cloned from the shared Caudalie
 * Header's promo strip, rebuilt with HH copy and its own rotation.
 *
 * Hidden below `md` (768px) — Phase 8A P0.2. `DemoBanner` (mounted once in
 * `HHShell`, ~28px tall) plus this bar (`h-10` = 40px) stacked ~68-70px of
 * announcement chrome above the header on mobile — audited A/B against
 * hiding this bar under 768px: the demo disclaimer (`DemoBanner`) is the
 * one banner that's legally/business-required and must never be removed
 * (see that component's own comment); this promo rotator is marketing
 * copy, safe to drop on the narrowest viewports where the 2-banner stack
 * pushed the hero furthest below the fold. Unaffected at tablet/desktop
 * (≥768px) where the 2-banner stack was never flagged as a problem. */
export function PromoBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % PROMO_MESSAGES.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hidden h-10 w-full items-center justify-center bg-hh-primary px-4 md:flex">
      <p className="truncate text-center text-sm text-white md:text-base">{PROMO_MESSAGES[index]}</p>
    </div>
  );
}
