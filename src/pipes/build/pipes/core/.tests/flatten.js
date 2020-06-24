"use strict";

var _utils = require("../../../../../test/utils");

var _ = require("../");

test("Flatten", async () => {
  const p = (0, _.pipe)(i => [i, i]);
  const f = (0, _.flatten)();
  const readable = (0, _utils.makeReadable)([1, 1, 1]);
  const transformed = readable.pipeThrough(p).pipeThrough(f);
  const reader = transformed.getReader();
  const result = await (0, _utils.consume)(reader);
  expect(result).toStrictEqual([1, 1, 1, 1, 1, 1]);
});