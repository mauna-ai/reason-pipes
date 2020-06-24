"use strict";

var _through = _interopRequireDefault(require("through2"));

var _utils = require("../../../../../test/utils");

var _2 = require("../");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/pipes/readable/.tests/fromNodeDuplex.js
test("fromNodeDuplex", async () => {
  const stream = _through.default.obj((a, enc, cb) => cb(null, a));

  const p = (0, _2.fromNodeDuplex)(stream);
  const readable = (0, _utils.makeReadable)([1, 2, 3, 4, 5]);
  const transformed = readable.pipeThrough(p);
  const result = [];
  const writable = (0, _utils.makeWritable)(result);
  await transformed.pipeTo(writable);
  expect(result).toStrictEqual([1, 2, 3, 4, 5]);
});