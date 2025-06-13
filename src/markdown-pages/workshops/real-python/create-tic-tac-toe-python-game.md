---
title: Create a Tic-Tac-Toe Python Game Engine With an AI Player
date: 2025-05-18
tags:
  - course
  - real-python
  - python
  - game
---

https://realpython.com/videos/python-tic-tac-toe-ai-overview/

## Setup

```bash
mkdir tic-tac-toe && cd $_
python -m venv venv
source venv/bin/activate
python -m pip install --editable library/
``` 

## Modeling

```python
from __future__ import annotations
```

- avoid circular reference
- lazy type hinting

```python
>>> from tic_tac_toe.logic.models import Mark
>>> Mark.CROSS
<Mark.CROSS: 'X'>
>>> Mark.NAUGHT
<Mark.NAUGHT: 'O'>
>>> Mark['CROSS']
<Mark.CROSS: 'X'>
>>> Mark['NAUGHT']
<Mark.NAUGHT: 'O'>
>>> Mark("X")
<Mark.CROSS: 'X'>
>>> Mark("O")
<Mark.NAUGHT: 'O'>
>>> Mark("X").other
<Mark.NAUGHT: 'O'>
>>> Mark("X").other
<Mark.NAUGHT: 'O'>
>>> Mark("X").name
'CROSS'
>>> Mark("X").value
'X'
>>> Mark("X") == "X"
True
>>> is_instance(Mark.CROSS, str)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'is_instance' is not defined. Did you mean: 'isinstance'?
>>> isinstance(Mark.CROSS, str)
True
>>> Mark.CROSS.lower()
'x'
>>> for mark in Mark:
...     print(mark)
... 
X
O

>>> def preview(cells):
...     print(cells[:3], cells[3:6], cells[6:], sep='\n')
... 
>>> preview('OXOOXXXOX')
OXO
OXX
XOX
```

### Immutable Classes

- fault tolerance
- imoproved code readability

```python
@dataclass(frozen=True)
class Grid:
    cells: str = " " * 9
```

### Dataclasses

- control object initialization
- allow post-initialization hook:
    - set derived propperties

```python
def __post_init__(self) -> None:
    if not re.match(r"^[\sXO]{9}$", self.cells):
        raise ValueError("Must contain 9 cells of: X, O, or space")

 @cached_property
    def x_count(self) -> int:
        return self.cells.count(Mark.CROSS)
```

## When to refactor?

- 3 uses of code


## Separate Validation Layer

- validation in domain model violates the single responsibility principle
- invalid states are possible
- GameState should fail when invalid
- validation belongs to a separate module

## Circular Dependencies

- python reads dependencies top-down
- importing bi-directional will cause an error
- common problem with type hints
- declare type hints in quotes to avoid error


```python
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "/Users/ripley/data/ka/tutorials/tic-tac-toe/library/src/tic_tac_toe/logic/models.py", line 7, in <module>
    from tic_tac_toe.logic.validators import validate_grid
  File "/Users/ripley/data/ka/tutorials/tic-tac-toe/library/src/tic_tac_toe/logic/validators.py", line 3, in <module>
    from tic_tac_toe.logic.models import Grid
ImportError: cannot import name 'Grid' from partially initialized module 'tic_tac_toe.logic.models' (most likely due to a circular import) (/Users/ripley/data/ka/tutorials/tic-tac-toe/library/src/tic_tac_toe/logic/models.py)
```

Use future to wrap with `TYPE_CHECKING` to fix the issue
- avoids circular import
- tools like mypy can use this to check type hints otherwise skip import

```python
from __future__ import annotations
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from tic_tac_toe.logic.models import Grid
```
 
 ## `__future__` import

 - originally for the python 2 to 3 transition
 - allows features from future releases to be used
 - import can be removed when feature included

 ## Exceptions

 - extend `Exception`
 - adding docstring avoids pass or other things
 - empty class that conveys info


 ```python
 class InvalidGameState(Exception):
    """Raised when the game state is invalid."""
```

## Error Handler

Let the frontend handle errors

```python
from typing import Callable, TypeAlias
ErrorHandler: TypeAlias = Callable[[Exception], None]

@dataclass(frozen=True)
class TicTacToe:
    player1: Player
    player2: Player
    renderer: Renderer
    error_handler: ErrorHandler | None = None

    def play(self, starting_mark: Mark = Mark.CROSS) -> None:
        game_state = GameState(Grid(), starting_mark)
        while True:
            self.renderer.render(game_state)
            if game_state.game_over:
                break

            player = self.get_current_player(game_state)

            try:
                game_state = player.make_move(game_state)
            except InvalidMove as ex:
                if self.error_handler:
                    self.error_handler(ex)
```

