"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.fromWriter = exports.FromWriterOpts = void 0;

var _webStreamsPolyfill = require("web-streams-polyfill");

var _webStreamsPolyfill2 = require("../../../types/web-streams-polyfill.flow");

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/pipes/convert/readable/fromWriter.js
const Writer = _flowRuntime.default.tdz(() => _webStreamsPolyfill2.WritableStreamDefaultWriter);

const FromWriterOpts = _flowRuntime.default.type("FromWriterOpts", _flowRuntime.default.object(_flowRuntime.default.property("preventAbort", _flowRuntime.default.boolean()), _flowRuntime.default.property("preventClose", _flowRuntime.default.boolean())));

exports.FromWriterOpts = FromWriterOpts;

const fromWriter = (writer, opts = {}) => {
  return new _webStreamsPolyfill.WritableStream({
    write: (_arg) => {
      return writer.write(_arg);
    },
    abort: () => !opts.preventAbort && writer.abort(),
    // $FlowFixMe
    close: () => !opts.preventClose && writer.close()
  });
};

exports.fromWriter = fromWriter;
var _default = fromWriter;
exports.default = _default;