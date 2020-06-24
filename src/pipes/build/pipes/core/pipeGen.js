"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pipeGen = exports.default = pipeGen;

var _pipe = _interopRequireWildcard(require("./pipe"));

var _chain = _interopRequireDefault(require("./chain"));

var _sequence = _interopRequireDefault(require("./sequence"));

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// ./src/shared/pipes/core/pipeGen.js
const Pipe = _flowRuntime.default.tdz(() => _pipe.Pipe);

const PipeOpts = _flowRuntime.default.tdz(() => _pipe.PipeOpts);

function makeGenExhaust(genFn) {
  return async (chunk, controller, isClosing = false) => {
    const gen = genFn(chunk);

    while (true) {
      const {
        done,
        value
      } = gen.next(isClosing);

      if (done) {
        break;
      }

      controller && controller.enqueue(value);
    }
  };
} // Helper for creating instances of `Pipe` class


function pipeGen(genFn, pipeOpts = {}) {
  return (0, _chain.default)((0, _pipe.default)(makeGenExhaust(genFn), pipeOpts), (0, _sequence.default)());
}