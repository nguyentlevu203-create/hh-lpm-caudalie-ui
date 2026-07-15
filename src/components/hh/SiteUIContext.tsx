"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
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

/**
 * Owns which single overlay (cart drawer / search / auth / mobile nav) is
 * open at a time, plus the cart's line items — so any component in the
 * tree (header icon, a product card's "Thêm vào giỏ" button, the PDP buy
 * box's "Mua ngay") can add a real item and open the same cart drawer
 * without prop drilling. Only one overlay is open at once, matching
 * mobile-first UX (no stacked drawers). Cart state is in-memory only (no
 * persistence) — this is a UI shell, not a wired checkout.
 */
export function SiteUIProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<OverlayKind>(null);
  const [cartLines, setCartLines] = useState<CartLine[]>([CART_SEED_ITEM]);

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
    setActive("cart");
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
    openCart: () => setActive("cart"),
    openSearch: () => setActive("search"),
    openAuth: () => setActive("auth"),
    openMenu: () => setActive("menu"),
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
