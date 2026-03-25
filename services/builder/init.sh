#!/bin/sh
# Seed the data volume with initial content (runs on first startup)

DATA_DIR="${DATA_DIR:-/data}"

if [ ! -f "$DATA_DIR/content/team/members.yaml" ]; then
    echo "[init] First run detected. Seeding data volume..."
    mkdir -p "$DATA_DIR/content" "$DATA_DIR/messages" "$DATA_DIR/images"
    cp -r /app/content/* "$DATA_DIR/content/"
    cp /app/src/messages/*.json "$DATA_DIR/messages/"
    cp -r /app/public/images/* "$DATA_DIR/images/"
    echo "[init] Seed complete."
else
    echo "[init] Data volume already populated. Skipping seed."
fi
