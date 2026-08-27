"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useSiteUI } from "@/components/hh/SiteUIContext";
import { ProductCard, formatVnd } from "@/components/hh/product/ProductCard";
import { BrandLibraryCard } from "@/components/hh/brand-library/BrandLibraryCard";
import { ContentCard } from "@/components/hh/content/ContentCard";
import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";
import { HH_CATEGORIES, getBestSellers, getEffectivePrice, INQUIRY_PRICE_LABEL, type HHProduct } from "@/data/products";
import { contentPageRoute } from "@/data/content-library";
import { searchSite } from "@/lib/search";
import { cn } from "@/lib/utils";
import { useFocusTrap } from "@/lib/use-focus-trap";

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hh-primary";

/** Lean search-result row for the primary "Sản phẩm Hoàng Hà" group — P1.1
 * closure: deliberately NOT the full ProductCard (no wishlist heart, no
 * badge, no add-to-cart button, no compare-at price). A dense result list
 * needs to be scanned fast, so each row only carries the 4 things that help
 * a searcher decide: ảnh, tên, loại/dung tích, giá (hoặc trạng thái tham
 * khảo giá). Deciding which product to click stays a PDP decision. */
function SearchProductResult({ product, onNavigate }: { product: HHProduct; onNavigate: () => void }) {
  const price = getEffectivePrice(product);
  const categoryName = HH_CATEGORIES.find((c) => c.slug === product.category)?.shortName;

  return (
    <Link href={`/san-pham/${product.slug}`} onClick={onNavigate} className={cn("flex gap-3 py-3", FOCUS_RING)}>
      <div className="relative size-16 shrink-0 overflow-hidden rounded-sm border border-hh-border bg-hh-cream">
        {product.image ? (
          <Image src={product.image} alt={product.name} fill sizes="64px" className="object-contain p-1.5" />
        ) : (
          <ProductPlaceholderArt colorFrom="#d9bd87" colorTo="#f5e7c9" className="size-16" />
        )}
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-0.5">
        <p className="line-clamp-2 text-sm font-medium text-hh-ink">{product.name}</p>
        <p className="text-xs text-hh-muted-foreground">
          {[product.volume, categoryName].filter(Boolean).join(" · ")}
        </p>
        <p className={cn("text-sm font-semibold", price !== null ? "text-hh-ink" : "text-hh-primary")}>
          {price !== null ? formatVnd(price) : INQUIRY_PRICE_LABEL}
        </p>
      </div>
    </Link>
  );
}

/** Full-screen search overlay — internal content structure aligned with
 * /reference/search's SearchResultsView + its 4 sub-components: a
 * result-count summary ("(N kết quả)" / "Không tìm thấy"), a category-pill
 * sidebar block derived from the real matched products, a responsive
 * `lg:grid lg:grid-cols-3` sidebar/grid split (stacked below `lg`), and a
 * real-bestsellers fallback grid (mirroring the reference's "Bestsellers"
 * empty-state rail) instead of a bare "no results" message.
 *
 * Phase 4 Part 7: results come from `searchSite()`, grouped into up to 7
 * sections (sản phẩm Hoàng Hà / sản phẩm hãng tham khảo / nguyên liệu / bài
 * viết / nội dung thương hiệu / card-CTA / hình ảnh) — each already capped
 * server-side (`GROUP_LIMIT`) so a broad query can't flood any single
 * section. Brand-library results always render via BrandLibraryCard — no
 * price, no "Thêm vào giỏ" — since those are referenceOnly, never real HH
 * SKUs.
 *
 * P1.1 closure: the primary product group renders as lean scan rows
 * (`SearchProductResult`) instead of full grid cards, and everything after
 * it collapses behind a native `<details>` disclosure ("Kết quả khác") —
 * open by default only when there are zero product matches, so a query
 * that hits products doesn't also dump 6 more sections on screen at once.
 * No group is removed from search or from the DOM; all 7 stay reachable. */
