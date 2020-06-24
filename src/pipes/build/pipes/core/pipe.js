"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pipe = exports.default = pipe;
exports.Pipe = exports.PipeOpts = exports.Chunk = exports.EOS = void 0;

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _webStreamsPolyfill = require("web-streams-polyfill");

var _polytype = require("polytype");

var _defaultProps = _interopRequireDefault(require("crocks/helpers/defaultProps"));

var _Pair = _interopRequireDefault(require("crocks/Pair"));

var _crocks = require("../../structs/base/crocks");

var _makePromise = _interopRequireDefault(require("../../utils/makePromise"));

var _PatchCrock = _interopRequireDefault(require("../../utils/PatchCrock"));

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// $FlowFixMe
const Controller = _flowRuntime.default.tdz(() => _webStreamsPolyfill.Controller);

const QueuingStrategy = _flowRuntime.default.tdz(() => _webStreamsPolyfill.QueuingStrategy);

const Transformer = _flowRuntime.default.tdz(() => _webStreamsPolyfill.Transformer);

// Declare useful symbols
const NONE = Symbol("No initial value"); // EOS is the stream analog for EOF, if a readable or transform stream
// produces EOS as a chunk, the `pipe`s downstream are closed off.

const EOS = Symbol("End of Stream");
exports.EOS = EOS;

const Chunk = _flowRuntime.default.type("Chunk", Chunk => {
  const A = Chunk.typeParameter("A");
  return _flowRuntime.default.union(A, _flowRuntime.default.typeOf(EOS), _flowRuntime.default.typeOf(NONE));
});

exports.Chunk = Chunk;

const PipeOpts = _flowRuntime.default.type("PipeOpts", PipeOpts => {
  const A = PipeOpts.typeParameter("A");
  return _flowRuntime.default.exactObject(_flowRuntime.default.property("init", _flowRuntime.default.ref(Chunk, A), true), _flowRuntime.default.property("readableStrategy", _flowRuntime.default.ref(QueuingStrategy), true), _flowRuntime.default.property("writableStrategy", _flowRuntime.default.ref(QueuingStrategy), true), _flowRuntime.default.property("trailing", _flowRuntime.default.boolean(), true));
});

exports.PipeOpts = PipeOpts;
const PIPE_DEFAULTS = Object.freeze({
  init: NONE,
  readableStrategy: {},
  writableStrategy: {},
  trailing: false
});
const PatchedArrow = (0, _PatchCrock.default)(_crocks.Arrow); // Pipe class, it's a transform stream on steroids but more importantly
// it's also an arrow, which means that instances can be composed together
// using arrow operations and laws before connecting to any streams.

class Pipe extends (0, _polytype.classes)(_webStreamsPolyfill.TransformStream, PatchedArrow) {
  /* Pipe :: <Controller c, Pair p>   Arrow (p c a) (p c b) */

  /* Pipe :: <Controller c>           TransformStream a b { (c, a) -> b } */

  /*
  		Pair :: c -> a -> p c a
   */

