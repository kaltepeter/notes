---
title: Instana
date: 2019-07-13
tags:
  - APM
---

## agent

### docker

```bash
sudo docker run \
  --detach --rm \
  --publish 42699:42699 \
  --name instana-agent \
  --volume /var/run:/var/run \
  --volume /dev:/dev \
  --volume /sys:/sys \
  --volume /var/log:/var/log \
  --privileged \
  --net=host \
  --pid=host \
  --ipc=host \
  --env INSTANA_AGENT_KEY="${INSTANA_AGENT_KEY}" \
  --env INSTANA_AGENT_ENDPOINT="${INSTANA_AGENT_ENDPOINT}" \
  --env INSTANA_AGENT_ENDPOINT_PORT="${INSTANA_AGENT_ENDPOINT_PORT}" \
  --env INSTANA_AGENT_ZONE="${INSTANA_AGENT_ZONE}" \
  instana/agent
```

### mac

curl -o setup_agent.sh https://setup.instana.io/agent && chmod 700 ./setup_agent.sh && sudo ./setup_agent.sh -a "${instana_agent_key}" -t dynamic -l us -s

## Run API Tests locally

```json
  "scripts": {
    "build": "script-cli -z src/$npm_config_bundle_name index.js",
    "exec": "BASE_URL=$npm_config_base_url script-cli -d src/$npm_config_bundle_name index.js",
    "test": "echo \"Error: no test specified\" && exit 1",
    "zip": "./zip-script.sh"
  },
```

```bash
npm run exec --bundle_name=global-search # execute
npm run zip dealmaker-profile # zip output
# run all zips
find ./src -type d -maxdepth 1 ! -iname src -exec basename {} \; | xargs -I{} npm run zip {}
```

```bash
#!/usr/bin/env bash
set -o errexit
set -o pipefail
set -o nounset
[[ ${DEBUG:-} == true ]] && set -o xtrace
readonly __dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

current_dir=$(pwd)
bundle_dir="${__dir}/bundles"

[[ ${1:-} ]] || { echo "missing an argument. first argument must be a bundle name" >&2; exit 1; }
bundle_name=${1:-}

# [[ ${2:-} ]] || { echo "missing an argument. second argument must be the target env. i.e. dev, stage or prod" >&2; exit 1; }
# target_env=${2:-}

cd "${__dir}/src/${bundle_name}"

zip -r "${bundle_dir}/${bundle_name}.zip" .

cd "${current_dir}"
npm run build --silent --bundle_name="${bundle_name}" > "${bundle_dir}/${bundle_name}.json"
exit 0

```
