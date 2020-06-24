"use strict";

var _crocks = require("crocks");

var _webStreamsPolyfill = require("web-streams-polyfill");

var _utils = require("../../../../../test/utils");

var _ = require("../");

test("PipeIsArrow", async () => {
  const p = (0, _.pipe)(x => x + 10);
  expect(p instanceof _crocks.Arrow);
});
test("PipeComposition", async () => {
  const a = (0, _.pipe)((x, b, c) => x + 10);
  const b = (0, _.pipe)(x => x + 15);
  const p = a.compose(b);
  const readable = (0, _utils.makeReadable)([2, 3, 4, 5]);
  const transformed = readable.pipeThrough(p);
  const reader = transformed.getReader();
  const result = await (0, _utils.consume)(reader);
  expect(result).toStrictEqual([27, 28, 29, 30]);
});
test("PipeContramap", async () => {
  const a = (0, _.pipe)(x => x + 10);
  const p = a.contramap(x => 8 * x);
  const readable = (0, _utils.makeReadable)([2, 3, 4, 5]);
  const transformed = readable.pipeThrough(p);
  const reader = transformed.getReader();
  const result = await (0, _utils.consume)(reader);
  expect(result).toStrictEqual([26, 34, 42, 50]);
});
test("PipePromap", async () => {
  const a = (0, _.pipe)(x => x + 10);
  const p = a.promap(x => 4 + x, x => 10 * x);
  const readable = (0, _utils.makeReadable)([2, 3, 4, 5]);
  const transformed = readable.pipeThrough(p);
  const reader = transformed.getReader();
  const result = await (0, _utils.consume)(reader);
  expect(result).toStrictEqual([160, 170, 180, 190]);
});
test("PipeId", async () => {
  let countA = 0;
  let countB = 0;
  let countP = 0;
  const a = (0, _.pipe)((x, b, c) => x + 10);

  const b = _.Pipe.id();

  const p = a.compose(b);
  const runWithA = a.runWith.bind(a);
  const runWithB = a.runWith.bind(a);
  const runWithP = a.runWith.bind(a);

  a.runWith = (...args) => {
    countA += 1;
    return runWithA(...args);
  };

  b.runWith = (...args) => {
    countB += 1;
    return runWithB(...args);
  };

  p.runWith = (...args) => {
    countP += 1;
    return runWithP(...args);
  };

  const readable = (0, _utils.makeReadable)([2, 3, 4, 5]);
  const transformed = readable.pipeThrough(p);
  const reader = transformed.getReader();
  const result = await (0, _utils.consume)(reader);
  expect(countA).toStrictEqual(0);
  expect(countB).toStrictEqual(0);
  expect(countP).toStrictEqual(4);
  expect(result).toStrictEqual([12, 13, 14, 15]);
});
test("PipeTransformData", async () => {
  const p = (0, _.pipe)(x => x + 10);
  const p1 = (0, _.pipe)(x => x + 15, {
    init: 1
  });
  const readable1 = (0, _utils.makeReadable)([2, 3, 4, 5]);
  const readable2 = (0, _utils.makeReadable)([2, 3, 4, 5]);
  const transformed1 = readable1.pipeThrough(p1);
  const transformed2 = readable2.pipeThrough(p);
  const reader1 = transformed1.getReader();
  const reader2 = transformed2.getReader();
  const result1 = await (0, _utils.consume)(reader1);
  const result2 = await (0, _utils.consume)(reader2);
  expect(p instanceof _webStreamsPolyfill.TransformStream);
  expect(p1 instanceof _webStreamsPolyfill.TransformStream);
  expect(result1).toStrictEqual([16, 17, 18, 19, 20]);
  expect(result2).toStrictEqual([12, 13, 14, 15]);
});
test("PipePutEOS", async () => {
  const p = (0, _.pipe)(x => x + 10);
  const readable = new _webStreamsPolyfill.ReadableStream({
    start(controller) {
      for (let i = 2; i <= 5; i++) {
        controller.enqueue(i);
      }

      controller.enqueue(_.EOS);

      for (let i = 6; i <= 10; i++) {
        controller.enqueue(i);
      }

      controller.close();
    }

  });
  const transformed = readable.pipeThrough(p);
  const reader = transformed.getReader();
  const result = await (0, _utils.consume)(reader);
  expect(result).toStrictEqual([12, 13, 14, 15]);
});