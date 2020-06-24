"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accumulate = exports.default = accumulate;

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _webStreamsPolyfill = require("web-streams-polyfill");

var _pipe = _interopRequireWildcard(require("./pipe"));

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/pipes/core/accumulate.js
const PipeOpts = _flowRuntime.default.tdz(() => _pipe.PipeOpts);

const Controller = _flowRuntime.default.tdz(() => _webStreamsPolyfill.Controller);

function accumulate(pipeOpts = {}) {
  // Accumulating stream i.e. takes chunks and returns
  // collected values on the other end, after source is terminated
  const accumulated = [];
  const opts = { ...pipeOpts,
    trailing: true
  };
  return (0, _pipe.default)((chunk, controller, closing) => {
    return void (closing ? controller && controller.enqueue(accumulated) : (0, _isUndefined2.default)(chunk) || accumulated.push(chunk));
  }, opts);
}