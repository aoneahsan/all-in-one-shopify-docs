---
id: webhooks
title: "Growthify webhooks: events, payloads and signature checks"
sidebar_label: Webhooks
sidebar_position: 4
description: "Growthify sends a short signed message to your server when a review arrives, a campaign sends or a COD order is confirmed. Every event, its payload, and checks."
keywords: [growthify webhooks, standard webhooks, webhook signature verification, hmac sha256 webhook node, webhook python verify, shopify review webhook, whsec secret]
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
          name: 'Do Growthify webhooks include customer names or emails?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. A delivery says what happened, when, and the ids, counts and totals involved. It never carries a shopper\'s name, email, phone or address, and there is no setting that adds them. Your code reads those with an access key, read only.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I check a Growthify webhook is genuine?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Growthify signs every delivery the Standard Webhooks way: an HMAC-SHA256 of the webhook-id, the webhook-timestamp and the raw body, keyed with your whsec_ signing secret, sent in the webhook-signature header. Compute it over the body exactly as it arrived and compare in constant time.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens if my server is down when Growthify sends a webhook?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Growthify tries again after 5 seconds, 5 minutes, 30 minutes, 2 hours, 5 hours, 10 hours and 10 hours, eight tries over about 27 hours, with the same webhook-id each time. An address that fails for 5 days in a row, or answers 410 Gone, is turned off and you are emailed.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I get the same webhook twice?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, after a retry or when you press Send again. The webhook-id stays the same, so keep the ids you have handled and skip one you have seen.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which addresses can receive Growthify webhooks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An https:// address on port 443 or 8443 that the internet can reach. Private networks, addresses with a name and password in them, and Growthify\'s or Shopify\'s own hosts are refused.',
          },
        },
      ],
    })}
  </script>
</head>

# Webhooks

**A Growthify webhook is a short signed message sent to your server when something you choose happens in one of your stores**: a review comes in, a campaign finishes sending, a COD order is confirmed. It says what happened, when, and the ids, counts and totals involved. It never carries a shopper's name, email, phone or address, and there is no switch that adds them: your code reads those with an [access key](./access-keys.md), read only.

These are the webhooks Growthify **sends to you**. The ones Shopify sends to Growthify (app uninstalled, GDPR requests) are on [Shopify webhooks](../api/webhooks.md).

## Adding an address {#adding-an-address}

