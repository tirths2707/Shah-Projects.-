# SnackIt

Quick-serve, vegetarian-first sandwich brand. Two markets: Nadiad, Gujarat
(India, INR, pay in-store) and Calgary, Alberta (Canada, CAD, pay online).
Next.js (App Router) site with region-aware pricing/checkout, live ordering,
and waitlist signup backed by Supabase.

## Stack

- Next.js 16 (App Router, TypeScript, Tailwind CSS v4)
- Supabase (`orders` + `waitlist_signups` tables, anon insert-only via RLS)
- Stripe Checkout Sessions (Calgary online payment only)
- `proxy.ts` reads Vercel's `x-vercel-ip-country` geolocation header to set
  the visitor's default market — only populated on Vercel deployments, not
  local dev, which always defaults to Nadiad unless you use the region
  switcher in the header

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required for | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Both markets | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Both markets | Supabase publishable (anon) key — safe to expose client-side, access is restricted by row-level security |
| `STRIPE_SECRET_KEY` | Calgary checkout | Server-side only. From dashboard.stripe.com/apikeys. Without it, Calgary checkout fails gracefully with "online payment isn't configured yet" instead of crashing |
| `SUPABASE_SERVICE_ROLE_KEY` | Calgary checkout | Server-side only, bypasses RLS. From Supabase Dashboard → Project Settings → API. Used only in `app/api/checkout/confirm` to mark an order paid after a successful Stripe redirect |

Set these in your hosting provider's dashboard (Vercel project settings) for production, in addition to `.env.local` for local dev.

## Pages

- `/` — hero, brand story, region-aware location badge
- `/menu` — all 16 signature dishes, grouped by format (Classic Grilled, Pita Pocket, Sub Roll)
- `/build-your-own` — interactive base + bread + flavor-toss builder
- `/cart` — review/edit cart (persisted to `localStorage`)
- `/checkout` — customer details; Nadiad places an order for pay-in-store pickup, Calgary redirects to Stripe Checkout
- `/order-confirmed` — confirmation screen; for Calgary, confirms the Stripe session and marks the order paid
- `/waitlist` — pre-launch signup, tags each signup with the visitor's detected market (`source` column) for visibility into where traffic comes from
- `/pos` — full point-of-sale for staff, gated by real Supabase Auth logins:
  - **Live orders** — kitchen display of active online + counter orders with New → Preparing → Ready → Complete status buttons; polls every 5s and highlights new arrivals.
  - **New order** — walk-in counter register: tap the menu to build an order, currency toggle, submit as a paid counter order.
  - **Today** — order counts (total / online / counter) and revenue per market.
  - `/pos/login` is the sign-in page. Uses the existing publishable key (no new env var). Reads/writes go through the logged-in staff session, enforced by RLS (`authenticated` role can read/insert/update orders; anonymous website customers still can't read anything). Excluded from search indexing.

## POS / staff setup

The POS needs at least one staff login. In the Supabase Dashboard:

1. **Authentication → Providers** — confirm the **Email** provider is enabled (it is by default).
2. **Authentication → Users → Add user** — enter an email + password for each staff member, and check **"Auto Confirm User"** (so they can sign in immediately without an email confirmation link).
3. Staff go to `/pos/login` and sign in with those credentials.

No new environment variables are required — the POS authenticates with the same publishable key already configured. RLS was set up (migration `pos_order_channel_and_staff_rls`) so only logged-in staff can read/manage orders.

## Region system

- `lib/regions.ts` — the two market configs (label, currency, payment mode, pickup copy)
- `proxy.ts` — sets a `snackit-region` cookie from Vercel's geolocation header on first visit
- `lib/region-context.tsx` — client context reading that cookie; the header's region switcher lets a visitor override it manually
- `lib/types.ts` — `RegionalPrice` is `Record<RegionId, number>`; every `Dish`, `BreadFormatInfo`, and `ByoFlavorToss` carries both an INR and a CAD price

## Pricing note

Menu and Build-Your-Own prices in `lib/menu-data.ts` are **launch-estimate
placeholders** for both currencies — the brand guide only specifies the
Premium Ritual add-on (+₹10-15) for INR, and the CAD prices are rough
Calgary quick-serve benchmarks, not real numbers from the business. Update
the `CLASSIC` / `POCKET` / `SUB` / `FLAVOR_ADDON` constants near the top of
that file once real pricing is locked for both markets.

## Payment flow (Calgary)

1. Checkout inserts an `orders` row with `payment_status: 'pending'`.
2. `POST /api/checkout/session` creates a Stripe Checkout Session and returns its URL; the browser redirects there.
3. On success, Stripe redirects to `/order-confirmed?session_id=...&order_id=...`.
4. That page calls `GET /api/checkout/confirm`, which retrieves the session from Stripe and — using the service-role key — marks the matching order `paid`.

**Known limitation:** step 4 only runs if the customer's browser actually lands back on `/order-confirmed`. If they close the tab mid-payment, the order stays `pending` forever. The robust fix is a Stripe webhook (`checkout.session.completed`), which needs a `STRIPE_WEBHOOK_SECRET` and registering the endpoint in the Stripe dashboard — not set up here since it requires action in your Stripe account.

## Deployment

Push to Vercel, set the environment variables above, and it's live.
