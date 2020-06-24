"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  gaga: true
};
exports.default = exports.gaga = void 0;

var _fork = _interopRequireWildcard(require("./fork.js"));

Object.keys(_fork).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fork[key];
    }
  });
});

var _merge = _interopRequireWildcard(require("./merge.js"));

Object.keys(_merge).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _merge[key];
    }
  });
});

var _zip = _interopRequireWildcard(require("./zip.js"));

Object.keys(_zip).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _zip[key];
    }
  });
});

var _index = _interopRequireDefault(require("./index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// ./src/shared/pipes/readable/index.js

/* eslint-disable */
const readable = {
  fork: _fork.default,
  index: _index.default,
  merge: _merge.default,
  zip: _zip.default
};
Object.freeze(readable);
const gaga = 1;
exports.gaga = gaga;
var _default = readable;
exports.default = _default;