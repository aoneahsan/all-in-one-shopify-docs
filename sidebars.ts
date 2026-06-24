import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Sidebar layout for the Growthify documentation site.
 * Every entry maps to a real Markdown file under docs/.
 */
const sidebars: SidebarsConfig = {
  mainSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/installation',
        'getting-started/architecture',
        'getting-started/configuration',
      ],
    },
    {
      type: 'category',
      label: 'Modules',
      collapsed: false,
      items: [
        'modules/overview',
        'modules/platform',
        'modules/popups',
        'modules/reviews',
        'modules/wishlist',
        'modules/bundles',
        'modules/cart',
        'modules/consent',
        'modules/upsells',
        'modules/analytics-reports',
        'modules/otp-cod',
        'modules/page-builder',
        'modules/sourcing',
      ],
    },
    {
      type: 'category',
      label: 'Storefront',
      collapsed: false,
      items: [
        'storefront/app-embed',
        'storefront/theme-blocks',
        'storefront/app-proxy',
      ],
    },
    {
      type: 'category',
      label: 'Admin',
      collapsed: false,
      items: [
        'admin/features',
        'admin/billing-plans',
        'admin/entitlements',
      ],
    },
    {
      type: 'category',
      label: 'API & Webhooks',
      collapsed: false,
      items: [
        'api/storefront-api',
        'api/webhooks',
      ],
    },
    {
      type: 'category',
      label: 'Legal',
      collapsed: true,
      items: [
        'legal/privacy',
        'legal/terms',
      ],
    },
    'about-the-author',
  ],
};

export default sidebars;
