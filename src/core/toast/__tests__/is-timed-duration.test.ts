import { isTimedDuration } from "../is-timed-duration";

test("returns true for a positive finite number", () => {
  expect(isTimedDuration(4000)).toBe(true);
});

test("returns true for zero", () => {
  expect(isTimedDuration(0)).toBe(true);
});

test("returns false for undefined", () => {
  expect(isTimedDuration(undefined)).toBe(false);
});

test("returns false for Infinity", () => {
  expect(isTimedDuration(Infinity)).toBe(false);
});

test("returns false for negative Infinity", () => {
  expect(isTimedDuration(-Infinity)).toBe(false);
});

test("returns false for NaN", () => {
  expect(isTimedDuration(NaN)).toBe(false);
});
