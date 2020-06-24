"use strict";

var _utils = require("../../../../../test/utils");

var _utils2 = require("../../../utils");

var _ = require("../");

test("Sequence", async () => {
  const p = (0, _.pipe)(function (i) {
    const [promise, resolve] = (0, _utils2.makePromise)();
    setTimeout(() => resolve(i), i * 100);
    return promise;
  });
  const s = (0, _.sequence)();
  const readable = (0, _utils.makeReadable)([1, 2, 3]);
  const transformed = readable.pipeThrough(p).pipeThrough(s);
  const reader = transformed.getReader();
  const result = await (0, _utils.consume)(reader);
  expect(result).toStrictEqual([1, 2, 3]);
});