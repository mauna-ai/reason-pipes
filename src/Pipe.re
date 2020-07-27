open MaunaReasonWebStreams;

type t = {
  readable: ReadableStream.t,
  writable: WritableStream.t,
};
[@bs.module "./pipes/build/pipes/core/pipe"]
external make: 'a => t = "default";

[@bs.send] external compose: (t, t) => 'b = "compose";
[@bs.send] external map: (t, 'a) => 'b = "map";
[@bs.send] external contramap: (t, 'a) => 'b = "contramap";
[@bs.send] external promap: (t, 'a, 'a) => 'b = "promap";

[@bs.module "./pipes/build/pipes/core/chain"] [@bs.variadic]
external chainPipes: array(t) => t = "default";

[@bs.module "./pipes/build/pipes/core/chain"]
external chain2:
  (
    [@bs.unwrap] [ | `Pipe(t) | `TransformStream(TransformStream.t)],
    [@bs.unwrap] [ | `Pipe(t) | `TransformStream(TransformStream.t)]
  ) =>
  t =
  "default";

[@bs.module "./pipes/build/pipes/core/chain"]
external chain3:
  (
    [@bs.unwrap] [ | `Pipe(t) | `TransformStream(TransformStream.t)],
    [@bs.unwrap] [ | `Pipe(t) | `TransformStream(TransformStream.t)],
    [@bs.unwrap] [ | `Pipe(t) | `TransformStream(TransformStream.t)]
  ) =>
  t =
  "default";

[@bs.module "./pipes/build/pipes/core/chain"]
external chain4:
  (
    [@bs.unwrap] [ | `Pipe(t) | `TransformStream(TransformStream.t)],
    [@bs.unwrap] [ | `Pipe(t) | `TransformStream(TransformStream.t)],
    [@bs.unwrap] [ | `Pipe(t) | `TransformStream(TransformStream.t)],
    [@bs.unwrap] [ | `Pipe(t) | `TransformStream(TransformStream.t)]
  ) =>
  t =
  "default";

[@bs.module "./pipes/build/pipes/core/chain"]
external chain5:
  (
    [@bs.unwrap] [ | `Pipe(t) | `TransformStream(TransformStream.t)],
    [@bs.unwrap] [ | `Pipe(t) | `TransformStream(TransformStream.t)],
    [@bs.unwrap] [ | `Pipe(t) | `TransformStream(TransformStream.t)],
    [@bs.unwrap] [ | `Pipe(t) | `TransformStream(TransformStream.t)],
    [@bs.unwrap] [ | `Pipe(t) | `TransformStream(TransformStream.t)]
  ) =>
  t =
  "default";

[@bs.module "./pipes/build/pipes/core/chain"]
external chain6:
  (
    [@bs.unwrap] [ | `Pipe(t) | `TransformStream(TransformStream.t)],
    [@bs.unwrap] [ | `Pipe(t) | `TransformStream(TransformStream.t)],
    [@bs.unwrap] [ | `Pipe(t) | `TransformStream(TransformStream.t)],
    [@bs.unwrap] [ | `Pipe(t) | `TransformStream(TransformStream.t)],
    [@bs.unwrap] [ | `Pipe(t) | `TransformStream(TransformStream.t)],
    [@bs.unwrap] [ | `Pipe(t) | `TransformStream(TransformStream.t)]
  ) =>
  t =
  "default";

[@bs.module "./pipes/build/pipes/core/sequence"]
external sequence: unit => t = "default";

[@bs.module "./pipes/build/pipes/core/tee"] external tee: 'a => 'b = "default";

[@bs.module "./pipes/build/pipes/readable/zip"]
external zip: array(ReadableStream.t) => ReadableStream.t = "default";

[@bs.module "./pipes/build/pipes/readable/merge"]
external merge: array(ReadableStream.t) => ReadableStream.t = "merge";

/*  UTILS */
[@bs.module "./pipes/utils"]
external makeReadable: array('a) => ReadableStream.t = "makeReadable";

[@bs.module "./pipes/utils"]
external consume: ReadableStream.DefaultReader.t => Js.Promise.t('a) =
  "consume";
