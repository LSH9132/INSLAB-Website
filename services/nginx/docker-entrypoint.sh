#!/bin/sh
set -e

# Substitute only $DOMAIN (preserve nginx built-in variables like $uri, $host)
# Write to ssl.conf (not default.conf) to avoid conflict with base compose's read-only mount
envsubst '${DOMAIN}' < /etc/nginx/templates/default.conf.template \
  > /etc/nginx/conf.d/ssl.conf

# Reload nginx every 12h to pick up renewed certificates (graceful, zero downtime)
(while true; do sleep 12h; nginx -s reload; done) &

exec nginx -g 'daemon off;'
