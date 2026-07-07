# Login Page Specification

## Overview
- **Source page:** `https://en.caudalie.com/login`
- **Target route:** `src/app/reference/login/page.tsx`
- **Target components:** `src/components/reference/login/{LoginView,SignInForm,ForgotPasswordForm}.tsx`
- **Reused shared chrome:** `Header` and `Footer` (unchanged), matching the `/reference/*` convention.
- **New icons:** Added `Eye` / `EyeOff` to the existing `lucide-react` re-export list in `src/components/icons.tsx` (additive only) for the password-visibility toggle.
- **No real auth:** `LoginView` is a client component that swaps between two in-place views (`sign-in` / `forgot-password`), exactly mirroring the live site's own client-side view swap (confirmed by DOM inspection — the live "Forgotten password?" screen replaces the sign-in form in place, under the same `Go back` control, without a URL change). No network requests are made anywhere; "submit" only runs local mock validation.

## Live site behavior, verified via Chrome DevTools DOM/JS inspection

### Sign-in view
```
main.layout-container
  div (page wrapper)
    div.w-[500px].max-w-full.m-auto
      h1.mb-4.text-xl.text-center  "Sign in"
      form
        div.label-padding.mt-2
          div.relative
            input#login-modal-email[type=username]
            label.required  "Your email"
            p.error-message
        div.label-padding.mt-2
          div.relative
            input#login-modal-password[type=password]
            label.required  "Password"
            button.show-password  (eye icon)
            p.error-message
        div.flex.items-center.justify-center.mt-2.mb-4
          button  "Forgotten password?"  (underlined, text-th-primary)
        div.flex.justify-between
          button[type=submit].button-variant-primary.w-full  "Login"
      div.mt-4.font-bold.text-center.mb-lg
        p  "Don't have an account yet?"
        button.button-variant-secondary.w-full.mt-2  "Register today"
```
- Heading: `h1.mb-4.text-xl.text-center` — "Sign in", centered, no uppercase.
- Both inputs are simple bottom-border (underline) fields with a static label above (not an overlapping Material-style floating label — confirmed visually in the empty, filled, and error states: the label sits above the line in all three).
- **Validation is client-side only, no network call needed to see it**: clicking `Login` with both fields empty synchronously reveals `This field is required` under each field in red, with the input's bottom border turning red. Typing a non-email string (`notanemail`) into the email field and resubmitting instead shows `Invalid email address` for that field while the password field still shows `This field is required`. Reproduced these two exact states live via DevTools before implementing.
- Password field has a `Show Password` icon button (eye icon, `tabindex="-1"`) inside the field, toggling `type="password"` ↔ `type="text"`.
- "Forgotten password?" is a `button`, not a link — underlined, centered.
- "Don't have an account yet?" + "Register today" sit below the form, `Register today` styled as a secondary (outlined) button, same width/height as the primary Login button.

### Forgotten-password view (in-place swap, same route)
```
div.w-[500px].max-w-full.m-auto
  div
    button.flex.items-center  "‹ Go back"
    h1.mb-4.text-xl.text-center.uppercase  "Forgotten password?"
    p.mb-8.text-center  "Enter your email and receive a link to automatically log in without your password, or to reset your password."
    form
      div.label-padding.mt-2
        div.relative.has-value
          input[type=text]  (pre-filled with whatever was in the sign-in email field)
          label.required  "Your email"
          p.error-message
      div.mt-4
        label.radio  "Receive a link by email to log in automatically"  (checked by default)
        label.radio.mt-4  "Reset my password by receiving an email"
      div.mt-8.md:flex.md:justify-center
        button[type=submit].w-full.md:w-auto  "Validate"
```
- Triggered by clicking "Forgotten password?" on the sign-in view — confirmed this is a pure client-side view swap (no navigation, no URL change, no reload).
- The email value already typed on the sign-in view carries over into this view's email field (both are backed by the same underlying form state on the live site).
- Heading is `uppercase` here (unlike "Sign in", which is not), and "Go back" (chevron-left + text) sits above it, confirmed via `read_page` accessibility tree + class dump.
- Two radio options, first one selected by default; "Validate" submit button is full-width on mobile, `md:w-auto` (auto width, centered) on desktop.

## Our implementation
- `LoginView` (client component) owns `view: "sign-in" | "forgot-password"` and the shared `email` string, passed down so the email typed in `SignInForm` carries over into `ForgotPasswordForm`'s initial value — matching the live behavior above.
- `SignInForm`: controlled `email` (lifted) + local `password`/`showPassword`/`errors` state. `onSubmit` runs the same two checks observed live (`required`, then a simple email-pattern check) and renders the identical copy (`This field is required`, `Invalid email address`) with a red underline + red caption, no live network call (per the "no real login" requirement).
- `ForgotPasswordForm`: local `email` (seeded from `initialEmail`), `mode` radio state, `error`, and a `submitted` flag. Submitting with a non-empty email replaces the form with a short confirmation line — a reference-only affordance (the live site's actual post-submit behavior wasn't captured, since triggering it would send a real email) — clearly a mock state, not observed live content.
- Both forms use the existing repo button convention already used by `CartDrawer` (`rounded-md bg-primary text-primary-foreground` / `border-2 border-primary text-primary`), and `text-primary` for all label/heading/link text, matching the live `text-th-primary` purple.
- `Eye` / `EyeOff` from `lucide-react` (already the icon library used throughout the header) render the password-visibility toggle in place of the live site's `icon-eye2` font icon.

## Responsive behavior
- Layout is a single centered column (`w-full max-w-[500px]`), so mobile/tablet/desktop only differ in the outer `Header`/`Footer` chrome (already responsive) and the "Validate" button width breakpoint (`w-full` → `md:w-auto`) — both confirmed on the live site at 1440px and ~955px viewport widths.
- As with the search-results reference page, browser automation in this environment has a platform-enforced minimum window width (~955px), so true phone-width (< 768px) rendering wasn't visually screenshotted live; the mobile-first Tailwind classes used here (`w-full`, no `md:`-gated layout changes beyond the button) are a low-risk, direct continuation of the same single-column structure verified at 955px and 1440px.

## Requirements checklist
1. Did not modify `src/app/page.tsx` or any other `/reference/*` route.
2. New route at `src/app/reference/login/page.tsx`; new components under `src/components/reference/login/`.
3. Reused `Header`/`Footer` unchanged; only additive change outside the new folder is the `Eye`/`EyeOff` re-export in `src/components/icons.tsx`.
4. No real authentication — both forms are local React state with mock validation only, no `fetch`/`action` calls.
5. Cloned patterns: sign-in form, email/password inputs, forgotten-password flow (in-place view swap, pre-filled email, two radio options), register CTA, and the two real validation/error states observed live (`This field is required`, `Invalid email address`).
6. `npm run check` (lint + typecheck + build) passes.
