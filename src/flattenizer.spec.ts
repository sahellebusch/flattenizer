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

    test('will not pollute via __proto__ key assignment', () => {
      const original = (Object.prototype as any).polluted;
      delete (Object.prototype as any).polluted;

      try {
        // JSON.parse creates a normal data property named "__proto__"
        const unflattened = JSON.parse('{"__proto__":"yes","safe":1}');
        const result = flatten(unflattened as any) as any;

        expect(({} as any).polluted).toBeUndefined();
        expect(result.safe).toBe(1);
        expect(result.__proto__).toBe('yes');
      } finally {
        if (original !== undefined) {
          (Object.prototype as any).polluted = original;
        } else {
          delete (Object.prototype as any).polluted;
        }
      }
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

  describe('prototype pollution prevention', () => {
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

      const result = unflatten(flattened);
      expect(result?.__proto__?.polluted).not.toBeDefined();
      expect(result).toEqual(expected);
    });

    test('will not pollute via constructor.prototype', () => {
      const flattened = {
        'constructor.prototype.polluted': 'yes',
        'prop1.subProp1': 'value',
      };

      const expected = {
        prop1: {
          subProp1: 'value',
        },
      };

      const result = unflatten(flattened);
      expect(({} as any).polluted).toBeUndefined();
      expect(result).toEqual(expected);
    });

    test('will not pollute via nested __proto__ path', () => {
      const flattened = {
        'a.__proto__.polluted': 'yes',
        'prop1.subProp1': 'value',
      };

      const expected = {
        prop1: {
          subProp1: 'value',
        },
      };

      const result = unflatten(flattened);
      expect(({} as any).polluted).toBeUndefined();
      expect(result).toEqual(expected);
    });

    test('will not pollute via prototype key', () => {
      const flattened = {
        'prototype.polluted': 'yes',
        'prop1.subProp1': 'value',
      };

      const expected = {
        prop1: {
          subProp1: 'value',
        },
      };

      const result = unflatten(flattened);
      expect(({} as any).polluted).toBeUndefined();
      expect(result).toEqual(expected);
    });

    test('uses captured hasOwnProperty reference from module load time', () => {
      // This test verifies that the module captures hasOwnProperty at load time.
      // Even if hasOwnProperty is overridden after the module loads, the module
      // continues to use the original reference, preventing bypass attacks.
      // The key protection is that dangerous keys (constructor, prototype, __proto__)
      // are blocked regardless of hasOwnProperty behavior.
      const originalHasOwnProperty = Object.prototype.hasOwnProperty;
      Object.prototype.hasOwnProperty = (() => true) as any;

      try {
        const flattened = {
          'constructor.prototype.polluted': 'yes',
          'prop1.subProp1': 'value',
        };

        const expected = {
          prop1: {
            subProp1: 'value',
          },
        };

        // The unflatten should still work correctly because:
        // 1. The module captured hasOwnProperty at load time (before override)
        // 2. Dangerous keys are blocked before any hasOwnProperty check
        const result = unflatten(flattened);
        expect(({} as any).polluted).toBeUndefined();
        expect(result).toEqual(expected);
      } finally {
        Object.prototype.hasOwnProperty = originalHasOwnProperty;
      }
    });

    test('cannot be bypassed by overriding hasOwnProperty before importing the module', () => {
      const originalHasOwnProperty = Object.prototype.hasOwnProperty;
      const originalPolluted = (Object.prototype as any).polluted;
      delete (Object.prototype as any).polluted;

      try {
        // Attacker-controlled environment: poison hasOwnProperty BEFORE import/require
        Object.prototype.hasOwnProperty = (() => true) as any;

        jest.resetModules();
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { unflatten: freshUnflatten } = require('./flattenizer');

        const flattened = { 'constructor.prototype.polluted': 'yes', ok: 1 };
        const result = freshUnflatten(flattened);

        expect(({} as any).polluted).toBeUndefined();
        expect(result).toEqual({ ok: 1 });
      } finally {
        Object.prototype.hasOwnProperty = originalHasOwnProperty;
        if (originalPolluted !== undefined) {
          (Object.prototype as any).polluted = originalPolluted;
        } else {
          delete (Object.prototype as any).polluted;
        }
        jest.resetModules();
      }
    });
  });
});
