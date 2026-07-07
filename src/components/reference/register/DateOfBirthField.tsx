"use client";

import { cn } from "@/lib/utils";

interface DateOfBirthFieldProps {
  day: string;
  month: string;
  year: string;
  onDayChange: (value: string) => void;
  onMonthChange: (value: string) => void;
  onYearChange: (value: string) => void;
  error?: string;
}

export function DateOfBirthField({
  day,
  month,
  year,
  onDayChange,
  onMonthChange,
  onYearChange,
  error,
}: DateOfBirthFieldProps) {
  const inputClassName = cn(
    "mt-1 block w-full border-b bg-transparent pb-2 text-primary focus:outline-none",
    error ? "border-red-600" : "border-primary/40"
  );

  return (
    <div className="mt-2">
      <label className="text-sm font-bold text-primary md:text-base">
        Date of Birth<span aria-hidden="true">*</span>
      </label>
      <div className="flex gap-4">
        <div className="flex-1">
          <input
            aria-label="Day"
            type="text"
            placeholder="Day"
            value={day}
            onChange={(event) => onDayChange(event.target.value)}
            className={inputClassName}
          />
        </div>
        <div className="flex-1">
          <input
            aria-label="Month"
            type="text"
            placeholder="Month"
            value={month}
            onChange={(event) => onMonthChange(event.target.value)}
            className={inputClassName}
          />
        </div>
        <div className="flex-1">
          <input
            aria-label="Year"
            type="text"
            placeholder="Year"
            value={year}
            onChange={(event) => onYearChange(event.target.value)}
            className={inputClassName}
          />
        </div>
      </div>
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
