/**
 * Flattens an object
 *
 * @param {Object} obj - the object to unflatten
 * @returns {Object} - the flattened object, empty if provided object is undefined
 */
export const flatten = (obj) => {
    if(typeof obj === 'undefined')
        return {};

    return Object.keys(obj).reduce((acc, value) => {
        if (typeof obj[value] === 'object') {
            let flatObject = flatten(obj[value]);
            for (let subKey in flatObject) {
                // append to create new key value and assign it's value
                acc[value + '.' + subKey] = flatObject[subKey];
            }
        }
        else {
            acc[value] = obj[value];
        }

        return acc;
    }, {});
};

/**
 * Unflattens an object with compressed keys.
 *
 * @param {Object} flattened - object to unflatten
 * @returns {Object} - the unflattened object, empty if provided object is undefined
 */
export const unflatten = flattened => {
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
 * @param {Object} currUnflattened the current unflattened object
 * @param {String} prop the current property to explode
 * @param {Object} flattenedObj the current flattened object
 */
const explodeProperty = (currUnflattened, prop, flattenedObj) => {
    let keys = prop.split('.');
    let value = flattenedObj[prop];
    let lastKeyIndex = keys.length - 1;

    for (let idx = 0; idx < lastKeyIndex; idx++) {
        let currKey = keys[idx];

        if (!(currKey in currUnflattened)) {
            let nextKeyVal = parseInt(keys[idx + 1], 10);
            currUnflattened[currKey] = isNaN(nextKeyVal) ? {} : [];
        }

        currUnflattened = currUnflattened[currKey];
    }

    currUnflattened[keys[lastKeyIndex]] = value;
};

export default {flatten, unflatten}