"use strict";

var _webStreamsPolyfill = require("web-streams-polyfill");

var _utils = require("../../../../../test/utils");

var _ = require("../");

test("PipeChain", async () => {
  const a = (0, _.pipe)(x => x + 10);
  const b = (0, _.pipe)(x => x - 10);
  const c = (0, _.pipe)(x => x + 1);
  const p = (0, _.chain)(a, b, c);
  const readable = (0, _utils.makeReadable)([2, 3, 4, 5]);
  const transformed = readable.pipeThrough(p);
  const reader = transformed.getReader();
  const result = await (0, _utils.consume)(reader);
  expect(result).toStrictEqual([2 + 1, 3 + 1, 4 + 1, 5 + 1]);
});
test("PipeChainMixed", async () => {
  const a = new _webStreamsPolyfill.TransformStream({
    transform: (x, controller) => controller.enqueue(x + 10)
  });
  const b = (0, _.pipe)(x => x - 15);
  const c = (0, _.pipe)(x => x + 6);
  const p = (0, _.chain)(a, b, c);
  const readable = (0, _utils.makeReadable)([2, 3, 4, 5]);
  const transformed = readable.pipeThrough(p);
  const reader = transformed.getReader();
  const result = await (0, _utils.consume)(reader);
  expect(result).toStrictEqual([2 + 10, 3 + 10, 4 + 10, 5 + 10]);
});