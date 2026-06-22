# SIPGuru — Wealth Management Platform

A premium, production-grade Next.js mutual fund distribution & SIP advisory platform, built to match the uploaded UI screens pixel-for-pixel.

## Status: Phase 4 of 4 — Core build complete

### Pages matching uploaded screenshots (95-100% visual fidelity)

| Page                                  | Route                             |
| ------------------------------------- | --------------------------------- |
| Homepage                              | `/`                               |
| Investment Quiz                       | `/quiz`                           |
| About Us                              | `/about`                          |
| Knowledge Center hub + articles       | `/knowledge`, `/knowledge/[id]`   |
| Retirement Planner                    | `/calculators/retirement-planner` |
| Fund Categories explorer              | `/funds`                          |
| Portfolio Review                      | `/portfolio-review`               |
| Contact                               | `/contact`                        |
| Client Dashboard                      | `/dashboard`                      |
| Comparison (SIP vs FD vs Gold vs PPF) | `/comparison`                     |

### Additional pages built in Phase 4

| Page                                                                                                                                               | Route                                                      |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| All Calculators index                                                                                                                              | `/calculators`                                             |
| SIP / Lumpsum / Step-up SIP / SWP / Tax Saver / Inflation / Compound Interest / Goal Planner / Child Education / Marriage / Dream Home calculators | `/calculators/[slug]` (11 total, config-driven, real math) |
| Login                                                                                                                                              | `/login`                                                   |
| Register                                                                                                                                           | `/register`                                                |
| Forgot Password                                                                                                                                    | `/forgot-password`                                         |
| OTP Verification                                                                                                                                   | `/verify-otp`                                              |
| Privacy Policy                                                                                                                                     | `/privacy-policy`                                          |
| Terms of Service                                                                                                                                   | `/terms`                                                   |
| SEBI Disclaimers                                                                                                                                   | `/sebi-disclaimer`                                         |
| Investor Charter                                                                                                                                   | `/investor-charter`                                        |
| Thank You                                                                                                                                          | `/thank-you`                                               |
| Coming Soon                                                                                                                                        | `/coming-soon`                                             |
| Maintenance                                                                                                                                        | `/maintenance`                                             |
| 404 (not-found.tsx)                                                                                                                                | any unmatched route                                        |
| Error boundary (error.tsx)                                                                                                                         | catches runtime errors app-wide                            |

**47 total routes**, all statically generated where possible, zero build or lint errors.

### Not yet built (lower priority, can be added on request)

Search Results page, Profile/Settings, Fund Details page, FAQ Detail page (FAQs currently live as accordions on Home/Funds), full i18n coverage for Phase 4 pages (auth/legal/calculators are English-only — Home/About/Quiz/Knowledge/Retirement/Funds/Portfolio/Contact/Dashboard/Comparison have full EN/HI/MR coverage).

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Zustand · Zod · Recharts · Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint check
```

## Architecture Notes

- **Calculator engine**: rather than duplicating a near-identical page 11 times, `lib/calculatorEngine.ts` defines a registry of calculator configs (inputs + a `compute()` function), rendered by one generic `CalculatorRunner` component at the dynamic route `/calculators/[slug]`. Adding a 12th calculator is a ~30-line config addition, not a new page.
- **Real math throughout**: every calculator, the retirement planner, and the comparison page use actual compounding/annuity formulas in `lib/utils/calculators.ts` — nothing is hardcoded to match a mockup's illustrative numbers.
- **Mock auth**: Login/Register/OTP simulate a real flow (validation → delay → redirect) and write a session flag to `localStorage`, but there's no real backend — wire up a real auth provider (NextAuth, Clerk, Supabase, etc.) before going to production.
- **This Next.js install (16.2.9) has a couple of real API differences** from older Next versions that are easy to miss: `params` and `searchParams` in `page.tsx` are now `Promise`s that must be awaited, and `error.tsx` receives `unstable_retry` instead of the classic `reset`. Both are used correctly throughout this codebase — checked against the installed package's own docs rather than assumed from memory.
- **i18n**: English, Hindi, and Marathi dictionaries cover all Phase 1-3 pages. Phase 4 additions (calculators, auth, legal) are English-only for now; they follow the same `useTranslation()` pattern so extending them is mechanical, not architectural.
- **Images**: Hero/about visuals and the contact-page map use CSS/SVG-illustrated placeholders since this sandbox has no outbound access to Unsplash/Pexels or Google Maps. `next.config.ts` already whitelists `images.unsplash.com` and `images.pexels.com`.
- **Bookmarks**: persisted to `localStorage` under `sipguru_bookmarks`. Mock session under `sipguru_session`.
