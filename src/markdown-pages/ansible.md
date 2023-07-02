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
<https://www.middlewareinventory.com/blog/ansible-wait_for-examples/>

## File system

<https://github.com/ansible/ansible/issues/25596> - permissions of parents

## debugging

<https://linuxhint.com/print-command-output-ansible/>

## Parallel Tasks

<https://toptechtips.github.io/2019-07-09-ansible_run_playbooks_tasks_in_parallel/>

## Secrets

<https://www.redhat.com/sysadmin/ansible-playbooks-secrets>

- In theory vault is cryptographically secure and vaulted files can be checked in to public repos
- A linter can catch un-vaulted files
- Linking to a password manager lookup would be great, not everyone would use same one though. 1 password to pass in in arg.
- Using a password manager to write and env file and cleanup after could also work
- linking to full password vault is linking to much more than needed

## Pre-Tasks

### Difference between pre-task and task?

- Pre-tasks run first.
- Can be tagged

-

## Variables vs Facts

- used interchangeably
- facts are usually about hosts
- accessed same way

## Conditionally prompt for a variable?

<https://stackoverflow.com/questions/25466675/ansible-to-conditionally-prompt-for-a-variable>
<https://docs.ansible.com/ansible/latest/collections/community/general/onepassword_lookup.html>
<https://www.redhat.com/sysadmin/ansible-playbooks-secrets>

- not doable out of box
- pre-tasks with no-log may work
- env var file or lookup integration may be better

## Dealing with mac security

## Login to MAS

<https://github.com/tiiiecherle/osx_install_config/blob/master/03_homebrew_casks_and_mas/3b_homebrew_casks_and_mas_install/6_mas_appstore.sh>

<https://github.com/mas-cli/mas#%EF%B8%8F-known-issues>
