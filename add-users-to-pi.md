# add users to pi

[https://www.jaredwolff.com/blog/passwordless-ssh-raspberry-pi/](https://www.jaredwolff.com/blog/passwordless-ssh-raspberry-pi/)

```text
sudo useradd -m myuser
# enter password and validate
# test creds
su - myuser
```

## change password

```text
sudo passwd myuser
```

