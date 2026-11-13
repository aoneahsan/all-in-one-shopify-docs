---
id: verify
title: "Verifying a Growthify white-label licence by key or domain"
sidebar_label: Verify a licence
sidebar_position: 4
description: "How to check that a Growthify copy is licensed: the licence key, the licence file each copy serves under /.well-known/, and what every verify answer means."
keywords: [verify white label licence, growthify licence check, well-known licence file, licence key verification, is this app licensed, revoked licence]
last_update:
  date: 2026-11-13
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How do I check whether a Growthify copy is licensed?', acceptedAnswer: { '@type': 'Answer', text: 'Enter its licence key or the domain it runs on at growthify.aoneahsan.com/verify-license. Verification is run by our licensing service.' } },
        { '@type': 'Question', name: 'Where does a licensed copy publish its licence?', acceptedAnswer: { '@type': 'Answer', text: 'In a small JSON file under /.well-known/ on its own domain, next to a PDF certificate. The verify page reads that file when you check by domain.' } },
        { '@type': 'Question', name: 'What does a licence check show?', acceptedAnswer: { '@type': 'Answer', text: 'Public facts only: who the licence is for, its domains, what it covers, and its dates. Never an email, a phone number or a price.' } },
        { '@type': 'Question', name: 'What does "domain mismatch" mean?', acceptedAnswer: { '@type': 'Answer', text: 'The domain serves a licence file, but the licence in it was issued for a different domain. The copy is running somewhere its licence does not cover.' } },
        { '@type': 'Question', name: 'What happens to a copy whose licence is revoked?', acceptedAnswer: { '@type': 'Answer', text: 'On its next start it shows a notice that the licence is not active, with a link to the verify page. No data is deleted.' } },
        { '@type': 'Question', name: 'Does a licence check slow a licensed copy down?', acceptedAnswer: { '@type': 'Answer', text: 'No. A copy asks once when it starts and once when it is opened again, never on a timer, and keeps working if the licensing service cannot be reached.' } },
        { '@type': 'Question', name: 'Is the verify page still available after a buyout?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Sales stop after a buyout, but every licence sold before it can still be checked.' } },
      ],
    })}
  </script>
</head>

# Verify a licence

**Anyone can check whether a copy of Growthify is licensed, by entering its licence key or the domain it runs on at [growthify.aoneahsan.com/verify-license](https://growthify.aoneahsan.com/verify-license).** Verification is run by our licensing service, and it answers with public facts only.

This page is for three readers: a licensee who wants to show their merchants that their copy is genuine, a merchant who wants to check the app they're installing, and anyone who suspects a copy is running somewhere it shouldn't be.

## What every licensed copy carries

Each copy we deploy carries two things:

- **A licence key.** It starts with the product's key prefix, `ALLINONESHOPIFY`, and it's in the licence email. The key is public: it identifies the licence but unlocks nothing, so it's fine to share.
- **A licence file** at a fixed address on the copy's own domain, under `/.well-known/`. The [licence terms page](https://growthify.aoneahsan.com/white-label/license-terms) shows the exact path. Beside it sits a PDF certificate with the same facts, for anyone who prefers a document.

The licence file is small JSON:

```json
{
  "$schema": "growthify-white-label-license",
  "product": "Growthify",
  "publicKey": "ALLINONESHOPIFY-WL-…",
  "client": "The licensee's company name",
  "domain": "apps.example.com",
  "verifyUrl": "https://growthify.aoneahsan.com/verify-license?key=…",
  "issuedAt": "…"
}
```

We add both files when we deploy a copy. The licensee doesn't write or edit them.

## Checking by key

Paste the key on the verify page and press Check. A link with `?key=` in it, like the `verifyUrl` inside the licence file, opens straight to the answer.

| Answer | What it means |
|---|---|
| This licence is active | The key is real and its copy is live |
| Being set up | The key is real; its copy hasn't been deployed on its domain yet |
| Revoked | The licence was ended on the date shown |
| Not found | No Growthify licence has this key |
| Not a Growthify key | The text isn't in the shape of a key at all |

An active licence also shows who it's licensed to, its domains, whether it's a licence or a buyout, what it covers, when it was issued, and its "updates until" date.

## Checking by domain

Switch to "By domain" and enter just the host, like `apps.example.com`. The licensing service fetches that domain's licence file over HTTPS, then checks the key it names.

| Answer | What it means |
|---|---|
| Licensed | The file is there and its licence covers this domain |
| Domain mismatch | The file is there, but its licence is for a different domain |
| Revoked | The licence in the file has been ended |
| Not a valid licence | The file is there but doesn't hold a real licence |
| No licence file | The domain doesn't serve one |
| Couldn't reach | The domain didn't answer; check the address or try later |

To stay safe, the service only fetches over HTTPS from public addresses, doesn't follow redirects to other hosts, waits a few seconds at most, and reads a small file. A domain behind a login wall, or one that redirects elsewhere, answers "couldn't reach".

## What a check never shows

No email address, no phone number, and no price. Those stay with the order. The verify page is safe to link from anywhere.

## How a copy checks itself

A licensed copy asks the licensing service about its own key once when it starts and once each time it's opened again. It never asks on a timer. If its licence is revoked, or it's running on a domain the licence doesn't cover, it shows a notice that the licence is not active, with a link to the verify page. No data is deleted, and the licensee can sort it out with us.

If the licensing service can't be reached, because of a network gap, a timeout or a fault on our side, the copy keeps working and asks again next time. A failed check is never treated as a "no".

Growthify's own site carries no key, so it never runs this check.

## Limits

- **Revocation is for misuse.** A licence used outside its terms, or on a domain it doesn't cover, may be revoked. It isn't used to switch off a copy whose updates ended; that copy stays valid on its last version.
- **Checks are rate-limited** per visitor. Too many in a minute and the page asks you to wait.
- **A domain check proves the file, not the app.** It confirms what the domain publishes. A key check confirms what the licence says.

## FAQ

### How do I check whether a Growthify copy is licensed?

Enter its licence key or the domain it runs on at [growthify.aoneahsan.com/verify-license](https://growthify.aoneahsan.com/verify-license). Verification is run by our licensing service.

### Where does a licensed copy publish its licence?

In a small JSON file under `/.well-known/` on its own domain, next to a PDF certificate. The verify page reads that file when you check by domain.

### What does a licence check show?

Public facts only: who the licence is for, its domains, what it covers, and its dates. Never an email, a phone number or a price.

### What does "domain mismatch" mean?

The domain serves a licence file, but the licence in it was issued for a different domain. The copy is running somewhere its licence does not cover.

### What happens to a copy whose licence is revoked?

On its next start it shows a notice that the licence is not active, with a link to the verify page. No data is deleted.

### Does a licence check slow a licensed copy down?

No. A copy asks once when it starts and once when it is opened again, never on a timer, and keeps working if the licensing service cannot be reached.

### Is the verify page still available after a buyout?

Yes. Sales stop after a buyout, but every licence sold before it can still be checked.

## Related pages

- [White-label overview](./index.md): what a licence is.
- [Setup](./setup.md): when the key is issued and marked active.
- [Updates and renewals](./updates.md): the "updates until" date a check shows.
- [Privacy summary](../legal/privacy.md): what is kept about licence buyers.
