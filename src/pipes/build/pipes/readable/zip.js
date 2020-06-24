"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zip = exports.default = zip;

var _defer2 = _interopRequireDefault(require("lodash/defer"));

var _Result2 = _interopRequireDefault(require("crocks/Result"));

var _list = _interopRequireDefault(require("@ygor/list"));

var _tryCatch = _interopRequireDefault(require("crocks/Result/tryCatch"));

var _webStreamsPolyfill = require("web-streams-polyfill");

var _pipe = _interopRequireDefault(require("../core/pipe"));

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Result = _flowRuntime.default.tdz(() => _Result2.default);

function makeZipPump(fn, streams = []) {
  const readers = streams.map(_it => {
    return _it.getReader();
  });
  const shouldRelease = Promise.race(readers.map(_it2 => {
    return _it2.closed;
  }));
  const releaseAll = (0, _tryCatch.default)((_arg) => {
    return readers.forEach(_it3 => {
      return _it3.releaseLock();
    }, _arg);
  }); // $FlowFixMe

  shouldRelease.then((_arg2) => {
    return (0, _defer2.default)(releaseAll, _arg2);
  });
  return async function pump(controller) {
    // $FlowFixMe
    const available = streams.map(_it4 => {
      return _it4._state;
    }).every(_it5 => {
      return _it5 === "readable";
    });
    if (!available) return controller.close();
    const chunks = await (0, _list.default)(readers).map(_it6 => {
      return _it6.read();
    });

    if (chunks.some(_it7 => {
      return _it7.done;
    })) {
      return controller.close();
    }

    const values = chunks.map(_it8 => {
      return _it8.value;
    });
    const result = (0, _tryCatch.default)((_arg3) => {
      return controller.enqueue(_arg3(...values));
    })(fn); // $FlowFixMe

    result.either((_arg4) => {
      return controller.error(_arg4);
    }, (_arg5) => {
      return pump(controller, _arg5);
    });
  };
}

function zip(streams, // $FlowFixMe
combine = (...args) => args) {
  const start = makeZipPump(combine, streams);
  const result = new _webStreamsPolyfill.ReadableStream({
    start
  }); // Normalize pipe behavior by piping through a passthrough

  return result.pipeThrough((0, _pipe.default)(_it9 => {
    return _it9;
  }));
}