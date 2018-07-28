// @flow

var match = require('fuzzaldrin-plus').match

function splitMatches(
  text /*: string */,
  matches /*: number[] */
) /*: Array<{|
  isMatch: boolean,
  str: string
|}> */ {
  var _matches = matches.slice(0)
  var result = []
  for (var i = 0; i < text.length; i += 1) {
    var isMatch = i === _matches[0]
    if (isMatch) {
      _matches.shift()
    }

    var lastIndex = result.length - 1
    if (lastIndex !== -1 && result[lastIndex].isMatch === isMatch) {
      result[lastIndex].str += text[i]
    } else {
      result.push({ str: text[i], isMatch: isMatch })
    }
  }
  return result
}

function highlightMatches /*:: <T> */(
  text /*: string */,
  matches /*: number[] */,
  matchesWrapper /*: (s: string) => T */,
  noMatchesWrapper /*: (s: string) => T */
) /*: Array<T> */ {
  if (noMatchesWrapper == null) {
    // $FlowFixMe
    noMatchesWrapper = function(x) {
      return x
    }
  }

  if (matches.length === 0) {
    // $FlowFixMe
    return [noMatchesWrapper(text)]
  }

  var splitMatchesResult = splitMatches(text, matches)
  var result = splitMatchesResult.map(function(r) {
    return r.isMatch ? matchesWrapper(r.str) : noMatchesWrapper(r.str)
  })

  return result
}

function highlightChars /*:: <T> */(
  text /*: string */,
  chars /*: string */,
  matchesWrapper /*: (s: string) => T */,
  noMatchesWrapper /*: (s: string) => T */
) /*: Array<T> */ {
  var matches = match(text, chars)
  var result = highlightMatches(text, matches, matchesWrapper, noMatchesWrapper)
  return result
}

module.exports = {
  splitMatches: splitMatches,
  highlightMatches: highlightMatches,
  highlightChars: highlightChars
}
