"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isntFunction = exports.isClass = exports.throwsWithoutNew = exports.isFunction = exports.isTransform = exports.isReadableWritable = exports.isPipe = exports.isTransformInstance = exports.isWritable = exports.isReadable = exports.flip = exports.not = exports.or = exports.and = void 0;

var _implies = _interopRequireDefault(require("crocks/logic/implies"));

var _webStreamsPolyfill = require("web-streams-polyfill");

var _pipe = require("../pipes/core/pipe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/utils/predicates.js
const and = (f, g) => a => f(a) && g(a);

exports.and = and;

const or = (f, g) => a => f(a) || g(a);

exports.or = or;

const not = f => a => !f(a);

exports.not = not;

const flip = _it => {
  return _it ^ true;
};

exports.flip = flip;

const isReadable = _it2 => {
  return _it2 instanceof _webStreamsPolyfill.ReadableStream;
};

exports.isReadable = isReadable;

const isWritable = _it3 => {
  return _it3 instanceof _webStreamsPolyfill.WritableStream;
};

exports.isWritable = isWritable;

const isTransformInstance = _it4 => {
  return _it4 instanceof _webStreamsPolyfill.TransformStream;
};

exports.isTransformInstance = isTransformInstance;

const isPipe = _it5 => {
  return _it5 instanceof _pipe.Pipe;
};

exports.isPipe = isPipe;
const isReadableWritable = and((_arg) => {
  return isReadable(_arg.readable);
}, (_arg2) => {
  return isWritable(_arg2.writable);
});
exports.isReadableWritable = isReadableWritable;
const isTransform = or(isTransformInstance, isReadableWritable);
exports.isTransform = isTransform;

const isFunction = f => typeof f === "function";

exports.isFunction = isFunction;

const throwsWithoutNew = C => {
  try {
    C();
    return false;
  } catch (e) {
    return e instanceof TypeError ? true : false;
  }
};

exports.throwsWithoutNew = throwsWithoutNew;
const isClass = (0, _implies.default)(isFunction, throwsWithoutNew);
exports.isClass = isClass;
const isntFunction = not(isFunction);
exports.isntFunction = isntFunction;