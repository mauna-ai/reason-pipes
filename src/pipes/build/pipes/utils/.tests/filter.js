"use strict";

var _Pred = _interopRequireDefault(require("crocks/Pred"));

var _webStreamsPolyfill = require("web-streams-polyfill");

var _utils = require("../../../../../test/utils");

var _2 = require("../");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test("filter", async () => {
  const readable = (0, _utils.makeReadable)([1, 2, 3, 4]);
  const container = [];
  const writable = (0, _utils.makeWritable)(container);
  await readable.pipeThrough((0, _2.filter)(_it => {
    return !(_it % 2);
  })).pipeTo(writable);
  expect(container).toStrictEqual([2, 4]);
});
test("filter Pred", async () => {
  const readable = (0, _utils.makeReadable)([1, 2, 3, 4]);
  const container = [];
  const writable = (0, _utils.makeWritable)(container);
  const pred = new _Pred.default(_it2 => {
    return _it2 % 2;
  });
  await readable.pipeThrough((0, _2.filter)(pred)).pipeTo(writable);
  expect(container).toStrictEqual([1, 3]);
});