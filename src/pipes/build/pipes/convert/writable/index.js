"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = void 0;

var _fromNodeWritable = _interopRequireWildcard(require("./fromNodeWritable.js"));

Object.keys(_fromNodeWritable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fromNodeWritable[key];
    }
  });
});

var _fromWriter = _interopRequireWildcard(require("./fromWriter.js"));

Object.keys(_fromWriter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fromWriter[key];
    }
  });
});

var _toNodeWritable = _interopRequireWildcard(require("./toNodeWritable.js"));

Object.keys(_toNodeWritable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _toNodeWritable[key];
    }
  });
});

var _index = _interopRequireDefault(require("./index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// ./src/shared/pipes/convert/writable/index.js

/* eslint-disable */
const writable = {
  fromNodeWritable: _fromNodeWritable.default,
  fromWriter: _fromWriter.default,
  index: _index.default,
  toNodeWritable: _toNodeWritable.default
};
Object.freeze(writable);
var _default = writable;
exports.default = _default;