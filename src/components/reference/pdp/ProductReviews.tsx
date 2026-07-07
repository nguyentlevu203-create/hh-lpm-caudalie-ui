import { StarIcon } from "@/components/icons";

interface RatingBreakdown {
  stars: number;
  percentage: number;
}

const RATING_BREAKDOWN: RatingBreakdown[] = [
  { stars: 5, percentage: 84 },
  { stars: 4, percentage: 13 },
  { stars: 3, percentage: 2 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 1 },
];

interface SampleReview {
  id: string;
  initial: string;
  name: string;
  rating: number;
  daysAgo: string;
  title: string;
  body: string;
}

// Original placeholder copy written for this UI reference — not sourced from real
// customer submissions (those are user-generated content and out of scope to copy).
const SAMPLE_REVIEWS: SampleReview[] = [
  {
    id: "review-1",
    initial: "M",
    name: "Marine L.",
    rating: 5,
    daysAgo: "3 days ago",
    title: "Noticeable difference within weeks",
    body: "My dark spots look much less pronounced after about a month of daily use. Layers nicely under my moisturiser and doesn't feel sticky.",
  },
  {
    id: "review-2",
    initial: "J",
    name: "Julia P.",
    rating: 5,
    daysAgo: "1 week ago",
    title: "Gentle but effective",
    body: "I have sensitive skin and was worried about irritation, but this has been comfortable from day one. Texture feels lighter and more even.",
  },
  {
    id: "review-3",
    initial: "T",
    name: "Tom R.",
    rating: 4,
    daysAgo: "2 weeks ago",
    title: "Good value in the 30ml size",
    body: "Took a few weeks to see results but it's been worth it. Only wish the dropper released a little less product per pump.",
  },
];

function Stars({ rating, size = "size-4" }: { rating: number; size?: string }) {
  const filled = Math.round(rating);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className={size} fill={i < filled ? "#2d1946" : "#d9d9d9"} />
      ))}
    </div>
  );
}

export function ProductReviews() {
  return (
    <div id="reviews" className="grid grid-cols-1 gap-10 border-t border-border py-10 lg:grid-cols-[280px_1fr]">
      <div>
        <p className="text-5xl text-primary">4.8</p>
        <Stars rating={5} size="size-5" />
        <p className="mt-1 text-base text-muted-foreground">(5,257)</p>

        <div className="mt-6 flex flex-col gap-2">
          {RATING_BREAKDOWN.map((row) => (
            <div key={row.stars} className="flex items-center gap-2 text-sm text-primary">
              <span className="w-12 shrink-0">{row.stars} stars</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                <span
                  className="block h-full rounded-full bg-primary"
                  style={{ width: `${row.percentage}%` }}
                />
              </span>
              <span className="w-10 shrink-0 text-right">{row.percentage}%</span>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-md bg-secondary p-6 text-center">
          <p className="text-lg text-primary">Write a review</p>
          <div className="mt-3 flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className="size-6" fill="#d9d9d9" />
            ))}
          </div>
          <p className="mt-3 text-sm text-primary">
            1 review = <span className="rounded-full bg-accent/60 px-2 py-0.5">+5 loyalty points</span>
          </p>
          <button
            type="button"
            className="mt-4 w-full rounded-md bg-primary px-6 py-3 text-base text-primary-foreground"
          >
            Leave a review
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl text-primary">What our customers say</h2>

        <div className="mt-6 flex flex-col gap-6">
          {SAMPLE_REVIEWS.map((review) => (
            <div key={review.id} className="rounded-md border border-border p-5">
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-secondary text-sm font-medium text-primary">
                  {review.initial}
                </span>
                <span className="text-base font-medium text-primary underline">{review.name}</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Stars rating={review.rating} />
                <span className="text-sm text-muted-foreground">{review.daysAgo}</span>
              </div>
              <p className="mt-3 text-lg font-medium text-primary">{review.title}</p>
              <p className="mt-1 text-base text-muted-foreground">{review.body}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="mt-6 rounded-md border border-primary/30 px-6 py-3 text-base text-primary"
        >
          See more reviews
        </button>
      </div>
    </div>
  );
}
