# Docker

`docker exec -it vibrant_bell sh`

> run shell on container vibrant\_bell

## Healthchecks

**documentation**: [https://docs.docker.com/engine/reference/builder/\#healthcheck](https://docs.docker.com/engine/reference/builder/#healthcheck)

[https://ryaneschinger.com/blog/using-docker-native-health-checks/](https://ryaneschinger.com/blog/using-docker-native-health-checks/)

## Startup dependencies

[https://docs.docker.com/compose/startup-order/](https://docs.docker.com/compose/startup-order/)

## compose / stack

compose is legacy

links are legacy.

`docker container run --name api-gateway --rm --link config-service:ali-config-service api-gateway:latest`

start stack

`docker stack deploy -c docker-compose.yml javelin`

## ENV vars

how entry points work: [https://stackoverflow.com/questions/41512237/how-to-execute-a-shell-command-before-the-entrypoint-via-the-dockerfile](https://stackoverflow.com/questions/41512237/how-to-execute-a-shell-command-before-the-entrypoint-via-the-dockerfile)

environment replacement doc: [https://docs.docker.com/engine/reference/builder/\#environment-replacement](https://docs.docker.com/engine/reference/builder/#environment-replacement)

## Networking

docs: [https://docs.docker.com/engine/userguide/networking/work-with-networks/\#basic-container-networking-example](https://docs.docker.com/engine/userguide/networking/work-with-networks/#basic-container-networking-example)

