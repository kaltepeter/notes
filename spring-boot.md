# Spring Boot

### Health Check

[https://blog.jayway.com/2014/07/22/spring-boot-custom-healthindicator/](https://blog.jayway.com/2014/07/22/spring-boot-custom-healthindicator/)

### test with curl

`curl -sSf`[`http://localhost:8888/health`](http://localhost:8888/health)`-o /dev/null || echo "website down"`

will echo website down if healthcheck is not UP

> It is possible to change the HTTP status codes of the
>
> `/health`
>
> response. By default, if the status is
>
> `Status.DOWN`
>
> or
>
> `Status.OUT_OF_SERVICE`
>
> HTTP status
>
> `503 - Service Unavailable`
>
> will be returned. \(Please note that in Spring Boot versions 
>
> &lt;
>
> = 1.1.4, there is a
>
> [bug](https://github.com/spring-projects/spring-boot/issues/1264)
>
> that will cause
>
> `200 - OK`
>
> to be returned by default.\)



