---
title: Local Dev
date: 2023-06-20
tags:
- productivity
- tools
---

## SSL for local

1. `mkdir certs`
1. `touch certs/.gitkeep`
1. `echo "*.pem" >> ./gitignore`
1. Run the following to generate a local cert. `./generate-certs.sh`

```bash
#!/usr/bin/env bash
# ./generate-certs.sh
set -o errexit
set -o pipefail
set -o nounset
[[ ${DEBUG:-} == true ]] && set -o xtrace
readonly __dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if ! command -v mkcert > /dev/null; then
  echo "This repo requires mkcert to genearte a local trusted cert. Install with 'brew install mkcert' or follow os instructions."
fi

if [[ ! -f ./certs/localhost+4.pem ]]; then
    mkcert -install
    mkcert localhost local.mydomain.com "*.local.mydomain.com" 127.0.0.1 ::1
fi

```

## Nginx local

Run behind Nginx like another env locally. This example forwards all traffic to port 3666

```nginx
# local.nginx.conf.example
server {
  listen         443 ssl;
  listen         [::]:443 ssl;
  ssl_certificate      CERT_LOCATION;
  ssl_certificate_key  CERT_KEY_LOCATION;
  server_name .local.mydomain.com;
  # 	include includes/apm.conf;

  location / {
    proxy_pass https://localhost:3666;
  }
}
```

1. Install nginx locally `brew install nginx`
1. Start the service `brew services start nginx`
1. `echo "local.nginx.conf" >> .gitignore`
1. Run the script below `./local.nginx.sh`

    ```bash
    # local.nginx.sh
    #!/usr/bin/env bash
    set -o errexit
    set -o pipefail
    set -o nounset
    [[ ${DEBUG:-} == true ]] && set -o xtrace
    __dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

    source_nginx_conf="${__dir}/local.nginx.conf"
    cp "${source_nginx_conf}.example" "${__dir}/local.nginx.conf"

    nginx_servers_path=$(brew info nginx | grep "nginx will load all files in" | sed -e 's/nginx will load all files in \(.*\)./\1/')
    sed -i "" -e "s|CERT_LOCATION|${nginx_servers_path}../certs/localhost+4.pem|" "${source_nginx_conf}"
    sed -i "" -e "s|CERT_KEY_LOCATION|${nginx_servers_path}../certs/localhost+4-key.pem|" "${source_nginx_conf}"

    if [[ ! -d "${nginx_servers_path}/../certs" ]]; then
        mkdir -p "${nginx_servers_path}/../certs"
    fi

    find "${__dir}/certs" -type f ! -iname .gitkeep -exec ln -sf {} "${nginx_servers_path}/../certs" \;
    ln -sf "${__dir}/local.nginx.conf" "${nginx_servers_path}"

    nginx -s reload
    ```
1. Edit your `package.json` if node.

    ```json
    "start:dev2": "HTTPS=true SSL_CRT_FILE=certs/localhost+4.pem SSL_KEY_FILE=certs/localhost+4-key.pem HOST=local.mydomain.com npm run start:dev",
    ```


