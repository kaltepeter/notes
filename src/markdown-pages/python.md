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

set global version

```bash
pyenv global 3.9
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

ln -s $MAGICK_HOME/lib/libMagickWand-6.Q16.dylib /usr/local/lib/libMagickWand.dylib

install ghostscript

```text
brew install ghostscript
```

## PDFs

tutorials: [http://stanford.edu/~mgorkove/cgi-bin/rpython_tutorials/tutorials.php](http://stanford.edu/~mgorkove/cgi-bin/rpython_tutorials/tutorials.php)

## dependency management

<https://python-poetry.org/>

## Formatting

Prettier plugin deprecated for black

<https://github.com/psf/black>

```bash
pip install black
```

## Flow Control

### Inline If

```python
a = "Hello" if foo() else "Goodbye"
```

### Loop Backwards

```python
for x in reversed(whatever):
    do_something()
```

## Enums

```python
class NodeType(Enum):
    F = "FILE"
    D = "DIR"

print(NodeType.F)
```

## Tuple

Tuples are immutable

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

### Subtracting

<https://www.geeksforgeeks.org/python-how-to-get-subtraction-of-tuples/>

```python
import numpy as np

# initialize tuples
test_tup1 = (10, 4, 5)
test_tup2 = (2, 5, 18)

# printing original tuples
print("The original tuple 1 : " + str(test_tup1))
print("The original tuple 2 : " + str(test_tup2))

# Subtraction of tuples using numpy
res = tuple(np.subtract(test_tup1, test_tup2))

# printing result
print("Resultant tuple after subtraction : " + str(res))
#This code is contributed by Edula Vinay Kumar Reddy
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

safe get. `.get` returns None, attempting to access direct errors

```python
inventory = {'Knife': 1, 'Health Kit': 3, 'Wood': 5}
print(inventory)
# print(inventory['Gold']) # error

print(inventory.get('Gold')) # None

print(inventory.keys())
print(inventory.values())

print(inventory.pop('Knife')) # 1
print(inventory) # {'Health Kit': 3, 'Wood': 5}
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

get a list of the first three items

`for id, bp in list(data.items())[:3]:`

### slicing

```python
import itertools

d = {1: 2, 3: 4, 5: 6}

dict(itertools.islice(d.items(), 2))

{1: 2, 3: 4}
```

### Dictionary Comprehension

<https://stackoverflow.com/questions/1747817/create-a-dictionary-with-comprehension>

```python
{key: value for key, value in zip(keys, values)}
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

<https://realpython.com/python-eval-function/>

```python
def get_fn(old: int, op: str) -> int:
    return eval(op)

print(get_fn(79, "old * old")) # 6241
```

passing local vars to eval

```python
eval(step, {}, {**part, END: success})
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

is numeric

```python
isinstance(value, (int, float, complex))
```

### int vs. float

- If you assign 1 it is int, 1.0 is float. (dynamic types) or type hint to be explicit
- No double in native python

### Complex Numbers

<https://realpython.com/python-complex-numbers/>

Can store real and imaginary, can access separately.

Uses `j` like `1j` for imaginary, most languages use `i` but to avoid confusion with engineering it uses `j`. `i` is also super common as a variable name while iterating.

## Functools

<https://www.geeksforgeeks.org/functools-module-in-python/>

## Higher order functions (Partial)

```python
def get_fn(op: Tuple[str, str, str]) -> Callable[[str | int, str | int], int]:
    left_item = int(op[0]) if op[0] != "old" else None
    right_item = int(op[2]) if op[2] != "old" else None
    match op[1]:
        case "*":
            return partial(multiply, a=left_item, b=right_item)
        case "+":
            return partial(add, a=left_item, b=right_item)
        case _:
            raise ValueError(f"Unknown instruction {op[1]}")

def test_get_fn():
    monkey_0_op = get_fn(("old", "*", "19"))
    monkey_1_op = get_fn(("old", "+", "6"))
    monkey_2_op = get_fn(("old", "*", "old"))
    assert monkey_0_op(a=79) == 1501
    assert monkey_1_op(a=54) == 60
    assert monkey_2_op(a=79, b=79) == 6241
