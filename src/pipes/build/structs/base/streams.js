"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TransformStream", {
  enumerable: true,
  get: function () {
    return _webStreamsPolyfill.TransformStream;
  }
});
Object.defineProperty(exports, "WritableStream", {
  enumerable: true,
  get: function () {
    return _webStreamsPolyfill.WritableStream;
  }
});
exports.ReadableStream = void 0;

var _pacta = _interopRequireDefault(require("pacta"));

var _webStreamsPolyfill = require("web-streams-polyfill");

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/structs/base/streams.js
// The only change from original stream is that `pipeTo` returns a "pacta" promise.
class ReadableStream extends _webStreamsPolyfill.ReadableStream {
  constructor(...args) {
    super(...args);
  }

  pipeTo(writable) {
    return _pacta.default.resolve(super.pipeTo(writable));
  }

}

exports.ReadableStream = ReadableStream;