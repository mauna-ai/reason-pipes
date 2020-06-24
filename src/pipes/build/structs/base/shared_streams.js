"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ShadowTransformStream = exports.ShadowWritableStream = exports.ShadowReadableStream = exports.Handle = void 0;

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _webStreamsPolyfill = require("web-streams-polyfill");

var _rpc = require("carlo/rpc");

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ReadableStreamDefaultReader = _flowRuntime.default.tdz(() => _webStreamsPolyfill.ReadableStreamDefaultReader);

const WritableStreamDefaultWriter = _flowRuntime.default.tdz(() => _webStreamsPolyfill.WritableStreamDefaultWriter);

const Handle = _flowRuntime.default.type("Handle", Handle => {
  const T = Handle.typeParameter("T");
  return _flowRuntime.default.ref("Promise", _flowRuntime.default.$shape(T));
});

exports.Handle = Handle;

class ShadowReadableStream extends _webStreamsPolyfill.ReadableStream {
  static getHandle(stream) {
    const reader = stream.getReader();
    const serializable = (0, _pick2.default)(reader, ["closed", "cancel", "read", "releaseLock"]);
    return _rpc.rpc.handle(serializable);
  }

  constructor(handle) {
    let reader;
    super({
      async start(controller) {
        reader = await handle;
      },

      async pull(controller) {
        const {
          done,
          value
        } = await reader.read();

        if (done) {
          return reader.releaseLock();
        }

        controller.enqueue(value);
      },

      cancel(reason) {
        return reader.cancel(reason);
      }

    });
  }

}

exports.ShadowReadableStream = ShadowReadableStream;

class ShadowWritableStream extends _webStreamsPolyfill.WritableStream {
  static getHandle(stream) {
    const writer = stream.getWriter();
    const serializable = (0, _pick2.default)(writer, ["closed", "close", "ready", "desiredSize", "write", "abort", "releaseLock"]);
    return _rpc.rpc.handle(serializable);
  }

  constructor(handle) {
    let writer;
    super({
      async start(controller) {
        writer = await handle;
        return writer.ready();
      },

      write(chunk, controller) {
        return writer.write(chunk);
      },

      close() {
        return writer.releaseLock();
      }

    });
  }

}

exports.ShadowWritableStream = ShadowWritableStream;

class ShadowTransformStream extends _webStreamsPolyfill.TransformStream {
  static getHandle(stream) {
    const {
      readable,
      writable
    } = stream;
    const reader = readable.getReader();
    const writer = writable.getWriter();
    return _rpc.rpc.handle([reader, writer].map((_arg) => {
      return _rpc.rpc.handle(_arg);
    }));
  }

  constructor(readerHandle, writerHandle) {
    const readable = new ShadowReadableStream(readerHandle);
    const writable = new ShadowWritableStream(writerHandle);
    super();
    Object.assign(this, {
      readable,
      writable
    });
  }

}

exports.ShadowTransformStream = ShadowTransformStream;
const shared = {
  ShadowReadableStream,
  ShadowTransformStream,
  ShadowWritableStream
};
var _default = shared;
exports.default = _default;