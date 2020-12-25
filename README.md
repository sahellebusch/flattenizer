# Flattenizer

Functions to flatten and unflatten nested JavaScript objects into a single level.  Keys are enumerated if they collide.

- [Usage](#usage)
  * [API](#api)
- [Developing](#developing)
  * [Commands](#commands)
  * [Configuration](#configuration)
  * [Continuous Integration](#continuous-integration)
  
## Usage

Flattenizer is a UMD module, therefore is compatible with both AMD and CommonJS:
```javascript
import * as flattenizer from 'flattenizer';
import { flatten, unflatten } from 'flattenizer';
const flattenizer = require('flattenizer');
```

```
> const flattenizer = require('flattenizer');
> 
> let unflattened = {
    name: 'Sean',
    city: 'Kansas City',
    favBreweries: [
        {
            name: 'Double Shift',
            favBeer: 'Sister Abbey'
        },
        {
            name: 'KC Bier Co',
            favBeer: 'Helles'
        }
    ]
};
>
> let flattened = flattenizer.flatten(unflattened)
  { name: 'Sean',
    city: 'Kansas City',
    'favBreweries.0.name': 'Double Shift',
    'favBreweries.0.favBeer': 'Sister Abbey',
    'favBreweries.1.name': 'KC Bier Co',
    'favBreweries.1.favBeer': 'Helles' }
>
> flattenizer.unflatten(flattened)
  { name: 'Sean',
    city: 'Kansas City',
    favBreweries:
     [ { name: 'Double Shift', favBeer: 'Sister Abbey' },
       { name: 'KC Bier Co', favBeer: 'Helles' } ] }
```

### API

##### flatten(unflattened)
```javascript
/**
 * Flattens an object.
 *
 * @memberOf module:Flattenizer
 * @function
 * @param {Object} unflattened     - the object to flatten
 * @param {String} [delimiter='.'] - the delimiter to be used when flattening the object
 * @returns {Object}               - the flattened object, empty if provided object is undefined
 * @throws {TypeError}             - if object passed in is not an object or if the delimiter is not a string
 * @public
 */
``` 

##### unflatten(flattened)
```javascript
/**
 * Unflattens an object with compressed keys.
 *
 * @memberOf module:Flattenizer
 * @function
 * @param {Object} flattened       - object to unflatten
 * @param {String} [delimiter='.'] - the delimiter to be used when unflattening the object
 * @returns {Object}               - the unflattened object, empty if provided object is undefined
 * @throws {TypeError}             - if object passed in is not an object or if the delimiter is not a string
 * @public
 */
```

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
