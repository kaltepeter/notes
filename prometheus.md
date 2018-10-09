# prometheus

## getting started

[https://prometheus.io/docs/prometheus/latest/getting\_started/](https://prometheus.io/docs/prometheus/latest/getting_started/)

Use docker instead of local:

```text
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

[https://github.com/vegasbrianc/prometheus](https://github.com/vegasbrianc/prometheus) - starter project for prometheus and grafana

## docker

[https://www.ctl.io/developers/blog/post/monitoring-docker-services-with-prometheus/](https://www.ctl.io/developers/blog/post/monitoring-docker-services-with-prometheus/) - outdated but very detailed use case of cadvisor and prometheus

## monitoring jenkins

example config:

```text
## prometheus.yml ##
global:
  scrape_interval:     15s # By default, scrape targets every 15 seconds.

  # Attach these labels to any time series or alerts when communicating with
  # external systems (federation, remote storage, Alertmanager).
  external_labels:
    monitor: 'codelab-monitor'

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: 'prometheus'

    # Override the global default and scrape targets from this job every 5 seconds.
    scrape_interval: 5s

    static_configs:
      - targets: ['localhost:9090']

  - job_name:       'jenkins'
    # Override the global default and scrape targets from this job every 5 seconds.
    scrape_interval: 5s

    static_configs:
      - targets: ['172.17.0.1:8081']
        labels:
          group: 'master'

      - targets: ['172.17.0.1:8082']
        labels:
          group: 'slave'
```

## grafana

[https://github.com/vegasbrianc/grafana\_dashboard](https://github.com/vegasbrianc/grafana_dashboard) - example dashboard

[https://finestructure.co/blog/2016/5/16/monitoring-with-prometheus-grafana-docker-part-1](https://finestructure.co/blog/2016/5/16/monitoring-with-prometheus-grafana-docker-part-1)

[https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitor-send-to-grafana](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitor-send-to-grafana) - azure monitor solution

## reload config

https://www.robustperception.io/reloading-prometheus-configuration
