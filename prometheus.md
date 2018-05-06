# prometheus

## getting started

[https://prometheus.io/docs/prometheus/latest/getting\_started/](https://prometheus.io/docs/prometheus/latest/getting_started/)

Use docker instead of local:

```
#!/usr/bin/env bash
docker run \
	-t -d --rm \
	-p 9090:9090 \
	--name prometheus \
	quay.io/prometheus/prometheus
```



