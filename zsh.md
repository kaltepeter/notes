# ZSH

## install zsh

[https://github.com/robbyrussell/oh-my-zsh/wiki/Installing-ZSH](https://github.com/robbyrussell/oh-my-zsh/wiki/Installing-ZSH)

1. `brew install zsh zsh-completions`
2. `zsh --version`
3. `sudo echo "$(which zsh)" >> /etc/shells`
4. `chsh -s $(which zsh)`
5. restart terminals

## oh-my-zsh

[https://github.com/robbyrussell/oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)

1. `sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`



## material theme for shell

[https://github.com/carloscuesta/materialshell](https://github.com/carloscuesta/materialshell)

[https://github.com/carloscuesta/materialshell/tree/master/shell-color-themes\#macos](https://github.com/carloscuesta/materialshell/tree/master/shell-color-themes#macos) follow this 

1. `mkdir "$HOME/.oh-my-zsh/custom/materialshell.zsh-theme" `
2. `curl -fsSL -o "$HOME/.oh-my-zsh/custom/materialshell.zsh-theme/materialshell.zsh" https://raw.githubusercontent.com/carloscuesta/materialshell/master/materialshell.zsh`
3. Modify `.zshrc` to enable the theme with `ZSH_THEME="materialshell"`


