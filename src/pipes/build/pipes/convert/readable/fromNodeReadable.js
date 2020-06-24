"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.fromNodeReadable = exports.inObjectMode = void 0;

var _once2 = _interopRequireDefault(require("lodash/once"));

var _stream = require("stream");

var _webStreamsPolyfill = require("web-streams-polyfill");

var _utils = require("../../../utils");

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/pipes/convert/readable/fromNodeReadable.js
const NodeReadable = _flowRuntime.default.tdz(() => _stream.Readable);

const inObjectMode = _it => {
  return _it.readableObjectMode || _it._readableState.objectMode;
};

exports.inObjectMode = inObjectMode;

const fromNodeReadable = nodeReadable => {
  return new _webStreamsPolyfill.ReadableStream({
    type: inObjectMode(nodeReadable) ? void 0 : "bytes",

    start(controller) {
      const close = (0, _once2.default)((_arg) => {
        return controller.close(_arg);
      });
      nodeReadable.on("error", (_arg2) => {
        return controller.error(_arg2);
      });
      nodeReadable.on("close", close);
      nodeReadable.on("end", close);
      inObjectMode(nodeReadable) && nodeReadable.on("data", (_arg3) => {
        return controller.enqueue(_arg3);
      });
      return Promise.race([(0, _utils.promiseEvent)(nodeReadable, "resume"), (0, _utils.promiseEvent)(nodeReadable, "readable")]);
    },

    pull(controller) {
      if (!inObjectMode(nodeReadable)) {
        controller.enqueue(nodeReadable.read());
      }

      return (0, _utils.promiseEvent)(nodeReadable, "readable");
    }

  });
};

exports.fromNodeReadable = fromNodeReadable;
var _default = fromNodeReadable;
exports.default = _default;