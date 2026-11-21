---
id: index
title: "Growthify for developers: keys, assistants and webhooks"
sidebar_label: Overview
sidebar_position: 0
description: "Reach one store's Growthify settings, campaigns, offers, rules, reviews and reports from your own code, Claude or ChatGPT, webhooks or a calendar feed."
keywords: [growthify api, shopify app api, growthify mcp, claude shopify connector, shopify webhooks, growthify access key, campaign calendar feed]
last_update:
  date: 2026-11-21
  author: The Growthify team
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Where do I set up keys, assistants and webhooks for Growthify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In the Growthify dashboard on the web, under Other apps. Everything there is made for one connected store at a time, and each key, assistant, webhook address and calendar feed reaches only that store.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can an outside app change my shoppers\' details?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Shopper records such as subscribers, chat conversations, loyalty members, cash on delivery orders, saved addresses, wishlists and review authors are read only from outside Growthify, and only a fixed list of fields goes out. Nothing outside Growthify can change, delete or message a shopper.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can an assistant like Claude delete things in my store?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An assistant can only ask. Each delete it asks for sends you a link to Growthify, where you see the item and choose Keep it or Delete it within 10 minutes. Nothing goes until you say yes.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does my old Merchant API v1 key still work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. A saio_ key keeps working as it did and shows in Other apps with a Merchant API v1 badge. It cannot be shown again because it was stored as a hash. Replace turns it into a gfy_pat_ key with the reach you choose, and the old key keeps working for 24 hours.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many keys and requests does my plan allow?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Limits are per store. Free: 5 keys, 5,000 requests a day, 3 webhook addresses, 3 assistants, 2 calendar feeds. Pro and Growth: 25 keys, 50,000 requests, 20 addresses, 10 assistants, 10 feeds. Scale: 50 keys, 100,000 requests, 40 addresses, 25 assistants, 20 feeds.',
          },
        },
      ],
    })}
  </script>
</head>

# Growthify for developers

**Your store's Growthify data can be read and changed from outside Growthify, by apps you connect yourself.** Your own code with an access key, an assistant such as Claude or ChatGPT, a server that hears about each change through a webhook, or a calendar that shows when campaigns send. You set them all up on the web dashboard under [**Other apps**](https://growthify.aoneahsan.com/dashboard/other-apps), one store at a time, on every plan, Free included.

This section is for merchants who want a nightly review digest or a campaign report in their own sheet, the developer or agency they hire, and anyone wiring Growthify into Claude, ChatGPT, Claude Code or Cursor. It covers what each way in can reach, what it can never reach, and the exact requests and messages involved.

## Four ways in {#four-ways-in}

| Way | What it's for | Read |
|---|---|---|
| Access key and the API | Your code lists this week's reviews, pauses a popup, or moves a bundle's end date | [Access keys](./access-keys.md), [The API](./api.md) |
| An assistant | Ask Claude or ChatGPT "which popups are on right now?" or "reply to yesterday's one-star reviews" | [Assistants](./assistants.md) |
| Webhooks | Growthify sends a signed message to your server when a review comes in or a COD order is confirmed | [Webhooks](./webhooks.md) |
| Calendar feed | Google Calendar or Apple Calendar shows when campaigns send and sales start and end | [Calendar feeds](./calendar-feeds.md) |

Making, showing or replacing a key or a webhook secret asks you to have signed in within the last 10 minutes. If [two-step sign-in](./two-step-sign-in.md) is on, it asks for the six digits too.

## One store at a time {#one-store-at-a-time}

Every key, assistant connection, webhook address and calendar feed is made for **one** of the stores linked to your Growthify account. It never reaches another store, even one on the same account. An agency with three client stores makes three keys. When an assistant connects, the consent page asks which store it reaches; connect it again for a second store.

The store also decides the limits, because plans in Growthify belong to a store and Shopify bills them.

## What an outside app can reach {#what-an-outside-app-can-reach}

Growthify holds two kinds of data, and they are treated differently.

**Your store data: read and change.** Only what each key or assistant is ticked for.

| Part | What's in it |
|---|---|
| Store settings | Order and stock notices, the weekly summary, the widget colour, the credit line |
| Modules | Which of the 16 modules are on, and what the store's plan includes |
| Campaigns | Popups, email and SMS campaigns, countdowns and announcement bars |
| Bundles and offers | Bundles, quantity breaks, buy one get one, cart upsells |
| Rules | Discount stacking, price markups, product sync rules |
| Review moderation | Approve or hide a review, feature it, and your replies |
| Reports | Report definitions, schedules and finished runs |

