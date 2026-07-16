import { Star } from "lucide-react";

/**
 * No real customer review data exists yet for any product — `rating`/
 * `reviewCount` in the catalog are demo placeholders, not genuine
 * submissions, so they must never be presented as real customer feedback
 * (CEO-review-polish requirement). This always renders the empty state
 * below instead of reading any product rating/review field. Layout (280px
 * summary column + review-card column, "Viết đánh giá" box, anchor id
 * `danh-gia` matched by ProductBuyBox's link) is kept as-is so wiring in
 * real reviews later is a matter of swapping the empty-state block for a
 * `.map()` over real data, not restructuring the section.
 */
export function ProductReviews() {
  return (
    <div
      id="danh-gia"
      className="mt-10 grid grid-cols-1 gap-10 border-t border-hh-border py-10 lg:grid-cols-[280px_1fr]"
    >
      <div>
        <p className="text-base text-hh-muted-foreground">Chưa có đánh giá nào cho sản phẩm này.</p>

        <div className="mt-6 rounded-md bg-hh-muted p-6 text-center">
          <p className="text-lg text-hh-ink">Viết đánh giá</p>
          <div className="mt-3 flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-6" fill="#d9d9d9" stroke="#d9d9d9" />
            ))}
          </div>
          <p className="mt-3 text-sm text-hh-ink">
            1 đánh giá = <span className="rounded-full bg-hh-accent/20 px-2 py-0.5">+5 điểm thành viên</span>
          </p>
          <button
            type="button"
            className="mt-4 w-full rounded-md bg-hh-primary px-6 py-3 text-base text-white"
          >
            Gửi đánh giá
          </button>
        </div>
      </div>

      <div>
        <h2 className="hh-heading-card text-hh-ink">Khách hàng nói gì</h2>
        <p className="mt-6 text-base text-hh-muted-foreground">
          Chưa có đánh giá nào từ khách hàng. Hãy là người đầu tiên chia sẻ trải nghiệm của bạn.
        </p>
      </div>
    </div>
  );
}
