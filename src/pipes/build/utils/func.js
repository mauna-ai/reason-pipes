"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = void 0;

var _flatten2 = _interopRequireDefault(require("lodash/flatten"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const compose = (f, g) => (...args) => g(...(0, _flatten2.default)([f(...args)]));

exports.compose = compose;