"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.makePropTypeValidator = void 0;

var _pick3 = _interopRequireDefault(require("lodash/pick"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _tryCatch = _interopRequireDefault(require("crocks/Result/tryCatch"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _invariant = _interopRequireDefault(require("./invariant"));

var _predicates = require("./predicates");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Make validate function
const makePropTypeValidator = propTypes => (0, _tryCatch.default)(input => {
  var _ref, _ref2, _input, _ref3, _ref4, _pick2;

  return (// Make sure input is not undefined
    (_ref = (_ref2 = (_input = input, (0, _isUndefined2.default)(_input)), (0, _predicates.flip)(_ref2)), ((_arg) => {
      return (0, _invariant.default)(_arg, "input cannot be undefined");
    })(_ref)), ( //
    // Pick only prop types that match input
    _ref3 = (_ref4 = (_pick2 = (0, _pick3.default)(propTypes, Object.keys(input)), ( //
    // Validate input and throw on failure
    (_arg2) => {
      return _propTypes.default.checkPropTypes(_arg2, input);
    })(_pick2)), (0, _predicates.flip)(_ref4)), ((_arg3) => {
      return (0, _invariant.default)(_arg3, `input validation failed; expected: [${input}]`);
    })(_ref3)), //
    // If valid, return input
    input
  );
});

exports.makePropTypeValidator = makePropTypeValidator;
var _default = makePropTypeValidator;
exports.default = _default;