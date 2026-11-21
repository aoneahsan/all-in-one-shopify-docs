---
id: assistants
title: "Connect Growthify to Claude, ChatGPT, Claude Code or Cursor"
sidebar_label: Assistants
sidebar_position: 3
description: "Give Claude, ChatGPT, Claude Code or Cursor one store's Growthify data through MCP: the address, the steps for each app, what it can do, and how deletes wait for you."
keywords: [growthify mcp, claude shopify connector, chatgpt shopify app, mcp server shopify, claude code mcp, cursor mcp, ai assistant shopify store]
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
          name: 'What address do I give Claude or ChatGPT for Growthify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'https://mldbdtltrxojmqzglupg.supabase.co/functions/v1/mcp. Add it as a custom connector. The assistant then opens Growthify, where you sign in, pick the store and tick what it can do.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can an assistant reach more than one of my stores?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Each connection reaches one store, which you choose on the consent page. Connect it again for another store.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can Claude or ChatGPT delete a campaign in my store?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It can ask. Each delete it asks for sends you a link to Growthify showing the item as your store has it now. Nothing goes until you press Delete it, and the request runs out after 10 minutes.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can an assistant read my shoppers\' emails?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Only if you tick that shopper record, and only read only. Subscribers include an email or phone number; other records, such as cash on delivery orders and review authors, never include the shopper\'s email or phone at all.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I disconnect an assistant from Growthify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In Other apps, under Connected to this store, press Remove twice. It loses access straight away, including any token it already holds.',
          },
        },
      ],
    })}
  </script>
</head>

# Assistants

**An assistant such as Claude, ChatGPT, Claude Code or Cursor can work with one of your stores' Growthify data through MCP, the standard these apps use to connect to other services.** You ask in plain words ("which popups are on right now?", "pause the countdown on the coffee grinders", "approve the five-star reviews from this week"), and it does the work with the reach you ticked, nothing more.

## The address {#the-address}

```text
https://mldbdtltrxojmqzglupg.supabase.co/functions/v1/mcp
```

The same address is on the Assistants card in [**Other apps**](https://growthify.aoneahsan.com/dashboard/other-apps), with **Copy the address** and these steps.

## Connecting {#connecting}

### Claude {#claude}

1. In Claude, open **Settings**, then **Connectors**.
2. Choose **Add custom connector**. Call it Growthify and paste the address above.
3. Press **Connect**. Claude opens Growthify, where you sign in, pick the store and tick what it can do.

### ChatGPT {#chatgpt}

1. In ChatGPT, open **Settings**, then **Apps and Connectors**.
2. Under **Advanced settings**, turn on **Developer mode**, then choose **Create**.
3. Call it Growthify, paste the address above, and choose **OAuth** for signing in.
4. ChatGPT opens Growthify. Sign in, pick the store and tick what it can do.

### Claude Code {#claude-code}

1. In a terminal, run:

   ```bash
   claude mcp add --transport http growthify https://mldbdtltrxojmqzglupg.supabase.co/functions/v1/mcp
   ```

2. Start Claude Code and type `/mcp`. Choose **growthify**, then **Authenticate**.
3. Your browser opens Growthify. Sign in, pick the store and tick what it can do.

### Cursor {#cursor}

1. Open `~/.cursor/mcp.json`, or create it, and add:

   ```json
   {
     "mcpServers": {
       "growthify": { "url": "https://mldbdtltrxojmqzglupg.supabase.co/functions/v1/mcp" }
     }
   }
   ```

2. In Cursor Settings, open **MCP** and press **Connect** beside growthify.
3. Your browser opens Growthify. Sign in, pick the store and tick what it can do.

## The consent page {#consent}

When the assistant sends you to Growthify, the page says which app is asking and where it sends you back. If that isn't where you came from, press **Deny**. Then:

- **Which store it reaches.** One store per connection. Connect it again for another store.
- **What it can do.** The same parts as a key: Read and Change your store data, **Ask to delete** where a row can go, and shopper records read only.
- **Call this connection.** A name you'll recognise in your list.

**Approve** and you're sent back to the assistant. We email you that it was connected. The request to connect lasts 10 minutes; past that, nothing was shared, and you start again from the assistant.

If the store already has as many assistants as its plan allows (3 on Free, 10 on Pro and Growth, 25 on Scale), the page says so: remove one in Other apps, or move the store to a plan with more.

## What it can do {#tools}

Growthify gives the assistant one tool per thing it may do, made from the same list as [the API](./api.md), and only the tools its ticks allow show up at all.

| Tool | What it does |
|---|---|
| `list_<resource>` | Up to 50 rows with a cursor for more, such as `list_popups` or `list_reviews` |
| `get_<resource>` | One row by id |
| `create_<resource>` | A new announcement bar, bundle, quantity break, buy one get one offer, cart upsell, stacking rule or markup rule |
| `update_<resource>` | Changes some fields of one row |
| `prepare_delete_<resource>` | Asks you to delete one row; see below |

Shopper records only ever have `list_` and `get_` tools. Text in a row, such as a review or a chat message, is your store's and your shoppers' own words, and the assistant receives it as data.

## Ask to delete {#ask-to-delete}

An assistant never deletes anything itself. When it asks to:

1. It gets a link to Growthify, and the request waits under **Asked to delete, waiting for you** in Other apps.
2. The link shows the item as your store has it right now.
3. You choose **Delete it** (with your six digits, when two-step sign-in is on) or **Keep it**.

The request runs out 10 minutes after it was made. **Keep it** isn't sent to the assistant as a no; the request simply runs out, and then the assistant is told it ran out. If you remove the assistant first, its requests go with it.

## What it never does {#never}

Change, delete or message a shopper; send a campaign; reach another store; see your sign-in, keys, webhook secrets or Shopify billing; change the store's plan; or manage keys, assistants or two-step sign-in. Those stay with you, signed in on the web.

## Your list of assistants {#your-list}

**Connected to this store** in Other apps shows each one with its name, the app's own name, the address it sends you back to, when it was connected and when it was last used.

- **Rename** changes the name you see.
- **Remove** takes two presses ("Press again: it loses access now"). It can't reach the store any more from that moment, even with a token it already holds.

Each assistant's requests count toward the store's day, the same as a key's: 5,000 on Free, 50,000 on Pro and Growth, 100,000 on Scale, plus 120 a minute per connection.

## FAQ {#faq}

### What address do I give the assistant? {#faq-address}

`https://mldbdtltrxojmqzglupg.supabase.co/functions/v1/mcp`, as a custom connector.

### Can one assistant reach two of my stores? {#faq-two-stores}

No. Connect it once per store.

### Can it delete a campaign? {#faq-delete}

It can ask. Nothing goes until you press Delete it in Growthify within 10 minutes.

### Can it read my shoppers' emails? {#faq-emails}

Only subscribers' and loyalty members' emails, only if you tick them, and only read only. COD orders, saved addresses and review authors never carry an email.

### Does it need an access key? {#faq-key}

No. The assistant signs in through Growthify when you connect it; you never paste a key into it.

### How do I disconnect it? {#faq-disconnect}

Remove it in Other apps. It loses access at once.

## Related pages {#related}

[The API](./api.md) · [Access keys](./access-keys.md) · [Two-step sign-in](./two-step-sign-in.md) · [Overview](./index.md)
