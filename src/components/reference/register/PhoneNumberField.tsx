"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "@/components/icons";
import type { RegisterCountry } from "@/components/reference/register/data";

interface PhoneNumberFieldProps {
  country: RegisterCountry;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function PhoneNumberField({
  country,
  value,
  onChange,
  error,
}: PhoneNumberFieldProps) {
  return (
    <div className="mt-2">
      <label
        htmlFor="register-phone"
        className="text-sm text-primary md:text-base"
      >
        Phone number<span aria-hidden="true">*</span>
      </label>
      <div
        className={cn(
          "mt-1 flex items-center gap-2 border-b pb-2",
          error ? "border-red-600" : "border-primary/40"
        )}
      >
        <span className="flex items-center gap-1 text-primary">
          <span aria-hidden="true">{country.flag}</span>
          <span className="text-sm md:text-base">{country.dialCode}</span>
          <ChevronDown className="size-3.5" aria-hidden="true" />
        </span>
        <input
          id="register-phone"
          type="text"
          inputMode="tel"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full bg-transparent text-primary focus:outline-none"
        />
      </div>
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
