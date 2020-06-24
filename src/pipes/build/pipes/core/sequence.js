"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequence = exports.default = sequence;

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _webStreamsPolyfill = require("web-streams-polyfill");

var _pipe = _interopRequireWildcard(require("./pipe"));

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/pipes/core/sequence.js
const PipeOpts = _flowRuntime.default.tdz(() => _pipe.PipeOpts);

const Controller = _flowRuntime.default.tdz(() => _webStreamsPolyfill.Controller);

// Helper for using `Sequence` class
function sequence(pipeOpts = {}) {
  // Sequencing stream i.e. takes promise chunks and returns
  // awaited values on the other end, in order of arrival
  return (0, _pipe.default)((chunk, controller) => {
    return void (async () => {
      const val = await chunk;
      controller && !(0, _isUndefined2.default)(val) && controller.enqueue(val);
    })();
  }, pipeOpts);
}