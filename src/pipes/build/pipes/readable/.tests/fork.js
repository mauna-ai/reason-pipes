"use strict";

var _utils = require("../../../../../test/utils");

var _2 = require("../");

test("fork", async () => {
  const readable = (0, _utils.makeReadable)([1, 2, 3, 4]);
  const container1 = [];
  const container2 = [];
  const writable1 = (0, _utils.makeWritable)(container1);
  const writable2 = (0, _utils.makeWritable)(container2);
  const [readable1, readable2] = (0, _2.fork)(readable, _it => {
    return !(_it % 2);
  });
  await readable1.pipeTo(writable1);
  await readable2.pipeTo(writable2);
  expect(container1).toStrictEqual([2, 4]);
  expect(container2).toStrictEqual([1, 3]);
});