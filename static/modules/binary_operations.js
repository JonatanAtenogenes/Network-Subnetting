export {
  decimalToBinary,
  binaryToDecimal,
  convertsToByte,
  binarySumResults,
  convertsTo4Bytes,
  binarySum,
};
import { pow } from "./utils.js";

/**
 * Performs binary addition between an IP network and a number of hosts.
 *
 * @param {number[][]} ipNetwork - An array representing the IP network in binary format.
 * @param {number[][]} numberHost - An array representing the number of hosts in binary format.
 * @returns {number[]} An array representing the binary sum of the IP network and the number of hosts.
 **/
function binarySum(ipNetwork, numberHost) {
  // Iterates over the 4 blocks of the IP Network
  let result = [];
  let carry = 0;

  for (let bitPosition = 3; bitPosition >= 0; bitPosition--) {
    // Iterates over every bit of the byte
    for (let bit = 7; bit >= 0; bit--) {
      let partialSum = binarySumResults(
        ipNetwork[bitPosition][bit],
        numberHost[bitPosition][bit]
      );
      let sum = binarySumResults(partialSum[1], carry);
      result.unshift(sum[1]);
      carry = partialSum[0] || sum[0];
    }
  }
  return result;
}

/**
 * Computes the binary sum of two binary digits.
 *
 * @param {number} binA - The first binary digit (0 or 1).
 * @param {number} binB - The second binary digit (0 or 1).
 * @returns {number[]} An array representing the binary sum result, where the first element is the carry and the second element is the sum.
 **/
function binarySumResults(binA, binB) {
  if (binA === 0 && binB === 0) return [0, 0];
  else if (binA === 1 && binB === 1) return [1, 0];
  else return [0, 1];
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

function getPrefixLengthFromMask() {}
