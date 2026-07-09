"use client";

import { useEffect, useState } from "react";
import { PROMO_MESSAGES } from "@/data/site-content";

/** Rotating top promo bar — pattern cloned from the shared Caudalie
 * Header's promo strip, rebuilt with HH copy and its own rotation. */
export function PromoBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % PROMO_MESSAGES.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-9 w-full items-center justify-center bg-hh-primary px-4">
      <p className="truncate text-center text-xs text-white sm:text-sm">{PROMO_MESSAGES[index]}</p>
    </div>
  );
}
