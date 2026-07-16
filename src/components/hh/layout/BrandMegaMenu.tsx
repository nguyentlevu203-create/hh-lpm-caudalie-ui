import Link from "next/link";
import { BRAND_MEGA_MENU_LINKS } from "@/data/site-content";

const CONTAINER = "mx-auto w-full max-w-[1280px] px-4 md:px-8";

/** Desktop mega menu dropdown under the "Thương hiệu" nav item — same panel
 * shell as MegaMenu (Sản phẩm), listing BRAND_MEGA_MENU_LINKS (the brand
 * story/commitment/formula pages plus the brand content/card/image
 * libraries), same hrefs used in FOOTER_LINKS. */
export function BrandMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className={CONTAINER + " py-8"}>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-3">
        {BRAND_MEGA_MENU_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className="block rounded-lg border-b border-hh-border pb-3 text-base font-medium text-hh-ink transition-colors hover:bg-hh-muted"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
