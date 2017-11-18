# Docker

`docker exec -it vibrant_bell sh`

> run shell on container vibrant\_bell

## Healthchecks

**documentation**: [https://docs.docker.com/engine/reference/builder/\#healthcheck](https://docs.docker.com/engine/reference/builder/#healthcheck)

[https://ryaneschinger.com/blog/using-docker-native-health-checks/](https://ryaneschinger.com/blog/using-docker-native-health-checks/)

**health check samples: **[https://github.com/docker-library/healthcheck](https://github.com/docker-library/healthcheck)

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

vars in dockerfile: [https://stackoverflow.com/questions/19537645/get-environment-variable-value-in-dockerfile](https://stackoverflow.com/questions/19537645/get-environment-variable-value-in-dockerfile)

environment replacement doc: [https://docs.docker.com/engine/reference/builder/\#environment-replacement](https://docs.docker.com/engine/reference/builder/#environment-replacement)

#### how to run command to set env var

1. Create dockerrun.sh script to set as entry point with the following
   ```
   GATEWAY=$(ip route show 0.0.0.0/0 dev eth0 | cut -d\  -f3)
   SPRING_CONFIG_URI=http://$GATEWAY:8888
   java $JAVA_OPTS -DSPRING_CONFIG_URI=$SPRING_CONFIG_URI -Djava.security.egd=file:/dev/./urandom -Dserver.port=8081 -jar /app.jar
   ```
2. edit Dockerfile
   ```
   FROM openjdk:8-jdk-alpine
   VOLUME /tmp
   EXPOSE 8081
   COPY target/dockerrun.sh /
   ADD target/api-gateway.jar app.jar
   ENV JAVA_OPTS=""
   ENTRYPOINT exec sh ./dockerrun.sh
   ```
3. ## 

## Networking

docs: [https://docs.docker.com/engine/userguide/networking/work-with-networks/\#basic-container-networking-example](https://docs.docker.com/engine/userguide/networking/work-with-networks/#basic-container-networking-example)

#### get container ip

```
hostname -i
```

#### get container gateway

```
$(ip route show 0.0.0.0/0 dev eth0 | cut -d\  -f3)
```

\*\* Use docker compose/stacks to network containers. old way was link. using the gateway address will also do it.

## tutorials

**getting started for java: **[https://github.com/docker/labs/tree/master/developer-tools/java/](https://github.com/docker/labs/tree/master/developer-tools/java/)

**getting started for spring boot:** [https://spring.io/guides/gs/spring-boot-docker/](https://spring.io/guides/gs/spring-boot-docker/)

**host multiple websites on single host docker: **[https://blog.florianlopes.io/host-multiple-websites-on-single-host-docker/](https://blog.florianlopes.io/host-multiple-websites-on-single-host-docker/)

**nginx template vars: **[https://docs.docker.com/samples/library/nginx/\#using-environment-variables-in-nginx-configuration](https://docs.docker.com/samples/library/nginx/#using-environment-variables-in-nginx-configuration)

