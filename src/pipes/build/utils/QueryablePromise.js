"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryablePromise = exports.default = void 0;

var _pacta = _interopRequireDefault(require("pacta"));

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/utils/QueryablePromise.js
class QueryablePromise extends _pacta.default {
  constructor(...args) {
    super(...args);
    this.internalIsPending = true;
    this.internalIsRejected = false;
    this.internalIsResolved = false;
    this.then(function (v) {
      this.internalIsFulfilled = true;
      this.internalIsPending = false;
      return v;
    }, function (e) {
      this.internalIsRejected = true;
      this.internalIsPending = false;
      throw e;
    });
  }

  isPending() {
    return this.internalIsPending;
  }

  isRejected() {
    return this.internalIsRejected;
  }

  isResolved() {
    return this.internalIsResolved;
  }

}

exports.QueryablePromise = exports.default = QueryablePromise;