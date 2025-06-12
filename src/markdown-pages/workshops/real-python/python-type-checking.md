---
title: Python Type Checking
date: 2025-05-16
tags:
  - course
  - real-python
  - python
---
 
https://realpython.com/videos/python-type-checking-overview/ 

## Dynamic vs. Static Typing

### Dynamic Typing
- Type checking is performed at runtime
- The type of a variable can change over its lifetime

```python
if False:
    print(1 + "two") # never run
else:
    print(1 + 2)

# 3

1 + "two"
# Traceback (most recent call last):
#   File "/Users/kayla.altepeter/data/ka/notes/course.py", line 6, in <module>
#     1 + "two"
#     ~~^~~~~~~
# TypeError: unsupported operand type(s) for +: 'int' and 'str'

thing = "Hello World"
type(thing)
# <class 'str'>

thing = 28.1
type(thing)
# <class 'float'>
```

### Static Typing
- Type checking is performed at compile time
- The type of a variable cannot change over its lifetime
    - Exception: casting to another type

```java
public class HelloTypes {
    public static void main(String[] args) {
        String thing;
        thing = "Hello, World!";

        // thing = 42;

        System.out.println(thing);
    }
}
```

`javac HelloTypes.java`
`java HelloTypes`


## Duck Typing

If it walks like a duck and quacks like a duck, then it must be a duck.

- the type of the class of an objecrt is less important than the methods it defines
- instead of checking for the class or type, check the object for the presence of specific methods and/or attributes

```python
class TheHobbit:
    def __len__(self):
        return 95022

the_hobbit = TheHobbit()
the_hobbit
# <__main__.TheHobbit object at 0x10441bd70>
len(the_hobbit)
# 95022
def len(obj):
    return obj.__len__()

my_str = "Hello World"
my_list = [34, 54, 65, 78]
my_dict = {"one": 123, "two": 456, "three": 789}
len(my_str)
# 11
len(my_list)
# 4
len(the_hobbit)
# 95022
my_int = 7
my_float = 42.3
len(my_int)
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
#   File "<stdin>", line 2, in len
# AttributeError: 'int' object has no attribute '__len__'. Did you mean: '__le__'?
len(my_float)
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
#   File "<stdin>", line 2, in len
# AttributeError: 'float' object has no attribute '__len__'. Did you mean: '__le__'?
```

## Type Hinting

Statically indicate a type of a value
- specified in PEP 484
- python 3.5+
- annotate the arguments and return value for a function

PEP 8
- Use normal colon rules, no space before and one space after
    - `test: str`
- use spaces around the = sign when combining an argument annotation with a default value
    - `align: bool = True`

```python
def headline(text, align=True):
    if align:
        return f"{text.title()}\n{'-' * len(text)}"
    else:
        return f" {text.title()} ".center(50, "o")

print(headline('python type checking'))
# Python Type Checking
# --------------------
print(headline('python type checking', align=False))
# oooooooooooooo Python Type Checking oooooooooooooo

def headline(text: str, align: bool = True) -> str:
    if align:
        return f"{text.title()}\n{'-' * len(text)}"
    else:
        return f" {text.title()} ".center(50, "o")

headline
# <function headline at 0x104707920>
print(headline('python type checking', align="left"))
# Python Type Checking
# --------------------
```

## Mypy

https://mypy-lang.org/

> Mypy is an optional static type checker for Python that aims to combine the benefits of dynamic (or "duck") typing and static typing. 
> Mypy combines the expressive power and convenience of Python with a powerful type system and compile-time type checking. Mypy type checks standard Python programs; run them using any Python VM with basically no runtime overhead. 
> -- https://mypy-lang.org/

- Originally started as a stand alone version of python
- was rewritten to use annotations making it a static type checker for regular python code

`python -m pip install mypy`

