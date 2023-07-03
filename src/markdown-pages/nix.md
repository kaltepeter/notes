---
title: \*nix
date: 2019-10-09
tags:
- nix
---

## file permissions (chmod)

<https://www.tutorialspoint.com/unix/unix-file-permission.htm>

| num | permission         | Ref |
|-----|--------------------|-----|
| 0   | No permission      | --- |
| 1   | Execute permission | --x |
| 2   | Write permission   | -w- |
| 4   | Read permission    | r-- |

The rest is math. e.g. 6 is:

> Read and write permission: 4 (read) + 2 (write) = 6

It's binary.

--- represents 3 positions of a binary number, max 7.

There are three groups of these. Representing : user - group - everyone else

Max permission is: 777. rwx for all three groups.

## commands

### vmstat

```text
vmstat
vmstat -S M # show in MB
free -m ; sync # show free mem and write current
sudo bash -c "echo 3 > /proc/sys/vm/drop_caches" # clean cache
free -m # show memory
vmstat 5 3 # run 3 times every 5 sec
```

list vm stats. memory, disk, etc

### who

```text
who
who -l # who is logged in and process
who -T # is messaging turned on
mesg # send message to user
```

### netstat

```text
netstat -alt # list tcp/udp active ports
netstat -alx # list all tcp/udp/sockets
netstat -i # list interfaces
netstat -s #
```

### top

```text
top
```

### ps

```text
ps # list process
ps all # list all process
```

### pstree

```text
pstree #show systemd tree
```

### lsof

```text
lsof -i # list network
```

### iptables

```text
sudo iptables -nvL # show data in/out
```

### watch

```text
watch -d sudo iptables -nvL # show every 2 sec and highlight changes
```

### systat

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

#### parallel execution

[https://www.gnu.org/software/parallel/](https://www.gnu.org/software/parallel/)

### ssh keys

General things. SSH keys identify and provide access. I am not a fan of sharing keys for the identifying access. It's not hard to automate keys and use a separate key per user. I also tend to want a separate key per machine, to split permissions and access, say work separate from home.

#### Generating Secure Keys

**Which algorithm?**

<https://goteleport.com/blog/comparing-ssh-keys/>

> The short answer to this is: as long as the key strength is good enough for the foreseeable future, it doesn't really matter. Because here we are considering a signature for authentication within an SSH session. The cryptographic strength of the signature just needs to withstand the current, state-of-the-art attacks.
-- <https://blog.peterruppel.de/ed25519-for-ssh/>

While GitHub used to recommend RSA, they now recommend 'ed25519' in their guide. They have one of the best guides and most common use of SSH so I prefer to keep aligned with that.

<https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent>

<https://en.wikibooks.org/wiki/OpenSSH/Cookbook/Public_Key_Authentication#Downloading_keys>

#### get sshkey fingerprints

<https://stackoverflow.com/questions/9607295/how-do-i-find-my-rsa-key-fingerprint>

```bash
ssh-keygen -E md5 -lf ~/.ssh/id_dsa.pub
```

#### Which algorithm?

<https://goteleport.com/blog/comparing-ssh-keys/>

Use `Ed25519` when possible, `RSA 2048/4096` are more compatible but slower.

#### saving passphrase for ssh

<https://www.linux.com/tutorials/manage-ssh-key-file-passphrase/>

```bash
# Specify your passphrase here
export YOUR_PASSPHRASE="XXX"

# Load protected key without prompt
echo "echo $YOUR_PASSPHRASE" > /tmp/mypass
chmod 700 /tmp/mypass
cat id_rsa| SSH_ASKPASS=/tmp/mypass ssh-add -

# Verify loaded certificate
ssh-add -l
```

### tail process

<https://unix.stackexchange.com/questions/58550/how-to-view-the-output-of-a-running-process-in-another-bash-session>

```bash
tail -f /proc/<pid>/fd/1
```

## security

### fail to ban

<https://www.techrepublic.com/article/how-to-install-fail2ban-on-ubuntu-server-18-04/>

```bash
sudo apt update
sudo apt upgrade
sudo apt install fail2ban

sudo systemctl start fail2ban
sudo systemctl enable fail2ban

sudo vi /etc/fail2ban/jail.local
```

paste in config: (jail.local)

```
[sshd]
enabled = true
port = 22
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
```

```bash
sudo systemctl restart fail2ban
```

to un-ban:

```bash
sudo fail2ban-client set sshd unbanip IP_ADDRESS
38.142.92.122
```

### chechking invalid auth

```bash
sudo grep -io 'Invalid user \(.*\) \([0-9\.]\)' /var/log/auth.log | sed 's/[Ii]nvalid user //' > invalid_auth.log
```

## port scanning

```bash
nmap (-sV)
```

## list standard ports

```bash
sudo less /etc/services
```

## firewall

ufw - uncomplicated firewall

```bash
sudo ufw status
sudo ufw allow ssh
sudo ufw enable
```

## Versions

- <https://www.debian.org/releases/>
- <https://www.debian.org/doc/manuals/debian-faq/choosing.en.html>


