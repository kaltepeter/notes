# python

[https://www.computerhope.com/issues/ch001721.htm](https://www.computerhope.com/issues/ch001721.htm) - extracting text

## installing on mac

[https://realpython.com/python-virtual-environments-a-primer/](https://realpython.com/python-virtual-environments-a-primer/)

install pyenv

```
brew install pyenv
# run init to complete auto load and follow instructions
pyenv init
```

example output says add the following to your profile:

```
eval "$(pyenv init -)"
```

This will auto load correct python version in project directories

install python versions

```
pyenv install 3.5.0 
pyenv install 3.6.5
```

set project version

```
 pyenv local 3.5.0
```

create venv

```
python -m venv env
```

### 

### older option

[https://hackercodex.com/guide/python-development-environment-on-mac-osx/](https://hackercodex.com/guide/python-development-environment-on-mac-osx/)

update from default install

```
brew install python3
```

to update pip3

```
pip3 install --upgrade pip setuptools wheel
```

#### virtual env

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

create env

```
virtualenv -p python3 .pyenv
```

update or install global packages

```
gpip install --upgrade pip setuptools wheel virtualenv
```

activate virtualenv

```
cd .pyenv
source bin/activate
```

## package dependencies

[http://docs.python-guide.org/en/latest/dev/virtualenvs/](http://docs.python-guide.org/en/latest/dev/virtualenvs/)

## tools

### linting

[https://blog.sideci.com/about-style-guide-of-python-and-linter-tool-pep8-pyflakes-flake8-haking-pyling-7fdbe163079d](https://blog.sideci.com/about-style-guide-of-python-and-linter-tool-pep8-pyflakes-flake8-haking-pyling-7fdbe163079d)

### packages

pylint: `pip install pylint`

pep8: `pip install pep8`

autopep8: `pip install autopep8`

pyocr: `pip install pyocr`

### install imagemagick for wand

[https://stackoverflow.com/questions/37011291/python-wand-image-is-not-recognized](https://stackoverflow.com/questions/37011291/python-wand-image-is-not-recognized)

use version 6 until 7 is ready

```
brew install imagemagick@6
brew link imagemagick@6 --force
pip install Wand
```

add following to .profile or .zshrc, .bashrc, etch

```
export MAGICK_HOME="/usr/local/opt/imagemagick@6"

export PATH="$MAGICK_HOME/bin:$PATH"
```

symlink lib

ln -s $MAGICK\_HOME/lib/libMagickWand-6.Q16.dylib /usr/local/lib/libMagickWand.dylib



install ghostscript

```
brew install ghostscript

```





