"use strict";

var _events = require("events");

var _2 = require("../");

// ./src/shared/utils/.tests/promiseEvent.js
test("promiseEvent", async () => {
  const emitter = new _events.EventEmitter();
  const done = (0, _2.promiseEvent)(emitter, "hi");
  emitter.emit("hi", true);
  expect((await done)).toEqual(true);
});