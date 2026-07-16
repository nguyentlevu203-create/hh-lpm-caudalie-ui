"use client";

import type { ReactNode } from "react";
import { beVietnamPro, cormorantGaramond, cormorantGaramondItalic } from "@/lib/hh-fonts";
import { cn } from "@/lib/utils";
import { SiteUIProvider } from "@/components/hh/SiteUIContext";
import { AccountProvider } from "@/components/hh/AccountContext";
import { CartDrawer } from "@/components/hh/cart/CartDrawer";
import { SearchOverlay } from "@/components/hh/search/SearchOverlay";
import { AuthOverlay } from "@/components/hh/auth/AuthOverlay";
import { MobileDrawer } from "@/components/hh/layout/MobileDrawer";
import { StickyMobileCta } from "@/components/hh/layout/StickyMobileCta";
import { DemoBanner } from "@/components/hh/layout/DemoBanner";

/**
 * Root wrapper for every Hoàng Hà / Le Petit Marseillais production page.
 * Applies the HH font + color tokens scoped to this subtree only (via the
 * `font-hh`/`bg-hh-cream`/`text-hh-ink` utilities added in globals.css) —
 * it never touches `<html>`/`<body>` in the root layout, so it has zero
 * effect on `/reference/*` pages or their Caudalie fonts/tokens. Also
 * mounts the single-overlay UI provider and the 4 global overlays (cart,
 * search, auth, mobile nav) once per page so any descendant can trigger
 * them without prop drilling.
 */
export function HHShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <SiteUIProvider>
      <AccountProvider>
        <div
          className={cn(
            beVietnamPro.variable,
            cormorantGaramond.variable,
            cormorantGaramondItalic.variable,
            "font-hh flex min-h-screen flex-col bg-hh-cream pb-20 text-hh-ink lg:pb-0",
            className
          )}
        >
          <DemoBanner />
          {children}
          <StickyMobileCta />
          <CartDrawer />
          <SearchOverlay />
          <AuthOverlay />
          <MobileDrawer />
        </div>
      </AccountProvider>
    </SiteUIProvider>
  );
}
