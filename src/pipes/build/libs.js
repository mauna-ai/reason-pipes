"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _window = _interopRequireDefault(require("global/window"));

var _hark = _interopRequireDefault(require("hark"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _siriwave = _interopRequireDefault(require("siriwave/dist/siriwave.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/libs.js

/* eslint-disable */
const libs = {
  React: _react.default,
  ReactDOM: _reactDom.default,
  SiriWave: _siriwave.default
};
Object.assign(_window.default, libs);
var _default = libs;
exports.default = _default;