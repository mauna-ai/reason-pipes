"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.fromNodeDuplex = exports.toTransform = void 0;

var _webStreamsPolyfill = require("web-streams-polyfill");

var _utils = require("../../utils");

var _fromReadableWritable = _interopRequireDefault(require("./fromReadableWritable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/pipes/readable/fromNodeDuplex.js
const toTransform = duplex$ => {
  return {
    readable: new _webStreamsPolyfill.ReadableStream({
      start(controller) {
        duplex$.on("data", (_arg) => {
          return controller.enqueue(_arg);
        });
        duplex$.on("error", (_arg2) => {
          return controller.error(_arg2);
        });
      }

    }),
    writable: new _webStreamsPolyfill.WritableStream({
      start(controller) {
        duplex$.on("error", (_arg3) => {
          return controller.error(_arg3);
        });
      },

      write(chunk) {
        duplex$.write(chunk);
      }

    })
  };
};

exports.toTransform = toTransform;
const fromNodeDuplex = (0, _utils.compose)(toTransform, _fromReadableWritable.default);
exports.fromNodeDuplex = fromNodeDuplex;
var _default = fromNodeDuplex;
exports.default = _default;