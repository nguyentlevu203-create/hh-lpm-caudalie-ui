"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, ChevronLeft, ChevronDown } from "@/components/icons";
import { REGISTER_COUNTRIES } from "@/components/reference/register/data";
import { PhoneNumberField } from "@/components/reference/register/PhoneNumberField";
import { DateOfBirthField } from "@/components/reference/register/DateOfBirthField";
import { RegisterCheckbox } from "@/components/reference/register/RegisterCheckbox";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface RegisterErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  dob?: string;
  terms?: string;
}

function isOver16(day: string, month: string, year: string): boolean {
  const birthDate = new Date(Number(year), Number(month) - 1, Number(day));
  const sixteenthBirthday = new Date(
    birthDate.getFullYear() + 16,
    birthDate.getMonth(),
    birthDate.getDate()
  );
  return sixteenthBirthday.getTime() <= Date.now();
}

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState(REGISTER_COUNTRIES[0].code);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const country =
    REGISTER_COUNTRIES.find((c) => c.code === countryCode) ??
    REGISTER_COUNTRIES[0];

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: RegisterErrors = {};

    if (!email.trim()) {
      nextErrors.email = "This field is required";
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      nextErrors.email = "Invalid email address";
    }
    if (!firstName.trim()) nextErrors.firstName = "This field is required";
    if (!lastName.trim()) nextErrors.lastName = "This field is required";
    if (!phone.trim()) nextErrors.phone = "This field is required";

    if (!password) {
      nextErrors.password = "This field is required";
    } else if (password.length < 6) {
      nextErrors.password = "The password must be at least 6 characters.";
    }
    if (!confirmPassword) {
      nextErrors.confirmPassword = "This field is required";
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = "The passwords are different";
    }

    if (!day.trim() || !month.trim() || !year.trim()) {
      nextErrors.dob = "This field is required";
    } else if (!isOver16(day, month, year)) {
      nextErrors.dob = "Clients must be over 16";
    }

    if (!terms) nextErrors.terms = "This field is required";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto w-full max-w-[768px] text-center">
        <h1 className="mb-4 text-xl text-primary">Register</h1>
        <p className="text-primary">
          Your account for <span className="font-bold">{email}</span> has
          been created.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[768px]">
      <Link href="/reference/login" className="flex items-center text-primary">
        <ChevronLeft className="mr-2 size-4" aria-hidden="true" />
        Go back
      </Link>

      <h1 className="mt-4 mb-4 text-center text-xl text-primary">Register</h1>

      <form noValidate onSubmit={handleSubmit}>
        <div className="mt-2">
          <label
            htmlFor="register-email"
            className="text-sm text-primary md:text-base"
          >
            Your email<span aria-hidden="true">*</span>
          </label>
          <input
            id="register-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={cn(
              "mt-1 block w-full border-b bg-transparent pb-2 text-primary focus:outline-none",
              errors.email ? "border-red-600" : "border-primary/40"
            )}
          />
          {errors.email ? (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          ) : null}
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-4">
          <div className="mt-2">
            <label
              htmlFor="register-first-name"
              className="text-sm text-primary md:text-base"
            >
              First Name<span aria-hidden="true">*</span>
            </label>
            <input
              id="register-first-name"
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              className={cn(
                "mt-1 block w-full border-b bg-transparent pb-2 text-primary focus:outline-none",
                errors.firstName ? "border-red-600" : "border-primary/40"
              )}
            />
            {errors.firstName ? (
              <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
            ) : null}
          </div>
          <div className="mt-2">
            <label
              htmlFor="register-last-name"
              className="text-sm text-primary md:text-base"
            >
              Last Name<span aria-hidden="true">*</span>
            </label>
            <input
              id="register-last-name"
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              className={cn(
                "mt-1 block w-full border-b bg-transparent pb-2 text-primary focus:outline-none",
                errors.lastName ? "border-red-600" : "border-primary/40"
              )}
            />
            {errors.lastName ? (
              <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
            ) : null}
          </div>

          <PhoneNumberField
            country={country}
            value={phone}
            onChange={setPhone}
            error={errors.phone}
          />

          <div className="mt-2">
            <label
              htmlFor="register-country"
              className="text-sm text-primary md:text-base"
            >
              Country
            </label>
            <div className="relative">
              <select
                id="register-country"
                value={countryCode}
                onChange={(event) => setCountryCode(event.target.value)}
                className="mt-1 block w-full appearance-none border-b border-primary/40 bg-transparent pb-2 text-primary focus:outline-none"
              >
                {REGISTER_COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-0 top-1 size-4 text-primary"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="mt-2">
            <label
              htmlFor="register-password"
              className="text-sm text-primary md:text-base"
            >
              Password<span aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
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

          <div className="mt-2">
            <label
              htmlFor="register-confirm-password"
              className="text-sm text-primary md:text-base"
            >
              Confirm Password<span aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <input
                id="register-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className={cn(
                  "mt-1 block w-full border-b bg-transparent pb-2 pr-8 text-primary focus:outline-none",
                  errors.confirmPassword
                    ? "border-red-600"
                    : "border-primary/40"
                )}
              />
              <button
                type="button"
                aria-label={
                  showConfirmPassword ? "Hide Password" : "Show Password"
                }
                onClick={() =>
                  setShowConfirmPassword((value) => !value)
                }
                className="absolute right-0 top-0 text-primary"
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-[18px]" aria-hidden="true" />
                ) : (
                  <Eye className="size-[18px]" aria-hidden="true" />
                )}
              </button>
            </div>
            {errors.confirmPassword ? (
              <p className="mt-1 text-xs text-red-600">
                {errors.confirmPassword}
              </p>
            ) : null}
          </div>

          <DateOfBirthField
            day={day}
            month={month}
            year={year}
            onDayChange={setDay}
            onMonthChange={setMonth}
            onYearChange={setYear}
            error={errors.dob}
          />
        </div>

        <RegisterCheckbox
          id="register-newsletter"
          checked={newsletter}
          onChange={setNewsletter}
          label="I would like to receive news and exclusive offers from Caudalie by email."
        />

        <RegisterCheckbox
          id="register-terms"
          checked={terms}
          onChange={setTerms}
          label="By creating my account, I confirm that I am 16 years old or over and I accept the Personal Data Protection Policy.*"
          error={errors.terms}
        />

        <button
          type="submit"
          className="mt-8 h-12 w-full rounded-md bg-primary text-base text-primary-foreground"
        >
          Create my account
        </button>
      </form>

      <p className="mt-4 text-center text-primary">
        or{" "}
        <Link href="/reference/login" className="underline">
          login in to your account
        </Link>
      </p>
    </div>
  );
}