```python
# headlines.py
def headline(text: str, align: bool = True) -> str:
    if align:
        return f"{text.title()}\n{'-' * len(text)}"
    else:
        return f" {text.title()} ".center(50, "o")
    

print(headline("python type checking"))
print(headline("python type checking", align="center"))

# v2
def headline(text: str, centered: bool = False) -> str:
    if not centered:
        return f"{text.title()}\n{'-' * len(text)}"
    else:
        return f" {text.title()} ".center(50, "o")
    

print(headline("python type checking"))
print(headline("python type checking", centered=True))
```

```bash
python -m mypy headlines.py
# headlines.py:9: error: Argument "align" to "headline" has incompatible type "str"; expected "bool"  [arg-type]
# Found 1 error in 1 file (checked 1 source file)
python -m mypy headlines.py
# Success: no issues found in 1 source file
```

## Pro/Con of Type Hints

### Pros

- catch certain errors
- document your code
    - for yourself, but especially if sharing with a team or project
- imporve the functionality of IDEs and linters
    - enhancing code completion and suggestions
- build and maintain a cleaner architecture

### Cons

- take developer time and effort to add
- work best in modern python
    - annotations introduced in python 3
    - variable annotations and postponed evaluatgion work best in 3.6 or 3.7
- introduce a slight penalty in start-up time
    - load the typing module

### Not all or nothing

- python supports gradual typing
    - introducing types gradually into your code
    - code without typehints will be ignored by the checker
    - add to critical components first
- adding types will havve no effect on the running of your program


## Annotations

- introduced in python 3
- a way to associate artitrary expressions to function arguments and return values
- PEP 484 defined how to add type hints to your python code
    - the main way to add type hints is using annotations
    - type checking is becoming more and more common, annotations should mainly be reserved for type hints

### Function Annotations
- annotate the arguments and return value for a function
- syntax for arguments:
    - `argument: annotation`
- syntax for return value:
    - `-> annotation` 
- annotations must be valid python expressions

### Inspecting Annotations

`__annotations__`

```python
import math
def circumference(radius: float) -> float:
    return 2 * math.pi * radius

circumference.__annotations__
# {'radius': <class 'float'>, 'return': <class 'float'>}
circumference(1.23)
# 7.728317927830891
```

```python
import math

reveal_type(math.pi)

radius = 1
circumference = 2 * math.pi * radius

reveal_locals()
```

```bash
python -m mypy reveal.py
# reveal.py:3: note: Revealed type is "builtins.float"
# reveal.py:8: note: Revealed local types are:
# reveal.py:8: note:     circumference: builtins.float
# reveal.py:8: note:     radius: builtins.int
# Success: no issues found in 1 source file
```

### Variable Annotations

- Defined in PEP 526 and introduced in python 3.6
- Same syntax as function arguments:
    - `pi: float = 3.14159`
- annotations of variables are stored in the module level of the `__annotations__` dictionary

```python
import math

pi: float = 3.142
def circumference(radius: float) -> float:
    return 2 * math.pi * radius

circumference.__annotations__
# {'radius': <class 'float'>, 'return': <class 'float'>}
__annotations__
# {'pi': <class 'float'>}
circumference(1)
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
#   File "<stdin>", line 2, in circumference
# NameError: name 'math' is not defined. Did you forget to import 'math'?
circumference(1)
# 6.283185307179586
nothing: str
__annotations__
# {'pi': <class 'float'>, 'nothing': <class 'str'>}
```

## Type Comments

For a function annotate the arguments and the return value

```python
def func(arg):
    # type: (str) -> str
```

For variables add the type comment on the same line

```python
my_var = 10  # type: int
```

```python
def circumference(radius):
    # type: (float) -> float
    return 2 * math.pi * radius

circumference(4.5)
# 28.274333882308138
circumference.__annotations__
# {}
```

