---
title: Developer Productivity V2
date: 2025-12-05
tags:
  - course
---

https://frontendmasters.com/workshops/developer-productivity-v2/#player

https://frontendmasters.github.io/dev-prod-2/

https://github.com/theprimeagen/dev

```bash
#!/usr/bin/env bash

script_dir="$(cd $(dirname "${BASH_SOURCE[0]}") && pwd)"
filter=""
dry="0"

cd $script_dir
scripts=$(find runs -maxdepth 1 -mindepth 1 -executable -type f)

while [[ $# > 0 ]]; do
    if [[ "$1" == "--dry" ]]; then
        dry="1"
    else
        filter="$1"
    fi
    shift
done

log() {
    if [[ $dry == "1" ]]; then
        echo "[DRY_RUN]: $@"
    else
        echo "$@"
    fi
}

execute() {
    log "execute: $@"
    if [[ $dry == "1" ]]; then
        return
    fi

    "$@"
}

log "run: filter=$filter"

for script in $scripts; do
    if echo "$script" | grep -qv "$filter"; then
        log "filtered: $filter -- $script"
        continue
    fi
    log "running script: $script"
    execute ./$script
done
```

```bash
#!/usr/bin/env bash

git clone git@github.com:neovim/neovim.git ~/personal/neovim
cd ~/personal/neovim
git fetch
git checkout v0.9.2

sudo apt install cmake gettext lua5.1 liblua5.1-0-dev
make CMAKE_BUILD_TYPE=RelWithDebInfo
sudo make install
```

## dotfiles

`pushd` pushes location onto stack. 
`popd` pops location off stack.

`$XDG_CONFIG_HOME` is a nix thing that is usually `~/.config`

Mac doesn't natively support it. https://stackoverflow.com/questions/3373948/equivalents-of-xdg-config-home-and-xdg-data-home-on-mac-os-x

For macOS, the equivalent locations are typically:

`$XDG_CONFIG_HOME` can be set to `~/Library/Application Support` or `~/.config`.
`$XDG_DATA_HOME` can be set to `~/Library/Application Support` or `~/.local/share`.
`$XDG_CACHE_HOME` can be set to `~/Library/Caches` or `~/.cache`.

```bash
#!/usr/bin/env bash
dry="0"
XDG_CONFIG_HOME="$HOME/.fem-config"

while [[ $# > 0 ]]; do
    if [[ "$1" == "--dry" ]]; then
        dry="1"
    fi
    shift
done

log() {
    if [[ $dry == "1" ]]; then
        echo "[DRY_RUN]: $@"
    else
        echo "$@"
    fi
}

execute() {
    log "execute: $@"
    if [[ $dry == "1" ]]; then
        return
    fi

    "$@"
}

log "--------- dev-env ---------"

copy_dir() {
    from=$1
    to=$2

    pushd $from > /dev/null
    dirs=$(find . -mindepth 1 -maxdepth 1 -type d)
    for dir in $dirs; do
        execute rm -rf $to/$dir
        execute cp -r $dir $to/$dir
    done
    popd > /dev/null
}

copy_file() {
    from=$1
    to=$2

    name=$(basename $from)

    execute rm $to/$name
    execute cp $from $to/$name
}

copy_dir .config $XDG_CONFIG_HOME
copy_file .specialconfig $HOME
```

## Navigation

### window manager

