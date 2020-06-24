"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = void 0;

var _fromNodeDuplex = _interopRequireWildcard(require("./fromNodeDuplex.js"));

Object.keys(_fromNodeDuplex).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fromNodeDuplex[key];
    }
  });
});

var _fromReadableWritable = _interopRequireWildcard(require("./fromReadableWritable.js"));

Object.keys(_fromReadableWritable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fromReadableWritable[key];
    }
  });
});

var _index = _interopRequireDefault(require("./index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// ./src/shared/pipes/convert/index.js

/* eslint-disable */
const convert = {
  fromNodeDuplex: _fromNodeDuplex.default,
  fromReadableWritable: _fromReadableWritable.default,
  index: _index.default
};
Object.freeze(convert);
var _default = convert;
exports.default = _default;