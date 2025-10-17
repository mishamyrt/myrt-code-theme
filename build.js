const { mkdir, rm } = require("node:fs/promises");
const { existsSync } = require("node:fs");
const path = require("node:path");

const buildVSCode = require("./apps/vscode/build");
const buildGhostty = require("./apps/ghostty/build");

const OUTPUT_DIR = path.join(__dirname, "dist");

const targets = {
  vscode: buildVSCode,
  ghostty: buildGhostty,
};

async function build() {
  if (existsSync(OUTPUT_DIR)) {
    await rm(OUTPUT_DIR, { recursive: true });
  }
  await mkdir(OUTPUT_DIR);

  const tasks = Object.entries(targets).map(async ([name, build]) => {
    const appOutputDir = path.join(OUTPUT_DIR, name);
    await mkdir(appOutputDir);
    await build(appOutputDir);
  });

  await Promise.all(tasks);

  console.log("Build complete");
  for (const name of Object.keys(targets)) {
    console.log(`- ${name}`);
  }
}

build();
