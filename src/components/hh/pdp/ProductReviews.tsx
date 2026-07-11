import { Star } from "lucide-react";
import type { HHProduct } from "@/data/products";

/** Rating distribution shape only — reference hardcodes real per-star
 * percentages scraped from a live product page; HH has no per-star
 * breakdown data yet, so this reuses a generic "mostly 5-star" shape scaled
 * to the product's own rating/review count, same placeholder-data approach
 * the reference itself uses. */
const BREAKDOWN_SHAPE = [0.82, 0.13, 0.03, 0.01, 0.01];

interface SampleReview {
  id: string;
  initial: string;
  name: string;
  rating: number;
  daysAgo: string;
  title: string;
  body: string;
}

// Original placeholder copy written for this pass — not real customer
// submissions (those are user-generated content and out of scope to
// fabricate), same approach the reference's ProductReviews took.
const SAMPLE_REVIEWS: SampleReview[] = [
  {
    id: "review-1",
    initial: "H",
    name: "Hương T.",
    rating: 5,
    daysAgo: "3 ngày trước",
    title: "Mùi hương rất dễ chịu",
    body: "Dùng thử theo lời giới thiệu của bạn, mùi hương nhẹ nhàng và không gây khô da. Sẽ mua lại lần sau.",
  },
  {
    id: "review-2",
    initial: "M",
    name: "Minh Đ.",
    rating: 5,
    daysAgo: "1 tuần trước",
    title: "Đóng gói cẩn thận, giao nhanh",
    body: "Sản phẩm đến tay còn nguyên vẹn, đóng gói kỹ. Chất lượng đúng như mô tả, sẽ ủng hộ shop tiếp.",
  },
  {
    id: "review-3",
    initial: "L",
    name: "Lan A.",
    rating: 4,
    daysAgo: "2 tuần trước",
    title: "Dùng ổn, giá hợp lý",
    body: "Chất lượng tốt so với mức giá. Chỉ mong có thêm dung tích lớn hơn để dùng được lâu.",
  },
];

function Stars({ rating, size = "size-4" }: { rating: number; size?: string }) {
  const filled = Math.round(rating);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={size}
          fill={i < filled ? "var(--hh-accent)" : "#d9d9d9"}
          stroke={i < filled ? "var(--hh-accent)" : "#d9d9d9"}
        />
      ))}
    </div>
  );
}

/** Rating-bar summary + review cards, structure cloned 1:1 from
 * /reference/pdp's ProductReviews (280px summary column + review-card
 * column, "Write a review" box, "See more reviews" button). Anchor id
 * `danh-gia` matches the link already wired from ProductBuyBox's review
 * count. */
export function ProductReviews({ product }: { product: HHProduct }) {
  const breakdown = BREAKDOWN_SHAPE.map((share, i) => ({
    stars: 5 - i,
    percentage: Math.round(share * 100),
  }));

  return (
    <div
      id="danh-gia"
      className="mt-10 grid grid-cols-1 gap-10 border-t border-hh-border py-10 lg:grid-cols-[280px_1fr]"
    >
      <div>
        <p className="text-5xl text-hh-ink">{product.rating}</p>
        <Stars rating={5} size="size-5" />
        <p className="mt-1 text-base text-hh-muted-foreground">({product.reviewCount})</p>

        <div className="mt-6 flex flex-col gap-2">
          {breakdown.map((row) => (
            <div key={row.stars} className="flex items-center gap-2 text-sm text-hh-ink">
              <span className="w-14 shrink-0">{row.stars} sao</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-hh-border">
                <span
                  className="block h-full rounded-full bg-hh-primary"
                  style={{ width: `${row.percentage}%` }}
                />
              </span>
              <span className="w-10 shrink-0 text-right">{row.percentage}%</span>
            </div>
          ))}
        </div>

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
        <h2 className="text-2xl text-hh-ink">Khách hàng nói gì</h2>

        <div className="mt-6 flex flex-col gap-6">
          {SAMPLE_REVIEWS.map((review) => (
            <div key={review.id} className="rounded-md border border-hh-border p-5">
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-hh-muted text-sm font-medium text-hh-ink">
                  {review.initial}
                </span>
                <span className="text-base font-medium text-hh-ink underline">{review.name}</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Stars rating={review.rating} />
                <span className="text-sm text-hh-muted-foreground">{review.daysAgo}</span>
              </div>
              <p className="mt-3 text-lg font-medium text-hh-ink">{review.title}</p>
              <p className="mt-1 text-base text-hh-muted-foreground">{review.body}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="mt-6 rounded-md border border-hh-primary/30 px-6 py-3 text-base text-hh-primary"
        >
          Xem thêm đánh giá
        </button>
      </div>
    </div>
  );
}