Delete is its own tick, off unless you choose it, and only on parts where a row can go. An assistant never deletes on its own: it asks you first.

**Your shoppers' records: read only.** Never changed or deleted from outside Growthify, whatever a key says. Only the fields listed go out.

| Records | What goes out | What never does |
|---|---|---|
| Email and SMS subscribers | Email or phone number, first and last name, status, where they signed up, signed up on, tags | The messages you sent them |
| Chat conversations | Visitor name, status, rating, each message, who wrote it and when | The visitor's email or browser id |
| Loyalty members | Email, points, lifetime points, tier, joined on | Their order history |
| Cash on delivery orders | Order name, total, verification status, verified or cancelled on | The customer's email or phone: those stay in Shopify |
| Saved addresses | Name, company, address lines, city, province, country and postcode | The phone number |
| Wishlists | How many shoppers saved each product, when it was last saved | Who saved it |
| Review authors | The name they gave, verified purchase or not | Their email or order id |

## What no outside app can ever do {#never}

- Change, delete or message a shopper. Sending a campaign stays a button you press in Growthify.
- Reach another store, even one on this same account.
- See your sign-in, two-step codes, keys, webhook secrets or Shopify billing.
- Change the store's plan, uninstall Growthify or link a new store.
- Delete anything an assistant asks to delete, until you say yes.
- Read a module's own configuration (it can hold provider passwords and keys), a campaign's sender address or audience, or where a finished report is emailed and its file.

## Limits per plan {#limits}

| Per store | Free | Pro | Growth | Scale |
|---|---|---|---|---|
| Access keys | 5 | 25 | 25 | 50 |
| Requests a day | 5,000 | 50,000 | 50,000 | 100,000 |
| Webhook addresses | 3 | 20 | 20 | 40 |
| Assistant connections | 3 | 10 | 10 | 25 |
| Calendar feeds | 2 | 10 | 10 | 20 |

Requests from every key and assistant on a store share the day's number, and the count starts again at midnight UTC. Past it, apps are asked to wait until then; nothing in the store is touched. Other apps shows how much of each the store uses. A store over a lowered limit keeps what it has and can't add more until it's under. Plan prices are on [Billing plans](../admin/billing-plans.md).

## For tools and AI agents {#machine-readable}

- OpenAPI 3.1: [`openapi.json`](https://mldbdtltrxojmqzglupg.supabase.co/functions/v1/api/v1/openapi.json), and the same as Markdown at [`openapi.md`](https://mldbdtltrxojmqzglupg.supabase.co/functions/v1/api/v1/openapi.md). Both answer without a key.
- The MCP address: `https://mldbdtltrxojmqzglupg.supabase.co/functions/v1/mcp`.
- This site's index for language models: [`llms.txt`](pathname:///llms.txt).

## FAQ {#faq}

### Where do I set up keys, assistants and webhooks? {#faq-where}

On the web dashboard under **Other apps**. Everything is made for one connected store at a time. The embedded app in the Shopify admin keeps working as it always has.

### Can an outside app change my shoppers' details? {#faq-shoppers}

No. Shopper records are read only from outside Growthify, and only the fields in the table above go out. Webhooks don't carry them at all.

### Can an assistant delete things in my store? {#faq-assistant-delete}

It can only ask. You get a link to Growthify showing the item, and nothing goes until you press Delete it within 10 minutes.

### Does my old Merchant API v1 key still work? {#faq-v1}

Yes, as it did. [Moving from Merchant API v1](./access-keys.md#moving-from-merchant-api-v1) covers replacing it.

### Do I need a paid plan? {#faq-plan}

No. Every plan has keys, assistants, webhooks and calendar feeds; the plans differ in how many. A paid module still checks the store's plan where it runs, so switching one on through the API doesn't buy it.

## Related pages {#related}

- [Access keys](./access-keys.md) · [The API](./api.md) · [Assistants](./assistants.md) · [Webhooks](./webhooks.md) · [Calendar feeds](./calendar-feeds.md) · [Two-step sign-in](./two-step-sign-in.md) · [Changelog](./changelog.md)
- [Privacy summary](../legal/privacy.md) · [Shopify webhooks Growthify receives](../api/webhooks.md)
