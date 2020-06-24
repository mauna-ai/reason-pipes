"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makePromise = exports.default = makePromise;

var _pacta = _interopRequireDefault(require("pacta"));

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/utils/makePromise.js
function makePromise() {
  let reject;
  let resolve;
  const promise = new _pacta.default((_resolve, _reject) => {
    reject = _reject;
    resolve = _resolve;
  });
  return [promise, resolve, reject];
}