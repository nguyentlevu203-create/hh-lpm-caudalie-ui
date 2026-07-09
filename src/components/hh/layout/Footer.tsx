"use client";

import Link from "next/link";
import { useSiteUI } from "@/components/hh/SiteUIContext";
import { BRAND_NAME, FOOTER_LINKS, CONTACT_INFO } from "@/data/site-content";

/** Footer pattern cloned from the shared Caudalie Footer (multi-column link
 * groups + contact block) rebuilt with HH copy/links, no Caudalie assets.
 * "Đăng nhập"/"Đăng ký thành viên" open the AuthOverlay instead of
 * navigating, since auth here is an overlay, not a dedicated route. */
export function Footer() {
  const { openAuth } = useSiteUI();

  return (
    <footer className="mt-16 border-t border-hh-border bg-hh-muted">
      <div className="mx-auto grid w-full max-w-[1280px] gap-8 px-4 py-12 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div>
          <span className="flex size-9 items-center justify-center rounded-full bg-hh-primary text-sm font-bold text-white">
            HH
          </span>
          <p className="mt-3 text-sm text-hh-muted-foreground">
            {BRAND_NAME} phân phối chính hãng Le Petit Marseillais tại Việt Nam.
          </p>
          <p className="mt-3 text-sm text-hh-muted-foreground">Hotline: {CONTACT_INFO.hotline}</p>
          <p className="text-sm text-hh-muted-foreground">Email: {CONTACT_INFO.email}</p>
        </div>

        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading}>
            <p className="text-sm font-semibold text-hh-ink">{heading}</p>
            <ul className="mt-3 space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  {"action" in link && link.action ? (
                    <button
                      type="button"
                      onClick={openAuth}
                      className="text-sm text-hh-muted-foreground hover:text-hh-ink"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link href={link.href} className="text-sm text-hh-muted-foreground hover:text-hh-ink">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-hh-border px-4 py-4 text-center text-xs text-hh-muted-foreground">
        © {new Date().getFullYear()} {BRAND_NAME}. Sản phẩm nhập khẩu chính hãng từ Pháp.
      </div>
    </footer>
  );
}
