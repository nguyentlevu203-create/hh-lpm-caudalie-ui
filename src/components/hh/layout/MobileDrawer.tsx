"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronLeft, Gift, MapPin, User } from "lucide-react";
import { useSiteUI } from "@/components/hh/SiteUIContext";
import { HH_CATEGORIES } from "@/data/products";
import { BRAND_NAME, NAV_ITEMS, BRAND_MEGA_MENU_LINKS, BRAND_LIBRARY_LINK, isNavPathActive } from "@/data/site-content";
import { cn } from "@/lib/utils";
import { useFocusTrap } from "@/lib/use-focus-trap";

/** Left slide-in mobile nav drawer — structure cloned from the shared
 * Caudalie Header's mobile drawer: a centered-brand row with a left close
 * button, an accordion nav list ("Sản phẩm" and "Thương hiệu" expand their
 * sub-links inline instead of a separate categories block), and a bottom
 * utility panel rendered in the brand primary color with divided rows —
 * rebuilt with HH nav/categories, no Caudalie logo asset. */
export function MobileDrawer() {
  const { active, close, openAuth } = useSiteUI();
  const pathname = usePathname();
  const isOpen = active === "menu";
  const [expanded, setExpanded] = useState<string[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, isOpen);

  const toggle = (id: string) =>
    setExpanded((prev) => (prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]));

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-hh-primary/35 transition-opacity",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={close}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-label="Menu"
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[85%] max-w-xs flex-col overflow-y-auto bg-hh-surface transition-transform duration-300",
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

        <nav className="flex-1 px-4 py-2" aria-label="Điều hướng chính (di động)">
          <ul>
            {NAV_ITEMS.map((item) => {
              if (item.type === "mega") {
                const isExpanded = expanded.includes(item.id);
                const isActive = isNavPathActive(pathname, item.activeMatch);
                const subLinks =
                  item.id === "san-pham"
                    ? [...HH_CATEGORIES.map((cat) => ({ label: cat.name, href: `/san-pham?category=${cat.slug}` })), BRAND_LIBRARY_LINK]
                    : BRAND_MEGA_MENU_LINKS;
                return (
                  <li key={item.id} className="border-b border-hh-border py-3">
                    <button
                      type="button"
                      onClick={() => toggle(item.id)}
                      className={cn(
                        "flex w-full items-center justify-between text-left text-sm text-hh-ink",
                        isActive && "font-semibold text-hh-primary"
                      )}
                      aria-expanded={isExpanded}
                      aria-controls={`mobile-mega-${item.id}`}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn("size-4 text-hh-ink transition-transform", isExpanded && "rotate-180")}
                      />
                    </button>
                    {isExpanded && (
                      <ul id={`mobile-mega-${item.id}`} className="mt-3 pl-3">
                        {subLinks.map((link) => (
                          <li key={link.href} className="mb-3">
                            <Link href={link.href} onClick={close} className="text-sm text-hh-ink">
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              const isActive = isNavPathActive(pathname, item.activeMatch ?? [item.href]);
              return (
                <li key={item.href} className="border-b border-hh-border py-3">
                  <Link
                    href={item.href}
                    onClick={close}
                    className={cn("block text-sm text-hh-ink", isActive && "font-semibold text-hh-primary")}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
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
          <div className="flex cursor-not-allowed items-center gap-3 px-4 py-4 opacity-60" title="Đang cập nhật">
            <MapPin className="size-5" />
            <span className="text-sm">Tìm cửa hàng — đang cập nhật</span>
          </div>
        </div>
      </div>
    </>
  );
}
