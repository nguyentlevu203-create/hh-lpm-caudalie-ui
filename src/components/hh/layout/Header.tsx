"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, ShoppingBag, Menu, ChevronDown, MapPin } from "lucide-react";
import { useSiteUI } from "@/components/hh/SiteUIContext";
import { useAccount } from "@/components/hh/AccountContext";
import { MegaMenu } from "@/components/hh/layout/MegaMenu";
import { BrandMegaMenu } from "@/components/hh/layout/BrandMegaMenu";
import { BRAND_NAME, NAV_ITEMS, isNavPathActive } from "@/data/site-content";
import { cn } from "@/lib/utils";

const CONTAINER = "mx-auto flex w-full max-w-[1400px] items-center px-5 md:px-8 lg:px-10";

const FOCUS_RING =
  "outline-none rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hh-primary";

const ACTION_BUTTON =
  "relative flex size-10 shrink-0 items-center justify-center rounded-full text-hh-ink transition-colors duration-150 hover:bg-hh-surface-soft";

const MEGA_OPEN_DELAY = 120;

/**
 * Header Maison Luxury V5 — single premium row on desktop (Phase 2
 * Variant A, chosen over the compact two-row alternative: at 1024px the 7
 * nav items + logo + 4 action icons measured well under the 1024–1440px
 * container width, so a second row bought nothing but the ~50px of dead
 * space the V5 audit flagged). Consolidates the old 3-row stack (logo/
 * action row + nav row + persistent search-bar row = 160px) into one
 * ~84px row: the always-visible search *input* becomes an icon trigger
 * (opens the same SearchOverlay) alongside store/account/cart — freeing
 * the vertical space a full-width input bar can't share a single row with.
 *
 * Sticky via IntersectionObserver on a 1px sentinel placed at the header's
 * natural top edge (not a scroll listener — cheaper, and immune to the
 * "resize every pixel" anti-pattern) — `scrolled` flips once the sentinel
 * leaves the viewport, which is exactly when the sticky header would
 * otherwise start overlapping content. `motion-reduce:transition-none`
 * throughout respects prefers-reduced-motion.
 *
 * Two mega menus ("Sản phẩm", "Thương hiệu") share one open/close state
 * (`megaOpenId`) so only one can be open at a time. Opens after a short
 * hover delay (avoids flicker while the cursor crosses the nav bar),
 * closes on mouse-leave, outside click, Escape, or picking a link — never
 * on a plain re-render.
 */
