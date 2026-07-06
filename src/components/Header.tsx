"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { MegaMenuContent, MegaMenuLink, NavItem } from "@/types/content";
import {
  ChevronDown,
  ChevronLeft,
  LogoIcon,
  MapPin,
  Menu,
  Mic,
  Plus,
  Search,
  ShoppingBag,
  User,
} from "@/components/icons";

const CONTAINER = "mx-auto w-full max-w-[1440px] px-4 md:px-8";

const NAV_ITEMS: NavItem[] = [
  { label: "Summer Selection", href: "#", variant: "pill-yellow" },
  {
    label: "Shop",
    href: "#",
    megaMenu: {
      columns: [
        {
          heading: "Face",
          links: [
            { label: "Creams & fluids" },
            { label: "Cleansers" },
            { label: "Serums" },
            { label: "Night creams" },
            { label: "Toners & Facial Mists" },
            { label: "Eye contours & lip Conditioners" },
            { label: "Masks scrubs & peelings" },
            { label: "Face Suncare" },
            { label: "Face oils" },
            { label: "Refills" },
            { label: "Self-tan" },
            { label: "Travel Sizes" },
          ],
        },
        {
          heading: "Body",
          links: [
            { label: "Body Lotions" },
            { label: "Fragrances" },
            { label: "Shower Gels" },
            { label: "Hand creams" },
            { label: "Body Suncare" },
            { label: "Body oils" },
            { label: "Deodorant" },
            { label: "Body Scrub" },
            { label: "After-Sun" },
          ],
        },
        {
          heading: "Needs",
          links: [
            { label: "Anti-wrinkle Firming" },
            { label: "Radiance & Hyperpigmentation" },
            { label: "Wrinkles Dark Spots Volume" },
            { label: "Dry & Sensitive" },
            { label: "Acne-prone skin" },
            { label: "Anti-puffiness anti-dark circles" },
            { label: "Sun Protection" },
            { label: "Body Firming" },
            { label: "Healthy glow" },
          ],
        },
        {
          heading: "Collections",
          links: [
            { label: "Premier Cru" },
            { label: "Resveratrol-Lift" },
            { label: "Vinoperfect" },
            { label: "Vinopure" },
            { label: "VinoHydra" },
            { label: "Vinoclean" },
            { label: "Vinosculpt" },
            { label: "Vinotherapist" },
            { label: "Suncare" },
          ],
        },
      ],
      ctaLabel: "Discover all products",
    },
  },
  { label: "New", href: "#" },
  { label: "Best-sellers", href: "#" },
  {
    label: "Gifts & offers",
    href: "#",
    megaMenu: {
      links: [
        { label: "Gift sets" },
        { label: "Gift cards" },
        { label: "Advent calendars" },
        { label: "Beauty box" },
      ],
    },
  },
  {
    label: "Needs",
    href: "#",
    megaMenu: {
      links: [
        { label: "Correct all the signs of ageing" },
        { label: "Prolong the youthfulness of your skin" },
        { label: "Learn how to treat dark spots" },
        { label: "Moisturize and soothe your skin" },
        { label: "Cleansing and make-up removal" },
        { label: "Get rid of blemishes" },
        { label: "Recovering a firm and toned body" },
        { label: "Find a Beauty Event Near You" },
      ],
      promoTiles: [
        { title: "Dark spots", caption: "Learn how to treat dark spots" },
        { title: "Skin analysis", caption: "Get your 30-second Skin Analysis" },
      ],
      ctaLabel: "Find your regimen",
    },
  },
  {
    label: "Spa & events",
    href: "#",
    megaMenu: {
      links: [
        { label: "Find a spa" },
        { label: "Book a treatment" },
        { label: "Upcoming events" },
      ],
    },
  },
  {
    label: "About Caudalie",
    href: "#",
    megaMenu: {
      links: [
        { label: "Our story" },
        { label: "Sustainability commitments" },
        { label: "Bordeaux vineyard" },
        { label: "Careers" },
      ],
    },
  },
  { label: "Scan Your Skin", href: "#", variant: "pill-grey" },
];

function getFlatLinks(content: MegaMenuContent): MegaMenuLink[] {
  if (content.columns) {
    return content.columns.flatMap((column) => column.links);
  }
  return content.links ?? [];
}