  /*
  	 <Pair m>
  		tFn :: p c a -> p c b
  		= (p c a).extend(p c a -> b)
  		= (p c a).extend((p c a).merge((c, a) -> b))
  		= m => m.extend(m.merge(flip(fn)))
   */
  constructor(fn, pipeOpts = {}) {
    const {
      init,
      readableStrategy,
      writableStrategy,
      trailing
    } = (0, _defaultProps.default)(PIPE_DEFAULTS, pipeOpts);
    const adjustedInit = typeof init === "undefined" ? NONE : init;
    const [streamFinishPromise, resolveStreamFinish] = (0, _makePromise.default)();
    const [selfP, resolveSelf] = (0, _makePromise.default)(); // Lift-ed input function that takes pairs and returns pairs
    // (A -> Controller -> B) ==> (Pair C A -> Pair C B)

    const transformFn = _it2 => {
      return _it2.extend(_it2 => {
        return _it2.merge((a, b) => fn(b, a));
      });
    }; // `Transformer.transform` implementation


    const transform = async (chunk, controller) => {
      // Short circuit on EOS
      if (chunk === EOS) {
        controller.terminate();
        return;
      } // Run transform function through underlying arrow
      // Pair Controller Chunk<A> -> Pair Controller Chunk<B>
      // $FlowFixMe


      const transformedPair = this.runWith((0, _Pair.default)(controller, chunk)); // Extract transformed value
      // Pair C B -> B

      const transformed = transformedPair.snd(); // Enqueue result

      if (!(0, _isUndefined2.default)(transformed)) {
        controller.enqueue(transformed);
      } // If return value is a promise, make sure it is fulfilled before closing


      await Promise.resolve(transformed);
    }; // start() is called when the stream is started


    const start = async controller => {
      return (await selfP).controller = controller, adjustedInit !== NONE ? transform(adjustedInit, controller) : undefined;
    }; // flush() is called when stream is closing


    const flush = controller => {
      if (trailing) {
        const isClosing = true;
        fn(undefined, controller, isClosing);
      }

      resolveStreamFinish();
    }; // Prepare transformer


    const transformer = {
      start,
      transform,
      flush
    }; // Initialize arrow and transform stream
    // ([...argsForClassA], [...argsForClassB]) etc

    super([transformer, readableStrategy, writableStrategy], [null, transformFn]); // Set properties

    this.init = void 0;
    this.done = void 0;
    this.fn = void 0;
    this.trailing = void 0;
    this.controller = void 0;
    this.init = adjustedInit;
    this.done = streamFinishPromise;
    this.fn = fn;
    this.trailing = !!trailing;
    resolveSelf(this); // Arrow compose behaves incorrectly with polytype
    // https://github.com/evilsoft/crocks/issues/406
    // FIXME: Remove the following monkey-patches once library gets a fix

    const arrowId = this.id.bind(this);

    this.constructor.id = () => {
      const {
        runWith
      } = arrowId(); // eslint-disable-next-line no-use-before-define

      const idPipe = pipe(_it3 => {
        return _it3;
      });
      return Object.assign(idPipe, {
        runWith
      });
    };

    const arrowMap = this.map.bind(this);

    this.map = f => {
      const func = _it4 => {
        return _it4.map(f);
      };

      const {
        runWith
      } = arrowMap(func); // eslint-disable-next-line no-use-before-define

      const idPipe = pipe(_it5 => {
        return _it5;
      });
      return Object.assign(idPipe, {
        runWith
      });
    };

    const arrowContramap = this.contramap.bind(this);

    this.contramap = f => {
      const func = _it6 => {
        return _it6.map(f);
      };

      const mapped = arrowContramap(func); // eslint-disable-next-line no-use-before-define

      return pipe(x => mapped.runWith((0, _Pair.default)(null, x)).snd());
    };

    this.promap = (f, g = _it7 => {
      return _it7;
    }) => {
      const mapped = this.map(g); // eslint-disable-next-line no-use-before-define

      return pipe(x => mapped.runWith((0, _Pair.default)(null, f(x))).snd());
    };

    this.compose = pipe2 => {
      const func = (chunk, controller, isClosing) => {
        const inFn = this.fn;
        const outFn = pipe2.fn;

        if (isClosing) {
          pipe2.trailing && outFn(undefined, controller, true);
          this.trailing && inFn(undefined, controller, true);
          return;
        }

        const next = this.fn(chunk, controller);

        if ((0, _isUndefined2.default)(next)) {
          return;
        }

        return pipe2.fn(next, controller);
      };

      return pipe(func);
    };
  }

} // Helper for creating instances of `Pipe` class


exports.Pipe = Pipe;

function pipe(fn, pipeOpts = {}) {
  // Create instance of Pipe
  return new Pipe(fn, pipeOpts);
}