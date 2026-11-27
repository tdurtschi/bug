# Bug
Bug is a simulation that models a weevil walking around in an HTML canvas.

Check out the [live demo](https://tdurtschi.github.io/bug/).

Install via npm: [@tdurtschi/bug](https://www.npmjs.com/package/@tdurtschi/bug)

## Setup
### Prerequisites
* NodeJS 17+
* Yarn
### Install Dependencies
run `yarn` to install all node dependencies.

## Run it
`yarn start` to run a dev server.

## Tests
`yarn test` to run the test suite.
`yarn test-browser` to run the browser smoke test suite.
`yarn test-unit` to run jasmine unit test suite.
`yarn test-integration` to run jasmine integration test suite.

## Publish the demo
The live demo is served by GitHub Pages from the [`gh-pages`](https://github.com/tdurtschi/bug/tree/gh-pages) branch. To update it:

1. `rm -rf dist && yarn build`
2. Copy `dist/index.html`, `dist/main.bundle.js`, and the emitted `.png` files onto the `gh-pages` branch and commit
3. Push the branch; GitHub Pages redeploys automatically
