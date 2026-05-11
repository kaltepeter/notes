---
title: "Shell: Security"
date: 2026-05-11
tags:
  - nix
  - security
---

## Passing Sensitive Variables

Esxamples can be run inside a container: `docker run -it alpine:3.22.4 sh` and adding curl `apk add curl`

### Passing as Command Environment Variable

```sh
supersecret=myfaketoken curl --header "Authorization: Bearer ${supersecret}" http://example.com &
ps auxww | grep curl; kill %1;
# <!doctype html><html lang="en"><head><title>Example Domain</title><meta name="viewport" content="width=device-width, initial-scale=1"><style>body{background:#eee;width:60vw;margin:15vh auto;font-family:system-ui,sans-serif}h1{font-size:1.5em}div{opacity:0.8}a:link,a:visited{color:#348}</style></head><body><div><h1>Example Domain</h1><p>This domain is for use in documentation examples without needing permission. Avoid use in operations.</p><p><a href="https://iana.org/domains/example">Learn more</a></p></div></body></html>

#    18 root      0:00 grep curl
# [1]+  Done                       curl --header "Authorization: Bearer ${supersecret}" http://example.com                     curl --header "Authorization: Bearer ${supersecret}" http://example.com
```

- variable is not visible in command
- may be visible to root and current user in `/proc/<PID>/environ`

```sh
curl --header "Authorization: Bearer myfaketoken" http://example.com &
ps auxww | grep curl; kill %1;
# <!doctype html><html lang="en"><head><title>Example Domain</title><meta name="viewport" content="width=device-width, initial-scale=1"><style>body{background:#eee;width:60vw;margin:15vh auto;font-family:system-ui,sans-serif}h1{font-size:1.5em}div{opacity:0.8}a:link,a:visited{color:#348}</style></head><body><div><h1>Example Domain</h1><p>This domain is for use in documentation examples without needing permission. Avoid use in operations.</p><p><a href="https://iana.org/domains/example">Learn more</a></p></div></body></html>

#    25 root      0:00 grep curl
# [1]+  Done                       curl --header "Authorization: Bearer myfaketoken" http://example.com
```

- plain text visible in the command