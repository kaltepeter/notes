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

#### edit /etc/systemd/system/tightvncservice.service

```
ExecStart=/usr/bin/tightvncserver -localhost :1
```

#### connect from client \(tunnel\)

```
ssh pi@192.168.1.6 -L 5901:localhost:5901
apt-get install xtightvncviewer
xtightvncviewer 127.0.0.1:1
```