- [pop os](https://github.com/pop-os/shell?utm_source=taoofmac.com&utm_medium=web&utm_campaign=unsolicited_traffic&utm_content=external_link)
- [i3](https://i3wm.org/)
- [awesomewm](https://awesomewm.org/)
- [leftwm](https://leftwm.org/)
- [yabai (mac)](https://github.com/koekeishiya/yabai)

user mentioned
- [magnet](https://magnet.crowdcafe.com/?utm_source=taoofmac.com&utm_medium=web&utm_campaign=unsolicited_traffic&utm_content=external_link)
- [rectangle](https://rectangleapp.com/)

### opening programs

- [rofi](https://github.com/davatorium/rofi)
- [dmenu](https://linux.die.net/man/1/dmenu)
- mac: built in finder

## terminal experience

- sessions that last even when i close my terminal
- multiple running sessions, and these sessions are based on directory
- "tabs" within a session
- navigate to any session by directory name "instantly"
- navigate to any session by directory with fuzzy find
- run scripts or whatever programs i want when navigating to a directory

- [tmux](https://github.com/tmux/tmux)
- [WezTerm](https://wezfurlong.org/wezterm/index.html)
- [ghostty](https://ghostty.org/)
- [Zellij](https://zellij.dev/)

`brew install tmux`
`brew install --cask ghostty`

### tmux

```conf
set -g default-terminal "tmux-256color"
set -s escape-time 0
set -g base-index 1

# optional -- i like C-a not C-b (pure preference)
unbind C-b
set-option -g prefix C-a
bind-key C-a send-prefix

# vi key movement for copy/pasta mode
set-window-option -g mode-keys vi
bind -T copy-mode-vi v send-keys -X begin-selection
bind -T copy-mode-vi y send-keys -X copy-pipe-and-cancel 'xclip -in -selection clipboard'

# <WHERE YOUR TMUX CONF GOES> = XDG_CONFIG_HOME/tmux/tmux.conf
# <WHERE YOUR TMUX CONF GOES> = ~/.tmux.conf
bind r source-file <WHERE YOUR TMUX CONF GOES> \; display-message "tmux.conf reloaded"
```

default prefix is `ctrl + b`, if you used ^^ it will be `ctrl + a`

`prefix + c` creating window
`prefix + d` detaching
`prefix + num` navigate to that window num
`tmux attach` or `tmux a` attach previous session
`prefix + w` showing all running sessions
`x` in show all running sesions will kill session
`ctrl + d` kill terminal and pane / window / session 
`prefix + "` horizontal split
`prefix + %` vertical split
`prefix + z` focus on pane, repeat to unfocus
`prefix + L` go back to previous session


navigating can be confusing, can be mapped to vim keys

```conf
bind -r h select-pane -L
bind -r j select-pane -D
bind -r k select-pane -U
bind -r l select-pane -R
```

`tmux new-session -s <sname> -n <initial wname> -d[etach]` create a new session and detach current session
`tmux list-sessions` list all sessions
`tmux attach-session -t <target>`
`tmux has-session -t <target>` # don't forget -t vs -t=, `-t` is first part of match, `-t=` is exact match
`tmux switch-client -t <target>`

`tmux new-window -n <name> [-t session:window_index]` or `tmux neww` create new window
`tmux list-windows [-t session]` list all windows
`tmux select-window -t session:[window_idx | window_name].[pane_idx]` select window

`tmux send-keys -t <target> "text" [ctrl keys,...]` sends commands to target. e.g. `tmux send-keys -t dev:foobar "echo hello"`. adding `^M` will execute the command. e.g. `tmux send-keys -t dev:foobar "echo hello" ^M`


### opening script

create `.local/scripts` in your dotfile repo. Add a file called `ready-tmux` in scripts and paste thee following:

```bash
#!/usr/bin/env bash

if [[ -x ./.ready-tmux ]]; then
    ./.ready-tmux
elif [[ -x ~/.ready-tmux ]]; then
    ~/.ready-tmux
fi
clear
```

add the script to your path. 

```bash
export PATH="$HOME/.local/scripts:$PATH"
```

create another file in any directory called `.ready-tmux` and paste the following:

```bash
#!/usr/bin/env bash

tmux new-window -n foofoo
```

naviate to the directory with the `.ready-tmux` file. Enter `tmux` and run `ready-tmux`.

## fcf

https://junegunn.github.io/fzf/

`brew install fzf`

`source <(fzf --zsh)` to zsh config.

notice `ctrl + r` is a fuzzy finder.

`echo "1\n2\n3\n" | fzf` will display a selectable list. Choossing the option will echo that one.

## tmux sessionizer

```bash
#!/usr/bin/env bash

selected=$(find ~/personal -mindepth 1 -maxdepth 1 -type d | fzf)
if [[ -z $selected ]]; then
    exit 0
fi

selected_name=$(basename "$selected" | tr ":,. " "____")

switch_to() {
    if [[ -z $TMUX ]]; then
        tmux attach-session -t "$selected_name"
    else
        tmux switch-client -t "$selected_name"
    fi
}

if tmux has-session -t="$selected_name" 2> /dev/null; then
    switch_to
    exit 0
fi

tmux new-session -ds "$selected_name" -c "$selected"
switch_to
tmux send-keys -t "$selected_name" "ready-tmux" ^M

```

`vim.keymap.set("n", "<C-f>", "<cmd>silent !tmux neww tmux-sessionizer<CR>")` in vim to run sessionizer. 

`bind-keyu -r f run-shell "tmux neww ~/.local/bin/tmux-sessionizer"` in tmux.conf

## jq

https://jqlang.org/

`brew install jq`

create a file `sample.json` with these contents:

```json
{"type": "foo", "values": [1, 2, 3, 4, 5]}
{"type": "foo", "values": [69, 420, 42, 69420]}
{"type": "bar", "values": {"a": 42, "b": 69}}
{"type": "bar", "values": {"a": 1337, "b": 420}}
{"type": "bar", "values": {"a": 111, "b": 222}}
```

```bash
cat sample.json
cat sample.json | jq
cat sample.json | jq -c

# filter by type
cat sample.json | jq  'select(.type == "foo")'
# get values of filtered items
cat sample.json | jq  'select(.type == "foo") | .values'
# sum of filtered items values
cat sample.json | jq  'select(.type == "foo") | .values | add' -c
# add valueSum to each item
cat sample.json | jq  'select(.type == "foo") | .valueSum = (.values | add)' -c
# select items with sum > 20
cat sample.json | jq  'select(.type == "foo") | .valueSum = (.values | add) | select(.valueSum > 20)' -c
```

vim `!jq`

## sed

fighting one eyed curvy `"\(.*\)"

vim: `:` then `%s/: "\(.*\)",/: "\1\1",`

`cat sample.json | sed 's/: "\(.*\)",/: "\1,\1",/'`

## find

```bash
find . -maxdepth 1 -mindepth 1 -type f -exec grep -Hn "foo" {} \;
```

## xargs

```bash
echo "1\n2\n3" | xargs -I {} curl https://{}.com
```

## parallel

https://savannah.gnu.org/projects/parallel/

`brew install parallel`

create a `count` file with the following contents:

```txt
1
2
3
4
5
6
7
8
9
```

```bash
cat count | parallel -j 5 "curl https://{}.com"
# preserve order
cat count | parallel -kj 2 "curl https://{}.com"
```

## awk

```bash
ps aux | grep vim | awk '{ sum += $2 } END { print sum }'
```

## editors

editor: https://zed.dev/

https://github.com/nvim-lua/kickstart.nvim

https://frontendmasters.com/courses/vim-fundamentals/

neovim: use your name to group your configs and avoid conflict 

## vim

`df(` delete up to and include `(`
`dj` delete current line and one below
`ct(` delete up to and include `(` and insert
`v` visual mode
`ap` in visual mode and select the paragraph
`d` is delete, combine with `ap` to delete the paragraph
`yap` yank the paragraph
`dip` delete inside paragraph
`yiW` yank inside word
`ci"` change inside quotes
`d2i(` delete up to and include two sets of parentheses
`Vf{%y` visual mode and find the next `{%` and yank it i.e. copy function

quick fix list from search results to navigate results

`:cdo <command>` execute command on all results in the quick fix list

use:
- stack trace to quick fix list could be useful
- add lsp refs to quick fix list

harpoon is sticky files for quick swap

`%s` every line sed

`%s/mul

https://adventofcode.com/2024/day/3

`xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`

vim:`:` `%s/\(mul(\d\{1,3},\d\{1,3})\)/\1\r/g`

vim:`:` `%s/.*mul(\(\d\{1,3}\),\(\d\{1,3}\))/\1*\2/`

vim:`:` `s/\n/+`
vim: `V` to select line
vim: `:` `!bc`

https://frontendmasters.com/learn/fullstack/

`nvim test.lua`

https://www.lua.org/

`:so` execute lua file

`vim.api.nvim_open_win(0, true, { relative = "win", row = 3, col = 3, width = 12, height = 3 })`

`ctrl + w` to get window commands, `o` to close all

```lua
local function read_file_with_system(filename)
  local pipe = vim.system({"cat", filename})
  local content = pipe:wait().stdout
  local lines = vim.split(content, "\n", { trimempty = true })
  return lines
end

local api = vim.api
local buf = api.nvim_create_buf(false, true)
local win = api.nvim_open_win(buf, false, {
    relative="editor",
    width=80,
    height=24,
    row=0,
    col=0,
})
api.nvim_buf_set_lines(buf, 0, -1, false, read_file_with_system("./package.json"))

vim.defer_fn(function()
    api.nvim_win_close(win, true)
end, 5000)
```

## ai

ask ai to create a plugin to interface with an ai api

## vimbegood

`:VimBeGood`

## updates

edit dev and copy to live location

