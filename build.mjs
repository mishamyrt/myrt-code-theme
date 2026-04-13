import { mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "url";

import buildVSCode from "./apps/vscode/build.mjs";
import buildGhostty from "./apps/ghostty/build.mjs";
import buildZed from "./apps/zed/build.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUTPUT_DIR = join(__dirname, "dist");

const targets = {
  vscode: buildVSCode,
  ghostty: buildGhostty,
  zed: buildZed,
};

async function build() {
  if (existsSync(OUTPUT_DIR)) {
    await rm(OUTPUT_DIR, { recursive: true });
  }
  await mkdir(OUTPUT_DIR);

  const tasks = Object.entries(targets).map(async ([name, build]) => {
    const appOutputDir = join(OUTPUT_DIR, name);
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
