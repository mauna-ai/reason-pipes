const { default: pipe } = require('./build/pipes/core/pipe')

// const { } = require('../pipes/src-transpiled')

const a = pipe((x, b, c) => x + 10)

console.log(a);
const b = pipe(xx => x + 15)

const p = a.compose(b)

// const readable = 
