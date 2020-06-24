"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.merge = exports.default = merge;

var _list = _interopRequireDefault(require("@ygor/list"));

var _webStreamsPolyfill = require("web-streams-polyfill");

var _utils = require("../utils");

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/pipes/readable/merge.js
function merge(streams) {
  const readers = streams.map(_it => {
    return _it.getReader();
  });
  const pumps = readers.map(_utils.makePump);
  const result = new _webStreamsPolyfill.ReadableStream({
    async start(controller) {
      await (0, _list.default)(pumps).map(_it2 => {
        return _it2(controller);
      });
      controller.close();
    }

  });
  return result;
}