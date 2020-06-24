"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeQueryable = exports.default = makeQueryable;

// ./src/shared/utils/QueryablePromise.js
function makeQueryable(promise) {
  // Don't modify any promise that has been already modified.
  if (promise.isResolved) return promise; // Set initial state

  let isPending = true;
  let isRejected = false;
  let isFulfilled = false; // Observe the promise, saving the fulfillment in a closure scope.

  const result = promise.then(v => {
    isFulfilled = true;
    isPending = false;
    return v;
  }, e => {
    isRejected = true;
    isPending = false;
    throw e;
  });

  result.isFulfilled = function () {
    return isFulfilled;
  };

  result.isPending = function () {
    return isPending;
  };

  result.isRejected = function () {
    return isRejected;
  };

  return result;
}