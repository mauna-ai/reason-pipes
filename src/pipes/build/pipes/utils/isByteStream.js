"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.isByteStream = void 0;

var _webStreamsPolyfill = require("web-streams-polyfill");

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/utils/isByteStream.js
const getCtrl = _it => {
  return _it._readableStreamController;
};

const {
  constructor: ByteController
} = getCtrl(new _webStreamsPolyfill.ReadableStream({
  type: "bytes"
}));

const isByteStream = stream => {
  return getCtrl(stream) instanceof ByteController;
};

exports.isByteStream = isByteStream;
var _default = isByteStream;
exports.default = _default;