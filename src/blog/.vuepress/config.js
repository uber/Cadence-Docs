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
        { text: '© 2021 Uber Technologies, Inc.' },
      ]
    },
    summaryLength: 1000,
  },
}
