"use strict";

var _webStreamsPolyfill = require("web-streams-polyfill");

var _utils = require("../../../../../test/utils");

var _utils2 = require("../../../utils");

var _2 = require("../");

const isSubsetOf = (_it, _arg) => {
  return _it.every((_arg2) => {
    return _arg.includes(_arg2);
  });
};

test("gate", async () => {
  const [[sp, sr], [ap, ar], [bp, br]] = [null, null, null].map(_utils2.makePromise);
  let S, A, B;
  const s = new _webStreamsPolyfill.ReadableStream({
    start(c) {
      S = c;
      sr();
    }

  });
  const a = new _webStreamsPolyfill.ReadableStream({
    start(c) {
      A = c;
      ar();
    }

  });
  const b = new _webStreamsPolyfill.ReadableStream({
    start(c) {
      B = c;
      br();
    }

  });
  const g = (0, _2.gate)(s, a, b);
  await Promise.all([sp, ap, bp]); // ------------> // [S], [A], [B]

  S.enqueue(true); // [true], [], []

  B.enqueue(1); // [true], [], [1]

  A.enqueue(2); // [true], [2], [1]

  A.enqueue(3); // [true, false], [2, 3], [1]

  B.enqueue(4); // [true, false], [2, 3], [1, 4]

  S.enqueue(false);
  S.close();
  const result = await (0, _utils.consume)(g.getReader());
  expect(result).toStrictEqual([2, 1]);
});