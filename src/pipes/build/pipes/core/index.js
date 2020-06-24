"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = void 0;

var _accumulate = _interopRequireWildcard(require("./accumulate.js"));

Object.keys(_accumulate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _accumulate[key];
    }
  });
});

var _chain = _interopRequireWildcard(require("./chain.js"));

Object.keys(_chain).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _chain[key];
    }
  });
});

var _connect = _interopRequireWildcard(require("./connect.js"));

Object.keys(_connect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _connect[key];
    }
  });
});

var _flatten = _interopRequireWildcard(require("./flatten.js"));

Object.keys(_flatten).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _flatten[key];
    }
  });
});

var _pipe = _interopRequireWildcard(require("./pipe.js"));

Object.keys(_pipe).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pipe[key];
    }
  });
});

var _pipeGen = _interopRequireWildcard(require("./pipeGen.js"));

Object.keys(_pipeGen).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pipeGen[key];
    }
  });
});

var _safePipe = _interopRequireWildcard(require("./safePipe.js"));

Object.keys(_safePipe).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _safePipe[key];
    }
  });
});

var _sequence = _interopRequireWildcard(require("./sequence.js"));

Object.keys(_sequence).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sequence[key];
    }
  });
});

var _tee = _interopRequireWildcard(require("./tee.js"));

Object.keys(_tee).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tee[key];
    }
  });
});

var _index = _interopRequireDefault(require("./index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// ./src/shared/pipes/core/index.js

/* eslint-disable */
const core = {
  accumulate: _accumulate.default,
  chain: _chain.default,
  connect: _connect.default,
  flatten: _flatten.default,
  index: _index.default,
  pipe: _pipe.default,
  pipeGen: _pipeGen.default,
  safePipe: _safePipe.default,
  sequence: _sequence.default,
  tee: _tee.default
};
Object.freeze(core);
var _default = core;
exports.default = _default;