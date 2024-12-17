const { slackUrl, officeHourUrl } = require('./constants');

module.exports = {
  themeConfig: {
    logo: '/img/logo-white.svg',
    nav: [
      {
        text: 'Docs',
        items: [
          { text: 'Get Started', link: '/docs/get-started/' },
          { text: 'Use cases', link: '/docs/use-cases/' },
          { text: 'Concepts', link: '/docs/concepts/' },
          { text: 'Java client', link: '/docs/java-client/' },
          { text: 'Go client', link: '/docs/go-client/' },
          { text: 'Command line interface', link: '/docs/cli/' },
          { text: 'Operation Guide', link: '/docs/operation-guide/' },
          { text: 'Glossary', link: '/GLOSSARY' },
          { text: 'About', link: '/docs/about/' },
        ],
      },
      {
        text: 'Blog', link: '/blog/',
      },
      {
        text: 'Client',
        items: [
          { text: 'Java Docs', link: 'https://www.javadoc.io/doc/com.uber.cadence/cadence-client' },
          { text: 'Java Client', link: 'https://mvnrepository.com/artifact/com.uber.cadence/cadence-client' },
          { text: 'Go Docs', link: 'https://godoc.org/go.uber.org/cadence' },
          { text: 'Go Client', link: 'https://github.com/uber-go/cadence-client/releases/latest' },
        ],
      },
      {
        text: 'Community',
        items: [
          { text: 'Github Discussion', link: 'https://github.com/uber/cadence/discussions' },
          { text: 'StackOverflow', link: 'https://stackoverflow.com/questions/tagged/cadence-workflow' },
          { text: 'Github Issues', link: 'https://github.com/uber/cadence/issues' },
          { text: 'Slack', link: slackUrl },
          { text: 'Office Hours Calendar', link: officeHourUrl },
        ],
      },
      {
        text: 'GitHub',
        items: [
          { text: 'Cadence Service and CLI', link: 'https://github.com/uber/cadence' },
          { text: 'Cadence Go Client', link: 'https://github.com/uber-go/cadence-client' },
          { text: 'Cadence Go Client Samples', link: 'https://github.com/uber-common/cadence-samples' },
          { text: 'Cadence Java Client', link: 'https://github.com/uber-java/cadence-client' },
          { text: 'Cadence Java Client Samples', link: 'https://github.com/uber/cadence-java-samples' },
          { text: 'Cadence Web UI', link: 'https://github.com/uber/cadence-web' },
          { text: 'Cadence Docs', link: 'https://github.com/uber/cadence-docs' },
        ],
      },
      {
        text: 'Docker',
        items: [
          { text: 'Cadence Service', link: 'https://hub.docker.com/r/ubercadence/server/tags' },
          { text: 'Cadence CLI', link: 'https://hub.docker.com/r/ubercadence/cli/tags' },
          { text: 'Cadence Web UI', link: 'https://hub.docker.com/r/ubercadence/web/tags' },
        ],
      },
    ],
  },
};
