"use strict";

var _webStreamsPolyfill = require("web-streams-polyfill");

var _utils = require("../../../../../../test/utils");

var _ = require("../");

// ./src/shared/pipes/convert/readable/.tests/fromReader.js
test("fromReader", async () => {
  const input = [1, 2, 3, 4, 5];
  const result = [];
  const inputReadable = (0, _utils.makeReadable)(input);
  const readable = (0, _.fromReader)(inputReadable.getReader());
  const writable = (0, _utils.makeWritable)(result);
  await readable.pipeTo(writable);
  expect(result).toStrictEqual(input);
});