open MaunaReasonWebStreams;

@bs.module("./pipes/build/pipes/core/pipe")
external make: 'a => TransformStream.t = "default";

@bs.send
external compose: (TransformStream.t, TransformStream.t) => 'b = "compose";
@bs.send external map: (TransformStream.t, 'a) => 'b = "map";
@bs.send external contramap: (TransformStream.t, 'a) => 'b = "contramap";
@bs.send external promap: (TransformStream.t, 'a, 'a) => 'b = "promap";

@bs.module("./pipes/build/pipes/core/chain") @bs.variadic
external chainPipes: array<TransformStream.t> => TransformStream.t =
  "default";

@bs.module("./pipes/build/pipes/core/chain")
external chain2: (TransformStream.t, TransformStream.t) => TransformStream.t =
  "default";

@bs.module("./pipes/build/pipes/core/chain")
external chain3:
  (TransformStream.t, TransformStream.t, TransformStream.t) =>
  TransformStream.t =
  "default";

@bs.module("./pipes/build/pipes/core/chain")
external chain4:
  (
    TransformStream.t,
    TransformStream.t,
    TransformStream.t,
    TransformStream.t
  ) =>
  TransformStream.t =
  "default";

@bs.module("./pipes/build/pipes/core/chain")
external chain5:
  (
    TransformStream.t,
    TransformStream.t,
    TransformStream.t,
    TransformStream.t,
    TransformStream.t
  ) =>
  TransformStream.t =
  "default";

@bs.module("./pipes/build/pipes/core/chain")
external chain6:
  (
    TransformStream.t,
    TransformStream.t,
    TransformStream.t,
    TransformStream.t,
    TransformStream.t,
    TransformStream.t
  ) =>
  TransformStream.t =
  "default";

@bs.module("./pipes/build/pipes/core/sequence")
external sequence: unit => TransformStream.t = "default";

@bs.module("./pipes/build/pipes/core/tee") external tee: 'a => 'b = "default";

@bs.module("./pipes/build/pipes/readable/zip")
external zip: array<ReadableStream.t> => ReadableStream.t = "default";

@bs.module("./pipes/build/pipes/readable/merge")
external merge: array<ReadableStream.t> => ReadableStream.t = "merge";

/*  UTILS */
@bs.module("./pipes/utils")
external makeReadable: array<'a> => ReadableStream.t = "makeReadable";

@bs.module("./pipes/utils")
external consume: ReadableStream.DefaultReader.t => Js.Promise.t<'a> =
  "consume";
