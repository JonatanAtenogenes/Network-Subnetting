import {
  decimalToBinary,
  binaryToDecimal,
  convertsToByte,
  binaryAddResults,
  convertsTo4Bytes,
  binaryAddition,
  binarySubResults,
  binarySubtraction,
} from "../../static/modules/binary_operations.js";

// Test for the decimalToBinary function
test("Converts decimal 0 to binary correctly", () => {
  expect(decimalToBinary(0)).toEqual([0]);
});

test("Converts decimal 1 to binary correctly", () => {
  expect(decimalToBinary(1)).toEqual([1]);
});

test("Converts decimal 5 to binary correctly", () => {
  expect(decimalToBinary(5)).toEqual([1, 0, 1]);
});

test("Converts decimal 10 to binary correctly", () => {
  expect(decimalToBinary(10)).toEqual([1, 0, 1, 0]);
});

test("Converts decimal 25 to binary correctly", () => {
  expect(decimalToBinary(25)).toEqual([1, 1, 0, 0, 1]);
});

test("Converts decimal 50 to binary correctly", () => {
  expect(decimalToBinary(50)).toEqual([1, 1, 0, 0, 1, 0]);
});

test("Converts decimal 127 to binary correctly", () => {
  expect(decimalToBinary(127)).toEqual([1, 1, 1, 1, 1, 1, 1]);
});

test("Converts decimal 200 to binary correctly", () => {
  expect(decimalToBinary(200)).toEqual([1, 1, 0, 0, 1, 0, 0, 0]);
});

test("Converts decimal 255 to binary correctly", () => {
  expect(decimalToBinary(255)).toEqual([1, 1, 1, 1, 1, 1, 1, 1]);
});

// Test for the binaryToDecimal function
test("Converts binary [0, 0, 0, 0] to decimal correctly", () => {
  expect(binaryToDecimal([0, 0, 0, 0])).toBe(0);
});

test("Converts binary [0, 0, 1, 0] to decimal correctly", () => {
  expect(binaryToDecimal([0, 0, 1, 0])).toBe(2);
});

test("Converts binary [1, 0, 1, 0, 1, 0, 1, 0] to decimal correctly", () => {
  expect(binaryToDecimal([1, 0, 1, 0, 1, 0, 1, 0])).toBe(170);
});

test("Converts binary [1, 1, 0, 1, 0, 0] to decimal correctly", () => {
  expect(binaryToDecimal([1, 1, 0, 1, 0, 0])).toBe(52);
});

test("Converts binary [1, 1, 1, 0, 0, 0, 1, 1] to decimal correctly", () => {
  expect(binaryToDecimal([1, 1, 1, 0, 0, 0, 1, 1])).toBe(227);
});

test("Converts binary [1, 0, 0, 1, 1, 0, 0, 1] to decimal correctly", () => {
  expect(binaryToDecimal([1, 0, 0, 1, 1, 0, 0, 1])).toBe(153);
});

test("Converts binary [1, 1, 1, 1, 1, 1, 1, 1] to decimal correctly", () => {
  expect(binaryToDecimal([1, 1, 1, 1, 1, 1, 1, 1])).toBe(255);
});

// Test for the convertsToByte function
test("Converts [1, 0, 1, 0] to 8-bit binary correctly", () => {
  expect(convertsToByte([1, 0, 1, 0])).toEqual([0, 0, 0, 0, 1, 0, 1, 0]);
});

test("Converts [1, 1, 1, 1] to 8-bit binary correctly", () => {
  expect(convertsToByte([1, 1, 1, 1])).toEqual([0, 0, 0, 0, 1, 1, 1, 1]);
});

test("Converts [1, 1, 1, 1, 1, 1, 1] to 8-bit binary correctly", () => {
  expect(convertsToByte([1, 1, 1, 1, 1, 1, 1])).toEqual([
    0, 1, 1, 1, 1, 1, 1, 1,
  ]);
});

