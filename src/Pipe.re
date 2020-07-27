type t;
[@bs.module "./pipes/build/pipes/core/pipe"]
external make: 'a => t = "default";

[@bs.send] external compose: (t, t) => 'b = "compose";
[@bs.send] external map: (t, 'a) => 'b = "map";
[@bs.send] external contramap: (t, 'a) => 'b = "contramap";
[@bs.send] external promap: (t, 'a, 'a) => 'b = "promap";

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

// Sample Code

let t =
  TransformStream.make(
    ~transformer={
      transform:
        Some(
          (x, controller) =>
            controller->TransformStream.DefaultController.enqueue(x + 10),
        ),
      start: None,
      flush: None,
    },
    (),
  );

let a = make(x => x + 20);
let b = make(x => x - 15);
let c = make(x => x + 6);

let p = chain4(`TransformStream(t), `Pipe(a), `Pipe(b), `Pipe(c));

let readable = makeReadable([|2, 3, 4, 5|]);

let transformed = readable->ReadableStream.pipeThrough(p);
let reader = transformed->ReadableStream.getReader;

consume(reader)
|> Js.Promise.then_(res => {
     Js.log(res);
     Js.Promise.resolve();
   });
