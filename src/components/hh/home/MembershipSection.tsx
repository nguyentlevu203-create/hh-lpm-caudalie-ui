"use client";

import { useSiteUI } from "@/components/hh/SiteUIContext";
import { MEMBERSHIP } from "@/data/site-content";

/** Loyalty/membership band — pattern cloned from /reference/offers'
 * "Looking for the perfect gift?" style perk callout and the shared
 * "Your permanent benefits" band, rebuilt with an original HH loyalty
 * program name ("Câu Lạc Bộ Hoàng Hà", not MYCAUDALIE). CTA opens the
 * AuthOverlay's register view rather than navigating to a page, since
 * auth here is an overlay, not a dedicated route. */
export function MembershipSection() {
  const { openAuth } = useSiteUI();

  return (
    <section id="hoi-vien" className="mx-auto w-full max-w-[1280px] px-4 py-12 md:px-8">
      <div className="rounded-2xl bg-hh-primary px-6 py-10 text-white sm:px-12">
        <h2 className="text-2xl font-semibold sm:text-3xl">{MEMBERSHIP.heading}</h2>
        <p className="mt-3 max-w-xl text-sm text-white/85 sm:text-base">{MEMBERSHIP.body}</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {MEMBERSHIP.perks.map((perk) => (
            <div key={perk.title}>
              <p className="text-sm font-semibold">{perk.title}</p>
              <p className="mt-1 text-sm text-white/80">{perk.detail}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={openAuth}
          className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-semibold text-hh-primary"
        >
          {MEMBERSHIP.cta.label}
        </button>
      </div>
    </section>
  );
}
