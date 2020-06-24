"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PatchCrock = void 0;

var _memoize2 = _interopRequireDefault(require("lodash/memoize"));

var _functions2 = _interopRequireDefault(require("lodash/functions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PatchCrock = (0, _memoize2.default)(Crock => {
  class Patched {
    constructor(ref, ...args) {
      this._ref = ref;

      if (!(ref instanceof Crock)) {
        this._ref = new Crock(...args);
      }
    }

  }

  const unit = Crock.id ? Crock.id() : Crock.empty();

  for (let method of (0, _functions2.default)(unit)) {
    if (method !== "constructor") {
      Patched.prototype[method] = function (...args) {
        let result = this._ref[method].apply(this._ref, args);

        if (result instanceof Crock) {
          result = new Patched(result);
        }

        return result;
      };
    }
  }

  return Patched;
});
exports.PatchCrock = PatchCrock;
var _default = PatchCrock;
exports.default = _default;