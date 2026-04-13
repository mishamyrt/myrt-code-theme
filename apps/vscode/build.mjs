//@ts-check
import { execFile as execFileSync } from "node:child_process";
import { promisify } from "node:util";
import { writeFile, readFile, mkdir, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "url";
import { minify } from "terser";

const execFile = promisify(execFileSync);

import { getTheme } from "./src/theme.mjs";

const __filename = fileURLToPath(import.meta.url);
const THEME_DIR = dirname(__filename);
const DIST_DIR = join(THEME_DIR, "dist");
const PACKAGE_NAME = "myrt-vscode-theme.vsix";
const NODE_MODULES_DIR = join(THEME_DIR, "..", "..", "node_modules");

async function buildPatcher() {
  const inputPath = join(THEME_DIR, "src", "settings_patcher.js");
  if (!existsSync(inputPath)) {
    throw new Error("Patcher file not found at " + inputPath);
  }

  const code = await readFile(inputPath, "utf8");
  const minified = await minify(code, {
    mangle: {
      toplevel: true,
    },
  });
  if (!minified.code) {
    throw new Error("Failed to build extension");
  }
  const outputPath = join(DIST_DIR, "extension.js");
  await writeFile(outputPath, minified.code);
}

async function buildTheme() {
  const lightTheme = getTheme({
    style: "light",
    name: "Myrt Light",
  });
  const darkTheme = getTheme({
    style: "dark",
    name: "Myrt Dark",
  });

  await Promise.all([
    writeFile(
      join(DIST_DIR, "light.json"),
      JSON.stringify(lightTheme, null, 2),
    ),
    writeFile(join(DIST_DIR, "dark.json"), JSON.stringify(darkTheme, null, 2)),
  ]);
}

async function copyDocs() {
  await copyFile("LICENSE", join(THEME_DIR, "LICENSE"));
}

async function buildPackage() {
  const outputPath = join(THEME_DIR, "dist", PACKAGE_NAME);
  const result = await execFile(
    "vsce",
    ["package", "--allow-star-activation", "-o", outputPath],
    {
      cwd: THEME_DIR,
      env: {
        PATH: `${process.env.PATH}:${join(NODE_MODULES_DIR, ".bin")}`,
      },
    },
  );
  if (result.stderr) {
    throw new Error(result.stdout);
  }
  return outputPath;
}

/**
 * Build vscode theme package and copy it to the output directory
 * @param {string} outputDir
 */
export default async function build(outputDir) {
  if (!existsSync(DIST_DIR)) {
    await mkdir(DIST_DIR);
  }

  await Promise.all([buildPatcher(), buildTheme(), copyDocs()]);
  await buildPackage();

  await copyFile(join(DIST_DIR, PACKAGE_NAME), join(outputDir, PACKAGE_NAME));
}
