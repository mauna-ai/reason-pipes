"use strict";

var _ = require("../");

test("genSymbol", async () => {
  const [a, b, c] = (0, _.genSymbol)();
  expect(a === b).toBe(false);
  expect(c === b).toBe(false);
  expect(c === a).toBe(false);
}); // test("genEvent", async () => {
//   const { a, b, c } = genEvent();
//
//   expect(a === b).toBe(false);
//   expect(c === b).toBe(false);
//   expect(c === a).toBe(false);
//
//   expect(a).toBe(Symbol.for("a"));
//   expect(b).toBe(Symbol.for("b"));
//   expect(c).toBe(Symbol.for("c"));
// });