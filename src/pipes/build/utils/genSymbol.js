"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genSymbol = exports.default = genSymbol;

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/utils/genSymbol.js
const SymbolGenerator = _flowRuntime.default.type("SymbolGenerator", _flowRuntime.default.intersection(_flowRuntime.default.ref("Generator", _flowRuntime.default.symbol(), _flowRuntime.default.void(), _flowRuntime.default.void()), _flowRuntime.default.object(_flowRuntime.default.indexer("key", _flowRuntime.default.union(_flowRuntime.default.string(), _flowRuntime.default.number()), _flowRuntime.default.symbol())))); // Symbol() generating factory
// $FlowFixMe


function* genSymbol(name) {
  // Generate a new Symbol
  yield name ? Symbol.for(name) : Symbol("Generic symbol"); // Lazily recurse

  yield* genSymbol();
}