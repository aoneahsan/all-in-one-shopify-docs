---
id: calendar-feeds
title: "Growthify campaign calendar feeds for Google and Apple"
sidebar_label: Calendar feeds
sidebar_position: 5
description: "Subscribe Google Calendar or Apple Calendar to a Growthify feed that shows when campaigns send and popups, bundles and offers start and end. No shopper is in it."
keywords: [growthify calendar feed, shopify campaign calendar, ics feed shopify, google calendar subscribe url, apple calendar subscription, marketing calendar shopify]
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
          name: 'What can a Growthify calendar feed show?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'One kind of dated item per feed: email or text message campaign send times, popup, countdown, announcement bar, bundle or buy one get one start and end dates, or scheduled report runs. It holds your store\'s dates only, never a shopper.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I add a Growthify feed to Google Calendar?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Copy the feed address from Other apps. In Google Calendar choose Other calendars, then From URL, and paste it. In Apple Calendar choose File, then New Calendar Subscription.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who can see my Growthify calendar feed?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Anyone who has the address, because a calendar app cannot sign in. Treat the address like a password and remove the feed if it is shared by mistake; the calendar stops updating straight away.',
          },
        },
        {
          '@type': 'Question',
          name: 'How often does a Growthify calendar feed update?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Whenever your calendar app checks the address, which each app decides; Google Calendar can take several hours. Growthify answers with the current dates every time.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can a calendar feed change my campaigns?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. A feed only reads dates. Changing a date happens in Growthify, or through the API with an access key.',
          },
        },
      ],
    })}
  </script>
</head>

# Calendar feeds

**A Growthify calendar feed is an address your calendar app subscribes to, so Google Calendar or Apple Calendar shows when your campaigns send and when sales start and end, next to the rest of your week.** It holds your store's dates only. No shopper is ever in it.

It suits a merchant planning a launch around a supplier delivery, or a team that wants the Black Friday popup, the bundle and the email in one view without opening Growthify.

## What a feed can show {#what-it-shows}

Each feed shows one kind of item, so you can colour and hide them separately in your calendar.

| Feed | Each event | Title |
|---|---|---|
| Email campaign send times | The scheduled send | Campaign name |
| Text message campaign send times | The scheduled send | Campaign name |
| Popup start and end dates | From start to end | Popup name |
| Countdown start and end dates | From start to end | Countdown name |
| Announcement bar start and end dates | From start to end | The bar's message |
| Bundle start and end dates | From start to end | Bundle title |
| Buy one, get one start and end dates | From start to end | Offer name |
| Scheduled report runs | The next run | How often it runs |

An item with no date set doesn't appear. A feed covers the last 90 days and the next 400, up to 2,000 events.

## Making a feed {#making-a-feed}

1. In [**Other apps**](https://growthify.aoneahsan.com/dashboard/other-apps), pick the store, then under **Campaign calendar** choose **Make a feed**.
2. **Name**, for example "Marketing calendar". Your calendar shows it as "Growthify: Marketing calendar".
3. **What goes in:** one of the feeds above.
4. **Make the feed.** The address shows once.

Making a feed, or showing its address again, asks for a sign-in within the last 10 minutes, and the six digits when [two-step sign-in](./two-step-sign-in.md) is on.

## Adding it to your calendar {#adding-it}

- **Google Calendar:** Other calendars, then **From URL**. Paste the address.
- **Apple Calendar:** File, then **New Calendar Subscription**. Paste the address.
- **Outlook and others:** look for "subscribe from web" or "add calendar from internet".

The address looks like this, with the feed's id and its own key:

```text
https://mldbdtltrxojmqzglupg.supabase.co/functions/v1/api/v1/calendar/<feed id>.ics?k=gfy_cal_…
```

## Keeping it private {#keeping-it-private}

A calendar app can't sign in, so **anyone with the address sees what's in the feed**. Treat it like a password: don't paste it into a shared document or a public calendar. If it gets out, **Remove** the feed (two presses: "Press again: the calendar stops updating") and make a new one. A removed feed answers "Not found", and your calendar keeps what it had until it next checks.

A wrong or removed address gets a plain "Not found", so it gives nothing away about which feeds exist. A feed answers up to 60 checks an hour, far more than any calendar app makes.

## How fresh it is {#how-fresh}

Growthify answers with the current dates every time your calendar checks. How often it checks is your calendar app's choice: Apple Calendar lets you set it, Google Calendar can take several hours. Times are UTC in the feed, and your calendar shows them in your own time zone.

## How many you can have {#how-many}

Per store: 2 on Free, 10 on Pro and Growth, 20 on Scale.

## FAQ {#faq}

### What can a feed show? {#faq-what}

One kind of dated item per feed: campaign send times, start and end dates of popups, countdowns, bars, bundles and offers, or report runs.

### How do I add it to Google Calendar? {#faq-google}

Other calendars, then From URL, then paste the address.

### Who can see it? {#faq-who}

Anyone with the address. Remove the feed if it's shared by mistake.

### How often does it update? {#faq-often}

Whenever your calendar app checks. Growthify always answers with today's dates.

### Can a feed change a campaign? {#faq-change}

No. It only reads dates.

### Is any shopper in it? {#faq-shopper}

No. Only your store's own items and their dates.

## Related pages {#related}

[Overview](./index.md) · [Access keys](./access-keys.md) · [The API](./api.md) · [Two-step sign-in](./two-step-sign-in.md)
