import Link from "next/link";
import { HERO_CAMPAIGN } from "@/data/site-content";

/** Hero pattern cloned from the shared Caudalie homepage hero (full-bleed
 * campaign band, eyebrow + heading + body + dual CTA) rebuilt with an HH
 * color gradient (no Caudalie photography) and LPM-Vietnam campaign copy. */
export function HeroCampaign() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-hh-primary to-hh-primary-dark px-4 py-16 text-center text-white sm:py-24">
      <p className="text-xs font-medium uppercase tracking-widest text-white/80">{HERO_CAMPAIGN.eyebrow}</p>
      <h1 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
        {HERO_CAMPAIGN.heading}
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-sm text-white/85 sm:text-base">{HERO_CAMPAIGN.body}</p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href={HERO_CAMPAIGN.primaryCta.href}
          className="flex h-12 w-full items-center justify-center rounded-md bg-white px-8 text-sm font-semibold text-hh-primary sm:w-auto"
        >
          {HERO_CAMPAIGN.primaryCta.label}
        </Link>
        <Link
          href={HERO_CAMPAIGN.secondaryCta.href}
          className="flex h-12 w-full items-center justify-center rounded-md border-2 border-white px-8 text-sm font-medium text-white sm:w-auto"
        >
          {HERO_CAMPAIGN.secondaryCta.label}
        </Link>
      </div>
    </section>
  );
}
