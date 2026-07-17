import Link from "next/link";
import { Moon, Sun, Flame, Heart, Leaf, Droplet, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SCENT_ADVISOR_QUESTIONS } from "@/data/site-content";

/** One icon per card id — the primary way cards are told apart now that
 * background color is limited to 3 shared surface tokens (see A5 micro
 * polish). Keyed by id rather than array index so the mapping stays
 * correct if question order ever changes. */
const SCENT_ICONS: Record<string, LucideIcon> = {
  relax: Moon,
  fresh: Sun,
  warm: Flame,
  sweet: Heart,
  classic: Leaf,
  gentle: Droplet,
};

/** Scent-advisor cards — pattern cloned from /reference/diagnosis's colored
 * concern-card grid ("1 issue, 1 solution"), reworked from skin-concern
 * matching into scent-mood matching, each card linking to a real
 * `?scent=` filter on /san-pham instead of a static "Shop now" link. */
export function ScentAdvisorView() {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-10 md:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="hh-heading-page text-hh-ink">Tư vấn chọn mùi hương</h1>
        <p className="mt-3 text-sm text-hh-muted-foreground sm:text-base">
          Chọn cảm giác bạn đang tìm kiếm, chúng tôi sẽ gợi ý mùi hương Le Petit Marseillais phù hợp với bạn.
        </p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SCENT_ADVISOR_QUESTIONS.map((question) => {
          const Icon = SCENT_ICONS[question.id] ?? Leaf;
          return (
            <Link
              key={question.id}
              href={`/san-pham?scent=${encodeURIComponent(question.scent)}`}
              className={cn(
                "flex flex-col gap-3 rounded-2xl border border-hh-border p-6 text-hh-ink transition-all hover:-translate-y-1 hover:border-hh-primary/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hh-primary focus-visible:ring-offset-2 focus-visible:ring-offset-hh-canvas",
                question.cardBg
              )}
            >
              <Icon size={28} className="text-hh-primary" strokeWidth={1.5} aria-hidden="true" />
              <p className="text-xs font-medium uppercase tracking-widest text-hh-muted-foreground">
                Hương {question.scent}
              </p>
              <p className="text-lg font-semibold">{question.title}</p>
              <p className="text-sm text-hh-ink/80">{question.body}</p>
              <span className="mt-2 text-sm font-medium underline underline-offset-2">Xem sản phẩm</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
