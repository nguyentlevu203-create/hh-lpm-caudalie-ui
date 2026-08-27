"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Globe, MessageCircle, SquarePlay, Users } from "lucide-react";
import { useSiteUI } from "@/components/hh/SiteUIContext";
import { cn } from "@/lib/utils";
import {
  BRAND_NAME,
  FOOTER_LINKS,
  CONTACT_INFO,
  NEWSLETTER,
  SOCIAL_LINKS,
  LEGAL_LINKS,
} from "@/data/site-content";

/** lucide-react ships no brand-specific Facebook/YouTube/Zalo icons (and no
 * Caudalie/branded asset may be reused) — generic equivalents stand in for
 * each platform: Users (community) for Facebook, MessageCircle (chat) for
 * Zalo, SquarePlay (video) for YouTube. */
const SOCIAL_ICONS: Record<string, typeof Globe> = {
  Facebook: Users,
  Zalo: MessageCircle,
  YouTube: SquarePlay,
};

const REGIONS = ["Việt Nam", "International"];

/** Footer link column — a plain list on desktop, a collapsible accordion on
 * mobile/tablet (structural gap vs. the shared Caudalie Footer, which is a
 * static 4-up grid at every width; HH's 3 link groups collapse below `md`
 * to keep the footer scannable on small screens). */
function FooterLinkColumn({
  heading,
  links,
  onAuthClick,
}: {
  heading: string;
  links: (typeof FOOTER_LINKS)[keyof typeof FOOTER_LINKS];
  onAuthClick: () => void;
}) {
  const [open, setOpen] = useState(false);
  const panelId = `footer-panel-${heading.toLowerCase().replace(/[^a-z0-9]+/gi, "-")}`;

  return (
    <div className="border-b border-hh-border py-4 md:border-0 md:py-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between text-left md:pointer-events-none"
      >
        <span className="text-sm font-semibold text-hh-ink">{heading}</span>
        <ChevronDown className={cn("size-4 text-hh-ink transition-transform md:hidden", open && "rotate-180")} />
      </button>
      <ul id={panelId} className={cn("mt-3 space-y-2", open ? "block" : "hidden", "md:block")}>
        {links.map((link) => (
          <li key={link.label}>
            {"action" in link && link.action ? (
              <button
                type="button"
                onClick={onAuthClick}
                className="text-sm text-hh-muted-foreground hover:text-hh-ink"
              >
                {link.label}
              </button>
            ) : link.href === "#" ? (
              <span className="cursor-default text-sm text-hh-muted-foreground/80">
                {link.label} <span className="italic">(Đang cập nhật)</span>
              </span>
            ) : (
              <Link href={link.href} className="text-sm text-hh-muted-foreground hover:text-hh-ink">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Footer pattern cloned from the shared Caudalie Footer (src/components/Footer.tsx):
 * a newsletter panel, a row of link-group columns, then a bottom
 * legal-links bar with a country/region selector — rebuilt with HH
 * copy/links. No Caudalie assets: social entries use plain lucide icons,
 * not brand logo images. "Đăng nhập"/"Đăng ký thành viên" open the
 * AuthOverlay instead of navigating, since auth here is an overlay, not a
 * dedicated route.
 *
 * Phase 8A P0.4 — restructured from a single 5-column grid (brand info +
 * 3 link groups + newsletter squeezed in as the 5th column) into 3
 * sections matching reference's shape: newsletter panel (own surface/
 * border, own full-width row — not a card, not a new gradient, reuses
 * `--hh-surface-soft`) → main nav grid (now exactly 4 columns: brand info
 * + the 3 existing `FOOTER_LINKS` groups) → legal row (unchanged). */
export function Footer() {
  const { openAuth } = useSiteUI();
  const [regionOpen, setRegionOpen] = useState(false);
  const [region, setRegion] = useState(REGIONS[0]);

  return (
    <footer className="mt-16 border-t border-hh-border bg-hh-surface">
      <div className="border-b border-hh-border bg-hh-surface-soft">
        <div className="mx-auto w-full max-w-[1280px] px-4 py-10 md:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h3 className="hh-heading-card text-hh-ink">{NEWSLETTER.heading}</h3>
            <form className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-end">
              <div className="flex-1 text-left">
                <label htmlFor="footer-newsletter-email" className="mb-1 block text-xs font-medium text-hh-muted-foreground">
                  Email
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  placeholder={NEWSLETTER.placeholder}
                  className="w-full min-w-0 rounded-md border border-hh-border bg-hh-surface px-3 py-2 text-sm text-hh-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hh-primary"
                />
              </div>
              <button type="submit" className="hh-cta-editorial px-6 py-2 text-sm sm:h-[42px]">
                {NEWSLETTER.cta}
              </button>
            </form>
            <div className="mt-6 flex justify-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = SOCIAL_ICONS[social.label] ?? Globe;
                const isLive = social.href !== "#";
                return isLive ? (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex size-9 items-center justify-center rounded-full bg-hh-surface text-hh-primary"
                  >
                    <Icon className="size-4" strokeWidth={1.75} />
                  </a>
                ) : (
                  <span
                    key={social.label}
                    aria-label={`${social.label} — đang cập nhật`}
                    className="flex size-9 cursor-default items-center justify-center rounded-full bg-hh-surface text-hh-primary/40"
                  >
                    <Icon className="size-4" strokeWidth={1.75} />
                  </span>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-hh-muted-foreground">{NEWSLETTER.disclaimer}</p>
          </div>
        </div>
      </div>

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
          <FooterLinkColumn key={heading} heading={heading} links={links} onAuthClick={openAuth} />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-6 border-t border-hh-border px-4 py-6 text-sm md:px-8">
        <div className="relative">
          <button
            type="button"
            onClick={() => setRegionOpen((v) => !v)}
            aria-expanded={regionOpen}
            className="flex items-center gap-2 text-hh-muted-foreground hover:text-hh-ink"
          >
            <Globe className="size-4" />
            <span>{region}</span>
            <ChevronDown className={cn("size-4 transition-transform", regionOpen && "rotate-180")} />
          </button>
          {regionOpen && (
            <ul className="hh-shadow-sm absolute bottom-full left-0 z-10 mb-2 min-w-[160px] rounded-md border border-hh-border bg-hh-surface py-1">
              {REGIONS.map((r) => (
                <li key={r}>
                  <button
                    type="button"
                    onClick={() => {
                      setRegion(r);
                      setRegionOpen(false);
                    }}
                    className="block w-full px-3 py-2 text-left text-hh-ink hover:bg-hh-surface-blue"
                  >
                    {r}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {LEGAL_LINKS.map((link) =>
          link.href === "#" ? (
            <span key={link.label} className="cursor-default text-hh-muted-foreground/80">
              {link.label} <span className="italic">(Đang cập nhật)</span>
            </span>
          ) : (
            <Link key={link.label} href={link.href} className="text-hh-muted-foreground hover:text-hh-ink">
              {link.label}
            </Link>
          )
        )}
        <span className="text-hh-muted-foreground">
          © {new Date().getFullYear()} {BRAND_NAME}. Sản phẩm nhập khẩu chính hãng từ Pháp.
        </span>
      </div>
    </footer>
  );
}
