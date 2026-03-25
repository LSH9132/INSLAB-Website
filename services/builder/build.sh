#!/bin/sh
set -e

DATA_DIR="${DATA_DIR:-/data}"
OUT_DIR="${OUT_DIR:-/out}"
APP_DIR="/app"

echo "[build] Syncing content from $DATA_DIR..."

# Sync content, messages, and images from shared volume
rsync -a --delete "$DATA_DIR/content/" "$APP_DIR/content/"
rsync -a --delete "$DATA_DIR/messages/" "$APP_DIR/src/messages/"
rsync -a --delete "$DATA_DIR/images/" "$APP_DIR/public/images/"

echo "[build] Running next build..."
cd "$APP_DIR"
npx next build

# Determine deploy target
if [ "$PREVIEW" = "1" ]; then
  DEPLOY_DIR="$OUT_DIR/preview"
  echo "[build] Deploying preview to $DEPLOY_DIR..."
  mkdir -p "$DEPLOY_DIR"
  rsync -a --delete "$APP_DIR/out/" "$DEPLOY_DIR/"
  echo "[build] Preview deploy complete."
else
  echo "[build] Deploying to $OUT_DIR..."
  rsync -a --delete "$APP_DIR/out/" "$OUT_DIR/"
  echo "[build] Deploy complete."
fi
