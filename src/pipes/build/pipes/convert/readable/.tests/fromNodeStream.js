"use strict";

var _webStreamsPolyfill = require("web-streams-polyfill");

var _from = _interopRequireDefault(require("from2"));

var _utils = require("../../../../../../test/utils");

var _2 = require("../");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/pipes/convert/readable/.tests/fromNodeReadable.js
function string$(string, objectMode) {
  let stream;
  stream = (0, _from.default)({
    objectMode
  }, function (size, next) {
    // if there's no more content
    // left in the string, close the stream.
    if (string.length <= 0) return setImmediate((_arg) => {
      return stream.destroy(_arg);
    }); // Pull in a new chunk of text,
    // removing it from the string.

    var chunk = string.slice(0, 1);
    string = string.slice(1); // Emit "chunk" from the stream.

    next(null, chunk);
  });
  return stream;
}

test("fromNodeReadable bytes", async () => {
  const result = [];
  const str = "hello world";
  const node$ = string$(str);
  const writable = (0, _utils.makeWritable)(result);
  const readable = (0, _2.fromNodeReadable)(node$);
  await readable.pipeTo(writable);
  const out = Array.from(result[0]).map((_arg2) => {
    return String.fromCharCode(_arg2);
  }).join("");
  expect(out).toStrictEqual(str);
});
test("fromNodeReadable obj", async () => {
  const result = [];
  const str = "hello world";
  const node$ = string$(str, true);
  const writable = (0, _utils.makeWritable)(result);
  const readable = (0, _2.fromNodeReadable)(node$);
  await readable.pipeTo(writable);
  const out = result.join("");
  expect(out).toStrictEqual(str);
});