import { expect } from 'chai';
import { flatten, unflatten } from '../src/flattenizer';

console.log(expect)

describe('Flattenizer!', () => {
  describe('.flatten', () => {

    it('will throw an error if a value passed in is not undef, but also not an object[string]', () => {
      expect(() => {
        flatten('boom')
      }).to.throw('unflattened is not an object');
    });

    it('will throw an error if a value passed in is not undef, but also not an object[number]', () => {
      expect(() => {
        flatten(5)
      }).to.throw('unflattened is not an object');
    });

    it('will throw an error if a value passed in is not undef, but also not an object[function]', () => {
      expect(() => {
        flatten(() => 'why would you do this...')
      }).to.throw('unflattened is not an object');
    });

    // TODO: travis CI doens't support Symbol, in fact not many browers do.  until then, commenting this out.
    // it('will throw an error if a value passed in is not undef, but also not an object[function]', () => {
    //     expect(() => {
    //         flatten(Symbol('boom'))
    //     }).toThrow(new TypeError('unflattened is not an object'));
    // });
    //
    // it('will throw an error if the delimiter passed in is not a string[symbol]', () => {
    //     expect(() => {
    //         flatten({}, Symbol('boom'));
    //     }).toThrow(new TypeError('delimiter must be a string'));
    // });

    it('will throw an error if the delimiter passed in is not a string[object]', () => {
      expect(() => {
        flatten({}, {});
      }).to.throw('delimiter must be a string');
    });

    it('will throw an error if the delimiter passed in is not a string[number]', () => {
      expect(() => {
        flatten({}, 1);
      }).to.throw('delimiter must be a string');
    });

    it('will throw an error if the delimiter passed in is not a string[function]', () => {
      expect(() => {
        flatten({}, () => 'why would you ever do this...');
      }).to.throw('delimiter must be a string');
    });

    it('will return undefined if undefined is passed in', () => {
      expect(flatten(undefined)).eql(undefined);
    });

    it('will return null if null is passed in', () => {
      expect(flatten(null)).eql(null)
    });

    it('can flatten an empty object', () => {
      expect(flatten({})).eql({});
    });

    it('can flatten an object with a single property', () => {
      let unflattened = {
        prop: 'value'
      };

      expect(flatten(unflattened)).eql(unflattened);
    });

    it('can flatten an object with multiple properties', () => {
      let unflattened = {
        prop1: 'value',
        prop2: 'value2'
      };

      expect(flatten(unflattened)).eql(unflattened);
    });

    it('can flatten nested objects', () => {
      let unflattened = {
        prop1: {
          subProp1: 'value'
        },
        prop2: {
          subProp2: {
            subSubProp1: 12
          }
        }
      };

      let expected = {
        'prop1.subProp1': 'value',
        'prop2.subProp2.subSubProp1': 12
      };

      expect(flatten(unflattened)).eql(expected);
    });

    it('can flatten with a custom delimiter', () => {
      let unflattened = {
        prop1: {
          subProp1: 'value'
        },
        prop2: {
          subProp2: {
            subSubProp1: 12
          }
        }
      };

      let expected = {
        'prop1|subProp1': 'value',
        'prop2|subProp2|subSubProp1': 12
      };

      expect(flatten(unflattened, '|')).eql(expected);
    });

    it('can flatten with a complicated custom delimiter', () => {
      let unflattened = {
        prop1: {
          subProp1: 'value'
        },
        prop2: {
          subProp2: {
            subSubProp1: 12
          }
        }
      };

      let expected = {
        'prop1%delim%subProp1': 'value',
        'prop2%delim%subProp2%delim%subSubProp1': 12
      };

      expect(flatten(unflattened, '%delim%')).eql(expected);
    });

    it('can flatten arrays', () => {
      let unflattened = {
        prop: 'not array',
        arrayProp: [
          'value1', 12
        ]
      };

      let expected = {
        'prop': 'not array',
        'arrayProp.0': 'value1',
        'arrayProp.1': 12
      };

      expect(flatten(unflattened)).eql(expected);
    });

    it('can flatten objects composed of nested objects and arrays', () => {
      let unflattened = {
        'index': 0,
        'name': 'Willis Pena',
        'company': 'ROCKYARD',
        'email': 'willispena@rockyard.com',
        'tags': [
          'laboris',
          'irure',
          'exercitation',
          'et',
          'dolore',
          'et',
          'id'
        ],
        'friends': [
          { 'id': 0, 'name': 'Gentry Martin' },
          { 'id': 1, 'name': 'Owen Willis' },
          { 'id': 2, 'name': 'Lynnette Gilmore' }
        ]
      };

      let expected = {
        'index': 0,
        'name': 'Willis Pena',
        'company': 'ROCKYARD',
        'email': 'willispena@rockyard.com',
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
        'friends.2.name': 'Lynnette Gilmore'
      };

      expect(flatten(unflattened)).eql(expected);
    });

    it('will retain undefined values as undefined', () => {
      let unflattened = {
        prop1: undefined,
        prop2: {
          subProp2: {
            subSubProp1: 12
          }
        }
      };

      let expected = {
        'prop1': undefined,
        'prop2.subProp2.subSubProp1': 12
      };

      expect(flatten(unflattened)).eql(expected);
    });

  });

  describe('.unflatten', () => {

    it('will throw an error if a value passed in is not undef, but also not an object[string]', () => {
      expect(() => {
        unflatten('boom')
      }).to.throw('flattened is not an object');
    });

    it('will throw an error if a value passed in is not undef, but also not an object[number]', () => {
      expect(() => {
        unflatten(5)
      }).to.throw('flattened is not an object');
    });

    it('will throw an error if a value passed in is not undef, but also not an object[function]', () => {
      expect(() => {
        unflatten(() => { return 'why would you do this...' })
      }).to.throw('flattened is not an object');
    });

    // TODO: travis CI doens't support Symbol, in fact not many browers do.  until then, commenting this out.
    // it('will throw an error if a value passed in is not undef, but also not an object[symbol]', () => {
    //     expect(() => {
    //         unflatten(Symbol('boom'))
    //     }).toThrow(new TypeError('flattened is not an object'));
    // });
    //
    // it('will throw an error if the delimiter passed in is not a string[symbol]', () => {
    //     expect(() => {
    //         unflatten({}, Symbol('boom'));
    //     }).toThrow(new TypeError('delimiter must be a string'));
    // });

    it('will throw an error if the delimiter passed in is not a string[object]', () => {
      expect(() => {
        unflatten({}, {});
      }).to.throw('delimiter must be a string');
    });

    it('will throw an error if the delimiter passed in is not a string[number]', () => {
      expect(() => {
        unflatten({}, 1);
      }).to.throw('delimiter must be a string');
    });

    it('will throw an error if the delimiter passed in is not a string[function]', () => {
      expect(() => {
        unflatten({}, () => {
          return 'why would you ever do this...'
        });
      }).to.throw('delimiter must be a string');
    });

    it('will return undefined if undefined is passed in', () => {
      expect(unflatten(undefined)).eql(undefined)
    });

    it('will return null if null is passed in', () => {
      expect(unflatten(null)).eql(null)
    });

    it('can unflatten an empty object', () => {
      expect(unflatten({})).eql({});
    });

    it('can unflatten an object with a single property', () => {
      let unflattened = {
        prop: 'value'
      };

      expect(unflatten(unflattened)).eql(unflattened);
    });

    it('can unflatten an object with multiple properties', () => {
      let unflattened = {
        prop1: 'value',
        prop2: 'value2'
      };

      expect(unflatten(unflattened)).eql(unflattened);
    });

    it('can unflatten nested objects', () => {
      let flattened = {
        'prop1.subProp1': 'value',
        'prop2.subProp2.subSubProp1': 12
      };

      let expected = {
        prop1: {
          subProp1: 'value'
        },
        prop2: {
          subProp2: {
            subSubProp1: 12
          }
        }
      };

      expect(unflatten(flattened)).eql(expected);
    });

    it('can unflatten objects with a custom delimiter', () => {
      let flattened = {
        'prop1|subProp1': 'value',
        'prop2|subProp2|subSubProp1': 12
      };

      let expected = {
        prop1: {
          subProp1: 'value'
        },
        prop2: {
          subProp2: {
            subSubProp1: 12
          }
        }
      };

      expect(unflatten(flattened, '|')).eql(expected);
    });

    it('can unflatten objects with a complicated delimiter', () => {
      let flattened = {
        'prop1%delim%subProp1': 'value',
        'prop2%delim%subProp2%delim%subSubProp1': 12
      };

      let expected = {
        prop1: {
          subProp1: 'value'
        },
        prop2: {
          subProp2: {
            subSubProp1: 12
          }
        }
      };

      expect(unflatten(flattened, '%delim%')).eql(expected);
    });

    it('can unflatten arrays', () => {
      let flattened = {
        'prop': 'not array',
        'arrayProp.0': 'value1',
        'arrayProp.1': 12
      };

      let expected = {
        prop: 'not array',
        arrayProp: [
          'value1', 12
        ]
      };

      expect(unflatten(flattened)).eql(expected);
    });

    it('can unflatten objects composed of nested objects and arrays', () => {
      let flattened = {
        'index': 0,
        'name': 'Willis Pena',
        'company': 'ROCKYARD',
        'email': 'willispena@rockyard.com',
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
        'friends.2.name': 'Lynnette Gilmore'
      };

      let expected = {
        'index': 0,
        'name': 'Willis Pena',
        'company': 'ROCKYARD',
        'email': 'willispena@rockyard.com',
        'tags': [
          'laboris',
          'irure',
          'exercitation',
          'et',
          'dolore',
          'et',
          'id'
        ],
        'friends': [
          { 'id': 0, 'name': 'Gentry Martin' },
          { 'id': 1, 'name': 'Owen Willis' },
          { 'id': 2, 'name': 'Lynnette Gilmore' }
        ]
      };

      expect(unflatten(flattened)).eql(expected);
    });

    it('will retain undefined values as undefined', () => {
      let flattened = {
        'prop1': undefined,
        'prop2.subProp2.subSubProp1': 12
      };

      let expected = {
        prop1: undefined,
        prop2: {
          subProp2: {
            subSubProp1: 12
          }
        }
      };

      expect(unflatten(flattened)).eql(expected);
    });
  });
});
