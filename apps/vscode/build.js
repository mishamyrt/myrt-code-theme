//@ts-check
const { writeFile, readFile, mkdir, copyFile } = require("node:fs/promises");
const { existsSync } = require("node:fs");
const path = require("node:path");
const child_process = require("node:child_process");
const { promisify } = require("node:util");
const exec = promisify(child_process.exec);

const terser = require("terser");

const getTheme = require("./src/theme");

const THEME_DIR = __dirname;
const DIST_DIR = path.join(THEME_DIR, "dist");

async function buildPatcher() {
  const inputPath = path.join(THEME_DIR, "src", "settings_patcher.js");
  if (!existsSync(inputPath)) {
    throw new Error("Patcher file not found at " + inputPath);
  }

  const code = await readFile(inputPath, "utf8");
  const minified = await terser.minify(code, {
    mangle: {
      toplevel: true,
    },
  });
  if (!minified.code) {
    throw new Error("Failed to build extension");
  }
  const outputPath = path.join(DIST_DIR, "extension.js");
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
      path.join(DIST_DIR, "light.json"),
      JSON.stringify(lightTheme, null, 2)
    ),
    writeFile(
      path.join(DIST_DIR, "dark.json"),
      JSON.stringify(darkTheme, null, 2)
    ),
  ]);
}

async function copyDocs() {
  await copyFile("README.md", path.join(THEME_DIR, "README.md"));
  await copyFile("LICENSE", path.join(THEME_DIR, "LICENSE"));
}

async function buildPackage() {
  const outputPath = path.join(THEME_DIR, "dist", "myrt-vscode-theme.vsix");
  const result = await exec(
    `vsce package --allow-star-activation -o ${outputPath}`,
    {
      cwd: THEME_DIR,
    }
  );
  if (result.stderr) {
    throw new Error(result.stderr);
  }
  return outputPath;
}

async function build() {
  if (!existsSync(DIST_DIR)) {
    await mkdir(DIST_DIR);
  }

  await Promise.all([buildPatcher(), buildTheme(), copyDocs()]);
  await buildPackage();
}

module.exports = build;
