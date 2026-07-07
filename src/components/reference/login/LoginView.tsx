"use client";

import { useState } from "react";
import { SignInForm } from "@/components/reference/login/SignInForm";
import { ForgotPasswordForm } from "@/components/reference/login/ForgotPasswordForm";

export function LoginView() {
  const [view, setView] = useState<"sign-in" | "forgot-password">("sign-in");
  const [email, setEmail] = useState("");

  return (
    <div className="mx-auto flex w-full max-w-[1440px] justify-center px-4 py-6 md:my-12 md:px-8">
      {view === "sign-in" ? (
        <SignInForm
          email={email}
          onEmailChange={setEmail}
          onForgottenPassword={() => setView("forgot-password")}
        />
      ) : (
        <ForgotPasswordForm
          initialEmail={email}
          onGoBack={() => setView("sign-in")}
        />
      )}
    </div>
  );
}
