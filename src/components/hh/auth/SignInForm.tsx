"use client";

import { useState, type FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface SignInFormProps {
  email: string;
  onEmailChange: (value: string) => void;
  onSwitchToRegister: () => void;
  onSuccess: () => void;
}

/** Pattern cloned from /reference/login's SignInForm: bottom-border fields,
 * inline required/invalid-email errors, show/hide password toggle. Local
 * state + mock validation only — no real auth/network call. */
export function SignInForm({ email, onEmailChange, onSwitchToRegister, onSuccess }: SignInFormProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors: typeof errors = {};
    if (!email) nextErrors.email = "Vui lòng nhập email hoặc số điện thoại";
    else if (email.includes("@") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Email không hợp lệ";
    }
    if (!password) nextErrors.password = "Vui lòng nhập mật khẩu";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-center text-xl font-semibold text-hh-ink">Đăng nhập</h2>

      <div>
        <label className="text-sm text-hh-ink">Email hoặc số điện thoại</label>
        <input
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className={cn(
            "mt-1 w-full border-b bg-transparent py-2 text-sm text-hh-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hh-primary",
            errors.email ? "border-red-500" : "border-hh-border"
          )}
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>

      <div className="relative">
        <label className="text-sm text-hh-ink">Mật khẩu</label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={cn(
            "mt-1 w-full border-b bg-transparent py-2 pr-8 text-sm text-hh-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hh-primary",
            errors.password ? "border-red-500" : "border-hh-border"
          )}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShowPassword((v) => !v)}
          aria-label="Hiện hoặc ẩn mật khẩu"
          className="absolute right-0 top-8 text-hh-muted-foreground"
        >
          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
      </div>

      <button type="submit" className="h-11 w-full rounded-md bg-hh-primary text-sm font-semibold text-white">
        Đăng nhập
      </button>

      <p className="text-center text-sm text-hh-muted-foreground">
        Chưa có tài khoản?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="font-medium text-hh-primary underline underline-offset-2"
        >
          Đăng ký ngay
        </button>
      </p>
    </form>
  );
}