```

## Performance

- <https://medium.com/analytics-vidhya/python-efficiency-reduce-computing-time-and-memory-usage-72129e94ff64>
- <https://www.geeksforgeeks.org/memory-profiling-in-python-using-memory_profiler/>
- <https://www.python.org/doc/essays/list2str/>
- <https://wiki.python.org/moin/PythonSpeed/PerformanceTips>
- <https://towardsdatascience.com/profiling-and-analyzing-performance-of-python-programs-3bf3b41acd16>

### Use Numpy for large number math

slow:

```python
def multiply(a: int, b: int) -> int:
    return a * b


def add(a: int, b: int) -> int:
    return a + b
```

significantly faster:

```python
def multiply(a: int, b: int) -> int:
    return np.multiply(a, b)


def add(a: int, b: int) -> int:
    return np.add(a, b)
```

### Use caching

```python
from functools import lru_cache, partial

@lru_cache(maxsize=None)
def run_fn_with_args(
    item: int, op: Callable[[str | int, str | int], int], args: Tuple[str, ...]
) -> int:
    new = 0
    if ("a",) == args:
        new = op(a=item)
    elif ("b",) == args:
        new = op(b=item)
    elif (
        "a",
        "b",
    ) == args:
        new = op(a=item, b=item)
    else:
        raise ValueError(f"Unknown args {op['old_args']}")

    return new

 new = run_fn_with_args(item, op, monkey["old_args"])
```

## Immutable Data

```python
from copy import deepcopy
monkeys = process_input(os.path.join(base_path, "input.txt"))
deepcopy(monkeys)
```

## list of things

```python
from itertools import chain

print([a for a in range(ord('a'), ord('z')+1)])
# [97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122]
print([chr(a) for a in range(ord('a'), ord('z')+1)])
# ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

# flatten list
test_list = ['gfg', 1, [5, 6, 'geeks'], 67.4, [5], 'best']
res = list(chain(*[ele if isinstance(ele, list)
                   else [ele] for ele in test_list]))
print(res)
# [‘gfg’, 1, 5, 6, ‘geeks’, 67.4, 5, ‘best’]
```

## Packages and Imports

<https://towardsdatascience.com/understanding-python-imports-init-py-and-pythonpath-once-and-for-all-4c5249ab6355>

<https://stackoverflow.com/questions/54598292/modulenotfounderror-when-trying-to-import-module-from-imported-package>

<https://realpython.com/absolute-vs-relative-python-imports/>

1. Create a `__init__.py` in each dir.
1. export pythonpath var

```bash
export PYTHONPATH=$PYTHONPATH:$(pwd)
```

## sorting

<https://learnpython.com/blog/python-custom-sort-function/>

Custom sort function. As of python3 use cmp_to_key to pass function.

return 1 if pair1 > pair2
return 0 if x == y
return -1 if pair1 < pair2

```python
from functools import cmp_to_key

def compare(pair1, pair2):
    number1, word1 = pair1
    number2, word2 = pair2
    if number1 == number2:
        if word1 < word2:
            return -1
        else:
            return 1
    if number1 < number2:
        return -1
    else:
        return 1

compare_key = cmp_to_key(compare)
s_list = sorted(my_list, key=compare_key)
```

sort by a value

```python
sorted(student_tuples, key=lambda student: student[2])
```

## Zip

Unequal lists default to ignored, it stops processing. Pass `strict=True` to raise exception.

```python
integers = [1, 2, 3]
letters = ['a', 'b', 'c']
floats = [4.0, 5.0, 6.0]
zipped = zip(integers, letters, floats)
print(list(zipped))
# [(1, 'a', 4.0), (2, 'b', 5.0), (3, 'c', 6.0)]
```

To keep all pairs with uneven, use `zip_longest`

```python
from itertools import zip_longest

numbers = [1, 2, 3]
letters = ['a', 'b', 'c']
longest = range(5)
zipped = zip_longest(numbers, letters, longest, fillvalue='?')
print(list(zipped))
# [(1, 'a', 0), (2, 'b', 1), (3, 'c', 2), ('?', '?', 3), ('?', '?', 4)]
```

## Debugging

<https://python.land/python-debugger>

```python
import pdb

