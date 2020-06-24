"use strict";

var _utils = require("../../../../../../test/utils");

var _utils2 = require("../../../../utils");

var _2 = require("../");

// ./src/shared/pipes/convert/readable/.tests/fromNodeReadable.js
test("toNodeStream", async () => {
  const str = "hello world";
  const readable = (0, _utils.makeReadable)(str.split(""));
  const result = [];
  const node$ = (0, _2.toNodeStream)(readable);
  const [done, finish] = (0, _utils2.makePromise)();
  node$.on("close", finish);
  node$.on("data", (_arg) => {
    return result.push(_arg);
  });
  await done;
  const out = result.join("");
  expect(out).toStrictEqual(str);
});