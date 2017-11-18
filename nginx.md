# NGINX

proxying - [https://www.digitalocean.com/community/tutorials/understanding-nginx-http-proxying-load-balancing-buffering-and-caching](https://www.digitalocean.com/community/tutorials/understanding-nginx-http-proxying-load-balancing-buffering-and-caching)

#### headers

```
proxy_set_header X-Real-IP  $remote_addr;
proxy_set_header X-Forwarded-For $remote_addr;
proxy_set_header Host $host;
```

#### env vars in config

[https://docs.docker.com/samples/library/nginx/\#using-environment-variables-in-nginx-configuration](https://docs.docker.com/samples/library/nginx/#using-environment-variables-in-nginx-configuration)

1. Create upstreams.conf.template. wrap vars with ${}
   ```
   upstream jaasmanda {
       server ${JAAS_MANDA};
   }
   ```
2. process vars. will copy processed to /etc/nginx/snippets/upstreams.conf
   ```
   export JAAS_MANDA=$(ip route | grep default | cut -d ' ' -f 3):8080
   envsubst < /etc/nginx/conf.d/upstreams.conf.template > /etc/nginx/snippets/upstreams.conf && nginx -g 'daemon off;'
   ```
3. include upstreams.conf in nginx.conf
   ```
   include /etc/nginx/snippets/upstreams.conf;
   ```

## microservices

[https://www.nginx.com/blog/building-microservices-using-an-api-gateway/](https://www.nginx.com/blog/building-microservices-using-an-api-gateway/)



