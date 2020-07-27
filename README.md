<h1 align="center">Welcome to starter-template 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/starter-template" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/starter-template.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: none" src="https://img.shields.io/badge/License-none-yellow.svg" />
  </a>
</p>

> Some description

## Install

```sh
just setup
```

## Usage

```sh
just --list
```

## Run tests

```sh
just test
```

## Author

👤 **[Your Name] <you@mauna.ai>**

- Website: https://mauna.ai
- Github: [@mauna-cloud](https://github.com/mauna-cloud)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_

```re
open React;
module ConState = {/*...*/};

// Global "editable" context object.
/* ConState.write(ctx, newValue); */

let globalStreamCtx = ConState.createContext(Pipe.make(x => x));

module GlobalStreamProvider = {
  let make = ConState.provider(globalStreamCtx);
};

module Streamer = {
  [@react.component]
  let make = (~fn, ~children, ()) => {

  /**
   * component's underlying pipe
      := transform stream
      := { readable, writable }
   * parent-in === child-in
   * parent-out === child-out
   * ... apply recursively
   *
   */

  let parent = useContext(streamCtx);
  let stream = parent.value;

  /**
   * // NOTE: careful about circular updates due to global context writes.
   * switch(List.length(children)) {
     | 0 => /*
       update the global stream using Context.write,
       and mark state as done.
     */
     | otherwise => /*
       connect children together into single comp
       compose own stream with that of parent,
       and shadow parent context
     */
     }
   *
   */

    switch(List.length(children)) {
    | 0 => {
        // compose with parent and ask it to remove children
        let ownPipe = Pipe.make(fn);

        // FIXME: this is incorrect, since compose: a->b => b->c => a->c
        let composed = Pipe.compose(stream, ownPipe);
        Context.write(composed);

        <></>
      }
    | _ => {
        // FIXME: use compose to reduce: a->b => b->c => a->c
        let combined = combineChildren(children); // somehow

        <GlobalStreamProvider value={stream}>
          {combined}
        </GlobalStreamProvider>
      }
    }
  }
};

module App = {
  [@react.component]
  let make = (~input) => {
    let ctx = useContext(globalStreamCtx);
    let { writable, readable } = ctx.value;

    // Happens after the mount process is done;
    // which in this case means that global stream context has been
    // updated with the composed stream.
    //
    // So then, we can connect the input stream provided
    useEffect(
      () => {
        let newReadable = Readable.pipeThrough(input, ctx.value);

        ConState.write({
          readable: newReadable,
          writable
        });

        ();
      }
    );

    <GlobalStreamProvider value={Pipe.make(fn)}>
      {children}
    </GlobalStreamProvider>
  }
};

module Example = {
  [@react.component]
  let make = (~input) => {
    <App input=input>
      /* pipe(x => x + 20) */
      /* pipe(x => (x * 3) + 20) */
      /* pipe(x => ((x - 12) * 3) + 20) */
      /* pipe(x => ((compose(intToString, stringToInt)(x) - 12) * 3) + 20) */
      <Streamer fn={x => x + 20}>
        <Streamer fn={x => x * 3}>
          <Streamer fn={x => x - 12} />
            <Streamer fn={intToString} />
            <Streamer fn={stringToInt} />
          </Streamer>
        </Streamer>
      </Streamer>
    </App>
  };
};
```
