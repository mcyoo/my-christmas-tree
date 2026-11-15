#!/bin/sh
set -eu

DOMAIN="${DOMAIN:-localhost}"
EMAIL="${LETSENCRYPT_EMAIL:-}"
SSL_ENABLED="${SSL_ENABLED:-auto}"
STAGING="${LETSENCRYPT_STAGING:-false}"

pid=""
renew_pid=""

shutdown() {
  if [ -n "${renew_pid}" ]; then
    kill "${renew_pid}" 2>/dev/null || true
  fi
  if [ -n "${pid}" ]; then
    kill -TERM "${pid}" 2>/dev/null || true
    wait "${pid}" 2>/dev/null || true
  fi
  exit 0
}

trap shutdown TERM INT

valid_domain() {
  echo "${DOMAIN}" | grep -Eq '^[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$'
}

want_ssl() {
  if [ "${SSL_ENABLED}" = "false" ] || [ "${SSL_ENABLED}" = "0" ]; then
    return 1
  fi
  if [ "${DOMAIN}" = "localhost" ] || [ "${DOMAIN}" = "127.0.0.1" ]; then
    return 1
  fi
  if echo "${DOMAIN}" | grep -Eq '^[0-9.]+$'; then
    echo "IP 주소에는 Let's Encrypt 인증서를 발급할 수 없어 HTTP로 실행합니다."
    return 1
  fi
  if ! valid_domain; then
    echo "DOMAIN 값이 올바르지 않아 HTTP로 실행합니다: ${DOMAIN}"
    return 1
  fi
  if [ -z "${EMAIL}" ]; then
    echo "LETSENCRYPT_EMAIL 이 없어 HTTP로 실행합니다."
    return 1
  fi
  if [ "${SSL_ENABLED}" = "auto" ] || [ "${SSL_ENABLED}" = "true" ] || [ "${SSL_ENABLED}" = "1" ]; then
    return 0
  fi
  echo "SSL_ENABLED 값을 해석할 수 없어 HTTP로 실행합니다: ${SSL_ENABLED}"
  return 1
}

nginx_header() {
  cat <<'EOF'
gzip on;
gzip_comp_level 5;
gzip_min_length 256;
gzip_types text/css application/javascript application/json image/svg+xml text/plain;

EOF
}

write_http() {
  {
    nginx_header
    cat <<EOF
server {
    listen 80;
    server_name ${DOMAIN};

    client_max_body_size 1m;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        proxy_pass http://web:8000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF
  } > /etc/nginx/conf.d/default.conf
}

write_https() {
  {
    nginx_header
    cat <<EOF
server {
    listen 80;
    server_name ${DOMAIN};

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://\$host\$request_uri;
    }
}

server {
    listen 443 ssl;
    http2 on;
    server_name ${DOMAIN};

    client_max_body_size 1m;

    ssl_certificate /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;
    ssl_session_timeout 1d;
    ssl_session_cache shared:MozSSL:10m;
    ssl_protocols TLSv1.2 TLSv1.3;

    add_header Strict-Transport-Security "max-age=2592000" always;
    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;

    location / {
        proxy_pass http://web:8000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }
}
EOF
  } > /etc/nginx/conf.d/default.conf
}

issue_cert() {
  staging_arg=""
  if [ "${STAGING}" = "true" ] || [ "${STAGING}" = "1" ]; then
    staging_arg="--staging"
  fi
  # shellcheck disable=SC2086
  certbot certonly --webroot -w /var/www/certbot \
    --preferred-challenges http \
    -d "${DOMAIN}" \
    --email "${EMAIL}" \
    --agree-tos \
    --no-eff-email \
    --non-interactive \
    --keep-until-expiring \
    ${staging_arg}
}

enable_https() {
  cert_file="/etc/letsencrypt/live/${DOMAIN}/fullchain.pem"
  if [ ! -f "${cert_file}" ]; then
    return 1
  fi
  write_https
  if nginx -t; then
    nginx -s reload
    return 0
  fi
  write_http
  nginx -t || true
  return 1
}

mkdir -p /var/www/certbot /var/log/nginx /etc/nginx/conf.d
write_http
nginx -t
nginx -g "daemon off;" &
pid=$!

sleep 1

if want_ssl; then
  cert_path="/etc/letsencrypt/live/${DOMAIN}/fullchain.pem"
  if [ -f "${cert_path}" ]; then
    if enable_https; then
      echo "기존 인증서로 HTTPS를 시작합니다."
    else
      echo "저장된 인증서를 적용하지 못했습니다. HTTP로 계속 서비스합니다."
    fi
  else
    echo "Let's Encrypt 인증서를 발급합니다: ${DOMAIN}"
    if issue_cert && enable_https; then
      echo "HTTPS가 켜졌습니다."
    else
      echo "인증서 발급에 실패했습니다. HTTP로 서비스하고 10분마다 다시 시도합니다."
    fi
  fi

  (
    while true; do
      if [ ! -f "${cert_path}" ]; then
        sleep 600
        echo "인증서 발급을 다시 시도합니다: ${DOMAIN}"
        if issue_cert && enable_https; then
          echo "HTTPS가 켜졌습니다."
        fi
      else
        sleep 43200
        echo "인증서 갱신을 확인합니다."
        certbot renew --quiet --deploy-hook "nginx -s reload" || true
      fi
    done
  ) &
  renew_pid=$!
else
  echo "HTTP로 서비스합니다. domain=${DOMAIN}"
fi

wait "${pid}"
