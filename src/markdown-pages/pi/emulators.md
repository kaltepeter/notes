---
title: Emulators
date: 2020-07-03
tags:
- IOT
---

~~https://roboticsbackend.com/install-raspbian-desktop-on-a-virtual-machine-virtualbox/~~

~~https://thepi.io/how-to-run-raspberry-pi-desktop-on-windows-or-macos/~~

https://www.bluetin.io/raspberry-pi-raspbian-virtual-machine/

```md
Name: Raspbian Desktop
Type: Linux
Version: Debian (64-bit)
Memory: 1GB
Create Disk: VDI, defaults, 16G
```

```bash
sudo apt-get update
sudo apt-get upgrade

sudo apt-get install virtualbox-guest-dkms
sudo apt-get install virtualbox-guest-x11
sudo apt-get install linux-headers-$(uname -r)
sudo reboot now
```

```bash
sudo adduser pi vboxsf
sudo shutdown now
```

## circuit pi

https://learn.adafruit.com/circuitpython-on-raspberrypi-linux/installing-circuitpython-on-raspberry-pi

```bash
sudo apt-get install python3-pip
sudo pip3 install --upgrade setuptools
pip3 install RPI.GPIO
pip3 install adafruit-blinka

```

## remote dev in vscode

https://medium.com/@pythonpow/remote-development-on-a-raspberry-pi-with-ssh-and-vscode-a23388e24bc7

## serial

https://learn.adafruit.com/adafruits-raspberry-pi-lesson-5-using-a-console-cable/software-installation-mac


## setup APDS9960


```bash
sudo pip3 install adafruit-circuitpython-apds9960
```
