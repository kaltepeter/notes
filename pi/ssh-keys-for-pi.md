# ssh keys for pi

[https://www.raspberrypi.org/documentation/remote-access/ssh/passwordless.md](https://www.raspberrypi.org/documentation/remote-access/ssh/passwordless.md)

[http://www.aupcgroup.com/blog/index.php?/archives/4-Securing-Raspbian.html](http://www.aupcgroup.com/blog/index.php?/archives/4-Securing-Raspbian.html)

Run these on the machine accessing your pi:

`ssh-keygen -t rsa -C pi@raspberrypi -f ~/.ssh/raspberrypi`

`cat ~/.ssh/raspberrypi.pub | ssh pi@raspberrypi 'cat >> .ssh/authorized_keys'`

