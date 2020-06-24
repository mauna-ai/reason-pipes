"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.toNodeStream = void 0;

var _once2 = _interopRequireDefault(require("lodash/once"));

var _stream = require("stream");

var _webStreamsPolyfill = require("web-streams-polyfill");

var _utils = require("../../utils");

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/pipes/convert/readable/toNodeStream.js
const ReadableStream = _flowRuntime.default.tdz(() => _webStreamsPolyfill.ReadableStream);

const toNodeStream = readable => {
  return new class extends _stream.Readable {
    constructor() {
      super({
        objectMode: !(0, _utils.isByteStream)(readable)
      });
      const self = this;
      const pump = (0, _utils.makePump)(readable.getReader()); // $FlowFixMe

      const destroy = (0, _once2.default)((_arg) => {
        return self.destroy(_arg);
      }); // $FlowFixMe

      const gracefulDestroy = () => destroy();

      pump({
        error: destroy,
        enqueue: (_arg2) => {
          return self.push(_arg2);
        },
        close: gracefulDestroy
      });
    }

    _read() {}

  }();
};

exports.toNodeStream = toNodeStream;
var _default = toNodeStream;
exports.default = _default;