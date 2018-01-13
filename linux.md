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

#### 



