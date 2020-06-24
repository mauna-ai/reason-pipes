"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.promiseFlag = void 0;

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/utils/promiseFlag.js
const promiseFlag = flag => {
  return flag ? Promise.resolve(!!flag) : Promise.reject(new Error(`Falsey flag passed to promiseFlag: ${flag.toString()}`));
};

exports.promiseFlag = promiseFlag;
var _default = promiseFlag;
exports.default = _default;