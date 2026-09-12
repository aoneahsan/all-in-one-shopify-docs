---
id: page-builder
title: Shopify landing page builder sections in Growthify
sidebar_label: Page Builder
sidebar_position: 12
description: Growthify builds landing pages from reusable theme sections — hero, countdown, features, testimonials, FAQ, comparison and CTA — with no theme code required.
keywords: [shopify page builder, landing page, coming soon page, hero section, countdown page, faq section, cta section, theme app blocks]
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Are page builder sections real pages or popups?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Real sections. They are server rendered app blocks placed inside your theme through the Theme Editor, so their content is in the page markup and is crawlable rather than injected by JavaScript.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is there drag and drop editing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Not a full WYSIWYG canvas. You compose a page by adding and ordering app blocks in the Shopify Theme Editor, which gives you arrangement and live preview but not free form drag and drop. A full editor is explicitly out of scope for now.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I build a coming soon page?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. A coming soon template combines the hero, countdown and CTA sections. It is a starting arrangement you then edit, not a locked layout.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do these sections work with any theme?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'They need an Online Store 2.0 theme that supports app blocks. A vintage theme without app block support cannot place section blocks, though it can still use the app embed.',
          },
        },
        {
          '@type': 'Question',
          name: 'Will page builder content be indexed by search engines?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The content is server rendered into the page markup, so it is crawlable. Whether it is indexed depends on the search engine, your robots and canonical settings, and the page itself. Crawlability is what the module controls.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does the countdown section do anything when it reaches zero?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It is a display element. It does not publish or unpublish a page, change prices, or release inventory. Any action at the deadline is something you schedule yourself.',
          },
        },
      ],
    })}
  </script>
</head>

# Page Builder

**The page-builder module assembles landing pages from reusable, server-rendered theme sections — hero, countdown, features, testimonials, FAQ, comparison and call-to-action — placed through the Shopify Theme Editor without writing theme code.** It covers the recurring need for a campaign page that does not justify a developer.

## Who this page is for

- **Merchants** running a launch, a seasonal campaign or a pre-order announcement.
- **Agencies** who want a client to be able to assemble a page without touching Liquid.
- **Anyone weighing a page builder against a theme customisation**, and wanting to know what this one actually is.

## The section library

| Section | What it is for |
| --- | --- |
| `page-hero` | The headline, supporting line and primary action |
| `page-countdown` | A deadline display for a launch or an offer |
| `page-features` | A structured list of benefits or specifications |
| `page-testimonials` | Quoted customer feedback |
| `page-faq` | Question-and-answer content |
| `page-comparison` | A side-by-side comparison table |
| `page-cta` | A closing call to action |

Each is a theme app block. You add the ones you want, in the order you want, to the page where you want them.

## How composition actually works

This is the part most worth being precise about, because "page builder" implies different things in different products.

Growthify's page builder is **composition through the Shopify Theme Editor**. You add app blocks to a page, order them, and configure each one's settings in the sidebar with live preview. What you get is arrangement, configuration and preview.

What you do not get is a **full drag-and-drop WYSIWYG canvas** with free-form positioning. That is explicitly out of scope for the current module rather than an oversight — it is recorded as a later investment.

The trade is real and worth understanding. Because sections are theme app blocks rather than a proprietary canvas:

- They **inherit your theme's styling**, so pages look like the rest of your store by default.
- They are **server-rendered Liquid**, so content is in the markup rather than painted in by JavaScript.
- They **leave with the app**, cleanly, rather than leaving orphaned markup behind.
- They are limited to what a section block can express, which is less than an arbitrary canvas.

## Templates

A **Coming Soon** template combines the hero, countdown and CTA sections into a starting arrangement.

A template is a starting point, not a locked layout — add, remove and reorder sections afterwards as you would with any others.

## Crawlability

Because sections render server-side into the page markup, their content is **crawlable**: a search engine or an AI crawler that does not execute JavaScript still sees the headline, the feature list and the FAQ text.

That is a genuine and useful property, and it is also the limit of what the module controls. **Crawlable is not the same as indexed.** Whether a page is indexed depends on the search engine, your robots and canonical configuration, and the page's own merit. The module makes content readable; it does not make promises about ranking.

## Surfaces

- **Theme blocks:** `page-hero`, `page-countdown`, `page-features`, `page-testimonials`, `page-faq`, `page-comparison`, `page-cta`.
- **Admin:** the Page Builder area, including template selection.
- **Theme Editor:** where pages are actually composed.

## Theme requirement

You need an **Online Store 2.0 theme that supports app blocks**. A vintage theme cannot place section blocks — it can still use the app embed, so site-wide surfaces such as the consent banner work, but page composition does not.

## What the page builder does not do

- **No full drag-and-drop WYSIWYG editor.** Composition is through the Theme Editor, and a free-form canvas is out of scope.
- **It does not create Shopify pages for you.** You still create the page in Shopify and compose it there.
- **It does not host pages off your store.** Everything lives on your storefront domain.
- **The countdown triggers nothing at zero.** It does not publish or unpublish a page, change prices, or release inventory.
- **It does not A/B test layouts.**
- **It does not write your copy**, and the testimonial section does not supply testimonials — you provide real ones.

## FAQ

### Are these real pages or popups?

Real sections — server-rendered app blocks inside your theme, so their content is in the page markup rather than injected by JavaScript.

### Is there drag-and-drop editing?

Not a full WYSIWYG canvas. You add and order app blocks in the Theme Editor, which gives arrangement and live preview. A free-form editor is explicitly out of scope for now.

### Can I build a coming-soon page?

Yes — a Coming Soon template combines hero, countdown and CTA as a starting arrangement you then edit.

### Do these sections work with any theme?

They need an Online Store 2.0 theme with app-block support. A vintage theme can use the app embed but cannot place section blocks.

### Will page-builder content be indexed?

The content is crawlable because it is server-rendered. Indexing depends on the search engine and your own robots and canonical settings — crawlability is what the module controls.

### Does the countdown do anything at zero?

No. It is a display element; any action at the deadline is something you schedule yourself.

### Where do testimonials come from?

You supply them. The section renders quoted feedback you provide; it does not source or generate testimonials, and publishing invented ones would be a claim you should not make.

## Related pages

- [Theme blocks](../storefront/theme-blocks.md) — the seven page-builder blocks among the full 72.
- [App embed](../storefront/app-embed.md) — the prerequisite for every block.
- [Installation](../getting-started/installation.md) — theme requirements and how blocks are placed.
- [Popups](./popups.md) — the other campaign surface, and when a popup beats a page.
