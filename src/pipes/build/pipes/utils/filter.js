"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toCheck = toCheck;
exports.filter = exports.default = filter;
exports.FilterPipe = exports.FilterPredicate = void 0;

var _Pred = _interopRequireDefault(require("crocks/Pred"));

var _isSameType = _interopRequireDefault(require("crocks/predicates/isSameType"));

var _pipe = require("../core/pipe");

var _predicates = require("../../utils/predicates");

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/pipes/utils/filter.js
const PipeOpts = _flowRuntime.default.tdz(() => _pipe.PipeOpts);

const FilterPredicate = _flowRuntime.default.type("FilterPredicate", FilterPredicate => {
  const A = FilterPredicate.typeParameter("A");
  return _flowRuntime.default.union(_flowRuntime.default.Class(A), A, _flowRuntime.default.function(_flowRuntime.default.param("_arg0", _flowRuntime.default.nullable(A)), _flowRuntime.default.return(_flowRuntime.default.boolean())), _flowRuntime.default.ref(_Pred.default, A));
});

exports.FilterPredicate = FilterPredicate;

class FilterPipe extends _pipe.Pipe {
  constructor(check, opts) {
    // $FlowFixMe
    const pipeFn = chunk => this.check(chunk) ? chunk : void 0;

    super(pipeFn, opts);
    this.check = check;
  }

  flip() {
    this.check = (0, _predicates.not)(this.check);
    return this;
  }

}

exports.FilterPipe = FilterPipe;

function toCheck(predicate) {
  let check;

  switch (true) {
    case (0, _isSameType.default)(_Pred.default, predicate):
      // $FlowFixMe
      check = (_arg) => {
        return predicate.runWith(_arg);
      };

      break;
    //

    case (0, _predicates.isClass)(predicate):
      // $FlowFixMe
      check = (_arg2) => {
        return _arg2 instanceof predicate;
      };

      break;
    //

    case (0, _predicates.isFunction)(predicate):
      // $FlowFixMe
      check = predicate;
      break;
    //

    case (0, _predicates.isntFunction)(predicate):
      // $FlowFixMe
      check = (_arg3) => {
        return predicate === _arg3;
      };

      break;
    //

    default:
      throw new Error("Bad filter");
  } // $FlowFixMe


  return check;
}

function filter(predicate, opts = {}) {
  const check = toCheck(predicate);
  return new FilterPipe( // $FlowFixMe
  check, // $FlowFixMe
  opts);
}