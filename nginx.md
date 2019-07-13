# nginx

proxying - [https://www.digitalocean.com/community/tutorials/understanding-nginx-http-proxying-load-balancing-buffering-and-caching](https://www.digitalocean.com/community/tutorials/understanding-nginx-http-proxying-load-balancing-buffering-and-caching)

https://www.digitalocean.com/community/tutorials/understanding-nginx-server-and-location-block-selection-algorithms - matching algorithms 

https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-16-04 - manager server blocks

https://www.linode.com/docs/web-servers/nginx/how-to-configure-nginx/

### headers

```text
proxy_set_header X-Real-IP  $remote_addr;
proxy_set_header X-Forwarded-For $remote_addr;
proxy_set_header Host $host;
```

### env vars in config

[https://docs.docker.com/samples/library/nginx/\#using-environment-variables-in-nginx-configuration](https://docs.docker.com/samples/library/nginx/#using-environment-variables-in-nginx-configuration)

1. Create upstreams.conf.template. wrap vars with ${}

   ```text
   upstream jaasmanda {
       server ${JAAS_MANDA};
   }
   ```

2. process vars. will copy processed to /etc/nginx/snippets/upstreams.conf

   ```text
   export JAAS_MANDA=$(ip route | grep default | cut -d ' ' -f 3):8080
   envsubst < /etc/nginx/conf.d/upstreams.conf.template > /etc/nginx/snippets/upstreams.conf && nginx -g 'daemon off;'
   ```

3. include upstreams.conf in nginx.conf

   ```text
   include /etc/nginx/snippets/upstreams.conf;
   ```

## microservices

[https://www.nginx.com/blog/building-microservices-using-an-api-gateway/](https://www.nginx.com/blog/building-microservices-using-an-api-gateway/)

