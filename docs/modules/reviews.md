---
id: reviews
title: Reviews
sidebar_label: Reviews
sidebar_position: 4
description: Growthify product reviews — star ratings, moderation, verified-purchase badges, and carousel, grid, or list display.
keywords: [shopify product reviews, star ratings, review moderation, verified purchase badge, reviews carousel]
---

# Reviews

The reviews module (04) builds trust on product pages with a full review workflow.

## What you get

- **Star ratings** with average-rating calculation per product.
- **Moderation:** approve/reject workflow, with an optional auto-approve setting for trusted communities.
- **Merchant replies** to reviews directly from the admin.
- **Verified-purchase badges** for authentic reviews.
- **Display options:** carousel, grid, or list, plus aggregate review badges.

## Surfaces

- **Theme blocks:** `reviews-carousel`, `review-form`, `review-badges`, `all-reviews-page`.
- **Storefront API:** review submission, fetch, and `POST /apps/growthify/api/reviews/helpful` (mark a review helpful).
- **Admin:** the Reviews module config (moderation queue, display, auto-approve).

## FAQ

**Are reviews moderated before they show?**
Yes by default — submissions enter a moderation queue. You can enable auto-approve if you prefer.

**Can shoppers mark reviews as helpful?**
Yes, via the `reviews/helpful` endpoint; helpful counts feed sort order.

**Do reviews affect SEO?**
Review content is server-rendered in the block markup, so it is crawlable. Pair it with the SEO module's structured-data tools for rich results.
