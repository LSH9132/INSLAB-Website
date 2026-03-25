#!/bin/sh
# Backup admin content data (YAML + messages) to timestamped tar.gz
# Usage: bash services/backup/backup.sh
# Recommended cron: 0 3 * * * cd /path/to/inslab-website && bash services/backup/backup.sh

set -e

PROJECT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
BACKUP_DIR="$PROJECT_DIR/backups"
DATE=$(date +%Y%m%d-%H%M%S)

mkdir -p "$BACKUP_DIR"

echo "[backup] Backing up admin data..."
tar -czf "$BACKUP_DIR/admin-$DATE.tar.gz" -C "$PROJECT_DIR/docker-data/admin" content messages

echo "[backup] Created: $BACKUP_DIR/admin-$DATE.tar.gz"

# Remove backups older than 30 days
find "$BACKUP_DIR" -name "admin-*.tar.gz" -mtime +30 -delete

echo "[backup] Cleanup complete. Current backups:"
ls -lh "$BACKUP_DIR"/admin-*.tar.gz 2>/dev/null || echo "  (none)"
