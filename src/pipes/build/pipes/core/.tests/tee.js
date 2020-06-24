"use strict";

var _webStreamsPolyfill = require("web-streams-polyfill");

var _utils = require("../../../../../test/utils");

var _ = require("../");

// ./src/shared/pipes/core/.tests/tee.js
test("tee", async () => {
  const readable = (0, _utils.makeReadable)([1, 1, 1]);
  const [r1, r2, r3] = (0, _.tee)(readable);
  const t1 = (0, _.pipe)(a => a);
  const t2 = (0, _.pipe)(a => a + 1);
  const t3 = (0, _.pipe)(a => a + 2);
  const [a1, a2, a3] = [[], [], []];
  const [w1, w2, w3] = [a1, a2, a3].map(_utils.makeWritable);
  await Promise.all([r1.pipeThrough(t1).pipeTo(w1), r2.pipeThrough(t2).pipeTo(w2), r3.pipeThrough(t3).pipeTo(w3)]);
  expect(a1).toStrictEqual([1, 1, 1]);
  expect(a2).toStrictEqual([2, 2, 2]);
  expect(a3).toStrictEqual([3, 3, 3]);
});
test("tee_pipe", async () => {
  const r1 = (0, _utils.makeReadable)([1, 1, 1]);
  const r2 = (0, _utils.makeReadable)([2, 2, 2]);
  const r3 = (0, _utils.makeReadable)([3, 3, 3]);
  const t = (0, _.pipe)(a => a + 1);
  const [t1, t2, t3] = (0, _.tee)(t);
  const [a1, a2, a3] = [[], [], []];
  const [w1, w2, w3] = [a1, a2, a3].map(_utils.makeWritable);
  await Promise.all([r1.pipeThrough(t1).pipeTo(w1), r2.pipeThrough(t2).pipeTo(w2), r3.pipeThrough(t3).pipeTo(w3)]);
  expect(a1).toStrictEqual([1 + 1, 1 + 1, 1 + 1]);
  expect(a2).toStrictEqual([2 + 1, 2 + 1, 2 + 1]);
  expect(a3).toStrictEqual([3 + 1, 3 + 1, 3 + 1]);
});
test("tee_transformstream_fail", async () => {
  const t0 = new _webStreamsPolyfill.TransformStream({
    transform: a => a
  });

  try {
    const [a, b] = (0, _.tee)(t0);
    expect(false).toBe(true); // Should not run
  } catch (e) {
    return;
  }

  expect(false).toBe(true); // Should not run
});