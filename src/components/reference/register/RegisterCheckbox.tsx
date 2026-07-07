"use client";

import { cn } from "@/lib/utils";

interface RegisterCheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
  error?: string;
}

export function RegisterCheckbox({
  id,
  checked,
  onChange,
  label,
  error,
}: RegisterCheckboxProps) {
  return (
    <div className="mt-4">
      <label htmlFor={id} className="flex items-start gap-3 text-primary">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className={cn(
            "mt-0.5 size-5 shrink-0 rounded-md border-2 accent-primary",
            error ? "border-red-600" : "border-primary/40"
          )}
        />
        <span>{label}</span>
      </label>
      {error ? <p className="mt-1 ml-8 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
