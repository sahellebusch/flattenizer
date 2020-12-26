# Flattenizer

Functions to flatten and unflatten nested JavaScript objects into a single level.  Keys are enumerated if they collide.

- [API](#api)
- [Developing](#developing)
  * [Commands](#commands)
  * [Configuration](#configuration)
  * [Continuous Integration](#continuous-integration)
  
## API

The [code](./src/flattenizer.ts) is documented using [`tsdoc`](https://tsdoc.org/).  [The tests](./src/flattenizer.spec.ts) are helpful to read as well. There are also docs generated using [`api-extractor`](https://api-extractor.com/) [in the docs folder](./docs/index.md).

## Developing 

### Commands

To run:

```bash
npm start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

To do a one-off build, use `npm run build`.

To run tests, use `npm test`.

### Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

#### Jest

Jest tests are set up to run with `npm test`.

#### Bundle Analysis

[`size-limit`](https://github.com/ai/size-limit) is set up to calculate the real cost of your library with `npm run size` and visualize the bundle with `npm run analyze`.

### Continuous Integration

#### GitHub Actions

Two actions are added by default:

- `main` which installs deps w/ cache, lints, tests, checks size and builds on all pushes against a Node and OS matrix
