import { writeFile } from "node:fs/promises";
import path from "node:path";
import { getTheme } from "./theme.mjs";

export default async function build(outputDir) {
  const darkTheme = getTheme("dark");
  const lightTheme = getTheme("light");
  await Promise.all([
    writeFile(path.join(outputDir, "myrt-dark"), darkTheme),
    writeFile(path.join(outputDir, "myrt-light"), lightTheme),
  ]);
}
