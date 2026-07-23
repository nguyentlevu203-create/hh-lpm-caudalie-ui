"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, ShoppingBag, Menu, ChevronDown, MapPin, Mic } from "lucide-react";
import { useSiteUI } from "@/components/hh/SiteUIContext";
import { useAccount } from "@/components/hh/AccountContext";
import { MegaMenu } from "@/components/hh/layout/MegaMenu";
import { BrandMegaMenu } from "@/components/hh/layout/BrandMegaMenu";
import { BRAND_NAME, NAV_ITEMS, isNavPathActive } from "@/data/site-content";
import { cn } from "@/lib/utils";

const CONTAINER = "mx-auto w-full max-w-[1280px] px-4 md:px-8";

const FOCUS_RING =
  "outline-none rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hh-primary";

/**
 * Desktop/mobile header — row structure cloned from the shared Caudalie
 * Header (src/components/Header.tsx): (1) a logo + account/cart icon row,
 * (2) a separate desktop-only nav row with hover/click mega-menus
 * positioned full-width directly below it, (3) a dedicated search-trigger
 * row (sticky on mobile, static on desktop) that also holds the mobile
 * hamburger. Rebuilt with a from-scratch text/badge wordmark (no Caudalie
 * logo asset) and HH nav/copy. The search trigger only opens the shared
 * SearchOverlay (owned by another workstream) — its internal content is
 * untouched here.
 *
 * Two mega menus ("Sản phẩm", "Thương hiệu") share one open/close state
 * (`megaOpenId`) so only one can be open at a time. Closes on mouse-leave,
 * outside click, Escape, or picking a link — never on a plain re-render.
 */
export function Header() {
  const { openSearch, openAuth, openCart, openMenu, cartLines } = useSiteUI();
  const { user } = useAccount();
  const pathname = usePathname();
  const [megaOpenId, setMegaOpenId] = useState<"san-pham" | "thuong-hieu" | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const megaTriggerRefs = useRef<Partial<Record<"san-pham" | "thuong-hieu", HTMLButtonElement>>>({});
  const cartCount = cartLines.reduce((n, line) => n + line.quantity, 0);

  useEffect(() => {
    if (!megaOpenId) return;

    function onPointerDown(event: PointerEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMegaOpenId(null);
      }
    }
    // P1.4 — Escape restores focus to whichever mega-menu trigger opened
    // the panel (keyboard users lose their place otherwise); a plain
    // outside-click doesn't force focus, since the user already moved
    // their attention elsewhere on purpose.
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && megaOpenId) {
        megaTriggerRefs.current[megaOpenId]?.focus();
        setMegaOpenId(null);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [megaOpenId]);

  return (
    <header className="relative z-30 w-full bg-hh-surface">
      {/* Main header row: logo + account/cart icons */}
      <div className={cn(CONTAINER, "flex items-center gap-4 py-3")}>
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Trang chủ Hoàng Hà">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-hh-primary text-sm font-bold leading-none text-white">
            HH
          </span>
          <span className="hidden flex-col justify-center leading-tight sm:flex">
            <span className="text-sm font-semibold text-hh-ink">{BRAND_NAME}</span>
            <span className="text-[10px] uppercase tracking-wide text-hh-muted-foreground">
              Le Petit Marseillais
            </span>
          </span>
        </Link>

        <div className="flex-1" />

        <div className="flex items-center gap-4 md:gap-5">
          <button type="button" aria-label="Tìm cửa hàng" className={cn("hidden text-hh-ink lg:block", FOCUS_RING)}>
            <MapPin className="size-6" />
          </button>
          {user ? (
            <Link href="/tai-khoan" aria-label="Tài khoản của tôi" className={cn("text-hh-ink", FOCUS_RING)}>
              <User className="size-6" />
            </Link>
          ) : (
            <button type="button" onClick={openAuth} aria-label="Tài khoản" className={cn("text-hh-ink", FOCUS_RING)}>
              <User className="size-6" />
            </button>
          )}
          <button
            type="button"
            onClick={openCart}
            aria-label="Giỏ hàng"
            className={cn("relative text-hh-ink", FOCUS_RING)}
          >
            <ShoppingBag className="size-6" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-hh-primary text-[10px] text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Primary nav row (desktop only) */}
      <div
        ref={navRef}
        className="relative hidden bg-hh-surface lg:block"
        onMouseLeave={() => setMegaOpenId(null)}
      >
        <nav
          className={cn(CONTAINER, "flex flex-nowrap items-center gap-3 py-2 xl:gap-6")}
          aria-label="Điều hướng chính"
        >
          {NAV_ITEMS.map((item) => {
            if (item.type === "mega") {
              const isOpen = megaOpenId === item.id;
              const isActive = isNavPathActive(pathname, item.activeMatch);
              const panelId = `mega-panel-${item.id}`;
              return (
                <button
                  key={item.id}
                  type="button"
                  ref={(el) => {
                    if (el) megaTriggerRefs.current[item.id] = el;
                  }}
                  onMouseEnter={() => setMegaOpenId(item.id)}
                  onClick={() => setMegaOpenId(item.id)}
                  className={cn(
                    "flex items-center gap-1 whitespace-nowrap py-1 text-[13px] text-hh-ink xl:text-sm",
                    isActive && "font-semibold text-hh-primary",
                    FOCUS_RING
                  )}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                  <ChevronDown className={cn("size-3.5 transition-transform", isOpen && "rotate-180")} />
                </button>
              );
            }

            const isActive = isNavPathActive(pathname, item.activeMatch ?? [item.href]);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-block whitespace-nowrap py-1 text-[13px] text-hh-ink xl:text-sm",
                  isActive && "font-semibold text-hh-primary",
                  FOCUS_RING
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {megaOpenId && (
          <div
            id={`mega-panel-${megaOpenId}`}
            className="hh-shadow-md absolute top-full left-0 z-20 w-full border-t border-hh-border bg-hh-surface"
            onMouseEnter={() => setMegaOpenId(megaOpenId)}
          >
            {megaOpenId === "san-pham" ? (
              <MegaMenu onNavigate={() => setMegaOpenId(null)} />
            ) : (
              <BrandMegaMenu onNavigate={() => setMegaOpenId(null)} />
            )}
          </div>
        )}
      </div>

      {/* Search trigger row */}
      <div className="sticky top-0 z-10 w-full border-b border-hh-border bg-hh-surface lg:relative lg:border-b-0">
        <div className={cn(CONTAINER, "flex items-center gap-3 py-2")}>
          <button
            type="button"
            onClick={openMenu}
            aria-label="Mở menu"
            className={cn("flex size-6 items-center justify-center text-hh-ink lg:hidden", FOCUS_RING)}
          >
            <Menu className="size-6" />
          </button>
          <button
            type="button"
            onClick={openSearch}
            className={cn(
              "flex h-10 flex-1 items-center gap-2 rounded-md bg-hh-muted px-3 text-left text-sm text-hh-muted-foreground",
              FOCUS_RING
            )}
          >
            <Search className="size-5 shrink-0 text-hh-ink" />
            <span className="flex-1">Tìm sản phẩm, hương thơm...</span>
            <Mic className="size-5 shrink-0 text-hh-ink" />
          </button>
        </div>
      </div>
    </header>
  );
}
