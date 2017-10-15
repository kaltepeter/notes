# Spring Boot

### Health Check

[https://blog.jayway.com/2014/07/22/spring-boot-custom-healthindicator/](https://blog.jayway.com/2014/07/22/spring-boot-custom-healthindicator/)

### test with curl

`curl -sSf http://localhost:8888/health -o /dev/null || echo "website down"`

will echo "website down" if healthcheck is not UP 

`curl -sSf http://localhost:8888/health -o /dev/null || exit 1`

will exit with error status if healthcheck is  not UP

> It is possible to change the HTTP status codes of the /health response. By default, if the status is Status.DOWN or Status.OUT\_OF\_SERVICE HTTP status 503 - Service Unavailable will be returned. \(Please note that in Spring Boot versions &lt;= 1.1.4, there is a bug that will cause 200 - OK to be returned by default.\)



