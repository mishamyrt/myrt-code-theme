//@ts-check
const { writeFile, rm, mkdir, copyFile } = require("node:fs/promises");
const { existsSync } = require("node:fs");
const path = require("node:path");

const getTheme = require("./src/theme");

const THEME_DIR = __dirname;
const MANIFEST_NAME = "extension.toml";

/**
 * Copies the theme manifest file to the output directory.
 * @param {string} outputDir
 */
async function copyManifest(outputDir) {
  await copyFile(
    path.join(THEME_DIR, MANIFEST_NAME),
    path.join(outputDir, MANIFEST_NAME),
  );
}

/**
 * Generates and writes Zed theme files to the output directory.
 * @param {string} outputDir
 */
async function buildTheme(outputDir) {
  const lightTheme = getTheme({
    style: "light",
    name: "Myrt Light",
  });
  const darkTheme = getTheme({
    style: "dark",
    name: "Myrt Dark",
  });

  const themes = {
    $schema: "https://zed.dev/schema/themes/v0.2.0.json",
    name: "Myrt Code Theme",
    author: "Mikhael Khrustik <misha@myrt.co>",
    themes: [darkTheme, lightTheme],
  };

  const themesDir = path.join(outputDir, "themes");

  await mkdir(themesDir);
  await writeFile(
    path.join(themesDir, "myrt-code.json"),
    JSON.stringify(themes, null, 2),
  );
}

/**
 *
 * @param {string} outputDir
 */
async function build(outputDir) {
  if (existsSync(outputDir)) {
    await rm(outputDir, {
      recursive: true,
    });
  }

  await mkdir(outputDir);
  await Promise.all([buildTheme(outputDir), copyManifest(outputDir)]);
}

module.exports = build;
