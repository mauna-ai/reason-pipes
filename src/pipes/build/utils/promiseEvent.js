"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.promiseEvent = exports.EventStore = void 0;

var _makePromise = _interopRequireDefault(require("./makePromise"));

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/utils/promiseEvent.js
const EventStore = _flowRuntime.default.type("EventStore", EventStore => {
  const T = EventStore.typeParameter("T");
  return _flowRuntime.default.object(_flowRuntime.default.property("on", _flowRuntime.default.function(_flowRuntime.default.param("_arg0", _flowRuntime.default.string()), _flowRuntime.default.param("_arg1", _flowRuntime.default.function(_flowRuntime.default.param("_arg0", T), _flowRuntime.default.return(_flowRuntime.default.void()))), _flowRuntime.default.return(_flowRuntime.default.void())), true), _flowRuntime.default.property("addEventListener", _flowRuntime.default.function(_flowRuntime.default.param("_arg0", _flowRuntime.default.string()), _flowRuntime.default.param("_arg1", _flowRuntime.default.function(_flowRuntime.default.param("_arg0", T), _flowRuntime.default.return(_flowRuntime.default.void()))), _flowRuntime.default.return(_flowRuntime.default.void())), true), _flowRuntime.default.property("off", _flowRuntime.default.function(_flowRuntime.default.param("_arg0", _flowRuntime.default.string()), _flowRuntime.default.param("_arg1", _flowRuntime.default.nullable(_flowRuntime.default.function(_flowRuntime.default.param("_arg0", T), _flowRuntime.default.return(_flowRuntime.default.void())))), _flowRuntime.default.return(_flowRuntime.default.void())), true), _flowRuntime.default.property("removeEventListener", _flowRuntime.default.function(_flowRuntime.default.param("_arg0", _flowRuntime.default.string()), _flowRuntime.default.param("_arg1", _flowRuntime.default.nullable(_flowRuntime.default.function(_flowRuntime.default.param("_arg0", T), _flowRuntime.default.return(_flowRuntime.default.void())))), _flowRuntime.default.return(_flowRuntime.default.void())), true));
});

exports.EventStore = EventStore;

const promiseEvent = (eventStore, eventName) => {
  const [promise, fulfill] = (0, _makePromise.default)();

  const listen = (_arg) => {
    return eventStore[// $FlowFixMe
    "on" in eventStore ? "on" : "addEventListener"](eventName, _arg);
  };

  const unlisten = (_arg2) => {
    return eventStore[// $FlowFixMe
    "off" in eventStore ? "off" : "removeEventListener"](eventName, _arg2);
  };

  const handle = t => {
    return fulfill(t), unlisten(handle);
  };

  listen(handle);
  return promise;
};

exports.promiseEvent = promiseEvent;
var _default = promiseEvent;
exports.default = _default;