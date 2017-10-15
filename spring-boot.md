# Spring Boot

### Health Check

[https://blog.jayway.com/2014/07/22/spring-boot-custom-healthindicator/](https://blog.jayway.com/2014/07/22/spring-boot-custom-healthindicator/)

### test with curl

\`\`\`   
p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 10.0px Monaco; color: \#f4f4f4; background-color: \#000000; background-color: rgba\(0, 0, 0, 0.85\)}  
span.s1 {font-variant-ligatures: no-common-ligatures}  


curl -sSf http://localhost:8888/health -o /dev/null \| grep "UP" \|\| echo "website down"

\`\`\`



