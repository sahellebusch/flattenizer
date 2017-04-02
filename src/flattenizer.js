/**
 * Flattens a valid object
 *
 * @param obj the object to unflatten
 * @returns {object} the flattened object
 */
export const flattenate = (obj) => {
   let flattened = {};

    for (let key in obj) {
        if (!obj.hasOwnProperty(key))
            continue;

        if (typeof obj[key] === 'object') {
            let flatObject = flattenate(obj[key]);
            for (let subKey in flatObject) {
                // append to create new key value and assign it's value
                flattened[key + '.' + subKey] = flatObject[subKey];
            }
        } else {
            // be sure all property values are strings!
            flattened[key] = obj[key];
        }
    }

    return flattened;
};

/**
 * Unflattens a flattened object
 *
 * @param flattened
 * @returns {object} the unflattened object
 */
export const unflattenate = flattened => {
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
 * @param currUnflattened the current unflattened object
 * @param prop the current property to explode
 * @param flattenedObj the current flattened object
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

export default { flattenate, unflattenate }