"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toIntervalTree = exports.default = toIntervalTree;

var _augmentedIntervalTree = _interopRequireDefault(require("augmented-interval-tree"));

var _webStreamsPolyfill = require("../../../types/web-streams-polyfill.flow");

var _utils = require("../../../utils");

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/pipes/convert/readable/toIntervalTree.js
const Reader = _flowRuntime.default.tdz(() => _webStreamsPolyfill.ReadableStreamDefaultReader);

function toIntervalTree(reader) {
  const tree = new _augmentedIntervalTree.default();
  const [treePromise, resolve] = (0, _utils.makePromise)();

  let _resolvedType = _flowRuntime.default.boolean(),
      resolved = false;

  (async function pump() {
    const {
      value,
      done
    } = await reader.read();

    if (done) {
      return;
    }

    const low = Date.now();
    const high = Math.max(low + 1, Date.now());
    tree.insert(low, high, value);
    resolved || (resolve(tree), resolved = true);
    pump();
  })();

  return treePromise;
}