"use strict";

var _utils = require("../../../../../test/utils");

var _ = require("../");

var _webStreamsPolyfill = require("web-streams-polyfill");

test("PipeConnect", async () => {
  const transforms = [(0, _.pipe)(x => x + 10), (0, _.pipe)(x => x - 10), (0, _.pipe)(x => x + 10), new _webStreamsPolyfill.TransformStream({
    transform: (x, controller) => controller.enqueue(x - 10)
  }), (0, _.pipe)(x => x + 10), (0, _.pipe)(x => x - 10)];
  const readable = (0, _utils.makeReadable)([2, 3, 4, 5]);
  const result = [];
  const writable = new _webStreamsPolyfill.WritableStream({
    write: chunk => result.push(chunk)
  });
  await (0, _.connect)(readable, transforms, writable);
  expect(result).toStrictEqual([2, 3, 4, 5]);
});