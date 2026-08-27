"use client";

import { Component, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { beVietnamPro, cormorantGaramond, cormorantGaramondItalic } from "@/lib/hh-fonts";
import { cn } from "@/lib/utils";
import { SiteUIProvider, useSiteUI } from "@/components/hh/SiteUIContext";
import { AccountProvider } from "@/components/hh/AccountContext";
import { StickyMobileCta } from "@/components/hh/layout/StickyMobileCta";
import { DemoBanner } from "@/components/hh/layout/DemoBanner";

/**
 * P2.8 performance pass: these 4 overlays pull in real weight —
 * `SearchOverlay` alone drags in `searchSite()`'s 7 full datasets
 * (products/brand-library/ingredients/articles/content-pages/cards/
 * media-library — the media library JSON alone is ~656KB). `next/dynamic`
 * splits each into its own chunk so it's never part of the shared/main
 * bundle.
 *
 * Phase 9 correction: `next/dynamic` alone does NOT defer the fetch until
 * the user opens the overlay if the component is unconditionally present
 * in the JSX tree (only CSS-hidden) — React's `lazy()`/Suspense underneath
 * `next/dynamic` starts the import() the moment the component is first
 * *rendered*, not the moment it becomes visible. Verified this the wrong
 * way in the original P2.8 pass: `performance.getEntriesByType('resource')`
 * showed all 4 overlay chunks fetched within ~300ms of hydration, before
 * any overlay trigger was ever clicked. `LazyOverlays` below fixes this by
 * only rendering each dynamic component after `SiteUIContext.active` has
 * matched that overlay's key at least once (`everOpened`) — the chunk
 * import genuinely doesn't fire until the first real open. Once opened,
 * the component stays mounted (its own CSS transform still governs
 * show/hide), so a second open is instant with no re-fetch.
 */
const CartDrawer = dynamic(() => import("@/components/hh/cart/CartDrawer").then((m) => m.CartDrawer), { ssr: false });
const SearchOverlay = dynamic(() => import("@/components/hh/search/SearchOverlay").then((m) => m.SearchOverlay), {
  ssr: false,
});
const AuthOverlay = dynamic(() => import("@/components/hh/auth/AuthOverlay").then((m) => m.AuthOverlay), {
  ssr: false,
});
const MobileDrawer = dynamic(() => import("@/components/hh/layout/MobileDrawer").then((m) => m.MobileDrawer), {
  ssr: false,
});

type OverlayKey = "cart" | "search" | "auth" | "menu";

/**
 * Phase 9 hardening: no `error.tsx` exists anywhere in this app (checked —
 * a pre-existing gap, not introduced here), so a client-side render error
 * has no boundary to stop it propagating and taking down the whole page.
 * Splitting the 4 overlays into separate network-fetched chunks (above)
 * adds a new real failure mode that didn't exist when they were bundled
 * inline: a chunk fetch can fail (flaky connection, stale deploy hash after
 * a redeploy). Wrapping each overlay in its own boundary means a failed
 * chunk only removes that one overlay — the rest of the page (and the
 * other 3 overlays) keeps working.
 */
class OverlayErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function LazyOverlays() {
  const { active } = useSiteUI();
  const [everOpened, setEverOpened] = useState<Record<OverlayKey, boolean>>({
    cart: false,
    search: false,
    auth: false,
    menu: false,
  });

  // Adjust state during render (not in an effect) — React's documented
  // pattern for derived state that must be ready before this render
  // commits. Guarded by the `!everOpened[active]` check so it only fires
  // once per overlay key and converges immediately (no render loop): once
  // `everOpened[active]` is true, the condition is false on every
  // subsequent render.
  if (active && !everOpened[active]) {
    setEverOpened((prev) => ({ ...prev, [active]: true }));
  }

  return (
    <>
      {everOpened.cart && (
        <OverlayErrorBoundary>
          <CartDrawer />
        </OverlayErrorBoundary>
      )}
      {everOpened.search && (
        <OverlayErrorBoundary>
          <SearchOverlay />
        </OverlayErrorBoundary>
      )}
      {everOpened.auth && (
        <OverlayErrorBoundary>
          <AuthOverlay />
        </OverlayErrorBoundary>
      )}
      {everOpened.menu && (
        <OverlayErrorBoundary>
          <MobileDrawer />
        </OverlayErrorBoundary>
      )}
    </>
  );
}

/**
 * Root wrapper for every Hoàng Hà / Le Petit Marseillais production page.
 * Applies the HH font + color tokens scoped to this subtree only (via the
 * `font-hh`/`bg-hh-canvas`/`text-hh-ink` utilities added in globals.css) —
 * it never touches `<html>`/`<body>` in the root layout, so it has zero
 * effect on `/reference/*` pages or their Caudalie fonts/tokens. Also
 * mounts the single-overlay UI provider and the 4 global overlays (cart,
 * search, auth, mobile nav) once per page so any descendant can trigger
 * them without prop drilling.
 */
export function HHShell({ children, className }: { children: ReactNode; className?: string }) {
  const pathname = usePathname();
  const isPdp = pathname?.startsWith("/san-pham/") ?? false;

  return (
    <SiteUIProvider>
      <AccountProvider>
        <div
          className={cn(
            beVietnamPro.variable,
            cormorantGaramond.variable,
            cormorantGaramondItalic.variable,
            "font-hh flex min-h-screen flex-col bg-hh-canvas text-hh-ink lg:pb-0",
            isPdp ? "pb-0" : "pb-20",
            className
          )}
        >
          <DemoBanner />
          {children}
          <StickyMobileCta />
          <LazyOverlays />
        </div>
      </AccountProvider>
    </SiteUIProvider>
  );
}
