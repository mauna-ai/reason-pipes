"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.config = void 0;
// ./src/shared/config.js
const serverUrls = {
  ace: process.env.ACE_SERVER_URL || "localhost:10000",
  dialog: process.env.DIALOG_SERVER_URL || "localhost:16000",
  prediction: process.env.PREDICTION_SERVER_URL || "localhost:14000",
  session: process.env.SESSION_SERVER_URL || "localhost:11000",
  stt: process.env.STT_SERVER_URL || "localhost:13000",
  sync: process.env.SYNC_SERVER_URL || "localhost:12000",
  voice: process.env.VOICE_SERVER_URL || "localhost:15000"
};
const grpc = {
  serverUrls
};
const config = {
  grpc
};
exports.config = config;
var _default = config;
exports.default = _default;