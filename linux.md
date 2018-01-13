# Linux

#### vmstat

```
vmstat
vmstat -S M # show in MB
free -m ; sync # show free mem and write current
sudo bash -c "echo 3 > /proc/sys/vm/drop_caches" # clean cache
free -m # show memory
vmstat 5 3 # run 3 times every 5 sec
```

list vm stats. memory, disk, etc

#### who

```
who
who -l # who is logged in and process
who -T # is messaging turned on
mesg # send message to user
```

#### netstat

```
netstat -alt # list tcp/udp active ports
netstat -alx # list all tcp/udp/sockets
netstat -i # list interfaces
netstat -s #
```

#### top

```
top
```

#### ps

```
ps # list process
ps all # list all process
```

#### pstree

```
pstree #show systemd tree
```

#### lsof

```
lsof -i # list network
```

#### iptables

```
sudo iptables -nvL # show data in/out
```

#### watch

```
watch -d sudo iptables -nvL # show every 2 sec and highlight changes
```

#### systat

```
apt-get install sysstat
sudo vi /etc/default/sysstat # turn it on with boolean
cat /etc/cron.d/sysstat # list cron jobs

sar # command to review sysstat
sar -q 1 3 # display load avg 3 times 1 sec int
sar -q -f /var/log/sysstat/sa15 # ubuntu read day 15

```



