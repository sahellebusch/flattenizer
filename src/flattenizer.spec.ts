import { flatten, unflatten } from './flattenizer';

describe('Flattenizer!', () => {
  describe('.flatten', () => {
    test('will return undefined if undefined is passed in', () => {
      expect(flatten(undefined)).toEqual(undefined);
    });

    test('will return null if null is passed in', () => {
      expect(flatten(null)).toEqual(null);
    });

    test('can flatten an empty object', () => {
      expect(flatten({})).toEqual({});
    });

    test('can flatten an object with a single property', () => {
      const unflattened = {
        prop: 'value',
      };

      expect(flatten(unflattened)).toEqual(unflattened);
    });

    test('can flatten an object with multiple properties', () => {
      const unflattened = {
        prop1: 'value',
        prop2: 'value2',
      };

      expect(flatten(unflattened)).toEqual(unflattened);
    });

    test('can flatten nested objects', () => {
      const unflattened = {
        prop1: {
          subProp1: 'value',
        },
        prop2: {
          subProp2: {
            subSubProp1: 12,
          },
        },
      };

      const expected = {
        'prop1.subProp1': 'value',
        'prop2.subProp2.subSubProp1': 12,
      };

      expect(flatten(unflattened)).toEqual(expected);
    });

    test('can flatten with a custom delimiter', () => {
      const unflattened = {
        prop1: {
          subProp1: 'value',
        },
        prop2: {
          subProp2: {
            subSubProp1: 12,
          },
        },
      };

      const expected = {
        'prop1|subProp1': 'value',
        'prop2|subProp2|subSubProp1': 12,
      };

      expect(flatten(unflattened, '|')).toEqual(expected);
    });

    test('can flatten with a complicated custom delimiter', () => {
      const unflattened = {
        prop1: {
          subProp1: 'value',
        },
        prop2: {
          subProp2: {
            subSubProp1: 12,
          },
        },
      };

      const expected = {
        'prop1%delim%subProp1': 'value',
        'prop2%delim%subProp2%delim%subSubProp1': 12,
      };

      expect(flatten(unflattened, '%delim%')).toEqual(expected);
    });

    test('can flatten arrays', () => {
      const unflattened = {
        prop: 'not array',
        arrayProp: ['value1', 12],
      };

      const expected = {
        prop: 'not array',
        'arrayProp.0': 'value1',
        'arrayProp.1': 12,
      };

      expect(flatten(unflattened)).toEqual(expected);
    });

    test('can flatten objects composed of nested objects and arrays', () => {
      const unflattened = {
        index: 0,
        name: 'Willis Pena',
        company: 'ROCKYARD',
        email: 'willispena@rockyard.com',
        tags: ['laboris', 'irure', 'exercitation', 'et', 'dolore', 'et', 'id'],
        friends: [
          { id: 0, name: 'Gentry Martin' },
          { id: 1, name: 'Owen Willis' },
          { id: 2, name: 'Lynnette Gilmore' },
        ],
      };

      const expected = {
        index: 0,
        name: 'Willis Pena',
        company: 'ROCKYARD',
        email: 'willispena@rockyard.com',
        'tags.0': 'laboris',
        'tags.1': 'irure',
        'tags.2': 'exercitation',
        'tags.3': 'et',
        'tags.4': 'dolore',
        'tags.5': 'et',
        'tags.6': 'id',
        'friends.0.id': 0,
        'friends.0.name': 'Gentry Martin',
        'friends.1.id': 1,
        'friends.1.name': 'Owen Willis',
        'friends.2.id': 2,
        'friends.2.name': 'Lynnette Gilmore',
      };

      expect(flatten(unflattened)).toEqual(expected);
    });

    test('will retain undefined values as undefined', () => {
      const unflattened = {
        prop1: undefined,
        prop2: {
          subProp2: {
            subSubProp1: 12,
          },
        },
      };

      const expected = {
        prop1: undefined,
        'prop2.subProp2.subSubProp1': 12,
      };

      expect(flatten(unflattened)).toEqual(expected);
    });
  });

  describe('.unflatten', () => {
    test('will return undefined if undefined is passed in', () => {
      expect(unflatten(undefined)).toEqual(undefined);
    });

    test('will return null if null is passed in', () => {
      expect(unflatten(null)).toEqual(null);
    });

    test('can unflatten an empty object', () => {
      expect(unflatten({})).toEqual({});
    });

    test('can unflatten an object with a single property', () => {
      const unflattened = {
        prop: 'value',
      };

      expect(unflatten(unflattened)).toEqual(unflattened);
    });

    test('can unflatten an object with multiple properties', () => {
      const unflattened = {
        prop1: 'value',
        prop2: 'value2',
      };

      expect(unflatten(unflattened)).toEqual(unflattened);
    });

    test('can unflatten nested objects', () => {
      const flattened = {
        'prop1.subProp1': 'value',
        'prop2.subProp2.subSubProp1': 12,
      };

      const expected = {
        prop1: {
          subProp1: 'value',
        },
        prop2: {
          subProp2: {
            subSubProp1: 12,
          },
        },
      };

      expect(unflatten(flattened)).toEqual(expected);
    });

    test('can unflatten objects with a custom delimiter', () => {
      const flattened = {
        'prop1|subProp1': 'value',
        'prop2|subProp2|subSubProp1': 12,
      };

      const expected = {
        prop1: {
          subProp1: 'value',
        },
        prop2: {
          subProp2: {
            subSubProp1: 12,
          },
        },
      };

      expect(unflatten(flattened, '|')).toEqual(expected);
    });

    test('can unflatten objects with a complicated delimiter', () => {
      const flattened = {
        'prop1%delim%subProp1': 'value',
        'prop2%delim%subProp2%delim%subSubProp1': 12,
      };

      const expected = {
        prop1: {
          subProp1: 'value',
        },
        prop2: {
          subProp2: {
            subSubProp1: 12,
          },
        },
      };

      expect(unflatten(flattened, '%delim%')).toEqual(expected);
    });

    test('can unflatten arrays', () => {
      const flattened = {
        prop: 'not array',
        'arrayProp.0': 'value1',
        'arrayProp.1': 12,
      };

      const expected = {
        prop: 'not array',
        arrayProp: ['value1', 12],
      };

      expect(unflatten(flattened)).toEqual(expected);
    });

    test('can unflatten objects composed of nested objects and arrays', () => {
      const flattened = {
        index: 0,
        name: 'Willis Pena',
        company: 'ROCKYARD',
        email: 'willispena@rockyard.com',
        'tags.0': 'laboris',
        'tags.1': 'irure',
        'tags.2': 'exercitation',
        'tags.3': 'et',
        'tags.4': 'dolore',
        'tags.5': 'et',
        'tags.6': 'id',
        'friends.0.id': 0,
        'friends.0.name': 'Gentry Martin',
        'friends.1.id': 1,
        'friends.1.name': 'Owen Willis',
        'friends.2.id': 2,
        'friends.2.name': 'Lynnette Gilmore',
      };

      const expected = {
        index: 0,
        name: 'Willis Pena',
        company: 'ROCKYARD',
        email: 'willispena@rockyard.com',
        tags: ['laboris', 'irure', 'exercitation', 'et', 'dolore', 'et', 'id'],
        friends: [
          { id: 0, name: 'Gentry Martin' },
          { id: 1, name: 'Owen Willis' },
          { id: 2, name: 'Lynnette Gilmore' },
        ],
      };

      expect(unflatten(flattened)).toEqual(expected);
    });

    test('will retain undefined values as undefined', () => {
      const flattened = {
        prop1: undefined,
        'prop2.subProp2.subSubProp1': 12,
      };

      const expected = {
        prop1: undefined,
        prop2: {
          subProp2: {
            subSubProp1: 12,
          },
        },
      };

      expect(unflatten(flattened)).toEqual(expected);
    });
  });

  test('will not pollute the object __proto__ property', () => {
    const flattened = {
      '__proto__.polluted': true,
      'prop1.subProp1': 'value',
      'prop2.subProp2.subSubProp1': 12,
    };

      const expected = {
        prop1: {
          subProp1: 'value',
        },
        prop2: {
          subProp2: {
            subSubProp1: 12,
          },
        },
      };

    const result = unflatten(flattened);;
    expect(result?.__proto__?.polluted).not.toBeDefined();
    expect(result).toEqual(expected);
  });
});
