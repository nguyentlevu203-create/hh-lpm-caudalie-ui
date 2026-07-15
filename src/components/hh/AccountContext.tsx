"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const STORAGE_KEY = "hh-demo-account-v1";

export interface DemoUser {
  name: string;
  email: string;
  phone: string;
}

export interface DemoVoucher {
  code: string;
  label: string;
  detail: string;
}

export interface DemoOrderItem {
  slug: string;
  name: string;
  quantity: number;
  price: number | null;
}

export interface DemoOrder {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  note: string;
  paymentMethod: "cod" | "bank_transfer";
  items: DemoOrderItem[];
  subtotal: number;
  hasInquiryItems: boolean;
}

interface AccountState {
  user: DemoUser | null;
  points: number;
  tier: string;
  vouchers: DemoVoucher[];
  wishlist: string[];
  orders: DemoOrder[];
}

const WELCOME_VOUCHERS: DemoVoucher[] = [
  { code: "HHMOI10", label: "Giảm 10% đơn đầu tiên", detail: "Áp dụng cho đơn hàng đầu tiên, tối đa 50.000₫." },
  { code: "HHSHIP0", label: "Miễn phí vận chuyển", detail: "Miễn phí vận chuyển cho đơn từ 199.000₫." },
];

const DEFAULT_STATE: AccountState = {
  user: null,
  points: 0,
  tier: "Chưa là thành viên",
  vouchers: [],
  wishlist: [],
  orders: [],
};

interface AccountContextValue extends AccountState {
  register: (user: DemoUser) => void;
  signIn: (email: string) => void;
  signOut: () => void;
  toggleWishlist: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
  placeOrder: (order: Omit<DemoOrder, "id" | "createdAt">) => DemoOrder;
}

const AccountContext = createContext<AccountContextValue | null>(null);

function loadState(): AccountState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STATE;
  }
}

/**
 * Demo-only account/membership state — register/sign-in create a purely
 * local "session" (no backend, no real password check), persisted to
 * localStorage so points/tier/vouchers/wishlist/order-history survive a
 * refresh within the same browser. Never presented as a real Hoàng Hà
 * account system — see DEMO_DATA_BANNER shown site-wide.
 */
export function AccountProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AccountState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // One-time hydration from localStorage after mount, deliberately not a
    // lazy useState initializer: SSR has no localStorage, so the initializer
    // would return DEFAULT_STATE on the server and the real state on the
    // client's first paint, causing a hydration mismatch. Loading here after
    // mount means the SSR/first-paint markup always matches, then updates
    // once real state is available.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  function register(user: DemoUser) {
    setState((prev) => ({
      ...prev,
      user,
      points: 100,
      tier: "Thành viên Bạc",
      vouchers: WELCOME_VOUCHERS,
    }));
  }

  function signIn(email: string) {
    setState((prev) =>
      prev.user
        ? prev
        : {
            ...prev,
            user: { name: email.split("@")[0] || "Khách hàng", email, phone: "" },
            points: prev.points || 100,
            tier: prev.tier === "Chưa là thành viên" ? "Thành viên Bạc" : prev.tier,
            vouchers: prev.vouchers.length ? prev.vouchers : WELCOME_VOUCHERS,
          }
    );
  }

  function signOut() {
    setState((prev) => ({ ...prev, user: null }));
  }

  function toggleWishlist(slug: string) {
    setState((prev) => ({
      ...prev,
      wishlist: prev.wishlist.includes(slug)
        ? prev.wishlist.filter((s) => s !== slug)
        : [...prev.wishlist, slug],
    }));
  }

  function isWishlisted(slug: string) {
    return state.wishlist.includes(slug);
  }

  function placeOrder(order: Omit<DemoOrder, "id" | "createdAt">): DemoOrder {
    const fullOrder: DemoOrder = {
      ...order,
      id: `HH${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString(),
    };
    setState((prev) => ({
      ...prev,
      orders: [fullOrder, ...prev.orders],
      points: prev.points + Math.round(fullOrder.subtotal / 10000),
    }));
    return fullOrder;
  }

  const value: AccountContextValue = {
    ...state,
    register,
    signIn,
    signOut,
    toggleWishlist,
    isWishlisted,
    placeOrder,
  };

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error("useAccount must be used within AccountProvider (HHShell)");
  return ctx;
}
