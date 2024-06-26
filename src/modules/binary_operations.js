export {
  decimalToBinary,
  binaryToDecimal,
  convertsToByte,
  binaryAddResults,
  convertsTo4Bytes,
  binarySubResults,
};

import { pow } from "./utils.js";

/**
 * Computes the binary sum of two binary digits.
 *
 * @param {number} binA - The first binary digit (0 or 1).
 * @param {number} binB - The second binary digit (0 or 1).
 * @returns {number[]} An array representing the binary sum result, where the first element is the carry and the second element is the sum.
 **/
function binaryAddResults(binA, binB) {
  if (binA === 0 && binB === 0) return [0, 0];
  else if (binA === 1 && binB === 1) return [1, 0];
  else return [0, 1];
}

/**
 * Computes the binary subtraction of two binary digits.
 *
 * @param {number} binA - The first binary digit (0 or 1).
 * @param {number} binB - The second binary digit (0 or 1).
 * @returns {number[]} An array representing the binary subtraction result, where the first element is the borrow and the second element is the difference.
 **/
function binarySubResults(binA, binB) {
  if (binA === 1 && binB === 0) return [0, 1];
  else if (binA === 0 && binB === 1) return [1, 1];
  else return [0, 0];
}

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
function convertsToByte(binaryNumber) {
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

/**
 * Separates a binary number into groups of eight bits.
 *
 * @param {number[]} binaryNumber - An array representing the binary number to be separated.
 * @returns {number[][]} An array containing groups of eight-bit binary numbers.
 **/
function convertsTo4Bytes(binaryNumber) {
  const formattedBinaryNumber = [];
  let tmp = [];

  // Loop through the binary number in reverse
  for (let index = binaryNumber.length - 1; index >= 0; index--) {
    // Add each bit to a temporary array
    tmp.unshift(binaryNumber[index]);

    // If the temporary array has reached 8 bits or it's the last iteration
    if (tmp.length === 8 || index === 0) {
      // Convert the temporary array to an eight-bit binary representation and add it to the formatted array
      formattedBinaryNumber.unshift(convertsToByte(tmp.slice()));
      tmp = []; // Reset the temporary array
    }
  }

  // If the formatted array contains less than 4 groups of eight-bit binary numbers, pad with zeros
  while (formattedBinaryNumber.length < 4) {
    formattedBinaryNumber.unshift(convertsToByte(decimalToBinary(0)));
  }

  return formattedBinaryNumber;
}
