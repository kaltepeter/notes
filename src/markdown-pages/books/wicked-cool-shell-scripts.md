---
title: Bash
date: 2025-03-29
tags:
  - nix
  - macos
  - shell
  - book
---

- [Book](https://www.nostarch.com/wcss2/)
- [Resources](https://nostarch.com/download/WickedCoolShellScripts2e_resources_updated.zip)

## Path 

```bash
echo $PATH
which echo
which ruby
```

- Path is the place where the shell looks for commands. 
- If your command is not in one of these locations, it will not be found.
- The order matters, the first match is used.
- `which` will tell you where a command is located.

## Login Script

Everytime you open a shell, the shell will run the login script. This will be a file in your home (`$HOME`) directory.

It may be `.login`, `.profile`, `.bashrc`, or `.bash_profile`.

On macOS, this is `.zshrc` and `.bashrc`.

## Permissions

`chmod +x <file>` allow exectuution

## Shebang

- `#!/bin/bash` - tells the system to use bash to execute the script
- `#!/usr/bin/env bash` - tells the system to use the bash executable in the path

## POSIX

Standard for UNIX style operating systems, Portable Operating System Interface.

## Finding Programs

`MAILER` and `PAGER` should define the default mail and pager programs.

## Variables / Parameter Expansion

`${var%${var#?}}` is equivalent to `${var:0:1}` and POSIX compliant. The inner call of `${var#?}` extracts everything but the first character from the variable. The outer call of `${var%${var#?}}` then removes the first character from the variable.
`${parameter:=word}` sets the value of the variable to `word` if it is unset or null.
`${parameter#word}` removes the shortest match of the pattern from the front of the variable.

## Inputs

- `$#` is the number of arguments passed to the script.
- `$$` is the process ID of the current shell.

```bash
while getopts "d:t:" opt; do
 case $opt in
   d ) DD="$OPTARG"    ;;
   t ) TD="$OPTARG"    ;;
 esac
done
shift $(($OPTIND - 1))
```

## Splitting Strings

```bash
integer=$(echo $1 | cut -d. -f1)        # left of the decimal
decimal=$(echo $1 | cut -d. -f2)        # right of the decimal
```

## Redirection

`>&2` redirects standard output to standard error.

## Debugging

- `sed -n 19p ~/bash_scripts/hilow` will print the 19th line of the file.
- `grep "" ~/bash_scripts/hilow | egrep -v '.*".*".*'` will print the lines that have a double quote in them without a second double quote.