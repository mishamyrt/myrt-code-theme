const buildVSCode = require("./apps/vscode/build");
const buildGhostty = require("./apps/ghostty/build");

async function build() {
  await Promise.all([buildVSCode(), buildGhostty()]);
}

build();
