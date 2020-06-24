"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.toNodeStream = void 0;

var _stream = require("stream");

var _webStreamsPolyfill = require("web-streams-polyfill");

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/pipes/convert/readable/toNodeStream.js
const WritableStream = _flowRuntime.default.tdz(() => _webStreamsPolyfill.WritableStream);

// TODO: Write implementation
const toNodeStream = readable => {
  return new class extends _stream.Writable {
    constructor() {
      throw new TypeError("Not Implemented");
    }

    _write() {}

  }();
};

exports.toNodeStream = toNodeStream;
var _default = toNodeStream;
exports.default = _default;