---
title: Curl
date: 2018-04-22
tags:
- nix
---


enable http2 - [https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=3&ved=0ahUKEwiYofW6qs7aAhVK4oMKHbNoCpAQFgg8MAI&url=https%3A%2F%2Fsimonecarletti.com%2Fblog%2F2016%2F01%2Fhttp2-curl-macosx%2F&usg=AOvVaw1Qy8bVgktSxEX8AHEPkYS2](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=3&ved=0ahUKEwiYofW6qs7aAhVK4oMKHbNoCpAQFgg8MAI&url=https%3A%2F%2Fsimonecarletti.com%2Fblog%2F2016%2F01%2Fhttp2-curl-macosx%2F&usg=AOvVaw1Qy8bVgktSxEX8AHEPkYS2)

## upload

pass output to &gt; /dev/null or file to see progress

[https://stackoverflow.com/questions/43197581/curl-upload-download-speed-test](https://stackoverflow.com/questions/43197581/curl-upload-download-speed-test)

## CORS

- <https://stackoverflow.com/questions/12173990/how-can-you-debug-a-cors-request-with-curl>

```bash
curl \
-H "Access-Control-Request-Method: GET" \
-H "Origin: http://localhost" \
--head \
http://www.example.com/
```
