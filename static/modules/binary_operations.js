export { decimalToBinary, binaryToDecimal, convertToEightBitBinary };
import { pow } from "./utils.js";

function binarySum() {}

/**
 * Converts a decimal number to its binary representation.
 *
 * @param {number} decimalNumber - The decimal number to be converted to binary.
 * @returns {number[]} An array representing the binary equivalent of the decimal number.
 **/
function decimalToBinary(decimalNumber) {
  if (decimalNumber === 0) return [0];
  let number = decimalNumber;
  let binaryNumber = [];
  while (number >= 1) {
    binaryNumber.push(Math.floor(number % 2));
    number = number / 2;
  }
  return binaryNumber.reverse();
}

/**
 * Converts a binary number to its decimal representation.
 *
 * @param {number[]} binaryNumber - An array representing the binary number to be converted.
 * @returns {number} The decimal equivalent of the binary number.
 **/
function binaryToDecimal(binaryNumber) {
  let exponent = binaryNumber.length;
  let decimalNumber = 0;
  for (let index = 0; index < exponent; index++) {
    decimalNumber += pow(exponent - 1 - index) * binaryNumber[index];
  }
  return decimalNumber;
}

/**
 * Converts a binary number to an eight-bit binary representation.
 *
 * @param {number[]} binaryNumber - An array representing the binary number to be converted.
 * @returns {number[]} An eight-bit binary representation of the input binary number.
 **/
function convertToEightBitBinary(binaryNumber) {
  let bits = binaryNumber.length;
  if (bits === 8) {
    return binaryNumber;
  }
  while (bits < 8) {
    binaryNumber.unshift(0);
    bits = binaryNumber.length;
  }
  return binaryNumber;
}
