import path from 'path';
import npm2yarn from '@docusaurus/remark-plugin-npm2yarn';
import remarkMath from 'remark-math';

import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type {Options as DocsOptions} from '@docusaurus/plugin-content-docs';
import type {Options as BlogOptions} from '@docusaurus/plugin-content-blog';
import type {Options as PageOptions} from '@docusaurus/plugin-content-pages';
import type {Options as IdealImageOptions} from '@docusaurus/plugin-ideal-image';
import type {Options as ClientRedirectsOptions} from '@docusaurus/plugin-client-redirects';


// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const defaultLocale = 'en';

const config: Config = {
  title: 'Cadence ⚙️',
  tagline: 'Orchestrate with Confidence: The Open-Source Workflow Engine for Tomorrow',
  favicon: 'img/favicon.ico',

  url: 'https://cadenceworkflow.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'uber', // Usually your GitHub org/user name.
  projectName: 'cadence-Docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  scripts: [
    {
      async: true,
      src: 'https://www.googletagmanager.com/gtag/js?id=G-W63QD8QE6E'
    },
    {
      src: 'js/gtag.js',
    }
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/cadence-workflow/Cadence-Docs/tree/master/src/docs',
        },
        blog: {
          blogTitle: 'Cadence Blog',
          blogDescription: 'The latest news and updates from the Cadence team',
          //postsPerPage: 'ALL',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/cadence-workflow/Cadence-Docs/tree/master/src/blog/_posts',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      './src/plugins/changelog/index.js',
      {
        blogTitle: 'Cadence changelog',
        blogDescription:
          'Keep yourself up-to-date about new features in every release',
        blogSidebarCount: 'ALL',
        blogSidebarTitle: 'Changelog',
        routeBasePath: '/changelog',
        showReadingTime: false,
        postsPerPage: 20,
        archiveBasePath: null,
        authorsMapPath: 'authors.json',
        feedOptions: {
          type: 'all',
          title: 'Cadence Docs changelog',
          description:
            'Keep yourself up-to-date about new features in every release',
          copyright: `Copyright © ${new Date().getFullYear()} Uber Technologies, Inc.`,
          language: defaultLocale,
        },
        onInlineAuthors: 'warn',
      },
    ],
    [
      'content-docs',
      {
        id: 'community',
        path: 'community',
        routeBasePath: 'community',
        editUrl: ({locale, versionDocsDirPath, docPath}) => {
          // if (locale !== defaultLocale) {
          //   return `https://crowdin.com/project/cadence-docs/${locale}`;
          // }
          return `https://github.com/cadence-workflow/Cadence-Docs/edit/master/${versionDocsDirPath}/${docPath}`;
        },
        remarkPlugins: [npm2yarn],
        editCurrentVersion: true,
        sidebarPath: './sidebarsCommunity.js',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      } satisfies DocsOptions,
    ],
    [
      'client-redirects',
      {
        fromExtensions: ['html'],
        createRedirects(routePath) {
          // Redirect to /docs from /docs/introduction (now docs root doc)
          if (routePath === '/docs' || routePath === '/docs/') {
            return [`${routePath}/introduction`];
          }
          return [];
        },
        redirects: [
          {
            from: ['/docs/support', '/docs/next/support'],
            to: '/community/support',
          },
          {
            from: ['/docs/team', '/docs/next/team'],
            to: '/community/team',
          },
          {
            from: ['/docs/resources', '/docs/next/resources'],
            to: '/community/resources',
          },
        ],
      } satisfies ClientRedirectsOptions,
    ],
  ],

  themeConfig: {
    algolia: {
      // The application ID provided by Algolia
      appId: 'J7SVDVT89Z',

      // Public API key: it is safe to commit it
      apiKey: 'e96333af9178875d6417a55ac276d718',

      indexName: 'cadenceworkflow',

      // Optional: see doc section below
      contextualSearch: false,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      externalUrlRegex: 'external\\.com|domain\\.com',

      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      replaceSearchResultPathname: {
        from: '/docs/', // or as RegExp: /\/docs\//
        to: '/',
      },

      // Optional: Algolia search parameters
      searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',

      // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
      insights: true,

      //... other Algolia params
    },
    // Replace with your project's social card
    image: 'img/social-card-min.jpg',
    navbar: {
      title: '',
      logo: {
        alt: 'Cadence Logo',
        src: 'img/cadence-logo.svg',
        srcDark: "img/logo-white.svg"
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'left'
        },
        {
          to: '/community/support',
          label: 'Community',
          position: 'left',
          activeBaseRegex: `/community/`,
        },
        {
          type: 'dropdown',
          position: 'right',
          label: 'Repositories',
          items: [
            {label: 'Cadence Service', href: 'https://github.com/uber/cadence'},
            {label: 'Go Client', href: 'https://github.com/uber-go/cadence-client'},
            {label: 'Java Client', href: 'https://github.com/uber/cadence-java-client'},
            {label: 'Go Samples', href: 'https://github.com/uber-common/cadence-samples'},
            {label: 'Java Samples', href: 'https://github.com/uber/cadence-java-samples'},
            {label: 'Cadence Web', href: 'https://github.com/uber/cadence-web'},
            {label: 'Cadence IDLs', href: 'https://github.com/uber/cadence-idl'},
            {label: 'Helm Charts', href: 'https://github.com/uber/cadence-charts'},
          ],
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'Go Client',
              to: '/docs/intro',
            },
            {
              label: 'Java Client',
              to: '/docs/intro',
            },
            {
              label: 'Command Line Interface',
              to: '/docs/intro',
            },
            {
              label: 'Operation Guide',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/cadence-workflow+uber-cadence',
            },
            {
              label: 'Cadence Community Slack',
              href: 'http://t.uber.com/cadence-slack',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/cadenceworkflow/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/uber/cadence',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Uber Technologies, Inc.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
