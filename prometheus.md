# prometheus

## getting started

[https://prometheus.io/docs/prometheus/latest/getting\_started/](https://prometheus.io/docs/prometheus/latest/getting_started/)

Use docker instead of local:

```
#!/usr/bin/env bash
curDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

docker run \
    -d --rm \
    -p 9090:9090 \
    -v ${curDir}/prometheus-data:/prometheus \
    -v ${curDir}/prometheus.yml:/etc/prometheus/prometheus.yml \
    --name prometheus \
    quay.io/prometheus/prometheus
```

## docker

[https://www.ctl.io/developers/blog/post/monitoring-docker-services-with-prometheus/](https://www.ctl.io/developers/blog/post/monitoring-docker-services-with-prometheus/) - outdated but very detailed use case of cadvisor and prometheus





