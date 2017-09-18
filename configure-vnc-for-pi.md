# configure VNC for Pi

[http://www.penguintutor.com/linux/tightvnc](http://www.penguintutor.com/linux/tightvnc)

```bash
apt-get install tightvncserver
tightvncserver # start
```

## Configure for service startup

#### save as /etc/systemd/system/tightvncserver.service

```
[Unit]
Description=TightVNC remote desktop server
After=sshd.service

[Service]
Type=dbus
ExecStart=/usr/bin/tightvncserver :1
User=root
Type=forking

[Install]
WantedBy=multi-user.target
```

```
chown root:root /etc/systemd/system/tightvncserver.service
```

```
chmod 755 /etc/systemd/system/tightvncserver.service
```

#### test script

```
systemctl start tightvncserver.service
```

#### enable at boot

```
systemctl enable tightvncserver.service
```



