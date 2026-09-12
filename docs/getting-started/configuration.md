---
id: configuration
title: Configure Growthify — embed settings and app proxy
sidebar_label: Configuration
sidebar_position: 3
description: Growthify app-embed settings, the Shopify app proxy prefix and subpath, and the environment contract the Remix backend validates at boot.
keywords: [growthify configuration, app proxy prefix, shopify env vars, session secret, gdpr pepper, theme editor settings, database url]
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the difference between the app proxy prefix and subpath?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Prefix is the first path segment and Shopify accepts only a, apps, community or tools. Subpath is the second segment and is the app specific name. For Growthify the prefix is apps and the subpath is growthify, producing /apps/growthify.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where do I configure module behaviour?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In the Growthify admin, not the Theme Editor. The app embed carries only two settings, the proxy prefix and a debug logging toggle. Popup triggers, review display, cart copy and consent regions all live in the admin.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are messaging provider credentials environment variables?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Merchants enter provider credentials in the admin and they are stored encrypted at rest, decrypted only at send time. They are per shop values, so they could not be environment variables even in principle.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why are there two database connection strings?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Normal application traffic goes through the transaction pooler, which suits many short lived queries. Migrations need the session pooler because they rely on session level state the transaction pooler does not preserve.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens if the app proxy prefix is wrong?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Every storefront call returns 404. Blocks render their markup and then silently fail, because the URL they build from window.gfConfig.appUrl does not match the proxy Shopify actually forwards.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does the backend refuse to start if it is misconfigured?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, deliberately. In production the app validates its required variables and refuses to boot against a placeholder or loopback application URL, so a misconfigured deploy fails loudly at startup rather than serving broken OAuth.',
          },
        },
      ],
    })}
  </script>
</head>

# Configuration

**Growthify is configured in three distinct places, and knowing which is which prevents most setup problems: two settings in the Theme Editor's app embed, the app proxy declaration in the Shopify app configuration, and the backend's environment variables.** Module behaviour belongs to none of them — that lives in the Growthify admin.

## Who this page is for

- **Merchants and agencies** who need the two embed settings and want to know where everything else is set.
- **Developers** deploying the backend, who need the environment contract and the boot-time validation rules.
- **Anyone debugging a 404** from a storefront block, which is nearly always a proxy-prefix mismatch.

## App-embed settings (merchant-facing)

The **Growthify Embed** exposes exactly two settings in the Theme Editor:

| Setting | Default | Purpose |
| --- | --- | --- |
| **App proxy prefix** | `growthify` | Must match the app's app-proxy subpath. Drives `window.gfConfig.appUrl = /apps/<prefix>`. |
| **Enable debug logging** | off | Logs Growthify activity to the browser console. Leave off in production. |

That is the entire embed surface, and it is intentionally small. The embed's job is to wire the storefront to the server, not to hold feature settings.

**Everything else is configured in the Growthify admin** — popup triggers and targeting, review moderation and display style, cart-drawer copy and free-shipping thresholds, consent categories, languages and regions, OTP providers and COD rules. Keeping behaviour out of the theme means a merchant can change it without a theme publish, and an agency can change it without touching a client's live theme.

## App proxy

The app declares its proxy in `shopify.app.toml`:

```toml
[app_proxy]
url = "https://<your-backend-host>"
prefix = "apps"
subpath = "growthify"
```

Two keys, frequently transposed, with different rules:

- **`prefix` is the first path segment**, and Shopify accepts only `a`, `apps`, `community` or `tools`. It is not a free-text field, and a value outside that set cannot create a proxy at all.
- **`subpath` is the second segment** and is the app-specific name — `growthify`.

Together they produce the storefront path `/apps/growthify`. A storefront request to:

```
https://<store>/apps/growthify/api/storefront/reviews
```

is forwarded by Shopify, with a signed query string, to the backend route handling `api/storefront/reviews`.

The proxy points at the **app root**, with no `/proxy` suffix, which is what lets `/apps/growthify/api/storefront/*` map onto the backend's `/api/storefront/*` routes directly.

:::warning The two settings must agree
The embed's **App proxy prefix** and the app's **subpath** are two copies of the same fact. When they drift, `window.gfConfig.appUrl` names a path Shopify is not forwarding, and every storefront call 404s while the blocks themselves look perfectly healthy.
:::

## Backend environment contract

The backend reads its configuration from environment variables and validates the essential ones at boot in production. Set them as host secrets — never commit real values, and never place a server secret in a client-visible variable.

