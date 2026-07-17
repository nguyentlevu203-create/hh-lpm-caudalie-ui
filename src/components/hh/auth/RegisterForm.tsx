"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import type { DemoUser } from "@/components/hh/AccountContext";

interface RegisterFormProps {
  email: string;
  onEmailChange: (value: string) => void;
  onSwitchToSignIn: () => void;
  onRegister: (user: DemoUser) => void;
  onSuccess: () => void;
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
}

function Field({ label, value, onChange, error, type = "text" }: FieldProps) {
  return (
    <div>
      <label className="text-sm text-hh-ink">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "mt-1 w-full border-b bg-transparent py-2 text-sm text-hh-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hh-primary",
          error ? "border-red-500" : "border-hh-border"
        )}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

/** Pattern cloned from /reference/register's RegisterForm (field grid,
 * required-terms checkbox, client-only validation, static "success" swap)
 * but simplified to a leaner mobile-first field set (no country/DOB
 * widgets) matching the "bán hàng nhanh" goal — see production report. */
export function RegisterForm({ email, onEmailChange, onSwitchToSignIn, onRegister, onSuccess }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "Vui lòng nhập họ tên";
    if (!email) nextErrors.email = "Vui lòng nhập email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Email không hợp lệ";
    if (!phone) nextErrors.phone = "Vui lòng nhập số điện thoại";
    if (!password) nextErrors.password = "Vui lòng nhập mật khẩu";
    else if (password.length < 6) nextErrors.password = "Mật khẩu cần tối thiểu 6 ký tự";
    if (confirmPassword !== password) nextErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    if (!agree) nextErrors.agree = "Vui lòng đồng ý điều khoản để tiếp tục";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      onRegister({ name, email, phone });
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <p className="text-xl font-semibold text-hh-ink">Đăng ký thành công</p>
        <p className="text-sm text-hh-muted-foreground">Chào mừng bạn đến với Câu Lạc Bộ Hoàng Hà.</p>
        <button
          type="button"
          onClick={onSuccess}
          className="hh-cta-primary mt-2 h-11 px-6 text-sm"
        >
          Bắt đầu mua sắm
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h2 className="text-center text-xl font-semibold text-hh-ink">Đăng ký thành viên</h2>
      <Field label="Họ và tên" value={name} onChange={setName} error={errors.name} />
      <Field label="Email" value={email} onChange={onEmailChange} error={errors.email} />
      <Field label="Số điện thoại" value={phone} onChange={setPhone} error={errors.phone} />
      <Field label="Mật khẩu" type="password" value={password} onChange={setPassword} error={errors.password} />
      <Field
        label="Xác nhận mật khẩu"
        type="password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        error={errors.confirmPassword}
      />
      <label className="flex items-start gap-2 text-xs text-hh-muted-foreground">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-0.5"
        />
        Tôi đồng ý với điều khoản sử dụng và chính sách bảo mật của Hoàng Hà.
      </label>
      {errors.agree && <p className="text-xs text-red-500">{errors.agree}</p>}

      <button type="submit" className="hh-cta-primary h-11 w-full text-sm">
        Tạo tài khoản
      </button>

      <p className="text-center text-sm text-hh-muted-foreground">
        Đã có tài khoản?{" "}
        <button
          type="button"
          onClick={onSwitchToSignIn}
          className="font-medium text-hh-primary underline underline-offset-2"
        >
          Đăng nhập
        </button>
      </p>
    </form>
  );
}
