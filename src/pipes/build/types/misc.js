"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stack = void 0;

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/types/misc.js
const Stack = _flowRuntime.default.type("Stack", Stack => {
  const T = Stack.typeParameter("T");
  return _flowRuntime.default.object(_flowRuntime.default.property("length", _flowRuntime.default.function(_flowRuntime.default.return(_flowRuntime.default.number()))), _flowRuntime.default.property("isEmpty", _flowRuntime.default.function(_flowRuntime.default.return(_flowRuntime.default.boolean()))), _flowRuntime.default.property("push", _flowRuntime.default.function(_flowRuntime.default.param("_arg0", T), _flowRuntime.default.return(_flowRuntime.default.void()))), _flowRuntime.default.property("pop", _flowRuntime.default.function(_flowRuntime.default.return(T))), _flowRuntime.default.property("peek", _flowRuntime.default.function(_flowRuntime.default.return(T))), _flowRuntime.default.property("clear", _flowRuntime.default.function(_flowRuntime.default.return(_flowRuntime.default.void()))));
});

exports.Stack = Stack;