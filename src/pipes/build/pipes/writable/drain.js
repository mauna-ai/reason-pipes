"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drain = exports.default = drain;

var _webStreamsPolyfill = require("web-streams-polyfill");

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/pipes/writable/drain.js
function makeDrain() {
  return new _webStreamsPolyfill.WritableStream({
    write: chunk => Promise.resolve(chunk)
  });
}

function drain(_arg = {
  recycle: false
}) {
  let {
    recycle
  } = _arg;
  const w = makeDrain();
  const wrapper = {
    get writable() {
      return recycle ? makeDrain() : w;
    }

  };
  return wrapper;
}