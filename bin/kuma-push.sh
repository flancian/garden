#!/usr/bin/env bash
#
# kuma-push.sh - Lightweight host health check and Uptime Kuma push heartbeat.
#
# Can be run via cron (e.g. every 5 minutes):
#   */5 * * * * /usr/local/bin/kuma-push.sh >/dev/null 2>&1
#
# Configuration is read from /etc/kuma-push.conf or environment variables.

set -euo pipefail

CONF_FILE="${HOME}/.kuma-push.conf"
if [[ -f "$CONF_FILE" ]]; then
  # shellcheck source=/dev/null
  source "$CONF_FILE"
elif [[ -f "/etc/kuma-push.conf" ]]; then
  # shellcheck source=/dev/null
  source "/etc/kuma-push.conf"
fi

# Configurable defaults
KUMA_URL="${KUMA_URL:-}"
DISK_PATH="${DISK_PATH:-/}"
DISK_THRESHOLD="${DISK_THRESHOLD:-90}" # Alert if usage >= 90%

if [[ -z "$KUMA_URL" ]]; then
  echo "Error: KUMA_URL is not set. Set it in $CONF_FILE or as an environment variable." >&2
  exit 1
fi

# Check disk usage percentage
DISK_USAGE=$(df -P "$DISK_PATH" | awk 'NR==2 {gsub(/%/, "", $5); print $5}')

# Prepare message
MSG="Disk: ${DISK_USAGE}% on ${DISK_PATH}"

if [[ "$DISK_USAGE" -ge "$DISK_THRESHOLD" ]]; then
  # Disk threshold exceeded -> report DOWN immediately
  curl -fsS -m 10 -G \
    --data-urlencode "status=down" \
    --data-urlencode "msg=ALERT: Disk at ${DISK_USAGE}% on ${HOSTNAME:-$(hostname)}" \
    "${KUMA_URL}" >/dev/null
  exit 2
else
  # Healthy -> report UP with heartbeat
  curl -fsS -m 10 -G \
    --data-urlencode "status=up" \
    --data-urlencode "msg=${MSG}" \
    --data-urlencode "ping=" \
    "${KUMA_URL}" >/dev/null
fi
