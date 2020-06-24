"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.safePipe = exports.default = safePipe;

var _Result2 = _interopRequireDefault(require("crocks/Result"));

var _tryCatch = _interopRequireDefault(require("crocks/Result/tryCatch"));

var _webStreamsPolyfill = require("web-streams-polyfill");

var _errors = require("../../errors");

var _pipe = _interopRequireWildcard(require("./pipe"));

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/pipes/core/safePipe.js
const Pipe = _flowRuntime.default.tdz(() => _pipe.Pipe);

const PipeOpts = _flowRuntime.default.tdz(() => _pipe.PipeOpts);

const Controller = _flowRuntime.default.tdz(() => _webStreamsPolyfill.Controller);

const Result = _flowRuntime.default.tdz(() => _Result2.default);

function safePipe(fn, opts = {}) {
  const safeFn = (0, _tryCatch.default)(fn);
  return (0, _pipe.default)((chunk, controller, isClosing) => {
    const result = safeFn(chunk, controller, isClosing);
    return result.bimap(x => new _errors.ResultError(x), _it => {
      return _it;
    });
  }, opts);
}