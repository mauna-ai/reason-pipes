"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReaderT = ReaderT;
exports.default = exports.AsyncP = exports.State = exports.Pair = exports.Reader = exports.Async = exports.Resolved = exports.Rejected = exports.Arrow = void 0;

var _Arrow2 = _interopRequireDefault(require("crocks/Arrow"));

var _Async2 = _interopRequireWildcard(require("crocks/Async"));

var _Pair2 = _interopRequireDefault(require("crocks/Pair"));

var _Reader2 = _interopRequireDefault(require("crocks/Reader"));

var _ReaderT2 = _interopRequireDefault(require("crocks/Reader/ReaderT"));

var _State2 = _interopRequireDefault(require("crocks/State"));

var _pacta = _interopRequireDefault(require("pacta"));

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/structs/base/crocks.js
class Arrow extends _Arrow2.default {
  constructor(fn) {
    return new _Arrow2.default(fn);
  }

}

exports.Arrow = Arrow;

class Rejected extends _Async2.Rejected {
  constructor(e) {
    return new _Async2.Rejected(e);
  }

}

exports.Rejected = Rejected;

class Resolved extends _Async2.Resolved {
  constructor(a) {
    return new _Async2.Resolved(a);
  }

}

exports.Resolved = Resolved;

class Async extends _Async2.default {
  constructor(fn) {
    return new _Async2.default(fn);
  }

}

exports.Async = Async;

class Reader extends _Reader2.default {
  constructor(f) {
    return new _Reader2.default(f);
  }

}

exports.Reader = Reader;

function ReaderT(c) {
  return (0, _ReaderT2.default)(c);
}

class Pair extends _Pair2.default {
  constructor(a, b) {
    return new _Pair2.default(a, b);
  }

}

exports.Pair = Pair;

class State extends _State2.default {
  constructor(fn) {
    return new _State2.default(fn);
  }

}

exports.State = State;

class AsyncP extends Async {
  constructor(...args) {
    super(...args);
  }

  // $FlowFixMe
  toPromise() {
    const promise = super.toPromise();
    return _pacta.default.resolve(promise);
  }

}

exports.AsyncP = AsyncP;
const all = {
  Arrow,
  Async,
  AsyncP,
  Pair,
  Reader,
  ReaderT,
  Rejected,
  Resolved,
  State
};
var _default = all;
exports.default = _default;