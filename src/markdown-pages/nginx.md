---
title: NGINX
date: 2021-01-14
tags:
---

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

## install on ubuntu 14.04 (trsusty)

https://www.phusionpassenger.com/library/install/nginx/install/oss/trusty/

```bash
sudo apt-get install -y dirmngr gnupg
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 561F9B9CAC40B2F7
#sudo apt-key adv --recv-keys --keyserver keyserver.ubuntu.com 16126D3A3E5C1192

sudo apt-get install -y apt-transport-https ca-certificates

#sudo sh -c 'echo deb https://oss-binaries.phusionpassenger.com/apt/passenger trusty main > /etc/apt/sources.list.d/passenger.list'

sudo sh -c 'echo deb https://oss-binaries.phusionpassenger.com/apt/passenger/4 trusty main > /etc/apt/sources.list.d/passenger.list'


sudo apt-get update

#sudo apt-get install nginx-common
sudo apt-get install nginx nginx-extras passenger
```
