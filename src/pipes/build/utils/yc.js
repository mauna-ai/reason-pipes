"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.yc = void 0;

// ./src/shared/utils/yc.js
// import { _, it } from "param.macro";
// const add2 = a => a + 2;
// const add2 = (_ + 2);
// const add = (_ + _);
// const logGaga = console.log(_.gaga)
// const logGaga = x => console.log(x.gaga)
//
// const str = x => x.toString();
// const str = it.toString();
//
// a |> it.toString() |> it.split(":") |> it.join("/");
// it.toString // <=> x => x.toString()
// const {hi} = c;
const ap = f => f(f);

const yc = (_arg) => {
  return ap(f => _arg((_arg2) => {
    return ap(f)(_arg2);
  }));
};

exports.yc = yc;
var _default = yc;
exports.default = _default;