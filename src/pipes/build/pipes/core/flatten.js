"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flatten = exports.default = flatten;

var _pipe = _interopRequireWildcard(require("./pipe"));

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// ./src/shared/pipes/core/flatten.js
const Pipe = _flowRuntime.default.tdz(() => _pipe.Pipe);

const PipeOpts = _flowRuntime.default.tdz(() => _pipe.PipeOpts);

function flatten(opts = {}) {
  return (0, _pipe.default)( // $FlowFixMe
  (chunk, controller) => void (chunk && chunk.forEach((_arg) => {
    return controller.enqueue(_arg);
  })), opts);
}