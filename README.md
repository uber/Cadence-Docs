# [Cadence docs](https://cadenceworkflow.io) &middot; ![Build and Deploy](https://img.shields.io/github/actions/workflow/status/uber/Cadence-Docs/publish-to-gh-pages.yml?label=Build%20and%20Deploy&link=https%3A%2F%2Fgithub.com%2Fuber%2FCadence-Docs%2Factions%2Fworkflows%2Fpublish-to-gh-pages.yml) ![Nightly integration test](https://img.shields.io/github/actions/workflow/status/uber/Cadence-Docs/nightly-integration-test.yml?label=Nightly%20integration%20test&link=https%3A%2F%2Fgithub.com%2Fuber%2FCadence-Docs%2Factions%2Fworkflows%2Fnightly-integration-test.yml)

## Setting up for local development
This will start a local server and can be accessed at http://localhost:8080/
1. Run `npm install`
2. Run `npm run start`

### Adding pages to docs
1. Add the page under `Cadence-Docs/src/docs` in the correct place in the hierarchy
2. Add the page to `Cadence-Docs/src/.vuepress/config.js`

## Setting up for local development for blog pages
This will start a local server and can be accessed at http://localhost:8080/blog
1. Run `npm install`
2. Run `npm run start:blog`

## License

MIT License, please see [LICENSE](https://github.com/uber/Cadence-Docs/blob/master/LICENSE) for details.
