"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "@/components/icons";

interface ForgotPasswordFormProps {
  initialEmail: string;
  onGoBack: () => void;
}

export function ForgotPasswordForm({
  initialEmail,
  onGoBack,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState(initialEmail);
  const [mode, setMode] = useState<"login-link" | "reset">("login-link");
  const [error, setError] = useState<string | undefined>(undefined);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) {
      setError("This field is required");
      return;
    }
    setError(undefined);
    setSubmitted(true);
  }

  return (
    <div className="mx-auto w-full max-w-[500px]">
      <button
        type="button"
        onClick={onGoBack}
        className="flex items-center text-primary"
      >
        <ChevronLeft className="mr-2 size-4" aria-hidden="true" />
        Go back
      </button>

      <h1 className="mt-4 mb-4 text-center text-xl uppercase text-primary">
        Forgotten password?
      </h1>
      <p className="mb-8 text-center text-primary">
        Enter your email and receive a link to automatically log in without
        your password, or to reset your password.
      </p>

      {submitted ? (
        <p className="text-center text-primary">
          If an account exists for <span className="font-bold">{email}</span>
          , you&apos;ll receive an email shortly.
        </p>
      ) : (
        <form noValidate onSubmit={handleSubmit}>
          <div className="mt-2">
            <label
              htmlFor="forgot-email"
              className="text-sm text-primary md:text-base"
            >
              Your email<span aria-hidden="true">*</span>
            </label>
            <input
              id="forgot-email"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={cn(
                "mt-1 block w-full border-b bg-transparent pb-2 text-primary focus:outline-none",
                error ? "border-red-600" : "border-primary/40"
              )}
            />
            {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
          </div>

          <div className="mt-4 flex flex-col gap-4">
            <label className="flex w-full items-center gap-2 text-primary">
              <input
                type="radio"
                name="forgot-mode"
                checked={mode === "login-link"}
                onChange={() => setMode("login-link")}
              />
              Receive a link by email to log in automatically
            </label>
            <label className="flex w-full items-center gap-2 text-primary">
              <input
                type="radio"
                name="forgot-mode"
                checked={mode === "reset"}
                onChange={() => setMode("reset")}
              />
              Reset my password by receiving an email
            </label>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="h-12 w-full rounded-md bg-primary text-base text-primary-foreground md:w-auto md:px-8"
            >
              Validate
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
