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

# Determine latest tag by following redirect
LATEST_REDIRECT=$(curl -fsSL -o /dev/null -w '%{redirect_url}' "https://github.com/${REPO}/releases/latest")
if [[ -z "$LATEST_REDIRECT" ]]; then
  echo "Failed to determine latest release" >&2; exit 1
fi
TAG_NAME="${LATEST_REDIRECT##*/}"    # e.g., v1.2.3
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

read -r -p "Patch Ghostty config at \"$CONFIG_PATH\" to activate theme? [y/N] " yn
if [[ "$yn" =~ ^[Yy]$ ]]; then
  mkdir -p "$(dirname "$CONFIG_PATH")"
  touch "$CONFIG_PATH"
  LINE='theme = dark:myrt-dark,light:myrt-light'
  if grep -qE '^[[:space:]]*theme[[:space:]]*=' "$CONFIG_PATH"; then
    if [[ "$OS" == "Darwin" ]]; then
      sed -i '' -E "s/^[[:space:]]*theme[[:space:]]*=.*$/${LINE//\//\\/}/" "$CONFIG_PATH"
    else
      sed -i -E "s/^[[:space:]]*theme[[:space:]]*=.*$/${LINE//\//\\/}/" "$CONFIG_PATH"
    fi
  else
    printf '%s\n' "$LINE" >> "$CONFIG_PATH"
  fi
  echo "Updated $CONFIG_PATH"
fi

echo "Done. You can switch manually by adding"
echo "theme = dark:myrt-dark,light:myrt-light"


