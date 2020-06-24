"use strict";

var _2 = require("../");

// ./src/shared/utils/.tests/promiseFlag.js
test("promiseFlag true", async () => {
  const done = (0, _2.promiseFlag)(true);
  expect((await done)).toEqual(true);
});
test("promiseFlag false", async () => {
  const [done, finish] = (0, _2.makePromise)();

  try {
    await (0, _2.promiseFlag)(false);
  } catch (e) {
    finish(true);
  }

  expect((await done)).toEqual(true);
});