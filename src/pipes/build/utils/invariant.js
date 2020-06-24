"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invariant = exports.default = invariant;
exports.InvariantError = void 0;

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/utils/invariant.js
class InvariantError extends Error {}

exports.InvariantError = InvariantError;

function invariant(value, message = "") {
  if (!value) {
    // $FlowFixMe
    throw new InvariantError(message || `Value: <${value}> not truthy`);
  }

  return value;
}