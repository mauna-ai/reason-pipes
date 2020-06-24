"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.passthrough = void 0;

var _pipe = _interopRequireDefault(require("../core/pipe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/pipes/utils/passthrough.js
const passthrough = (_arg) => {
  return (0, _pipe.default)(_it => {
    return _it;
  }, _arg);
};

exports.passthrough = passthrough;
var _default = passthrough;
exports.default = _default;