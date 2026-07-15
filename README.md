# SnackIt

Quick-serve, vegetarian-first sandwich brand launching in Nadiad, Gujarat.
Next.js (App Router) site with a live ordering flow and waitlist signup
backed by Supabase.

## Stack

- Next.js 16 (App Router, TypeScript, Tailwind CSS v4)
- Supabase (`orders` + `waitlist_signups` tables, anon insert-only via RLS)

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your Supabase publishable key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable (anon) key — safe to expose client-side, access is restricted by row-level security |

Set these in your hosting provider's dashboard (Vercel/Netlify project settings) for production, in addition to `.env.local` for local dev.

## Pages

- `/` — hero, brand story
- `/menu` — all 16 signature dishes, grouped by format (Classic Grilled, Pita Pocket, Sub Roll)
- `/build-your-own` — interactive base + bread + flavor-toss builder
- `/cart` — review/edit cart (persisted to `localStorage`)
- `/checkout` — customer details, places an order into Supabase (`orders` table) for pickup
- `/order-confirmed` — confirmation screen
- `/waitlist` — pre-launch signup, feeds the existing `waitlist_signups` table

## Pricing note

Menu and Build-Your-Own prices in `lib/menu-data.ts` are **launch-estimate
placeholders** — the brand guide only specifies the Premium Ritual add-on
(+₹10-15), not base prices. Update `priceInr` / `basePriceInr` / `addOnInr`
in that file once real pricing is locked.

## Deployment

Not yet deployed. Push to Vercel or Netlify, set the environment variables
above, and it's live. No server-side secrets are required — all Supabase
access is client-side via the publishable key, matching the existing
`waitlist_signups` RLS pattern.