breakpoint()
```

commands:

```bash
c # continue
s # step
p # print
pp # pretty print
n # next
```

## operators

`//` floor division, same as `math.floor(15/4)`

`15 / 4` = 3.75
`15 // 4` = 3

`%` is modulus

`5 % 2` = 1

`print(x_pos ** 2)` = 25, power of 2

## Set

<https://realpython.com/python-sets/>

## Breaking Loops

```python
def calculate_start_pipe(data: InputData) -> StartPipe:
    start_pipe = [(0, 0), ""]
    for y, row in enumerate(data):
        for x, col in enumerate(row):
            if col == "S":
                start_pipe[0] = (x, y)
                break
        else:
            continue
        break
```

For will loop while it has values. Else will run if no values. This will exit both loops.

are all values in a tuple are in a list

```python
d = {'dbpl': 5, 'zczc': 2, 'dvpt': 3, 'lfqf': 4, 'humn': 5, 'ljgn': 2, 'sllz': 4, 'hmdt': 32}
set(('sllz', 'dvpt')) <= set(d.keys()) # True
set(('sllz', 'sjmn')) <= set(d.keys()) # False
```

## Arrays

### Rotating

```python
def rotate90(grid: InputData):
    return ["".join(list(x)) for x in zip(*grid)]
```

### reversing

```python
above = note[:r][::-1]
```

### Reducing

<https://realpython.com/python-reduce-function/>
<https://stackoverflow.com/questions/15384143/reduce-list-based-on-index>

```python
out = [reduce(lambda a, b: a * b, i) for i in zip(x1, x2, x3)]
```

### Finding mirrors

```python
note = [
    "#.##..#",
    "..##...",
    "##..###",
    "#....#.",
    ".#..#.#",
    ".#..#.#",
    "#....#.",
    "##..###",
    "..##...",
]

for r in range(1, len(note)):
    above = note[:r]
    below = note[r:]

    print(r)
    print("above: ", above)
    print("below: ", below)
    print("")


```

```text
1
above:  ['#.##..#']
below:  ['..##...', '##..###', '#....#.', '.#..#.#', '.#..#.#', '#....#.', '##..###', '..##...']

2
above:  ['#.##..#', '..##...']
below:  ['##..###', '#....#.', '.#..#.#', '.#..#.#', '#....#.', '##..###', '..##...']

3
above:  ['#.##..#', '..##...', '##..###']
below:  ['#....#.', '.#..#.#', '.#..#.#', '#....#.', '##..###', '..##...']

4
above:  ['#.##..#', '..##...', '##..###', '#....#.']
below:  ['.#..#.#', '.#..#.#', '#....#.', '##..###', '..##...']

5
above:  ['#.##..#', '..##...', '##..###', '#....#.', '.#..#.#']
below:  ['.#..#.#', '#....#.', '##..###', '..##...']
...
```

reverse the top half

```python
note = [
    "#.##..#",
    "..##...",
    "##..###",
    "#....#.",
    ".#..#.#",
    ".#..#.#",
    "#....#.",
    "##..###",
    "..##...",
]

for r in range(1, len(note)):
    above = note[:r][::-1]
    below = note[r:]

    print(r)
    print("above: ", above)
    print("below: ", below)
    print("")

```

```text
1
above:  ['#.##..#']
below:  ['..##...', '##..###', '#....#.', '.#..#.#', '.#..#.#', '#....#.', '##..###', '..##...']

2
above:  ['..##...', '#.##..#']
below:  ['##..###', '#....#.', '.#..#.#', '.#..#.#', '#....#.', '##..###', '..##...']

3
above:  ['##..###', '..##...', '#.##..#']
below:  ['#....#.', '.#..#.#', '.#..#.#', '#....#.', '##..###', '..##...']

4
above:  ['#....#.', '##..###', '..##...', '#.##..#']
below:  ['.#..#.#', '.#..#.#', '#....#.', '##..###', '..##...']

5
above:  ['.#..#.#', '#....#.', '##..###', '..##...', '#.##..#']
below:  ['.#..#.#', '#....#.', '##..###', '..##...']
...
```

chop off extra

