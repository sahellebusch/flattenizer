# Flattenizer
Functions to flatten and unflatten nested JavaScript objects into a single level.  Keys are enumerated if they collide.

[![NPM](https://nodei.co/npm/flattenizer.png)](https://npmjs.org/package/flattenizer)

[![build status](https://api.travis-ci.org/sahellebusch/flattenizer.png?branch=master)](http://travis-ci.org/sahellebusch/flattenizer)
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
