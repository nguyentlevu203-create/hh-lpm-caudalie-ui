import Link from "next/link";
import { SCENT_ADVISOR_QUESTIONS } from "@/data/site-content";

/** Scent-advisor cards — pattern cloned from /reference/diagnosis's colored
 * concern-card grid ("1 issue, 1 solution"), reworked from skin-concern
 * matching into scent-mood matching, each card linking to a real
 * `?scent=` filter on /san-pham instead of a static "Shop now" link. */
export function ScentAdvisorView() {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-10 md:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-semibold text-hh-ink sm:text-4xl">Tư vấn chọn mùi hương</h1>
        <p className="mt-3 text-sm text-hh-muted-foreground sm:text-base">
          Chọn cảm giác bạn đang tìm kiếm, chúng tôi sẽ gợi ý mùi hương Le Petit Marseillais phù hợp với bạn.
        </p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SCENT_ADVISOR_QUESTIONS.map((question) => (
          <Link
            key={question.id}
            href={`/san-pham?scent=${encodeURIComponent(question.scent)}`}
            className="flex flex-col gap-3 rounded-2xl p-6 text-white transition-transform hover:-translate-y-1"
            style={{ backgroundColor: question.color }}
          >
            <p className="text-xs font-medium uppercase tracking-widest text-white/80">Hương {question.scent}</p>
            <p className="text-lg font-semibold">{question.title}</p>
            <p className="text-sm text-white/85">{question.body}</p>
            <span className="mt-2 text-sm font-medium underline underline-offset-2">Xem sản phẩm</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
