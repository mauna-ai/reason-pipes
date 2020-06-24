"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtensibleFunction = exports.default = void 0;

// ./src/shared/utils/ExtensibleFunction.js
class ExtensibleFunction extends Function {
  constructor(func, ...args) {
    super();
    const self = this;
    return new Proxy(this, {
      apply(target, thisArg, argumentsList) {
        return func.apply(thisArg || self, [...args, ...argumentsList]);
      }

    });
  }

}

exports.ExtensibleFunction = exports.default = ExtensibleFunction;