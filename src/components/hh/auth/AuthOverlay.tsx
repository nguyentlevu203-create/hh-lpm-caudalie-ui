"use client";

import { useRef, useState } from "react";
import { X } from "lucide-react";
import { useSiteUI } from "@/components/hh/SiteUIContext";
import { useAccount } from "@/components/hh/AccountContext";
import { SignInForm } from "@/components/hh/auth/SignInForm";
import { RegisterForm } from "@/components/hh/auth/RegisterForm";
import { cn } from "@/lib/utils";
import { useFocusTrap } from "@/lib/use-focus-trap";

/** Centered modal that swaps between sign-in and register in place —
 * pattern cloned from /reference/login + /reference/register's shared
 * email-carryover, in-place-view-swap behavior, collapsed into a single
 * overlay component reachable from the header account icon on every page. */
export function AuthOverlay() {
  const { active, close } = useSiteUI();
  const { signIn, register } = useAccount();
  const isOpen = active === "auth";
  const [view, setView] = useState<"sign-in" | "register">("sign-in");
  const [email, setEmail] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, isOpen);

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
        ref={panelRef}
        role="dialog"
        aria-label={view === "sign-in" ? "Đăng nhập" : "Đăng ký thành viên"}
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-x-4 top-1/2 z-50 max-w-md -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl transition-all sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:p-8",
          isOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        )}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Đóng"
          className="absolute right-4 top-4 text-hh-muted-foreground"
        >
          <X className="size-5" />
        </button>
        {view === "sign-in" ? (
          <SignInForm
            email={email}
            onEmailChange={setEmail}
            onSwitchToRegister={() => setView("register")}
            onSuccess={() => {
              signIn(email);
              close();
            }}
          />
        ) : (
          <RegisterForm
            email={email}
            onEmailChange={setEmail}
            onSwitchToSignIn={() => setView("sign-in")}
            onRegister={register}
            onSuccess={close}
          />
        )}
      </div>
    </>
  );
}
