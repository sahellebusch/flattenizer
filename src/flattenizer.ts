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

        for (const subKey in flatObject) {
          // append to create new key value and assign it's value
          acc[`${key}${delimiter}${subKey}`] = flatObject[subKey];
        }
      } else {
        acc[key] = value;
      }

      return acc;
    },
    {}
  ) as A;

  return flattened;
};

const explodeProperty = (
  currUnflattened: Record<string | number, any>,
  key: string,
  flattenedObj: Record<string, string>,
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
