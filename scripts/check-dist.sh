#!/bin/sh
# Pre-push guard:
#   1. Rebuild dist/ from source.
#   2. Fail if the rebuilt dist/ differs from what's committed.
#
# This catches the case where someone changes src/ but forgets to commit
# the regenerated dist/, which would push a stale bundle to HACS users.

set -e

DIST_FILE="dist/ha-shopping-list-card.js"

echo "[pre-push] building $DIST_FILE..."
npm run build --silent

if ! git diff --quiet -- "$DIST_FILE"; then
  echo ""
  echo "ERROR: $DIST_FILE is out of date relative to the source committed in HEAD."
  echo ""
  echo "Source files changed but the rebuilt bundle was not committed."
  echo "Run:"
  echo ""
  echo "  git add $DIST_FILE"
  echo "  git commit --amend --no-edit   # (or a fresh commit)"
  echo "  git push"
  echo ""
  exit 1
fi

# Also catch untracked dist file (first build, never committed yet).
if git ls-files --error-unmatch "$DIST_FILE" >/dev/null 2>&1; then
  :
else
  echo ""
  echo "ERROR: $DIST_FILE exists but is not tracked by git."
  echo "Run: git add $DIST_FILE && git commit"
  echo ""
  exit 1
fi

echo "[pre-push] dist/ is in sync with source. OK."
