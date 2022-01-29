# VIM Fundamentals

https://theprimeagen.github.io/vim-fundamentals/

https://vim.rtorr.com/

https://vimways.org/2019/writing-vim-plugin/ - plugin tutorial

https://github.com/tpope/vim-fugitive - git nav in vim 


## Cheat Sheet

| Key | Use                                 |
|-----|-------------------------------------|
| j   | move down                           |
| k   | move up                             |
| l   | move right                          |
| h   | move left                           |
| w   | jump forward to word boundry        |
| b   | jump backward to word boundry       |
| yy  | copy lines, called yank             |
| dd  | delete line                         |
| p   | paste below                         |
| P   | paste above                         |
| _   | first non whitespace of line        |
| t"  | go to before "                      |
| f   | find char                           |
| I   | insert at beginning of line         |
| c   | delete and enter insert mode        |
| cc  | delete line and enter insert        |
| D   | delete from cursor to end of line   |
| S   | delete line and insert              |
| fT  | forward to T char                   |
| dt) | (d)elete (t) ), replace if          |
| {   | jump backward paragraph             | 
| }   | jump forward paragraph              |
| ]m  | jump to open squirly                |
| %   | jump between pairs, [{(             |
| di{ | delete between squirly brace        |
| diw | delete from within word             |

## Modes

(n) Normal
  `zz`: re-center window scroll
  `mA` mark with A as global mark
  `'A` navigate to mark
  `mb` mark within a file
  `ctrl+^` back to prev file
  `ctrl+o` jump back to where you were
  `"byy` yank into b register
  `"bp` paste from b register
  `ctrl+u` page up jump
  `ctrl+d` page down jump

(i) Insert  
  `i`: insert left of cursor
  `a`: insert right of cursor
  `I`: insert at beginning of line
  `A`: insert at end of line
  `o`: insert below line
  `O`: insert above line

(v) Visual
(V) Visual Line
(ctrl+w) window mode


## Commands

`:reg`: show register of commands
`:set scrolloff=8` set the scroll to auto scroll when 8 lines remain
`:set number` add line numbers
`:set relativenumber` or `:set rnu` set the current line as relative to count lines
  `6dj`: delete 6 lines from current position, same as `7dd`
  `V6jd`: visually select 6 lines and delete
`:set norelativenumber` turn off relative numbers
`:h expandtab` view help for expandtab
`:h expand ctrl+d` expand help popup menu
`:colorscheme koehler` set color to koehler
`:Ex` explore current dir
`:Sex` split explorer
`:Vex` vertical split explorer `ctrl+w+o` close splits
`:so %` source current file
`:e` edit, use glob patterns for fuzzy find
`:ju` see jump list
`:w` write file
`:set hls ic` set highlight and incremental search
`qa` begin recording macro a
`q` quit recording macro


## .vimrc

Edit `~/.vimrc`

```bash
set scrolloff=8
set number
set relativenumber
set tabstop=4 softtabstop=4
set shiftwidth=4
set expandtab
set smartindent

call plug#begin('~/.vim/plugged')
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'junegunn/fzf.vim'
Plug 'ayu-theme/ayu-vim'
call plug#end()

set termguicolors     " enable true colors support
let ayucolor="mirage" " for mirage version of theme
colorscheme ayu

let mapleader = " "

nnoremap <leader>pv :Vex<CR>
nnoremap <leader><CR> :so ~/.vimrc<CR>
nnoremap <C-p> :GFiles<CR>
noremap <leader>pf :Files<CR>
vnoremap <leader>y "+y
nnoremap <leader>y "+y
```
