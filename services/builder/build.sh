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

echo "[build] Deploying to $OUT_DIR..."
# Use rsync to update the volume mount in-place (mv fails on Docker volumes)
rsync -a --delete "$APP_DIR/out/" "$OUT_DIR/"

echo "[build] Deploy complete."
