# securing

https://www.raspberrypi.org/documentation/configuration/security.md

## create a user

https://www.raspberrypi.org/documentation/linux/usage/users.md

> SKEL \
Upon creating a new user, the contents of /etc/skel/ will be copied to the new user's home folder. You can add or modify dot-files such as the .bashrc in  /etc/skel/ to your requirements, and this version will be applied to new users.

```bash
sudo adduser myuser
sudo adduser myuser sudo
# verify sudo access
su myuser
sudo su
# if you get to root than you are good
# logout and login as new user myuser
```

### require password for sudo

```bash
sudo vi /etc/sudoers.d/010_pi-nopasswd

```

[https://www.jaredwolff.com/blog/passwordless-ssh-raspberry-pi/](https://www.jaredwolff.com/blog/passwordless-ssh-raspberry-pi/)

```bash
sudo useradd -m myuser
# enter password and validate
# test creds
su - myuser
```

## change password

Do this if you have not after first install.

### current user

```bash
passwd
```

### another user

```bash
sudo passwd myuser
```

