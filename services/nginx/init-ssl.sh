#!/bin/bash
set -e

COMPOSE="docker compose -f docker-compose.yml -f docker-compose.prod.yml"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$PROJECT_DIR"

# ── Load .env ───────────────────────────────────────────────────────
if [ -f .env ]; then
  set -a
  . ./.env
  set +a
fi

DOMAIN="${DOMAIN:?Error: DOMAIN is not set in .env}"
CERTBOT_EMAIL="${CERTBOT_EMAIL:?Error: CERTBOT_EMAIL is not set in .env}"

CERT_DIR="./docker-data/certbot/conf/live/$DOMAIN"
STAGING_FLAG=""

# ── Parse arguments ─────────────────────────────────────────────────
while [ "$#" -gt 0 ]; do
  case "$1" in
    --staging) STAGING_FLAG="--staging"; shift ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done

echo "========================================"
echo " SSL Initialization"
echo " Domain:  $DOMAIN"
echo " Email:   $CERTBOT_EMAIL"
[ -n "$STAGING_FLAG" ] && echo " Mode:    STAGING (test certificates)"
echo "========================================"

# ── Step 1: Create temporary self-signed certificate ────────────────
if [ ! -f "$CERT_DIR/fullchain.pem" ]; then
  echo "[init-ssl] Creating temporary self-signed certificate..."

  mkdir -p "$CERT_DIR"

  openssl req -x509 -nodes -newkey rsa:2048 \
    -days 1 \
    -keyout "$CERT_DIR/privkey.pem" \
    -out "$CERT_DIR/fullchain.pem" \
    -subj "/CN=$DOMAIN" \
    2>/dev/null

  cp "$CERT_DIR/fullchain.pem" "$CERT_DIR/chain.pem"

  echo "[init-ssl] Temporary certificate created."
else
  echo "[init-ssl] Existing certificate found, skipping self-signed generation."
fi

# ── Step 2: Start nginx (with temporary or existing cert) ──────────
echo "[init-ssl] Starting nginx..."
$COMPOSE up -d nginx
echo "[init-ssl] Waiting for nginx to be ready..."
sleep 5

# ── Step 3: Remove temporary cert and request real one ──────────────
echo "[init-ssl] Requesting certificate from Let's Encrypt..."

# Remove self-signed cert so certbot can create proper symlink structure
rm -rf "$CERT_DIR"

$COMPOSE run --rm --entrypoint "certbot" certbot certonly \
  --webroot \
  -w /var/www/certbot \
  -d "$DOMAIN" \
  --email "$CERTBOT_EMAIL" \
  --agree-tos \
  --no-eff-email \
  --force-renewal \
  $STAGING_FLAG

# ── Step 4: Reload nginx with real certificate ─────────────────────
echo "[init-ssl] Reloading nginx with real certificate..."
$COMPOSE exec nginx nginx -s reload

# ── Step 5: Start all services ─────────────────────────────────────
echo "[init-ssl] Starting all services..."
$COMPOSE up -d

echo "========================================"
echo " SSL setup complete!"
echo " https://$DOMAIN"
echo "========================================"
