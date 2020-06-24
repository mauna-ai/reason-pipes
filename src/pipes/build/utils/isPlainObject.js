"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPlainObject = exports.default = isPlainObject;

// ./src/shared/utils/isPlainObject.js
function isPlainObject(value) {
  if (value === null || typeof value !== "object") return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}