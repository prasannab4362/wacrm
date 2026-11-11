<p align="center">
  <img src="./public/seivio-logo.svg" alt="Seivio" width="96" height="96">
</p>

<h1 align="center">Seivio</h1>

<p align="center">
  <strong>The WhatsApp CRM for teams that care about every conversation.</strong><br>
  Shared inbox · contacts · sales pipelines · broadcasts · no-code automations · AI replies
</p>

<p align="center">
  Designed by <a href="https://github.com/PRANASH-R"><strong>Pranash</strong></a>
  &amp; <a href="https://github.com/prasannab4362"><strong>Prasanna B</strong></a><br>
  Based on <a href="https://github.com/ArnasDon/wacrm">wacrm</a> by Arnas Donauskas
</p>

<p align="center">
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-7B1E3A.svg" alt="License: MIT"></a>
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs" alt="Next.js 16"></a>
  <a href="https://supabase.com"><img src="https://img.shields.io/badge/Supabase-Postgres%20%2B%20Auth-D8A7B1?logo=supabase" alt="Supabase"></a>
</p>

---

## What Seivio does

- **Shared inbox** on the official WhatsApp Business API — many agents on
  one number, per-conversation assignment, status and notes.
- **Contacts, tags and custom fields** — CSV import and deduplication.
- **Sales pipelines** — Kanban deals linked to conversations.
- **Broadcasts** — Meta-approved templates with per-recipient variables,
  delivery and read tracking.
- **No-code automations and Flows** — triggers on inbound messages, new
  contacts, keywords or schedules; branches, waits, tags, webhooks.
- **AI reply assistant** — bring your own OpenAI / Anthropic /
  OpenAI-compatible key (stored encrypted). One-click drafts, an optional
  auto-reply bot with human handoff, and a knowledge base.
- **Team accounts** — owner / admin / agent / viewer roles, invite links.
- **Public REST API** (`/api/v1`) with scoped API keys and signed outbound
  webhooks — see [docs/public-api.md](./docs/public-api.md).
- **MCP server** — drive Seivio from Claude, Cursor and other AI
  assistants — see [docs/mcp.md](./docs/mcp.md).

## Brand

| | Colour | Hex |
|---|---|---|
| Primary | Burgundy | `#7B1E3A` |
| Surface | Cream | `#F7F0E6` |
| Accent | Dusty pink | `#D8A7B1` |

The palette, product name and credits live in one file:
[`src/config/brand.ts`](./src/config/brand.ts). Theme tokens are in
[`src/app/globals.css`](./src/app/globals.css) (`html[data-theme="seivio"]`
plus the light / dark mode blocks). Light (cream) is the default mode.

## Quick start (local)

```bash
git clone https://github.com/prasannab4362/wacrm.git
cd wacrm
npm install
cp .env.local.example .env.local   # fill in Supabase + Meta values
npx supabase login
npx supabase link --project-ref <your-project-ref>
npx supabase db push --remote      # applies supabase/migrations
npm run dev
```

Open <http://localhost:3000> and sign up — the first user becomes the
account owner.

To receive WhatsApp webhooks locally, expose the dev server with
`ngrok http 3000` and point Meta's callback URL at
`https://<your-tunnel>/api/whatsapp/webhook`.

## Deploy

Step-by-step Hostinger guide: **[docs/deploy-hostinger.md](./docs/deploy-hostinger.md)**.
Seivio runs anywhere Node.js 22+ runs (Hostinger, Vercel, Railway, a VPS).
For containers see [docs/docker.md](./docs/docker.md).

## Documentation

- [Deploy on Hostinger](./docs/deploy-hostinger.md)
- [WhatsApp connection troubleshooting](./docs/whatsapp-connection-troubleshooting.md)
- [Several WABAs on one deployment](./docs/multi-waba.md)
- [Auth emails](./docs/auth-emails.md) — Supabase redirect settings for
  confirmation and password-reset links
- [Public API](./docs/public-api.md)
- [MCP server](./docs/mcp.md)
- [Docker](./docs/docker.md)

## Stack

- **App** — Next.js 16 (App Router), React 19, TypeScript, Tailwind v4.
- **Data** — Supabase (Postgres + Auth + Storage + Realtime + RLS).
- **WhatsApp** — Meta Cloud API (official WhatsApp Business API).

## Designed by

| | |
|---|---|
| **Pranash** | [github.com/PRANASH-R](https://github.com/PRANASH-R) |
| **Prasanna B** | [github.com/prasannab4362](https://github.com/prasannab4362) |

## Credits & license

Seivio is designed by Pranash and Prasanna B and is based on the
open-source [wacrm](https://github.com/ArnasDon/wacrm) template by
Arnas Donauskas, used under the MIT License. Thanks to the wacrm project
for the foundation. Seivio's changes are © 2026 Pranash and Prasanna B,
also under [MIT](./LICENSE).
