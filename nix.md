# *nix

## vmstat

```text
vmstat
vmstat -S M # show in MB
free -m ; sync # show free mem and write current
sudo bash -c "echo 3 > /proc/sys/vm/drop_caches" # clean cache
free -m # show memory
vmstat 5 3 # run 3 times every 5 sec
```

list vm stats. memory, disk, etc

## who

```text
who
who -l # who is logged in and process
who -T # is messaging turned on
mesg # send message to user
```

## netstat

```text
netstat -alt # list tcp/udp active ports
netstat -alx # list all tcp/udp/sockets
netstat -i # list interfaces
netstat -s #
```

## top

```text
top
```

## ps

```text
ps # list process
ps all # list all process
```

## pstree

```text
pstree #show systemd tree
```

## lsof

```text
lsof -i # list network
```

## iptables

```text
sudo iptables -nvL # show data in/out
```

## watch

```text
watch -d sudo iptables -nvL # show every 2 sec and highlight changes
```

## systat

```text
apt-get install sysstat
sudo vi /etc/default/sysstat # turn it on with boolean
cat /etc/cron.d/sysstat # list cron jobs

sar # command to review sysstat
sar -q 1 3 # display load avg 3 times 1 sec int
sar -q -f /var/log/sysstat/sa15 # ubuntu read day 15

sar -w # context switch per sec
sar -n DEv # network interface stats
sar -b # overall activity
sar -q -s 10:00:00 -e 11:00:00 # between times for today
```

### parallel execution

[https://www.gnu.org/software/parallel/](https://www.gnu.org/software/parallel/)

## ssh keys

https://en.wikibooks.org/wiki/OpenSSH/Cookbook/Public_Key_Authentication#Downloading_keys

### get sshkey fingerprints

https://stackoverflow.com/questions/9607295/how-do-i-find-my-rsa-key-fingerprint

```bash
ssh-keygen -E md5 -lf ~/.ssh/id_dsa.pub
```

## tail process

https://unix.stackexchange.com/questions/58550/how-to-view-the-output-of-a-running-process-in-another-bash-session

```bash
tail -f /proc/<pid>/fd/1
```
