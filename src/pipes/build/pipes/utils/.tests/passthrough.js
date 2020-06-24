"use strict";

var _utils = require("../../../../../test/utils");

var _ = require("../");

// ./src/shared/pipes/utils/.tests/passthrough.js
const input = [1, 1, 1];
const output = [];
test("passthrough", async () => {
  const r = (0, _utils.makeReadable)(input);
  const w = (0, _utils.makeWritable)(output);
  await r.pipeThrough((0, _.passthrough)()).pipeTo(w);
  expect(input).toStrictEqual(output);
});