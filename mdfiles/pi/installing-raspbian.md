# Installing Raspbian

https://www.raspberrypi.org/documentation/installation/installing-images/

1. Download preferred version. https://www.raspberrypi.org/downloads/raspberry-pi-os/
   - *desktop*: for a gui/dev env
   - *lite*: for no gui, small system
1. Download and install etcher: https://etcher.io/
1. Run etcher
    1. Point the image to the downloaded zip
    1. Point the media to the sdcard to install on
    1. Click flash

## Desktop setup

1. Insert card in pi, startup and follow the wizard

## set default editor

```bash
sudo update-alternatives --set editor /usr/bin/vim.tiny
```

## set hostname

> *NOTE*: restart required

```bash
sudo vi /etc/hostname
# edit hostname in file and save :wq
sudo vi /etc/hosts
# replace any instance of old hostname with new and save :wq
```

## disable auto login

https://raspberrypi.stackexchange.com/questions/47823/how-to-prevent-autologin-of-gui

```bash
sudo sed -i.old -e 's:autologin-user=.*:autologin-user= :g' /etc/lightdm/lightdm.conf
ln -fs /etc/systemd/system/autologin@.service /etc/systemd/system/getty.target.wants/getty@tty1.service
```

## start in shell

```bash
systemctl set-default multi-user.target
```

## custom splash screen

https://yingtongli.me/blog/2016/12/21/splash.html

