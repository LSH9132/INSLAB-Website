#!/bin/sh
set -e

# ── Validate required environment ────────────────────────────────────
if [ -z "$DOMAIN" ]; then
  echo "[entrypoint] ERROR: DOMAIN environment variable is required" >&2
  exit 1
fi

CERT_DIR="/etc/letsencrypt/live/$DOMAIN"

# ── Bootstrap self-signed certificate if none exists ─────────────────
if [ -f "$CERT_DIR/fullchain.pem" ] && [ -f "$CERT_DIR/privkey.pem" ]; then
  echo "[entrypoint] Existing certificate found, skipping self-signed generation."
else
  echo "[entrypoint] No certificate found — generating temporary self-signed cert..."
  apk add --no-cache openssl >/dev/null 2>&1
  mkdir -p "$CERT_DIR"

  openssl req -x509 -nodes -newkey rsa:2048 \
    -days 1 \
    -keyout "$CERT_DIR/privkey.pem" \
    -out "$CERT_DIR/fullchain.pem" \
    -subj "/CN=$DOMAIN" \
    2>/dev/null

  # nginx.ssl.conf references chain.pem for OCSP stapling
  cp "$CERT_DIR/fullchain.pem" "$CERT_DIR/chain.pem"

  echo "[entrypoint] Temporary self-signed certificate created."
fi

# ── Generate nginx SSL config from template ──────────────────────────
envsubst '${DOMAIN}' < /etc/nginx/templates/default.conf.template \
  > /etc/nginx/conf.d/ssl.conf

# ── Reload nginx every 5m to pick up renewed certificates ────────────
(while true; do sleep 5m; nginx -s reload 2>/dev/null || true; done) &

exec nginx -g 'daemon off;'