export function SearchOverlay() {
  const { active, close } = useSiteUI();
  const isOpen = active === "search";
  const [query, setQuery] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, isOpen);

  const results = useMemo(() => searchSite(query), [query]);
  const bestSellers = useMemo(() => getBestSellers(), []);
  const hasQuery = query.trim() !== "";

  const secondaryCount =
    results.brandLibrary.length +
    results.ingredients.length +
    results.articles.length +
    results.contentPages.length +
    results.cards.length +
    results.media.length;
  const hasSecondary = secondaryCount > 0;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label="Tìm kiếm sản phẩm"
      aria-hidden={!isOpen}
      className={cn(
        "fixed inset-0 z-50 flex flex-col bg-hh-surface transition-transform duration-300",
        isOpen ? "translate-y-0" : "pointer-events-none -translate-y-full"
      )}
    >
      <div className="flex items-center gap-3 border-b border-hh-border px-4 py-3">
        <div className="flex flex-1 items-center gap-2 rounded-full bg-hh-surface-soft px-4 py-2.5">
          <Search className="size-4 shrink-0 text-hh-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm sản phẩm, nguyên liệu, bài viết..."
            aria-label="Tìm kiếm sản phẩm, nguyên liệu, bài viết"
            className={cn(
              "flex-1 bg-transparent text-base text-hh-ink outline-none placeholder:text-hh-muted-foreground",
              FOCUS_RING
            )}
          />
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Đóng tìm kiếm"
          className={cn("flex size-8 shrink-0 items-center justify-center text-hh-ink", FOCUS_RING)}
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="mx-auto w-full max-w-[1280px] flex-1 overflow-y-auto px-4 py-6 md:px-8">
        {!hasQuery ? (
          <>
            <h2 className="mb-4 text-base font-medium text-hh-ink">Danh mục gợi ý</h2>
            <ul className="flex flex-wrap gap-2">
              {HH_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <button
                    type="button"
                    onClick={() => setQuery(cat.shortName)}
                    className={cn("inline-block rounded border border-hh-border px-3 py-1 text-sm text-hh-ink", FOCUS_RING)}
                  >
                    {cat.shortName}
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p aria-live="polite" className="mb-6 text-center text-base font-medium text-hh-ink lg:text-left">
              {results.totalCount > 0 ? `(${results.totalCount} kết quả)` : `Không tìm thấy kết quả cho “${query}”`}
            </p>

            {results.totalCount > 0 ? (
              <div className="flex flex-col gap-8">
                {results.products.length > 0 && (
                  <section>
                    <h2 className="mb-1 text-base font-medium text-hh-ink">Sản phẩm Hoàng Hà</h2>
                    <ul className="grid grid-cols-1 divide-y divide-hh-border sm:grid-cols-2 sm:divide-y-0">
                      {results.products.map((product) => (
                        <li key={product.id} className="sm:border-b sm:border-hh-border sm:last:border-0 sm:odd:pr-4">
                          <SearchProductResult product={product} onNavigate={close} />
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {results.products.length === 0 && hasSecondary && (
                  <p className="-mt-4 text-sm text-hh-muted-foreground">
                    Không có sản phẩm Hoàng Hà trùng khớp — xem gợi ý bên dưới.
                  </p>
                )}

                {hasSecondary && (
                  <details key={query} open={results.products.length === 0} className="group">
                    <summary
                      className={cn(
                        "flex w-fit cursor-pointer list-none items-center gap-1.5 text-sm font-medium text-hh-ink",
                        FOCUS_RING
                      )}
                    >
                      Kết quả khác ({secondaryCount})
                      <span className="text-hh-muted-foreground transition-transform group-open:rotate-180">⌄</span>
                    </summary>

                    <div className="mt-6 flex flex-col gap-8">
                      {results.brandLibrary.length > 0 && (
                        <section>
                          <h2 className="mb-4 text-base font-medium text-hh-ink">Sản phẩm hãng (tham khảo)</h2>
                          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
                            {results.brandLibrary.map((product) => (
                              <li key={product.id}>
                                <BrandLibraryCard product={product} />
                              </li>
                            ))}
                          </ul>
                        </section>
                      )}

                      {results.ingredients.length > 0 && (
                        <section>
                          <h2 className="mb-4 text-base font-medium text-hh-ink">Nguyên liệu</h2>
                          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
                            {results.ingredients.map((ing) => (
                              <li key={ing.id}>
                                <Link
                                  href={`/nguyen-lieu/${ing.slug}`}
                                  onClick={close}
                                  className={cn("flex flex-col gap-2", FOCUS_RING)}
                                >
                                  <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-hh-border bg-hh-cream">
                                    {ing.image ? (
                                      <Image src={ing.image} alt={ing.name} fill sizes="150px" className="object-cover" />
                                    ) : (
                                      <ProductPlaceholderArt colorFrom="#d9bd87" colorTo="#f5e7c9" className="h-full w-full" />
                                    )}
                                  </div>
                                  <p className="text-sm text-hh-ink">{ing.name}</p>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </section>
                      )}

                      {results.articles.length > 0 && (
                        <section>
                          <h2 className="mb-4 text-base font-medium text-hh-ink">Bài viết</h2>
                          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {results.articles.map((article) => (
                              <li key={article.id}>
                                <Link href={`/bai-viet/${article.slug}`} onClick={close} className={cn("flex gap-3", FOCUS_RING)}>
                                  <div className="relative size-16 shrink-0 overflow-hidden rounded-sm border border-hh-border bg-hh-cream">
                                    {article.image ? (
                                      <Image src={article.image} alt={article.title} fill sizes="64px" className="object-cover" />
                                    ) : (
                                      <ProductPlaceholderArt colorFrom="#d9bd87" colorTo="#f5e7c9" className="size-16" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="line-clamp-2 text-sm font-medium text-hh-ink">{article.title}</p>
                                    {article.topic && <p className="text-xs text-hh-muted-foreground">{article.topic}</p>}
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </section>
                      )}

                      {results.contentPages.length > 0 && (
                        <section>
                          <h2 className="mb-4 text-base font-medium text-hh-ink">Nội dung thương hiệu</h2>
                          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {results.contentPages.map((page) => (
                              <li key={page.id}>
                                <Link href={contentPageRoute(page)} onClick={close} className={cn("flex gap-3", FOCUS_RING)}>
                                  <div className="relative size-16 shrink-0 overflow-hidden rounded-sm border border-hh-border bg-hh-cream">
                                    {page.image ? (
                                      <Image src={page.image} alt={page.pageName} fill sizes="64px" className="object-cover" />
                                    ) : (
                                      <ProductPlaceholderArt colorFrom="#d9bd87" colorTo="#f5e7c9" className="size-16" />
                                    )}
                                  </div>
                                  <p className="line-clamp-2 text-sm font-medium text-hh-ink">{page.pageName}</p>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </section>
                      )}

                      {results.cards.length > 0 && (
                        <section>
                          <h2 className="mb-4 text-base font-medium text-hh-ink">Card / CTA</h2>
                          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
                            {results.cards.map((card) => (
                              <li key={card.id}>
                                <ContentCard card={card} />
                              </li>
                            ))}
                          </ul>
                        </section>
                      )}

                      {results.media.length > 0 && (
                        <section>
                          <h2 className="mb-4 text-base font-medium text-hh-ink">Hình ảnh</h2>
                          <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                            {results.media.map((m) => (
                              <li key={m.id} className="flex flex-col gap-1">
                                <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-hh-border bg-hh-cream">
                                  {m.localPath ? (
                                    <Image src={m.localPath} alt={m.altTextVi ?? ""} fill sizes="120px" className="object-cover" />
                                  ) : null}
                                </div>
                                <p className="line-clamp-2 text-xs text-hh-muted-foreground">{m.altTextVi}</p>
                              </li>
                            ))}
                          </ul>
                        </section>
                      )}
                    </div>
                  </details>
                )}
              </div>
            ) : (
              <>
                <p className="mb-6 text-sm text-hh-muted-foreground">
                  Thử tên sản phẩm, nguyên liệu hoặc chủ đề bài viết khác — dưới đây là gợi ý sản phẩm bán chạy.
                </p>
                <h2 className="mb-4 text-base font-medium text-hh-ink">Sản phẩm bán chạy</h2>
                <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {bestSellers.map((product) => (
                    <li key={product.id}>
                      <ProductCard product={product} />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
