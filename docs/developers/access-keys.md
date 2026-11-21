---
id: access-keys
title: "Growthify access keys: make, show, replace and remove"
sidebar_label: Access keys
sidebar_position: 1
description: "A Growthify access key lets your own code read or change one store's data. Choose its reach and expiry, show it again safely, and move from Merchant API v1."
keywords: [growthify access key, gfy_pat, shopify app api key, personal access token, merchant api v1 migration, saio key, api key rotation]
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
          name: 'What does a Growthify access key look like?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It starts with gfy_pat_, followed by 43 random characters and an 8-character check. The check lets Growthify spot a mistyped key before it looks anything up.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I see a Growthify key again after I made it?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, with Show the key in Other apps, within 10 minutes of signing in. If two-step sign-in is on, it asks for the six digits too, even on a browser that skips the code.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why does my key have to run out?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A key that can change or delete always runs out after 30, 90 or 365 days. Only a key that just reads can be kept until you remove it. Growthify emails you a week before any key runs out.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I add more permissions to an existing key?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. A key cannot be widened after it is made. Make a new key with the reach you need, move your code to it, and remove the old one.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens to my Merchant API v1 saio_ key?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It keeps working as it did. Replace makes a gfy_pat_ key with the reach you choose, and the saio_ key keeps working for 24 hours so your code has time to switch.',
          },
        },
      ],
    })}
  </script>
</head>

# Access keys

**An access key is a password for your own code: it lets a script, a spreadsheet job or your developer's app use [the Growthify API](./api.md) for one store.** It reaches only the parts you tick when you make it, and you can take it back in one press.

Keys live on the web dashboard under [**Other apps**](https://growthify.aoneahsan.com/dashboard/other-apps), in the store you pick at the top. A key works like a password, so keep it out of anything you share: a screenshot, a public repository, a page a browser loads.

## Making a key {#making-a-key}

1. In Other apps, choose **Make a key**.
2. **What's it for?** Only you see this name, for example "Nightly review digest".
3. Tick what it can reach. Your store data has **Read** and **Change** per part, and **Delete** where a row can go. Shopper records have one tick each, read only. [The full list](./index.md#what-an-outside-app-can-reach) is on the overview.
4. **Runs out after** 30, 90 or 365 days, or **Never**.
5. **Make the key.** Copy it into your code now. This is the one time it shows without asking.

We email you that a key was made. The key itself is never emailed.

Some rules worth knowing before you tick:

- **Change includes reading.** A key that can change campaigns can read them too.
- **Delete is separate**, and off unless you tick it. Change never implies Delete, so a key can't remove rows because nobody thought about it.
- **A key can't be widened later.** Make a new one instead.
- **Never is only for a key that reads.** A key that can change or delete always runs out. Untick Change and Delete to keep one for good.
- **We email you a week before** any key runs out.

## What a key looks like {#what-a-key-looks-like}

```text
gfy_pat_<43 random characters>_<8-character check>
```

`gfy` is Growthify, `pat` says it is an access key. The check at the end lets Growthify spot a mistyped key before it looks anything up. Your list in Other apps shows the first few characters, so you can tell keys apart without showing one. Growthify keeps a keyed hash to find the key and a sealed copy to show it to you again; neither is readable on its own.

Send it as a bearer token on every request:

```bash
curl https://mldbdtltrxojmqzglupg.supabase.co/functions/v1/api/v1/token \
  -H "Authorization: Bearer $GROWTHIFY_KEY"
```

`/token` answers with what the key is and what it can do. [The API](./api.md) covers every other address.

## Showing a key again {#showing-a-key-again}

**Show the key** works within 10 minutes of signing in. Past that, it reads **Sign in again to show it**: choose your Google account again and you come straight back. With [two-step sign-in](./two-step-sign-in.md) on, it asks for the six digits as well, even on a browser you told to skip the code. The key shows for a short while, then hides.

## Replacing a key {#replacing-a-key}

**Replace** makes a new key with the same name and reach. **The old key keeps working for 24 hours**, so your code has time to switch, then it stops. Its row reads "Stops working …" with the time, and the replacement sits in the list beside it. We email you that a key was replaced.

Replace when a key may have been seen by someone else, when a developer leaves, or on a schedule you choose.

## Removing a key {#removing-a-key}

**Remove** takes two presses: the second one reads "Press again: it stops working now". It stops working straight away, and any request with it gets `invalid_token`.

## Moving from Merchant API v1 {#moving-from-merchant-api-v1}

Keys made for the [Merchant API v1](../api/merchant-api-v1.md) start with `saio_`. They were made before keys had their own settings, and they **keep working as they did**. In Other apps each one shows in the same list with a **Merchant API v1** badge and "Reads only".

A `saio_` key was stored as a hash, so it **can't be shown again**. **Replace** turns it into a `gfy_pat_` key: you choose what the new key reaches and when it runs out, you can show it again later, and the `saio_` key keeps working for 24 hours.

The new key talks to the new API, so your code changes in three places:

| | Merchant API v1 | The Growthify API |
|---|---|---|
| Address | `https://<your-growthify-backend>/api/v1/…` | `https://mldbdtltrxojmqzglupg.supabase.co/functions/v1/api/v1/…` |
| Key | `saio_…` | `gfy_pat_…` |
| Answer | `{ "success": true, "data": … }`, camelCase fields, `meta.nextCursor` | `{ "data": … }`, snake_case fields, `meta.next_cursor`; an error is `{ "error": { "code", "message", "correlation_id" } }` |

Where each v1 address went:

| Merchant API v1 | The Growthify API |
|---|---|
| `GET /api/v1/me` | `GET /token` |
| `GET /api/v1/store` | `GET /modules` (on or off) and `GET /module_plan` (what the plan includes) |
| `GET /api/v1/reviews` | `GET /reviews?status.eq=approved`, and `GET /review_authors/{review id}` for the name a reviewer gave |
| `GET /api/v1/wishlist` | `GET /wishlist_products` |
| `GET /api/v1/usage` | Not in the new API. Keep the `saio_` key if your code reads it |

The promise v1 made about shoppers still holds: no review author's email or order id, and no person behind a wishlist.

## FAQ {#faq}

### What does a key look like? {#faq-shape}

`gfy_pat_`, 43 random characters, then an 8-character check.

### Can I see a key again after I made it? {#faq-show-again}

Yes, within 10 minutes of signing in, and with the six digits when two-step sign-in is on.

### Why does my key have to run out? {#faq-runs-out}

A key that can change or delete is worth more to someone who finds it, so it always has an end date. A key that only reads can last until you remove it.

### Can I add permissions to a key? {#faq-widen}

No. Make a new key with the reach you need, then remove the old one.

### How many keys can a store have? {#faq-how-many}

5 on Free, 25 on Pro and Growth, 50 on Scale. Removed keys don't count.

### Does a key see other stores on my account? {#faq-other-stores}

No. A key reaches the one store it was made for.

## Related pages {#related}

[The API](./api.md) · [Two-step sign-in](./two-step-sign-in.md) · [Overview](./index.md) · [Merchant API v1](../api/merchant-api-v1.md)
