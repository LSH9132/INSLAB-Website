#!/bin/sh
set -e

# ── Validate required environment ────────────────────────────────────
if [ -z "$DOMAIN" ]; then
  echo "[certbot] ERROR: DOMAIN environment variable is required" >&2
  exit 1
fi
if [ -z "$CERTBOT_EMAIL" ]; then
  echo "[certbot] ERROR: CERTBOT_EMAIL environment variable is required" >&2
  exit 1
fi

CERT_DIR="/etc/letsencrypt/live/$DOMAIN"

# ── Check if current cert is self-signed ─────────────────────────────
is_self_signed() {
  if [ ! -f "$CERT_DIR/fullchain.pem" ]; then
    return 1
  fi
  # Extract only the value after "issuer=" / "subject=" prefix for comparison
  ISSUER=$(openssl x509 -in "$CERT_DIR/fullchain.pem" -noout -issuer 2>/dev/null | sed 's/^issuer=//')
  SUBJECT=$(openssl x509 -in "$CERT_DIR/fullchain.pem" -noout -subject 2>/dev/null | sed 's/^subject=//')
  [ "$ISSUER" = "$SUBJECT" ]
}

# ── Request real certificate if needed ───────────────────────────────
if is_self_signed; then
  echo "[certbot] Self-signed certificate detected — requesting real certificate from Let's Encrypt..."

  # Clean up self-signed files (certbot needs clean directory for symlink structure)
  rm -rf "$CERT_DIR"
  rm -rf "/etc/letsencrypt/archive/$DOMAIN"
  rm -f "/etc/letsencrypt/renewal/$DOMAIN.conf"

  MAX_RETRIES=5
  RETRY_DELAY=30

  for i in $(seq 1 $MAX_RETRIES); do
    echo "[certbot] Attempt $i/$MAX_RETRIES..."

    if certbot certonly --webroot \
      -w /var/www/certbot \
      -d "$DOMAIN" \
      --email "$CERTBOT_EMAIL" \
      --agree-tos \
      --no-eff-email; then
      echo "[certbot] Certificate issued successfully!"
      break
    fi

    if [ "$i" -eq "$MAX_RETRIES" ]; then
      echo "[certbot] ERROR: Failed to obtain certificate after $MAX_RETRIES attempts." >&2
      echo "[certbot] Falling back to renewal loop (will retry on next cycle)." >&2
      break
    fi

    echo "[certbot] Failed, retrying in ${RETRY_DELAY}s..."
    sleep "$RETRY_DELAY"
    RETRY_DELAY=$((RETRY_DELAY * 2))
  done
elif [ -f "$CERT_DIR/fullchain.pem" ]; then
  echo "[certbot] Valid certificate found, skipping issuance."
else
  echo "[certbot] No certificate found — waiting for nginx to create self-signed cert..."
  sleep 10
fi

# ── Enter renewal loop ───────────────────────────────────────────────
echo "[certbot] Entering renewal loop (every 12h)..."
trap exit TERM
while :; do
  certbot renew
  sleep 12h &
  wait $!
done
