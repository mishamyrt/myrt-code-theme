#!/usr/bin/env node
// Extract release notes from CHANGELOG.md for the given tag
// and write them to file.
// Usage: node extract-release-notes.js <tag>
// Example: node extract-release-notes.js v1.0.0
// @ts-check

import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { argv } from 'process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(dirname(__filename), '../');
const CHANGELOG = join(__dirname, 'CHANGELOG.md');

/**
 * Extract release notes from release notes content for the given tag
 * @param {string} tag
 * @param {string} content
 * @returns {string}
 */
function extractNotes(tag, content) {
  const targetPrefix = `## [${tag}]`;
  const lines = content.split('\n');

  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    if (l.startsWith(targetPrefix)) {
      start = i+1;
      break;
    }
  }
  if (start === -1) {
    throw new Error(`No release notes found for tag ${tag}`);
  }

  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (lines[i].trim().startsWith('## ')) {
      end = i;
      break;
    }
  }

  const body = lines.slice(start, end).join('\n').trim();
  return body;
}

/**
 * Trims "v" prefix from tag name
 *
 * @param {string} tag
 * @returns {string}
 */
function trimTag(tag) {
  if (tag.startsWith('v')) {
    return tag.slice(1);
  }
  return tag;
}

async function main() {
  if (argv.length < 3) {
    console.error('Usage: node extract-release-notes.js <tag>');
    process.exit(1);
  }
  const tag = trimTag(argv[2]);
  const content = await readFile(CHANGELOG, 'utf8');
  try {
    const body = extractNotes(tag, content);
    console.log(body);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main()
