"use client";

import { useRouter, useSearchParams } from "next/navigation";

const SORT_OPTIONS = [
  { value: "", label: "Mặc định" },
  { value: "price-asc", label: "Giá: Thấp đến cao" },
  { value: "price-desc", label: "Giá: Cao đến thấp" },
  { value: "bestseller", label: "Bán chạy trước" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

/** Sort control — P1.2. A native `<select>` (built-in keyboard support,
 * no custom listbox to re-implement) that appends/removes `?sort=` on top
 * of whatever `category`/`scent`/`line`/`volume` params are already in the
 * URL — existing filter query-param logic in `san-pham/page.tsx` and
 * `ProductFilterDrawer` is untouched, this only ever adds one more param
 * alongside it. */
export function ProductSort({ value }: { value: string | undefined }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (event.target.value) {
      params.set("sort", event.target.value);
    } else {
      params.delete("sort");
    }
    const qs = params.toString();
    router.push(qs ? `/san-pham?${qs}` : "/san-pham");
  }

  return (
    <label className="flex items-center gap-2 text-sm text-hh-ink">
      <span className="hidden sm:inline text-hh-muted-foreground">Sắp xếp</span>
      <select
        value={value ?? ""}
        onChange={handleChange}
        aria-label="Sắp xếp sản phẩm"
        className="rounded-full border border-hh-border bg-hh-surface px-4 py-2.5 text-sm text-hh-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hh-primary"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
