---
title: Developer Productivity
date: 2021-01-12
tags:
  - workshop
---

https://github.com/ThePrimeagen/dev-productivity

https://github.com/ThePrimeagen/dev-productivity/blob/main/lessons/ansible.md

https://github.com/ThePrimeagen/ansible/blob/master/Dockerfile

## Tmux

`apt install tmux`

Prefix key: `ctrl + b`

`tmux` start session
`tmux list-sessions` see list of sessions
`ctrl+b,(` or `ctrl+b,)` switch tmux sessions
`tmux new-session` start new session
`tmux attach` attach to session or `tmux a`
`tmux kill-server` kills tmux
`ctrl+b,d` close tmux, detaches tmux and exit session
`ctrl+b,w` navigate through tmux sessions
`ctrl+d` end of file, ends, detach
`ctrl+b,c` create window
`ctrl+b,p` nav prev window
`ctrl+b,n` nav prev window
`ctrl+b,7` nav to window 7
`ctrl+d` from window will just kill window
`tmux new-session -d -s "foo"` start a session named foo
`tmux new-window -n "foo" start a window named foo
`ctrl+b, %`split pane`ctrl+b,[` goes into vim mode

tmuxrc

```bash
set-window-option -g mode-keys vi
bind -T copy-mode-vi v send-keys -X begin-selection
bind -T copy-mode-vi y send-keys -X copy-pipe-and-cancel 'pbcopy -in -selection clipboard'
```

```bash
unbind C-b
set-option -g prefix C-a
bind-key C-a send-prefix

bind r source-file ~/.tmux.conf

set -g base-index 1

bind -r D neww -c "#{pane_current_path}" "[[ -e TODO.md ]] && nvim TODO.md || nvim ~/dotfiles/todo.md"
```

## Cheat Sheet

`curl cht.sh/find~exec` look for find-exec on cheat sheet
`curl cht.sh/golang/:learn` learn about golang

`tldr find` short hints on find

## Git

Git worktrees let you keep multiple branches active in your space.

`git worktree list` list worktrees
`git worktree add helpsomeone -b helpsomeone` checkout worktree on new branch called helpsomeone
`git log -S 106` show commits with the string 106
`git log -S 106 --one-line` show on oneline

From VIM

`:GcLog -S 106` and walk through logs in quick fix log

## Core Utils

`xargs` pass to next command
`tr ' ' '\n'` convert space to newline
`sort` sort list
`uniq -c` unique counts
`sort -nr` sort reverse by number
`bc` calc
`head -1` print first item

## VIM

`:set incsearch` set inc search

lookup vim tutor
