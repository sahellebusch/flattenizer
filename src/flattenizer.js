/**
 * Module to flatten and unflatten objects.
 *
 * @module Flattenizer
 */

/**
 * Flattens an object
 *
 * @function
 * @param {Object} unflattened - the object to flatten
 * @returns {Object} - the flattened object, empty if provided object is undefined
 * @public
 */
export const flatten = unflattened => {
    if (typeof unflattened === 'undefined')
        return {};

    let flattened = {};

    for (let key in unflattened) {
        if (!unflattened.hasOwnProperty(key))
            continue;

        if (typeof unflattened[key] === 'object') {
            let flatObject = flatten(unflattened[key]);
            for (let subKey in flatObject) {
                // append to create new key value and assign it's value
                flattened[key + '.' + subKey] = flatObject[subKey];
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
 * @function
 * @param {Object} flattened - object to unflatten
 * @returns {Object} - the unflattened object, empty if provided object is undefined
 * @public
 */
export const unflatten = flattened => {
    if (typeof flattened === 'undefined')
        return {};

    let unflattened = {};

    for (let prop in flattened) {
        if (flattened.hasOwnProperty(prop)) {
            explodeProperty(unflattened, prop, flattened);
        }
    }

    return unflattened;
};

/**
 * Explodes a flattened object key.
 *
 * @function
 * @param {Object} currUnflattened the current unflattened object
 * @param {String} key the current property to explode
 * @param {Object} flattenedObj the current flattened object
 * @private
 */
const explodeProperty = (currUnflattened, key, flattenedObj) => {
    const keys = key.split('.');
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