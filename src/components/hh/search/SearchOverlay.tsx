"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useSiteUI } from "@/components/hh/SiteUIContext";
import { ProductCard } from "@/components/hh/product/ProductCard";
import { BrandLibraryCard } from "@/components/hh/brand-library/BrandLibraryCard";
import { ContentCard } from "@/components/hh/content/ContentCard";
import { ProductPlaceholderArt } from "@/components/hh/ProductPlaceholderArt";
import { HH_CATEGORIES, getBestSellers } from "@/data/products";
import { contentPageRoute } from "@/data/content-library";
import { searchSite } from "@/lib/search";
import { cn } from "@/lib/utils";
import { useFocusTrap } from "@/lib/use-focus-trap";

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hh-primary";

/** Full-screen search overlay — internal content structure aligned with
 * /reference/search's SearchResultsView + its 4 sub-components: a
 * result-count summary ("(N kết quả)" / "Không tìm thấy"), a category-pill
 * sidebar block derived from the real matched products, a responsive
 * `lg:grid lg:grid-cols-3` sidebar/grid split (stacked below `lg`), and a
 * real-bestsellers fallback grid (mirroring the reference's "Bestsellers"
 * empty-state rail) instead of a bare "no results" message.
 *
 * Phase 4 Part 7: results now come from `searchSite()`, grouped into up to
 * 7 sections (sản phẩm Hoàng Hà / sản phẩm hãng tham khảo / nguyên liệu /
 * bài viết / nội dung thương hiệu / card-CTA / hình ảnh) so a broad query
 * stays scannable instead of one flat list. Brand-library results always
 * render via BrandLibraryCard — no price, no "Thêm vào giỏ" — since those
 * are referenceOnly, never real HH SKUs. */
export function SearchOverlay() {
  const { active, close } = useSiteUI();
  const isOpen = active === "search";
  const [query, setQuery] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, isOpen);

  const results = useMemo(() => searchSite(query), [query]);
  const bestSellers = useMemo(() => getBestSellers(), []);
  const hasQuery = query.trim() !== "";

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label="Tìm kiếm sản phẩm"
      aria-hidden={!isOpen}
      className={cn(
        "fixed inset-0 z-50 flex flex-col bg-white transition-transform duration-300",
        isOpen ? "translate-y-0" : "pointer-events-none -translate-y-full"
      )}
    >
      <div className="flex items-center gap-3 border-b border-hh-border px-4 py-4">
        <div className="flex flex-1 items-center gap-2 rounded-full bg-hh-muted px-4 py-2.5">
          <Search className="size-4 text-hh-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm sản phẩm, nguyên liệu, bài viết..."
            className={cn(
              "flex-1 bg-transparent text-sm text-hh-ink outline-none placeholder:text-hh-muted-foreground",
              FOCUS_RING
            )}
          />
        </div>
        <button type="button" onClick={close} aria-label="Đóng tìm kiếm" className="text-hh-ink">
          <X className="size-5" />
        </button>
      </div>

      <div className="mx-auto w-full max-w-[1280px] flex-1 overflow-y-auto px-4 py-6 md:px-8">
        {!hasQuery ? (
          <>
            <p className="mb-4 text-base font-medium text-hh-ink">Danh mục gợi ý</p>
            <ul className="flex flex-wrap gap-2">
              {HH_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <button
                    type="button"
                    onClick={() => setQuery(cat.shortName)}
                    className="inline-block rounded border border-hh-border px-3 py-1 text-sm text-hh-ink"
                  >
                    {cat.shortName}
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p className="mb-6 text-center text-base font-medium text-hh-ink lg:text-left">
              {results.totalCount > 0 ? `(${results.totalCount} kết quả)` : `Không tìm thấy kết quả cho “${query}”`}
            </p>

            {results.totalCount > 0 ? (
              <div className="flex flex-col gap-10">
                {results.products.length > 0 && (
                  <section>
                    <p className="mb-4 text-base font-medium text-hh-ink">Sản phẩm Hoàng Hà</p>
                    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
                      {results.products.map((product) => (
                        <li key={product.id}>
                          <ProductCard product={product} />
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {results.brandLibrary.length > 0 && (
                  <section>
                    <p className="mb-4 text-base font-medium text-hh-ink">Sản phẩm hãng (tham khảo)</p>
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
                    <p className="mb-4 text-base font-medium text-hh-ink">Nguyên liệu</p>
                    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
                      {results.ingredients.map((ing) => (
                        <li key={ing.id}>
                          <Link href={`/nguyen-lieu/${ing.slug}`} onClick={close} className="flex flex-col gap-2">
                            <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-hh-cream">
                              {ing.image ? (
                                <Image src={ing.image} alt={ing.name} fill sizes="150px" className="object-cover" />
                              ) : (
                                <ProductPlaceholderArt colorFrom="#7fb79c" colorTo="#2f6b4f" className="h-full w-full" />
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
                    <p className="mb-4 text-base font-medium text-hh-ink">Bài viết</p>
                    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {results.articles.map((article) => (
                        <li key={article.id}>
                          <Link href={`/bai-viet/${article.slug}`} onClick={close} className="flex gap-3">
                            <div className="relative size-16 shrink-0 overflow-hidden rounded-sm bg-hh-cream">
                              {article.image ? (
                                <Image src={article.image} alt={article.title} fill sizes="64px" className="object-cover" />
                              ) : (
                                <ProductPlaceholderArt colorFrom="#e08a3e" colorTo="#204a37" className="size-16" />
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
                    <p className="mb-4 text-base font-medium text-hh-ink">Nội dung thương hiệu</p>
                    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {results.contentPages.map((page) => (
                        <li key={page.id}>
                          <Link href={contentPageRoute(page)} onClick={close} className="flex gap-3">
                            <div className="relative size-16 shrink-0 overflow-hidden rounded-sm bg-hh-cream">
                              {page.image ? (
                                <Image src={page.image} alt={page.pageName} fill sizes="64px" className="object-cover" />
                              ) : (
                                <ProductPlaceholderArt colorFrom="#204a37" colorTo="#123023" className="size-16" />
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
                    <p className="mb-4 text-base font-medium text-hh-ink">Card / CTA</p>
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
                    <p className="mb-4 text-base font-medium text-hh-ink">Hình ảnh</p>
                    <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                      {results.media.map((m) => (
                        <li key={m.id} className="flex flex-col gap-1">
                          <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-hh-muted">
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
            ) : (
              <>
                <p className="mb-4 text-base font-medium text-hh-ink">Sản phẩm bán chạy</p>
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
