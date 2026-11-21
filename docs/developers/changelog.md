---
id: changelog
title: "Growthify developer changelog: API, assistants and webhooks"
sidebar_label: Changelog
sidebar_position: 7
description: "What changed for code, assistants and webhooks connected to Growthify, newest first, starting with the access keys, MCP, webhooks and two-step sign-in on 2026-11-21."
keywords: [growthify changelog, growthify api changes, growthify mcp release, merchant api v1 changes, growthify webhooks release]
last_update:
  date: 2026-11-21
  author: The Growthify team
---

# Developer changelog

Changes to what outside apps can do with Growthify, newest first. Changes inside the app itself are not listed here.

## 2026-11-21 {#2026-11-21}

**Other apps replaces API Keys** on the web dashboard, one store at a time.

- **Access keys** (`gfy_pat_…`) for [the Growthify API](./api.md): Read and Change per part of your store data, Delete as its own tick, shopper records read only. 30, 90 or 365 days, or Never for a key that only reads. Shown again within 10 minutes of signing in. Replace keeps the old key working for 24 hours. See [Access keys](./access-keys.md).
- **The Growthify API** at `https://mldbdtltrxojmqzglupg.supabase.co/functions/v1/api/v1`: store settings, modules, campaigns, bundles and offers, rules, review moderation and reports, plus seven kinds of shopper records read only. OpenAPI 3.1 at `/openapi.json`.
- **Assistants** over MCP at `https://mldbdtltrxojmqzglupg.supabase.co/functions/v1/mcp`, for Claude, ChatGPT, Claude Code and Cursor. One store per connection, chosen on the consent page. Deletes wait for your yes. See [Assistants](./assistants.md).
- **Webhooks**, signed the Standard Webhooks way, for 23 events across campaigns, popups, bundles, reviews, subscribers, loyalty, cash on delivery, order forwarding, returns and reports. Ids, counts and totals only. See [Webhooks](./webhooks.md).
- **Campaign calendar feeds** for Google Calendar and Apple Calendar. See [Calendar feeds](./calendar-feeds.md).
- **Two-step sign-in** for the web dashboard, with ten recovery codes and an opt-in 7-day remembered browser. Required for Growthify team accounts. See [Two-step sign-in](./two-step-sign-in.md).
- **Limits per store plan** for keys, requests a day, webhook addresses, assistants and calendar feeds. See [Limits per plan](./index.md#limits).

**Merchant API v1** keeps working as it did. `saio_` keys are listed in Other apps with a Merchant API v1 badge; Replace turns one into a `gfy_pat_` key. See [Moving from Merchant API v1](./access-keys.md#moving-from-merchant-api-v1).