```python
note = [
    "#.##..#",
    "..##...",
    "##..###",
    "#....#.",
    ".#..#.#",
    ".#..#.#",
    "#....#.",
    "##..###",
    "..##...",
]

for r in range(1, len(note)):
    above = note[:r][::-1]
    below = note[r:]

    above = above[: len(below)]
    below = below[: len(above)]

    if above == below:
        print("match")

    print(r)
    print("above: ", above)
    print("below: ", below)
    print("")

```

```text
1
above:  ['#.##..#']
below:  ['..##...']

2
above:  ['..##...', '#.##..#']
below:  ['##..###', '#....#.']

3
above:  ['##..###', '..##...', '#.##..#']
below:  ['#....#.', '.#..#.#', '.#..#.#']

4
above:  ['#....#.', '##..###', '..##...', '#.##..#']
below:  ['.#..#.#', '.#..#.#', '#....#.', '##..###']

match
5
above:  ['.#..#.#', '#....#.', '##..###', '..##...']
below:  ['.#..#.#', '#....#.', '##..###', '..##...']
...
```

## Sets

get set item without removing it

```python
next(iter(my_set))
```

### intersection

```python
a = [1,2,3,4,5]
b = [1,3,5,6]
list(set(a) & set(b))
[1, 3, 5]
```

## Combinations

<https://codereview.stackexchange.com/questions/256952/python-get-all-unique-pair-combinations-from-list-of-elements>

```python
list(itertools.combinations(elements, 2))
```

## NumPy

### Flatten

<https://www.pythontutorial.net/python-numpy/numpy-flatten/>

```python
import numpy as np

a = np.array([[1, 2], [3, 4]])
b = a.flatten()
print(b)
```

## Strings

Any other type can convert to a string but not necessarily the inverse.

### Replacing

<https://stackoverflow.com/questions/68283522/python-replace-character-in-string-at-specific-position>

```python
aStr = 'Name0, Location0, Address0, Price0'
aStr = aStr.replace(',', ' &', 2)
aStr = aStr.replace('&', ',', 1)
```

## Types

check type: `type(var_name)`

### Conversions

### Bool

- numbers, anything not zero is true
- strings, anything is true
- strings, empty is false

```python
print(bool(0)) # False
print(bool(0.1)) # True
print(bool('adfafdk')) # True
print(bool('')) # False
print(bool("False")) # True
```

### int

- If string is not a digit it will error
- Float will truncate, not round
- Bool will be 0 for False and 1 for True

```python
# print(int("fasdfa")) # error
print(int("1")) # 1
print(int(0.5)) # 0
print(int(False)) # 0
print(int(True)) # 1
```

### Float

- always has decimal

```python
print(float("1")) # 1.0
print(float(5)) # 5.0
print(float(False)) # 0.0
print(float(True)) # 1.0
```

## Testing

<https://stackoverflow.com/questions/42014484/pytest-using-fixtures-as-arguments-in-parametrize/42599627#42599627>

```python
@pytest.mark.parametrize(
    "b1,b2,expected",
    [
        (0, 1, True),
        (0, 2, True),
        (0, 3, False),
        (1, 2, False),
        (1, 3, True),
        (1, 4, True),
    ],
)
def test_overlaps(b1, b2, expected, request):
    example_data = request.getfixturevalue("example_data")
    brick1 = example_data[b1]
    brick2 = example_data[b2]
    assert brick1.overlaps(brick2) == expected


```

## Classes

<https://realpython.com/operator-function-overloading/>

## Binary

<https://stackoverflow.com/questions/25757415/bit-shifting-until-first-1-in-a-bit-string>

```python
while ( (n & 0x1) == 0) n >>= 1;
```

string to binary number

```python
int('11111111', 2)
```

## itertools

<https://docs.python.org/3/library/itertools.html>

## Structural Pattern Matching

<https://peps.python.org/pep-0636/>

```python

```

## Generator

<https://realpython.com/introduction-to-python-generators/>

## Libraries

<https://www.sympy.org/en/index.html> - math solver
<https://microsoft.github.io/z3guide/programming/Z3%20Python%20-%20Readonly/Introduction> - equation solver
