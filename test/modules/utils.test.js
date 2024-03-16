import { calculateNecessaryBits, pow } from "../../static/modules/utils.js";

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
