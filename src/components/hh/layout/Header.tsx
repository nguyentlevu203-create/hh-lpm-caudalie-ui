"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, User, ShoppingBag, Menu, ChevronDown } from "lucide-react";
import { useSiteUI } from "@/components/hh/SiteUIContext";
import { MegaMenu } from "@/components/hh/layout/MegaMenu";
import { BRAND_NAME, NAV_ITEMS } from "@/data/site-content";
import { cn } from "@/lib/utils";

/** Desktop/mobile header — pattern cloned from the shared Caudalie Header
 * (sticky top row, hamburger left on mobile, search/account/cart icons
 * right, hover mega-menu on desktop for the product nav item) rebuilt with
 * a from-scratch text/badge wordmark (no Caudalie logo asset) and HH nav. */
export function Header() {
  const { openSearch, openAuth, openCart, openMenu, cartLines } = useSiteUI();
  const [megaOpen, setMegaOpen] = useState(false);
  const cartCount = cartLines.reduce((n, line) => n + line.quantity, 0);

  return (
    <header className="sticky top-0 z-30 border-b border-hh-border bg-white">
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center gap-4 px-4 md:px-8">
        <button type="button" onClick={openMenu} aria-label="Mở menu" className="text-hh-ink lg:hidden">
          <Menu className="size-6" />
        </button>

        <Link href="/" className="flex items-center gap-2" aria-label="Trang chủ Hoàng Hà">
          <span className="flex size-9 items-center justify-center rounded-full bg-hh-primary text-sm font-bold text-white">
            HH
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-semibold text-hh-ink">{BRAND_NAME}</span>
            <span className="text-[10px] uppercase tracking-wide text-hh-muted-foreground">
              Le Petit Marseillais
            </span>
          </span>
        </Link>

        <nav className="hidden flex-1 items-center gap-6 lg:flex">
          {NAV_ITEMS.map((item) =>
            item.href === "/san-pham" ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setMegaOpen((v) => !v)}
                  className="flex items-center gap-1 text-sm text-hh-ink"
                  aria-expanded={megaOpen}
                >
                  {item.label}
                  <ChevronDown className={cn("size-3.5 transition-transform", megaOpen && "rotate-180")} />
                </button>
                {megaOpen && <MegaMenu onNavigate={() => setMegaOpen(false)} />}
              </div>
            ) : (
              <Link key={item.href} href={item.href} className="text-sm text-hh-ink">
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <button type="button" onClick={openSearch} aria-label="Tìm kiếm" className="text-hh-ink">
            <Search className="size-5" />
          </button>
          <button type="button" onClick={openAuth} aria-label="Tài khoản" className="hidden text-hh-ink sm:block">
            <User className="size-5" />
          </button>
          <button type="button" onClick={openCart} aria-label="Giỏ hàng" className="relative text-hh-ink">
            <ShoppingBag className="size-5" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-hh-primary text-[10px] text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