| Variable | Required | Purpose |
| --- | --- | --- |
| `SHOPIFY_API_KEY` | yes | App client id from the Partner Dashboard |
| `SHOPIFY_API_SECRET` | yes | App client secret |
| `SHOPIFY_APP_URL` | yes | The deployed backend origin |
| `SESSION_SECRET` | yes | Random bytes used to sign sessions |
| `SHOPIFY_SCOPES` | yes | The access scopes the app requests at install |
| `DATABASE_URL` | yes | Supabase **transaction pooler** — normal application traffic |
| `DIRECT_URL` | yes | Supabase **session pooler** — required by `prisma migrate deploy` |
| `GDPR_AUDIT_PEPPER` | yes | Secret used to hash customer identifiers in the compliance audit log |
| `SENTRY_DSN` | optional | Error reporting; absent means error reporting is simply off |

### Why two database URLs

They are not redundant. The **transaction pooler** suits ordinary application traffic — many short-lived queries, one connection per query. **Migrations need the session pooler**, because they depend on session-level state that a transaction pooler does not preserve. Pointing migrations at the transaction pooler produces failures that look like permission or syntax problems and are neither.

### Boot-time validation

In production the app validates its required variables before serving, and **refuses to boot against a placeholder or loopback application URL**. This is deliberate: a backend that starts with a wrong `SHOPIFY_APP_URL` would serve an OAuth flow that redirects nowhere, which is far harder to diagnose than a process that exits at startup with a clear reason.

### What is not an environment variable

**Messaging-provider credentials are not configuration.** Twilio, MessageBird, WhatsApp Business and email-provider credentials are entered by each merchant in the admin, stored **encrypted at rest**, and decrypted only at send time. They are per-shop values, so they could not be environment variables even in principle — one deployment serves many shops, each with its own providers.

## Configuring a module

Once the embed is on and the proxy resolves, per-module configuration follows a consistent shape:

1. **Enable the module** in the Modules hub. If your plan does not include it, the toggle tells you which plan does.
2. **Open its configuration route** from the module tile.
3. **Set behaviour** — triggers, targeting, copy, thresholds, display style.
4. **Place the matching theme block**, if the module renders on the storefront.

Changes take effect on the next storefront request; there is no cache to clear and no theme publish required.

## What configuration does not cover

- **It does not create your Shopify Partner app** or set the application URL, redirect URLs and compliance webhook URLs in the Partner Dashboard.
- **It does not provision hosting, DNS or TLS** for the backend.
- **It does not configure Shopify's own settings** — markets, currencies, checkout rules and shipping profiles remain Shopify's.
- **It does not include per-shop secrets**, which are stored encrypted in the database rather than in configuration.
- **It cannot repair a proxy that was never created** in the Partner Dashboard; the embed setting only names a prefix, it does not register one.

## FAQ

### What is the difference between the app proxy prefix and subpath?

`prefix` is the first path segment and Shopify accepts only `a`, `apps`, `community` or `tools`. `subpath` is the second segment and is the app-specific name. Growthify uses `prefix = "apps"` and `subpath = "growthify"`, giving `/apps/growthify`.

### Where do I configure module behaviour?

In the Growthify admin. The app embed carries only two settings — the proxy prefix and a debug-logging toggle. Popup triggers, review display, cart copy and consent regions all live in the admin.

### Are messaging-provider credentials environment variables?

No. Merchants enter them in the admin; they are stored encrypted at rest and decrypted only at send time. They are per-shop values, so they cannot be deployment configuration.

### Why are there two database connection strings?

Application traffic uses the transaction pooler; migrations use the session pooler because they need session-level state the transaction pooler does not preserve.

### What happens if the app proxy prefix is wrong?

Every storefront call 404s. Blocks render their markup and then silently do nothing, because the URL built from `window.gfConfig.appUrl` is not the path Shopify forwards.

### Does the backend refuse to start if misconfigured?

Yes, deliberately. In production it validates required variables and refuses to boot against a placeholder or loopback application URL, so the failure is loud at startup rather than subtle in OAuth.

### Do I need to redeploy after changing a module setting?

No. Module settings are database rows read per request. Only backend environment changes require a redeploy.

## Related pages

- [App proxy](../storefront/app-proxy.md) — the full path contract and the failure modes.
- [App embed](../storefront/app-embed.md) — what `window.gfConfig` contains and why blocks depend on it.
- [Installation](./installation.md) — the install sequence and its verification checks.
- [Entitlements](../admin/entitlements.md) — how scopes map to features and how gating is enforced.
