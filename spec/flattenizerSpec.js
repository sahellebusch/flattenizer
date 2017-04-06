'use strict';
// import {flatten, unflatten} from '../src/flattenizer';

describe('Flattenator!', () => {
    describe('.flatten', () => {

        it('will return an empty object if undefined is passed in', () => {
            expect(flatten(undefined)).toEqual({})
        });

        it('can flatten an empty object', () => {
            expect(flatten({})).toEqual({});
        });

        it('can flatten an object with a single property', () => {
            let unflattened = {
                prop: 'value'
            };

            expect(flatten(unflattened)).toEqual(unflattened);
        });

        it('can flatten an object with multiple properties', () => {
            let unflattened = {
                prop1: 'value',
                prop2: 'value2'
            };

            expect(flatten(unflattened)).toEqual(unflattened);
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

            expect(flatten(unflattened)).toEqual(expected);
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

            expect(flatten(unflattened)).toEqual(expected);
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
                    {'id': 0, 'name': 'Gentry Martin'},
                    {'id': 1, 'name': 'Owen Willis'},
                    {'id': 2, 'name': 'Lynnette Gilmore'}
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

            expect(flatten(unflattened)).toEqual(expected);
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

            expect(flatten(unflattened)).toEqual(expected);
        });

    });

    describe('.unflatten', () => {
        it('will return an empty object if undefined is passed in', () => {
            expect(unflatten(undefined)).toEqual({})
        });

        it('can unflatten an empty object', () => {
            expect(unflatten({})).toEqual({});
        });


        it('can unflatten an object with a single property', () => {
            let unflattened = {
                prop: 'value'
            };

            expect(unflatten(unflattened)).toEqual(unflattened);
        });

        it('can unflatten an object with multiple properties', () => {
            let unflattened = {
                prop1: 'value',
                prop2: 'value2'
            };

            expect(unflatten(unflattened)).toEqual(unflattened);
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

            expect(unflatten(flattened)).toEqual(expected);
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

            expect(unflatten(flattened)).toEqual(expected);
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
                    {'id': 0, 'name': 'Gentry Martin'},
                    {'id': 1, 'name': 'Owen Willis'},
                    {'id': 2, 'name': 'Lynnette Gilmore'}
                ]
            };

            expect(unflatten(flattened)).toEqual(expected);
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

            expect(unflatten(flattened)).toEqual(expected);
        });
    });
});