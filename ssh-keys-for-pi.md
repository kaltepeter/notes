# ssh keys for pi

[https://www.raspberrypi.org/documentation/remote-access/ssh/passwordless.md](https://www.raspberrypi.org/documentation/remote-access/ssh/passwordless.md)

`ssh-keygen -t rsa -C pi@raspberrypi`

`cat ~/.ssh/pi_rsa.pub | ssh pi@raspberrypi 'cat >> .ssh/authorized_keys'`



