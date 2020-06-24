"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.fork = void 0;

var _utils = require("../../utils");

var _core = require("../core");

var _utils2 = require("../utils");

// ./src/shared/pipes/utils/fork.js
// import type { ReadableStream } from "web-streams-polyfill";
// import type { FilterPredicate } from "../utils/filter";
// FIXME: Types commented out since flow doesn't support pipe operator yet.
const fork
/* : <A>(
ReadableStream<A>,
FilterPredicate<A>
) => [ReadableStream<A>, ReadableStream<A>] */
= (readable, predicate) => {
  var _ref, _tee;

  return _ref = (_tee = (0, _core.tee)(readable), ((_arg) => {
    return (0, _utils.consume)(_arg, 2);
  })(_tee)), (_it => {
    return [_it[0].pipeThrough((0, _utils2.filter)(predicate)), _it[1].pipeThrough((0, _utils2.filter)(predicate).flip())];
  })(_ref);
};

exports.fork = fork;
var _default = fork;
exports.default = _default;