/**
 * Returns an ordinal
 * @param {number} number The number to convert
 * @returns {string} The ordinal
 */
export const getOrdinal = (number) => {
  const suffixes = [ 'th', 'st', 'nd', 'rd' ]
  const value = number % 100

  return number + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0])
}