export function Header() {
  const { openSearch, openAuth, openCart, openMenu, cartLines } = useSiteUI();
  const { user } = useAccount();
  const pathname = usePathname();
  const [megaOpenId, setMegaOpenId] = useState<"san-pham" | "thuong-hieu" | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const megaOpenTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaTriggerRefs = useRef<Partial<Record<"san-pham" | "thuong-hieu", HTMLButtonElement>>>({});
  const cartCount = cartLines.reduce((n, line) => n + line.quantity, 0);
  const cartLabel = cartCount > 99 ? "99+" : cartCount > 0 ? String(cartCount) : null;

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), { threshold: 0 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!megaOpenId) return;

    function onPointerDown(event: PointerEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMegaOpenId(null);
      }
    }
    // Escape restores focus to whichever mega-menu trigger opened the
    // panel (keyboard users lose their place otherwise); a plain
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

  useEffect(() => () => {
    if (megaOpenTimer.current) clearTimeout(megaOpenTimer.current);
  }, []);

  function scheduleMegaOpen(id: "san-pham" | "thuong-hieu") {
    if (megaOpenTimer.current) clearTimeout(megaOpenTimer.current);
    megaOpenTimer.current = setTimeout(() => setMegaOpenId(id), MEGA_OPEN_DELAY);
  }

  function cancelMegaOpen() {
    if (megaOpenTimer.current) clearTimeout(megaOpenTimer.current);
  }

  const cartAriaLabel = cartCount > 0 ? `Giỏ hàng, ${cartCount} sản phẩm` : "Giỏ hàng";

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="h-px w-full" />
      <header
        className={cn(
          "sticky top-0 z-30 w-full bg-hh-surface transition-[box-shadow,border-color,background-color] duration-300 motion-reduce:transition-none",
          scrolled
            ? "border-b border-hh-border hh-shadow-sm supports-[backdrop-filter]:bg-hh-surface/95 supports-[backdrop-filter]:backdrop-blur-sm"
            : "border-b border-transparent"
        )}
      >
        {/* Desktop single row: logo (left) + nav (center) + actions (right) */}
        <div
          ref={navRef}
          className="relative hidden lg:block"
          onMouseLeave={() => {
            cancelMegaOpen();
            setMegaOpenId(null);
          }}
        >
          <div
            className={cn(
              CONTAINER,
              "gap-4 py-5 transition-[padding] duration-300 motion-reduce:transition-none xl:gap-10",
              scrolled && "py-4"
            )}
          >
            <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Trang chủ Hoàng Hà">
              <span
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-full bg-hh-primary font-bold leading-none text-white transition-[width,height,font-size] duration-300 motion-reduce:transition-none",
                  scrolled ? "size-[42px] text-xs" : "size-[46px] text-sm"
                )}
              >
                HH
              </span>
              <span className="hidden flex-col justify-center leading-tight xl:flex">
                <span className="text-[15px] font-semibold text-hh-ink">{BRAND_NAME}</span>
                <span className="text-[10px] uppercase tracking-[0.14em] text-hh-muted-foreground">
                  Le Petit Marseillais
                </span>
              </span>
            </Link>

            <nav
              className="flex min-w-0 flex-1 items-center justify-center gap-5 xl:gap-8"
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
                      onMouseEnter={() => scheduleMegaOpen(item.id)}
                      onClick={() => {
                        cancelMegaOpen();
                        setMegaOpenId((prev) => (prev === item.id ? null : item.id));
                      }}
                      className={cn(
                        "group relative flex items-center gap-1 whitespace-nowrap py-2 text-[14px] font-medium text-hh-ink transition-colors duration-200 hover:text-hh-primary-dark xl:text-[15px]",
                        isActive && "font-semibold text-hh-primary",
                        FOCUS_RING
                      )}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "size-3.5 text-hh-muted-foreground transition-transform duration-200",
                          isOpen && "rotate-180"
                        )}
                      />
                      <span
                        aria-hidden="true"
                        className={cn(
                          "pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-hh-primary-dark transition-transform duration-200 motion-reduce:transition-none group-hover:scale-x-100",
                          isActive && "scale-x-100 bg-hh-primary"
                        )}
                      />
                    </button>
                  );
                }

                const isActive = isNavPathActive(pathname, item.activeMatch ?? [item.href]);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group relative inline-block whitespace-nowrap py-2 text-[14px] font-medium text-hh-ink transition-colors duration-200 hover:text-hh-primary-dark xl:text-[15px]",
                      isActive && "font-semibold text-hh-primary",
                      FOCUS_RING
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-hh-primary-dark transition-transform duration-200 motion-reduce:transition-none group-hover:scale-x-100",
                        isActive && "scale-x-100 bg-hh-primary"
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-1">
              <button type="button" onClick={openSearch} aria-label="Tìm kiếm" className={cn(ACTION_BUTTON, FOCUS_RING)}>
                <Search className="size-6" />
              </button>
              <button
                type="button"
                disabled
                aria-label="Tìm cửa hàng — đang cập nhật"
                title="Đang cập nhật"
                className={cn(ACTION_BUTTON, "cursor-not-allowed opacity-40 hover:bg-transparent", FOCUS_RING)}
              >
                <MapPin className="size-6" />
              </button>
              {user ? (
                <Link href="/tai-khoan" aria-label="Tài khoản của tôi" className={cn(ACTION_BUTTON, FOCUS_RING)}>
                  <User className="size-6" />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={openAuth}
                  aria-label="Tài khoản"
                  className={cn(ACTION_BUTTON, FOCUS_RING)}
                >
                  <User className="size-6" />
                </button>
              )}
              <button
                type="button"
                onClick={openCart}
                aria-label={cartAriaLabel}
                className={cn(ACTION_BUTTON, FOCUS_RING)}
              >
                <ShoppingBag className="size-6" />
                {cartLabel && (
                  <span className="absolute right-1 top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-hh-primary px-1 text-[10px] font-medium leading-none text-white">
                    {cartLabel}
                  </span>
                )}
              </button>
            </div>
          </div>

          {megaOpenId && (
            <div
              id={`mega-panel-${megaOpenId}`}
              className="hh-shadow-md absolute top-full left-0 z-20 w-full border-t border-hh-border bg-hh-surface"
              onMouseEnter={() => {
                cancelMegaOpen();
                setMegaOpenId(megaOpenId);
              }}
            >
              {megaOpenId === "san-pham" ? (
                <MegaMenu onNavigate={() => setMegaOpenId(null)} />
              ) : (
                <BrandMegaMenu onNavigate={() => setMegaOpenId(null)} />
              )}
            </div>
          )}
        </div>

        {/* Mobile single row: hamburger (left) + logo (center) + up to 3 actions (right) */}
        <div className={cn(CONTAINER, "h-16 gap-1 lg:hidden")}>
          <button
            type="button"
            onClick={openMenu}
            aria-label="Mở menu"
            className={cn(ACTION_BUTTON, "-ml-2.5", FOCUS_RING)}
          >
            <Menu className="size-6" />
          </button>
          <Link
            href="/"
            className="flex flex-1 items-center justify-center gap-2 overflow-hidden"
            aria-label="Trang chủ Hoàng Hà"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-hh-primary text-xs font-bold leading-none text-white">
              HH
            </span>
            <span className="truncate text-sm font-semibold text-hh-ink">{BRAND_NAME}</span>
          </Link>
          <div className="flex shrink-0 items-center gap-0.5">
            <button type="button" onClick={openSearch} aria-label="Tìm kiếm" className={cn(ACTION_BUTTON, FOCUS_RING)}>
              <Search className="size-6" />
            </button>
            {user ? (
              <Link href="/tai-khoan" aria-label="Tài khoản của tôi" className={cn(ACTION_BUTTON, FOCUS_RING)}>
                <User className="size-6" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={openAuth}
                aria-label="Tài khoản"
                className={cn(ACTION_BUTTON, FOCUS_RING)}
              >
                <User className="size-6" />
              </button>
            )}
            <button
              type="button"
              onClick={openCart}
              aria-label={cartAriaLabel}
              className={cn(ACTION_BUTTON, "-mr-2.5", FOCUS_RING)}
            >
              <ShoppingBag className="size-6" />
              {cartLabel && (
                <span className="absolute right-1.5 top-1.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-hh-primary px-1 text-[10px] font-medium leading-none text-white">
                  {cartLabel}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
