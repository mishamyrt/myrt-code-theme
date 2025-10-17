#!/usr/bin/env bash
set -euo pipefail

REPO="${GITHUB_REPO:-mishamyrt/myrt-code-theme}"
THEMES_DIR="${HOME}/.config/ghostty/themes"
OS="$(uname -s)"
if [[ "$OS" == "Darwin" ]]; then
  CONFIG_PATH="${HOME}/Library/Application Support/com.mitchellh.ghostty/config"
else
  CONFIG_PATH="${HOME}/.config/ghostty/config"
fi

command -v curl >/dev/null 2>&1 || { echo "curl is required" >&2; exit 1; }
command -v unzip >/dev/null 2>&1 || { echo "unzip is required" >&2; exit 1; }

# Determine latest tag (robust): try final effective URL, then GitHub API
LATEST_URL=$(curl -fsSIL -o /dev/null -w '%{url_effective}' -L "https://github.com/${REPO}/releases/latest" || true)
if [[ -n "$LATEST_URL" && "$LATEST_URL" != *"/releases/latest"* ]]; then
  TAG_NAME="${LATEST_URL##*/}"
else
  TAG_NAME=$(curl -fsSL "https://api.github.com/repos/${REPO}/releases/latest" \
    | grep -oE '"tag_name"\s*:\s*"[^"]+"' \
    | sed -E 's/.*"tag_name"\s*:\s*"([^"]+)".*/\1/' || true)
fi

if [[ -z "${TAG_NAME:-}" ]]; then
  echo "Failed to determine latest release" >&2; exit 1
fi
# e.g., v1.2.3
ASSET_NAME="dist-ghostty-${TAG_NAME}.zip"
DOWNLOAD_URL="https://github.com/${REPO}/releases/download/${TAG_NAME}/${ASSET_NAME}"

TMPDIR=$(mktemp -d)
trap 'rm -rf "$TMPDIR"' EXIT

echo "Downloading ${ASSET_NAME} from ${REPO} (${TAG_NAME})..."
curl -fL "$DOWNLOAD_URL" -o "$TMPDIR/ghostty.zip"

mkdir -p "$THEMES_DIR"
# Extract files (flatten)
unzip -o -j "$TMPDIR/ghostty.zip" -d "$THEMES_DIR"

echo "Installed theme files into: $THEMES_DIR"

TARGET_LINE='theme = dark:myrt-dark,light:myrt-light'
CURRENT_LINE=""
APPLIED=false
if [[ -f "$CONFIG_PATH" ]]; then
  CURRENT_LINE=$(grep -E '^[[:space:]]*theme[[:space:]]*=' "$CONFIG_PATH" | head -n1 || true)
fi

normalize() {
  printf '%s' "$1" | tr -d '[:space:]'
}

if [[ -n "$CURRENT_LINE" ]] && [[ "$(normalize "$CURRENT_LINE")" == "$(normalize "$TARGET_LINE")" ]]; then
  echo "Ghostty config already uses Myrt theme; no changes needed."
else
  if [[ -n "$CURRENT_LINE" ]]; then
    echo "Current Ghostty theme line: $CURRENT_LINE"
    read -r -p "Replace it with Myrt theme? [y/N] " yn
  else
    read -r -p "Add Myrt theme to Ghostty config at \"$CONFIG_PATH\"? [y/N] " yn
  fi

  if [[ "$yn" =~ ^[Yy]$ ]]; then
    mkdir -p "$(dirname "$CONFIG_PATH")"
    touch "$CONFIG_PATH"
    if [[ -n "$CURRENT_LINE" ]]; then
      if [[ "$OS" == "Darwin" ]]; then
        sed -i '' -E "s/^[[:space:]]*theme[[:space:]]*=.*$/${TARGET_LINE//\//\\/}/" "$CONFIG_PATH"
      else
        sed -i -E "s/^[[:space:]]*theme[[:space:]]*=.*$/${TARGET_LINE//\//\\/}/" "$CONFIG_PATH"
      fi
    else
      printf '%s\n' "$TARGET_LINE" >> "$CONFIG_PATH"
    fi
    echo "Updated $CONFIG_PATH"
    APPLIED=true
  else
    echo "Skipped modifying Ghostty config."
  fi
fi

if [[ "$APPLIED" == true ]]; then
  echo "Done. Ghostty is set to: $TARGET_LINE"
else
  echo "Done. You can switch manually by adding"
  echo "$TARGET_LINE"
fi


