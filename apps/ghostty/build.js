const { writeFile, mkdir } = require("node:fs/promises");
const { existsSync } = require("node:fs");
const path = require("node:path");
const getTheme = require("./theme");

const THEME_DIR = __dirname;

async function build(outputDir) {
  const darkTheme = getTheme("dark");
  const lightTheme = getTheme("light");
  await writeFile(path.join(outputDir, "myrt-dark"), darkTheme);
  await writeFile(path.join(outputDir, "myrt-light"), lightTheme);
}

module.exports = build;
