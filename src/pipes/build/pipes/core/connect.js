"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = exports.default = connect;

var _webStreamsPolyfill = require("web-streams-polyfill");

var _chain = _interopRequireDefault(require("./chain"));

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/pipes/core/connect.js
const ReadableStream = _flowRuntime.default.tdz(() => _webStreamsPolyfill.ReadableStream);

const TransformStream = _flowRuntime.default.tdz(() => _webStreamsPolyfill.TransformStream);

const WritableStream = _flowRuntime.default.tdz(() => _webStreamsPolyfill.WritableStream);

function connect(inStream, transformStreams, outStream) {
  return inStream.pipeThrough((0, _chain.default)(...transformStreams)).pipeTo(outStream);
}