1. In [**Other apps**](https://growthify.aoneahsan.com/dashboard/other-apps), pick the store, then under **Webhooks** choose **Add an address**.
2. **Where we send it:** an `https://` address your code listens on.
3. **A note for you**, optional.
4. **When to send:** tick the events, grouped below.
5. **Add the address.** The signing secret shows once. Your code uses it to check each delivery came from us.

We email you that an address was added. Adding one asks for a sign-in within the last 10 minutes, and the six digits when [two-step sign-in](./two-step-sign-in.md) is on.

Growthify refuses an address that isn't `https://`, uses a port other than 443 or 8443, carries a name and password, sits on a private network, or belongs to Growthify or Shopify. Each refusal says which.

## Events {#events}

Every event comes from a real change in the store, whoever made it: you in the embedded app, a shopper on the storefront, a scheduled job, or the API.

| Group | Event | When |
|---|---|---|
| Campaigns | `campaign.scheduled` | A send time set on an email or SMS campaign |
| | `campaign.sent` | Finished sending, with recipient and sent counts |
| | `campaign.deleted` | A campaign removed |
| Popups | `popup.activated` | Turned on |
| | `popup.paused` | Turned off |
| | `popup.submitted` | A shopper filled one in: the popup id and whether they ticked consent |
| Bundles and offers | `bundle.created` | A bundle made |
| | `bundle.updated` | Products, discount or dates changed |
| | `bundle.deleted` | A bundle removed |
| Reviews | `review.received` | A new review: product id, rating, verified or not |
| | `review.moderated` | You approved or hid one |
| | `review.replied` | You replied |
| Subscribers | `subscriber.joined` | Someone signed up: the subscriber id, channel and source |
| | `subscriber.left` | Someone unsubscribed: the subscriber id |
| Loyalty | `loyalty.member_joined` | A member joined: member and customer ids only |
| Cash on delivery | `cod_order.verified` | A COD order confirmed: order id and total |
| | `cod_order.failed` | Not confirmed in time, or cancelled: order id and total |
| Order forwarding | `forwarded_order.sent` | Sent to the supplier: order, supplier and cost |
| | `forwarded_order.shipped` | The supplier shipped it: order id and carrier |
| | `forwarded_order.delivered` | Marked delivered |
| Returns | `return.requested` | A return asked for: order id and refund total |
| Reports | `report.completed` | A report run finished: report id and row count |
| | `report.failed` | A run failed |

Plus `webhook.test`, sent only to one address when you press **Send a test event**.

## What a delivery carries {#what-a-delivery-carries}

A `POST` with `Content-Type: application/json`, `User-Agent: Growthify-Webhooks/1.0` and three signature headers:

```http
POST /hooks/growthify HTTP/1.1
Content-Type: application/json
User-Agent: Growthify-Webhooks/1.0
webhook-id: msg_4f0c9a2e7b1d4e6f8a3c5b7d9e1f2a4c
webhook-timestamp: 1795270109
webhook-signature: v1,ZalrhbasG4wDveT2kDL2Yi8mIXov+QMqqvQoUENF5gs=
```

```json
{
  "type": "review.received",
  "timestamp": "2026-11-21T09:14:07.512Z",
  "data": {
    "review_id": "cm3r0b9tz0011mk08q2v4c7dn",
    "product_id": "8123456789012",
    "rating": 5,
    "verified": true,
    "store": "northwind-coffee.myshopify.com",
    "occurred_at": "2026-11-21T09:14:07.512391+00:00"
  }
}
```

`type` is the event. `timestamp` and `data.occurred_at` are when it happened. `data.store` is the store's myshopify.com address, so one server can listen for several stores. The rest of `data` is the event's own fields, below. Times copied from a store record, such as a campaign's `scheduled_at`, carry no offset: they are UTC.

### Every event's data {#event-data}

Each line shows `data` without `store` and `occurred_at`, which every store event has.

```json
{ "campaign.scheduled": { "campaign_id": "cm3t1x0aa0007lf08n4k2b6qz", "channel": "email", "scheduled_at": "2026-11-28T09:00:00" } }
{ "campaign.sent": { "campaign_id": "cm3t1x0aa0007lf08n4k2b6qz", "channel": "email", "total_recipients": 1840, "sent_count": 1832 } }
{ "campaign.deleted": { "campaign_id": "cm3t2c7pe0001ka08g9r3m1xv", "channel": "sms" } }
{ "popup.activated": { "popup_id": "cm3qk2x7b0004l708h1z9e5ra" } }
{ "popup.paused": { "popup_id": "cm3qk2x7b0004l708h1z9e5ra" } }
{ "popup.submitted": { "popup_id": "cm3qk2x7b0004l708h1z9e5ra", "submission_id": "cm3u8f1yd0009mz08t7c2q4ls", "consent": true } }
{ "bundle.created": { "bundle_id": "cm3s7d2kq0002jp08x1y5f9wb" } }
{ "bundle.updated": { "bundle_id": "cm3s7d2kq0002jp08x1y5f9wb" } }
{ "bundle.deleted": { "bundle_id": "cm3s7d2kq0002jp08x1y5f9wb" } }
{ "review.received": { "review_id": "cm3r0b9tz0011mk08q2v4c7dn", "product_id": "8123456789012", "rating": 5, "verified": true } }
{ "review.moderated": { "review_id": "cm3r0b9tz0011mk08q2v4c7dn", "status": "approved" } }
{ "review.replied": { "review_id": "cm3r0b9tz0011mk08q2v4c7dn" } }
{ "subscriber.joined": { "subscriber_id": "cm3v0n6hb0003pq08e5w8j2kc", "channel": "email", "source": "popup" } }
{ "subscriber.left": { "subscriber_id": "cm3v0n6hb0003pq08e5w8j2kc", "channel": "email" } }
{ "loyalty.member_joined": { "member_id": "cm3w4r2gk0006ls08b1n7d3yt", "customer_id": "7012345678901" } }
{ "cod_order.verified": { "cod_order_id": "cm3x9a5je0002hk08v6p1s8fm", "order_id": "5634217890123", "order_total": 4599 } }
{ "cod_order.failed": { "cod_order_id": "cm3x9b8lw0004hk08c2t9r5qe", "order_id": "5634217890456", "order_total": 2150 } }
{ "forwarded_order.sent": { "forwarded_order_id": "cm3y2e4tn0001gd08m8x3v6wa", "shopify_order_id": "5634217890789", "supplier_id": "cm3k1p9qs0000ab08f2h6z4ne", "total_cost": 1820, "currency": "USD" } }
{ "forwarded_order.shipped": { "forwarded_order_id": "cm3y2e4tn0001gd08m8x3v6wa", "shopify_order_id": "5634217890789", "carrier": "DHL" } }
{ "forwarded_order.delivered": { "forwarded_order_id": "cm3y2e4tn0001gd08m8x3v6wa", "shopify_order_id": "5634217890789" } }
{ "return.requested": { "return_id": "cm3z6h1cx0008qw08y4b2n9lu", "order_id": "5634217890123", "refund_total": 24.5 } }
{ "report.completed": { "report_id": "cm3m3s0vf0002ty08k7q1w5ri", "run_id": "cm3za0d8r0005ue08p3f6x2og", "row_count": 312 } }
{ "report.failed": { "report_id": "cm3m3s0vf0002ty08k7q1w5ri", "run_id": "cm3za1g4m0007ue08h9k2c5vb", "row_count": null } }
```

`order_total` on COD orders is in cents. A test event is `{ "type": "webhook.test", "timestamp": "…", "data": { "message": "Test event" } }`, with no `store`.

That is all a delivery holds. For a reviewer's name, a subscriber's email or a review's words, read the record with a key that has the tick for it.

## Checking a delivery came from Growthify {#checking-a-delivery}

Growthify signs every delivery the [Standard Webhooks](https://www.standardwebhooks.com/) way:

- The signed text is `webhook-id`, a dot, `webhook-timestamp`, a dot, then the raw body.
- The key is your signing secret without its `whsec_` prefix, base64-decoded.
- `webhook-signature` is `v1,` followed by the base64 HMAC-SHA256. During a [secret swap](#replacing-the-secret) it holds two, separated by a space; accept either.

Three rules decide whether your check holds:

1. **Use the body exactly as it arrived.** Parsing the JSON and turning it back into text changes the bytes and the signature no longer matches.
2. **Refuse a timestamp more than five minutes from now**, so a captured delivery can't be sent again later.
3. **Compare in constant time.**

An off-the-shelf Standard Webhooks library works too. Both samples below were checked against a signature made by Growthify's own signer, with the current secret and the previous one, and refuse a changed body, a wrong secret and a stale timestamp.

### Node {#node}

```js
import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * True when a delivery was signed by Growthify with `secret` and is less than five minutes old.
 * `rawBody` is the body exactly as it arrived, as a string. Never JSON.parse and re-stringify it first.
 */
export function verifyGrowthify(secret, headers, rawBody, nowSeconds = Math.floor(Date.now() / 1000)) {
  const id = headers['webhook-id'];
  const timestamp = headers['webhook-timestamp'];
  const signatures = headers['webhook-signature'];
  if (!id || !timestamp || !signatures || !/^\d+$/.test(timestamp)) return false;
  if (Math.abs(nowSeconds - Number(timestamp)) > 300) return false;

  const key = Buffer.from(secret.replace(/^whsec_/, ''), 'base64');
  const expected = createHmac('sha256', key).update(`${id}.${timestamp}.${rawBody}`).digest();

  return signatures.split(' ').some((part) => {
    const [version, value] = part.split(',');
    if (version !== 'v1' || !value) return false;
    const given = Buffer.from(value, 'base64');
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}
```

With Node's own HTTP server, read the raw body before anything parses it:

```js
import { createServer } from 'node:http';
import { verifyGrowthify } from './verify-growthify.js';

const seen = new Set(); // use your database in production

createServer((req, res) => {
  let raw = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => { raw += chunk; });
  req.on('end', () => {
    if (!verifyGrowthify(process.env.GROWTHIFY_WEBHOOK_SECRET, req.headers, raw)) {
      res.writeHead(401).end();
      return;
    }
    const id = req.headers['webhook-id'];
    if (!seen.has(id)) {
      seen.add(id);
      const event = JSON.parse(raw);
      // queue event.type and event.data for your own work here
    }
    res.writeHead(204).end();
  });
}).listen(8443);
```

In Express, use `express.raw({ type: 'application/json' })` on the webhook route and pass `req.body.toString('utf8')`.

### Python {#python}

```python
import base64
import hashlib
import hmac
import time


def verify_growthify(secret, headers, raw_body, now=None):
    """True when a delivery was signed by Growthify with `secret` and is less than five minutes old.

    `raw_body` is the body exactly as it arrived, as bytes. Never parse and re-serialise it first.
    """
    msg_id = headers.get("webhook-id")
    timestamp = headers.get("webhook-timestamp")
    signatures = headers.get("webhook-signature")
    if not msg_id or not timestamp or not signatures or not timestamp.isdigit():
        return False
    now = int(time.time()) if now is None else now
    if abs(now - int(timestamp)) > 300:
        return False

    key = base64.b64decode(secret.removeprefix("whsec_"))
    signed = f"{msg_id}.{timestamp}.".encode() + raw_body
    expected = base64.b64encode(hmac.new(key, signed, hashlib.sha256).digest()).decode()

    for part in signatures.split(" "):
        version, _, value = part.partition(",")
        if version == "v1" and hmac.compare_digest(value, expected):
            return True
    return False
```

In Flask, `request.get_data()` gives the raw bytes and `request.headers` looks headers up in any case:

```python
import os

from flask import Flask, request

app = Flask(__name__)


@app.post("/hooks/growthify")
def growthify_hook():
    raw = request.get_data()
    if not verify_growthify(os.environ["GROWTHIFY_WEBHOOK_SECRET"], request.headers, raw):
        return "", 401
    event = request.get_json()
    # skip request.headers["webhook-id"] if you have handled it, else queue event["type"] and event["data"]
    return "", 204
```

`str.removeprefix` needs Python 3.9 or later.

## Answering, retries and turning off {#answering-retries-and-turning-off}

**Answer with any 2xx within 10 seconds**, then do the slow work afterwards. Growthify doesn't follow redirects, and a 3xx counts as a failure.

A delivery that fails is tried again after 5 seconds, 5 minutes, 30 minutes, 2 hours, 5 hours, 10 hours and 10 hours: eight tries over about 27 hours, **with the same `webhook-id` every time**. So keep the ids you've handled and skip one you've seen.

An address is turned off when:

- it answers **410 Gone**, at once; or
- its deliveries have **failed for 5 days** in a row.

We email you when it happens, with the last answer and how much wasn't sent. **Turn back on** in Other apps starts sending again. Missed events aren't sent on their own: use **Send again** in the log for any you need.

## Managing an address {#managing-an-address}

- **Send a test event** sends `webhook.test` to this address only and shows what it answered.
- **Pause** stops sending until you **Resume**.
- The **log** lists each delivery with when, its id and what your address answered, after how many tries. **What we sent** shows the body; **Send again** sends it with the same id.
- **Remove** takes two presses; nothing more is sent.

Events and their deliveries are kept for 30 days.

### Showing and replacing the secret {#replacing-the-secret}

**Show the signing secret** works within 10 minutes of signing in, and asks for the six digits when two-step sign-in is on. **Replace the secret** makes a new one. **For 24 hours we sign with both**, so your code keeps working while you swap it in; accept either signature until then.

## How many you can have {#how-many-you-can-have}

Per store: 3 addresses on Free, 20 on Pro and Growth, 40 on Scale. A turned-off address doesn't count.

## FAQ {#faq}

### Do webhooks include customer names or emails? {#faq-pii}

No, and no setting adds them. Read those with a key, read only.

### How do I check a delivery is genuine? {#faq-verify}

Recompute the HMAC-SHA256 over `id.timestamp.raw body` with your secret and compare it to `webhook-signature`. The samples above do it.

### What if my server is down? {#faq-down}

Eight tries over about 27 hours. After 5 days of failures the address turns off and you're emailed.

### Can I get the same event twice? {#faq-twice}

Yes, after a retry or a Send again. The `webhook-id` stays the same; skip ids you've handled.

### Which addresses are allowed? {#faq-addresses}

Public `https://` addresses on port 443 or 8443, never Growthify's or Shopify's own.

### Is there an event when a shopper's details change? {#faq-shopper-change}

No. Events cover the changes listed above. Read the record with a key when you need the current details.

## Related pages {#related}

[Access keys](./access-keys.md) · [The API](./api.md) · [Two-step sign-in](./two-step-sign-in.md) · [Overview](./index.md) · [Shopify webhooks Growthify receives](../api/webhooks.md)
