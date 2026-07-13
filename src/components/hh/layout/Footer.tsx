"use client";

import Link from "next/link";
import { useSiteUI } from "@/components/hh/SiteUIContext";
import {
  BRAND_NAME,
  FOOTER_LINKS,
  CONTACT_INFO,
  NEWSLETTER,
  SOCIAL_LINKS,
  LEGAL_LINKS,
} from "@/data/site-content";

/** Footer pattern cloned from the shared Caudalie Footer (src/components/Footer.tsx):
 * a row of link-group columns plus a highlighted newsletter/social column,
 * then a bottom legal-links bar — rebuilt with HH copy/links. No Caudalie
 * assets: social icons are plain initial badges, not brand logo images.
 * "Đăng nhập"/"Đăng ký thành viên" open the AuthOverlay instead of
 * navigating, since auth here is an overlay, not a dedicated route. */
export function Footer() {
  const { openAuth } = useSiteUI();

  return (
    <footer className="mt-16 border-t border-hh-border bg-white">
      <div className="mx-auto grid w-full max-w-[1280px] gap-8 px-4 py-12 sm:grid-cols-2 md:px-8 lg:grid-cols-5">
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

        <div className="bg-hh-muted p-6 sm:col-span-2 lg:col-span-1">
          <h3 className="text-base font-semibold text-hh-ink">{NEWSLETTER.heading}</h3>
          <form className="mt-4 flex items-center gap-3 border-b-2 border-hh-border pb-2">
            <input
              type="email"
              placeholder={NEWSLETTER.placeholder}
              className="flex-1 border-0 bg-transparent text-sm text-hh-ink focus:outline-none"
            />
            <button type="submit" className="text-sm font-medium text-hh-primary">
              {NEWSLETTER.cta}
            </button>
          </form>
          <div className="mt-6 flex gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex size-9 items-center justify-center rounded-full bg-white text-xs font-semibold text-hh-primary"
              >
                {social.label.charAt(0)}
              </a>
            ))}
          </div>
          <p className="mt-4 text-xs text-hh-muted-foreground">{NEWSLETTER.disclaimer}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 border-t border-hh-border px-4 py-6 text-sm md:px-8">
        {LEGAL_LINKS.map((link) => (
          <Link key={link.label} href={link.href} className="text-hh-muted-foreground hover:text-hh-ink">
            {link.label}
          </Link>
        ))}
        <span className="text-hh-muted-foreground">
          © {new Date().getFullYear()} {BRAND_NAME}. Sản phẩm nhập khẩu chính hãng từ Pháp.
        </span>
      </div>
    </footer>
  );
}
