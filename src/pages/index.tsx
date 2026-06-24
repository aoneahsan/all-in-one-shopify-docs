import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const FEATURES: { title: string; body: string }[] = [
  {
    title: '16 modules, one install',
    body: 'Popups, reviews, wishlist, bundles, cart upsells, cookie consent, post-purchase upsells, reports, advanced analytics, OTP/COD, a page builder, and product sourcing — toggled independently.',
  },
  {
    title: 'Storefront stays lean',
    body: 'A single theme app-embed boots a lazy loader. Only the JavaScript for the modules a merchant enables ships to the storefront.',
  },
  {
    title: 'Real platform underneath',
    body: 'Remix + Prisma + Neon Postgres, Shopify OAuth, GDPR compliance webhooks, App Subscriptions billing, entitlement-gated APIs, and 72 Liquid blocks.',
  },
];

function Hero(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <img src="img/logo.svg" alt="Growthify logo" width={88} height={88} />
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/intro">
            Read the docs
          </Link>
          <Link className="button button--outline button--secondary button--lg" to="/getting-started/installation">
            Installation
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Growthify Docs — 16-module growth & conversion suite for Shopify"
      description="Documentation for Growthify: popups, reviews, bundles, cart upsells, cookie consent, analytics, SEO, OTP/COD, page builder, and product sourcing — in one embedded Shopify app."
    >
      <Hero />
      <main className="container margin-vert--xl">
        <div className="row">
          {FEATURES.map((f) => (
            <div key={f.title} className={clsx('col col--4', styles.feature)}>
              <Heading as="h3">{f.title}</Heading>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
