---
title: SSH Keys for PI
date: 2020-07-03
tags:
- IOT
---

[https://www.raspberrypi.org/documentation/remote-access/ssh/passwordless.md](https://www.raspberrypi.org/documentation/remote-access/ssh/passwordless.md)

[http://www.aupcgroup.com/blog/index.php?/archives/4-Securing-Raspbian.html](http://www.aupcgroup.com/blog/index.php?/archives/4-Securing-Raspbian.html)

Run these on the machine accessing your pi:

Replace 'user' with your login and host with the hostname.

`ssh-keygen -t ed25519 -C user@host -f ~/.ssh/raspberrypi`

`cat ~/.ssh/raspberrypi.pub | ssh user@host 'cat >> .ssh/authorized_keys'`
