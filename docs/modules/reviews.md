---
id: reviews
title: Shopify product reviews and moderation in Growthify
sidebar_label: Reviews
sidebar_position: 4
description: Growthify product reviews cover star ratings, a moderation queue, merchant replies, verified-purchase badges and carousel, grid or full-page display.
keywords: [shopify product reviews, star ratings, review moderation, verified purchase badge, reviews carousel, merchant replies, helpful votes]
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Are reviews moderated before they appear?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes by default. New submissions enter a pending queue and appear only once approved. Auto-approve is available if you would rather publish immediately and moderate afterwards.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does the verified purchase badge actually verify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'That the review is linked to a real order for that product in your store. The link is held server side; the order id is never exposed through the public API or the storefront markup.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I reply to a review?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Merchant replies are written from the admin and render beneath the review they answer, with their own timestamp.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do reviews help SEO?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Review text is server-rendered in the block markup, so it is crawlable rather than hidden behind JavaScript. Whether that produces rich results depends on the structured data your theme and the SEO module emit, and on the search engine.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many reviews can I store?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '100 on Free, 1,000 on Pro, 5,000 on Growth and unlimited on Scale. The ceiling applies to stored reviews for the shop and is enforced server side.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can shoppers submit photos or videos with a review?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Not currently. Photo and video reviews are on the module roadmap and are not shipped. The current module covers text reviews with ratings, titles, replies and helpful votes.',
          },
        },
      ],
    })}
  </script>
</head>

# Reviews

**The reviews module is Growthify's social-proof system: shoppers submit ratings and written reviews, merchants moderate and reply to them from the admin, and approved reviews render on the storefront through server-rendered theme blocks.** It is designed so the review workflow a store actually runs — collect, screen, publish, respond — is a first-class path rather than an afterthought.

## Who this page is for

- **Merchants** collecting product feedback and wanting control over what publishes.
- **Agencies** placing review display on product pages and a dedicated all-reviews page.
- **Developers** reading review data out through the [Merchant API](../api/merchant-api-v1.md) into a warehouse or dashboard.

## What you get

- **Star ratings** with an average calculated per product, plus a rating-distribution display.
- **A moderation queue** — every submission lands `pending` and publishes on approval. Auto-approve is available where a community is trusted.
- **Merchant replies**, written from the admin and rendered beneath the review they answer.
- **Verified-purchase badges** for reviews linked to a real order.
- **Featured reviews** you can pin.
- **Helpful votes**, which feed sort order.
- **Display options** — carousel, grid, list, aggregate badges, and a full all-reviews page.

## The review lifecycle

1. A shopper submits a rating, title and body through the review form block.
2. The submission is stored with status `pending`.
3. You **approve** or **reject** it in the admin. With auto-approve on, step 3 happens implicitly and you moderate after the fact.
4. Approved reviews render in whichever display blocks you placed.
5. You may **reply**, **feature**, or later **reject** a published review.
6. Shoppers may mark a review helpful, which influences ordering.

Three statuses exist and they are the ones the API exposes: `pending`, `approved`, `rejected`.

## Surfaces

- **Theme blocks:** `reviews-carousel`, `review-form`, `review-badges`, `all-reviews-page`.
- **Storefront API:** review fetch, review submission, and a helpful-vote endpoint, all behind the [app proxy](../storefront/app-proxy.md).
- **Admin:** the moderation queue, display settings, auto-approve, and reply composition.
- **Merchant API:** `GET /api/v1/reviews`, filterable by status and cursor-paginated.

## Privacy: what a review exposes and what it does not

This deserves stating precisely, because a review record holds more than a review shows.

The stored record includes an **author email** (collected for follow-up) and an **order id** (used to establish verified-purchase status). **Neither is public review content, and neither is returned by the Merchant API.** The API response is assembled from an explicit column list rather than a whole row — so a column added to the model later cannot start leaking through on its own.

What a third-party integration receives is the review body, rating, title, display name, verified flag, status, featured flag, helpful count, any merchant reply, and timestamps.

## Plan limits

Stored reviews per shop: **100 on Free, 1,000 on Pro, 5,000 on Growth, unlimited on Scale.** Review submissions are a metered event, readable as a usage counter through the [Merchant API](../api/merchant-api-v1.md), where a limit of `-1` means unlimited.

## What the reviews module does not do

- **No photo or video reviews.** Text reviews with ratings, replies and helpful votes are what ships; media reviews are roadmap, not product.
- **No review-request email automation** that chases customers after fulfilment.
- **No import from another review app.** Existing reviews are not migrated for you.
- **No Shop app syndication**, which would require Shopify partner approval the app does not hold.
- **No automatic fake-review detection.** Moderation is a human queue; verified-purchase status is a signal, not a verdict.
- **No guarantee of rich results.** Crawlable markup makes review content eligible to be read; search engines decide the rest.

## FAQ

### Are reviews moderated before they appear?

Yes by default — submissions enter a pending queue and publish on approval. Auto-approve is available if you prefer to publish immediately and moderate afterwards.

### What does the verified-purchase badge actually verify?

That the review is linked to a real order for that product in your store. The link is held server-side; the order id never reaches the storefront markup or the public API.

### Can I reply to a review?

Yes. Replies are written in the admin and render beneath the review they answer, with their own timestamp.

### Do reviews help SEO?

Review text is server-rendered in the block markup, so it is crawlable rather than hidden behind JavaScript. Whether that yields rich results depends on the structured data emitted and on the search engine — crawlability is what the module controls.

### How many reviews can I store?

100 on Free, 1,000 on Pro, 5,000 on Growth, unlimited on Scale, enforced server-side.

### Can shoppers submit photos or videos?

Not currently. Photo and video reviews are on the roadmap and are not shipped today.

### Can I pull my reviews into another system?

Yes — `GET /api/v1/reviews` in the [Merchant API](../api/merchant-api-v1.md), filterable by status, cursor-paginated up to 50 per page, and stripped of the reviewer's email and the order id.

## Related pages

- [Merchant API v1](../api/merchant-api-v1.md) — reading reviews out, and exactly which fields are returned.
- [Theme blocks](../storefront/theme-blocks.md) — the four review blocks and where each renders.
- [Billing plans](../admin/billing-plans.md) — review storage limits per tier.
- [Privacy](../legal/privacy.md) — how storefront submissions are handled.
