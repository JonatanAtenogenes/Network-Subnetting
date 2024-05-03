import { binaryToDecimal } from "./binary_operations.js";

export {
  pow,
  calculateNecessaryBits,
  binaryToIPAddress,
  ipAddressToString,
  allBitsAreZero,
};

/**
 * Calculates the power of a number raised to a given exponent.
 *
 * @param {number} exponent - The exponent to which the base will be raised.
 * @param {number} [base=2] - The base to be raised to the exponent (default value: 2).
 * @returns {number} The result of the power operation.
 *
 **/
function pow(exponent, base = 2) {
  // if (base === 0 && exponent === 0) return 0;
  if (exponent === 0) {
    return 1;
  }
  return base * pow(exponent - 1, base);
}

/**
 * Calculates the minimum number of bits required to represent a given number of hosts.
 *
 * @param {number} neededHosts - The number of hosts for which bits need to be calculated.
 * @returns {number} The minimum number of bits required to represent the specified number of hosts.
 *
 **/
function calculateNecessaryBits(neededHost) {
  return Math.ceil(Math.log2(neededHost + 2));
}

/**
 * Converts a binary representation of an IP address to its decimal equivalent.
 *
 * @param {number[][]} binaryIPAddress - An array representing the binary IP address.
 * @returns {number[]} An array representing the decimal IP address.
 **/
function binaryToIPAddress(binaryIPAddress) {
  return binaryIPAddress.map((byte) => binaryToDecimal(byte));
}

/**
 * Converts a decimal representation of an IP address to a string.
 *
 * @param {number[]} ipAddress - An array representing the decimal IP address.
 * @returns {string} A string representing the IP address.
 **/
function ipAddressToString(ipAddress) {
  return `${ipAddress[0]}.${ipAddress[1]}.${ipAddress[2]}.${ipAddress[3]}`;
}

/**
 * Checks if all bits in a binary number are zero.
 *
 * @param {number[]} binaryNumber - An array representing the binary number to be checked.
 * @returns {boolean} True if all bits are zero, false otherwise.
 **/
function allBitsAreZero(binaryNumber) {
  return binaryNumber.every((bit) => bit === 0);
}
