"use strict";

var _webStreamsPolyfill = require("web-streams-polyfill");

var _utils = require("../../../../../../test/utils");

var _ = require("../");

// ./src/shared/pipes/convert/writable/.tests/fromWriter.js
test("fromWriter", async () => {
  const input = [1, 2, 3, 4, 5];
  const result = [];
  const readable = (0, _utils.makeReadable)(input);
  const outputWritable = (0, _utils.makeWritable)(result);
  const writable = (0, _.fromWriter)(outputWritable.getWriter());
  await readable.pipeTo(writable);
  expect(result).toStrictEqual(input);
});