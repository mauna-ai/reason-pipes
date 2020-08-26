# ReasonPipes

<p>
  <a href="https://www.npmjs.com/package/starter-template" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/starter-template.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> MaunaReasonPipes provides utils for MaunaReasonWebStreams

## Install

```sh
npm i @mauna/reason-pipes
```

Add it to `bsconfig.json`

```diff
  "bs-dependencies": [
+   "@mauna/reason-pipes"
  ]
```

## Usage

```re
open MaunaReasonWebStreams;

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

let p = Pipe.chain4(t, a, b, c);

let readable = Pipe.makeReadable([|2, 3, 4, 5|]);

let transformed = readable->ReadableStream.pipeThrough(p);
let reader = transformed->ReadableStream.getReader;

Pipe.consume(reader)
|> Js.Promise.then_(res => {
     Js.log(res);
     Js.Promise.resolve();
   });

```

## Author

👤 **[Philip Balbas] <philip@mauna.ai>**

- Website: https://mauna.ai
- Github: [@mauna-cloud](https://github.com/mauna-cloud)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
