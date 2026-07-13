"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronLeft, Gift, User } from "lucide-react";
import { useSiteUI } from "@/components/hh/SiteUIContext";
import { HH_CATEGORIES } from "@/data/products";
import { BRAND_NAME, NAV_ITEMS } from "@/data/site-content";
import { cn } from "@/lib/utils";

/** Left slide-in mobile nav drawer — structure cloned from the shared
 * Caudalie Header's mobile drawer: a centered-brand row with a left close
 * button, an accordion nav list (the "Sản phẩm" item expands its categories
 * inline instead of a separate categories block), and a bottom utility
 * panel rendered in the brand primary color with divided rows — rebuilt
 * with HH nav/categories, no Caudalie logo asset. */
export function MobileDrawer() {
  const { active, close, openAuth } = useSiteUI();
  const isOpen = active === "menu";
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggle = (href: string) =>
    setExpanded((prev) => (prev.includes(href) ? prev.filter((h) => h !== href) : [...prev, href]));

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/30 transition-opacity",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={close}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-label="Menu"
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[85%] max-w-xs flex-col overflow-y-auto bg-white transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="relative flex h-14 shrink-0 items-center justify-center border-b border-hh-border px-4">
          <button
            type="button"
            onClick={close}
            aria-label="Đóng menu"
            className="absolute left-4 flex size-8 items-center justify-center text-hh-ink"
          >
            <ChevronLeft className="size-6" />
          </button>
          <span className="text-sm font-semibold text-hh-ink">{BRAND_NAME}</span>
        </div>

        <nav className="flex-1 px-4 py-2">
          <ul>
            {NAV_ITEMS.map((item) => {
              const hasChildren = item.href === "/san-pham";
              const isExpanded = expanded.includes(item.href);
              return (
                <li key={item.href} className="border-b border-hh-border py-3">
                  {hasChildren ? (
                    <>
                      <button
                        type="button"
                        onClick={() => toggle(item.href)}
                        className="flex w-full items-center justify-between text-left text-sm text-hh-ink"
                        aria-expanded={isExpanded}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn("size-4 text-hh-ink transition-transform", isExpanded && "rotate-180")}
                        />
                      </button>
                      {isExpanded && (
                        <ul className="mt-3 pl-3">
                          {HH_CATEGORIES.map((cat) => (
                            <li key={cat.slug} className="mb-3">
                              <Link
                                href={`/san-pham?category=${cat.slug}`}
                                onClick={close}
                                className="text-sm text-hh-ink"
                              >
                                {cat.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link href={item.href} onClick={close} className="block text-sm text-hh-ink">
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto flex flex-col divide-y divide-white/15 bg-hh-primary text-white">
          <button
            type="button"
            onClick={() => {
              close();
              openAuth();
            }}
            className="flex items-center gap-3 px-4 py-4 text-left"
          >
            <User className="size-5" />
            <span className="text-sm">Tài khoản của tôi</span>
          </button>
          <Link href="/#hoi-vien" onClick={close} className="flex items-center gap-3 px-4 py-4">
            <Gift className="size-5" />
            <span className="text-sm">Câu Lạc Bộ Hoàng Hà</span>
          </Link>
        </div>
      </div>
    </>
  );
}
