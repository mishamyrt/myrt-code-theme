#!/usr/bin/env bash
set -euo pipefail

# Usage: ./scripts/release.sh [--allow-dirty] [--no-push] <version>
ALLOW_DIRTY=false
NO_PUSH=false
POSITIONALS=()
while [[ $# -gt 0 ]]; do
  case "$1" in
    --allow-dirty) ALLOW_DIRTY=true; shift;;
    --no-push) NO_PUSH=true; shift;;
    -h|--help) echo "Usage: $0 [--allow-dirty] [--no-push] <version>"; exit 0;;
    *) POSITIONALS+=("$1"); shift;;
  esac
done
set -- "${POSITIONALS[@]}"

VER=${1:?"Usage: $0 <version> (e.g. 1.2.3)"}
TAG="v${VER}"

if ! [[ "$VER" =~ ^[0-9]+\.[0-9]+\.[0-9]+(-[0-9A-Za-z.-]+)?$ ]]; then
  echo "Version must be semver (e.g. 1.2.3 or 1.2.3-rc.1)" >&2; exit 1
fi

if git rev-parse --verify --quiet "$TAG" >/dev/null; then
  echo "Tag $TAG already exists" >&2; exit 1
fi

# Ensure working tree is clean unless overridden
if [ "$ALLOW_DIRTY" != true ]; then
  if ! git diff-index --quiet HEAD --; then
    echo "Working tree not clean. Commit or stash changes, or pass --allow-dirty" >&2; exit 1
  fi
fi

node -e '
const fs=require("fs");
const p=JSON.parse(fs.readFileSync("apps/vscode/package.json","utf8"));
const ver=process.argv[1];
p.version=ver;
fs.writeFileSync("apps/vscode/package.json", JSON.stringify(p,null,2)+"\n");
' "$VER"

if ! command -v git-cliff >/dev/null 2>&1; then
  echo "git-cliff is required. Install: brew install git-cliff" >&2; exit 1
fi

git-cliff -c cliff.toml -o CHANGELOG.md --tag "$TAG"

# Commit and tag
git add apps/vscode/package.json CHANGELOG.md
if git diff --cached --quiet; then
  echo "Nothing to commit"; else
  git commit -m "chore: release $TAG"
fi

git tag -a "$TAG" -m "$TAG"

if [ "$NO_PUSH" != true ]; then
  git push && git push origin "$TAG"
else
  echo "--no-push set: remember to push and push the tag manually"
fi

echo "Prepared release $TAG"


