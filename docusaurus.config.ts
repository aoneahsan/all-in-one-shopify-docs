import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// ---------------------------------------------------------------------------
// Growthify — Documentation site config
// Author: Ahsan Mahmood (https://aoneahsan.com)
// Product: Growthify — 16-module growth & conversion suite for Shopify
// App repo (private): https://github.com/aoneahsan/all-in-one-shopify
// ---------------------------------------------------------------------------

const SITE_URL = 'https://growthify-docs.aoneahsan.com';

const config: Config = {
  title: 'Growthify Docs',
  tagline: 'One embedded Shopify app: popups, reviews, bundles, cart upsells, consent, analytics & more.',
  favicon: 'img/favicon.svg',

  url: SITE_URL,
  baseUrl: '/',

  organizationName: 'aoneahsan',
  projectName: 'all-in-one-shopify-docs',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',

  // SEO + AI-citability head tags. JSON-LD payloads (WebSite, Organization,
  // SoftwareApplication) help Google Rich Results, Perplexity, ChatGPT, and
  // Claude extract structured entity data when citing this documentation.
  headTags: [
    {
      tagName: 'link',
      attributes: { rel: 'canonical', href: `${SITE_URL}/` },
    },
    {
      tagName: 'meta',
      attributes: { name: 'application-name', content: 'Growthify Docs' },
    },
    {
      tagName: 'meta',
      attributes: { name: 'theme-color', content: '#6366f1' },
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Growthify Documentation',
        url: SITE_URL,
        description:
          'Documentation for Growthify, a 16-module growth and conversion suite for Shopify merchants — popups, reviews, bundles, cart upsells, cookie consent, analytics, SEO, OTP/COD, page builder, and product sourcing — in one embedded app. Author: Ahsan Mahmood.',
        inLanguage: 'en',
        publisher: {
          '@type': 'Person',
          name: 'Ahsan Mahmood',
          url: 'https://aoneahsan.com',
          email: 'aoneahsan@gmail.com',
          sameAs: [
            'https://linkedin.com/in/aoneahsan',
            'https://github.com/aoneahsan',
            'https://www.npmjs.com/~aoneahsan',
          ],
        },
      }),
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Growthify',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'Shopify App',
        operatingSystem: 'Shopify (web)',
        url: 'https://growthify.aoneahsan.com',
        sameAs: SITE_URL,
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: '0',
          highPrice: '199',
          priceCurrency: 'USD',
          offerCount: '4',
        },
        author: {
          '@type': 'Person',
          name: 'Ahsan Mahmood',
          url: 'https://aoneahsan.com',
        },
        description:
          'Growthify brings 16 storefront and admin modules into one embedded Shopify app: popups, reviews, wishlist, bundles, cart upsells, cookie consent, post-purchase upsells, reports, advanced analytics, OTP/COD, a page builder, and product sourcing. Each module toggles independently; only the JavaScript for enabled modules ships to the storefront.',
      }),
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Ahsan Mahmood',
        alternateName: 'aoneahsan',
        url: 'https://aoneahsan.com',
        email: 'aoneahsan@gmail.com',
        sameAs: [
          'https://linkedin.com/in/aoneahsan',
          'https://github.com/aoneahsan',
          'https://www.npmjs.com/~aoneahsan',
          'https://aoneahsan.com',
        ],
      }),
    },
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  trailingSlash: false,

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/aoneahsan/all-in-one-shopify-docs/edit/main/',
          showLastUpdateTime: true,
          breadcrumbs: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.7,
          lastmod: 'date',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.svg',
    metadata: [
      {
        name: 'description',
        content:
          'Growthify documentation — a 16-module growth & conversion suite for Shopify (popups, reviews, bundles, cart upsells, consent, analytics, SEO, OTP/COD, page builder, sourcing) in one embedded app. By Ahsan Mahmood.',
      },
      {
        name: 'keywords',
        content:
          'shopify app, conversion suite, shopify popups, product reviews, bundle discounts, cart upsell, cookie consent gdpr, shopify analytics, theme app extension, app proxy, remix shopify app, all-in-one shopify, growthify',
      },
      { name: 'author', content: 'Ahsan Mahmood' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:creator', content: '@aoneahsan' },
      { name: 'twitter:site', content: '@aoneahsan' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Growthify Docs' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'article:author', content: 'Ahsan Mahmood' },
    ],
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: { hideable: true, autoCollapseCategories: true },
    },
    navbar: {
      title: 'Growthify',
      logo: {
        alt: 'Growthify logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo.svg',
        width: 32,
        height: 32,
      },
      items: [
        { type: 'docSidebar', sidebarId: 'mainSidebar', position: 'left', label: 'Docs' },
        { to: '/getting-started/installation', label: 'Get Started', position: 'left' },
        { to: '/modules/overview', label: 'Modules', position: 'left' },
        { to: '/about-the-author', label: 'Author', position: 'right' },
        { href: 'https://github.com/aoneahsan/all-in-one-shopify-docs', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Introduction', to: '/intro' },
            { label: 'Installation', to: '/getting-started/installation' },
            { label: 'Modules overview', to: '/modules/overview' },
            { label: 'Storefront blocks', to: '/storefront/theme-blocks' },
            { label: 'Storefront API', to: '/api/storefront-api' },
          ],
        },
        {
          title: 'Product',
          items: [
            { label: 'Marketing site', href: 'https://growthify.aoneahsan.com' },
            { label: 'Privacy', to: '/legal/privacy' },
            { label: 'Terms', to: '/legal/terms' },
          ],
        },
        {
          title: 'Built by Ahsan Mahmood',
          items: [
            { label: 'aoneahsan.com', href: 'https://aoneahsan.com' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/aoneahsan' },
            { label: 'GitHub', href: 'https://github.com/aoneahsan' },
            { label: 'npm packages', href: 'https://www.npmjs.com/~aoneahsan' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ahsan Mahmood. Built with Docusaurus. Growthify is a proprietary product.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'typescript', 'liquid', 'sql', 'diff'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
