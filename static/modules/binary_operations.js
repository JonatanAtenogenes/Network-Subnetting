export {
  decimalToBinary,
  binaryToDecimal,
  convertsToByte,
  binaryAddResults,
  convertsTo4Bytes,
  binaryAddition,
  binarySubResults,
  binarySubtraction,
  getSubnetMask,
  getPrefixLength,
  getWildcard,
};
import { allBitsAreZero, binaryToIPAddress, pow } from "./utils.js";

const MAX_BYTE_DECIMAL = 255;

/**
 * Performs binary addition between an IP network and a number of hosts.
 *
 * @param {number[][]} ipNetwork - An array representing the IP network in binary format.
 * @param {number[][]} numberHost - An array representing the number of hosts in binary format.
 * @returns {number[]} An array representing the binary sum of the IP network and the number of hosts.
 **/
function binaryAddition(ipNetwork, numberHost) {
  let result = [];
  let carry = 0;
  // Iterates over the 4 blocks of the IP Network
  for (let bitPosition = 3; bitPosition >= 0; bitPosition--) {
    // Iterates over every bit of the byte
    for (let bit = 7; bit >= 0; bit--) {
      let partialSum = binaryAddResults(
        ipNetwork[bitPosition][bit],
        numberHost[bitPosition][bit]
      );
      let sum = binaryAddResults(partialSum[1], carry);
      result.unshift(sum[1]);
      carry = partialSum[0] || sum[0];
    }
  }
  return result;
}

/**
 * Performs binary subtraction between an IP network and a binary number.
 *
 * @param {number[][]} ipNetwork - An array representing the IP network in binary format.
 * @param {number[][]} binB - An array representing the binary number to subtract.
 * @returns {number[]} An array representing the binary subtraction result.
 **/
function binarySubtraction(ipNetwork, binB) {
  let result = [];
  let carry = 0;
  // Iterates over the 4 blocks of the IP Network
  for (let bitPosition = 3; bitPosition >= 0; bitPosition--) {
    // Iterates over every bit of the byte
    for (let bit = 7; bit >= 0; bit--) {
      let partialSubtraction = binarySubResults(
        ipNetwork[bitPosition][bit],
        binB[bitPosition][bit]
      );
      let subtraction = binarySubResults(partialSubtraction[1], carry);
      carry = subtraction[0] || partialSubtraction[0];
      result.unshift(subtraction[1]);
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

/**
 * Retrieves the subnet mask from the necessary bits.
 *
 * @param {number} bits - The number of necessary bits.
 * @returns {number[][]} An array representing the subnet mask.
 **/
function getSubnetMask(bits) {
  let tmp = convertsTo4Bytes(decimalToBinary(pow(bits)));
  let subnetMask = [];
  tmp.forEach((byte) => {
    subnetMask.push(formatByteFromSubnetMask(byte));
  });
  return subnetMask;
}

/**
 * Formats a byte from the subnet mask.
 *
 * @param {number[]} byte - An array representing a byte of the subnet mask.
 * @returns {number[]} An array representing the formatted byte.
 **/
function formatByteFromSubnetMask(byte) {
  if (allBitsAreZero(byte)) return convertsToByte(decimalToBinary(255));
  else {
    let tmp = [];
    let counter = 0;
    let index = byte.indexOf(1);
    while (counter < index) {
      tmp.push(invertBits(byte[counter]));
      counter++;
    }
    tmp.push(byte[counter]);
    counter++;
    while (counter < 8) {
      tmp.push(0);
      counter++;
    }
    return tmp;
  }
}

/**
 * Calculates the prefix length from the necessary bits.
 *
 * @param {number} necessaryBits - The number of necessary bits.
 * @returns {number} The prefix length.
 **/
function getPrefixLength(necessaryBits) {
  return 32 - necessaryBits;
}

/**
 * Retrieves the wildcard from the subnet mask.
 *
 * @param {number[][]} subnetMask - An array representing the subnet mask.
 * @returns {number[][]} An array representing the wildcard.
 **/
function getWildcard(subnetMask) {
  return subnetMask.map((byte) => {
    let decimalNumber = binaryToDecimal(byte);
    let wildcardValue = MAX_BYTE_DECIMAL - decimalNumber;
    return convertsToByte(wildcardValue);
  });
}

/**
 * Inverts the bits of a binary number.
 *
 * @param {number} binaryNumber - The binary number.
 * @returns {number} The inverted binary number.
 **/
function invertBits(binaryNumber) {
  if (binaryNumber === 0) return 1;
  else return 0;
}
