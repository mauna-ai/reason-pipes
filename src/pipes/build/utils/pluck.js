"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pluck = exports.default = pluck;

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/utils/pluck.js
function pluck(props, prop, defaultVal = null) {
  // Pluck value
  const value = prop in props ? props[prop] : defaultVal;
  delete props[prop]; // eslint-disable-line no-param-reassign

  return value;
}