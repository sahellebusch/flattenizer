/**
 * Module to flatten and unflatten objects.
 *
 * @module Flattenizer
 */

export type Nullable<A> = A | null | undefined;
export type Delimiter = string;

export interface IFlattened<P> {
  [path: string]: P;
}

export interface IUnflattened<P> {
  [key: string]: P | P[] | IUnflattened<P>;
}

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
export const flatten = <A extends IFlattened<any>, B extends IUnflattened<any>>(
  unflattened: Nullable<B>,
  delimiter: Delimiter = '.'
): Nullable<A> => {
  if (unflattened === undefined) {
    return undefined;
  }

  if (unflattened === null) {
    return null;
  }

  if (typeof unflattened !== 'object') {
    throw new TypeError('unflattened is not an object');
  }

  if (typeof delimiter !== 'string') {
    throw new TypeError('delimiter must be a string');
  }

  const flattened: A = Object.keys(unflattened).reduce((acc, key) => {
    const value = unflattened[key];
    if (typeof value === 'object' && value !== null) {
      const flatObject = flatten(value, delimiter);

      for (const subKey in flatObject) {
        // append to create new key value and assign it's value
        acc[`${key}${delimiter}${subKey}`] = flatObject[subKey];
      }
    } else {
      acc[key] = value;
    }

    return acc;
  }, {}) as A;

  return flattened;
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
const explodeProperty = (
  currUnflattened: Record<string, unknown>,
  key: string,
  flattenedObj: Record<string, unknown>,
  delimiter: string
): void => {
  const keys = key.split(delimiter);
  const value = flattenedObj[key];
  const lastKeyIndex = keys.length - 1;

  for (let idx = 0; idx < lastKeyIndex; idx++) {
    const currKey = keys[idx];
    let nextKeyVal;

    if (!currUnflattened.hasOwnProperty(currKey)) {
      nextKeyVal = parseInt(keys[idx + 1], 10);
      currUnflattened[currKey] = isNaN(nextKeyVal) ? {} : [];
    }

    currUnflattened = currUnflattened[currKey];
  }

  currUnflattened[keys[lastKeyIndex]] = value;
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
export const unflatten = <A extends IFlattened<any>, B extends IUnflattened<any>>(
  flattened: Nullable<A>,
  delimiter: Delimiter = '.'
): Nullable<B> => {
  if (flattened === undefined) {
    return undefined;
  }

  if (flattened === null) {
    return null;
  }
  if (typeof flattened !== 'object') {
    throw new TypeError('flattened is not an object');
  }

  if (typeof delimiter !== 'string') {
    throw new TypeError('delimiter must be a string');
  }

  const unflattened: B = Object.keys(flattened).reduce((acc, key) => {
    explodeProperty(acc, key, flattened, delimiter);
    return acc;
  }, {} as B);

  return unflattened;
};

export default {flatten, unflatten};
