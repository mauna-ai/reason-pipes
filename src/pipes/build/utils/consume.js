"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.consume = void 0;

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/utils/consume.js
const consume = (iterator, num = 0, _accumulator = []) => {
  return num === 0 ? // No more values needed, return _accumulator
  _accumulator : (({
    done,
    value
  }) => done ? // Iterator finished, return _accumulator
  _accumulator : //
  // Otherwise, add value, then recurse and flatten result
  [value, ...consume(iterator, num - 1, _accumulator)])( //
  // Run iterator
  iterator.next());
};

exports.consume = consume;
var _default = consume;
exports.default = _default;