test("Converts [1, 0, 1, 0, 0, 1] to 8-bit binary correctly", () => {
  expect(convertsToByte([1, 0, 1, 0, 0, 1])).toEqual([0, 0, 1, 0, 1, 0, 0, 1]);
});

test("Converts [1, 1, 0, 0] to 8-bit binary correctly", () => {
  expect(convertsToByte([1, 1, 0, 0])).toEqual([0, 0, 0, 0, 1, 1, 0, 0]);
});

test("Converts [0, 1, 1] to 8-bit binary correctly", () => {
  expect(convertsToByte([0, 1, 1])).toEqual([0, 0, 0, 0, 0, 0, 1, 1]);
});

test("Converts [1, 0, 0, 1] to 8-bit binary correctly", () => {
  expect(convertsToByte([1, 0, 0, 1])).toEqual([0, 0, 0, 0, 1, 0, 0, 1]);
});

test("Converts [1, 1, 1, 0, 0, 1, 1] to 8-bit binary correctly", () => {
  expect(convertsToByte([1, 1, 1, 0, 0, 1, 1])).toEqual([
    0, 1, 1, 1, 0, 0, 1, 1,
  ]);
});

test("Converts [1, 0, 1, 1, 1, 1, 0, 1] to 8-bit binary correctly", () => {
  expect(convertsToByte([1, 0, 1, 1, 1, 1, 0, 1])).toEqual([
    1, 0, 1, 1, 1, 1, 0, 1,
  ]);
});

// Test for the binarySumResults function
test("Binary sum of 0 + 0 returns [0, 0]", () => {
  expect(binaryAddResults(0, 0)).toEqual([0, 0]);
});

test("Binary sum of 0 + 1 returns [0, 1]", () => {
  expect(binaryAddResults(0, 1)).toEqual([0, 1]);
});

test("Binary sum of 1 + 0 returns [0, 1]", () => {
  expect(binaryAddResults(1, 0)).toEqual([0, 1]);
});

test("Binary sum of 1 + 1 returns [1, 0]", () => {
  expect(binaryAddResults(1, 1)).toEqual([1, 0]);
});

// Test for convertsTo4Bytes function

test("Converts binary number [1, 0, 1, 0, 1, 0, 1, 0] to 4 bytes correctly", () => {
  const binaryNumber = [1, 0, 1, 0, 1, 0, 1, 0];
  const expectedOutput = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
  ];
  expect(convertsTo4Bytes(binaryNumber)).toEqual(expectedOutput);
});

test("Converts binary number [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0] to 4 bytes correctly", () => {
  const binaryNumber = [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0];
  const expectedOutput = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 0, 0],
  ];
  expect(convertsTo4Bytes(binaryNumber)).toEqual(expectedOutput);
});

test("Converts binary number [1, 0, 1, 0, 0, 1, 0, 1] to 4 bytes correctly", () => {
  const binaryNumber = [1, 0, 1, 0, 0, 1, 0, 1];
  const expectedOutput = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 1, 0, 1],
  ];
  expect(convertsTo4Bytes(binaryNumber)).toEqual(expectedOutput);
});

test("Converts binary number [1, 1, 1, 0, 1, 1, 0, 1] to 4 bytes correctly", () => {
  const binaryNumber = [1, 1, 1, 0, 1, 1, 0, 1];
  const expectedOutput = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 1, 1, 0, 1],
  ];
  expect(convertsTo4Bytes(binaryNumber)).toEqual(expectedOutput);
});

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

// Test for binarySubResult
test("Subtracts binary 1 - 0 correctly", () => {
  expect(binarySubResults(1, 0)).toEqual([0, 1]);
});

test("Subtracts binary 0 - 1 correctly", () => {
  expect(binarySubResults(0, 1)).toEqual([1, 1]);
});

test("Subtracts binary 1 - 1 correctly", () => {
  expect(binarySubResults(1, 1)).toEqual([0, 0]);
});

test("Subtracts binary 0 - 0 correctly", () => {
  expect(binarySubResults(0, 0)).toEqual([0, 0]);
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
