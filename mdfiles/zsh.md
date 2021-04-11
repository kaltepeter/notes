# zsh

## install zsh

[https://github.com/robbyrussell/oh-my-zsh/wiki/Installing-ZSH](https://github.com/robbyrussell/oh-my-zsh/wiki/Installing-ZSH)

1. `sudo xcodebuild -license accept`
2. `brew install zsh zsh-completions`
3. `zsh --version`
4. `sudo echo "$(which zsh)" >> /etc/shells (brew may do this for you)`
5. `chsh -s $(which zsh)`
6. restart terminals

## oh-my-zsh

[https://github.com/robbyrussell/oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)

1. `sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`

## material theme for shell

[https://github.com/carloscuesta/materialshell](https://github.com/carloscuesta/materialshell)

1. `curl -o ~/Downloads/material-dark.terminal https://raw.githubusercontent.com/carloscuesta/materialshell/master/shell-color-themes/macOS/terminal/materialshell-dark.terminal`
2. `curl -o ~/Downloads/material-oceanic.terminal https://raw.githubusercontent.com/carloscuesta/materialshell/master/shell-color-themes/macOS/terminal/materialshell-oceanic.terminal`
3. https://github.com/carloscuesta/materialshell/tree/master/shell-color-themes#macos

   follow this
4. https://github.com/robbyrussell/oh-my-zsh/wiki/Customization
   1. `curl -fsSL -o "$HOME/.oh-my-zsh/custom/themes/materialshell.zsh-theme" https://raw.githubusercontent.com/carloscuesta/materialshell/master/materialshell.zsh`
   1. Modify `.zshrc` to enable the theme with `ZSH_THEME="materialshell"`

## vars

[https://wiki.archlinux.org/index.php/environment\_variables](https://wiki.archlinux.org/index.php/environment_variables)

1. put them in ~/.profile
2. add `source ~/.profile` to `~/.zshrc` and `~/.bash_profile`

## speeding up zsh and oh-my-zsh

https://blog.jonlu.ca/posts/speeding-up-zsh

https://carlosbecker.com/posts/speeding-up-zsh/

raw perf numbers

```bash
for i in $(seq 1 10); do /usr/bin/time $SHELL -i -c exit; done
```

edit .zshrc

```zsh
# top of file
zmodload zsh/zprof

# end of file
zprof
```

test shell startup verbose

```zsh
zsh -i -c -v -x exit
```

## solarized theme

https://github.com/altercation/solarized

