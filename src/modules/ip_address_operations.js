export {
  binaryAddition,
  binarySubtraction,
  getSubnetMask,
  getPrefixLength,
  getWildcard,
  getIPNetworkInDecimal,
  isBitInRange,
  isIPNetworkLengthCorrect,
  areHostDefinitionValid,
};

import {
  binaryToDecimal,
  binaryAddResults,
  binarySubResults,
  convertsToByte,
  convertsTo4Bytes,
  decimalToBinary,
} from "./binary_operations.js";

const MAX_BYTE_DECIMAL = 255;
const MAX_PREFIX_LENGTH = 32;

/**
 * Performs binary addition between an IP address and a number of hosts.
 *
 * @param {number[][]} ipAddress - An array representing the IP address in binary format.
 * @param {number[][]} numberHost - An array representing the number of hosts in binary format.
 * @returns {number[]} An array representing the binary sum of the IP address and the number of hosts.
 **/
function binaryAddition(ipAddress, numberHost) {
  let result = [];
  let carry = 0;
  // Iterates over the 4 blocks of the IP Network
  for (let bitPosition = 3; bitPosition >= 0; bitPosition--) {
    // Iterates over every bit of the byte
    for (let bit = 7; bit >= 0; bit--) {
      let partialSum = binaryAddResults(
        ipAddress[bitPosition][bit],
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
 * Performs binary subtraction between an IP address and a binary number.
 *
 * @param {number[][]} ipAddress - An array representing the IP address in binary format.
 * @param {number[][]} binB - An array representing the binary number to subtract.
 * @returns {number[]} An array representing the binary subtraction result.
 **/
function binarySubtraction(ipAddress, binB) {
  let result = [];
  let carry = 0;
  // Iterates over the 4 blocks of the IP Network
  for (let bitPosition = 3; bitPosition >= 0; bitPosition--) {
    // Iterates over every bit of the byte
    for (let bit = 7; bit >= 0; bit--) {
      let partialSubtraction = binarySubResults(
        ipAddress[bitPosition][bit],
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
 * Retrieves the subnet mask based on the provided prefix length.
 *
 * @param {number} prefixLength - The prefix length.
 * @returns {number[][]} An array representing the subnet mask.
 *
 **/
function getSubnetMask(prefixLength) {
  let tmp = [];
  for (let index = 0; index < MAX_PREFIX_LENGTH; index++) {
    if (index < prefixLength) {
      tmp.push(1);
    } else {
      tmp.push(0);
    }
  }
  return convertsTo4Bytes(tmp);
}

/**
 * Calculates the prefix length from the necessary bits.
 *
 * @param {number} necessaryBits - The number of necessary bits.
 * @returns {number} The prefix length.
 **/
function getPrefixLength(necessaryBits) {
  return MAX_PREFIX_LENGTH - necessaryBits;
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
    return convertsToByte(decimalToBinary(wildcardValue));
  });
}

/**
 * Retrieves the IP network in decimal format from the specified input field value.
 *
 * @param {string} ipAddressValue - The value of the input field containing the IP address.
 * @returns {number[]} An array representing the IP network in decimal format.
 *
 **/
function getIPNetworkInDecimal(ipAddressValue) {
  let ipNetworkArray = ipAddressValue.split(".");
  return ipNetworkArray.map((bit) => parseInt(bit));
}

/**
 * Checks if the length of the IP network is correct (should be 4 octets).
 *
 * @param {number[]} ipNetwork - An array representing the IP network in decimal format.
 * @returns {boolean} True if the length is correct, false otherwise.
 **/
function isIPNetworkLengthCorrect(ipNetwork) {
  return ipNetwork.length === 4;
}

/**
 * Checks if each bit of the IP network is within the valid range (0-255).
 *
 * @param {number[]} ipNetwork - An array representing the IP network in decimal format.
 * @returns {boolean} True if all bits are within the valid range, false otherwise.
 **/
function isBitInRange(ipNetwork) {
  return ipNetwork.every((bit) => bit < 256 && bit > -1);
}

/**
 * Checks if all host definition inputs are valid.
 *
 * @param {HTMLCollection} numberOfHost - The HTML collection containing the host definition inputs.
 * @returns {boolean} True if all inputs are valid, false otherwise.
 *
 */
function areHostDefinitionValid(numberOfHost) {
  return Array.from(numberOfHost).every(
    (input) =>
      !isNaN(parseInt(input.value)) && // Check if input is a valid number
      parseInt(input.value) >= 1 && // Check if input is greater than or equal to 1
      input.value !== "" // Check if input is not empty
  );
}
