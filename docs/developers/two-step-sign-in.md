---
id: two-step-sign-in
title: "Two-step sign-in for the Growthify web dashboard, explained"
sidebar_label: Two-step sign-in
sidebar_position: 6
description: "Add six digits from an authenticator app after Google sign-in, keep ten recovery codes, remember a browser for 7 days, and what support checks if you lose both."
keywords: [growthify two-step sign-in, two factor authentication shopify app, authenticator app totp, recovery codes, remember this browser, lost phone 2fa reset]
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
          name: 'Do I have to turn on two-step sign-in for Growthify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, it is your choice for your own stores. Once it is on, showing or making a key or a webhook secret asks for the code too. Growthify team accounts must have it on.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which authenticator apps work with Growthify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Any app that makes time-based six-digit codes, such as Google Authenticator, Microsoft Authenticator or 1Password. You scan a QR code or type the setup key.',
          },
        },
        {
          '@type': 'Question',
          name: 'What if I lose my phone?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Use one of your ten recovery codes instead of the six digits. Each works once. Two-step sign-in stays on, and Growthify asks you to set up the new phone straight away.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does Remember this browser do?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'On a browser that is yours alone, it skips the six digits for 7 days. Google is still asked every time, and showing a key or a secret still asks for the code. It is off unless you tick it.',
          },
        },
        {
          '@type': 'Question',
          name: 'I lost my phone and my recovery codes. Can support help?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Write to support from the email on your account. Support confirms the account is yours with at least two checks, such as naming a store on it and its myshopify.com address, then turns two-step sign-in off. Support never asks for a key, a secret or a shopper\'s details.',
          },
        },
      ],
    })}
  </script>
</head>

# Two-step sign-in

**Two-step sign-in adds a second step after Google: six digits from an authenticator app on your phone.** Someone who gets into your Google account still can't reach your stores' keys and webhooks. It applies to the Growthify dashboard on the web. Your stores in the Shopify admin keep using Shopify's own sign-in.

It's your choice for your own account. Once it's on, showing or making a key or a webhook secret asks for the code too. Growthify team accounts can see every merchant's keys, assistants and webhooks, so the admin pages stay closed to them until it's on, they can't turn it off, and they type the code each time they sign in, even on a remembered browser.

## Setting it up {#setting-it-up}

It takes about a minute. On the web dashboard, open [**Security**](https://growthify.aoneahsan.com/dashboard/security) and choose **Set up two-step sign-in**.

1. **Add Growthify to your authenticator.** Open the app (Google Authenticator, Microsoft Authenticator, 1Password or any time-based one), add an account, and point the camera at the QR code. Can't scan it? Type the setup key instead, and choose "time-based" if the app asks.
2. **Type the six digits it shows.** If the code doesn't match, check the phone's clock is set automatically, then try the code showing now.
3. **Keep your ten recovery codes.** If you lose your phone, one of these gets you in instead of the six digits. Each works once. They show only now, so keep them somewhere other than this phone: printed, or in a password manager. **Copy all ten** or **Download as a file**.
4. Tick **I've kept these somewhere safe** and turn it on.

## Signing in with it {#signing-in}

After you choose your Google account, Growthify asks for the six digits your authenticator shows. Codes change every 30 seconds. A few codes in a row that don't match bring a 10-minute wait; a recovery code works during it.

**Remember this browser for 7 days** sits under the code box, unticked. Tick it only on a browser that's yours alone. That browser then asks for Google only, until the date shown in Security. It still asks for Google every time, and for the code before a key or secret is shown. The 7 days don't stretch with use.

## Recovery codes {#recovery-codes}

Lost your phone? Choose **Use a recovery code instead** and type one of the ten. You're in, and two-step sign-in **stays on**: Growthify asks you to set up the new phone straight away, and emails you that a recovery code was used.

Security shows how many codes you have left and warns at three or fewer. **Make new recovery codes** gives you ten fresh ones; the old ten stop working as soon as the new ones are made. It asks for a sign-in within the last 10 minutes and the code.

## Changing phones {#changing-phones}

**Set up a new phone** in Security: type a code from the phone you have now, then add Growthify to the new one. The old phone stops working once the new one is set up. If the old phone is already gone, sign in with a recovery code first.

## Browsers and sign-ins {#browsers-and-sign-ins}

Security lists:

- **Browsers that skip the code**, each with the day it starts asking again. **Forget** one, or **Forget every browser**.
- **Recent sign-ins**, with when and how. **Sign out everywhere else** signs out every other browser and the app; this browser stays signed in.

## Turning it off {#turning-it-off}

**Turn off two-step sign-in** in Security. Your recovery codes stop working too, and every browser that skipped the code goes back to Google only.

## If you lose your phone and your codes {#lost-both}

Write to support at [support@growthify.aoneahsan.com](mailto:support@growthify.aoneahsan.com) **from the email on your Growthify account**. Before turning two-step sign-in off for you, support makes at least two of these checks:

- you wrote from the email on the account;
- you named a store on the account and its myshopify.com address;
- you named the month the account was made.

Support never asks for a key, a webhook secret or a shopper's details to prove who you are. Anyone who does isn't us. The reset turns two-step sign-in off, forgets every browser that skipped the code, and is logged with the support request's reference. You're emailed straight away. Then set it up again with your new phone.

A suspended account, or a Growthify team account, can't be reset this way.

## FAQ {#faq}

### Do I have to turn it on? {#faq-required}

No, for your own stores it's your choice. Team accounts must.

### Which authenticator apps work? {#faq-apps}

Any time-based six-digit app: Google Authenticator, Microsoft Authenticator, 1Password and others.

### What if I lose my phone? {#faq-lost-phone}

Use a recovery code, then set up the new phone.

### What does Remember this browser do? {#faq-remember}

Skips the code on that browser for 7 days. Keys and secrets still ask for it.

### I lost my phone and my codes. Can support help? {#faq-support}

Yes, after at least two checks. Support never asks for a key, a secret or a shopper's details.

### Does it change how I sign in inside the Shopify admin? {#faq-shopify-admin}

No. The embedded app uses Shopify's own sign-in. Two-step sign-in is for the Growthify dashboard on the web.

## Related pages {#related}

[Access keys](./access-keys.md) · [Webhooks](./webhooks.md) · [Overview](./index.md) · [Privacy summary](../legal/privacy.md)
