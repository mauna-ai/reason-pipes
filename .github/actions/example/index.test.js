const assert = require("assert");
const core = require("@actions/core");

describe("example action", () => {
  // Load up our entrypoint file
  require(".");

  beforeEach(() => {
    // Mock methods
  });

  it("runs successfully", () => {
    const something = true;

    expect(something).toBe(true);
  });
});
