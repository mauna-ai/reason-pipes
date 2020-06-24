"use strict";

var _2 = require("../");

// ./src/shared/utils/.tests/consume.js
function* mkGen() {
  yield 1;
  yield* mkGen();
}

test("consume", () => {
  const result = (0, _2.consume)(mkGen(), 3);
  expect(result).toStrictEqual([1, 1, 1]);
});