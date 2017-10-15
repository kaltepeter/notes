# Spring Boot

### Health Check

[https://blog.jayway.com/2014/07/22/spring-boot-custom-healthindicator/](https://blog.jayway.com/2014/07/22/spring-boot-custom-healthindicator/)

### test with curl

`curl -sSf `[`http://localhost:8888/health`](http://localhost:8888/health)` -o /dev/null || echo "website down"`

will echo website down if healthcheck is not UP

