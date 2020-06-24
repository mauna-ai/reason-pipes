"use strict";

var _utils = require("../../../../../test/utils");

var _ = require("../");

test("zip", async () => {
  const a = (0, _utils.makeReadable)([1, 2]);
  const b = (0, _utils.makeReadable)([1, 2]);
  const c = (0, _utils.makeReadable)([1, 2]);
  const transformed = (0, _.zip)([a, b, c]);
  const reader = transformed.getReader();
  const result = await (0, _utils.consume)(reader);
  expect(result).toStrictEqual([[1, 1, 1], [2, 2, 2]]);
});