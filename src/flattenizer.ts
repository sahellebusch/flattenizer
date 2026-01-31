/**
 * @public
 */
export type Nullable<A> = A | null | undefined;

/**
 * @public
 */
export type Delimiter = string;

/**
 * @public
 */
export interface IFlattened<P> {
  [path: string]: P;
}

/**
 * @public
 */
export interface IUnflattened<P> {
  [key: string]: P | P[] | IUnflattened<P>;
}

/**
 * Flattens an object.
 *
 * @example
 * ```
 * let unflattened = {
 *    name: 'Sean',
 *    city: 'Kansas City',
 *    favBreweries: [
 *        {
 *            name: 'Double Shift',
 *            favBeer: 'Sister Abbey'
 *        },
 *        {
 *           name: 'KC Bier Co',
 *            favBeer: 'Helles'
 *        }
 *    ]
 *};
 *
 * flatten(unflattened)
 * { name: 'Sean',
 *   city: 'Kansas City',
 *  'favBreweries.0.name': 'Double Shift',
 *  'favBreweries.0.favBeer': 'Sister Abbey',
 *  'favBreweries.1.name': 'KC Bier Co',
 *   'favBreweries.1.favBeer': 'Helles' }
 *```
 *
 * @param unflattened - the object to flatten
 * @param delimiter   - the delimiter to be used when flattening the object. Defalts to '.'.
 * @returns The flattened object, empty if provided object is undefined
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

  const flattened: A = Object.keys(unflattened).reduce(
    (acc: Record<string, string>, key: any) => {
      const value = unflattened[key];
      if (typeof value === 'object' && value !== null) {
        const flatObject = flatten(value, delimiter);

        for (const subKey of Object.keys(flatObject as any)) {
          // append to create new key value and assign it's value
          safeSet(
            acc,
            `${key}${delimiter}${subKey}`,
            (flatObject as any)[subKey]
          );
        }
      } else {
        safeSet(acc, key, value);
      }

      return acc;
    },
    {}
  ) as A;

  return flattened;
};

// Keys that could lead to prototype pollution
const DANGEROUS_KEYS = ['__proto__', 'prototype', 'constructor'];

const isDangerousKey = (key: string): boolean => DANGEROUS_KEYS.includes(key);

/**
 * Safely sets a property on an object without triggering special setters
 * like `__proto__` that can mutate prototypes.
 */
const safeSet = (
  obj: Record<string | number, any>,
  key: string | number,
  value: any
) => {
  Object.defineProperty(obj, key, {
    value,
    writable: true,
    enumerable: true,
    configurable: true,
  });
};

// Store reference to original hasOwnProperty at module load time to prevent
// bypass attacks that override Object.prototype.hasOwnProperty
const hasOwnProperty = Object.prototype.hasOwnProperty;

const explodeProperty = (
  currUnflattened: Record<string | number, any>,
  key: string,
  flattenedObj: Record<string, string>,
  delimiter: string
): void => {
  const keys = key.split(delimiter);
  const value = flattenedObj[key];
  const lastKeyIndex = keys.length - 1;

  // Check if any key in the path could lead to prototype pollution
  for (let i = 0; i < keys.length; i++) {
    if (isDangerousKey(keys[i])) {
      return;
    }
  }

  for (let idx = 0; idx < lastKeyIndex; idx++) {
    const currKey = keys[idx];
    let nextKeyVal: any;

    // Use saved reference to hasOwnProperty to prevent bypass via
    // overriding hasOwnProperty on Object.prototype after module load
    if (!hasOwnProperty.call(currUnflattened, currKey)) {
      nextKeyVal = parseInt(keys[idx + 1], 10);
      safeSet(currUnflattened, currKey, isNaN(nextKeyVal) ? {} : []);
    }

    currUnflattened = currUnflattened[currKey];
  }

  safeSet(currUnflattened, keys[lastKeyIndex], value);
};

/**
 * Unflattens an object with compressed keys.
 *
 * @remarks
 * This function blocks dangerous keys (__proto__, prototype, constructor)
 * anywhere in the key path to prevent prototype pollution attacks. It also
 * captures a reference to hasOwnProperty at module load time to prevent
 * bypass attacks that override Object.prototype.hasOwnProperty.
 *
 * @example
 * ```
 * let flattened = { name: 'Sean',
 *   city: 'Kansas City',
 *  'favBreweries.0.name': 'Double Shift',
 *  'favBreweries.0.favBeer': 'Sister Abbey',
 *  'favBreweries.1.name': 'KC Bier Co',
 *   'favBreweries.1.favBeer': 'Helles' }
 *
 * unflatten(flattened)
 *
 *  { name: 'Sean',
 *    city: 'Kansas City',
 *    favBreweries:
 *     [ { name: 'Double Shift', favBeer: 'Sister Abbey' },
 *       { name: 'KC Bier Co', favBeer: 'Helles' } ] }
 *```
 *
 * @param flattened - object to unflatten
 * @param delimiter - the delimiter to be used when unflattening the object. Defaults to '.'.
 * @returns The unflattened object, empty if provided object is undefined.
 * @public
 */
export const unflatten = <
  A extends IFlattened<any>,
  B extends IUnflattened<any>
>(
  flattened: Nullable<A>,
  delimiter: Delimiter = '.'
): Nullable<B> => {
  if (flattened === undefined) {
    return undefined;
  }

  if (flattened === null) {
    return null;
  }

  const unflattened: B = Object.keys(flattened).reduce((acc, key) => {
    explodeProperty(acc, key, flattened, delimiter);
    return acc;
  }, {} as B);

  return unflattened;
};

export default { flatten, unflatten };
