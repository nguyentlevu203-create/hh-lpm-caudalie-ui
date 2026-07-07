# Register Page Specification

## Overview
- **Source page:** `https://en.caudalie.com/login` — reached live by clicking "Register today" on the sign-in form. Confirmed via `window.location.href` that this is an **in-place view swap under the same `/login` URL**, not a separate route (same mechanism as the "Forgotten password?" view documented in `login.spec.md`).
- **Target route:** `src/app/reference/register/page.tsx` (a dedicated route, unlike the live site, to match this repo's one-route-per-reference-page convention already used by `/reference/login`, `/reference/search`, `/reference/cart`, etc.)
- **Target components:** `src/components/reference/register/{RegisterForm,PhoneNumberField,DateOfBirthField,RegisterCheckbox,data}.{tsx,ts}`
- **Reused shared chrome:** `Header`/`Footer`, unchanged.
- **Cross-linking:** Since this is a separate route rather than a shared client-state view, `RegisterForm`'s "Go back" and "or login in to your account" both use a Next.js `Link` to `/reference/login`. The existing `/reference/login` `SignInForm`'s "Register today" was updated from an inert button to a `Link` to `/reference/register` — matching the live site's actual click path, without needing to share React state across routes.
- **No real account creation:** all fields are local state; submitting a fully-valid form just swaps to a static "account created" confirmation line (reference-only affordance, clearly not observed live content — creating a real account wasn't attempted).

## Live site structure, verified via Chrome DevTools DOM inspection
```
div.!max-w-full.m-auto
  div.mb-4
    button  "‹ Go back"
  div.w-[768px].max-w-full.m-auto      <- wider than the login form's 500px
    h1.mb-4.text-xl.text-center  "Register"
    form
      div.label-padding.mt-2
        input[type=email]  "Your email"
      div.grid-cols-2.gap-4.md:grid    <- single column on mobile, 2-col from md up
        First Name          | Last Name
        Phone number        | Country (native <select>, no asterisk — optional)
        Password            | Confirm Password
        Date of Birth (day/month/year, full width, no second column)
      label.checkbox  "I would like to receive news..."          (optional)
      label.checkbox  "By creating my account... 16 years old..." (required)
      button[type=submit]  "Create my account"
  p  "or login in to your account"
```
- Container is `w-[768px]` (vs. the sign-in form's `w-[500px]`), confirmed by reading the ancestor chain of the `h1`.
- The `grid-cols-2 gap-4 md:grid` field grid is single-column by default and only becomes a 2-column grid at `md:` — `display:grid` itself is gated behind `md:`, so mobile naturally stacks every field full-width.
- **Phone number** live implementation is a third-party `maz-ui`/`intl-tel-input`-style widget (`m-phone-number-input`) with a flag-image (`flagcdn.com`) + searchable country dropdown + national-number input. Reimplemented as a simplified static version: an emoji flag + dial code + a decorative chevron (no working dropdown) followed by a plain text input — in keeping with "no real functionality," and to avoid hot-linking the live site's external flag CDN.
- **Country** select is a plain native `<select>` with a deliberately short, real list of 15 countries (not a full ISO list) — captured exactly, in order, via the accessibility tree: Ireland (selected by default), Greece, Denmark, Bulgaria, Croatia, Czech Republic, Estonia, Finland, Hungary, Latvia, Lithuania, Romania, Slovakia, Slovenia, Sweden. Stored as `REGISTER_COUNTRIES` in `data.ts` (also carries each country's real dial code, used by the phone field's flag/code display).
- **Checkboxes** are plain `input[type=checkbox]` styled as a rounded-square box (not the login page's round radio look) — confirmed visually via `zoom` screenshots of the unchecked, checked, and error (red border) states.

## Validation, verified live by submitting the real form
All copy below was reproduced directly on `en.caudalie.com`, not guessed:
| Condition | Message |
|---|---|
| Any required field empty (email, first/last name, phone, password, confirm password, terms checkbox) | `This field is required` |
| Email doesn't match a basic email pattern | `Invalid email address` |
| Password shorter than 6 characters | `The password must be at least 6 characters.` |
| Confirm Password doesn't match Password | `The passwords are different` |
| Date of Birth incomplete (any of day/month/year empty) | `This field is required` (one shared error under all three inputs; all three get a red underline) |
| Date of Birth complete but under 16 years old | `Clients must be over 16` (verified live with `15/06/2020`) |
| Country field | Not required — no asterisk, no validation; defaults to Ireland |
| Newsletter checkbox | Optional — never validated |

`RegisterForm.handleSubmit` reproduces every rule above client-side only (no network request), computing the 16-years check from the three text inputs with a real `Date` comparison (`isOver16` in `RegisterForm.tsx`), matching the observed `15/06/2020` → "Clients must be over 16" result.

## Requirements checklist
1. Did not modify `src/app/page.tsx` or any previously completed `/reference/*` route besides the single intentional `Link` swap on `/reference/login`'s "Register today" button (still the same visual button, now real navigation instead of a dead click).
2. New route at `src/app/reference/register/page.tsx`; new components under `src/components/reference/register/`.
3. No real account creation — `RegisterForm` only holds local React state and mock validation; a successful "submit" renders a static confirmation line, not a redirect or API call.
4. Cloned patterns: email/first/last name/phone/country/password/confirm-password/date-of-birth fields, the newsletter + required-terms checkboxes, "Create my account" CTA, and all six real validation/error strings captured live above.
5. `npm run check` (lint + typecheck + build) passes.
