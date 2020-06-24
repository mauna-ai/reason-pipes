"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.fromReader = void 0;

var _webStreamsPolyfill = require("web-streams-polyfill");

var _webStreamsPolyfill2 = require("../../../types/web-streams-polyfill.flow");

var _utils = require("../../utils");

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/pipes/convert/readable/fromReader.js
const Reader = _flowRuntime.default.tdz(() => _webStreamsPolyfill2.ReadableStreamDefaultReader);

const fromReader = reader => {
  return new _webStreamsPolyfill.ReadableStream({
    start: (0, _utils.makePump)(reader)
  });
};

exports.fromReader = fromReader;
var _default = fromReader;
exports.default = _default;