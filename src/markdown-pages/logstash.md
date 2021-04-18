---
title: Logstash
date: 2018-10-31
tags:
- nix
---

## docker

```bash
docker run --rm -d \
    -p 9600:9600 \
    -p 9200:9200 \
    -p 5044:5044 \
    --name mrll-bot-logstash \
    -v "${__dir}/config:/usr/share/logstash/config" \
    -v "${__dir}/pipeline:/usr/share/logstash/pipeline" \
    docker.elastic.co/logstash/logstash-oss:6.4.2
```

## plugins

install

```bash
bin/logstash-plugin install logstash-input-github
```

## auto reload

`bin/logstash –f apache.config --config.reload.automatic`
