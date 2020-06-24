"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tee = exports.default = tee;

var _webStreamsPolyfill = require("web-streams-polyfill");

var _predicates = require("../../utils/predicates");

var _invariant = _interopRequireDefault(require("../../utils/invariant"));

var _passthrough = _interopRequireDefault(require("../utils/passthrough"));

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/pipes/core/tee.js
const TeeStream = _flowRuntime.default.type("TeeStream", TeeStream => {
  const T = TeeStream.typeParameter("T");
  return _flowRuntime.default.union(_flowRuntime.default.ref(_webStreamsPolyfill.ReadableStream, T), _flowRuntime.default.ref(_webStreamsPolyfill.TransformStream, T, _flowRuntime.default.any()));
});

const TeeGenerator = _flowRuntime.default.type("TeeGenerator", TeeGenerator => {
  const T = TeeGenerator.typeParameter("T");
  return _flowRuntime.default.intersection(_flowRuntime.default.ref("Generator", _flowRuntime.default.ref(TeeStream, T), _flowRuntime.default.void(), _flowRuntime.default.void()), _flowRuntime.default.object(_flowRuntime.default.indexer("key", _flowRuntime.default.union(_flowRuntime.default.string(), _flowRuntime.default.number()), _flowRuntime.default.ref(TeeStream, T))));
});

function* tee(input) {
  const isPlainTransform = (0, _predicates.isTransform)(input) && !(0, _predicates.isPipe)(input);
  (0, _invariant.default)(!isPlainTransform, "Plain `TransformStream`s are not tee-able"); // $FlowFixMe

  if ((0, _predicates.isPipe)(input)) {
    // $FlowFixMe
    yield input.compose((0, _passthrough.default)()); // $FlowFixMe

    yield* tee(input);
    return;
  }

  if (input instanceof _webStreamsPolyfill.ReadableStream) {
    const readable = input;
    const [r1, r2] = readable.tee();
    yield r1; // $FlowFixMe

    yield* tee(r2);
    return;
  }

  throw new Error("Not a valid stream");
}