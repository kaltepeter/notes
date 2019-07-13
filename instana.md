# instana

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