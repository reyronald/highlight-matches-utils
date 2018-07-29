/**
 * Calls the given functions on matching and non-matching characters
 * of the given text. Useful when you want to highlight matching characters
 * in a UI.
 *
 * @param text The text that contains the matches
 * @param matches Array of numbers indicating the indexes of `text` where there is a match
 * @param matchesWrapper Function to execute on matching substrings
 * @param noMatchesWrapper Function to execute on non-matching substrings
 *
 * @example
 * highlightMatches('How are you?', 'are', s => `[${s}]`)
 * // => ['How ', '[are]', ' you?']
 */
export function highlightChars<T>(
  text: string,
  chars: string,
  matchesWrapper: (s: string) => T,
  noMatchesWrapper?: (s: string) => T
): T[]

/**
 * Calls the given functions on matching and non-matching characters
 * of the given text. Useful when you want to highlight matching characters
 * in a UI.
 *
 * @remarks
 * You can get the `matches` by calling `fuzzaldrin-plus`'s `.match()` function
 *
 * @param text The text that contains the matches
 * @param matches Array of numbers indicating the indexes of `text` where there is a match
 * @param matchesWrapper Function to execute on matching substrings
 * @param noMatchesWrapper Function to execute on non-matching substrings
 *
 * @example
 * highlightMatches('How are you?', [4, 5, 6], s => `[${s}]`)
 * // => ['How ', '[are]', ' you?']
 */
export function highlightMatches<T>(
  text: string,
  matches: number[],
  matchesWrapper: (s: string) => T,
  noMatchesWrapper?: (s: string) => T
): T[]

/**
 * Splits the given text in separate chunks grouping together
 * all the characters that are matches and not matches.
 *
 * @remarks
 * You can get the `matches` by calling `fuzzaldrin-plus`'s `.match()` function
 *
 * @param text The text that contains the matches
 * @param matches Array of numbers indicating the indexes of `text` where there is a match
 *
 * @example
 * splitMatches('How are you?', [4, 5, 6])
 * // [
 * //  { isMatch: false, str: 'How ' },
 * //  { isMatch: true, str: 'are' },
 * //  { isMatch: false, str: ' you?' },
 * // ]
 */
export function splitMatches(
  text: string,
  matches: number[]
): { isMatch: boolean; str: string }[]

export as namespace highlightMatchesUtils
