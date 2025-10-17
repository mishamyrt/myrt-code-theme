const { writeFile, mkdir } = require("node:fs/promises");
const { existsSync } = require("node:fs");
const path = require("node:path");
const getTheme = require("./theme");

const THEME_DIR = __dirname;
const DIST_DIR = path.join(THEME_DIR, "dist");

async function build() {
  if (!existsSync(DIST_DIR)) {
    await mkdir(DIST_DIR);
  }
  const darkTheme = getTheme("dark");
  const lightTheme = getTheme("light");
  await writeFile(path.join(DIST_DIR, "myrt-dark.conf"), darkTheme);
  await writeFile(path.join(DIST_DIR, "myrt-light.conf"), lightTheme);
}

module.exports = build;
