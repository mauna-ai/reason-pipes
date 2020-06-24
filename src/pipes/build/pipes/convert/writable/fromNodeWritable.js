"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.fromNodeWritable = exports.isWritableToBytes = exports.inObjectMode = void 0;

var _isTypedArray2 = _interopRequireDefault(require("lodash/isTypedArray"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _isBuffer2 = _interopRequireDefault(require("lodash/isBuffer"));

var _isArrayBuffer2 = _interopRequireDefault(require("lodash/isArrayBuffer"));

var _stream = require("stream");

var _webStreamsPolyfill = require("web-streams-polyfill");

var _utils = require("../../../utils");

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/pipes/convert/writable/fromNodeWritable.js
const NodeWritable = _flowRuntime.default.tdz(() => _stream.Writable);

const inObjectMode = _it => {
  return _it.writableObjectMode || _it._writableState.objectMode;
}; // $FlowFixMe


exports.inObjectMode = inObjectMode;

const isWritableToBytes = chunk => (_arg) => {
  return [_isArrayBuffer2.default, _isBuffer2.default, _isString2.default, _isTypedArray2.default].map(_arg(chunk)).some(_it2 => {
    return _it2;
  });
};

exports.isWritableToBytes = isWritableToBytes;

const fromNodeWritable = nodeWritable => {
  return new _webStreamsPolyfill.WritableStream({
    start(controller) {
      nodeWritable.on("error", (_arg2) => {
        return controller.error(_arg2);
      });
      return Promise.race([// $FlowFixMe
      (0, _utils.promiseFlag)(!nodeWritable.writableFinished), nodeWritable.writable || (0, _utils.promiseEvent)(nodeWritable, "drain")]);
    },

    write(chunk) {
      (0, _utils.invariant)(inObjectMode(nodeWritable) || isWritableToBytes(chunk), "Byte stream can only accept Buffer, TypedArray or string values");
      const shouldContinue = nodeWritable.write(chunk);
      return shouldContinue ? Promise.resolve() : (0, _utils.promiseEvent)(nodeWritable, "drain");
    },

    close: () => (nodeWritable.uncork(), nodeWritable.end()),
    abort: (_arg3) => {
      return nodeWritable.destroy(_arg3);
    }
  });
};

exports.fromNodeWritable = fromNodeWritable;
var _default = fromNodeWritable;
exports.default = _default;