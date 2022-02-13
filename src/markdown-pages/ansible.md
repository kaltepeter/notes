---
title: Ansible
date: 2022-02-13
tags:
- automation
---

<https://medium.com/geekculture/ansible-2-10-installation-on-mac-os-x-add6a1034c16> - high level walkthrough

<https://docs.ansible.com/ansible/latest/user_guide/index.html#getting-started> - documentation


## Python versions

If your default python does not match the target version ansible may complain. Adding the shebang for python3 to your hosts file fixes that.

```bash
#!/usr/bin/env python3
```

## Local machine setup

<https://blog.laurentcharignon.com/post/laptop-setup-with-ansible/>

<https://www.talkingquickly.co.uk/2021/01/macos-setup-with-ansible/>

<https://pbassiner.github.io/blog/automating_my_dev_setup.html>

<https://github.com/ThePrimeagen/ansible> - The Primeagen ansible setup

## Use ansible to install homebrew

<http://rapidprogrammer.com/how-to-install-homebrew-with-ansible>

<https://stackoverflow.com/a/63734604/3195475> - dealing with brew install permission issues

<https://github.com/geerlingguy/mac-dev-playbook/issues/126> - permissions issues for mac playbook

<https://github.com/Homebrew/install/blob/master/install.sh> - homebrew install script

<https://gist.github.com/irazasyed/7732946> - homebrew permission fix, not secure

## Collections

<https://githubhelp.com/geerlingguy/ansible-collection-mac>

## sample repos

<https://github.com/geerlingguy/mac-dev-playbook>

<https://github.com/TalkingQuickly/ansible-osx-setup>

## Flow Control

<https://prefetch.net/blog/2018/01/06/using-the-output-of-a-command-to-control-ansible-playbook-flow/>


## File system

<https://github.com/ansible/ansible/issues/25596> - permissions of parents

## debugging

<https://linuxhint.com/print-command-output-ansible/>
