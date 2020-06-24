"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Session = exports.AppInstance = exports.Container = exports.Transducer = exports.Output = exports.Input = exports.ComputedSpeechVal = exports.SpeechVal = exports.Speech = exports.SpeechAudio = exports.ComputedVal = exports.Val = exports.SentenceTag = exports.Sentence = exports.Character = exports.Scenario = exports.Dependency = exports.Context = exports.Machine = exports.ContextStore = exports.StateTree = exports.History = exports.Turn = exports.Event = exports.BoundSlot = exports.Slot = void 0;

var _baobab = _interopRequireDefault(require("baobab"));

var _blob = _interopRequireDefault(require("blob"));

var _react = require("react");

var _webStreamsPolyfill = require("web-streams-polyfill");

var qim = _interopRequireWildcard(require("qim"));

var _pipes = require("../pipes");

var _crocks = require("../structs/base/crocks");

var _misc = require("./misc");

var _xstateFsm = require("./xstate-fsm.flow");

var _flowRuntime = _interopRequireDefault(require("flow-runtime"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./src/shared/types/index.js
const EventObject = _flowRuntime.default.tdz(() => _xstateFsm.EventObject);

const FSM = _flowRuntime.default.tdz(() => _xstateFsm.FSM);

const FSMState = _flowRuntime.default.tdz(() => _xstateFsm.FSM$State);

const Stack = _flowRuntime.default.tdz(() => _misc.Stack);

const AsyncP = _flowRuntime.default.tdz(() => _crocks.AsyncP);

const Reader = _flowRuntime.default.tdz(() => _crocks.Reader);

const State = _flowRuntime.default.tdz(() => _crocks.State);

const Pipe = _flowRuntime.default.tdz(() => _pipes.Pipe);

const ReadableStream = _flowRuntime.default.tdz(() => _webStreamsPolyfill.ReadableStream);

const PureComponent = _flowRuntime.default.tdz(() => _react.PureComponent);

const Blob = _flowRuntime.default.tdz(() => _blob.default);

const Baobab = _flowRuntime.default.tdz(() => _baobab.default);

const Slot = _flowRuntime.default.type("Slot", _flowRuntime.default.object(_flowRuntime.default.property("kind", _flowRuntime.default.Class(_flowRuntime.default.ref("OntologyConcept"))), _flowRuntime.default.property("location", _flowRuntime.default.ref("Cursor"))));

exports.Slot = Slot;

const BoundSlot = _flowRuntime.default.type("BoundSlot", _flowRuntime.default.intersection(Slot, _flowRuntime.default.object(_flowRuntime.default.property("value", _flowRuntime.default.ref("OntologyConcept")))));
/* Event */


exports.BoundSlot = BoundSlot;

const Event = _flowRuntime.default.type("Event", _flowRuntime.default.intersection(_flowRuntime.default.ref(EventObject), _flowRuntime.default.object(_flowRuntime.default.property("key", _flowRuntime.default.ref("EventSymbol")))));
/* Turn */


exports.Event = Event;

const Turn = _flowRuntime.default.type("Turn", _flowRuntime.default.exactObject(_flowRuntime.default.property("cursor", _flowRuntime.default.ref("Cursor")), _flowRuntime.default.property("event", Event), _flowRuntime.default.property("value", _flowRuntime.default.any())));
/* History */


exports.Turn = Turn;

const History = _flowRuntime.default.type("History", _flowRuntime.default.ref(Stack, Turn));
/* StateTree */


exports.History = History;

const StateTree = _flowRuntime.default.type("StateTree", _flowRuntime.default.ref(Baobab));
/* ContextStore */


exports.StateTree = StateTree;

const ContextStore = _flowRuntime.default.type("ContextStore", _flowRuntime.default.object(_flowRuntime.default.property("bound", _flowRuntime.default.array(BoundSlot)), _flowRuntime.default.property("state", StateTree), _flowRuntime.default.property("current", _flowRuntime.default.ref("Cursor"))));
/* Machine */


exports.ContextStore = ContextStore;

const Machine = _flowRuntime.default.type("Machine", _flowRuntime.default.ref(FSM, ContextStore, Event));
/* Context */


exports.Machine = Machine;

const Context = _flowRuntime.default.type("Context", _flowRuntime.default.ref(State, Machine, History));
/* Dependency */


exports.Context = Context;

const Dependency = _flowRuntime.default.type("Dependency", Dependency => {
  const T = Dependency.typeParameter("T");
  return _flowRuntime.default.ref(AsyncP, T);
});
/* Scenario */


exports.Dependency = Dependency;

const Scenario = _flowRuntime.default.type("Scenario", _flowRuntime.default.intersection(_flowRuntime.default.ref(FSMState, ContextStore, Event), _flowRuntime.default.object(_flowRuntime.default.property("cursor", _flowRuntime.default.ref("Cursor"), true))));
/* Character */


exports.Scenario = Scenario;

const Character = _flowRuntime.default.type("Character", _flowRuntime.default.object());
/* Sentence */
// For storing controlled language sentences


exports.Character = Character;

const Sentence = _flowRuntime.default.type("Sentence", Sentence => {
  const L = Sentence.typeParameter("L");
  return _flowRuntime.default.object(_flowRuntime.default.property("language", L), _flowRuntime.default.property("character", Character), _flowRuntime.default.property("parenthetical", _flowRuntime.default.object(_flowRuntime.default.indexer("key", _flowRuntime.default.string(), _flowRuntime.default.any()))), _flowRuntime.default.property("resolved", _flowRuntime.default.ref(AsyncP, _flowRuntime.default.void())), _flowRuntime.default.property("dependencies", _flowRuntime.default.array(_flowRuntime.default.ref(AsyncP, BoundSlot))), _flowRuntime.default.property("kind", _flowRuntime.default.string()), _flowRuntime.default.property("toString", _flowRuntime.default.function(_flowRuntime.default.return(_flowRuntime.default.string()))), _flowRuntime.default.property("toControlledString", _flowRuntime.default.function(_flowRuntime.default.return(_flowRuntime.default.ref("controlled")))));
});

exports.Sentence = Sentence;

const SentenceTag = _flowRuntime.default.type("SentenceTag", SentenceTag => {
  const L = SentenceTag.typeParameter("L");
  return _flowRuntime.default.function(_flowRuntime.default.param("_arg0", _flowRuntime.default.array(_flowRuntime.default.string())), _flowRuntime.default.rest("_argrest", _flowRuntime.default.array(L)), _flowRuntime.default.return(_flowRuntime.default.ref(Sentence, L)));
});
/* Value types */


exports.SentenceTag = SentenceTag;

const Val = _flowRuntime.default.type("Val", Val => {
  const T = Val.typeParameter("T");
  return _flowRuntime.default.object(_flowRuntime.default.property("constructor", _flowRuntime.default.function(_flowRuntime.default.param("_arg0", T), _flowRuntime.default.return(_flowRuntime.default.void()))), _flowRuntime.default.property("get", _flowRuntime.default.function(_flowRuntime.default.return(T))));
});

exports.Val = Val;

const ComputedVal = _flowRuntime.default.type("ComputedVal", ComputedVal => {
  const T = ComputedVal.typeParameter("T");
  return _flowRuntime.default.ref(Reader, Context, _flowRuntime.default.ref(AsyncP, T));
});
/* Speech types */


exports.ComputedVal = ComputedVal;

const SpeechAudio = _flowRuntime.default.type("SpeechAudio", _flowRuntime.default.union(_flowRuntime.default.ref(Blob), _flowRuntime.default.ref("ArrayBuffer")));

exports.SpeechAudio = SpeechAudio;

const Speech = _flowRuntime.default.type("Speech", _flowRuntime.default.object(_flowRuntime.default.property("audio", _flowRuntime.default.exactObject(_flowRuntime.default.property("start", _flowRuntime.default.number()), _flowRuntime.default.property("end", _flowRuntime.default.number()), _flowRuntime.default.property("data", SpeechAudio))), _flowRuntime.default.property("transcript", _flowRuntime.default.string())));

exports.Speech = Speech;

const SpeechVal = _flowRuntime.default.type("SpeechVal", _flowRuntime.default.ref(Val, Speech));

exports.SpeechVal = SpeechVal;

const ComputedSpeechVal = _flowRuntime.default.type("ComputedSpeechVal", _flowRuntime.default.ref(ComputedVal, Speech));
/* Stream types */


exports.ComputedSpeechVal = ComputedSpeechVal;

const Input = _flowRuntime.default.type("Input", _flowRuntime.default.ref(ReadableStream, SpeechVal));

exports.Input = Input;

const Output = _flowRuntime.default.type("Output", _flowRuntime.default.ref(ReadableStream, ComputedSpeechVal));
/* Transducer */


exports.Output = Output;

const Transducer = _flowRuntime.default.type("Transducer", Transducer => {
  const A = Transducer.typeParameter("A"),
        B = Transducer.typeParameter("B");
  return _flowRuntime.default.ref(Pipe, _flowRuntime.default.ref(Val, A), _flowRuntime.default.ref(ComputedVal, B));
});
/* Container */


exports.Transducer = Transducer;

const Container = _flowRuntime.default.type("Container", Container => {
  const A = Container.typeParameter("A"),
        B = Container.typeParameter("B"),
        ST = Container.typeParameter("ST");
  return _flowRuntime.default.ref(PureComponent, _flowRuntime.default.object(_flowRuntime.default.property("$$", _flowRuntime.default.ref(Transducer, A, B)), _flowRuntime.default.property("name", _flowRuntime.default.string())), ST);
});
/* AppInstance */


exports.Container = Container;

const AppInstance = _flowRuntime.default.type("AppInstance", _flowRuntime.default.object(_flowRuntime.default.property("container", _flowRuntime.default.ref(Container, Input, Output, Context)), _flowRuntime.default.property("transducer", _flowRuntime.default.ref(Transducer, Input, Output))));
/* Session */


exports.AppInstance = AppInstance;

const Session = _flowRuntime.default.type("Session", _flowRuntime.default.object(_flowRuntime.default.property("machine", Machine), _flowRuntime.default.property("context", Context), _flowRuntime.default.property("app", AppInstance), _flowRuntime.default.property("in", Input), _flowRuntime.default.property("out", Output))); // <App> // Component<node: Node, {}>
//   <Scenario> // Inp -> Out
//     <STT> </STT> // Inp -> $<Text>
//     <Dialog> // $<Text> -> $<Text>
//       <A.says> </A.says>
//       <B.says> </B.says>
//     </Dialog>
//     <TTS> </TTS> // $<Text> -> Out
//   </Scenario>
// </App>


exports.Session = Session;