function OutlinedCta({ label }: { label: string }) {
  return (
    <a
      href="#"
      className="inline-flex items-center justify-center rounded-full border border-primary px-6 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
    >
      {label}
    </a>
  );
}

function MegaMenu({ content }: { content: MegaMenuContent }) {
  if (content.columns) {
    return (
      <div className={cn(CONTAINER, "py-8")}>
        <div className="grid grid-cols-4 gap-8">
          {content.columns.map((column) => (
            <div key={column.heading}>
              <h3 className="border-b border-border pb-2 text-base font-medium text-primary">
                {column.heading}
              </h3>
              <ul className="mt-4">
                {column.links.map((link) => (
                  <li key={link.label} className="mb-3">
                    <Link
                      href={link.href ?? "#"}
                      className="text-base text-primary hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {content.ctaLabel && (
          <div className="mt-8 flex justify-center">
            <OutlinedCta label={content.ctaLabel} />
          </div>
        )}
      </div>
    );
  }

  if (content.promoTiles) {
    return (
      <div className={cn(CONTAINER, "py-8")}>
        <div className="flex gap-12">
          <ul className="w-1/3 shrink-0">
            {(content.links ?? []).map((link) => (
              <li key={link.label} className="mb-3">
                <Link
                  href={link.href ?? "#"}
                  className="text-base text-primary hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="grid flex-1 grid-cols-2 gap-4">
            {content.promoTiles.map((tile) => (
              <a
                key={tile.title}
                href={tile.href ?? "#"}
                className="group relative flex aspect-[5/6] flex-col justify-end overflow-hidden rounded-md bg-muted"
              >
                <span className="bg-primary/80 p-3 text-sm font-medium text-primary-foreground">
                  {tile.caption}
                </span>
              </a>
            ))}
          </div>
        </div>
        {content.ctaLabel && (
          <div className="mt-8 flex justify-center">
            <OutlinedCta label={content.ctaLabel} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn(CONTAINER, "py-8")}>
      <ul className="max-w-xs">
        {(content.links ?? []).map((link) => (
          <li key={link.label} className="mb-3">
            <Link href={link.href ?? "#"} className="text-base text-primary hover:underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NavLabel({ item }: { item: NavItem }) {
  if (item.variant === "pill-yellow") {
    return (
      <span className="rounded-full bg-accent px-3 py-1 text-base text-primary">
        {item.label}
      </span>
    );
  }
  if (item.variant === "pill-grey") {
    return (
      <span className="rounded-full bg-muted px-4 py-2 text-base text-primary">
        {item.label}
      </span>
    );
  }
  return <span className="text-base text-primary hover:underline">{item.label}</span>;
}

function MobileDrawer({
  open,
  onClose,
  expanded,
  onToggle,
}: {
  open: boolean;
  onClose: () => void;
  expanded: string[];
  onToggle: (label: string) => void;
}) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/30 transition-opacity lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[88%] max-w-sm flex-col overflow-y-auto bg-white transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="relative flex h-14 shrink-0 items-center justify-center border-b border-border px-4">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="absolute left-4 flex h-8 w-8 items-center justify-center text-primary"
          >
            <ChevronLeft className="size-6" />
          </button>
          <LogoIcon className="h-6 text-primary" />
        </div>

        <nav className="flex-1 px-4 py-2">
          <ul>
            {NAV_ITEMS.filter((item) => item.variant !== "pill-grey").map((item) => {
              const isExpanded = expanded.includes(item.label);
              return (
                <li key={item.label} className="border-b border-border py-3">
                  {item.megaMenu ? (
                    <>
                      <button
                        type="button"
                        onClick={() => onToggle(item.label)}
                        className="flex w-full items-center justify-between text-left"
                      >
                        <NavLabel item={item} />
                        <ChevronDown
                          className={cn(
                            "size-5 text-primary transition-transform",
                            isExpanded && "rotate-180"
                          )}
                        />
                      </button>
                      {isExpanded && (
                        <ul className="mt-3 pl-3">
                          {getFlatLinks(item.megaMenu).map((link) => (
                            <li key={link.label} className="mb-3">
                              <Link
                                href={link.href ?? "#"}
                                className="text-base text-primary"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link href={item.href ?? "#"} className="block">
                      <NavLabel item={item} />
                    </Link>
                  )}
                </li>
              );
            })}
            <li className="py-3">
              <Link href="#" className="block">
                <NavLabel
                  item={NAV_ITEMS.find((i) => i.variant === "pill-grey")!}
                />
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-auto flex flex-col divide-y divide-white/15 bg-primary text-primary-foreground">
          <Link href="#" className="flex items-center gap-3 px-4 py-4">
            <User className="size-5" />
            <span className="text-base">My account</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-4">
            <Plus className="size-5" />
            <span className="text-base">Enter your unique code</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-4">
            <MapPin className="size-5" />
            <span className="text-base">Find a store</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export interface HeaderProps {
  promoMessage?: string;
}

export function Header({
  promoMessage = "We're doubling your loyalty points!",
}: HeaderProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedAccordions, setExpandedAccordions] = useState<string[]>([]);

  const activeItem = NAV_ITEMS.find(
    (item) => item.label === activeMenu && item.megaMenu
  );

  const toggleAccordion = (label: string) => {
    setExpandedAccordions((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  return (
    <header className="relative z-30 w-full">
      {/* Promo top bar */}
      <div className="flex h-10 w-full items-center justify-center bg-primary px-4">
        <p className="truncate text-center text-sm text-white md:text-base">
          {promoMessage}
        </p>
      </div>

      {/* Main header row */}
      <div className={cn(CONTAINER, "flex items-center gap-4 bg-white py-3")}>
        <Link href="/" aria-label="Caudalie home" className="flex items-center">
          <LogoIcon className="h-[30px] w-auto text-primary md:h-10" />
        </Link>

        <div className="flex-1" />

        <div className="flex items-center gap-4 md:gap-5">
          <MapPin className="hidden size-6 text-primary lg:block" />
          <div className="relative">
            <User className="size-6 text-primary" />
            <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-destructive" />
          </div>
          <ShoppingBag className="size-6 text-primary" />
        </div>
      </div>

      {/* Primary nav row (desktop only) */}
      <div
        className="relative hidden bg-white lg:block"
        onMouseLeave={() => setActiveMenu(null)}
      >
        <nav className={cn(CONTAINER, "flex items-center gap-6 py-2")}>
          <ul className="flex flex-1 items-center gap-6">
            {NAV_ITEMS.filter((item) => item.variant !== "pill-grey").map((item) => (
              <li
                key={item.label}
                onMouseEnter={() => item.megaMenu && setActiveMenu(item.label)}
              >
                <Link href={item.href ?? "#"} className="inline-block py-1">
                  <NavLabel item={item} />
                </Link>
              </li>
            ))}
          </ul>
          <Link href="#">
            <NavLabel
              item={NAV_ITEMS.find((i) => i.variant === "pill-grey")!}
            />
          </Link>
        </nav>

        {activeItem?.megaMenu && (
          <div
            className="absolute top-full left-0 z-20 w-full border-t border-border bg-white shadow-lg"
            onMouseEnter={() => setActiveMenu(activeItem.label)}
          >
            <MegaMenu content={activeItem.megaMenu} />
          </div>
        )}
      </div>

      {/* Search bar row */}
      <div className="sticky top-0 z-10 w-full border-b bg-white lg:relative lg:border-b-0">
        <div className={cn(CONTAINER, "flex items-center gap-3 py-2")}>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            className="flex size-6 items-center justify-center text-primary lg:hidden"
          >
            <Menu className="size-6" />
          </button>
          <div className="relative flex h-10 flex-1 items-center rounded-md bg-secondary px-2">
            <Search className="size-5 shrink-0 text-primary" />
            <input
              type="search"
              placeholder="Search for a product, a treatment.."
              className="h-full flex-1 bg-transparent px-2 text-base text-primary placeholder:text-primary/60 focus:outline-none"
            />
            <Mic className="size-5 shrink-0 text-primary" />
          </div>
        </div>
      </div>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        expanded={expandedAccordions}
        onToggle={toggleAccordion}
      />
    </header>
  );
}

export default Header;
