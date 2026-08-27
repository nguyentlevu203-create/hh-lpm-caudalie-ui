"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { CART_SEED_ITEM } from "@/data/site-content";

type OverlayKind = "cart" | "search" | "auth" | "menu" | null;

export interface CartLine {
  slug: string;
  quantity: number;
}

interface SiteUIContextValue {
  active: OverlayKind;
  openCart: () => void;
  openSearch: () => void;
  openAuth: () => void;
  openMenu: () => void;
  close: () => void;
  cartLines: CartLine[];
  addToCart: (slug: string, quantity?: number) => void;
  updateCartQuantity: (slug: string, delta: number) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
}

const SiteUIContext = createContext<SiteUIContextValue | null>(null);

const CART_STORAGE_KEY = "hh-demo-cart-v1";

function loadCartLines(): CartLine[] {
  if (typeof window === "undefined") return [CART_SEED_ITEM];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [CART_SEED_ITEM];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [CART_SEED_ITEM];
  } catch {
    return [CART_SEED_ITEM];
  }
}

/**
 * Owns which single overlay (cart drawer / search / auth / mobile nav) is
 * open at a time, plus the cart's line items — so any component in the
 * tree (header icon, a product card's "Thêm vào giỏ" button, the PDP buy
 * box's "Mua ngay") can add a real item and open the same cart drawer
 * without prop drilling. Only one overlay is open at once, matching
 * mobile-first UX (no stacked drawers).
 *
 * `cartLines` persists to localStorage (same pattern as `AccountContext`)
 * because `SiteUIProvider` is mounted per-page inside `HHShell` (not once
 * in the root layout) — every route change remounts this provider, so
 * without persistence, any item added on one page silently vanished the
 * moment the user navigated anywhere, including clicking "Đến trang thanh
 * toán" itself. Hydrated after mount, not via a lazy `useState` initializer,
 * to avoid an SSR/first-paint hydration mismatch (server never has
 * localStorage).
 */
export function SiteUIProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<OverlayKind>(null);
  const [cartLines, setCartLines] = useState<CartLine[]>([CART_SEED_ITEM]);
  const [cartHydrated, setCartHydrated] = useState(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCartLines(loadCartLines());
    setCartHydrated(true);
  }, []);

  useEffect(() => {
    if (!cartHydrated) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartLines));
  }, [cartLines, cartHydrated]);

  // Escape-to-close + background-scroll lock for every overlay this
  // provider drives (cart, search, auth, mobile nav) — centralized here
  // since they all key off the same `active` state, instead of duplicating
  // a keydown listener + body-overflow toggle in each of the 4 components.
  useEffect(() => {
    if (!active) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  // P1.1 closure — restore focus to whatever element was focused right
  // before an overlay opened (the header search/cart/account icon, an
  // "Thêm vào giỏ" button, etc.) once it closes, so keyboard users don't
  // lose their place. `openOverlay` captures `document.activeElement`
  // synchronously on open; this effect only fires the restore on the
  // transition to closed, never when switching between two overlays.
  useEffect(() => {
    if (active === null && returnFocusRef.current) {
      returnFocusRef.current.focus();
      returnFocusRef.current = null;
    }
  }, [active]);

  function openOverlay(kind: Exclude<OverlayKind, null>) {
    if (typeof document !== "undefined") {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
    }
    setActive(kind);
  }

  function addToCart(slug: string, quantity = 1) {
    setCartLines((prev) => {
      const existing = prev.find((line) => line.slug === slug);
      if (existing) {
        return prev.map((line) =>
          line.slug === slug ? { ...line, quantity: line.quantity + quantity } : line
        );
      }
      return [...prev, { slug, quantity }];
    });
    openOverlay("cart");
  }

  function updateCartQuantity(slug: string, delta: number) {
    setCartLines((prev) =>
      prev
        .map((line) => (line.slug === slug ? { ...line, quantity: line.quantity + delta } : line))
        .filter((line) => line.quantity > 0)
    );
  }

  function removeFromCart(slug: string) {
    setCartLines((prev) => prev.filter((line) => line.slug !== slug));
  }

  function clearCart() {
    setCartLines([]);
  }

  const value: SiteUIContextValue = {
    active,
    openCart: () => openOverlay("cart"),
    openSearch: () => openOverlay("search"),
    openAuth: () => openOverlay("auth"),
    openMenu: () => openOverlay("menu"),
    close: () => setActive(null),
    cartLines,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
  };

  return <SiteUIContext.Provider value={value}>{children}</SiteUIContext.Provider>;
}

export function useSiteUI() {
  const ctx = useContext(SiteUIContext);
  if (!ctx) throw new Error("useSiteUI must be used within SiteUIProvider (HHShell)");
  return ctx;
}
