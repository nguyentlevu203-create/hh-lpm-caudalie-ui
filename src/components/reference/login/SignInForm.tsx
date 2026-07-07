"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "@/components/icons";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SignInFormProps {
  email: string;
  onEmailChange: (email: string) => void;
  onForgottenPassword: () => void;
}

export function SignInForm({
  email,
  onEmailChange,
  onForgottenPassword,
}: SignInFormProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      nextErrors.email = "This field is required";
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      nextErrors.email = "Invalid email address";
    }
    if (!password) {
      nextErrors.password = "This field is required";
    }
    setErrors(nextErrors);
  }

  return (
    <div className="w-full max-w-[500px]">
      <h1 className="mb-4 text-center text-xl text-primary">Sign in</h1>

      <form noValidate onSubmit={handleSubmit} className="flex flex-col">
        <div className="mt-2">
          <label
            htmlFor="login-email"
            className="text-sm text-primary md:text-base"
          >
            Your email<span aria-hidden="true">*</span>
          </label>
          <input
            id="login-email"
            type="text"
            autoComplete="email"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            className={cn(
              "mt-1 block w-full border-b bg-transparent pb-2 text-primary focus:outline-none",
              errors.email ? "border-red-600" : "border-primary/40"
            )}
          />
          {errors.email ? (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          ) : null}
        </div>

        <div className="mt-6">
          <label
            htmlFor="login-password"
            className="text-sm text-primary md:text-base"
          >
            Password<span aria-hidden="true">*</span>
          </label>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={cn(
                "mt-1 block w-full border-b bg-transparent pb-2 pr-8 text-primary focus:outline-none",
                errors.password ? "border-red-600" : "border-primary/40"
              )}
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide Password" : "Show Password"}
              onClick={() => setShowPassword((value) => !value)}
              className="absolute right-0 top-0 text-primary"
            >
              {showPassword ? (
                <EyeOff className="size-[18px]" aria-hidden="true" />
              ) : (
                <Eye className="size-[18px]" aria-hidden="true" />
              )}
            </button>
          </div>
          {errors.password ? (
            <p className="mt-1 text-xs text-red-600">{errors.password}</p>
          ) : null}
        </div>

        <div className="mt-2 mb-4 flex items-center justify-center">
          <button
            type="button"
            onClick={onForgottenPassword}
            className="text-sm text-primary underline md:text-base"
          >
            Forgotten password?
          </button>
        </div>

        <button
          type="submit"
          className="h-12 w-full rounded-md bg-primary text-base text-primary-foreground"
        >
          Login
        </button>
      </form>

      <p className="mt-4 mb-2 text-center font-bold text-primary">
        Don&apos;t have an account yet?
      </p>
      <Link
        href="/reference/register"
        className="flex h-12 w-full items-center justify-center rounded-md border-2 border-primary text-base text-primary"
      >
        Register today
      </Link>
    </div>
  );
}
