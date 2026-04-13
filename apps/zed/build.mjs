//@ts-check
import { writeFile, rm, mkdir, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "url";

import { getTheme } from "./theme.mjs";

const __filename = fileURLToPath(import.meta.url);
const THEME_DIR = dirname(__filename);
const MANIFEST_NAME = "extension.toml";

/**
 * Copies the theme manifest file to the output directory.
 * @param {string} outputDir
 */
async function copyManifest(outputDir) {
  await copyFile(
    join(THEME_DIR, MANIFEST_NAME),
    join(outputDir, MANIFEST_NAME),
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

  const themesDir = join(outputDir, "themes");

  await mkdir(themesDir);
  await writeFile(
    join(themesDir, "myrt-code.json"),
    JSON.stringify(themes, null, 2),
  );
}

/**
 *
 * @param {string} outputDir
 */
export default async function build(outputDir) {
  if (existsSync(outputDir)) {
    await rm(outputDir, {
      recursive: true,
    });
  }

  await mkdir(outputDir);
  await Promise.all([buildTheme(outputDir), copyManifest(outputDir)]);
}
