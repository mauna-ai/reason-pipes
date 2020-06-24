"use strict";

var _utils = require("../../../../../test/utils");

var _ = require("../");

test("pipes.core.accumulate", async () => {
  const a = (0, _.accumulate)();
  const readable = (0, _utils.makeReadable)([1, 1, 1]);
  const transformed = readable.pipeThrough(a);
  const reader = transformed.getReader();
  const result = await (0, _utils.consume)(reader);
  expect(result).toStrictEqual([[1, 1, 1]]);
});