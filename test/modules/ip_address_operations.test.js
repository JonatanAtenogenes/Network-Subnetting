import {
  binaryAddition,
  binarySubtraction,
  getSubnetMask,
  getPrefixLength,
  getWildcard,
} from "../../src/modules/ip_address_operations.js";

// Test for binarySum function
test("Sums binary IP network [128, 0, 0, 0] with 2 hosts correctly", () => {
  const ipNetwork = [
    [1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const numberHost = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
  ];
  const expectedOutput = [
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 0,
  ];
  expect(binaryAddition(ipNetwork, numberHost)).toEqual(expectedOutput);
});

test("Sums binary IP network [192, 168, 1, 0] with 10 hosts correctly", () => {
  const ipNetwork = [
    [1, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const numberHost = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0],
  ];
  const expectedOutput = [
    1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
    0, 0, 0, 1, 0, 1, 0,
  ];
  expect(binaryAddition(ipNetwork, numberHost)).toEqual(expectedOutput);
});

test("Sums binary IP network [10, 20, 30, 40] with 20 hosts correctly", () => {
  const ipNetwork = [
    [0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 0],
  ];
  const numberHost = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0],
  ];
  const expectedOutput = [
    0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0,
    0, 1, 1, 1, 1, 0, 0,
  ];
  expect(binaryAddition(ipNetwork, numberHost)).toEqual(expectedOutput);
});

// Test for binarySubtraction
test("Subtracts binary IP network [128, 0, 0, 0] - [0, 0, 0, 2] correctly", () => {
  const ipNetwork = [
    [1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const binB = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1],
  ];
  const expectedOutput = [
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1,
  ];
  expect(binarySubtraction(ipNetwork, binB)).toEqual(expectedOutput);
});

test("Subtracts binary IP network [192, 168, 1, 0] - [0, 0, 0, 10] correctly", () => {
  const ipNetwork = [
    [1, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const binB = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
  ];
  const expectedOutput = [
    1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0,
  ];
  expect(binarySubtraction(ipNetwork, binB)).toEqual(expectedOutput);
});

test("Subtracts binary IP network [10, 20, 30, 40] - [0, 0, 0, 5] correctly", () => {
  const ipNetwork = [
    [0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 0],
  ];
  const binB = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1],
  ];
  const expectedOutput = [
    0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0,
    0, 1, 0, 0, 1, 1, 1,
  ];
  expect(binarySubtraction(ipNetwork, binB)).toEqual(expectedOutput);
});

// Test for getSubnetMask function
test("Returns subnet mask for prefix length 24 correctly", () => {
  const prefixLength = 24;
  const expectedOutput = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
  expect(getSubnetMask(prefixLength)).toEqual(expectedOutput);
});

test("Returns subnet mask for prefix length 16 correctly", () => {
  const prefixLength = 16;
  const expectedOutput = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
  expect(getSubnetMask(prefixLength)).toEqual(expectedOutput);
});

test("Returns subnet mask for prefix length 8 correctly", () => {
  const prefixLength = 8;
  const expectedOutput = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
  expect(getSubnetMask(prefixLength)).toEqual(expectedOutput);
});

test("Returns subnet mask for prefix length 32 correctly", () => {
  const prefixLength = 32;
  const expectedOutput = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  expect(getSubnetMask(prefixLength)).toEqual(expectedOutput);
});

// Test for getPrefixLength function
test("Returns prefix length correctly for 4 necessary bits", () => {
  const necessaryBits = 4;
  const expectedOutput = 28;
  expect(getPrefixLength(necessaryBits)).toBe(expectedOutput);
});

test("Returns prefix length correctly for 8 necessary bits", () => {
  const necessaryBits = 8;
  const expectedOutput = 24;
  expect(getPrefixLength(necessaryBits)).toBe(expectedOutput);
});

test("Returns prefix length correctly for 16 necessary bits", () => {
  const necessaryBits = 16;
  const expectedOutput = 16;
  expect(getPrefixLength(necessaryBits)).toBe(expectedOutput);
});

test("Returns prefix length correctly for 24 necessary bits", () => {
  const necessaryBits = 24;
  const expectedOutput = 8;
  expect(getPrefixLength(necessaryBits)).toBe(expectedOutput);
});

test("Returns prefix length correctly for 32 necessary bits", () => {
  const necessaryBits = 32;
  const expectedOutput = 0;
  expect(getPrefixLength(necessaryBits)).toBe(expectedOutput);
});

// Test for getWildcard function
test("Returns wildcard for subnet mask [[255, 255, 255, 0]] correctly", () => {
  const subnetMask = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const expectedOutput = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  expect(getWildcard(subnetMask)).toEqual(expectedOutput);
});

test("Returns wildcard for subnet mask [[255, 255, 0, 0]] correctly", () => {
  const subnetMask = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const expectedOutput = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  expect(getWildcard(subnetMask)).toEqual(expectedOutput);
});

test("Returns wildcard for subnet mask [[255, 255, 255, 128]] correctly", () => {
  const subnetMask = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0],
  ];
  const expectedOutput = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1],
  ];
  expect(getWildcard(subnetMask)).toEqual(expectedOutput);
});

test("Returns wildcard for subnet mask [[255, 255, 128, 0]] correctly", () => {
  const subnetMask = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const expectedOutput = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
  expect(getWildcard(subnetMask)).toEqual(expectedOutput);
});
