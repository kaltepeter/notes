# python

[https://www.computerhope.com/issues/ch001721.htm](https://www.computerhope.com/issues/ch001721.htm) - extracting text

## installing on mac

[https://hackercodex.com/guide/python-development-environment-on-mac-osx/](https://hackercodex.com/guide/python-development-environment-on-mac-osx/)

update from default install

```
brew install python3
```

to update pip3

```
pip3 install --upgrade pip setuptools wheel
```

### virtual env

```
pip3 install virtualenv
mkdir -p ~/Projects ~/Virtualenvs ~/Library/Application\ Support/pip
vim ~/Library/Application\ Support/pip/pip.conf
```

add to file

```
[install]
require-virtualenv = true

[uninstall]
require-virtualenv = true
```


