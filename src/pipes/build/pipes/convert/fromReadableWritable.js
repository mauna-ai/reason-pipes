"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromReadableWritable = exports.default = fromReadableWritable;

var _once2 = _interopRequireDefault(require("lodash/once"));

var _webStreamsPolyfill = require("web-streams-polyfill");

var _pipe = _interopRequireWildcard(require("../core/pipe"));

var _utils = require("../utils");

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ReadableWritable = _flowRuntime.default.tdz(() => _webStreamsPolyfill.ReadableWritable);

function fromReadableWritable(_arg) {
  let {
    readable,
    writable
  } = _arg;
  const reader = readable.getReader();
  const writer = writable.getWriter();
  const startPump = (0, _once2.default)((0, _utils.makePump)(reader)); // $FlowFixMe

  return (0, _pipe.default)((chunk, controller, isClosing) => {
    startPump(controller);
    isClosing || writer.write(chunk);
  }, {
    trailing: true
  });
}