# Deploy Seivio on Hostinger

This guide takes Seivio from your GitHub repo to a live HTTPS URL on
Hostinger's managed Node.js hosting. The database stays on Supabase;
Hostinger only runs the Next.js app.

## 0. Before you start

- A Hostinger plan that includes **Node.js web apps** (Business or Cloud
  web hosting).
- The Supabase project already migrated (`npx supabase db push --remote`
  shows every migration in both columns of
  `npx supabase migration list --remote`).
- Your code pushed to GitHub (`prasannab4362/wacrm`, branch `main`).
- A domain or subdomain for the app, e.g. `app.seivio.com`.

## 1. Create the Node.js app

1. hPanel → **Websites** → **Add website** → **Node.js app**.
2. Connect GitHub and pick the repository and the `main` branch.
3. Build settings:

   | Setting | Value |
   |---|---|
   | Node.js version | **22.x** |
   | Install command | `npm ci` |
   | Build command | `npm run build` |
   | Start command | `npm start` |

## 2. Environment variables

Add these in hPanel (the app's **Environment variables** section). Copy
the values from your local `.env.local`, with the production changes
noted below.

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | from Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | from Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | from Supabase → Project Settings → API (secret) |
| `ENCRYPTION_KEY` | **same value as local** — changing it orphans saved WhatsApp tokens |
| `META_APP_SECRET` | Meta App → App Settings → Basic |
| `META_APP_ID` | Meta App → App Settings → Basic (needed for image-header templates) |
| `NEXT_PUBLIC_SITE_URL` | `https://app.seivio.com` (your real URL, no trailing slash) |
| `NEXT_PUBLIC_APP_LOCALE` | `en` |
| `AUTOMATION_CRON_SECRET` | same long random string as local |
| `ALLOWED_INVITE_HOSTS` | optional — `app.seivio.com` |

Do **not** set `WHATSAPP_TEMPLATES_DRY_RUN` or `ALLOWED_DEV_ORIGINS` in
production.

`NEXT_PUBLIC_*` values are baked in at build time — redeploy after
changing any of them.

## 3. Domain and HTTPS

1. Attach your domain to the app in hPanel.
2. Enable the free SSL certificate. Meta only delivers webhooks to
   HTTPS URLs.
3. Deploy, then open `https://app.seivio.com/login` — you should see the
   Seivio sign-in screen.

## 4. Supabase auth URLs

Supabase → **Authentication → URL Configuration**:

- **Site URL:** `https://app.seivio.com`
- **Redirect URLs:** add `https://app.seivio.com/auth/callback`

Optional branding: **Authentication → Email Templates** (change the
wording to "Seivio") and **Authentication → SMTP** (send from your own
address instead of Supabase's default sender). See
[auth-emails.md](./auth-emails.md).

## 5. Point Meta at production

Meta for Developers → your app → **WhatsApp → Configuration → Webhook**:

- **Callback URL:** `https://app.seivio.com/api/whatsapp/webhook`
- **Verify token:** the one saved in Seivio → Settings → WhatsApp
- **Webhook fields:** subscribe `messages` (required);
  `message_template_status_update` and
  `message_template_quality_update` (recommended).

Then switch the Meta app to **Live** (App Mode). Unpublished apps only
receive dashboard test events — real customer messages need a live app,
which requires a privacy-policy URL in App Settings → Basic.

For production numbers, use a permanent **System User** access token
(Meta Business Settings → System users) instead of the 24-hour
temporary token.

## 6. Cron (automation waits and flow timeouts)

Automations with **Wait** steps and Flow timeouts are driven by two
endpoints that must be called every minute with the cron secret header:

```
GET https://app.seivio.com/api/automations/cron
GET https://app.seivio.com/api/flows/cron
Header: x-cron-secret: <AUTOMATION_CRON_SECRET>
```

Use hPanel → **Advanced → Cron Jobs** if your plan offers it:

```bash
curl -fsS -H "x-cron-secret: YOUR_SECRET" https://app.seivio.com/api/automations/cron
curl -fsS -H "x-cron-secret: YOUR_SECRET" https://app.seivio.com/api/flows/cron
```

…or a free external scheduler such as cron-job.org with the same URL and
header.

## 7. Smoke test

1. Sign in at `https://app.seivio.com`.
2. Settings → WhatsApp shows **Connected**.
3. Send "hello" from a phone to your business number — it appears in the
   Inbox within a few seconds.
4. Reply from the Inbox — the phone receives it.

If inbound messages don't arrive, check the app logs in hPanel:
`[webhook] rejected request with invalid signature` means
`META_APP_SECRET` is wrong; see
[whatsapp-connection-troubleshooting.md](./whatsapp-connection-troubleshooting.md)
for everything else.

## Updating

Push to `main` → Hostinger rebuilds and redeploys. When a change adds a
file under `supabase/migrations/`, run `npx supabase db push --remote`
**before** the deploy goes live.