## Abstract Classes

Extend `abc.ABC`, `abc.ABCMeta`, or `abc.ABCAncestor`

Using the `metaclass` argument
- more flexible
    - doesn't affect inheritance hierarchy
    - less important in python with multiple inheritance
- favor composition over inheritance when possible


```python
import abc

from tic_tac_toe.logic.models import Mark


class Player(metaclass=abc.ABCMeta):
    def __init__(self, mark: Mark) -> None:
        self.mark = mark

# must implement in concrete subclasses, template method pattern
    @abc.abstractmethod
    def get_move(self, game_state: GameState) -> Move | None:
        """REturn the current player's move in the given game state."""
```

`:=` walrus operator, assigns a value to a variable as part of an expression

Extending an abstract class

```python
class ComputerPlayer(Player, metaclass=abc.ABCMeta):
    def __init__(self, mark: Mark, delay_seconds: float = 0.25) -> None:
        super().__init__(mark)
        self.delay_seconds = delay_seconds

    def get_move(self, game_state: GameState) -> Move | None:
        time.sleep(self.delay_seconds)
        return self.get_computer_move(game_state)
    
    @abc.abstractmethod
    def get_computer_move(self, game_state: GameState) -> Move | None:
        """Return the computer's move in the given game state."""


class RandomComputerPlayer(ComputerPlayer):
    def get_computer_move(self, game_state: GameState) -> Move | None:
        try:
            return random.choice(game_state.possible_moves)
        except IndexError:
            return None
```

## Classes vs. Functions

A class with a single method could be a function. If you have abstract classes that need to contribute to state, it makes more sense to use a class.

## UI

`\N{party popper}` print emoji

```python
import textwrap

 print(
        textwrap.dedent(
            """\
             A   B   C
           ------------
        1 ┆  {0} │ {1} │ {2}
          ┆ ───┼───┼───
        2 ┆  {3} │ {4} │ {5}
          ┆ ───┼───┼───
        3 ┆  {6} │ {7} │ {8}
    """
        ).format(*cells)
    )
```

## Handling Exceptions

Try has optional `else` which is executed if no exception is raised

```python
try:
    index = grid_to_index(input(f"{self.mark}'s move: ").strip())
except ValueError:
    print("Please provide coordinates in teh for of A1 or 1A")
else:
    print("no error")
```

## Named Tuple

- additional type safety
- access to arguments by name and index

```python
from typing import NamedTuple

class Args(NamedTuple):
    player1: Player
    player2: Player
    starting_mark: Mark

# def parse_args() -> tuple[Player, Player, Mark]:
def parse_args() -> Args:

    #  return player1, player2, args.starting_mark
    return Args(player1, player2, args.starting_mark)

```

## AI

- computer player
- basic AI
- use minimax algorithm
    - optimal move in any situation
    - https://realpython.com/python-minimax-nim/

### Minimax Algorithm Requirements

- scoring system needed
    - allows choice of best move
    - absolute scale of numeric values
- static evaluation of game
    - player looses: `-1`
    - player ties: `0`
    - player wins: `1`
- protagonist:
    - maximizing player
- opponent:
    - minimizing player
- desirable outcomes:
    - choiced of best move for increased score
    - avoidance of opononent's increased score
- minimax:
    - minimize opponent's maximum gain
    - maximize your minimum gain

```python
>>> from tic_tac_toe.logic.minimax import minimax
>>> from tic_tac_toe.logic.models import GameState, Grid, Mark
>>> 
>>> def preview(cells):
...     print(cells[:3], cells[3:6], cells[6:], sep="\n")
... 
>>> game_state = GameState(Grid("XXO O X O"), starting_mark=Mark("X"))
>>> for move in game_state.possible_moves:
...     print("Score:", minimax(move, maximizer=Mark("X")))
...     preview(move.after_state.grid.cells)
...     print("-" * 10)
... 
Score: 1
XXO
XO 
X O
----------
Score: 0
XXO
 OX
X O
----------
Score: -1
XXO
 O 
XXO
----------
```

## Minimax Algorithm
- calculates score for a given move
- to find the best possible move:
    - sort all by score
    - take highest-value move


```python
def find_best_move(game_state: GameState) -> Move | None:
    maximizer: Mark = game_state.current_mark
    bound_minimax = partial(minimax, maximizer=maximizer)
    return max(game_state.possible_moves, key=bound_minimax)
```

Partial freezes the maximizer across invocations.

`functools.partial`

- factory:
    - produces a new function with fewer parameters
    - prepopulates the original function with concrete values
    - performed dynamically at runtime