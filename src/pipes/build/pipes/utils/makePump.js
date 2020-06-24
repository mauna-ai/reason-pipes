"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.makePump = void 0;

var _ifElse = _interopRequireDefault(require("crocks/logic/ifElse"));

var _tryCatch = _interopRequireDefault(require("crocks/Result/tryCatch"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/pipes/utils/makePump.js
const shutdown = ctrl => (_arg) => {
  return (ctrl.terminate || ctrl.close).call(ctrl, _arg);
};

const makePump = reader => {
  var _ref;

  return _ref = recur => async controller => {
    var _ref2;

    return (//
      // Read
      _ref2 = await reader.read(), (0, _ifElse.default)(_it => {
        return _it.done;
      }, // Terminate if readable is done
      shutdown(controller), // Else, queue value
      ({
        value
      }) => {
        var _ref3, _value;

        return _ref3 = (_value = value, (0, _tryCatch.default)((_arg2) => {
          return controller.enqueue(_arg2);
        })(_value)), ( //
        // Then, recurse
        // $FlowFixMe
        _it2 => {
          return _it2.either((_arg3) => {
            return controller.error(_arg3);
          }, (_arg4) => {
            return recur(controller, _arg4);
          });
        })(_ref3);
      })(_ref2)
    );
  }, (0, _utils.yc)(_ref);
};

exports.makePump = makePump;
var _default = makePump;
exports.default = _default;