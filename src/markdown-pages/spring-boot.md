---
title: Spring Boot
date: 2018-07-28
tags:
  - java
  - framework
---

### Health Check

[https://blog.jayway.com/2014/07/22/spring-boot-custom-healthindicator/](https://blog.jayway.com/2014/07/22/spring-boot-custom-healthindicator/)

### test with curl

`curl -sSf http://localhost:8888/health -o /dev/null || echo "website down"`

will echo "website down" if healthcheck is not UP

`curl -sSf http://localhost:8888/health -o /dev/null || exit 1`

### test with wget

`wget -q http://localhost:8880/health || echo "down"`

will echo "down" if is not UP

will exit with error status if healthcheck is not UP

> It is possible to change the HTTP status codes of the /health response. By default, if the status is Status.DOWN or Status.OUT_OF_SERVICE HTTP status 503 - Service Unavailable will be returned. \(Please note that in Spring Boot versions &lt;= 1.1.4, there is a bug that will cause 200 - OK to be returned by default.\)

because of error codes it will cause a curl fail state

## mongo

**nosql db:** [https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-nosql.html](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-nosql.html)

#### modify host

```text
spring.data.mongodb.host=mongodbhost
```

## properties

**command line properties:** [https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html\#boot-features-external-config-command-line-args](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html#boot-features-external-config-command-line-args)
