"use strict";

var _utils = require("../../../../../test/utils");

var _core = require("../../core");

var _ = require("../");

test("fromReadableWritable", async () => {
  const a = (0, _core.pipe)(x => x + 10);
  const p = (0, _.fromReadableWritable)({
    readable: a.readable,
    writable: a.writable
  });
  const readable = (0, _utils.makeEagerReadable)([2, 3, 4, 5, _core.EOS, 6, 7, 8, 9, 10]);
  const transformed = readable.pipeThrough(p);
  const reader = transformed.getReader();
  const result = await (0, _utils.consume)(reader);
  expect(result).toStrictEqual([12, 13, 14, 15]);
});