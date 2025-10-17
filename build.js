const buildVSCode = require("./apps/vscode/build");

async function build() {
    await buildVSCode();
}

build();
