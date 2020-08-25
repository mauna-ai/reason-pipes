open MaunaReasonWebStreams;

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

let a = Pipe.make(x => x + 20);
let b = Pipe.make(x => x - 15);
let c = Pipe.make(x => x + 6);

// let p = Pipe.chain4(`TransformStream(t), `Pipe(a), `Pipe(b), `Pipe(c));

// let readable = Pipe.makeReadable([|2, 3, 4, 5|]);

// let transformed = readable->ReadableStream.pipeThrough(p);
// let reader = transformed->ReadableStream.getReader;

// Pipe.consume(reader)
// |> Js.Promise.then_(res => {
//      Js.log(res);
//      Js.Promise.resolve();
//    });
