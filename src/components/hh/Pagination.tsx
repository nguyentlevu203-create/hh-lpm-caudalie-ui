import Link from "next/link";
import { cn } from "@/lib/utils";

/** Reusable page-number strip — builds hrefs by cloning the current query
 * params and overwriting `page`, so callers stay server components and
 * every filter combination stays deep-linkable. Used by
 * /thu-vien-san-pham-hang and /thu-vien-hinh-anh. */
export function Pagination({
  basePath,
  searchParams,
  page,
  totalPages,
}: {
  basePath: string;
  searchParams: Record<string, string | undefined>;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const hrefFor = (p: number) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParams)) {
      if (value && key !== "page") params.set(key, value);
    }
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const pages: number[] = [];
  for (let p = Math.max(1, page - 2); p <= Math.min(totalPages, page + 2); p++) pages.push(p);

  return (
    <nav aria-label="Phân trang" className="mt-10 flex items-center justify-center gap-2">
      <Link
        href={hrefFor(Math.max(1, page - 1))}
        aria-disabled={page === 1}
        className={cn(
          "rounded-md border border-hh-border px-3 py-2 text-sm text-hh-ink",
          page === 1 && "pointer-events-none opacity-40"
        )}
      >
        Trước
      </Link>
      {pages[0] > 1 && <span className="px-1 text-sm text-hh-muted-foreground">…</span>}
      {pages.map((p) => (
        <Link
          key={p}
          href={hrefFor(p)}
          aria-current={p === page ? "page" : undefined}
          className={cn(
            "rounded-md border px-3 py-2 text-sm",
            p === page ? "border-hh-primary bg-hh-primary-soft text-hh-primary" : "border-hh-border text-hh-ink"
          )}
        >
          {p}
        </Link>
      ))}
      {pages[pages.length - 1] < totalPages && <span className="px-1 text-sm text-hh-muted-foreground">…</span>}
      <Link
        href={hrefFor(Math.min(totalPages, page + 1))}
        aria-disabled={page === totalPages}
        className={cn(
          "rounded-md border border-hh-border px-3 py-2 text-sm text-hh-ink",
          page === totalPages && "pointer-events-none opacity-40"
        )}
      >
        Sau
      </Link>
    </nav>
  );
}
