open MaunaReasonWebStreams;

let createWritable = func => {
  WritableStream.make(
    ~underlyingSink={
      start: None,
      write: Some((chunk, _) => Js.Promise.resolve(func(chunk))),
      close: None,
      abort: None,
      type_: None,
    },
    (),
  );
};

type write = string => Js.Promise.t(unit);
let useWritable = (writable: WritableStream.t) => {
  let writer = writable->WritableStream.getWriter;

  let close = writer->WritableStream.DefaultWriter.close;
  let write: write = writer->WritableStream.DefaultWriter.write;
  let releaseLock = writer->WritableStream.DefaultWriter.releaseLock;

  React.useEffect0(() => {Some(releaseLock)});

  (write, close);
};