```python
def headline(text, width=80, fill_char='-'):
    # type: (str, int, str) -> str
    return f" {text.title()} ".center(width, fill_char)


def headline2(
        text,           # type: str
        width=80,       # type: int
        fill_char='-'   # type: str
    ):                  # type: (...) -> str
    return f" {text.title()} ".center(width, fill_char)


print(headline("python type checking", width=40))

print(headline("python type checking", width=70))

print(headline("python type checking", width="normal"))
# Traceback (most recent call last):
#   File "/Users/kayla.altepeter/data/ka/notes/headlines.py", line 16, in <module>
#     print(headline("python type checking", width="normal"))
#           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
#   File "/Users/kayla.altepeter/data/ka/notes/headlines.py", line 3, in headline
#     return f" {text.title()} ".center(width, fill_char)
#            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
# TypeError: 'str' object cannot be interpreted as an integer
pi = 3.142  # type: float
```

> [!NOTE]
> Use annoations if you can and comments if you must.

## Python Types

```python
name: str = "Guido"
pi: float = 3.142
centered: bool = False
names: list = ["Guido", "Thomas", "Bobby"]
names
# ['Guido', 'Thomas', 'Bobby']
version: tuple = (3, 7, 1)
options: dict = {"centered": False, "capitalize": True}
type(names)
# <class 'list'>
type(names[2])
# <class 'str'>
__annotations__
# {'name': <class 'str'>, 'pi': <class 'float'>, 'centered': <class 'bool'>, 'names': <class 'list'>, 'version': <class 'tuple'>, 'options': <class 'dict'>}
from typing import Dict, List, Tuple
names: List[str] = ["Guido", "Thomas", "Bobby"]
version: Tuple[int, int, int] = (3, 7, 1)
options: Dict[str, bool] = {"centered": False, "capitalize": True}
__annotations__
# {'name': <class 'str'>, 'pi': <class 'float'>, 'centered': <class 'bool'>, 'names': typing.List[str], 'version': typing.Tuple[int, int, int], 'options': typing.Dict[str, bool]}
```

```python
# game.py

import random

SUITS = "♠ ♡ ♢ ♣".split()
RANKS = "2 3 4 5 6 7 8 9 10 J Q K A".split()


def create_deck(shuffle=False):
    """Create a new deck of 52 cards"""
    deck = [(s, r) for r in RANKS for s in SUITS]
    if shuffle:
        random.shuffle(deck)
    return deck


def deal_hands(deck):
    """Deal the cards in the deck into four hands"""
    return (deck[0::4], deck[1::4], deck[2::4], deck[3::4])


def play():
    """Play a 4-player card game"""
    deck = create_deck(shuffle=True)
    names = "P1 P2 P3 P4".split()
    hands = {n: h for n, h in zip(names, deal_hands(deck))}

    for name, cards in hands.items():
        card_str = " ".join(f"{s}{r}" for (s, r) in cards)
        print(f"{name}: {card_str}")


if __name__ == "__main__":
    play()
```

```python
# game.py

import random
from typing import List, Tuple

Card = Tuple[str, str]
Deck = List[Card]

SUITS = "♠ ♡ ♢ ♣".split()
RANKS = "2 3 4 5 6 7 8 9 10 J Q K A".split()


def create_deck(shuffle: bool = False) -> Deck:
    """Create a new deck of 52 cards"""
    deck = [(s, r) for r in RANKS for s in SUITS]
    if shuffle:
        random.shuffle(deck)
    return deck


def deal_hands(deck: Deck) -> Tuple[Deck, Deck, Deck, Deck]:
    """Deal the cards in the deck into four hands"""
    return (deck[0::4], deck[1::4], deck[2::4], deck[3::4])


def play():
    """Play a 4-player card game"""
    deck = create_deck(shuffle=True)
    names = "P1 P2 P3 P4".split()
    hands = {n: h for n, h in zip(names, deal_hands(deck))}

    for name, cards in hands.items():
        card_str = " ".join(f"{s}{r}" for (s, r) in cards)
        print(f"{name}: {card_str}")


if __name__ == "__main__":
    play()
```

https://github.com/python/typeshed

There are several static type checkers available for Python, including:

- mypy
- Pyright
- Pyre
- pytype