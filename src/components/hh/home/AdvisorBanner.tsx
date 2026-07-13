import Link from "next/link";
import { SCENT_ADVISOR_BANNER } from "@/data/site-content";

/** Full-bleed callout banner — structural analog of the shared Caudalie
 * homepage's SkinAnalysisBanner.tsx: full-bleed image, bottom-left white
 * copy card, static dot-indicator row below. Repointed at the HH
 * scent-advisor route; the "image" is a structured gradient + geometry
 * placeholder (no real HH photography exists yet, no Caudalie asset reused). */
export function AdvisorBanner() {
  return (
    <section>
      <div className="relative min-h-[500px] w-full overflow-hidden md:min-h-[600px]">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #2f6b4f, #5c9b7c 60%, #e08a3e)" }}
        />
        <svg
          className="absolute inset-0 h-full w-full opacity-30"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <circle cx="78" cy="24" r="20" fill="#ffffff" fillOpacity="0.25" />
          <circle cx="20" cy="80" r="30" fill="#204a37" fillOpacity="0.35" />
        </svg>

        <div className="absolute bottom-8 left-8 max-w-[400px] bg-white px-8 py-6">
          <h2 className="text-2xl font-normal text-hh-ink">{SCENT_ADVISOR_BANNER.heading}</h2>
          <p className="mt-2 text-base text-hh-ink">{SCENT_ADVISOR_BANNER.body}</p>
          <Link
            href={SCENT_ADVISOR_BANNER.cta.href}
            className="mt-4 inline-block rounded-md border border-hh-primary/30 bg-white px-4 py-3 text-hh-primary"
          >
            {SCENT_ADVISOR_BANNER.cta.label}
          </Link>
        </div>
      </div>

      <div className="flex justify-center gap-2 py-4">
        <span className="h-2 w-2 rounded-full bg-hh-primary" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full border border-hh-border bg-transparent" aria-hidden="true" />
      </div>
    </section>
  );
}
