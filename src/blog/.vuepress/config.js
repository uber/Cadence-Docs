const { themeConfig } = require('../../shared/config');

// modal configuration
module.exports = {
  dest: 'dist-blog',
  title: '',
  description: '',
  theme: '@vuepress/theme-blog', // OR shortcut: @vuepress/blog
  themeConfig: {
    ...themeConfig,
    directories: [
      {
        dirname: '_posts',
        id: 'post',
        itemPermalink: '/blog/:year/:month/:day/:slug',
        path: '/blog/',
      },
    ],
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#modifyblogpluginoptions
     */
    modifyBlogPluginOptions(blogPluginOptions) {
      return blogPluginOptions
    },
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#nav
     */
    feed: {
      canonical_base: '/',
      count: 5,
      json: true,
      sort: entries => entries.sort((entryA, entryB) => new Date(entryB.frontmatter.date).getTime() - new Date(entryA.frontmatter.date).getTime()),
    },
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#footer
     */
    footer: {
      copyright: [
        { text: `© ${new Date().getFullYear()} Uber Technologies, Inc.` },
      ]
    },
    summaryLength: 1000,
  },
  head: [
    ['script', {
      async: true,
      src: 'https://www.googletagmanager.com/gtag/js?id=G-W63QD8QE6E'
    }],
    ['script', {}, `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-W63QD8QE6E');`],
    ['script', {}, `(function(t,e,s,o){var n,a,c;t.SMCX=t.SMCX||[],e.getElementById(o)||(n=e.getElementsByTagName(s),a=n[n.length-1],c=e.createElement(s),c.type="text/javascript",c.async=!0,c.id=o,c.src="https://widget.surveymonkey.com/collect/website/js/tRaiETqnLgj758hTBazgd6tf1qkW72LYofp53DCuwcFidJsg6D9BXRx_2FjswgoSV1.js",a.parentNode.insertBefore(c,a))})(window,document,"script","smcx-sdk");`]
  ],
}
