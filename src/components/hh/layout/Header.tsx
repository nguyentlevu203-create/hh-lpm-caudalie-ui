"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, User, ShoppingBag, Menu, ChevronDown, MapPin, Mic } from "lucide-react";
import { useSiteUI } from "@/components/hh/SiteUIContext";
import { MegaMenu } from "@/components/hh/layout/MegaMenu";
import { BRAND_NAME, NAV_ITEMS } from "@/data/site-content";
import { cn } from "@/lib/utils";

const CONTAINER = "mx-auto w-full max-w-[1280px] px-4 md:px-8";

/**
 * Desktop/mobile header — row structure cloned from the shared Caudalie
 * Header (src/components/Header.tsx): (1) a logo + account/cart icon row,
 * (2) a separate desktop-only nav row with a hover/click mega-menu
 * positioned full-width directly below it, (3) a dedicated search-trigger
 * row (sticky on mobile, static on desktop) that also holds the mobile
 * hamburger. Rebuilt with a from-scratch text/badge wordmark (no Caudalie
 * logo asset) and HH nav/copy. The search trigger only opens the shared
 * SearchOverlay (owned by another workstream) — its internal content is
 * untouched here.
 */
export function Header() {
  const { openSearch, openAuth, openCart, openMenu, cartLines } = useSiteUI();
  const [megaOpen, setMegaOpen] = useState(false);
  const cartCount = cartLines.reduce((n, line) => n + line.quantity, 0);

  return (
    <header className="relative z-30 w-full bg-white">
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
          <button type="button" aria-label="Tìm cửa hàng" className="hidden text-hh-ink lg:block">
            <MapPin className="size-6" />
          </button>
          <button type="button" onClick={openAuth} aria-label="Tài khoản" className="text-hh-ink">
            <User className="size-6" />
          </button>
          <button type="button" onClick={openCart} aria-label="Giỏ hàng" className="relative text-hh-ink">
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
      <div className="relative hidden bg-white lg:block" onMouseLeave={() => setMegaOpen(false)}>
        <nav className={cn(CONTAINER, "flex items-center gap-6 py-2")}>
          {NAV_ITEMS.map((item) =>
            item.href === "/san-pham" ? (
              <button
                key={item.href}
                type="button"
                onMouseEnter={() => setMegaOpen(true)}
                onClick={() => setMegaOpen((v) => !v)}
                className="flex items-center gap-1 py-1 text-sm text-hh-ink"
                aria-expanded={megaOpen}
              >
                {item.label}
                <ChevronDown className={cn("size-3.5 transition-transform", megaOpen && "rotate-180")} />
              </button>
            ) : (
              <Link key={item.href} href={item.href} className="inline-block py-1 text-sm text-hh-ink">
                {item.label}
              </Link>
            )
          )}
        </nav>

        {megaOpen && (
          <div
            className="absolute top-full left-0 z-20 w-full border-t border-hh-border bg-white shadow-lg"
            onMouseEnter={() => setMegaOpen(true)}
          >
            <MegaMenu onNavigate={() => setMegaOpen(false)} />
          </div>
        )}
      </div>

      {/* Search trigger row */}
      <div className="sticky top-0 z-10 w-full border-b border-hh-border bg-white lg:relative lg:border-b-0">
        <div className={cn(CONTAINER, "flex items-center gap-3 py-2")}>
          <button
            type="button"
            onClick={openMenu}
            aria-label="Mở menu"
            className="flex size-6 items-center justify-center text-hh-ink lg:hidden"
          >
            <Menu className="size-6" />
          </button>
          <button
            type="button"
            onClick={openSearch}
            className="flex h-10 flex-1 items-center gap-2 rounded-md bg-hh-muted px-3 text-left text-sm text-hh-muted-foreground"
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
