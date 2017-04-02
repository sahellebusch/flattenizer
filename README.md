# Flattenizer
Functions to flatten and unflatten nested JavaScript objects into a single level.  Keys are enumerated if they collide.

[![NPM](https://nodei.co/npm/flattenizer.png)](https://npmjs.org/package/flattenizer)

[![build status](https://secure.travis-ci.org/sahellebusch/flattenizer.png)](http://travis-ci.org/sahellebusch/flattenizer)
[![npm version](https://badge.fury.io/js/flattenizer.svg)](https://badge.fury.io/js/flattenizer)


### Usage

Flattenizer is a UMD module, therefore is compatible with both AMD and CommonJS:
```javascript
import * as flattenizer from 'flattenizer';
import { flatten, unflatten } from 'flattenizer';
const flattenizer = require('flattenizer');
```

### Example Usage
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
 * @function
 * @param {Object} unflattened - the object to flatten
 * @returns {Object} - the flattened object, empty if provided object is undefined
 * @public
 */
``` 

##### unflatten(flattened)
```javascript
/**
 * Unflattens an object with compressed keys.
 *
 * @function
 * @param {Object} flattened - object to unflatten
 * @returns {Object} - the unflattened object, empty if provided object is undefined
 * @public
 */
```