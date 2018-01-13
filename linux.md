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



