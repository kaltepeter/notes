---
title: Python
date: 2020-07-19
tags:
- language
---

[https://www.computerhope.com/issues/ch001721.htm](https://www.computerhope.com/issues/ch001721.htm) - extracting text

[http://docopt.org](http://docopt.org) - cli doc generation

## Working with pip and default pythons

Mac currently comes with both python2 and python 3 installed. Python2 is mapped to the python command. In general avoid depending on system python, however, during machine bootstrapping it's a good start.

<https://docs.python-guide.org/starting/install3/osx/> - convert mac to python3 default

```bash
python --version
python3 --version
```

## setup pip

```bash
python3 -m pip --version # check for pip
python3 -m ensurepip --default-pip # install default pip
python3 -m pip install --upgrade pip setuptools wheel # get latest versions

```

<https://packaging.python.org/en/latest/tutorials/installing-packages/#id21>

## create virtual env

```bash
python3 -m venv tutorial_env
source tutorial_env/bin/activate
```

<https://packaging.python.org/en/latest/tutorials/installing-packages/#creating-virtual-environments>

## Install to user site

This works with non sudo permissions

```bash
python3 -m pip install --user SomeProject
```

## Access pip modules not on path

```bash
 "$(python3 -m site --user-base)"/bin/ansible-playbook
 ```

## installing on mac

[https://realpython.com/python-virtual-environments-a-primer/](https://realpython.com/python-virtual-environments-a-primer/)

<https://www.integralist.co.uk/posts/python-management/#managing-dependencies> - covers pyenv and versioning

install pyenv

```text
brew install pyenv
# run init to complete auto load and follow instructions
pyenv init
```

example output says add the following to your profile:

```text
eval "$(pyenv init -)"
```

This will auto load correct python version in project directories

install python versions

```text
pyenv install 3.5.0
pyenv install 3.6.5
```

set project version

```text
 pyenv local 3.5.0
```

create venv

```text
python -m venv env
```

### older option

[https://hackercodex.com/guide/python-development-environment-on-mac-osx/](https://hackercodex.com/guide/python-development-environment-on-mac-osx/)

update from default install

```text
brew install python3
```

to update pip3

```text
pip3 install --upgrade pip setuptools wheel
```

#### virtual env

Python 3 uses venv

[Upgrade process](https://stackoverflow.com/questions/71106411/how-to-upgrade-python-venv-version)

##### Workflow

1. cd into working directory
1. Create `python3.10 -m venv venv --prompt .`
1. Activate `source venv/bin/activate`
1. Deactivate when done `deactivate`

```text
pip3 install virtualenv
mkdir -p ~/Projects ~/Virtualenvs ~/Library/Application\ Support/pip
vim ~/Library/Application\ Support/pip/pip.conf
```

add to file

```text
[install]
require-virtualenv = true

[uninstall]
require-virtualenv = true
```

create env

```text
virtualenv -p python3 .pyenv
```

update or install global packages

```text
gpip install --upgrade pip setuptools wheel virtualenv
```

activate virtualenv

```text
cd .pyenv
source bin/activate
```

## package dependencies

~~[http://docs.python-guide.org/en/latest/dev/virtualenvs/](http://docs.python-guide.org/en/latest/dev/virtualenvs/)~~

```bash
pip freeze > requirements.txt # freeze all
pip install -r requirements.txt # install all fresh
```

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

```text
brew install imagemagick@6
brew link imagemagick@6 --force
pip install Wand
```

add following to .profile or .zshrc, .bashrc, etch

```text
export MAGICK_HOME="/usr/local/opt/imagemagick@6"

export PATH="$MAGICK_HOME/bin:$PATH"
```

symlink lib

ln -s $MAGICK\_HOME/lib/libMagickWand-6.Q16.dylib /usr/local/lib/libMagickWand.dylib

install ghostscript

```text
brew install ghostscript
```

## PDFs

tutorials: [http://stanford.edu/~mgorkove/cgi-bin/rpython\_tutorials/tutorials.php](http://stanford.edu/~mgorkove/cgi-bin/rpython_tutorials/tutorials.php)

## dependency management

<https://python-poetry.org/>

## Formatting

Prettier plugin deprecated for black

<https://github.com/psf/black>

```bash
pip install black
```

## Enums

```python
class NodeType(Enum):
    F = "FILE"
    D = "DIR"

print(NodeType.F)
```

## Tuple

`('root',)` is valid
`('root')` is not valid, the comma makes the tuple

remove last item (<https://www.geeksforgeeks.org/python-program-to-remove-last-element-from-tuple/>)

```python
tu = (1, 2, 3, 4, 5)
tu = list(tu)
tu.pop()
tu = tuple(tu)
print(tu) # (1, 2, 3, 4)
```

### append

```python
tu = (1,2,3,4)
tu += (5,)
print(tu) # 
```

## Dict

Using a tuple as key:

```python
list = {('root', 'a', 'b'): 80, ('root', 'a'): 20, ('root',): 100}
```

has item

```python
list = {('root', 'a', 'b'): 80, ('root', 'a'): 20, ('root',): 100}
if ('root', 'a') in list:
    print("found")
```

Merging

<https://peps.python.org/pep-0584/>

```python
d = {'spam': 1, 'eggs': 2, 'cheese': 3}
e = {'cheese': 'cheddar', 'aardvark': 'Ethel'}
print(d | e) # {'spam': 1, 'eggs': 2, 'cheese': 'cheddar', 'aardvark': 'Ethel'}
print(e | d) # {'cheese': 3, 'aardvark': 'Ethel', 'spam': 1, 'eggs': 2}

d |= e # in place
print(d) # {'spam': 1, 'eggs': 2, 'cheese': 'cheddar', 'aardvark': 'Ethel'}
```

getting a value deep in dict (<https://pypi.org/project/dpath/>)

```bash
pip install dpath
```

```python
import dpath
from enum import Enum


class NodeType(Enum):
    F = "FILE"
    D = "DIR"


file_tree = {
        "root": {
        "name": "root",
        "size": 0,
        "type": NodeType.D,
        "children": {
            "a": {
                "name": "a",
                "size": 0,
                "type": NodeType.D,
                "children": {
                    "e": {
                        "name": "e",
                        "size": 0,
                        "type": NodeType.D,
                        "children": {
                            "i": {
                                "name": "i",
                                "size": 584,
                                "type": NodeType.F,
                                "children": {},
                            },
                        },
                    },
                }
            }
        }
    }
}

cur_path = ['root', 'a', 'e']

target_node = dpath.get(file_tree, "/children/".join(cur_path))["children"]
print(target_node) # {'i': {'name': 'i', 'size': 584, 'type': <NodeType.F: 'FILE'>, 'children': {}}}
```

### TypeError 'set' object does not support item assignment

<https://stackoverflow.com/questions/40553742/typeerror-set-object-does-not-support-item-assignment>

Both dictionaries and sets use the same syntax. Be careful when initializing them.

## Typing

Tuple with variable length `Tuple[int, ...]`

## Loops

loop through list while reducing

```python
guest = ['john', 'phil', 'andy', 'mark', 'frank', 'joe']
while len(guest) > 2:
    popped_guest = guest.pop()
```

loop through dict

```python
items = { 'A': 'Geeks', 'B': 4, 'C': 'Geeks' }
for key, value in items.items():
    print(f"k: {key}, v: {value}")
```

## destructuring

```python
head, *tail = [1, 2, 3, 4, 5]
print(head)  # 1
print(tail)  # [2, 3, 4, 5]
```

## Eval

```python
def get_fn(old: int, op: str) -> int:
    return eval(op)

print(get_fn(79, "old * old")) # 6241
```

## Image Generation

<https://pillow.readthedocs.io/en/stable/reference/Image.html#PIL.Image.new>

<https://dev.to/petercour/generate-images-with-python-pil-302k>

<https://blog.devgenius.io/ascii-art-library-for-python-b37b45ed72fd>

<https://towardsdatascience.com/create-simple-optical-character-recognition-ocr-with-python-6d90adb82bb8>

## Numbers

<https://stackoverflow.com/questions/2104884/how-does-python-manage-int-and-long>

```python3
import sys
sys.maxsize # 9223372036854775807
```

Too large number:

```bash
ValueError('Exceeds the limit (4300) for integer string conversion; use sys.set_int_max_str_digits() to increase the limit'
```
