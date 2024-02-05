---
title: Elixir
date: 2023-03-26
tags:
  - language
---

## Install/Tools

`brew install elixir`

[VSCode Extension](https://marketplace.visualstudio.com/items?itemName=JakeBecker.elixir-ls)

## Docs

[Guides](https://elixir-lang.org/getting-started/introduction.html)
[Standard Library Docs](https://hexdocs.pm/elixir/Kernel.html)

## Books

[Learn Functional Programming with Elixir](https://pragprog.com/titles/cdc-elixir/learn-functional-programming-with-elixir/)

## Learn

<https://alchemist.camp/start#topics>

## Repl

`iex` start interactive session
`c('filename')` load a file into session

## Dependencies

- [Hex Package Manager](https://hex.pm/)

1. edit `mix.exs`

```elixir
defp deps do
  [{dialyxir, "~> 0.5", only: [:dev], runtime: false}]
end
```

2. `mix do deps.get, deps.compile`
3. `mix dialyzer`

## About Elixir

- Elixir runs on the BEAM VM (erlang)
- Erlang is compatible. Syntax is familiar to Ruby
- Concurrency up front
- Functional
- Speed

## Functional Programming with Elxir

- immutable data
- functions
- declarative code

### Pure Functions

- values are immutable
- fn result is only affected by the args
- fn doesn't generate effects beyond the value it returns
- predictable
- can return errors
- referential transparency: total.(100,8) == 8.0

### Impure Functions

- may not return consistent results when given the same inputs
- may produce effects beyond the function's scope
- unpredictable
- fn are impure when they reference values outside of a function scope
- produces side effects

### Working with pure/impure functions

- isolate pure from impure
- write more pure
- handle impure functions

### Using values explicitly

- always pass values between fns
- clear inputs/outputs

### Transforming values

- `|>` pipe operator
- result is passed into the next function

### Declarative code

- focuses on what is necessary to solve a problem

## Values

`atom` is a const, like a symbol. e.g. `:true`, `:false`, `:nil`
`<>` is a string concat operator
`and`, `or`, `not` are meant for boolean comparisons
`&&`, `||`, `!` compare truthy and falsy values

### Naming

- vars are snake_case
- aliases start with a capital letter
- modules are Pascal case

### Functions

- the last statement is the return value
- max of 255 parameters, best practice is less than 5
- first class citizens
- named functions are defined in modules
- `()` are optional

common functional pattern:

```elixir
upcase = fn string -> String.upcase(string) end
upcase.("hello, world")
```

using capturing operator

```elixir
upcase = &String.upcase
upcase.("hello, world")
```

### Modules

- importing arity `import File, only: [write: 3, read: 2]`
- explicit arity imports are preferred

### Strings

`#{my_var}` string interpolation

## Matching

- Pattern matching in functional programming can control flow.
- Useful for assigning variables, unpacking values and making decisions.
- Operator raises a MatchError when it fails to match

When the variable is on the left:

- it's assignment
- will match everything, binding the value to the right side
- Binding to existing variables is called 'rebinding'
- To avoid rebinding use the pin operator `^`

`1 = 1` # 1
`2 = 1` # MatchError

```elixir
x = 1 # 1
1 = x # 1
2 = x # MatchError
x = 2 # rebind
^x = 2 # 2
^x = 1 # match error
```

Destructuring

- Matching parts of a string, use the `<>` operator the check a string
- Can't use a variable on the left side of the `<>` operator

```elixir
"Authentication: " <> credentials = "Authentication: Basic dXNlcjpwYXNz"
credentials # "Basic dXNlcjpwYXNz"
```

### Tuples

- Functions might not be consistent when returning tuples, some may return an atom for the unsuccessful result and a tuple for the successful one.
- A good practice, a common one, is to return `{:ok, value}` for success and `{:error, :error_type}` for failure.
- Tuples must have a known length and use contiguous memory.

```elixir
{a,b,c} = {4,5,6}
a # 4
```

Signaling success and failures

```elixir
process_life = fn -> {:ok, 42} end
{:ok, answer} = process_life.()
IO.puts "The answer is #{answer}." # The answer is 42
```

Equals operators

- `=` is used for pattern matching
- `==` is used when the values are equal
- `===` is used to check value and type

```elixir
1 = 1 # 1
2 = 1 # match error!
1 == 1.0 # true
2 == 1 # false
1.0 === 1.0 # true
1.0 === 1 # false
```

Example

```elixir
user_input = IO.gets("Write your ability scrore:\n")
{ability_score, _} = Integer.parse(user_input)
ability_modifier = (ability_score - 10) / 2
IO.puts("Your ability modifier is #{ability_modifier}")
```

`{ability_score, _} = Integer.parse(user_input)` isn't using a success atom, the tuple is enough. If the parsing is successful, the expression also binds the first element to the variable `ability_score` and ignores the remaining text using the wildcard `_`.

### Matching lists

- For unknown length use a list. The lists are linked lists, each item contains a reference to the next item.
- A lists ends by linking to an empty list, turning it into a proper list.
- It's useful to avoid infinite loops by checking if the last item is an empty list and stopping recursion.
- Use `_` wildcard to ignore items
- `|` splits the elements you care about from the rest.

```elixir
[a,a,a] = [1,1,1] # the list must have three elements with the same value
[a,b,a] = [1,2,1] # [1,2,1]
[a,a,a] = ["apples", "apples", "apples"]
[a, a, "pineapples"] = ["apples", "apples", "pineapples"]
[head | tail] = [:a, :b, :c, :d]
head # :a
tail # [:b, :c, :d]
[head | tail] = [:a]
tail # []
[head | tail] = [] # match error
[a,b | rest] = [1,2,3,4]
a # 1
b # 2
rest # [3,4]
```

### Matching Maps

- Maps are key/value pairs
- `%{}` is used to create map values
- `=>` is an alternative syntax, more verbose but can store an value as a key
- `%{strength: strength_value} = abilities` pattern match object value
- `%{}` will match all maps

```elixir
user_signup = %{email: "johndoe@mail.com", password: "12345678"}
user_signup = %{:email => "johndoe@mail.com", :password => "12345678"} # equivalent

abilities = %{strength: 16, dexterity: 12, intelligence: 10}
%{strength: strength_value} = abilities
strength_value # 16

# matching and setting at the same time
%{intelligence: 10, dexterity: dexterity_value} = abilities
dexterity_value # 12

# check and bind at the same time, one step use for simple assignments
# basic filter
%{strength: strength_value = 16} = abilities
strength_value # 16

# two step version, use when you have some calculation or function call on the variables
strength_value = 16
%{strength: ^strength_value} = abilities
```

### Maps vs Keyword Lists

- A keyword list is a list of two-element tuples, it allows duplicate keys but they must be atoms
- keywords are useful for function options, e.g. the import directive takes a keyword list because named functions can have identical names with different arity
- keyword lists permit you to create structures with identical keys but different values
- maps are useful for things representing database rows, because column names are unique
- the syntax of maps and keywords is very similar, but their limitations make them handy for different use cases

```elixir
[b,c] = [a: 1, a: 12]
b # {:a, 1}
c # {:a, 12}

import String, only: [pad_leading: 2, pad_leading: 3]
pad_leading("def", 6) # "   def"
pad_leading("def", 6, "-") # "---def"

x = %{a: 1, a: 12} # {a:12}
x = [a: 1, a: 12] # OK
x = [{:a, 1}, {:a, 12}] # same as above
x = %{1 => :a, 2 => :b} # ok
x = [1 => :a, 2 => :b] # syntax error
```

### Matching Structs

- structs are extensions of mapping structures
- useful for representing consistent structures that have the same set of keys everywhere
- All structs have a list of permitted attributes
- Not possible to use a key that's not in the list of allowed attributes
- Only functional difference between structs and maps, the name of the struct can be used to indicate which type of structure we're expecting

```elixir
date = ~D[2018-01-01]
%{year: year} = date
year # 22018
```

`~D` is a sigil, sigils are shortcuts to create values
`~w(chocolate jelly mint)` # ["chocolate", "jelly", "mint"], sigil for each word as string

```elixir
date = ~D[2018-01-01]
%Date{day: day} = date
day # 1
%Date{day: day} = %{day: 1} # Match error
```

## Matching functions

- function clauses must be collocated, nothing in between
-

```elixir
defmodule NumberCompare do
  def greater(number, other_number) do
    check(number >= other_number, number, other_number)
  end

  defp check(true, number, _), do: number # matches if first arg true
  defp check(false, _, other_number), do: other_number # matches if first arg is false
end
```

- multiple functions with different values (function clauses)
- select based on first arg match
- returns the number that is greater or equal
- Only `greater/2` is public, `check/3` is internal, using `defp` directive

### Default function values

- only one default value for each parameter
- functions have fixed arity
- functions with same name but different number of parameters are different functions

`\\` operator

```elixir
defmodule Checkout do
  def total_cost(price, quantity \\ 10), do: price * quantity
end
Checkout.total_cost(12) # 120, uses default value
Checkout.total_cost(12, 5) # 60, uses second arg
```

## Guard Clauses

- using `when` keyword after functions parameters
- Help us create better function signatures, reducing the need for function helpers
- Enforce which data we are expecting

```elixir
defmodule NumberCompareV2 do
  def greater(number, other_number) when number >= other_number, do: number
  def greater(_, other_number), do: other_number
end
NumberCompareV2.greater(2,8) # 8
```

Uses a guard clause to return the number if greater, else the other

```elixir
defmodule CheckoutV2 do
  def total_cost(price, tax_rate) when price >= 0 and tax_rate >= 0 do
    price * (tax_rate + 1)
  end
end

CheckoutV2.total_cost(40, 0.1) # 44.0
CheckoutV2.total_cost(-2, 0.2) # FunctionClauseError
CheckoutV2.total_cost(42.3, "Hellow, World!") # ArithmeticError
```

- The last example passes the guard check because you can compare string to number and it's greater than 0.
- This makes it practical to sort mixed lists.

Anonymous function arguments

```elixir
number_compare = fn
  number, other_number when number >= other_number -> number
  _, other_number -> other_number
end
number_compare_v3.(1,2) # 2
```

- [Functions/Operators allowed in guard clause](https://elixir-lang.org/getting-started/case-cond-and-if.html#expressions-in-guard-clauses)
- Can't use standard functions because the checker needs to be fast and have no side effects
- Erlang and Elixir ensure purity and speed by creating a list of authorized functions and that can be expanded using macro functions.

### Macros

- [Macros](https://hexdocs.pm/elixir/Integer.html#macros)
- [Meta Programming with Macros](https://elixir-lang.org/getting-started/meta/macros.html)

```elixir
defmodule EvenOrOdd do
  require Integer

  def check(number) when Integer.is_even(number), do: "even"
  def check(number) when Integer.is_odd(number), do: "odd"
end

EvenOrOdd.check(42) # "even"
EvenOrOdd.check(43) # "odd"
```

- `require` is needed to import macro functions
- code is generated before evaluating
- require is lexically scoped
- create macro with `defguard` directive

```elixir
defmodule CheckoutV2 do
  defguard is_rate(value) when is_float(value) and value >= 0 and value <= 1
  defguard is_cents(value) when is_integer(value) and value >= 0

  def total_cost(price, tax_rate) when is_cents(price) and is_rate(tax_rate) do
    price + tax_cost(price, tax_rate)
  end

  def tax_cost(price, tax_rate) when is_cents(price) and is_rate(tax_rate) do
    price * tax_rate
  end
end
CheckoutV2.tax_cost(40, 0.1) # 4.0
CheckoutV2.tax_cost(-2, 0.2) # FunctionClauseError
CheckoutV2.tax_cost(42.3, "Hello, World!") # FunctionClauseError
```

- creates a custom macro with defguard

## Type specs/declaration

- dynamically types
- Don't have to be defensive about types
- The compiler never uses type specifications to optimize or modify the code.
- Use automated tests and pattern matching to ensure things are working
- Type specifications are useful for creating documentation and have static analysis to find inconsistencies and possible bugs
- [Type Specs](https://hexdocs.pm/elixir/typespecs.html)
- Dialyzer tool uses types specs to static check
- [Dialyzer](https://github.com/jeremyjh/dialyxir)

```elixir
dialyzer: [plt_add_apps: [:mix]]
```

```elixir
  @type t :: %DungeonCrawl.Character{
          name: String.t(),
          description: String.t(),
          hit_points: non_neg_integer(),
          max_hit_points: non_neg_integer(),
          attack_description: String.t(),
          damage_range: Range.t()
        }
```

## Bitwise

- [Bitwise](https://hexdocs.pm/elixir/Bitwise.html)

`&&&` bitwise and

## Recursion

- bounded recursion is a recursive function with an end

```elixir
defmodule Sum do
  def up_to(0), do: 0
  def up_to(n), do: n + up_to(n - 1)
end

Sum.up_to(10) # 55
```

- The first clause matches if the arg is 0. else the second clause recurses.
- The bounded clause must be first to protect from infinite repetition

recurse a list

```elixir
defmodule Math do
  def sum([]), do: 0
  def sum([head | tail]), do: head + sum(tail)
end
Math.sum([10,5,15]) # 30
Math.sum([]) # 0
```

### Transforming Lists

```elixir
[:a | [:b, :c]] # [:a, :b, :c]
[:a, :b | [:c]] # [:a, :b, :c]
[:a, :b, :c] # [:a, :b, :c]
```

- These will build a new list, one element at a time
- This syntax is prepending an element to a list, which is much faster than `++`

```elixir
defmodule EnchanterShop do
  def test_data do
    [
      %{title: "Longsword", price: 50, magic: false},
      %{title: "Healing Potion", price: 60, magic: true},
      %{title: "Rope", price: 10, magic: false},
      %{title: "Dragon's Spear", price: 100, magic: true}
    ]
  end

  @enchanter_name "Edwin"

  def enchant_for_sale([]), do: []

  def enchant_for_sale([item = %{magic: true} | incoming_items]) do
    [item | enchant_for_sale(incoming_items)]
  end

  def enchant_for_sale([item | incoming_items]) do
    new_item = %{title: "#{@enchanter_name}'s #{item.title}", price: item.price * 3, magic: true}
    [new_item | enchant_for_sale(incoming_items)]
  end
end

EnchanterShop.enchant_for_sale(EnchanterShop.test_data)
```

output

```bash
[
  %{magic: true, price: 150, title: "Edwin's Longsword"},
  %{magic: true, price: 60, title: "Healing Potion"},
  %{magic: true, price: 30, title: "Edwin's Rope"},
  %{magic: true, price: 100, title: "Dragon's Spear"}
]
```

### Key-based Accessors

- keywords and maps have a syntax to access values using [], if the key is missing nil is returned and no error
- structs and maps can access with dot notation, if the key is missing an error is raised

```elixir
item = %{magic: true, price: 150, title: "Edwin's Longsword"}
item[:title] # "Edwin's Longsword"
item[:owner] # nil
item[:creator][:city] # nil

item.title # "Edwin's Longsword"
item.owner # raises a KeyError
```

## Recursion techniques

1.Decrease and conquer

```elixir
defmodule Factorial do
    def of(0), do: 1
    def of(n) when n > 0, do: n * of(n - 1)
end
Factorial.of(5) # 120
```

2.Divide and conquer

```elixir
defmodule Sort do
  def ascending([]), do: []
  def ascending([a]), do: [a]

  def ascending(list) do
    half_size = div(Enum.count(list), 2)
    {list_a, list_b} = Enum.split(list, half_size)
    merge(ascending(list_a), ascending(list_b))
  end

  defp merge([], list_b), do: list_b
  defp merge(list_a, []), do: list_a

  defp merge([head_a | tail_a], list_b = [head_b | tail_b]) when head_a <= head_b do
    [head_a | merge(tail_a, list_b)]
  end

  defp merge(list_a = [head_a | _], [head_b | tail_b]) when head_a > head_b do
    [head_b | merge(list_a, tail_b)]
  end
end
Sort.ascending([9,5,1,5,4]) # [1, 4, 5, 5, 9]
Sort.ascending([2,2,3,1])  # [1, 2, 2, 3]
```

## Tail-Call Optimization

- the compiler reduces functions in memory without allocating more memory
- to use, ensure the last expression of the function is a call to a function
- if the last expression is a function call, then the current functions return is he return of the new function call and it doesn't need to keep the current in memory

```elixir
defmodule TrFactorial do
  def of(n), do: factorial_of(n, 1)
  defp factorial_of(0, acc), do: acc
  defp factorial_of(n, acc) when n > 0, do: factorial_of(n - 1, n * acc)
end
TrFactorial.of(10000) # returns much faster than the original body recursive
```

## unbounded recursion

- can't predict the number of repetitions

```elixir
defmodule Navigator do
  def navigate(dir) do
    expanded_dir = Path.expand(dir)
    go_through([expanded_dir])
  end

  defp go_through([]), do: nil

  defp go_through([content | rest]) do
    print_and_navigate(content, File.dir?(content))
    go_through(rest)
  end

  defp print_and_navigate(_dir, false), do: nil

  defp print_and_navigate(dir, true) do
    IO.puts(dir)
    children_dirs = File.ls!(dir)
    go_through(expand_dirs(children_dirs, dir))
  end

  defp expand_dirs([], _relative_to), do: []

  defp expand_dirs([dir | dirs], relative_to) do
    expanded_dir = Path.expand(dir, relative_to)
    [expanded_dir | expand_dirs(dirs, relative_to)]
  end
end
Navigator.navigate("..") # prints dir
```

adding bounds

```elixir
defmodule DepthNavigator do
  @max_depth 2
  def navigate(dir) do
    expanded_dir = Path.expand(dir)
    go_through([expanded_dir], 0)
  end

  defp go_through([], _current_depth), do: nil

  defp go_through(_dirs, current_depth) when current_depth >= @max_depth, do: nil

  defp go_through([content | rest], current_depth) do
    print_and_navigate(content, File.dir?(content), current_depth)
    go_through(rest, current_depth)
  end

  defp print_and_navigate(_dir, false, _current_depth), do: nil

  defp print_and_navigate(dir, true, current_depth) do
    IO.puts(dir)
    children_dirs = File.ls!(dir)
    go_through(expand_dirs(children_dirs, dir), current_depth + 1)
  end

  defp expand_dirs([], _relative_to), do: []

  defp expand_dirs([dir | dirs], relative_to) do
    expanded_dir = Path.expand(dir, relative_to)
    [expanded_dir | expand_dirs(dirs, relative_to)]
  end
end
DepthNavigator.navigate("..") # bounded by depth
```

### recurse anonymous functions

```elixir
fact_gen = fn me ->
  fn
    0 -> 1
    x when x > 0 -> x * me.(me).(x - 1)
  end
end

factorial = fact_gen.(fact_gen)
factorial.(5)
```

- `me` argument represents the factorial generator, representing itself
- `me.(me)` produces a factorial function
- not very expressive code, not straight forward but possible

```elixir
c("factorial.ex")
factorial = &Factorial.of/1
factorial.(5)
```

- use the capturing operator to reference a function
- using named functions as values
- easier to read than recursive anonymous function

## Higher Order Functions

- pass a function into a function
- hides complexity

```elixir
defmodule MyListV2 do
  def enchanted_items do
    [
      %{title: "Edwin's Longsword", price: 150},
      %{title: "Healing Potion", price: 60},
      %{title: "Edwin's Rope", price: 30},
      %{title: "Dragon's Spear", price: 100}
    ]
  end

  def each([], _function), do: nil

  def each([head | tail], function) do
    function.(head)
    each(tail, function)
  end
end
MyListV2.each(MyListV2.enchanted_items, fn item -> IO.puts item.title end)
```

```elixir
increase_price = fn i -> %{title: i.title, price: i.price * 1.1} end
increase_price = fn item -> update_in(item.price, &(&1 * 1.1)) end # same as above using built-in higher-order function
```

```elixir
  def reduce([], acc, _function), do: acc

  def reduce([head | tail], acc, function) do
    reduce(tail, function.(head, acc), function)
  end
  sum_price = fn item, sum -> item.price + sum end
  MyListV2.reduce(MyListV2.enchanted_items, 0, sum_price) # 340

    def filter([], _function), do: []

  def filter([head | tail], function) do
    if function.(head) do
      [head | filter(tail, function)]
    else
      filter(tail, function)
    end
  end

  MyListV2.filter(MyListV2.enchanted_items, fn item -> item.price < 70 end)

  MyListV2.filter(["a", "b", "c", "d"], &(&1 > "b")) # ["c", "d"]
```

### Using the enum module

- The Enum module contains each, map, reduce and filter list operations.
- Work with any data type that respects [Enumerable Protocol](https://hexdocs.pm/elixir/Enumerable.html)

```elixir
Enum.each(["dogs", "cats", "flowers"], &(IO.puts String.upcase(&1)))
Enum.map(["dogs", "cats", "flowers"], &String.capitalize/1)
Enum.reduce([10,5,5,10], 0, &+/2)
Enum.filter(["a", "b", "c", "d"], &(&1 > "b"))

medals = [
  %{medal: :gold, player: "Anna"},
  %{medal: :silver, player: "Joe"},
  %{medal: :gold, player: "Zoe"},
  %{medal: :bronze, player: "Anna"},
  %{medal: :silver, player: "Anderson"},
  %{medal: :silver, player: "Peter"}
]

Enum.group_by(medals, &(&1.medal), &(&1.player))
# %{bronze: ["Anna"], gold: ["Anna", "Zoe"], silver: ["Joe", "Anderson", "Peter"]}
```

### Comprehensions

- generator function that will assign each item to the list of variable a

```elixir
for a <- ["dogs", "cats", "flowers"], do: String.upcase(a)
for a <- ["Willy", "Anna"], b <- ["Math", "English"], do: {a,b} # combining
parseds = for i <- ["10", "hot dogs", "20"], do: Integer.parse(i) # [{10, ""}, :error, {20, ""}]
for {n,_} <- parseds, do: n # [10,20]
for n <- [1, 2, 3, 4, 5, 6, 7], n > 3, do: n # [4, 5, 6, 7]
```

### Pipelining your functions

```elixir
defmodule HigherOrderFunctions do
  def compose(f, g) do
    fn arg -> f.(g.(arg)) end
  end
end

import HigherOrderFunctions
first_letter_and_upcase = compose(&String.upcase/1, &String.first/1)
first_letter_and_upcase.("works") # W

# Using pipe and capture operators
first_letter_and_upcase = &(&1 |> String.first |> String.upcase)
first_letter_and_upcase.("works") # W

defmodule MyString do
  def capitalize_words(title) do
    words = String.split(title)
    capitalize_words = Enum.map(words, &String.capitalize/1)
    Enum.join(capitalize_words, " ")
  end
end

# elixir way
defmodule MyString do
  def capitalize_words(title) do
    title
    |> String.split
    |> Enum.map(&String.capitalize/1)
    |> Enum.join(" ")
  end
end

# with smaller functions
defmodule MyString do
  def capitalize_words(title) do
    title
    |> String.split()
    |> capitalize_all
    |> join_with_whitespace
  end

  def capitalize_all(words) do
    Enum.map(words, &String.capitalize/1)
  end

  def join_with_whitespace(words) do
    Enum.join(words, " ")
  end
end

MyString.capitalize_words("a whole new world") # "A Whole New World"
```

### Partial Application

```elixir
defmodule WordBuilder do
  def build(alphabet, positions) do
    partial = fn at -> String.at(alphabet, at) end
    letters = Enum.map(positions, partial)
    Enum.join(letters)
  end
end

# refactored with function capturing
defmodule WordBuilder do
  def build(alphabet, positions) do
    letters = Enum.map(positions, &String.at(alphabet, &1))
    Enum.join(letters)
  end
end

WordBuilder.build("world", [4, 1, 1, 2]) # "door"
```

### Infinite data

- streams have no end

```elixir
range = 1..10
Enum.each(range, &IO.puts/1) # prints each

defmodule FactorialV2 do
  def of(0), do: 1

  def of(n) when n > 0 do
    1..10_000_000
    |> Enum.take(n)
    |> Enum.reduce(&(&1 * &2))
  end
end

defmodule FactorialV2 do
  def of(0), do: 1

  def of(n) when n > 0 do
    Stream.iterate(1, &(&1 + 1))
    |> Enum.take(n)
    |> Enum.reduce(&(&1 * &2))
  end
end


FactorialV2.of(10000)
integers = Stream.iterate(1, fn previous -> previous + 1 end)
Enum.take(integers, 5)

defmodule Halloween do
  def give_candy(kids) do
    ~w(chocolate jelly mint)
    |> Stream.cycle()
    |> Enum.zip(kids)
  end
end

Halloween.give_candy(~w(Mika Anna Ted Mary Alex Emma))
```

### Eager/Lazy

```elixir
# slow, eager
defmodule ScrewsFactory do
  def run(pieces) do
    pieces
    |> Enum.map(&add_thread/1)
    |> Enum.map(&add_head/1)
    |> Enum.each(&output/1)
  end

  defp add_thread(piece) do
    Process.sleep(50)
    piece <> "--"
  end

  defp add_head(piece) do
    Process.sleep(100)
    "o" <> piece
  end

  defp output(screw) do
    IO.inspect(screw)
  end
end
metal_pieces = Enum.take(Stream.cycle(["-"]), 100)
ScrewsFactory.run(metal_pieces)

# lazy
defmodule ScrewsFactory do
  def run(pieces) do
    pieces
    |> Stream.map(&add_thread/1)
    |> Stream.map(&add_head/1)
    |> Enum.each(&output/1)
  end

  defp add_thread(piece) do
    Process.sleep(50)
    piece <> "--"
  end

  defp add_head(piece) do
    Process.sleep(100)
    "o" <> piece
  end

  defp output(screw) do
    IO.inspect(screw)
  end
end

# very fast stream
defmodule ScrewsFactory do
  def run(pieces) do
    pieces
    |> Stream.chunk(50)
    |> Stream.flat_map(&add_thread/1)
    |> Stream.chunk(100)
    |> Stream.flat_map(&add_head/1)
    |> Enum.each(&output/1)
  end

  defp add_thread(pieces) do
    Process.sleep(50)
    Enum.map(pieces, &(&1 <> "--"))
  end

  defp add_head(pieces) do
    Process.sleep(100)
    Enum.map(pieces, &("o" <> &1))
  end

  defp output(screw) do
    IO.inspect(screw)
  end
end
```

- creating chunks and flat_map creates a queue before processing

## Application

- mix is a built in CLI for generating a project structure

```bash
mix new app_name
```

`use ExUnit.Case` adds new capabilities to the current module, mostly with metaprogramming

```elixir
defmodule DungeonCrawl do
  @moduledoc """
  Documentation for `DungeonCrawl`.
  """

  @doc """
  Hello world.

  ## Examples

      iex> DungeonCrawl.hello()
      :world

  """
  def hello do
    :world
  end
end
```

- This example is run as test, to ensure the doc examples work
- [Exunit Docs](https://hexdocs.pm/ex_unit/ExUnit.html)

`mix new` and `mix test` are tasks. You can add custom tasks

- [Mix.Taak doc](https://hexdocs.pm/mix/Mix.Task.html)

```elixir
defmodule Mix.Tasks.Start do
  use Mix.Task

  def run(_), do: IO.puts("Hello, World!")
end
mix start # Hello, World!
iex -S mix # load the module
```

`alias DungeonCrawl.Character` allows to reference `%Character`

## Protocol

- create a single interface that works on different data types
- polymorphic
- [protocol doc](http://elixir-lang.org/getting-started/protocols.html)
- if you own the struct, put the implementation in the same file as the struct
- if you don't own the struct, but own the protocol, put the implementation inside the protocol file
- if you own neither the struct or the protocol, create a file, with the protocol name and put the implementation there
- great for structs but not for simple modules

```elixir
defprotocol DungeonCrawl.Display do
  def info(value)
end

defimpl DungeonCrawl.Display, for: DungeonCrawl.Room.Action do
  def info(action), do: action.label
end

defimpl DungeonCrawl.Display, for: DungeonCrawl.Character do
  def info(character), do: character.name
end

```

## Module Behaviors

- a behavior is a contract between a module and the client code tht is using it
- common interface across multiple modules

```elixir
defmodule DungeonCrawl.Room.Trigger do
  @callback run(character :: any, action :: any) :: any
end

defmodule DungeonCrawl.Room.Triggers.Exit do
  @behaviour DungeonCrawl.Room.Trigger
  def run(character, _), do: {character, :exit}
end

```

**Protocols vs Behaviors** Protocols work with structs, and behaviors work with modules. Protocols create a function interface to work with several data types. Behaviors define a list of functions that a module should implement.

## Control flow of impure functions

1. First strategy is pattern matching.
1. Use case, if or function clauses to handle impure function results

example control flow with matching

```elixir
defmodule Other.Shop do
  def checkout() do
    quantity = ask_number("Quantity?")
    price = ask_number("Price?")
    calculate(quantity, price)
  end

  def calculate(:error, _), do: IO.puts("Quantity is not a number")
  def calculate(_, :error), do: IO.puts("Price is not a number")
  def calculate({quantity, _}, {price, _}), do: quantity * price

  def ask_number(message) do
    (message <> "\n")
    |> IO.gets()
    |> Integer.parse()
  end
end
```

case

```elixir
  def ask_for_index(options) do
    answer =
      options
      |> display_options()
      |> generate_question()
      |> Shell.prompt()
      |> Integer.parse()

    case answer do
      :error ->
        display_invalid_option()
        ask_for_index(options)

      {option, _} ->
        option - 1
    end
  end
```

### try/catch/raise/rescue

- try wraps a code block, if an error is raised you can use rescue to recover
- you can capture values in catch
- throwing values or raising errors is unusual in FP
- You can identify functions that raise errors because the name has `!`
- MatchError is too generic to rescue
- [Exception Doc](https://hexdocs.pm/elixir/Kernel.html#defexception/1)
- elixir devs prefer raise/rescue due to lack of clarity and increased complexity

The difference between throw/catch and raise/rescue is that try/catch doesn't necessarily mean an error.
It will stop the function from throwing a value that must be caught, like control-flow structures.

raise/rescue

```elixir
def ask_for_option(options) do
    try do
        options
        |> display_options()
        |> generate_question()
        |> Shell.prompt()
        |> parse_answer!()
        |> find_option_by_index!(options)

    rescue
      e in DungeonCrawl.CLI.InvalidOption ->
        display_error(e)
        ask_for_option(options)
    end
end
```

try/catch

```elixir
def ask_for_option(options) do
    try do
        options
        |> display_options()
        |> generate_question()
        |> Shell.prompt()
        |> parse_answer!()
        |> find_option_by_index!(options)
    catch
        {:error, message} ->
        display_error(message)
        ask_for_option(options)
    end
end

# if you only need one try block you can omit try do
def ask_for_option(options) do
    options
    |> display_options()
    |> generate_question()
    |> Shell.prompt()
    |> parse_answer!()
    |> find_option_by_index!(options)
    catch
        {:error, message} ->
        display_error(message)
        ask_for_option(options)
    end
end
```

## Handling impure functions with the Error Monad

- Use when you have many functions in sequence and some can fail
- **monad** wraps a value with properties to give more information about that value, i.e. context
- Error monad has automatic skipping of function executions if the value has an error to handle in a central point
- To make it work, you need a bind function, bind knows how to combine the function and value
- Many libraries available: [monad](https://github.com/rmies/monad), [towel](https://github.com/CyrusOfEden/towel), [witchcraft](https://github.com/witchcrafters/witchcraft) and [MonadEx](https://github.com/rob-brown/MonadEx)

```elixir
use Monad.Operators
import Monad.Result
success(42) ~>> (& &1 + 1) ~>> (& &1 + 2) # 45
error("wrong") ~>> (& &1 + 1) ~>> (& &1 + 2) # Monad.Result{type: :error, value: nil, error: "wrong"}
```

- `~>>` is the bind operator, left side expects a monad and the right expects a function. It executes values in success and skips in error context.

```elixir
  def ask_for_option(options) do
    result =
      return(options)
      ~>> (&display_options/1)
      ~>> (&generate_question/1)
      ~>> (&Shell.prompt/1)
      ~>> (&parse_answer/1)
      ~>> (&find_option_by_index(&1, options))

    if success?(result) do
      result.value
    else
      display_error(result.error)
      ask_for_option(options)
    end
  end
```

## With

- combine multiple match clauses
- if all the clauses match run do, else code stops and return non-matching
- you should use with if you have function pipelines that can result in an errors

```elixir
# before
def checkout() do
    try do
        {quantity, _} = ask_number("Quantity?")
        {price, _} = ask_number("Price?")
        calculate(quantity, price)
    rescue
        MatchError -> "It's not a number"
    end
end


def checkout() do
    result = with {quantity, _} <- ask_number("Quantity?"), {price, _} <- ask_number("Price?") do
        calculate(quantity, price)
    end

    if result == :error, do: IO.puts("It's not a number"), else: result
end

# alternative with else
def checkout() do
    with {quantity, _} <- ask_number("Quantity?"), {price, _} <- ask_number("Price?") do
      calculate(quantity, price)
    else
      :error -> IO.puts("It's not a number")
    end
end
```

- `<-` will execute block on the right side and pattern match the left
