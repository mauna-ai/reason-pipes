const assert = require("assert");
const core = require("@actions/core");

try {
  // Do stuff
  assert(1 === 1);
  core.debug("Math still works fine");
} catch (err) {
  // setFailed logs the message and sets a failing exit code
  core.setFailed(`Shit. ${err}`);
}
