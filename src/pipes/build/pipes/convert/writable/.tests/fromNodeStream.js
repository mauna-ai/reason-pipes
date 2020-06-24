"use strict";

var _stream = require("stream");

var _webStreamsPolyfill = require("web-streams-polyfill");

var _utils = require("../../../../../../test/utils");

var _utils2 = require("../../../../../shared/utils");

var _2 = require("../");

// ./src/shared/pipes/convert/writable/.tests/fromNodeWritable.js
test("fromNodeWritable bytes", async () => {
  const input = "hello there pretty peoples".split(" ");
  const result = [];
  const [done, finish] = (0, _utils2.makePromise)();
  const readable = (0, _utils.makeReadable)(input);
  const writable = (0, _2.fromNodeWritable)(new _stream.Writable({
    write: (c, e, cb) => (result.push(c), cb())
  }));
  await readable.pipeTo(writable);
  expect(result.map(_it => {
    return _it.toString();
  })).toStrictEqual(input);
});
test("fromNodeWritable", async () => {
  const input = [1, 2, 3, 4, 5];
  const result = [];
  const [done, finish] = (0, _utils2.makePromise)();
  const readable = (0, _utils.makeReadable)(input);
  const writable = (0, _2.fromNodeWritable)(new _stream.Writable({
    objectMode: true,
    write: (c, e, cb) => (result.push(c), cb())
  }));
  await readable.pipeTo(writable);
  expect(result).toStrictEqual(input);
});