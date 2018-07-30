# highlight-matches-utils

> Utility functions to mark and highlight character matches in text

[![Travis (.org)](https://img.shields.io/travis/reyronald/highlight-matches-utils.svg)](https://travis-ci.org/reyronald/highlight-matches-utils)
[![Codecov](https://img.shields.io/codecov/c/github/reyronald/highlight-matches-utils.svg)](https://codecov.io/gh/reyronald/highlight-matches-utils)
[![GitHub](https://img.shields.io/github/license/reyronald/highlight-matches-utils.svg)](https://github.com/reyronald/highlight-matches-utils/blob/master/LICENSE)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/highlight-matches-utils.svg)](https://unpkg.com/highlight-matches-utils/)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/minzip/highlight-matches-utils.svg)](https://unpkg.com/highlight-matches-utils/)

[See an online example in CodeSandbox on how it can be used](https://codesandbox.io/s/92q8lmvn84).

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
  matchesWrapper: (
    s: string,
    index: number,
    array: {
      isMatch: boolean
      str: string
    }[]
  ) => T,
  noMatchesWrapper?: (
    s: string,
    index: number,
    array: {
      isMatch: boolean
      str: string
    }[]
  ) => T
): T[]
```

Example:

```js
import React from 'react'
import chalk from 'chalk'
import { highlightChars } from 'highlight-matches-utils'

highlightChars('How are you?', 'are', s => `(${s})`)
// => ['How ', '(are)', ' you?']

highlightChars('How are you?', 'are', (s, i) => <mark key={i}>{s}</mark>)
// => ['How ', <mark>are</mark>, ' you?']

highlightChars('How are you?', 'are', chalk.reset, chalk.gray)
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
  matchesWrapper: (
    s: string,
    index: number,
    array: {
      isMatch: boolean
      str: string
    }[]
  ) => T,
  noMatchesWrapper?: (
    s: string,
    index: number,
    array: {
      isMatch: boolean
      str: string
    }[]
  ) => T
): T[]
```

### splitMatches

Splits the given text in separate chunks grouping together
all the characters that are matches and not matches.

> NOTE: You can get the `matches` by calling `fuzzaldrin-plus`'s `.match()` function.

```ts
export function splitMatches(
  text: string,
  matches: number[]
): Array<{| isMatch: boolean, str: string |}>
```

### Prior Art

- https://github.com/bvaughn/react-highlight-words
- https://github.com/bvaughn/highlight-words-core
- https://github.com/desktop/desktop/blob/23ddc3aceae0e051a125a934cc322d5ea0db0ebb/app/src/ui/lib/highlight-text.tsx
- https://markjs.io/
