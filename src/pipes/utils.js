const { _, it } = require("param.macro");
const { ReadableStream, WritableStream } = require("web-streams-polyfill");

const throwIfNotTrue = t => {
  if (!t) throw new Error();
};

const makeEagerReadable = arr => {
  return new ReadableStream({
    start(controller) {
      arr.map(controller.enqueue(_));
      controller.close();

      return Promise.resolve(null);
    }
  });
};

const makeReadable = origArr => {
  let current;
  const arr = [...origArr];

  const end = {};
  arr.push(end);

  return new ReadableStream({
    pull(controller) {
      const c = arr.shift();
      current = c;
      return current === end ? controller.close() : controller.enqueue(c);
    }
  });
};

const makeWritable = arr =>
  new WritableStream({
    write(chunk) {
      arr.push(chunk);
    }
  });

const consume = async (reader, result = []) => {
  let finished = false;

  while (!finished) {
    const { done, value } = await reader.read();
    if ((finished = done)) {
      break;
    }
    result.push(value);
  }

  return result;
};

module.exports = {
  makeReadable, makeWritable, consume
}
