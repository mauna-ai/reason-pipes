"use strict";

var _utils = require("../../../../../test/utils");

var _ = require("../");

test("PipeGen", async () => {
  const p = (0, _.pipeGen)(function* (i) {
    yield i;
    yield i;
  });
  const readable = (0, _utils.makeReadable)([1, 1, 1]);
  const transformed = readable.pipeThrough(p);
  const reader = transformed.getReader();
  const result = await (0, _utils.consume)(reader);
  expect(result).toStrictEqual([1, 1, 1, 1, 1, 1]);
});