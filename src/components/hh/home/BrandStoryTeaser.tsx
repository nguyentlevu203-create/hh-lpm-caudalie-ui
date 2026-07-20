import Link from "next/link";
import { BRAND_STORY } from "@/data/site-content";

/** Homepage teaser for the full brand-story page — pattern cloned from
 * /reference/brand-story's editorial-block shape, condensed to a single
 * teaser card + milestone chips for the homepage. */
export function BrandStoryTeaser() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 py-12 md:px-8">
      <div className="grid gap-6 rounded-xl bg-hh-surface-blue p-6 sm:grid-cols-2 sm:p-10">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-hh-primary">Câu chuyện thương hiệu</p>
          <h2 className="mt-2 text-2xl font-semibold text-hh-ink sm:text-3xl">{BRAND_STORY.heading}</h2>
          <p className="mt-3 text-sm text-hh-muted-foreground sm:text-base">{BRAND_STORY.intro}</p>
          <Link
            href="/cau-chuyen-thuong-hieu"
            className="hh-cta-editorial mt-6 h-11 px-6 text-sm"
          >
            Khám phá câu chuyện
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3 self-center">
          {BRAND_STORY.milestones.map((milestone) => (
            <div key={milestone.year} className="hh-shadow-sm rounded-xl bg-hh-surface p-3 text-center">
              <p className="text-xs font-semibold text-hh-primary">{milestone.year}</p>
              <p className="mt-1 text-xs text-hh-ink">{milestone.heading}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
