"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gate = exports.default = gate;

var _webStreamsPolyfill = require("web-streams-polyfill");

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/pipes/hos/gate.js
function gate(condStream, ifStream, elseStream, predicate = Boolean) {
  let condReader, ifReader, elseReader;
  return new _webStreamsPolyfill.ReadableStream({
    start(controller) {
      ifReader = ifStream.getReader();
      elseReader = elseStream.getReader();
      condReader = condStream.getReader();
    },

    async pull(controller) {
      const cond = await condReader.read();

      if (cond.done) {
        return controller.close();
      }

      const result = await (predicate(cond.value) ? ifReader : elseReader).read();

      if (result.done) {
        return controller.close();
      }

      controller.enqueue(result.value);
    }

  });
}