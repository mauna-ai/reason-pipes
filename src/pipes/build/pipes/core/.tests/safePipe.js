"use strict";

var _Result = _interopRequireDefault(require("crocks/Result"));

var _utils = require("../../../../../test/utils");

var _ = require("../");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test("safePipe", async () => {
  const a = (0, _.safePipe)(a => a);
  const readable = (0, _utils.makeReadable)([1, 1, 1]);
  const transformed = readable.pipeThrough(a);
  const reader = transformed.getReader();
  const result = await (0, _utils.consume)(reader);
  const mapped = [];
  result.forEach(r => r.either(() => {}, m => mapped.push(m)));
  expect(result.every(r => _Result.default.type === r.type));
  expect(mapped).toStrictEqual([1, 1, 1]);
});
test("safePipeError", async () => {
  const a = (0, _.safePipe)(a => null.a);
  const readable = (0, _utils.makeReadable)([1, 1, 1]);
  const transformed = readable.pipeThrough(a);
  const reader = transformed.getReader();
  const result = await (0, _utils.consume)(reader);
  const mapped = [];
  result.forEach(r => r.either(m => mapped.push(m), () => {}));
  expect(result.every(r => _Result.default.type === r.type));
  expect(mapped.every(e => e instanceof Error));
});