"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useSiteUI } from "@/components/hh/SiteUIContext";
import { HH_CATEGORIES } from "@/data/products";
import { NAV_ITEMS } from "@/data/site-content";
import { cn } from "@/lib/utils";

/** Left slide-in mobile nav drawer — pattern cloned from the shared
 * Caudalie Header's mobile nav drawer, rebuilt with HH nav/categories. */
export function MobileDrawer() {
  const { active, close, openAuth } = useSiteUI();
  const isOpen = active === "menu";

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
          "fixed inset-y-0 left-0 z-50 flex w-[85%] max-w-xs flex-col bg-white transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-hh-border px-4 py-4">
          <span className="text-sm font-semibold text-hh-ink">Menu</span>
          <button type="button" onClick={close} aria-label="Đóng menu" className="text-hh-ink">
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-4 py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="rounded-md px-2 py-2.5 text-sm text-hh-ink hover:bg-hh-muted"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-hh-border px-4 py-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-hh-muted-foreground">Danh mục</p>
          <div className="flex flex-col gap-1">
            {HH_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/san-pham?category=${cat.slug}`}
                onClick={close}
                className="rounded-md px-2 py-2 text-sm text-hh-ink hover:bg-hh-muted"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-auto border-t border-hh-border px-4 py-4">
          <button
            type="button"
            onClick={() => {
              close();
              openAuth();
            }}
            className="h-11 w-full rounded-md border-2 border-hh-primary text-sm font-medium text-hh-primary"
          >
            Đăng nhập / Đăng ký
          </button>
        </div>
      </div>
    </>
  );
}
