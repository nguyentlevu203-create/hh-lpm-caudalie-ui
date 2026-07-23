import Link from "next/link";
import Image from "next/image";
import { HH_CATEGORIES } from "@/data/products";
import { BRAND_LIBRARY_LINK, NGUYEN_LIEU_LINK, BAI_VIET_LINK } from "@/data/site-content";
import { getIngredientBySlug } from "@/data/ingredients";
import { cn } from "@/lib/utils";

const CONTAINER = "mx-auto w-full max-w-[1400px] px-5 md:px-8 lg:px-10";

const GROUP_HEADING = "text-[11px] font-semibold uppercase tracking-[0.12em] text-hh-muted-foreground";
const LINK_ITEM = "block py-1.5 text-[14px] text-hh-ink transition-colors duration-150 hover:text-hh-primary-dark";

/** Real ingredient page reused as the editorial feature tile — never a
 * fabricated image, always the same canonical route/photo already used at
 * `/nguyen-lieu/fleur-d-oranger` (see content-duplicates-derived.json:
 * "fleur-d-oranger" IS the canonical slug, not a secondary duplicate). */
const FEATURE_INGREDIENT_SLUG = "fleur-d-oranger";

/** Desktop mega menu dropdown under the "Sản phẩm" nav item — Header
 * Maison Luxury V5 (Phase 6): editorial 4-column panel replacing the old
 * flat grid-of-tiles layout. Column 1/2 split the 7 HH_CATEGORIES two
 * ways so neither column runs long; column 3 surfaces the
 * advisory/ingredient content that lives outside the product catalogue;
 * column 4 is a single real photo + real route, never a placeholder. */
export function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  const [firstHalf, secondHalf] = [HH_CATEGORIES.slice(0, 4), HH_CATEGORIES.slice(4)];
  const feature = getIngredientBySlug(FEATURE_INGREDIENT_SLUG);

  return (
    <div className={cn(CONTAINER, "grid grid-cols-4 gap-10 py-9")}>
      <div>
        <p className={GROUP_HEADING}>Danh mục</p>
        <ul className="mt-3">
          {firstHalf.map((cat) => (
            <li key={cat.slug}>
              <Link href={`/san-pham?category=${cat.slug}`} onClick={onNavigate} className={LINK_ITEM}>
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className={GROUP_HEADING}>&nbsp;</p>
        <ul className="mt-3">
          {secondHalf.map((cat) => (
            <li key={cat.slug}>
              <Link href={`/san-pham?category=${cat.slug}`} onClick={onNavigate} className={LINK_ITEM}>
                {cat.name}
              </Link>
            </li>
          ))}
          <li className="mt-2 border-t border-hh-border-soft pt-2">
            <Link href="/san-pham" onClick={onNavigate} className={cn(LINK_ITEM, "font-medium text-hh-primary-dark")}>
              Xem tất cả sản phẩm
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <p className={GROUP_HEADING}>Tư vấn &amp; khám phá</p>
        <ul className="mt-3">
          <li>
            <Link href="/tu-van-chon-san-pham" onClick={onNavigate} className={LINK_ITEM}>
              Tư vấn chọn mùi
            </Link>
          </li>
          <li>
            <Link href={NGUYEN_LIEU_LINK.href} onClick={onNavigate} className={LINK_ITEM}>
              {NGUYEN_LIEU_LINK.label}
            </Link>
          </li>
          <li>
            <Link href={BAI_VIET_LINK.href} onClick={onNavigate} className={LINK_ITEM}>
              {BAI_VIET_LINK.label}
            </Link>
          </li>
          <li>
            <Link href={BRAND_LIBRARY_LINK.href} onClick={onNavigate} className={LINK_ITEM}>
              {BRAND_LIBRARY_LINK.label}
            </Link>
          </li>
        </ul>
      </div>

      {feature?.image && (
        <Link href={`/nguyen-lieu/${feature.slug}`} onClick={onNavigate} className="group block">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-hh-surface-soft">
            <Image
              src={feature.image}
              alt={feature.name}
              fill
              sizes="280px"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </div>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-hh-muted-foreground">
            Nguyên liệu
          </p>
          <p className="mt-1 text-[15px] font-medium text-hh-ink group-hover:text-hh-primary-dark">
            {feature.name}
          </p>
        </Link>
      )}
    </div>
  );
}
