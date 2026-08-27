import Link from "next/link";
import Image from "next/image";
import { BRAND_MEGA_MENU_LINKS } from "@/data/site-content";
import { getContentPageBySlug } from "@/data/content-library";
import { cn } from "@/lib/utils";

const CONTAINER = "mx-auto w-full max-w-[1400px] px-5 md:px-8 lg:px-10";

const GROUP_HEADING = "text-[11px] font-semibold uppercase tracking-[0.12em] text-hh-muted-foreground";
const LINK_ITEM = "block py-1.5 text-[14px] text-hh-ink transition-colors duration-150 hover:text-hh-primary-dark";

/** Real brand-content page reused as the editorial feature tile — "provence-mot-vung-dat-tru-phu"
 * IS the canonical slug (see content-duplicates-derived.json), not a
 * secondary duplicate, and already ships a real Provence photo. */
const FEATURE_PAGE_SLUG = "provence-mot-vung-dat-tru-phu";

/** Desktop mega menu dropdown under the "Thương hiệu" nav item — Header
 * Maison Luxury V5 (Phase 6): the 6 flat BRAND_MEGA_MENU_LINKS gain a
 * heading and share the panel with a real-photo editorial feature column,
 * matching MegaMenu's depth instead of a bare link list. */
export function BrandMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  const feature = getContentPageBySlug(FEATURE_PAGE_SLUG);

  return (
    <div className={cn(CONTAINER, "grid grid-cols-4 gap-10 py-9")}>
      <div className="col-span-2">
        <p className={GROUP_HEADING}>Thương hiệu</p>
        <ul className="mt-3 grid grid-cols-2 gap-x-8">
          {BRAND_MEGA_MENU_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={onNavigate} className={LINK_ITEM}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-1" />

      {feature?.image && (
        <Link href={`/noi-dung-thuong-hieu/${feature.slug}`} onClick={onNavigate} className="group col-span-1 block">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-hh-surface-soft">
            <Image
              src={feature.image}
              alt={feature.pageName}
              fill
              sizes="280px"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </div>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-hh-muted-foreground">
            Câu chuyện thương hiệu
          </p>
          <p className="mt-1 text-[15px] font-medium text-hh-ink group-hover:text-hh-primary-dark">
            {feature.pageName}
          </p>
        </Link>
      )}
    </div>
  );
}
