export { pow, calculateNecessaryBits };

/**
 * Calculates the power of a number raised to a given exponent.
 *
 * @param {number} exponent - The exponent to which the base will be raised.
 * @param {number} [base=2] - The base to be raised to the exponent (default value: 2).
 * @returns {number} The result of the power operation.
 *
 **/
function pow(exponent, base = 2) {
  if (exponent === 0) {
    return 1;
  }
  return base * pow(exponent - 1, base);
}

function calculateNecessaryBits(neededHost) {
  return Math.ceil(Math.log2(neededHost));
}
