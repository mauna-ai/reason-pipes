"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decorate = exports.default = decorate;

var _isPlainObject = _interopRequireDefault(require("./isPlainObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/utils/decorate.js
// From "mobx.decorate"
// See: https://github.com/mobxjs/mobx/blob/master/src/api/decorate.ts
function decorate(thing, decorators) {
  if (!(0, _isPlainObject.default)(decorators)) {
    throw new Error("Decorators should be a key value map");
  }

  const target = typeof thing === "function" ? thing.prototype : thing;
  Object.keys(decorators).forEach((dec, prop) => {
    let propertyDecorators = dec;

    if (!Array.isArray(propertyDecorators)) {
      propertyDecorators = [propertyDecorators];
    }

    if (!propertyDecorators.every(_it => {
      return typeof _it === "function";
    })) {
      throw new Error(`Decorate: expected a decorator function or array of decorator functions for '${prop}'`);
    }

    const descriptor = Object.getOwnPropertyDescriptor(target, prop);
    const newDescriptor = propertyDecorators.reduce((accDescriptor, decorator) => decorator(target, prop, accDescriptor), descriptor);
    if (newDescriptor) Object.defineProperty(target, prop, newDescriptor);
  });
  return thing;
}