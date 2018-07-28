const { splitMatches, highlightMatches, highlightChars } = require('.')
const { match } = require('fuzzaldrin-plus')
const React = require('react')
const chalk = require('chalk')

describe('splitMatches', () => {
  it('simple case', () => {
    const text = 'The quick brown fox jumps over the lazy dog'
    const matches = match(text, 'brown')
    const result = splitMatches(text, matches)

    expect(result).toEqual([
      { isMatch: false, str: 'The quick ' },
      { isMatch: true, str: 'brown' },
      { isMatch: false, str: ' fox jumps over the lazy dog' }
    ])
  })

  it('fuzzy match', () => {
    const text = 'The quick brown fox jumps over the lazy dog'
    const matches = match(text, 'thejumpslazy')
    const result = splitMatches(text, matches)

    expect(result).toEqual([
      { isMatch: true, str: 'The' },
      { isMatch: false, str: ' quick brown fox ' },
      { isMatch: true, str: 'jumps' },
      { isMatch: false, str: ' over the ' },
      { isMatch: true, str: 'lazy' },
      { isMatch: false, str: ' dog' }
    ])
  })

  it('no match', () => {
    const text = 'The quick brown fox jumps over the lazy dog'
    const matches = match(text, '***')
    const result = splitMatches(text, matches)

    expect(result).toEqual([
      { isMatch: false, str: 'The quick brown fox jumps over the lazy dog' }
    ])
  })
})

describe('highlightMatches', () => {
  it('no match', () => {
    const text = 'The quick brown fox jumps over the lazy dog'
    const result = highlightMatches(text, [], s => `[${s}]`)

    expect(result.join('')).toBe(text)
  })

  it('match using matchesWrapper that return string', () => {
    const text = 'The quick brown fox jumps over the lazy dog'
    const matches = match(text, 'brown')
    const result = highlightMatches(text, matches, s => `[${s}]`)

    expect(result.join('')).toBe(
      'The quick [brown] fox jumps over the lazy dog'
    )
  })

  it('match using matchesWrapper and noMatchesWrapper that return strings', () => {
    const text = 'The quick brown fox jumps over the lazy dog'
    const matches = match(text, 'brown')
    const result = highlightMatches(text, matches, s => `[${s}]`, s => `{${s}}`)

    expect(result.join('')).toBe(
      '{The quick }[brown]{ fox jumps over the lazy dog}'
    )
  })

  it('match using matchesWrapper that return React elements', () => {
    const text = 'The quick brown fox jumps over the lazy dog'
    const matches = match(text, 'brown')
    const result = highlightMatches(text, matches, s =>
      React.createElement('mark', { key: s }, s)
    )

    expect(result).toMatchSnapshot()
    // =>
    // Array [
    //   "The quick ",
    //   <mark>
    //     brown
    //   </mark>,
    //   " fox jumps over the lazy dog",
    // ]

    const result2 = highlightMatches(
      text,
      matches,
      s => React.createElement('mark', { key: s }, s),
      s => React.createElement('span', { key: s }, s)
    )

    expect(result2).toMatchSnapshot()
    // =>
    // Array [
    //   <span>
    //     The quick
    //   </span>,
    //   <mark>
    //     brown
    //   </mark>,
    //   <span>
    //      fox jumps over the lazy dog
    //   </span>,
    // ]
  })
})

describe('highlightChars', () => {
  it('no match', () => {
    const text = 'The quick brown fox jumps over the lazy dog'
    const result = highlightChars(text, '***', s => `[${s}]`)

    expect(result.join('')).toBe(text)
  })

  it('match using matchesWrapper that return string', () => {
    const text = 'The quick brown fox jumps over the lazy dog'
    const result = highlightChars(text, 'brown', s => `[${s}]`)

    expect(result.join('')).toBe(
      'The quick [brown] fox jumps over the lazy dog'
    )
  })

  it('match using matchesWrapper and noMatchesWrapper that return strings', () => {
    const text = 'The quick brown fox jumps over the lazy dog'
    const result = highlightChars(text, 'brown', s => `[${s}]`, s => `{${s}}`)

    expect(result.join('')).toBe(
      '{The quick }[brown]{ fox jumps over the lazy dog}'
    )
  })

  it('match using matchesWrapper that return React elements', () => {
    const text = 'The quick brown fox jumps over the lazy dog'
    const result = highlightChars(text, 'brown', s =>
      React.createElement('mark', { key: s }, s)
    )

    expect(result).toMatchSnapshot()
    // =>
    // Array [
    //   "The quick ",
    //   <mark>
    //     brown
    //   </mark>,
    //   " fox jumps over the lazy dog",
    // ]

    const result2 = highlightChars(
      text,
      'brown',
      s => React.createElement('mark', { key: s }, s),
      s => React.createElement('span', { key: s }, s)
    )

    expect(result2).toMatchSnapshot()
    // =>
    // Array [
    //   <span>
    //     The quick
    //   </span>,
    //   <mark>
    //     brown
    //   </mark>,
    //   <span>
    //      fox jumps over the lazy dog
    //   </span>,
    // ]
  })

  it('match using chalk wrappers', () => {
    const text = 'src/reporters/__tests__/summary_reporter.test.js'
    const result = highlightChars(text, 'reportsumm', chalk.reset, chalk.gray)
    expect(result).toMatchSnapshot()
  })
})
