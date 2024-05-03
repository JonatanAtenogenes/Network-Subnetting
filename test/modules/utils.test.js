import {
  calculateNecessaryBits,
  pow,
  binaryToIPAddress,
  ipAddressToString,
  allBitsAreZero,
} from "../../src/modules/utils.js";

// Test for pow function
test("Calculates power correctly for exponent 0", () => {
  expect(pow(0)).toBe(1);
});

test("Calculates power correctly for exponent 1", () => {
  expect(pow(1)).toBe(2);
});

test("Calculates power correctly for exponent 2", () => {
  expect(pow(2)).toBe(4);
});

test("Calculates power correctly for exponent 3", () => {
  expect(pow(3)).toBe(8);
});

test("Calculates power correctly for exponent 4", () => {
  expect(pow(4)).toBe(16);
});

test("Calculates power correctly for exponent 5", () => {
  expect(pow(5)).toBe(32);
});

// Test for calculateNecessaryBits function
test("Calculates necessary bits for 2 hosts correctly", () => {
  expect(calculateNecessaryBits(2)).toBe(2);
});

test("Calculates necessary bits for 8 hosts correctly", () => {
  expect(calculateNecessaryBits(8)).toBe(4);
});

test("Calculates necessary bits for 16 hosts correctly", () => {
  expect(calculateNecessaryBits(16)).toBe(5);
});

test("Calculates necessary bits for 32 hosts correctly", () => {
  expect(calculateNecessaryBits(32)).toBe(6);
});

test("Calculates necessary bits for 64 hosts correctly", () => {
  expect(calculateNecessaryBits(64)).toBe(7);
});

test("Calculates necessary bits for 1 host correctly", () => {
  expect(calculateNecessaryBits(1)).toBe(2);
});

test("Calculates necessary bits for 4 hosts correctly", () => {
  expect(calculateNecessaryBits(4)).toBe(3);
});

test("Calculates necessary bits for 10 hosts correctly", () => {
  expect(calculateNecessaryBits(10)).toBe(4);
});

test("Calculates necessary bits for 20 hosts correctly", () => {
  expect(calculateNecessaryBits(20)).toBe(5);
});

test("Calculates necessary bits for 50 hosts correctly", () => {
  expect(calculateNecessaryBits(50)).toBe(6);
});

test("Calculates necessary bits for 100 hosts correctly", () => {
  expect(calculateNecessaryBits(100)).toBe(7);
});

// Test for binaryToIPAddress
test("Converts binary IP address [10000000, 11000000, 10101000, 00000001] to decimal IP address correctly", () => {
  const binaryIPAddress = [
    [1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1],
  ];
  const expectedOutput = [128, 192, 168, 1];
  expect(binaryToIPAddress(binaryIPAddress)).toEqual(expectedOutput);
});

test("Converts binary IP address [10101000, 00000001, 11000000, 10000000] to decimal IP address correctly", () => {
  const binaryIPAddress = [
    [1, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0],
  ];
  const expectedOutput = [168, 1, 192, 128];
  expect(binaryToIPAddress(binaryIPAddress)).toEqual(expectedOutput);
});

test("Converts binary IP address [11110000, 00001111, 11111111, 00000000] to decimal IP address correctly", () => {
  const binaryIPAddress = [
    [1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const expectedOutput = [240, 15, 255, 0];
  expect(binaryToIPAddress(binaryIPAddress)).toEqual(expectedOutput);
});

// Test for ipAddressToString
test("Converts decimal IP address [192, 168, 1, 1] to string correctly", () => {
  const ipAddress = [192, 168, 1, 1];
  const expectedOutput = "192.168.1.1";
  expect(ipAddressToString(ipAddress)).toBe(expectedOutput);
});

test("Converts decimal IP address [10, 0, 0, 255] to string correctly", () => {
  const ipAddress = [10, 0, 0, 255];
  const expectedOutput = "10.0.0.255";
  expect(ipAddressToString(ipAddress)).toBe(expectedOutput);
});

test("Converts decimal IP address [172, 16, 0, 1] to string correctly", () => {
  const ipAddress = [172, 16, 0, 1];
  const expectedOutput = "172.16.0.1";
  expect(ipAddressToString(ipAddress)).toBe(expectedOutput);
});

// Test for allBitsAreZero function
test("Checks if all bits are zero for binary number [0, 0, 0, 0, 0, 0, 0, 0]", () => {
  const binaryNumber = [0, 0, 0, 0, 0, 0, 0, 0];
  expect(allBitsAreZero(binaryNumber)).toBe(true);
});

test("Checks if all bits are zero for binary number [1, 0, 1, 0, 1, 0, 1, 0]", () => {
  const binaryNumber = [1, 0, 1, 0, 1, 0, 1, 0];
  expect(allBitsAreZero(binaryNumber)).toBe(false);
});

test("Checks if all bits are zero for binary number [1, 1, 1, 1, 1, 1, 1, 1]", () => {
  const binaryNumber = [1, 1, 1, 1, 1, 1, 1, 1];
  expect(allBitsAreZero(binaryNumber)).toBe(false);
});

test("Checks if all bits are zero for binary number [0, 0, 0, 0, 0, 0, 0, 1]", () => {
  const binaryNumber = [0, 0, 0, 0, 0, 0, 0, 1];
  expect(allBitsAreZero(binaryNumber)).toBe(false);
});
