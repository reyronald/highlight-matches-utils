# highlight-matches-utils

> Utility functions to mark and highlight character matches in text

## API

**For more in-depth examples, [check the test file](./index.test.js).**  
**For more in-depth documentation, [check the TypeScript definition file](./index.d.ts).**

### highlightChars

Calls the given functions on matching and non-matching characters
of the given text. Useful when you want to highlight matching characters
in a UI.

```ts
export function highlightChars<T>(
  text: string,
  chars: string,
  matchesWrapper: (string) => T,
  noMatchesWrapper?: (string) => T
): T[]
```

Example:

```js
import React from 'react'
import chalk from 'chalk'
import { highlightMatches } from 'highlight-matches-utils'

highlightMatches('How are you?', 'are', s => `(${s})`)
// => ['How ', '(are)', ' you?']

highlightMatches('How are you?', 'are', s => <mark>{s}</mark>)
// => ['How ', <mark>are</mark>, ' you?']

highlightMatches('How are you?', 'are', chalk.reset, chalk.gray)
// =>
// [
//   "[90mHow [39m",
//   "[0mare[0m",
//   "[90m you?[39m",
// ]
// (useful for highlighting CLI output)
```

### highlightMatches

Calls the given functions on matching and non-matching characters
of the given text. Useful when you want to highlight matching characters
in a UI.

> NOTE: You can get the `matches` by calling `fuzzaldrin-plus`'s `.match()` function.

```ts
export function highlightMatches<T>(
  text: string,
  matches: number[],
  matchesWrapper: (string) => T,
  noMatchesWrapper?: (string) => T
): Array<T>,
```

### splitMatches

Splits the given text in separate chunks grouping together
all the characters that are matches and not matches.

> NOTE: You can get the `matches` by calling `fuzzaldrin-plus`'s `.match()` function.

```ts
export function splitMatches(
  text: string,
  matches: number[]
): Array<{| str: string, isMatch: boolean |}>
```

### Prior Art

- https://github.com/bvaughn/react-highlight-words
- https://github.com/bvaughn/highlight-words-core
- https://github.com/desktop/desktop/blob/23ddc3aceae0e051a125a934cc322d5ea0db0ebb/app/src/ui/lib/highlight-text.tsx
- https://markjs.io/
