"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.chain = void 0;

var _webStreamsPolyfill = require("web-streams-polyfill");

var _reverse = _interopRequireDefault(require("../../utils/reverse"));

var _fromReadableWritable = _interopRequireDefault(require("../convert/fromReadableWritable"));

var _passthrough = _interopRequireDefault(require("../utils/passthrough"));

var _pipe = require("./pipe");

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/pipes/core/chain.js
// $FlowFixMe
const isPipe = _it => {
  return _it instanceof _pipe.Pipe;
};

function chainTwo(inStream, outStream) {
  const in$ = isPipe(inStream) ? inStream : (0, _fromReadableWritable.default)(inStream);
  const out$ = isPipe(outStream) ? outStream : (0, _fromReadableWritable.default)(outStream);
  return out$.compose(in$);
}

const chain = (...streams) => {
  return (0, _reverse.default)(streams).reduce(chainTwo, (0, _passthrough.default)());
};

exports.chain = chain;
var _default = chain;
exports.default = _default;