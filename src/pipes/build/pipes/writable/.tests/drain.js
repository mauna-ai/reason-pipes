"use strict";

var _utils = require("../../../../../test/utils");

var _ = require("../");

test("drain", async () => {
  const a = (0, _utils.makeReadable)([1, 2]);
  const b = (0, _utils.makeReadable)([1, 2]);
  const c = (0, _utils.makeReadable)([1, 2]);
  const d = (0, _.drain)({
    recycle: true
  });
  await Promise.all([a.pipeTo(d.writable), b.pipeTo(d.writable), c.pipeTo(d.writable)]);
});