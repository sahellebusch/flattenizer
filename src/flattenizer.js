/**
 * Module to flatten and unflatten objects.
 *
 * @module Flattenizer
 */

/**
 * Flattens an object
 *
 * @memberOf module:Flattenizer
 * @function
 * @param {Object} unflattened     - the object to flatten
 * @param {String} [delimiter='.'] - the delimiter to be used when flattening the object
 * @returns {Object}               - the flattened object, empty if provided object is undefined
 * @throws {TypeError}             - if object passed in is not an object or if the delimiter is not a string
 * @public
 */
export const flatten = (unflattened, delimiter = '.') => {
    if (typeof unflattened === 'undefined')
        return {};

    if (typeof unflattened !== 'object') {
        throw new TypeError('unflattened is not an object');
    }

    if(typeof delimiter !== 'string') {
        throw new TypeError('delimiter must be a string');
    }

    let flattened = {};

    for (let key in unflattened) {
        if (!unflattened.hasOwnProperty(key))
            continue;

        if (typeof unflattened[key] === 'object') {
            let flatObject = flatten(unflattened[key], delimiter);
            for (let subKey in flatObject) {
                // append to create new key value and assign it's value
                flattened[`${key}${delimiter}${subKey}`] = flatObject[subKey];
            }
        } else {
            flattened[key] = unflattened[key];
        }
    }

    return flattened;
};

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
export const unflatten = (flattened, delimiter = '.') => {
    if (typeof flattened === 'undefined')
        return {};

    if (typeof flattened !== 'object') {
        throw new TypeError('flattened is not an object');
    }

    if(typeof delimiter !== 'string') {
        throw new TypeError('delimiter must be a string');
    }

    let unflattened = {};

    for (let prop in flattened) {
        if (flattened.hasOwnProperty(prop)) {
            explodeProperty(unflattened, prop, flattened, delimiter);
        }
    }

    return unflattened;
};

/**
 * Explodes a flattened object key.
 *
 * @function
 * @param {Object} currUnflattened - the current unflattened object
 * @param {String} key             - the current property to explode
 * @param {Object} flattenedObj    - the current flattened object
 * @param {String} delimiter       - the delimiter to be used when unflattening the object
 * @private
 */
const explodeProperty = (currUnflattened, key, flattenedObj, delimiter) => {
    const keys = key.split(delimiter);
    const value = flattenedObj[key];
    const lastKeyIndex = keys.length - 1;

    for (let idx = 0; idx < lastKeyIndex; idx++) {
        const currKey = keys[idx];
        let nextKeyVal;

        if (!(currKey in currUnflattened)) {
            nextKeyVal = parseInt(keys[idx + 1], 10);
            currUnflattened[currKey] = isNaN(nextKeyVal) ? {} : [];
        }

        currUnflattened = currUnflattened[currKey];
    }

    currUnflattened[keys[lastKeyIndex]] = value;
};

export default {flatten, unflatten}