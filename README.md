# Flattenizer

Functions to flatten and unflatten nested JavaScript objects into a single level.

## Installation

```bash
npm install flattenizer
```

## Usage

```javascript
import { flatten, unflatten } from 'flattenizer';

// Flatten a nested object
const nested = {
  name: 'Sean',
  city: 'Kansas City',
  favBreweries: [
    { name: 'Double Shift', favBeer: 'Sister Abbey' },
    { name: 'KC Bier Co', favBeer: 'Helles' }
  ]
};

flatten(nested);
// {
//   name: 'Sean',
//   city: 'Kansas City',
//   'favBreweries.0.name': 'Double Shift',
//   'favBreweries.0.favBeer': 'Sister Abbey',
//   'favBreweries.1.name': 'KC Bier Co',
//   'favBreweries.1.favBeer': 'Helles'
// }

// Unflatten back to nested
const flat = {
  name: 'Sean',
  city: 'Kansas City',
  'favBreweries.0.name': 'Double Shift',
  'favBreweries.0.favBeer': 'Sister Abbey',
  'favBreweries.1.name': 'KC Bier Co',
  'favBreweries.1.favBeer': 'Helles'
};

unflatten(flat);
// {
//   name: 'Sean',
//   city: 'Kansas City',
//   favBreweries: [
//     { name: 'Double Shift', favBeer: 'Sister Abbey' },
//     { name: 'KC Bier Co', favBeer: 'Helles' }
//   ]
// }
```

## API

### `flatten<A, B>(unflattened: B | null | undefined, delimiter?: string): A | null | undefined`

Flattens a nested object into a single-level object with dot-separated keys.

- **unflattened** - The nested object to flatten
- **delimiter** - The delimiter to use (default: `'.'`)
- **returns** - The flattened object, or `null`/`undefined` if input is `null`/`undefined`

### `unflatten<A, B>(flattened: A | null | undefined, delimiter?: string): B | null | undefined`

Unflattens a flat object with dot-separated keys back into a nested object.

- **flattened** - The flat object to unflatten
- **delimiter** - The delimiter to use (default: `'.'`)
- **returns** - The nested object, or `null`/`undefined` if input is `null`/`undefined`

**Note:** Dangerous keys (`__proto__`, `prototype`, `constructor`) are blocked to prevent prototype pollution attacks.

## Custom Delimiters

Both functions accept an optional delimiter:

```javascript
flatten({ a: { b: 1 } }, '|');
// { 'a|b': 1 }

unflatten({ 'a|b': 1 }, '|');
// { a: { b: 1 } }
```

## Development

```bash
npm install    # Install dependencies
npm test       # Run tests
npm run build  # Build for production
npm start      # Watch mode
```

## License

MIT
