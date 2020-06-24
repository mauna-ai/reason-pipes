"use strict";

var _webStreamsPolyfill = require("web-streams-polyfill");

var _utils = require("../../../../utils");

var _ = require("../");

// ./src/shared/pipes/convert/readable/.tests/toIntervalTree.js
test("toIntervalTree", async () => {
  const [sp, sr] = (0, _utils.makePromise)();
  let sC;
  const s = new _webStreamsPolyfill.ReadableStream({
    start(c) {
      sC = c;
      sr();
    }

  });
  await sp;
  sC.enqueue(1);
  sC.enqueue(2);
  sC.enqueue(3);
  sC.enqueue(4);
  const tree = await (0, _.toIntervalTree)(s.getReader());
  sC.close();
  const result = tree.find(-Infinity, Infinity);
  expect(result.length).toStrictEqual(4);
});